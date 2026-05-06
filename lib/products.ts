export interface Product {
  slug: string;
  name: string;
  tagline: string;
  sub: string;
  price: number;
  badge?: string;
  collection: "mine-infinie" | "hybride" | "golf" | "recharges";
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  href: string;
  includes: string[];
  description: string;
}

export const products: Product[] = [
  /* ─── MINE INFINIE ─── */
  {
    slug: "crayon-infini-boite-3d",
    name: "Crayon Infini",
    tagline: "Boîte hexagonale 3D",
    sub: "Mine infinie · corps aluminium · mini boîte hexagonale imprimée 3D",
    price: 25,
    badge: "Best-seller",
    collection: "mine-infinie",
    image: "/images/products/crayon-infini.png",
    imageAlt: "Crayon Schoppmann mine infinie aluminium sur fond sombre",
    gallery: [
      { src: "/images/products/crayon-infini.png", alt: "Crayon Infini Schoppmann — vue studio" },
      { src: "/images/products/mine-down.png", alt: "Gros plan pointe mine infinie, fond sombre" },
      { src: "/images/products/mine-up.png", alt: "Gros plan pointe mine infinie, fond clair" },
      { src: "/images/products/4-crayons-schoppmann-inclines.png", alt: "4 crayons Schoppmann aluminium inclinés" },
      { src: "/images/products/4-crayons-schoppmann.png", alt: "4 crayons Schoppmann aluminium vue de profil" },
    ],
    href: "/produits/crayon-infini-boite-3d",
    includes: [
      "1 crayon aluminium mine infinie",
      "Mini boîte hexagonale imprimée 3D en filament recyclé",
      "1 mine de rechange",
    ],
    description:
      "Le Crayon Infini Schoppmann en aluminium usiné à la main, livré dans sa mini boîte hexagonale imprimée à l'atelier en filament recyclé. La mine métal-céramique ne s'use pas — des années d'écriture sans recharge.",
  },
  {
    slug: "crayon-infini-cuir",
    name: "Crayon Infini",
    tagline: "Case cuir",
    sub: "Mine infinie · corps aluminium · case cuir tannage végétal",
    price: 35,
    collection: "mine-infinie",
    image: "/images/products/crayon-etui-cuir.png",
    imageAlt: "Crayon Schoppmann dans étui cuir rouge",
    gallery: [
      { src: "/images/products/crayon-steve-lavoie.png", alt: "Crayon Schoppmann gravé dans étui cuir — exemple personnalisation" },
      { src: "/images/products/crayon-infini.png", alt: "Crayon Infini Schoppmann — vue studio" },
      { src: "/images/products/mine-up.png", alt: "Gros plan pointe mine infinie" },
    ],
    href: "/produits/crayon-infini-cuir",
    includes: [
      "1 crayon aluminium mine infinie",
      "Case cuir tannage végétal caramel",
      "1 mine de rechange",
    ],
    description:
      "Le Crayon Infini dans sa version premium : même corps aluminium usiné à la main, livré dans une case cuir tannage végétal. Le cuir patine avec le temps — l'objet devient plus beau en vieillissant.",
  },

  /* ─── HYBRIDE ─── */
  {
    slug: "crayon-hybride-boite-3d",
    name: "Crayon Hybride",
    tagline: "Boîte hexagonale 3D",
    sub: "Mine infinie + cartouche encre · boîte hexagonale imprimée 3D",
    price: 35,
    badge: "Nouveauté",
    collection: "hybride",
    image: "/images/products/crayon-hybride.png",
    imageAlt: "Crayon Hybride Schoppmann, pointe encre bleue visible",
    gallery: [
      { src: "/images/products/crayon-hybride.png", alt: "Crayon Hybride Schoppmann — vue studio pointe encre bleue" },
      { src: "/images/products/pointe-stylo.png", alt: "Gros plan cartouche encre bleue crayon hybride" },
      { src: "/images/products/mine-down.png", alt: "Gros plan pointe mine infinie fond sombre" },
      { src: "/images/products/kit-mines.png", alt: "Crayon Schoppmann avec mines de rechange" },
    ],
    href: "/produits/crayon-hybride-boite-3d",
    includes: [
      "1 crayon aluminium hybride",
      "Mine infinie côté pointe",
      "1 cartouche encre bleue côté embout",
      "Mini boîte hexagonale imprimée 3D en filament recyclé",
      "1 mine de rechange",
    ],
    description:
      "Deux modes d'écriture en un seul objet. Mine métal-céramique infinie côté pointe, cartouche encre bleue interchangeable côté embout. Livré dans sa boîte hexagonale imprimée à l'atelier.",
  },
  {
    slug: "crayon-hybride-cuir",
    name: "Crayon Hybride",
    tagline: "Case cuir",
    sub: "Mine infinie + cartouche encre · case cuir tannage végétal",
    price: 45,
    collection: "hybride",
    image: "/images/products/crayon-etui-cuir.png",
    imageAlt: "Crayon Schoppmann hybride dans étui cuir rouge",
    gallery: [
      { src: "/images/products/crayon-hybride.png", alt: "Crayon Hybride Schoppmann — vue studio pointe encre bleue" },
      { src: "/images/products/crayon-steve-lavoie.png", alt: "Crayon Schoppmann gravé dans étui cuir — exemple personnalisation" },
      { src: "/images/products/mine-stylo-montee.png", alt: "Mine stylo montée sur crayon hybride" },
      { src: "/images/products/mine-up.png", alt: "Gros plan pointe mine infinie" },
      { src: "/images/products/kit-mines.png", alt: "Crayon Schoppmann avec mines de rechange" },
    ],
    href: "/produits/crayon-hybride-cuir",
    includes: [
      "1 crayon aluminium hybride",
      "Mine infinie côté pointe",
      "1 cartouche encre bleue côté embout",
      "Case cuir tannage végétal caramel",
      "1 mine de rechange",
    ],
    description:
      "Le Crayon Hybride en version premium. Mine infinie + encre bleue dans un corps aluminium usiné à la main, livré dans une case cuir tannage végétal. L'objet le plus complet de la gamme.",
  },

  /* ─── GOLF ─── */
  {
    slug: "crayon-golf-boite-3d",
    name: "Crayon Golf",
    tagline: "Boîte hexagonale 3D",
    sub: "Format poche · mine infinie · boîte hexagonale imprimée 3D",
    price: 25,
    badge: "Golf",
    collection: "golf",
    image: "/images/products/crayon-golf.png",
    imageAlt: "Crayon Schoppmann format golf aluminium compact",
    gallery: [
      { src: "/images/products/crayon-golf.png", alt: "Crayon Golf Schoppmann — vue studio" },
      { src: "/images/products/mine-down.png", alt: "Gros plan pointe mine golf fond sombre" },
      { src: "/images/products/kit-mines.png", alt: "Crayon golf avec mines de rechange" },
    ],
    href: "/produits/crayon-golf-boite-3d",
    includes: [
      "1 crayon aluminium format poche (95 mm)",
      "Mini boîte hexagonale imprimée 3D en filament recyclé",
      "1 mine de rechange",
    ],
    description:
      "Le Crayon Infini en version compacte, pensé pour la poche de sac de golf. Format 95 mm, mine métal-céramique indestructible même dans un sac qui voyage. Livré dans sa boîte hexagonale imprimée à l'atelier.",
  },
  {
    slug: "crayon-golf-cuir",
    name: "Crayon Golf",
    tagline: "Case cuir",
    sub: "Format poche · mine infinie · case cuir tannage végétal",
    price: 35,
    collection: "golf",
    image: "/images/products/crayon-golf.png",
    imageAlt: "Crayon Schoppmann format golf aluminium avec case cuir",
    gallery: [
      { src: "/images/products/crayon-golf.png", alt: "Crayon Golf Schoppmann — vue studio" },
      { src: "/images/products/kit-mines.png", alt: "Crayon golf avec mines de rechange" },
      { src: "/images/products/mine-down.png", alt: "Gros plan pointe mine golf" },
    ],
    href: "/produits/crayon-golf-cuir",
    includes: [
      "1 crayon aluminium format poche (95 mm)",
      "Case cuir tannage végétal caramel",
      "1 mine de rechange",
    ],
    description:
      "Le Crayon Golf dans sa version premium. Format 95 mm, mine infinie, case cuir tannage végétal. Pour ceux qui n'acceptent aucun compromis même sur le parcours.",
  },

  /* ─── RECHARGES ─── */
  {
    slug: "pack-5-mines",
    name: "Pack 10 mines",
    tagline: "",
    sub: "Recharges compatibles tous modèles Schoppmann",
    price: 9,
    collection: "recharges",
    image: "/images/products/lot-mines.png",
    imageAlt: "Lot de mines de rechange Schoppmann",
    gallery: [
      { src: "/images/products/lot-mines.png", alt: "Lot de mines Schoppmann" },
      { src: "/images/products/mines-pack.png", alt: "2 mines Schoppmann rouge et noir avec filetage doré" },
      { src: "/images/products/mine-up.png", alt: "Pointe mine Schoppmann gros plan" },
      { src: "/images/products/mine-down.png", alt: "Mine Schoppmann fond sombre" },
      { src: "/images/products/kit-mines.png", alt: "Crayon Schoppmann avec mines de rechange" },
    ],
    href: "/produits/pack-5-mines",
    includes: [
      "10 mines métal-céramique",
      "Disponible en noir et rouge",
      "Compatible tous modèles Schoppmann",
    ],
    description:
      "Les mines de rechange Schoppmann en métal-céramique. Pack de 10 mines compatibles avec tous les modèles de la gamme. Disponibles en noir (écriture standard) et rouge (annotations, corrections). Filetage doré standard.",
  },
];

export const collectionLabels: Record<string, string> = {
  "mine-infinie": "Mine infinie",
  hybride: "Hybride",
  golf: "Golf",
  recharges: "Recharges",
};

export const collectionAnchors: Record<string, string> = {
  "mine-infinie": "#mine-infinie",
  hybride: "#hybride",
  golf: "#golf",
  recharges: "#recharges",
};
