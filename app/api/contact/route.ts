import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, type, company, quantity, product, customization, deadline,
            phone, address, items, gravureTexts, pickupLocation, pickupDiscount, discountedSubtotal, shipping, taxes, total, note } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }

    const isB2B = type === "b2b";
    const isOrder = type === "order";

    const subject = isOrder
      ? `[Commande] ${name} — ${total?.toFixed(2)} CAD`
      : isB2B
      ? `[Devis B2B] ${company || name} — ${quantity || "quantité non précisée"}`
      : `[Contact] Message de ${name}`;

    let html = "";

    if (isOrder) {
      const itemRows = (items ?? []).map((item: { name: string; tagline?: string; quantity: number; price: number; gravure?: boolean; slug: string }) => {
        const unitPrice = item.price + (item.gravure ? 8 : 0);
        const gravureText = item.gravure && gravureTexts?.[item.slug] ? gravureTexts[item.slug] : null;
        return `
          <tr>
            <td>${item.name}${item.tagline ? ` — ${item.tagline}` : ""}</td>
            <td style="text-align:center">${item.quantity}</td>
            <td style="text-align:right">${(unitPrice * item.quantity).toFixed(2)} CAD</td>
            ${gravureText ? `<td style="color:#8B5E3C">Gravure : « ${gravureText} »</td>` : "<td>—</td>"}
          </tr>`;
      }).join("");

      html = `
        <h2 style="font-family:Georgia,serif">Nouvelle commande — schoppmann.ca</h2>
        <table cellpadding="6" style="font-family:monospace;font-size:14px;margin-bottom:16px">
          <tr><td><b>Nom</b></td><td>${name}</td></tr>
          <tr><td><b>Courriel</b></td><td><a href="mailto:${email}">${email}</a></td></tr>
          ${phone ? `<tr><td><b>Téléphone</b></td><td>${phone}</td></tr>` : ""}
          <tr><td><b>Livraison</b></td><td>${pickupLocation ? `Ramassage — ${pickupLocation}` : shipping === 0 ? "Livraison gratuite" : `Livraison standard (${Number(shipping).toFixed(2)} CAD)`}</td></tr>
          ${!pickupLocation && address ? `<tr><td><b>Adresse</b></td><td>${address.street}<br/>${address.city} ${address.postal}</td></tr>` : ""}
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
        ${note ? `<hr/><p><b>Note :</b><br/>${note.replace(/\n/g, "<br/>")}</p>` : ""}
      `;
    } else if (isB2B) {
      html = `
        <h2>Demande de devis B2B</h2>
        <table cellpadding="6" style="font-family:monospace;font-size:14px">
          <tr><td><b>Nom</b></td><td>${name}</td></tr>
          <tr><td><b>Courriel</b></td><td>${email}</td></tr>
          <tr><td><b>Entreprise</b></td><td>${company || "—"}</td></tr>
          <tr><td><b>Quantité estimée</b></td><td>${quantity || "—"}</td></tr>
          <tr><td><b>Produit souhaité</b></td><td>${product || "—"}</td></tr>
          <tr><td><b>Personnalisation</b></td><td>${customization || "—"}</td></tr>
          <tr><td><b>Délai cible</b></td><td>${deadline || "—"}</td></tr>
        </table>
        <hr/>
        <p><b>Message :</b><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
      `;
    } else {
      if (!message) return NextResponse.json({ error: "Message requis." }, { status: 400 });
      html = `
        <h2>Nouveau message — schoppmann.ca</h2>
        <table cellpadding="6" style="font-family:monospace;font-size:14px">
          <tr><td><b>Nom</b></td><td>${name}</td></tr>
          <tr><td><b>Courriel</b></td><td>${email}</td></tr>
        </table>
        <hr/>
        <p>${message.replace(/\n/g, "<br/>")}</p>
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
