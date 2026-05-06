import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Livraison & retours",
  description: "Tarifs et délais de livraison, ramassage local Sainte-Brigitte-de-Laval, politique de retour et garantie à vie Schoppmann.",
};

export default function LivraisonRetoursPage() {
  return (
    <div className="pt-16 md:pt-28 bg-lin min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-xs text-cuir tracking-widest uppercase font-mono mb-4">Informations</p>
        <h1 className="font-display text-5xl text-charbon mb-16">Livraison & retours</h1>

        {/* Livraison */}
        <section className="mb-16">
          <h2 className="font-display text-3xl text-charbon mb-8">Livraison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charbon/10">
                  <th className="text-left py-3 text-charbon/40 font-mono text-xs tracking-widest uppercase">Destination</th>
                  <th className="text-left py-3 text-charbon/40 font-mono text-xs tracking-widest uppercase">Délai</th>
                  <th className="text-left py-3 text-charbon/40 font-mono text-xs tracking-widest uppercase">Tarif</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charbon/8">
                {[
                  ["Québec", "2-4 jours ouvrables", "Calculé au checkout"],
                  ["Canada", "3-7 jours ouvrables", "Calculé au checkout"],
                  ["États-Unis", "5-10 jours ouvrables", "Calculé au checkout"],
                  ["International", "10-20 jours ouvrables", "Calculé au checkout"],
                  ["Livraison gratuite (Canada)", "3-7 jours", "Gratuit dès 100 CAD"],
                ].map(([dest, delai, tarif]) => (
                  <tr key={dest}>
                    <td className="py-4 text-charbon">{dest}</td>
                    <td className="py-4 text-charbon/70">{delai}</td>
                    <td className="py-4 text-charbon/70">{tarif}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Ramassage local */}
        <section className="mb-16 border border-charbon/10 p-8">
          <h2 className="font-display text-2xl text-charbon mb-4">Ramassage local</h2>
          <p className="text-charbon/60 mb-4 leading-relaxed">
            Gratuit à Sainte-Brigitte-de-Laval, Québec. Sélectionnez l&apos;option lors du checkout
            et on vous contacte pour fixer un rendez-vous.
          </p>
          <ul className="flex flex-col gap-2 text-sm text-charbon/60">
            <li>→ Adresse communiquée après la commande</li>
            <li>→ Sur rendez-vous uniquement</li>
            <li>→ Disponible 7 jours sur 7</li>
          </ul>
        </section>

        {/* Retours */}
        <section className="mb-16">
          <h2 className="font-display text-3xl text-charbon mb-6">Retours</h2>
          <div className="flex flex-col gap-4 text-charbon/70 leading-relaxed">
            <p>Vous disposez de <strong className="text-charbon">30 jours</strong> après réception pour retourner un produit.</p>
            <p>Le produit doit être à l&apos;état neuf, non utilisé, dans son emballage d&apos;origine.</p>
            <p>Les frais de retour sont à la charge du client, sauf en cas de défaut de fabrication constaté.</p>
            <p>Le remboursement est effectué sous 5-7 jours ouvrables après réception du retour.</p>
            <p className="text-sm">Pour initier un retour : <a href="mailto:boutique.schoppmann@gmail.com" className="text-charbon border-b border-charbon/20">boutique.schoppmann@gmail.com</a></p>
          </div>
        </section>

        {/* Garantie à vie */}
        <section className="bg-charbon p-8">
          <h2 className="font-display text-2xl text-lin mb-4">Garantie à vie</h2>
          <p className="text-lin/60 leading-relaxed mb-4">
            Tous les produits Schoppmann sont couverts à vie contre les défauts de fabrication.
            Mécanismes, filetages, finitions aluminium — si quelque chose cède en usage normal, on répare ou remplace.
          </p>
          <p className="text-lin/60 text-sm">
            Cette garantie est distincte de la politique de retour 30 jours et s&apos;applique indéfiniment
            sur la durée de vie du produit.
          </p>
        </section>
      </div>
    </div>
  );
}
