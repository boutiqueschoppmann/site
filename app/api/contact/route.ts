import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Rate limiting in-memory : max 20 requêtes / 10 min par IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// Échappe les caractères HTML pour éviter l'injection dans les emails
function esc(str: unknown): string {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escNl(str: unknown): string {
  return esc(str).replace(/\n/g, "<br/>");
}

// Validation longueur max
function str(val: unknown, max = 500): string {
  const s = String(val ?? "").trim();
  return s.slice(0, max);
}

function isValidOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
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
    return NextResponse.json({ error: "Trop de requêtes. Réessayez dans 10 minutes." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const {
      name: rawName, email: rawEmail, message: rawMessage, type,
      company: rawCompany, quantity: rawQuantity, product: rawProduct,
      customization: rawCustomization, deadline: rawDeadline,
      phone: rawPhone, address, items, gravureTexts,
      pickupLocation: rawPickup, pickupDiscount, discountedSubtotal,
      shipping, taxes, total, note: rawNote,
    } = body;

    const name    = str(rawName, 100);
    const email   = str(rawEmail, 200);
    const message = str(rawMessage, 2000);

    if (!name || !email) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }

    // Validation email basique côté serveur
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Adresse courriel invalide." }, { status: 400 });
    }

    const isB2B   = type === "b2b";
    const isOrder = type === "order";

    const company       = str(rawCompany, 200);
    const quantity      = str(rawQuantity, 50);
    const product       = str(rawProduct, 200);
    const customization = str(rawCustomization, 500);
    const deadline      = str(rawDeadline, 100);
    const phone         = str(rawPhone, 30);
    const pickupLocation = str(rawPickup, 200);
    const note          = str(rawNote, 1000);

    const subject = isOrder
      ? `[Commande] ${name} — ${Number(total).toFixed(2)} CAD`
      : isB2B
      ? `[Devis B2B] ${company || name} — ${quantity || "quantité non précisée"}`
      : `[Contact] Message de ${name}`;

    let html = "";

    if (isOrder) {
      const itemRows = (Array.isArray(items) ? items.slice(0, 50) : []).map((item: { name: string; tagline?: string; quantity: number; price: number; gravure?: boolean; slug: string }) => {
        const unitPrice = item.price + (item.gravure ? 8 : 0);
        const safeGravureTexts = gravureTexts && typeof gravureTexts === "object" && !Array.isArray(gravureTexts) ? gravureTexts : {};
        const gravureText = item.gravure && safeGravureTexts[item.slug] ? str(safeGravureTexts[item.slug], 20) : null;
        return `
          <tr>
            <td>${esc(item.name)}${item.tagline ? ` — ${esc(item.tagline)}` : ""}</td>
            <td style="text-align:center">${Number(item.quantity)}</td>
            <td style="text-align:right">${(unitPrice * item.quantity).toFixed(2)} CAD</td>
            ${gravureText ? `<td style="color:#8B5E3C">Gravure : « ${esc(gravureText)} »</td>` : "<td>—</td>"}
          </tr>`;
      }).join("");

      const addrStreet = address?.street ? str(address.street, 200) : "";
      const addrCity   = address?.city   ? str(address.city, 100)   : "";
      const addrPostal = address?.postal ? str(address.postal, 10)  : "";

      html = `
        <h2 style="font-family:Georgia,serif">Nouvelle commande — schoppmann.ca</h2>
        <table cellpadding="6" style="font-family:monospace;font-size:14px;margin-bottom:16px">
          <tr><td><b>Nom</b></td><td>${esc(name)}</td></tr>
          <tr><td><b>Courriel</b></td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          ${phone ? `<tr><td><b>Téléphone</b></td><td>${esc(phone)}</td></tr>` : ""}
          <tr><td><b>Livraison</b></td><td>${pickupLocation ? `Ramassage — ${esc(pickupLocation)}` : shipping === 0 ? "Livraison gratuite" : `Livraison standard (${Number(shipping).toFixed(2)} CAD)`}</td></tr>
          ${!pickupLocation && addrStreet ? `<tr><td><b>Adresse</b></td><td>${esc(addrStreet)}<br/>${esc(addrCity)} ${esc(addrPostal)}</td></tr>` : ""}
        </table>
        <h3 style="font-family:Georgia,serif">Articles</h3>
        <table cellpadding="6" border="1" cellspacing="0" style="font-family:monospace;font-size:13px;border-collapse:collapse;width:100%">
          <thead style="background:#f0ece4">
            <tr><th>Produit</th><th>Qté</th><th>Prix</th><th>Gravure</th></tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>
        <table cellpadding="4" style="font-family:monospace;font-size:13px;margin-top:12px;margin-left:auto">
          ${pickupDiscount > 0 ? `<tr><td>Remise ramassage (−5%)</td><td style="text-align:right;color:#8B5E3C">−${Number(pickupDiscount).toFixed(2)} CAD</td></tr>` : ""}
          <tr><td>Livraison</td><td style="text-align:right">${shipping === 0 ? "0,00 CAD" : `${Number(shipping).toFixed(2)} CAD`}</td></tr>
          <tr><td>TPS/TVQ (14,975%)</td><td style="text-align:right">${Number(taxes).toFixed(2)} CAD</td></tr>
          <tr style="font-weight:bold"><td>Total</td><td style="text-align:right">${Number(total).toFixed(2)} CAD</td></tr>
        </table>
        ${note ? `<hr/><p><b>Note :</b><br/>${escNl(note)}</p>` : ""}
      `;
    } else if (isB2B) {
      html = `
        <h2>Demande de devis B2B</h2>
        <table cellpadding="6" style="font-family:monospace;font-size:14px">
          <tr><td><b>Nom</b></td><td>${esc(name)}</td></tr>
          <tr><td><b>Courriel</b></td><td>${esc(email)}</td></tr>
          <tr><td><b>Entreprise</b></td><td>${esc(company) || "—"}</td></tr>
          <tr><td><b>Quantité estimée</b></td><td>${esc(quantity) || "—"}</td></tr>
          <tr><td><b>Produit souhaité</b></td><td>${esc(product) || "—"}</td></tr>
          <tr><td><b>Personnalisation</b></td><td>${esc(customization) || "—"}</td></tr>
          <tr><td><b>Délai cible</b></td><td>${esc(deadline) || "—"}</td></tr>
        </table>
        <hr/>
        <p><b>Message :</b><br/>${escNl(message)}</p>
      `;
    } else {
      if (!message) return NextResponse.json({ error: "Message requis." }, { status: 400 });
      html = `
        <h2>Nouveau message — schoppmann.ca</h2>
        <table cellpadding="6" style="font-family:monospace;font-size:14px">
          <tr><td><b>Nom</b></td><td>${esc(name)}</td></tr>
          <tr><td><b>Courriel</b></td><td>${esc(email)}</td></tr>
        </table>
        <hr/>
        <p>${escNl(message)}</p>
      `;
    }

    await transporter.sendMail({
      from: `"Schoppmann Site" <${process.env.GMAIL_USER}>`,
      to: "boutique.schoppmann@gmail.com",
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Erreur envoi courriel." }, { status: 500 });
  }
}
