"use client";

import { useState } from "react";

const faqs = [
  {
    q: "C'est quoi exactement une mine infinie ?",
    a: "La mine Schoppmann est composée d'un alliage métal-céramique qui dépose une trace fine sans jamais s'user de façon significative. Pas de graphite, pas de recharge fréquente — une mine dure des années en usage quotidien.",
  },
  {
    q: "Sur quel papier ça fonctionne ?",
    a: "Sur la grande majorité des papiers standards et premium. La trace est légèrement différente du graphite (plus métallique, moins de variation de pression), idéale pour la prise de notes et le dessin technique.",
  },
  {
    q: "Comment changer la mine ?",
    a: "En dévissant la pointe du crayon. La mine se retire et se remplace en quelques secondes. Un tutoriel vidéo est disponible sur la page Recharges.",
  },
  {
    q: "La livraison est disponible hors Québec ?",
    a: "Oui : Canada entier, États-Unis, et international. Le ramassage local est gratuit à Sainte-Brigitte-de-Laval. Les délais et tarifs sont détaillés sur la page Livraison.",
  },
  {
    q: "Que couvre la garantie à vie ?",
    a: "Tous les défauts de fabrication : mécanismes, filetages, finitions aluminium. Si quelque chose casse en usage normal, on répare ou remplace. Sans discussion.",
  },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <h2 className="font-display text-4xl text-charbon mb-12 text-center">
        Questions fréquentes
      </h2>

      <div className="flex flex-col divide-y divide-charbon/10">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              className="w-full flex items-center justify-between py-5 text-left gap-4"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-charbon font-medium text-base">{faq.q}</span>
              <span className={`flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                open === i ? "max-h-64 pb-5" : "max-h-0"
              }`}
            >
              <p className="text-charbon/60 text-base leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <a
          href="/faq"
          className="text-sm text-charbon/50 hover:text-charbon transition-colors border-b border-charbon/20 pb-0.5"
        >
          Voir toutes les questions →
        </a>
      </div>
    </section>
  );
}
