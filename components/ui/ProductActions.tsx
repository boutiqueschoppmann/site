"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import OrderModal from "./OrderModal";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

export default function ProductActions({ product }: { product: Product }) {
  const [gravure, setGravure] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const { totalItems, addToCart } = useCart();
  const router = useRouter();

  const unitPrice = product.price + (gravure ? 8 : 0);
  const shipping = unitPrice >= 100 ? 0 : 3;
  const taxes = +((unitPrice + shipping) * 0.14975).toFixed(2);
  const total = +(unitPrice + shipping + taxes).toFixed(2);

  const singleItem = [{
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    price: product.price,
    image: product.image,
    quantity: 1,
    gravure,
  }];

  function handleOrderByMail() {
    if (totalItems === 0) {
      setOrderOpen(true);
    } else {
      addToCart(product, gravure);
      sessionStorage.setItem("autoOpenOrder", "1");
      router.push("/panier");
    }
  }

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
        <button
          onClick={handleOrderByMail}
          className="flex-1 text-center border border-charbon/20 text-charbon py-4 px-6 text-sm hover:border-charbon/50 transition-colors"
        >
          Commander par courriel
        </button>
      </div>

      {/* Livraison */}
      <p className="text-xs text-charbon/40 text-center">
        Livraison 3 CAD · Ramassage gratuit à Sainte-Brigitte-de-Laval, Montréal ou Québec
      </p>

      <OrderModal
        isOpen={orderOpen}
        onClose={() => setOrderOpen(false)}
        items={singleItem}
        pickupLocation={null}
        pickupDiscount={0}
        discountedSubtotal={unitPrice}
        shipping={shipping}
        taxes={taxes}
        total={total}
      />
    </div>
  );
}
