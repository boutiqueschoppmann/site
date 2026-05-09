"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-charbon/10">
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-charbon cursor-pointer hover:bg-charbon/5 px-2 -mx-2 transition-colors rounded-sm"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-charbon text-base">{item.q}</span>
            <span className={`flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open === i ? "max-h-64 pb-4" : "max-h-0"
            }`}
          >
            <p className="text-charbon/60 text-sm leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
