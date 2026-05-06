import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des renseignements personnels — Schoppmann, conformément à la Loi 25 du Québec.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="pt-16 md:pt-28 bg-lin min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-xs text-cuir tracking-widest uppercase font-mono mb-4">Légal</p>
        <h1 className="font-display text-5xl text-charbon mb-4">Politique de confidentialité</h1>
        <p className="text-charbon/40 font-mono text-xs mb-16">En vigueur au 1er mai 2025 · Conforme à la Loi 25 (Québec)</p>

        <div className="flex flex-col gap-12 text-charbon/70 leading-relaxed">

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">1. Responsable de la protection des renseignements personnels</h2>
            <p>
              La personne responsable de la protection des renseignements personnels au sein de Schoppmann est
              le propriétaire de l'entreprise, joignable à :
            </p>
            <p className="mt-3">
              <a href="mailto:boutique.schoppmann@gmail.com" className="text-charbon border-b border-charbon/20">boutique.schoppmann@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">2. Renseignements collectés</h2>
            <p>Nous collectons les renseignements personnels suivants, uniquement lorsque vous nous les communiquez volontairement :</p>
            <ul className="mt-3 flex flex-col gap-2 pl-4">
              <li>→ Nom et prénom</li>
              <li>→ Adresse courriel</li>
              <li>→ Adresse postale (pour la livraison)</li>
              <li>→ Numéro de téléphone (facultatif)</li>
              <li>→ Contenu de vos messages envoyés via les formulaires de contact</li>
            </ul>
            <p className="mt-3">
              Nous ne collectons pas de données de paiement directement — celles-ci sont traitées par
              notre prestataire de paiement sécurisé (Stripe) et ne transitent pas par nos serveurs.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">3. Finalités de la collecte</h2>
            <p>Vos renseignements sont utilisés exclusivement pour :</p>
            <ul className="mt-3 flex flex-col gap-2 pl-4">
              <li>→ Traiter et expédier vos commandes</li>
              <li>→ Répondre à vos demandes de contact ou de devis</li>
              <li>→ Assurer le suivi du service après-vente et de la garantie</li>
              <li>→ Vous envoyer des informations sur vos commandes (confirmation, expédition)</li>
            </ul>
            <p className="mt-3">
              Nous ne vendons, ne louons et ne partageons aucun renseignement personnel avec des tiers
              à des fins commerciales.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">4. Conservation des renseignements</h2>
            <p>
              Vos renseignements personnels sont conservés pendant <strong className="text-charbon">3 ans</strong> à
              compter de votre dernière interaction avec nous (commande, contact, demande de garantie),
              puis détruits de manière sécurisée.
            </p>
            <p className="mt-3">
              Les données relatives aux transactions peuvent être conservées plus longtemps si la loi fiscale
              applicable l'exige.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">5. Vos droits</h2>
            <p>Conformément à la <em>Loi modernisant des dispositions législatives en matière de protection des renseignements personnels</em> (Loi 25, Québec), vous disposez des droits suivants :</p>
            <ul className="mt-3 flex flex-col gap-2 pl-4">
              <li>→ <strong className="text-charbon">Accès</strong> — obtenir une copie des renseignements que nous détenons sur vous</li>
              <li>→ <strong className="text-charbon">Rectification</strong> — faire corriger des renseignements inexacts ou incomplets</li>
              <li>→ <strong className="text-charbon">Retrait du consentement</strong> — retirer votre consentement à tout moment</li>
              <li>→ <strong className="text-charbon">Suppression</strong> — demander la suppression de vos renseignements sous réserve des obligations légales</li>
            </ul>
            <p className="mt-3">
              Pour exercer l'un de ces droits, écrivez-nous à <a href="mailto:boutique.schoppmann@gmail.com" className="text-charbon border-b border-charbon/20">boutique.schoppmann@gmail.com</a>.
              Nous répondrons dans un délai de 30 jours.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">6. Données techniques et cookies</h2>
            <p>
              Le site <strong className="text-charbon">schoppmann.ca</strong> n'utilise pas de cookies de traçage
              ou de publicité. Seul le <strong className="text-charbon">stockage local (localStorage)</strong> de
              votre navigateur est utilisé pour mémoriser le contenu de votre panier entre deux visites.
              Ces données restent sur votre appareil et ne sont pas transmises à nos serveurs.
            </p>
            <p className="mt-3">
              L'hébergement est assuré par Vercel (San Francisco, CA). Des données techniques anonymes
              (adresse IP, type de navigateur) peuvent être traitées par Vercel dans le cadre normal
              de la fourniture du service d'hébergement, conformément à leur propre politique de confidentialité.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">7. Sécurité</h2>
            <p>
              Nous prenons des mesures raisonnables pour protéger vos renseignements personnels contre
              tout accès non autorisé, divulgation ou destruction : connexion HTTPS, accès restreint
              aux données, mot de passe applicatif pour les services courriel.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">8. Modifications</h2>
            <p>
              Cette politique peut être mise à jour pour refléter des changements dans nos pratiques ou
              la réglementation applicable. La date de mise à jour est indiquée en haut de cette page.
              Nous vous encourageons à la consulter périodiquement.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-charbon mb-4">9. Contact</h2>
            <p>
              Pour toute question relative à cette politique ou à vos renseignements personnels :
            </p>
            <p className="mt-3">
              <a href="mailto:boutique.schoppmann@gmail.com" className="text-charbon border-b border-charbon/20">boutique.schoppmann@gmail.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
