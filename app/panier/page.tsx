import type { Metadata } from "next";
import CartView from "@/components/ui/CartView";

export const metadata: Metadata = {
  title: "Panier",
  description: "Votre panier Schoppmann.",
};

export default function PanierPage() {
  return <CartView />;
}
