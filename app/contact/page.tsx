import type { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe Schoppmann. Questions, commandes spéciales, ramassage local à Sainte-Brigitte-de-Laval.",
};

export default function ContactPage() {
  return (
    <div className="pt-16 md:pt-28 bg-lin min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Infos */}
        <div>
          <nav className="flex items-center gap-2 text-xs text-charbon/40 font-mono mb-6">
            <a href="/" className="hover:text-charbon transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-charbon/70">Contact</span>
          </nav>
          <p className="text-xs text-cuir tracking-widest uppercase font-mono mb-4">Contact</p>
          <h1 className="font-display text-5xl text-charbon mb-8">On vous répond.</h1>

          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs text-charbon/40 tracking-widest uppercase font-mono mb-2">Courriel</p>
              <a
                href="mailto:boutique.schoppmann@gmail.com"
                className="text-charbon hover:text-cuir transition-colors"
              >
                boutique.schoppmann@gmail.com
              </a>
            </div>

            <div>
              <p className="text-xs text-charbon/40 tracking-widest uppercase font-mono mb-2">
                Ramassage local
              </p>
              <p className="text-charbon/70 text-sm leading-relaxed">
                Sainte-Brigitte-de-Laval, Québec
                <br />
                Sur rendez-vous · Gratuit
              </p>
            </div>

            <div>
              <p className="text-xs text-charbon/40 tracking-widest uppercase font-mono mb-2">
                Délai de réponse
              </p>
              <p className="text-charbon/70 text-sm">48 h ouvrables</p>
            </div>

            <div>
              <p className="text-xs text-charbon/40 tracking-widest uppercase font-mono mb-3">
                Commandes B2B
              </p>
              <a
                href="/cadeaux-entreprises"
                className="text-sm text-charbon border-b border-charbon/20 pb-0.5 hover:border-charbon transition-colors group inline-flex items-center gap-1"
              >
                Formulaire de devis <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div>
          <ContactForm type="contact" />
        </div>
      </div>
    </div>
  );
}
