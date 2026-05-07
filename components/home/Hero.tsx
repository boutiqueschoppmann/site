"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const PencilScene = dynamic(() => import("@/components/3d/PencilScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-charbon" />,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      const raw = -top / scrollable;
      setScrollProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textOpacity = Math.max(0, 1 - scrollProgress / 0.25);

  return (
    <section ref={sectionRef} className="relative w-full h-[300vh] bg-charbon">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* 3D — full screen sur mobile et desktop */}
        <div className="absolute inset-0 opacity-90">
          <PencilScene scrollProgress={scrollProgress} />
        </div>

        {/* Mobile : titre en haut, fond opaque pour masquer le 3D derrière */}
        <div
          className="md:hidden absolute top-0 left-0 right-0 z-10 bg-charbon px-6 pt-16 pb-3"
          style={{ opacity: textOpacity }}
        >
          <h1 className="font-display text-lin text-4xl leading-[1.05]">
            Le crayon que vous garderez à vie.
          </h1>
        </div>

        {/* Mobile : sous-titre + boutons en bas, fond opaque pour masquer le 3D derrière */}
        <div
          className="md:hidden absolute bottom-0 left-0 right-0 z-10 bg-charbon px-6 pt-3 pb-8"
          style={{ opacity: textOpacity }}
        >
          <p className="text-lin/60 text-sm leading-relaxed mb-4">
            Aluminium usiné à la main au Québec.{" "}
            <span className="text-lin/80">Mine infinie.</span>{" "}
            Réutilisable pour toujours.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center gap-2 bg-lin text-charbon px-8 py-3 text-sm tracking-wide font-medium hover:bg-alu transition-colors duration-200"
            >
              Découvrir la collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/notre-histoire"
              className="inline-flex items-center justify-center gap-2 border border-lin/30 text-lin px-8 py-3 text-sm tracking-wide hover:border-lin/60 transition-colors duration-200"
            >
              Notre histoire
            </Link>
          </div>
        </div>

        {/* Desktop : gradient overlay */}
        <div
          className="hidden md:block absolute inset-0 bg-gradient-to-r from-charbon/90 via-charbon/50 to-transparent"
          style={{ opacity: textOpacity }}
        />

        {/* Desktop : texte par-dessus le 3D */}
        <div
          className="hidden md:flex absolute inset-0 items-center z-10 transition-none"
          style={{ opacity: textOpacity }}
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-xl">
              <p className="text-lin/50 text-xs tracking-[0.3em] uppercase mb-6 font-mono">
                Sainte-Brigitte-de-Laval, Québec
              </p>
              <h1 className="font-display text-lin text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
                Le crayon que vous garderez à vie.
              </h1>
              <p className="text-lin/60 text-lg md:text-xl leading-relaxed mb-10 max-w-md">
                Aluminium usiné à la main au Québec.{" "}
                <span className="text-lin/80">Mine infinie.</span>{" "}
                Réutilisable pour toujours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/boutique"
                  className="inline-flex items-center justify-center gap-2 bg-lin text-charbon px-8 py-4 text-sm tracking-wide font-medium hover:bg-alu transition-colors duration-200"
                >
                  Découvrir la collection
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/notre-histoire"
                  className="inline-flex items-center justify-center gap-2 border border-lin/30 text-lin px-8 py-4 text-sm tracking-wide hover:border-lin/60 transition-colors duration-200"
                >
                  Notre histoire
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
