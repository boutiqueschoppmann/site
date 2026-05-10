import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Cadeaux entreprises",
  description: "Crayons personnalisés pour cadeaux corporate, séminaires, écoles et pro shops. Gravure laser, boîtes sur mesure. Québec.",
};

const targets = [
  { label: "Entreprises", icon: "🏢", desc: "Fins d'année, séminaires, cadeaux clients" },
  { label: "Écoles & universités", icon: "🎓", desc: "Remises de diplômes, événements campus" },
  { label: "Clubs de golf", icon: "⛳", desc: "Pro shops, tournois, associations" },
];

const steps = [
  { n: "01", title: "Contactez-nous", body: "Dites-nous votre besoin : quantité, type de produit, personnalisation souhaitée, délai." },
  { n: "02", title: "Devis + échantillons", body: "On vous envoie un devis détaillé et des échantillons physiques sous 48 h." },
  { n: "03", title: "Production à l'atelier", body: "Chaque pièce est usinée et gravée à Sainte-Brigitte-de-Laval." },
  { n: "04", title: "Livraison ou ramassage", body: "Livraison partout au Canada, ou ramassage local gratuit." },
];

export default function CadeauxEntreprisesPage() {
  return (
    <div className="pt-16 md:pt-28 bg-lin min-h-screen">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <nav className="flex items-center gap-2 text-xs text-charbon/40 font-mono mb-6">
            <a href="/" className="hover:text-charbon transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-charbon/70">Cadeaux entreprises</span>
          </nav>
          <p className="text-xs text-cuir tracking-widest uppercase font-mono mb-4">B2B</p>
          <h1 className="font-display text-5xl md:text-6xl text-charbon leading-tight mb-6">
            Un objet distinctif pour vos clients et équipes.
          </h1>
          <p className="text-charbon/60 text-xl leading-relaxed">
            Un crayon Schoppmann gravé à votre image. Pas un stylo publicitaire — un objet qu&apos;on garde.
          </p>
        </div>
        <div className="relative aspect-square overflow-hidden bg-charbon/5">
          <Image src="/images/photo_plateau_corporate_crayons.png" alt="Plateau corporate crayons Schoppmann" fill className="object-cover" sizes="600px" />
        </div>
      </section>

      {/* Cibles */}
      <section className="border-y border-charbon/10 bg-charbon/3">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-charbon/10">
          {targets.map((t) => (
            <div key={t.label} className="px-8 py-8 text-center">
              <span className="text-3xl block mb-3">{t.icon}</span>
              <h3 className="font-display text-xl text-charbon mb-2">{t.label}</h3>
              <p className="text-charbon/50 text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ce qu'on propose */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-display text-4xl text-charbon mb-12">Ce qu&apos;on propose</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Gravure laser", body: "Logo, nom, texte court — jusqu'à 20 caractères sur le corps aluminium." },
            { title: "Boîtes personnalisées", body: "Boîtes imprimées en filament recyclé aux couleurs de votre entreprise." },
            { title: "Commandes dès 25 unités", body: "Tarifs dégressifs selon le volume. Devis sur mesure." },
            { title: "Facturation entreprise", body: "Sans TPS/TVQ — artisan indépendant. Facture pro disponible. Délais 3-6 semaines." },
          ].map((item) => (
            <div key={item.title} className="border border-charbon/10 p-8">
              <h3 className="font-display text-xl text-charbon mb-3">{item.title}</h3>
              <p className="text-charbon/60">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-charbon/5 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl text-charbon mb-12">Comment ça marche</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col gap-4">
                <span className="font-mono text-4xl text-charbon/15 font-bold">{s.n}</span>
                <h3 className="font-display text-xl text-charbon">{s.title}</h3>
                <p className="text-charbon/60 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6"><div className="border-t border-charbon/10" /></div>

      {/* Formulaire */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="font-display text-4xl text-charbon mb-4">Demander un devis</h2>
        <p className="text-charbon/50 mb-12">Réponse sous 48 h ouvrables.</p>
        <ContactForm type="b2b" />
      </section>
    </div>
  );
}
