import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    title: "Mine infinie classique",
    sub: "Aluminium usiné, mine graphite permanente",
    href: "/boutique#mine-infinie",
    accent: "L'original",
    image: "/images/products/mine-infinie-montee-stylo.jpg",
    imageAlt: "Crayon Schoppmann mine infinie montée sur stylo",
  },
  {
    title: "Crayons hybrides",
    sub: "Mine infinie + cartouche stylo",
    href: "/boutique#hybride",
    accent: "Mine + Encre",
    image: "/images/products/mine-stylo-montee.png",
    imageAlt: "Crayon Schoppmann hybride avec mine stylo montée",
  },
  {
    title: "Gamme golf",
    sub: "Conçus pour le parcours",
    href: "/golf",
    accent: "Format poche",
    image: "/images/products/crayon-balle-golf-schoppmann.jpeg",
    imageAlt: "Crayon Schoppmann pointé sur balle de golf Schoppmann",
  },
];

export default function Collections() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-12">
        <h2 className="font-display text-4xl md:text-5xl text-charbon">Nos collections</h2>
        <Link
          href="/boutique"
          className="hidden md:inline-flex text-sm text-charbon/50 hover:text-charbon transition-colors gap-2 items-center"
        >
          Tout voir
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col) => (
          <Link
            key={col.href}
            href={col.href}
            className="group block border border-charbon/15 hover:border-charbon/50 transition-colors duration-300 overflow-hidden"
          >
            {/* Zone image — hauteur fixe, même traitement pour toutes */}
            <div className="relative h-64 bg-charbon overflow-hidden">
              <Image
                src={col.image}
                alt={col.imageAlt}
                fill
                className="object-contain p-6 opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Zone texte */}
            <div className="p-6 border-t border-charbon/15">
              <span className="inline-block text-xs text-cuir tracking-widest uppercase mb-2 font-mono">
                {col.accent}
              </span>
              <h3 className="font-display text-charbon text-xl mb-1">{col.title}</h3>
              <p className="text-charbon/50 text-sm mb-5">{col.sub}</p>
              <span className="inline-flex items-center gap-2 text-charbon/40 text-xs tracking-wide group-hover:text-charbon group-hover:gap-3 transition-all duration-200">
                Découvrir
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
