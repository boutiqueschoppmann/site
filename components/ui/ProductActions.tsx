"use client";

import { useState } from "react";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import type { Product } from "@/lib/products";

export default function ProductActions({ product }: { product: Product }) {
  const [gravure, setGravure] = useState(false);

  return (
    <div className="flex flex-col gap-4 pt-2">
      {/* Option gravure */}
      <label className="flex items-start gap-3 cursor-pointer border border-charbon/10 p-4 hover:border-charbon/25 transition-colors">
        <input
          type="checkbox"
          checked={gravure}
          onChange={(e) => setGravure(e.target.checked)}
          className="mt-0.5 accent-charbon"
        />
        <div>
          <p className="text-sm text-charbon font-medium">Gravure laser — +8 CAD</p>
          <p className="text-xs text-charbon/50 mt-0.5">Jusqu&apos;à 20 caractères · Précisez le texte lors de votre commande</p>
          <p className="text-xs text-charbon/40 mt-1">Remodification à vie — retournez le crayon pour une nouvelle gravure</p>
        </div>
      </label>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <AddToCartButton product={product} gravure={gravure} />
        <Link
          href="/contact"
          className="flex-1 text-center border border-charbon/20 text-charbon py-4 px-6 text-sm hover:border-charbon/50 transition-colors"
        >
          Commander par courriel
        </Link>
      </div>

      {/* Livraison */}
      <p className="text-xs text-charbon/40 text-center">
        Livraison 3 CAD · Ramassage gratuit à Sainte-Brigitte-de-Laval, Montréal ou Québec
      </p>
    </div>
  );
}
