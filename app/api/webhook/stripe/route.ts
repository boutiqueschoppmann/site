import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";
import nodemailer from "nodemailer";

// Vérification au démarrage — fail-fast si la config est incomplète
if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("STRIPE_WEBHOOK_SECRET manquant dans les variables d'environnement");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Déduplication des événements webhook.
// Stripe peut livrer le même événement plusieurs fois (retry réseau, timeout).
// On garde les N derniers event.id traités pour éviter les doublons d'emails.
const PROCESSED_MAX = 500;
const processedEventIds = new Set<string>();

function isAlreadyProcessed(eventId: string): boolean {
  return processedEventIds.has(eventId);
}

function markAsProcessed(eventId: string): void {
  if (processedEventIds.size >= PROCESSED_MAX) {
    // Supprime la plus ancienne entrée (Set garde l'ordre d'insertion)
    const oldest = processedEventIds.values().next().value;
    if (oldest !== undefined) processedEventIds.delete(oldest);
  }
  processedEventIds.add(eventId);
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Signature manquante." }, { status: 400 });
  }

  // Limite de taille — un payload Stripe légitime ne dépasse pas quelques Ko.
  // Sans cette garde, un attaquant peut envoyer un body de plusieurs Go et
  // saturer la mémoire de l'instance serverless.
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 65536) {
    return NextResponse.json({ error: "Payload trop volumineux." }, { status: 413 });
  }

  // Le body doit être lu brut (Buffer) pour que la vérification de signature fonctionne.
  // Ne jamais utiliser req.json() ici — ça casse la vérification cryptographique.
  const rawBody = await req.arrayBuffer();
  if (rawBody.byteLength > 65536) {
    return NextResponse.json({ error: "Payload trop volumineux." }, { status: 413 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  // Déduplication — on répond 200 immédiatement si déjà traité
  if (isAlreadyProcessed(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Vérification du statut de paiement — ne pas fulfiller si non payé
    // (ex: capture manuelle, paiements différés, etc.)
    if (session.payment_status !== "paid") {
      console.warn(`Webhook checkout.session.completed reçu mais payment_status=${session.payment_status} — non traité.`);
      return NextResponse.json({ received: true, skipped: true });
    }

    // On marque avant le traitement pour éviter la double exécution
    // en cas de retry concurrent de Stripe
    markAsProcessed(event.id);

    try {
      await handlePaymentCompleted(session);
    } catch (err) {
      // On log mais on répond 200 : le paiement est confirmé, c'est seulement
      // l'envoi d'email qui a échoué. Ne pas retourner d'erreur à Stripe
      // pour éviter les retries qui généreraient des doublons d'emails.
      console.error("Erreur dans handlePaymentCompleted:", err);
    }
  }

  return NextResponse.json({ received: true });
}

async function handlePaymentCompleted(session: Stripe.Checkout.Session) {
  const customerEmail = session.customer_details?.email;
  // Tronqué pour éviter les sujets d'email excessivement longs
  const customerName = String(session.customer_details?.name ?? "Client").slice(0, 100);
  const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : "—";
  const pickup = session.metadata?.pickup ?? "livraison";
  const currency = (session.currency ?? "cad").toUpperCase();
  // session.payment_intent est une string Stripe (pi_xxx) — escapé par précaution
  const paymentIntentId = esc(String(session.payment_intent ?? ""));

  const htmlInternal = `
    <h2 style="font-family:Georgia,serif">Paiement reçu — schoppmann.ca</h2>
    <table cellpadding="6" style="font-family:monospace;font-size:14px">
      <tr><td><b>Session Stripe</b></td><td>${esc(session.id)}</td></tr>
      <tr><td><b>Client</b></td><td>${esc(customerName)}</td></tr>
      <tr><td><b>Courriel</b></td><td>${esc(customerEmail ?? "—")}</td></tr>
      <tr><td><b>Total</b></td><td>${esc(amountTotal)} ${esc(currency)}</td></tr>
      <tr><td><b>Livraison</b></td><td>${pickup === "livraison" ? "Expédition" : `Ramassage — ${esc(pickup)}`}</td></tr>
      <tr><td><b>Statut paiement</b></td><td>${esc(session.payment_status)}</td></tr>
    </table>
    <p style="font-family:monospace;font-size:12px;color:#888">
      ${paymentIntentId
        ? `Détails complets : <a href="https://dashboard.stripe.com/payments/${paymentIntentId}">Dashboard Stripe</a>`
        : ""}
    </p>
  `;

  await transporter.sendMail({
    from: `"Schoppmann Site" <${process.env.GMAIL_USER}>`,
    to: "boutique.schoppmann@gmail.com",
    subject: `[Paiement reçu] ${customerName} — ${amountTotal} ${currency}`,
    html: htmlInternal,
  });

  if (customerEmail) {
    const deliveryLine =
      pickup === "livraison"
        ? "Votre commande sera expédiée sous 2 à 5 jours ouvrables."
        : `Ramassage disponible à : <b>${esc(pickup)}</b>. Nous vous contacterons pour confirmer le rendez-vous.`;

    const htmlClient = `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#0F0F10">
        <h2 style="border-bottom:1px solid #e0dbd2;padding-bottom:12px">Merci pour votre commande !</h2>
        <p>Bonjour ${esc(customerName)},</p>
        <p>Votre paiement de <b>${esc(amountTotal)} ${esc(currency)}</b> a bien été reçu.</p>
        <p>${deliveryLine}</p>
        <p>Pour toute question : <a href="mailto:boutique.schoppmann@gmail.com">boutique.schoppmann@gmail.com</a></p>
        <hr style="border:none;border-top:1px solid #e0dbd2;margin:24px 0"/>
        <p style="font-size:12px;color:#888">Schoppmann · Sainte-Brigitte-de-Laval, Québec</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Schoppmann" <${process.env.GMAIL_USER}>`,
      to: customerEmail,
      subject: "Confirmation de commande — Schoppmann",
      html: htmlClient,
    });
  }
}

function esc(str: unknown): string {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
