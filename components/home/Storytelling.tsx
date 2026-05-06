"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    tag: "01 — La mine",
    title: "Une pointe qui ne s'use pas.",
    body: "Des kilomètres d'écriture sans jamais retourner en magasin. La mine Schoppmann est conçue pour durer des années d'usage quotidien.",
    metric: "∞",
    metricLabel: "kilomètres d'écriture",
    image: "/images/products/mine-down.png",
    imageAlt: "Gros plan pointe mine Schoppmann sur fond sombre",
    imageBg: "bg-charbon",
  },
  {
    tag: "02 — La précision",
    title: "Un trait précis, sans appuyer.",
    body: "L'alliage de la mine dépose une ligne nette, régulière, sans pression excessive. Idéal pour les esquisses techniques comme pour la prise de notes quotidienne.",
    metric: "0.5 mm",
    metricLabel: "précision constante",
    image: "/images/products/mine-up.png",
    imageAlt: "Pointe mine Schoppmann vue de près sur fond gris",
    imageBg: "bg-charbon/5",
  },
  {
    tag: "03 — L'emballage",
    title: "Pensé jusqu'au bout.",
    body: "La boîte est imprimée en filament recyclé à notre atelier. Rien n'est jetable — ni le crayon, ni ce qui l'entoure.",
    metric: "100%",
    metricLabel: "filament recyclé",
    image: "/images/products/kit-mines.png",
    imageAlt: "Kit mines de rechange Schoppmann rouge et noir",
    imageBg: "bg-charbon/5",
  },
];

function Step({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const reversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center py-20 border-t border-charbon/10 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Image */}
      <div className={`relative aspect-square overflow-hidden ${step.imageBg} ${reversed ? "md:order-2" : ""}`}>
        <Image
          src={step.image}
          alt={step.imageAlt}
          fill
          className="object-contain p-8"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Texte */}
      <div className={reversed ? "md:order-1" : ""}>
        <span className="text-xs text-cuir tracking-widest uppercase font-mono mb-4 block">
          {step.tag}
        </span>
        <h3 className="font-display text-4xl md:text-5xl text-charbon mb-6 leading-tight">
          {step.title}
        </h3>
        <p className="text-charbon/60 text-lg leading-relaxed mb-8">{step.body}</p>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-5xl font-bold text-charbon/15">{step.metric}</span>
          <span className="text-xs text-charbon/30 tracking-widest uppercase">{step.metricLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default function Storytelling() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="font-display text-2xl text-charbon/30 mb-4">Le détail fait la différence</h2>
      {steps.map((step, i) => (
        <Step key={step.tag} step={step} index={i} />
      ))}
    </section>
  );
}
