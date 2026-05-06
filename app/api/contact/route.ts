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
    const { name, email, message, type, company, quantity, product, customization, deadline } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }

    const isB2B = type === "b2b";
    const subject = isB2B
      ? `[Devis B2B] ${company || name} — ${quantity || "quantité non précisée"}`
      : `[Contact] Message de ${name}`;

    const html = isB2B
      ? `
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
        <p><b>Message :</b><br/>${message.replace(/\n/g, "<br/>")}</p>
      `
      : `
        <h2>Nouveau message — schoppmann.ca</h2>
        <table cellpadding="6" style="font-family:monospace;font-size:14px">
          <tr><td><b>Nom</b></td><td>${name}</td></tr>
          <tr><td><b>Courriel</b></td><td>${email}</td></tr>
        </table>
        <hr/>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `;

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
