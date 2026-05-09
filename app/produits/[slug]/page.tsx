import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, collectionLabels } from "@/lib/products";
import ProductGallery from "@/components/ui/ProductGallery";
import ProductCard from "@/components/ui/ProductCard";
import ProductActions from "@/components/ui/ProductActions";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name}${product.tagline ? ` — ${product.tagline}` : ""}`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  // Suggestions : même collection, pas le même produit
  const related = products
    .filter((p) => p.collection === product.collection && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="pt-16 md:pt-28 bg-lin min-h-screen">
      {/* Fil d'Ariane */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-xs text-charbon/40 font-mono">
        <Link href="/" className="hover:text-charbon transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/boutique" className="hover:text-charbon transition-colors">Boutique</Link>
        <span>/</span>
        <Link
          href={`/boutique#${product.collection}`}
          className="hover:text-charbon transition-colors"
        >
          {collectionLabels[product.collection]}
        </Link>
        <span>/</span>
        <span className="text-charbon/70">
          {product.name}{product.tagline ? ` — ${product.tagline}` : ""}
        </span>
      </div>

      {/* Fiche produit */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Galerie */}
        <ProductGallery images={product.gallery} />

        {/* Infos produit */}
        <div className="flex flex-col gap-6">
          {/* En-tête */}
          <div>
            {product.badge && (
              <span className="inline-block text-xs bg-cuir text-lin px-2 py-0.5 mb-3">
                {product.badge}
              </span>
            )}
            <h1 className="font-display text-4xl md:text-5xl text-charbon leading-tight">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="font-display text-2xl text-charbon/40 mt-1">{product.tagline}</p>
            )}
          </div>

          {/* Prix */}
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-3xl text-charbon">{product.price} CAD</span>
            <span className="text-charbon/40 text-sm">sans TPS/TVQ</span>
          </div>

          {/* Description courte */}
          <p className="text-charbon/70 text-base leading-relaxed border-t border-charbon/10 pt-6">
            {product.description}
          </p>

          {/* Contenu de la boîte */}
          <div className="border border-charbon/10 p-5">
            <p className="text-xs text-charbon/40 tracking-widest uppercase font-mono mb-3">
              Contenu de la commande
            </p>
            <ul className="flex flex-col gap-2">
              {product.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-charbon/70">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cuir flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Réassurance courte */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "🛠", label: "Garantie à vie" },
              { img: "/images/flag-qc.svg", label: "Fait au Québec" },
              { icon: "📦", label: "Ramassage local gratuit" },
              { icon: "↩", label: "Retour 30 jours" },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-2 text-xs text-charbon/60">
                {"img" in r
                  ? <img src={r.img} alt="" width={18} height={13} className="shrink-0" />
                  : <span>{r.icon}</span>
                }
                <span>{r.label}</span>
              </div>
            ))}
          </div>

          <ProductActions product={product} />
        </div>
      </div>

      {/* Produits complémentaires */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-charbon/10">
          <h2 className="font-display text-3xl text-charbon mb-8">Vous aimerez aussi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
