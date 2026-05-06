import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente Schoppmann — crayons aluminium fabriqués au Québec.",
};

export default function CGVPage() {
  return (
    <div className="pt-16 md:pt-28 bg-lin min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-xs text-cuir tracking-widest uppercase font-mono mb-4">Légal</p>
        <h1 className="font-display text-5xl text-charbon mb-4">Conditions générales de vente</h1>
        <p className="text-charbon/40 font-mono text-xs mb-16">En vigueur au 1er mai 2025</p>

        <div className="flex flex-col gap-12 text-charbon/70 leading-relaxed">

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">1. Vendeur</h2>
            <p>
              Les présentes conditions générales de vente s'appliquent à toutes les commandes passées sur
              le site <strong className="text-charbon">schoppmann.ca</strong>, exploité par Schoppmann,
              entreprise individuelle établie à Sainte-Brigitte-de-Laval, Québec, Canada.
            </p>
            <p className="mt-3">Contact : <a href="mailto:boutique.schoppmann@gmail.com" className="text-charbon border-b border-charbon/20">boutique.schoppmann@gmail.com</a></p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">2. Produits et prix</h2>
            <p>
              Les produits proposés sont des crayons réutilisables en aluminium usiné, leurs accessoires
              et leurs recharges, fabriqués à la main à Sainte-Brigitte-de-Laval, Québec.
            </p>
            <p className="mt-3">
              Les prix sont affichés en dollars canadiens (CAD) et sont sujets à la TPS (5 %) et à la TVQ (9,975 %),
              calculées et ajoutées au moment du récapitulatif de commande.
            </p>
            <p className="mt-3">
              Schoppmann se réserve le droit de modifier ses prix à tout moment. Le prix applicable est celui
              affiché au moment de la validation de la commande.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">3. Commande</h2>
            <p>
              Toute commande est passée par courriel à <a href="mailto:boutique.schoppmann@gmail.com" className="text-charbon border-b border-charbon/20">boutique.schoppmann@gmail.com</a> ou
              via le formulaire de contact du site. La commande est confirmée dès réception de votre
              paiement ou, pour les commandes B2B, dès signature du bon de commande.
            </p>
            <p className="mt-3">
              Schoppmann se réserve le droit de refuser toute commande pour motif légitime,
              notamment en cas de rupture de stock ou d'informations erronées.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">4. Paiement</h2>
            <p>
              Le paiement en ligne sécurisé par carte de crédit (Visa, Mastercard, American Express)
              sera disponible prochainement. En attendant, les modalités de paiement sont précisées
              au moment de la confirmation de commande par courriel.
            </p>
            <p className="mt-3">
              Les données de paiement sont traitées de manière sécurisée et ne sont jamais stockées
              sur nos serveurs.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">5. Livraison</h2>
            <p>Les frais de livraison sont de <strong className="text-charbon">3,00 CAD</strong> pour toute commande, quelle que soit la destination.</p>
            <p className="mt-3">La livraison est <strong className="text-charbon">gratuite au Canada</strong> pour toute commande d'un montant égal ou supérieur à <strong className="text-charbon">100 CAD</strong> (avant taxes).</p>
            <p className="mt-3">Le <strong className="text-charbon">ramassage local</strong> est disponible gratuitement à Sainte-Brigitte-de-Laval, Québec, sur rendez-vous.</p>
            <p className="mt-3">Les délais estimés sont indicatifs et ne constituent pas un engagement ferme. Schoppmann ne saurait être tenu responsable des retards imputables au transporteur.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">6. Droit de retour</h2>
            <p>
              Conformément à la <em>Loi sur la protection du consommateur</em> (RLRQ, c. P-40.1),
              vous disposez d'un délai de <strong className="text-charbon">30 jours</strong> suivant
              la réception de votre commande pour retourner un produit.
            </p>
            <p className="mt-3">
              Le produit doit être retourné dans son état d'origine, non utilisé et dans son emballage d'origine.
              Les frais de retour sont à la charge du client, sauf en cas de défaut de fabrication constaté.
            </p>
            <p className="mt-3">
              Le remboursement est effectué dans les 5 à 7 jours ouvrables suivant la réception et l'inspection
              du produit retourné.
            </p>
            <p className="mt-3">Pour initier un retour : <a href="mailto:boutique.schoppmann@gmail.com" className="text-charbon border-b border-charbon/20">boutique.schoppmann@gmail.com</a></p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">7. Garantie à vie</h2>
            <p>
              Tous les produits Schoppmann sont couverts par une <strong className="text-charbon">garantie à vie</strong> contre
              les défauts de fabrication (mécanismes, filetages, finitions aluminium). En cas de défaut
              constaté en usage normal, Schoppmann s'engage à réparer ou remplacer le produit sans frais,
              sans limitation de durée.
            </p>
            <p className="mt-3">
              Cette garantie ne couvre pas les dommages résultant d'une utilisation abusive, d'une chute,
              ou d'une modification du produit.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">8. Responsabilité</h2>
            <p>
              Schoppmann ne saurait être tenu responsable des dommages indirects résultant de l'utilisation
              de ses produits. La responsabilité de Schoppmann est limitée au montant de la commande concernée.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">9. Loi applicable</h2>
            <p>
              Les présentes conditions générales sont régies par le droit de la province de Québec et les
              lois fédérales applicables au Canada. Tout litige sera soumis à la juridiction exclusive
              des tribunaux du Québec.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
