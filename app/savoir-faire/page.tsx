import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Savoir-faire",
  description: "Comment sont fabriqués les crayons Schoppmann — CNC, aluminium 6061, mine infinie, filament recyclé.",
};

const specs = [
  { label: "Matériau corps", value: "Aluminium 6061" },
  { label: "Procédé", value: "Tournage CNC" },
  { label: "Finition", value: "Anodisation ou brut poli main" },
  { label: "Mine", value: "Alliage métal-céramique" },
  { label: "Diamètre", value: "8 mm" },
  { label: "Longueur standard", value: "145 mm" },
  { label: "Longueur golf", value: "95 mm" },
  { label: "Poids", value: "Environ 18 g" },
  { label: "Emballage", value: "Filament recyclé PLA/rPET" },
  { label: "Origine", value: "Sainte-Brigitte-de-Laval, QC" },
];

const steps = [
  {
    n: "01",
    title: "Tournage CNC",
    body: "Chaque corps de crayon est tourné sur une machine CNC à commande numérique. La précision est à 0.01 mm. L'aluminium 6061 est choisi pour sa légèreté, sa dureté et sa résistance à la corrosion.",
  },
  {
    n: "02",
    title: "Finition manuelle",
    body: "Après l'usinage, chaque pièce est poncée, polie et vérifiée à la main. On cherche une surface sans défaut visible, avec un toucher cohérent sur toute la longueur.",
  },
  {
    n: "03",
    title: "Assemblage",
    body: "L'insertion de la mine, du mécanisme de verrouillage et des accessoires (anneau cuir, embout) est faite manuellement. Chaque crayon est testé avant d'être emballé.",
  },
  {
    n: "04",
    title: "Emballage recyclé",
    body: "Les boîtes sont imprimées à l'atelier en filament recyclé PLA/rPET. Le temps d'impression par boîte est d'environ 4 h. Chaque boîte est unique par ses légères variations d'impression.",
  },
];

export default function SavoirFairePage() {
  return (
    <div className="pt-16 md:pt-28 bg-lin min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* En-tête */}
        <div className="py-20 border-b border-charbon/10 grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          <div>
            <nav className="flex items-center gap-2 text-xs text-charbon/40 font-mono mb-4">
              <a href="/" className="hover:text-charbon transition-colors">Accueil</a>
              <span>/</span>
              <span className="text-charbon/70">Savoir-faire</span>
            </nav>
            <p className="text-xs text-cuir tracking-widest uppercase font-mono mb-4">Savoir-faire</p>
            <h1 className="font-display text-5xl md:text-6xl text-charbon leading-tight">
              Ce qu&apos;il y a derrière chaque pièce.
            </h1>
          </div>
          <p className="text-charbon/60 text-lg leading-relaxed">
            On fabrique des objets de précision. Alors on parle de précision : matériaux, procédés, contrôle.
            Pas de marketing — juste ce qui est vrai.
          </p>
        </div>

        {/* Photo machine */}
        <section className="py-12">
          <div className="relative aspect-[16/7] overflow-hidden bg-charbon">
            <Image src="/images/machine_a_crayons.jpg" alt="Tour CNC Schoppmann — fabrication des crayons aluminium" fill className="object-cover" sizes="1280px" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-charbon/40 to-transparent" />
          </div>
        </section>

        {/* Process */}
        <section className="py-20">
          <h2 className="font-display text-4xl text-charbon mb-16">Process de fabrication</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-6">
                <span className="font-mono text-5xl text-charbon/8 font-bold flex-shrink-0 leading-none">{s.n}</span>
                <div>
                  <h3 className="font-display text-2xl text-charbon mb-3">{s.title}</h3>
                  <p className="text-charbon/60 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Techno mine */}
        <section className="border-t border-charbon/10 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl text-charbon mb-6">La mine infinie — comment ça marche</h2>
            <p className="text-charbon/60 leading-relaxed mb-4">
              La mine n&apos;est pas en graphite, mais en alliage métal-céramique. Elle dépose de
              très fines particules sur le papier par friction, sans s&apos;user de manière perceptible.
            </p>
            <p className="text-charbon/60 leading-relaxed mb-4">
              Le résultat est une ligne fine et régulière, légèrement plus dure que le graphite HB classique,
              mais facilement effaçable. La mine ne casse pas, ne s&apos;effrite pas, et ne laisse pas de résidu
              sur les doigts.
            </p>
            <p className="text-charbon/60 leading-relaxed">
              Durée de vie estimée : plusieurs années en usage quotidien intensif.
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden bg-charbon">
            <Image src="/images/electronique_machine_crayon.jpg" alt="Électronique de la machine CNC Schoppmann" fill className="object-cover" sizes="600px" />
          </div>
        </section>

        {/* Spécifications techniques */}
        <section className="border-t border-charbon/10 py-20">
          <h2 className="font-display text-4xl text-charbon mb-12">Spécifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {specs.map((s, i) => (
              <div
                key={s.label}
                className={`flex justify-between py-4 border-b border-charbon/8 ${
                  i % 2 === 0 ? "md:pr-12" : "md:pl-12 md:border-l md:border-charbon/8"
                }`}
              >
                <span className="text-charbon/40 font-mono text-xs uppercase tracking-wide">{s.label}</span>
                <span className="text-charbon text-sm font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
