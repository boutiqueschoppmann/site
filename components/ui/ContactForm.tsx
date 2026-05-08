"use client";

import { useState } from "react";

type FormType = "b2b" | "contact";

const MESSAGE_MAX = 2000;
const CUSTOMIZATION_MAX = 500;

export default function ContactForm({ type = "contact" }: { type?: FormType }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [customization, setCustomization] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Erreur inconnue");
      }

      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur d'envoi. Réessayez ou écrivez-nous directement.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-charbon/10 p-10 text-center">
        <p className="font-display text-2xl text-charbon mb-2">Message envoyé.</p>
        <p className="text-charbon/50 text-sm">On vous répond sous 48 h ouvrables.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Champs communs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Prénom / Nom" name="name" required />
        <Field label="Courriel" name="email" type="email" required />
      </div>

      {type === "b2b" && (
        <>
          <Field label="Entreprise" name="company" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Téléphone" name="phone" type="tel" />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-charbon/50 tracking-wide uppercase font-mono">
                Quantité estimée
              </label>
              <select
                name="quantity"
                className="border border-charbon/20 bg-lin px-4 py-3 text-sm text-charbon focus:outline-none focus:border-charbon/50 transition-colors"
              >
                <option value="">Sélectionner</option>
                <option>25 – 50</option>
                <option>50 – 100</option>
                <option>100 – 250</option>
                <option>250 – 500</option>
                <option>500+</option>
              </select>
            </div>
          </div>
          <Field label="Type de produit souhaité" name="product" />
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-baseline">
              <label className="text-xs text-charbon/50 tracking-wide uppercase font-mono">
                Personnalisation souhaitée (gravure, couleur, etc.)
              </label>
              <span className={`text-xs font-mono tabular-nums ${customization.length > CUSTOMIZATION_MAX * 0.9 ? "text-rouge" : "text-charbon/30"}`}>
                {customization.length}/{CUSTOMIZATION_MAX}
              </span>
            </div>
            <input
              name="customization"
              type="text"
              maxLength={CUSTOMIZATION_MAX}
              value={customization}
              onChange={(e) => setCustomization(e.target.value)}
              className="border border-charbon/20 bg-lin px-4 py-3 text-sm text-charbon focus:outline-none focus:border-charbon/50 transition-colors"
            />
          </div>
          <Field label="Délai cible" name="deadline" placeholder="ex. : avant le 15 décembre" />
        </>
      )}

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-baseline">
          <label className="text-xs text-charbon/50 tracking-wide uppercase font-mono">
            Message {type === "contact" && <span className="text-cuir">*</span>}
          </label>
          <span className={`text-xs font-mono tabular-nums ${message.length > MESSAGE_MAX * 0.9 ? "text-rouge" : "text-charbon/30"}`}>
            {message.length}/{MESSAGE_MAX}
          </span>
        </div>
        <textarea
          name="message"
          rows={4}
          required={type === "contact"}
          maxLength={MESSAGE_MAX}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-charbon/20 bg-lin px-4 py-3 text-sm text-charbon focus:outline-none focus:border-charbon/50 transition-colors resize-none"
          placeholder={type === "b2b" ? "Décrivez votre besoin..." : "Votre message..."}
        />
      </div>

      {error && (
        <p className="text-sm text-rouge border border-rouge/20 px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="self-start bg-charbon text-lin px-8 py-4 text-sm tracking-wide hover:bg-charbon/80 transition-colors disabled:opacity-50"
      >
        {loading ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs text-charbon/50 tracking-wide uppercase font-mono">
        {label} {required && <span className="text-cuir">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="border border-charbon/20 bg-lin px-4 py-3 text-sm text-charbon focus:outline-none focus:border-charbon/50 transition-colors"
      />
    </div>
  );
}
