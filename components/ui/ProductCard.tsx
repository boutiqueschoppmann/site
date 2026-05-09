import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

interface Props {
  product: Product;
  size?: "sm" | "md" | "lg";
}

export default function ProductCard({ product, size = "md" }: Props) {
  const imgHeight = size === "lg" ? "aspect-[3/4]" : "aspect-square";

  return (
    <Link
      href={product.href}
      className="group border border-charbon/10 hover:border-charbon/25 transition-all duration-300 flex flex-col bg-lin"
    >
      {/* Image */}
      <div className={`${imgHeight} relative bg-charbon/5 overflow-hidden`}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Infos */}
      <div className="p-5 flex flex-col gap-1.5 flex-1">
        {product.badge && (
          <span className="self-start text-xs font-mono tracking-widest uppercase text-cuir border border-cuir/30 px-2 py-0.5 mb-1">
            {product.badge}
          </span>
        )}
        <h3 className="font-display text-charbon text-lg leading-snug">{product.name}</h3>
        <p className="text-charbon/50 text-sm leading-relaxed flex-1">{product.sub}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-charbon/8">
          <span className="font-mono text-charbon text-sm">{product.price} CAD</span>
          <span className="text-xs text-charbon/40 group-hover:text-charbon/70 transition-colors flex items-center gap-1">
            Voir <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
