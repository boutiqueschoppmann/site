"use client";

import { useState } from "react";
import type { CartItem } from "@/lib/cart";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  pickupLocation: string | null;
  pickupDiscount: number;
  discountedSubtotal: number;
  shipping: number;
  taxes: number;
  total: number;
}

export default function OrderModal({
  isOpen,
  onClose,
  items,
  pickupLocation,
  pickupDiscount,
  discountedSubtotal,
  shipping,
  taxes,
  total,
}: Props) {
  const gravureItems = items.filter((i) => i.gravure);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gravureTexts, setGravureTexts] = useState<Record<string, string>>({});
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "order",
          name,
          email,
          phone,
          items,
          gravureTexts,
          pickupLocation,
          pickupDiscount,
          discountedSubtotal,
          shipping,
          taxes,
          total,
          note,
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Une erreur est survenue. Réessayez ou écrivez-nous directement.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-charbon/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-lin w-full md:max-w-2xl md:mx-4 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-lin border-b border-charbon/10 px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-charbon">Commander par courriel</h2>
          <button onClick={onClose} className="text-charbon/40 hover:text-charbon transition-colors text-2xl leading-none">×</button>
        </div>

        {sent ? (
          <div className="px-6 py-12 text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 border border-charbon/15 flex items-center justify-center text-2xl">✓</div>
            <h3 className="font-display text-2xl text-charbon">Commande envoyée !</h3>
            <p className="text-charbon/60 text-sm max-w-sm">
              Nous avons bien reçu votre commande. Nous vous contacterons sous 24h pour confirmer et organiser la livraison ou le ramassage.
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-charbon text-lin px-8 py-3 text-sm hover:bg-charbon/80 transition-colors"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-6">
            {/* Récap commande */}
            <div className="bg-charbon/4 border border-charbon/10 p-4 flex flex-col gap-2">
              <p className="text-xs text-charbon/40 tracking-widest uppercase font-mono mb-1">Récapitulatif</p>
              {items.map((item) => (
                <div key={item.slug} className="flex justify-between text-sm">
                  <span className="text-charbon/70">
                    {item.name}{item.tagline ? ` — ${item.tagline}` : ""} × {item.quantity}
                    {item.gravure && <span className="text-cuir ml-1 font-mono text-xs">+ gravure</span>}
                  </span>
                  <span className="font-mono text-charbon text-xs">
                    {((item.price + (item.gravure ? 8 : 0)) * item.quantity).toFixed(2)} CAD
                  </span>
                </div>
              ))}
              <div className="border-t border-charbon/10 mt-2 pt-2 flex flex-col gap-1">
                {pickupDiscount > 0 && (
                  <div className="flex justify-between text-xs text-cuir">
                    <span>Remise ramassage (−5%)</span>
                    <span className="font-mono">−{pickupDiscount.toFixed(2)} CAD</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-charbon/50">
                  <span>{pickupLocation ? `Ramassage — ${pickupLocation}` : shipping === 0 ? "Livraison gratuite" : "Livraison"}</span>
                  <span className="font-mono">{shipping === 0 ? "0,00 CAD" : `${shipping.toFixed(2)} CAD`}</span>
                </div>
                <div className="flex justify-between text-xs text-charbon/50">
                  <span>TPS/TVQ (14,975%)</span>
                  <span className="font-mono">{taxes.toFixed(2)} CAD</span>
                </div>
                <div className="flex justify-between text-sm font-mono text-charbon font-medium mt-1">
                  <span>Total</span>
                  <span>{total.toFixed(2)} CAD</span>
                </div>
              </div>
            </div>

            {/* Textes de gravure */}
            {gravureItems.length > 0 && (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-charbon/40 tracking-widest uppercase font-mono">Texte de gravure</p>
                {gravureItems.map((item) => (
                  <div key={item.slug}>
                    <label className="block text-sm text-charbon mb-1">
                      {item.name}{item.tagline ? ` — ${item.tagline}` : ""}
                      {item.quantity > 1 && <span className="text-charbon/40"> (× {item.quantity})</span>}
                    </label>
                    <input
                      type="text"
                      maxLength={20}
                      required
                      placeholder="Jusqu'à 20 caractères"
                      value={gravureTexts[item.slug] ?? ""}
                      onChange={(e) => setGravureTexts((prev) => ({ ...prev, [item.slug]: e.target.value }))}
                      className="w-full border border-charbon/20 bg-transparent px-3 py-2 text-sm text-charbon placeholder:text-charbon/30 focus:outline-none focus:border-charbon/50 font-mono"
                    />
                    <p className="text-xs text-charbon/30 mt-1 font-mono">
                      {(gravureTexts[item.slug] ?? "").length}/20 caractères
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Coordonnées */}
            <div className="flex flex-col gap-4">
              <p className="text-xs text-charbon/40 tracking-widest uppercase font-mono">Vos coordonnées</p>
              <div>
                <label className="block text-sm text-charbon mb-1">Nom complet <span className="text-cuir">*</span></label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-charbon/20 bg-transparent px-3 py-2 text-sm text-charbon placeholder:text-charbon/30 focus:outline-none focus:border-charbon/50"
                  placeholder="Prénom Nom"
                />
              </div>
              <div>
                <label className="block text-sm text-charbon mb-1">Courriel <span className="text-cuir">*</span></label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-charbon/20 bg-transparent px-3 py-2 text-sm text-charbon placeholder:text-charbon/30 focus:outline-none focus:border-charbon/50"
                  placeholder="vous@exemple.com"
                />
              </div>
              <div>
                <label className="block text-sm text-charbon mb-1">Téléphone <span className="text-charbon/30 text-xs">(optionnel)</span></label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-charbon/20 bg-transparent px-3 py-2 text-sm text-charbon placeholder:text-charbon/30 focus:outline-none focus:border-charbon/50"
                  placeholder="514 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm text-charbon mb-1">Note <span className="text-charbon/30 text-xs">(optionnel)</span></label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full border border-charbon/20 bg-transparent px-3 py-2 text-sm text-charbon placeholder:text-charbon/30 focus:outline-none focus:border-charbon/50 resize-none"
                  placeholder="Informations complémentaires, délai souhaité…"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-charbon text-lin py-4 text-sm tracking-wide hover:bg-charbon/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Envoi en cours…" : "Envoyer la commande"}
            </button>
            <p className="text-xs text-charbon/30 text-center">
              Nous vous contacterons sous 24h pour confirmer et organiser la livraison.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
