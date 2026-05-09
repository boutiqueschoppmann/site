import Stripe from "stripe";

// La clé est validée à l'exécution — pas au build (évite l'échec du build sur Vercel
// quand la variable n'est pas encore configurée).
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-04-22.dahlia",
});
