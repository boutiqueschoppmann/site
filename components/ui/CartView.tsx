"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartView() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-16 md:pt-28 bg-lin min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-32 flex flex-col items-center text-center gap-8">
          <div className="w-16 h-16 border border-charbon/15 flex items-center justify-center">
            <CartIcon className="text-charbon/30" />
          </div>
          <div>
            <h1 className="font-display text-4xl text-charbon mb-3">Votre panier est vide.</h1>
            <p className="text-charbon/50 text-base">
              Parcourez la boutique et ajoutez des articles pour commencer.
            </p>
          </div>
          <Link
            href="/boutique"
            className="bg-charbon text-lin px-8 py-4 text-sm tracking-wide hover:bg-charbon/80 transition-colors"
          >
            Découvrir la boutique
          </Link>
        </div>
      </div>
    );
  }

  const shipping = totalPrice >= 100 ? 0 : 9.95;
  const taxes = +(totalPrice * 0.14975).toFixed(2);
  const total = +(totalPrice + shipping + taxes).toFixed(2);

  return (
    <div className="pt-16 md:pt-28 bg-lin min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* En-tête */}
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-xs text-charbon/40 font-mono mb-4">
            <Link href="/" className="hover:text-charbon transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-charbon/70">Panier</span>
          </nav>
          <h1 className="font-display text-4xl text-charbon">
            Panier{" "}
            <span className="text-charbon/30 text-2xl font-mono">
              ({totalItems} article{totalItems > 1 ? "s" : ""})
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Liste articles */}
          <div className="lg:col-span-2 flex flex-col divide-y divide-charbon/8">
            {items.map((item) => (
              <div key={item.slug} className="py-6 flex gap-5">
                {/* Image */}
                <Link href={`/produits/${item.slug}`} className="flex-shrink-0">
                  <div className="relative w-20 h-20 bg-charbon/5 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      sizes="80px"
                    />
                  </div>
                </Link>

                {/* Infos */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <Link href={`/produits/${item.slug}`} className="font-display text-lg text-charbon hover:text-charbon/70 transition-colors leading-snug">
                        {item.name}
                      </Link>
                      {item.tagline && (
                        <p className="text-charbon/40 text-sm">{item.tagline}</p>
                      )}
                    </div>
                    <span className="font-mono text-charbon text-sm flex-shrink-0">
                      {(item.price * item.quantity).toFixed(2)} CAD
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    {/* Quantité */}
                    <div className="flex items-center border border-charbon/15 h-8">
                      <button
                        onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                        className="w-8 h-full flex items-center justify-center text-charbon/60 hover:text-charbon hover:bg-charbon/5 transition-colors text-lg leading-none"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-mono text-charbon">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        className="w-8 h-full flex items-center justify-center text-charbon/60 hover:text-charbon hover:bg-charbon/5 transition-colors text-lg leading-none"
                      >
                        +
                      </button>
                    </div>

                    {/* Supprimer */}
                    <button
                      onClick={() => removeFromCart(item.slug)}
                      className="text-xs text-charbon/30 hover:text-charbon/70 transition-colors font-mono tracking-wide"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Récap commande */}
          <div className="border border-charbon/10 p-6 flex flex-col gap-5 sticky top-32">
            <h2 className="font-display text-xl text-charbon">Récapitulatif</h2>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-charbon/70">
                <span>Sous-total</span>
                <span className="font-mono">{totalPrice.toFixed(2)} CAD</span>
              </div>
              <div className="flex justify-between text-charbon/70">
                <span>Livraison</span>
                <span className="font-mono">
                  {shipping === 0 ? (
                    <span className="text-cuir">Gratuite</span>
                  ) : (
                    `${shipping.toFixed(2)} CAD`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-charbon/70">
                <span>TPS/TVQ (14,975%)</span>
                <span className="font-mono">{taxes.toFixed(2)} CAD</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-charbon/40 font-mono">
                  Livraison gratuite dès 100 CAD
                </p>
              )}
            </div>

            <div className="border-t border-charbon/10 pt-4 flex justify-between font-mono text-charbon">
              <span className="text-base">Total</span>
              <span className="text-lg">{total.toFixed(2)} CAD</span>
            </div>

            <button
              disabled
              className="w-full bg-charbon text-lin py-4 text-sm tracking-wide opacity-50 cursor-not-allowed"
              title="Paiement en cours d'intégration"
            >
              Procéder au paiement
            </button>
            <p className="text-xs text-charbon/30 text-center font-mono">
              Paiement en ligne bientôt disponible
            </p>

            <div className="border-t border-charbon/8 pt-4">
              <p className="text-xs text-charbon/40 mb-3">En attendant, vous pouvez :</p>
              <Link
                href="/contact"
                className="block text-center border border-charbon/15 text-charbon py-3 text-sm hover:border-charbon/40 transition-colors"
              >
                Commander par courriel →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
