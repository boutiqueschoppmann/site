import type { NextConfig } from "next";

// Headers HTTP de sécurité appliqués à toutes les routes.
// Indispensables pour un site e-commerce : protection contre clickjacking,
// MIME sniffing, HTTPS downgrade, et réduction de la surface d'attaque XSS.
const securityHeaders = [
  // Interdit l'intégration dans un iframe — protection contre le clickjacking
  // (superposition invisible de notre page de paiement par un site tiers)
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Empêche le navigateur de deviner le type MIME d'une ressource
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Force HTTPS pendant 2 ans, sous-domaines inclus
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Contrôle les infos envoyées dans l'en-tête Referer lors des navigations
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Désactive les APIs navigateur inutiles — réduit la surface d'attaque
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(self)",
  },
  // Désactive explicitement le vieux filtre XSS des navigateurs legacy
  // (recommandé : le laisser activé peut paradoxalement introduire des vulnérabilités)
  {
    key: "X-XSS-Protection",
    value: "0",
  },
  // Isole le contexte de navigation — protège contre les attaques cross-origin
  // basées sur Spectre (lecture de mémoire via side-channel)
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  // Empêche d'autres origines de charger nos ressources via requêtes no-cors
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  // Content Security Policy
  // Notes :
  // - 'unsafe-inline' dans script-src est requis par Next.js App Router
  //   (scripts d'hydratation inline). La protection XSS principale vient de
  //   React (auto-escape JSX) + absence de dangerouslySetInnerHTML.
  // - next/font/google auto-héberge les polices — pas besoin de fonts.gstatic.com
  // - Three.js/R3F génèrent des blob: URLs pour les modèles 3D
  // - object-src 'none' : désactive Flash et plugins obsolètes
  // - base-uri 'self' : bloque l'injection de <base> (attaque de redirection)
  // - form-action 'self' : les formulaires ne soumettent qu'à notre domaine
  // - frame-ancestors 'none' : redondant avec X-Frame-Options, recommandé en complément
  // - connect-src inclut checkout.stripe.com et api.stripe.com — sans ça,
  //   la page de paiement Stripe ne peut pas se charger (fetch bloqué par CSP)
  // - upgrade-insecure-requests uniquement en production — en dev il causerait
  //   une redirection HTTPS sur localhost (qui tourne en HTTP)
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : ""} https://js.stripe.com`,
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self'",
      "img-src 'self' data: blob: https://*.stripe.com",
      "worker-src 'self' blob:",
      "connect-src 'self' https://checkout.stripe.com https://api.stripe.com https://*.stripe.com",
      "frame-src https://js.stripe.com https://hooks.stripe.com",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://checkout.stripe.com",
      "frame-ancestors 'none'",
      ...(process.env.NODE_ENV === "production" ? ["upgrade-insecure-requests"] : []),
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
