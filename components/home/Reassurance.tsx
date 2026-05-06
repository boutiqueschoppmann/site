const items = [
  { icon: "🇨🇦", label: "Fait au Québec", sub: "Sainte-Brigitte-de-Laval" },
  { icon: "∞", label: "Mine infinie", sub: "Des kilomètres d'écriture" },
  { icon: "🛠", label: "Garantie à vie", sub: "Défauts de fabrication couverts" },
  { icon: "📦", label: "Ramassage local", sub: "Gratuit · Sainte-Brigitte" },
];

export default function Reassurance() {
  return (
    <section className="border-y border-charbon/10 bg-lin">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-charbon/10">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1 px-4 py-4 text-center">
            <span className="text-2xl">{item.icon}</span>
            <span className="text-sm font-medium text-charbon">{item.label}</span>
            <span className="text-xs text-charbon/50">{item.sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
