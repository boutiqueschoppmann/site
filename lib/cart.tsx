"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "./products";

export interface CartItem {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  quantity: number;
  gravure: boolean;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, gravure?: boolean) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("schoppmann-cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        setItems(parsed.map((item: CartItem) => ({ ...item, gravure: item.gravure ?? false })));
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("schoppmann-cart", JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addToCart = (product: Product, gravure = false) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === product.slug ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          tagline: product.tagline,
          price: product.price,
          image: product.image,
          quantity: 1,
          gravure,
        },
      ];
    });
  };

  const removeFromCart = (slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  };

  const updateQuantity = (slug: string, qty: number) => {
    if (qty < 1) {
      removeFromCart(slug);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + (i.price + (i.gravure ? 8 : 0)) * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
