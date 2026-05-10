import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "Gamme Golf",
  description: "Crayons de golf premium en aluminium. Format poche, mine infinie, boîte hexagonale 3D incluse. Faits main au Québec.",
};

const golfProducts = products.filter((p) => p.collection === "golf");

const reasons = [
  { title: "Format poche", body: "95 mm — adapté à la poche de sac. Toujours là quand vous en avez besoin." },
  { title: "Mine indestructible", body: "Aucune mine cassée à cause des vibrations du sac. La mine métal-céramique résiste à tout." },
  { title: "Boîte hexagonale 3D", body: "Imprimée à l'atelier en filament recyclé. Protège le crayon, facile à retrouver dans le sac." },
  { title: "Option étui en cuir", body: "Pour ceux qui veulent le maximum. Cuir pleine fleur canadienne, patine avec le temps." },
];

export default function GolfPage() {
  return (
    <div className="pt-16 md:pt-28 bg-lin min-h-screen">
      {/* Hero */}
      <section className="relative bg-charbon min-h-[70vh] flex items-end overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
          <p className="text-lin/40 text-xs tracking-widest uppercase font-mono mb-4">Gamme golf</p>
          <h1 className="font-display text-lin text-5xl md:text-6xl max-w-xl leading-tight mb-4">
            L&apos;objet de précision qui appartient à votre sac.
          </h1>
          <div className="flex gap-6 text-sm text-lin/60 mt-6">
            <div>
              <span className="font-mono text-xl text-lin block">17 CAD</span>Boîte hexagonale 3D
            </div>
            <div className="border-l border-lin/20 pl-6">
              <span className="font-mono text-xl text-lin block">31 CAD</span>Étui en cuir
            </div>
          </div>
        </div>
      </section>

      {/* Pitch */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-charbon/60 text-xl leading-relaxed">
          L&apos;idée est née sur un parcours, au 14e trou. Un crayon HB cassé, un carnet froissé.
          Il y avait mieux à faire. On l&apos;a fait.
        </p>
      </section>

      {/* Produits */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="font-display text-3xl text-charbon mb-10">La collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          {golfProducts.map((p) => (
            <ProductCard key={p.slug} product={p} size="lg" />
          ))}
        </div>
      </section>

      {/* Avantages */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-display text-4xl text-charbon mb-12">Conçu pour les parcours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((r) => (
            <div key={r.title} className="border-t border-charbon/10 pt-6">
              <h3 className="font-display text-xl text-charbon mb-3">{r.title}</h3>
              <p className="text-charbon/60 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo macro mine */}
      <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-charbon/10">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src="/images/products/crayon-balle-golf-schoppmann.jpeg" alt="Crayon Schoppmann pointé sur balle de golf Schoppmann" fill className="object-cover" sizes="600px" />
        </div>
        <div>
          <h2 className="font-display text-3xl text-charbon mb-4">Une mine qui ne casse jamais.</h2>
          <p className="text-charbon/60 leading-relaxed">
            La mine Schoppmann est en alliage métal-céramique. Elle ne se brise pas dans le sac,
            ne s&apos;effrite pas sous la pluie, ne laisse pas de résidu sur les gants.
          </p>
        </div>
      </section>


      {/* CTA B2B */}
      <section className="bg-charbon py-20 mt-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-lin/40 text-xs tracking-widest uppercase font-mono mb-4">Clubs & pro shops</p>
          <h2 className="font-display text-lin text-4xl mb-6">Votre logo, gravé sur chaque crayon.</h2>
          <p className="text-lin/60 mb-8">Commandes à partir de 25 unités. Tarifs dégressifs.</p>
          <Link href="/cadeaux-entreprises" className="group inline-flex items-center gap-2 border border-lin/30 text-lin px-8 py-4 text-sm hover:border-lin hover:bg-lin/10 hover:gap-3 transition-all duration-200">
            Demander un devis
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-0 -translate-x-3 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
