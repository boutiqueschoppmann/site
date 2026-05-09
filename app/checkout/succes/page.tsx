import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import ClearCart from "./ClearCart";

export const metadata: Metadata = {
  title: "Commande confirmée",
  robots: { index: false },
};

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SuccesPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  if (!session_id || !session_id.startsWith("cs_") || session_id.length > 500) {
    redirect("/");
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    redirect("/");
  }

  if (session.payment_status !== "paid") {
    redirect("/panier");
  }

  const name = session.customer_details?.name ?? "Client";
  const email = session.customer_details?.email;
  const total = session.amount_total ? (session.amount_total / 100).toFixed(2) : "—";
  const pickup = session.metadata?.pickup ?? "livraison";
  const isPickup = pickup !== "livraison";

  return (
    <div className="pt-16 md:pt-28 bg-lin min-h-screen">
      <ClearCart />
      <div className="max-w-2xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-10">

        {/* Icône succès */}
        <div className="w-16 h-16 border border-charbon/20 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-charbon">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="font-display text-4xl text-charbon">Merci, {name.split(" ")[0]} !</h1>
          <p className="text-charbon/60 text-base leading-relaxed">
            Votre paiement de <span className="font-mono text-charbon">{total} CAD</span> a bien été reçu.
            {email && (
              <> Une confirmation vous a été envoyée à <span className="font-mono">{email}</span>.</>
            )}
          </p>
        </div>

        {/* Info livraison */}
        <div className="w-full border border-charbon/10 p-6 text-left flex flex-col gap-3">
          <h2 className="font-display text-lg text-charbon">Prochaines étapes</h2>
          {isPickup ? (
            <p className="text-sm text-charbon/70 leading-relaxed">
              Vous avez choisi le <strong>ramassage local à {pickup}</strong>.
              Nous vous contacterons sous 24 à 48 h pour confirmer le rendez-vous.
            </p>
          ) : (
            <p className="text-sm text-charbon/70 leading-relaxed">
              Votre commande sera préparée et expédiée sous <strong>2 à 5 jours ouvrables</strong> depuis notre atelier à Sainte-Brigitte-de-Laval.
            </p>
          )}
          <p className="text-xs text-charbon/40 font-mono">
            Référence : {session_id.slice(0, 20)}…
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link
            href="/boutique"
            className="flex-1 text-center border border-charbon/20 text-charbon py-4 text-sm tracking-wide hover:border-charbon/50 transition-colors"
          >
            Retour à la boutique
          </Link>
          <Link
            href="/"
            className="flex-1 text-center bg-charbon text-lin py-4 text-sm tracking-wide hover:bg-charbon/80 transition-colors"
          >
            Accueil
          </Link>
        </div>

      </div>
    </div>
  );
}
