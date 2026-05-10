import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre histoire",
  description: "L'histoire de Schoppmann — née d'études en génie et d'un atelier à Sainte-Brigitte-de-Laval, Québec.",
};

const chapters = [
  {
    n: "01",
    title: "L'origine",
    body: "Tout commence dans un cours de génie mécanique. Une obsession pour les objets bien conçus, durables, honnêtes. Le crayon jetable semblait l'antithèse exacte de tout ça. Alors on en a fabriqué un autre.",
  },
  {
    n: "02",
    title: "L'atelier",
    body: "Sainte-Brigitte-de-Laval, Québec. C'est là que chaque pièce naît, sur un tour CNC, au son du métal qui se façonne. Pas de sous-traitance, pas de délocalisation. Tout ce qu'on vend, on l'usine nous-mêmes.",
  },
  {
    n: "03",
    title: "La gamme golf",
    body: "Un jour, au 14e trou, le crayon HB casse. Le carnet est froissé. Il y a clairement mieux à faire. Quelques semaines plus tard, le premier prototype golf sort de l'atelier. Plus court, plus robuste, pensé pour le sac.",
  },
  {
    n: "04",
    title: "Notre engagement",
    body: "Local d'abord. Matières recyclées quand c'est possible. Garantie à vie parce qu'un objet bien fait devrait durer plus longtemps que son propriétaire. Et réparable, parce que jeter quelque chose de bon est une faute de goût.",
  },
];

const values = [
  { label: "Durabilité", sub: "Un crayon pour la vie, pas pour la semaine" },
  { label: "Fabrication locale", sub: "Usiné au Québec, expédié du Québec" },
  { label: "Qualité de finition", sub: "Chaque pièce vérifiée à la main" },
  { label: "Réutilisable à vie", sub: "Rien n'est jetable chez nous" },
];

export default function NotreHistoirePage() {
  return (
    <div className="pt-16 md:pt-28 bg-lin min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-0">
        <nav className="flex items-center gap-2 text-xs text-charbon/40 font-mono">
          <a href="/" className="hover:text-charbon transition-colors">Accueil</a>
          <span>/</span>
          <span className="text-charbon/70">Notre histoire</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
        <div>
          <p className="text-xs text-cuir tracking-widest uppercase font-mono mb-6">Notre histoire</p>
          <h1 className="font-display text-5xl md:text-6xl text-charbon leading-tight">
            Une obsession québécoise pour les objets qui durent.
          </h1>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-charbon/5">
          <Image src="/images/machine_a_crayons.jpg" alt="Machine CNC Schoppmann — atelier Sainte-Brigitte-de-Laval" fill className="object-cover" sizes="700px" />
        </div>
      </section>

      {/* Chapitres */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        {chapters.map((c, i) => (
          <div key={c.n} className={`py-16 ${i < chapters.length - 1 ? "border-b border-charbon/10" : ""}`}>
            <span className="font-mono text-5xl text-charbon/8 font-bold block mb-4">{c.n}</span>
            <h2 className="font-display text-3xl text-charbon mb-5">{c.title}</h2>
            <p className="text-charbon/60 text-lg leading-relaxed">{c.body}</p>
          </div>
        ))}
      </section>

      {/* Valeurs */}
      <section className="bg-charbon py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-lin text-4xl mb-12">Ce en quoi on croit</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.label} className="border-t border-lin/20 pt-6">
                <h3 className="font-display text-lin text-xl mb-2">{v.label}</h3>
                <p className="text-lin/40 text-sm">{v.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <Link
          href="/boutique"
          className="group inline-flex items-center gap-2 bg-charbon text-lin px-10 py-5 text-sm tracking-wide hover:bg-charbon/80 hover:gap-3 transition-all duration-200"
        >
          Découvrir nos crayons
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-200 group-hover:translate-x-1">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </div>
  );
}
