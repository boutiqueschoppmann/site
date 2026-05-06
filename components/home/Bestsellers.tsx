import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";

const slugs = ["crayon-infini-boite-3d", "crayon-infini-cuir", "crayon-hybride-boite-3d", "pack-5-mines"];
const bestsellers = slugs
  .map((s) => products.find((p) => p.slug === s))
  .filter(Boolean) as typeof products;

export default function Bestsellers() {
  return (
    <section className="bg-charbon/3 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-charbon">Les essentiels</h2>
          <Link href="/boutique" className="hidden md:inline-flex text-sm text-charbon/50 hover:text-charbon transition-colors gap-2 items-center">
            Voir tout le catalogue
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
