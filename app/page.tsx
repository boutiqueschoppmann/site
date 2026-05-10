import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import Reassurance from "@/components/home/Reassurance";
import Collections from "@/components/home/Collections";
import Storytelling from "@/components/home/Storytelling";
import Bestsellers from "@/components/home/Bestsellers";
import LocalFab from "@/components/home/LocalFab";
import Testimonials from "@/components/home/Testimonials";
import HomeFAQ from "@/components/home/HomeFAQ";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: { absolute: "Schoppmann — Crayon aluminium à mine infinie, fabriqué au Québec" },
};

export default function HomePage() {
  return (
    <>
      {/* Mobile uniquement : titre avant l'animation 3D */}
      <div className="md:hidden bg-charbon px-6 pt-24 pb-8">
        <p className="text-lin/50 text-xs tracking-[0.3em] uppercase mb-6 font-mono">
          Sainte-Brigitte-de-Laval, Québec
        </p>
        <h1 className="font-display text-lin text-5xl leading-[1.05]">
          Le crayon que vous garderez à vie.
        </h1>
      </div>

      <Hero />

      {/* Mobile uniquement : sous-titre + boutons après l'animation 3D */}
      <div className="md:hidden bg-charbon px-6 pt-8 pb-12">
        <p className="text-lin/60 text-lg leading-relaxed mb-8">
          Aluminium usiné à la main au Québec.{" "}
          <span className="text-lin/80">Des années d&apos;écriture, sans taille-crayon ni copeaux.</span>{" "}
          Réutilisable pour toujours.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            href="/boutique"
            className="group inline-flex items-center justify-center gap-2 bg-lin text-charbon px-8 py-4 text-sm tracking-wide font-medium hover:bg-alu hover:gap-3 transition-all duration-200"
          >
            Découvrir la collection
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/notre-histoire"
            className="group inline-flex items-center justify-center gap-2 border border-lin/30 text-lin px-8 py-4 text-sm tracking-wide hover:border-lin hover:bg-lin/10 hover:gap-3 transition-all duration-200"
          >
            Notre histoire
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-0 -translate-x-3 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <Reassurance />
      <Collections />
      <Storytelling />
      <div className="max-w-7xl mx-auto px-6"><div className="border-t border-charbon/10" /></div>
      <Bestsellers />
      <div className="max-w-7xl mx-auto px-6"><div className="border-t border-charbon/10" /></div>
      <LocalFab />
      <Testimonials />
      <div className="max-w-7xl mx-auto px-6"><div className="border-t border-charbon/10" /></div>
      <HomeFAQ />
      <div className="max-w-7xl mx-auto px-6"><div className="border-t border-charbon/10" /></div>
      <FinalCTA />
    </>
  );
}
