"use client";

import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export default function AddToCartButton({ product, gravure = false }: { product: Product; gravure?: boolean }) {
  const { addToCart, updateQuantity, items } = useCart();
  const item = items.find((i) => i.slug === product.slug);
  const quantity = item?.quantity ?? 0;

  if (quantity === 0) {
    return (
      <button
        onClick={() => addToCart(product, gravure)}
        className="flex-1 bg-charbon text-lin border-2 border-charbon py-4 px-6 text-sm tracking-wide hover:bg-charbon/80 transition-all duration-200"
      >
        Ajouter au panier
      </button>
    );
  }

  return (
    <div className="flex-1 flex items-stretch border border-charbon h-14">
      <button
        onClick={() => updateQuantity(product.slug, quantity - 1)}
        className="w-12 flex items-center justify-center text-charbon text-xl hover:bg-charbon/8 transition-colors border-r border-charbon/20 flex-shrink-0"
        aria-label="Diminuer la quantité"
      >
        −
      </button>
      <div className="flex-1 flex flex-col items-center justify-center">
        <span className="font-mono text-charbon text-base leading-none">{quantity}</span>
        <span className="text-charbon/40 text-[10px] font-mono tracking-wide mt-0.5">
          {quantity > 1 ? "articles" : "article"}
        </span>
      </div>
      <button
        onClick={() => addToCart(product, gravure)}
        className="w-12 flex items-center justify-center text-charbon text-xl hover:bg-charbon/8 transition-colors border-l border-charbon/20 flex-shrink-0"
        aria-label="Augmenter la quantité"
      >
        +
      </button>
    </div>
  );
}
