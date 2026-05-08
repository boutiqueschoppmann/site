import type { Metadata } from "next";
import Image from "next/image";
import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "Recharges",
  description: "Pack 10 mines de rechange Schoppmann — 9 CAD. Compatible tous modèles.",
};

const rechargeProducts = products.filter((p) => p.collection === "recharges");

const compat = [
  { model: "Crayon Infini — Boîte 3D", mine: "✓", encre: "—" },
  { model: "Crayon Infini — Étui en cuir", mine: "✓", encre: "—" },
  { model: "Crayon Hybride — Boîte 3D", mine: "✓", encre: "✓" },
  { model: "Crayon Hybride — Étui en cuir", mine: "✓", encre: "✓" },
  { model: "Crayon Golf — Boîte 3D", mine: "✓", encre: "—" },
  { model: "Crayon Golf — Étui en cuir", mine: "✓", encre: "—" },
];

export default function RechargesPage() {
  return (
    <div className="pt-16 md:pt-28 bg-lin min-h-screen">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 py-16 border-b border-charbon/10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs text-cuir tracking-widest uppercase font-mono mb-3">Recharges</p>
          <h1 className="font-display text-5xl text-charbon mb-4">Une mine qui dure des années.</h1>
          <p className="text-charbon/50 text-lg mb-6">Et quand vient le moment, c&apos;est 10 mines pour 9 CAD.</p>
          <span className="font-mono text-4xl text-charbon">9 CAD</span>
          <span className="text-charbon/40 text-sm ml-2">/ pack 10 mines</span>
        </div>
        <div className="relative aspect-video overflow-hidden bg-charbon/5">
          <Image src="/images/products/mines-pack.png" alt="Mines de rechange Schoppmann rouge et noir" fill className="object-contain p-4" sizes="600px" priority />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Produit */}
        <div className="max-w-xs mb-20">
          {rechargeProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        {/* Deux couleurs */}
        <section className="border-t border-charbon/10 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-video overflow-hidden bg-charbon/5">
            <Image src="/images/products/kit-mines.png" alt="Crayon Schoppmann avec mines rouge et noir" fill className="object-contain p-4" sizes="600px" />
          </div>
          <div>
            <h2 className="font-display text-3xl text-charbon mb-6">Deux couleurs de mines</h2>
            <div className="flex flex-col gap-4 text-charbon/70 leading-relaxed">
              <p><strong className="text-charbon">Noir</strong> — écriture standard. Trace sombre et nette.</p>
              <p><strong className="text-charbon">Rouge</strong> — annotations, corrections, repères. Visible au premier coup d&apos;œil.</p>
              <p className="text-sm text-charbon/50">Le pack 5 mines contient un mélange des deux couleurs selon disponibilité, ou précisez votre préférence dans les notes de commande.</p>
            </div>
          </div>
        </section>

        {/* Tuto */}
        <section className="border-t border-charbon/10 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl text-charbon mb-6">Changer une mine en 4 secondes</h2>
            <ol className="flex flex-col gap-4">
              {[
                "Dévissez la pointe dans le sens inverse des aiguilles d'une montre.",
                "Retirez l'ancienne mine par l'avant.",
                "Insérez la nouvelle mine côté pointe en premier.",
                "Revissez. C'est prêt.",
              ].map((step, i) => (
                <li key={i} className="flex gap-4 text-sm text-charbon/70">
                  <span className="font-mono text-cuir flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden bg-charbon/5">
              <Image src="/images/products/mine-up.png" alt="Mine Schoppmann vue pointe vers le haut" fill className="object-cover" sizes="250px" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden bg-charbon">
              <Image src="/images/products/mine-down.png" alt="Mine Schoppmann vue pointe vers le bas fond sombre" fill className="object-cover" sizes="250px" />
            </div>
          </div>
        </section>

        {/* Compatibilités */}
        <section className="border-t border-charbon/10 py-16">
          <h2 className="font-display text-3xl text-charbon mb-10">Compatibilités</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charbon/10">
                  <th className="text-left py-3 text-charbon/40 font-mono text-xs tracking-widest uppercase">Modèle</th>
                  <th className="text-center py-3 text-charbon/40 font-mono text-xs tracking-widest uppercase">Mines (pack 5)</th>
                  <th className="text-center py-3 text-charbon/40 font-mono text-xs tracking-widest uppercase">Cartouche encre</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charbon/8">
                {compat.map((r) => (
                  <tr key={r.model}>
                    <td className="py-4 text-charbon">{r.model}</td>
                    <td className="py-4 text-center text-cuir font-medium">{r.mine}</td>
                    <td className="py-4 text-center text-charbon/30">{r.encre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
