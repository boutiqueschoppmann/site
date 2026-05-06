"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

export default function BoutiqueNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <div className="sticky top-16 z-40 bg-lin/95 backdrop-blur-sm border-b border-charbon/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-0 overflow-x-auto scrollbar-none">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`flex-shrink-0 px-5 py-3.5 text-sm transition-all duration-200 border-b-2 ${
                active === id
                  ? "border-charbon text-charbon font-medium"
                  : "border-transparent text-charbon/50 hover:text-charbon"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
