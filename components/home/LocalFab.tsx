import Image from "next/image";
import Link from "next/link";

export default function LocalFab() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      {/* Photo machine */}
      <div className="aspect-[4/3] relative overflow-hidden bg-charbon">
        <Image
          src="/images/machine_a_crayons.jpg"
          alt="Machine CNC Schoppmann construite à la main — atelier Sainte-Brigitte-de-Laval"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute bottom-0 left-0 w-1 h-16 bg-cuir" />
      </div>

      {/* Texte */}
      <div>
        <span className="text-xs text-cuir tracking-widest uppercase font-mono block mb-6">
          Fabrication locale
        </span>
        <h2 className="font-display text-4xl md:text-5xl text-charbon mb-6 leading-tight">
          Tout naît ici.
        </h2>
        <p className="text-charbon/60 text-lg leading-relaxed mb-8">
          La machine qui usine chaque crayon a elle-même été construite à la main — mécanique,
          électronique, programmation G-code : tout fait maison, de A à Z.
          Chaque pièce est vérifiée à la main avant d&apos;arriver chez vous.
        </p>

        <ul className="flex flex-col gap-3 mb-10">
          {[
            "Machine CNC conçue et assemblée à l'atelier",
            "Électronique et G-code entièrement maison",
            "Finition et contrôle qualité manuel",
            "Expédié depuis Sainte-Brigitte-de-Laval",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-charbon/70 text-sm">
              <span className="mt-1 w-1 h-1 rounded-full bg-cuir flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <Link
          href="/savoir-faire"
          className="inline-flex items-center gap-2 text-sm text-charbon border-b border-charbon/30 pb-0.5 hover:border-charbon transition-colors"
        >
          Notre savoir-faire
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
