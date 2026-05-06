import type { Metadata } from "next";
import FAQAccordion from "@/components/ui/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes sur les crayons Schoppmann — mine infinie, livraison, garantie, personnalisation.",
};

const sections = [
  {
    title: "Le produit",
    faqs: [
      {
        q: "C'est quoi une mine infinie ?",
        a: "La mine Schoppmann est composée d'un alliage métal-céramique. Elle dépose une trace fine sans jamais s'user significativement. Pas de graphite, pas de recharge mensuelle — une mine dure des années.",
      },
      {
        q: "Sur quel papier ça fonctionne ?",
        a: "Sur la grande majorité des papiers standards et premium. La trace est légèrement plus métallique que le graphite classique, idéale pour la prise de notes, le dessin technique, et le carnet de golf.",
      },
      {
        q: "Est-ce qu'on peut effacer la trace ?",
        a: "Oui, avec une gomme standard. La trace est un peu moins facile à effacer que le graphite doux, mais s'efface correctement.",
      },
      {
        q: "Combien de temps dure une mine ?",
        a: "Des années en usage quotidien. À titre indicatif, des tests prolongés montrent une usure quasiment nulle sur 12 mois d'écriture régulière.",
      },
      {
        q: "Quelle est la différence entre crayon infini et crayon hybride ?",
        a: "Le crayon infini est 100% mine infinie. Le crayon hybride intègre en plus une cartouche d'encre interchangeable côté embout, pour ceux qui veulent aussi écrire à l'encre.",
      },
    ],
  },
  {
    title: "Commande et paiement",
    faqs: [
      {
        q: "Quels modes de paiement sont acceptés ?",
        a: "Carte Visa, Mastercard, American Express. D'autres options arrivent prochainement.",
      },
      {
        q: "Puis-je obtenir une facture pour mon entreprise ?",
        a: "Oui, contactez-nous via le formulaire B2B. On émet une facture TPS/TVQ complète.",
      },
    ],
  },
  {
    title: "Livraison",
    faqs: [
      {
        q: "Livrez-vous partout au Canada ?",
        a: "Oui. Québec : 2-4 jours ouvrables. Canada : 3-7 jours. USA : 5-10 jours. International : 10-20 jours.",
      },
      {
        q: "Y a-t-il un seuil de livraison gratuite ?",
        a: "La livraison est à 3 CAD partout. Gratuite au Canada dès 100 CAD d'achat. Le ramassage local à Sainte-Brigitte-de-Laval est toujours gratuit.",
      },
      {
        q: "Comment fonctionne le ramassage local ?",
        a: "Sélectionnez l'option ramassage au checkout. On vous contacte pour convenir d'un rendez-vous à Sainte-Brigitte-de-Laval. C'est gratuit.",
      },
    ],
  },
  {
    title: "Retours et garantie",
    faqs: [
      {
        q: "Puis-je retourner un produit ?",
        a: "Oui, dans les 30 jours suivant la réception, si le produit est à l'état neuf. Les frais de retour sont à la charge du client sauf en cas de défaut.",
      },
      {
        q: "Que couvre la garantie à vie ?",
        a: "Tous les défauts de fabrication : mécanismes, filetages, finitions aluminium. En cas de problème en usage normal, on répare ou remplace. Sans question.",
      },
    ],
  },
  {
    title: "Personnalisation",
    faqs: [
      {
        q: "Puis-je faire graver un texte ?",
        a: "Oui, jusqu'à 20 caractères sur le corps du crayon (nom, date, message court). Sélectionnez l'option gravure sur la fiche produit.",
      },
      {
        q: "Quel est le délai pour la gravure ?",
        a: "3-5 jours ouvrables supplémentaires par rapport au délai standard.",
      },
    ],
  },
  {
    title: "Entretien",
    faqs: [
      {
        q: "Comment nettoyer le crayon ?",
        a: "Un chiffon microfibre légèrement humide sur le corps aluminium. Ne jamais immerger. La pointe se nettoie en la frottant doucement sur une feuille de papier.",
      },
      {
        q: "Comment changer la mine ?",
        a: "Dévissez la pointe du crayon. La mine se retire et se remplace en quelques secondes. Retrouvez le tuto vidéo sur la page Recharges.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="pt-16 md:pt-28 bg-lin min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <nav className="flex items-center gap-2 text-xs text-charbon/40 font-mono mb-6">
          <a href="/" className="hover:text-charbon transition-colors">Accueil</a>
          <span>/</span>
          <span className="text-charbon/70">FAQ</span>
        </nav>
        <p className="text-xs text-cuir tracking-widest uppercase font-mono mb-4">FAQ</p>
        <h1 className="font-display text-5xl text-charbon mb-16">Questions fréquentes</h1>

        <div className="flex flex-col gap-16">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-2xl text-charbon mb-6 border-b border-charbon/10 pb-4">
                {s.title}
              </h2>
              <FAQAccordion items={s.faqs} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
