import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { products } from "@/lib/products";

interface CheckoutItem {
  slug: string;
  quantity: number;
  gravure: boolean;
}

interface CheckoutBody {
  items: CheckoutItem[];
  pickup: string | null;
}

// Valeurs acceptées pour le ramassage — liste blanche stricte
const VALID_PICKUP_LOCATIONS = [
  "Sainte-Brigitte-de-Laval",
  "Montréal",
  "Québec",
] as const;

// Rate limiting in-memory : max 10 tentatives de paiement / 10 min par IP
// Note : en serverless (Vercel), chaque instance a sa propre Map.
// Protection complémentaire assurée par la protection DDoS de Vercel
// et les limites de l'API Stripe côté serveur.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Nettoyage des entrées expirées pour éviter la fuite mémoire
  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetAt) rateLimitMap.delete(key);
    }
  }

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

// Vérifie que la requête provient du même domaine — protection CSRF.
// On accepte l'absence d'Origin (navigateurs anciens, curl en test local)
// mais on rejette toute valeur qui ne correspond pas au domaine attendu.
function isValidOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // absent = non-browser ou curl de test local
  const base = process.env.NEXT_PUBLIC_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  try {
    return new URL(origin).origin === new URL(base).origin;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!isValidOrigin(req)) {
    return NextResponse.json({ error: "Origine non autorisée." }, { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez dans 10 minutes." }, { status: 429 });
  }

  let body: CheckoutBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Vérification que le body est bien un objet — protège contre les payloads JSON
  // valides mais non-objets (null, 42, "string") qui feraient crasher la destructuration
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { items, pickup } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Panier vide." }, { status: 400 });
  }

  if (items.length > 50) {
    return NextResponse.json({ error: "Trop d'articles." }, { status: 400 });
  }

  // ─── Validation stricte des types de chaque item ────────────────────────
  for (const item of items) {
    // Garde contre les éléments null/primitifs dans le tableau
    if (item === null || typeof item !== "object" || Array.isArray(item)) {
      return NextResponse.json({ error: "Format d'article invalide." }, { status: 400 });
    }
    if (typeof item.slug !== "string" || item.slug.length === 0 || item.slug.length > 100) {
      return NextResponse.json({ error: "Identifiant produit invalide." }, { status: 400 });
    }
    if (!Number.isFinite(Number(item.quantity)) || Number(item.quantity) < 1) {
      return NextResponse.json({ error: "Quantité invalide." }, { status: 400 });
    }
  }

  // ─── Déduplication des slugs ─────────────────────────────────────────────
  // Fusion des doublons (même slug envoyé deux fois → on additionne les quantités)
  // pour éviter des lignes dupliquées sur la facture Stripe.
  const mergedMap = new Map<string, { quantity: number; gravure: boolean }>();
  for (const item of items) {
    const key = item.slug;
    const existing = mergedMap.get(key);
    const qty = Math.min(Math.max(1, Math.floor(Number(item.quantity))), 99);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + qty, 99);
    } else {
      mergedMap.set(key, { quantity: qty, gravure: Boolean(item.gravure) });
    }
  }
  const deduplicatedItems = Array.from(mergedMap.entries()).map(([slug, val]) => ({
    slug,
    quantity: val.quantity,
    gravure: val.gravure,
  }));

  // ─── Cap sur le total de quantités ───────────────────────────────────────
  // Un artisan ne peut pas traiter 200+ unités en une seule commande.
  const totalQty = deduplicatedItems.reduce((sum, i) => sum + i.quantity, 0);
  if (totalQty > 200) {
    return NextResponse.json({ error: "Quantité totale trop élevée. Contactez-nous pour les commandes en gros." }, { status: 400 });
  }

  // ─── Validation du pickup contre la liste blanche ───────────────────────
  // On rejette toute valeur qui n'est pas dans la liste connue.
  const pickupStr: string | null = (() => {
    if (pickup === null || pickup === undefined) return null;
    if (typeof pickup !== "string") return null;
    const normalized = pickup.trim();
    if ((VALID_PICKUP_LOCATIONS as readonly string[]).includes(normalized)) return normalized;
    return null; // Valeur inconnue → on traite comme une livraison normale
  })();

  // ─── Recalcul des prix côté serveur ─────────────────────────────────────
  // Les prix envoyés par le client sont entièrement ignorés.
  // Toute l'autorité sur les prix vient de products.ts.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineItems: any[] = [];
  let subtotal = 0;

  for (const item of deduplicatedItems) {
    const product = products.find((p) => p.slug === item.slug);
    if (!product) {
      return NextResponse.json({ error: "Produit introuvable dans le catalogue." }, { status: 400 });
    }

    const qty = item.quantity; // déjà normalisé dans deduplicatedItems
    const gravure = item.gravure;
    const unitPrice = product.price + (gravure ? 8 : 0);

    const label = [product.name, product.tagline].filter(Boolean).join(" — ")
      + (gravure ? " (+ Gravure laser)" : "");

    lineItems.push({
      price_data: {
        currency: "cad",
        product_data: {
          name: label,
          metadata: { slug: product.slug },
        },
        unit_amount: Math.round(unitPrice * 100),
      },
      quantity: qty,
    });

    subtotal += unitPrice * qty;
  }

  // ─── Remise ramassage (5%) ───────────────────────────────────────────────
  const pickupDiscount = pickupStr ? +(subtotal * 0.05).toFixed(2) : 0;
  const discountedSubtotal = +(subtotal - pickupDiscount).toFixed(2);

  if (pickupDiscount > 0) {
    lineItems.push({
      price_data: {
        currency: "cad",
        product_data: { name: "Remise ramassage local (−5%)" },
        unit_amount: -Math.round(pickupDiscount * 100),
      },
      quantity: 1,
    });
  }

  // ─── Livraison ──────────────────────────────────────────────────────────
  const shipping = pickupStr ? 0 : discountedSubtotal >= 100 ? 0 : 3;
  if (shipping > 0) {
    lineItems.push({
      price_data: {
        currency: "cad",
        product_data: { name: "Livraison standard" },
        unit_amount: Math.round(shipping * 100),
      },
      quantity: 1,
    });
  }

  // ─── TPS/TVQ (14,975%) ──────────────────────────────────────────────────
  const taxBase = discountedSubtotal + shipping;
  const taxes = Math.round(taxBase * 0.14975 * 100);
  lineItems.push({
    price_data: {
      currency: "cad",
      product_data: { name: "TPS + TVQ (14,975%)" },
      unit_amount: taxes,
    },
    quantity: 1,
  });

  // ─── Création de la session Stripe Checkout ──────────────────────────────
  const baseUrl =
    process.env.NEXT_PUBLIC_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      locale: "fr",
      metadata: {
        pickup: pickupStr ?? "livraison",
        items_count: String(deduplicatedItems.length),
      },
      success_url: `${baseUrl}/checkout/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/panier`,
    });
  } catch (err) {
    console.error("Stripe session creation error:", err);
    return NextResponse.json(
      { error: "Impossible de créer la session de paiement. Réessayez dans quelques instants." },
      { status: 502 }
    );
  }

  return NextResponse.json({ url: session.url });
}
