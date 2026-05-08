import type { Metadata } from "next";
import Link from "next/link";
import { products, collectionLabels } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import BoutiqueNav from "@/components/ui/BoutiqueNav";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Tous nos crayons réutilisables en aluminium — mine infinie, hybride, golf, recharges. Faits main au Québec.",
};

const sections = [
  {
    id: "mine-infinie",
    label: collectionLabels["mine-infinie"],
    description: "Mine métal-céramique qui ne s'use pas. Corps aluminium usiné à la main.",
  },
  {
    id: "hybride",
    label: collectionLabels["hybride"],
    description: "Mine infinie côté pointe + cartouche encre bleue côté embout. Deux modes en un objet.",
  },
  {
    id: "recharges",
    label: collectionLabels["recharges"],
    description: "Mines métal-céramique compatibles tous modèles. Noir et rouge.",
  },
] as const;

export default function BoutiquePage() {
  return (
    <div className="pt-16 md:pt-28 min-h-screen bg-lin">

      {/* En-tête */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        {/* Breadcrumb accueil */}
        <nav className="flex items-center gap-2 text-xs text-charbon/40 font-mono mb-6">
          <Link href="/" className="hover:text-charbon transition-colors">Accueil</Link>
          <span>/</span>
          <span className="text-charbon/70">Boutique</span>
        </nav>

        <h1 className="font-display text-5xl md:text-6xl text-charbon mb-3">Boutique</h1>
        <p className="text-charbon/50 text-lg max-w-xl">
          Chaque crayon est livré avec sa boîte hexagonale imprimée 3D.
          Option étui en cuir disponible sur chaque modèle.
        </p>
      </div>

      {/* Nav sections sticky */}
      <BoutiqueNav sections={sections.map(s => ({ id: s.id, label: s.label }))} />

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {sections.map((section, i) => {
          const sectionProducts = products.filter((p) => p.collection === section.id);
          return (
            <section
              key={section.id}
              id={section.id}
              className={`py-14 ${i < sections.length - 1 ? "border-b border-charbon/10" : ""}`}
            >
              {/* Titre section */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-8">
                <div>
                  <span className="text-xs text-cuir tracking-widest uppercase font-mono block mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl text-charbon">{section.label}</h2>
                  <p className="text-charbon/50 text-sm mt-1 max-w-md">{section.description}</p>
                </div>
                {sectionProducts.length > 2 && (
                  <span className="text-xs text-charbon/30 font-mono">
                    {sectionProducts.length} articles
                  </span>
                )}
              </div>

              {/* Grille */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sectionProducts.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
