import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-charbon py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-lin/40 text-xs tracking-widest uppercase font-mono mb-6">
          Fait pour durer
        </p>
        <h2 className="font-display text-lin text-5xl md:text-6xl mb-8 leading-tight">
          Choisissez le vôtre.
        </h2>
        <p className="text-lin/50 text-xl mb-12 max-w-md mx-auto leading-relaxed">
          Un objet que vous garderez des années. Ou que quelqu&apos;un d&apos;autre ne sera jamais prêt à rendre.
        </p>
        <Link
          href="/boutique"
          className="group inline-flex items-center gap-3 bg-lin text-charbon px-10 py-5 text-sm tracking-wide font-medium hover:bg-alu hover:gap-4 transition-all duration-200"
        >
          Voir la collection complète
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-200 group-hover:translate-x-1">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
