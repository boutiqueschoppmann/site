import Link from "next/link";
import Image from "next/image";

const links = {
  boutique: [
    { label: "Crayons hybrides", href: "/boutique#hybride" },
    { label: "Gamme golf", href: "/golf" },
    { label: "Recharges & accessoires", href: "/recharges" },
    { label: "Cadeaux entreprises", href: "/cadeaux-entreprises" },
  ],
  info: [
    { label: "Notre histoire", href: "/notre-histoire" },
    { label: "Savoir-faire", href: "/savoir-faire" },
    { label: "Journal", href: "/journal" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Livraison & retours", href: "/livraison-retours" },
    { label: "CGV", href: "/cgv" },
    { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charbon text-lin/70 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Marque */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo_s_schoppmann_sans_fond_recadre.png"
              alt="Schoppmann"
              width={80}
              height={80}
              className="object-contain h-10 w-auto"
            />
          </Link>
          <p className="text-sm leading-relaxed">
            Crayons réutilisables usinés à la main à Sainte-Brigitte-de-Laval, Québec.
          </p>
          <div className="flex gap-4 mt-2">
            <SocialLink href="https://instagram.com/crayon.schoppmann" label="Instagram @crayon.schoppmann">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href="https://tiktok.com/@schoppmann" label="TikTok @schoppmann">
              <TikTokIcon />
            </SocialLink>
          </div>
        </div>

        {/* Boutique */}
        <div>
          <p className="text-lin text-xs tracking-widest uppercase mb-4">Boutique</p>
          <ul className="flex flex-col gap-2">
            {links.boutique.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm hover:text-lin transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Infos */}
        <div>
          <p className="text-lin text-xs tracking-widest uppercase mb-4">À propos</p>
          <ul className="flex flex-col gap-2">
            {links.info.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm hover:text-lin transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Légal */}
        <div>
          <p className="text-lin text-xs tracking-widest uppercase mb-4">Légal</p>
          <ul className="flex flex-col gap-2">
            {links.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm hover:text-lin transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-lin/10 max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-lin/40">
        <p>© {new Date().getFullYear()} Schoppmann. Tous droits réservés.</p>
        <p className="flex items-center gap-2">Fait avec soin à Sainte-Brigitte-de-Laval, Québec <Image src="/images/flag-qc.svg" alt="Québec" width={22} height={15} className="inline-block" /></p>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-lin/50 hover:text-lin transition-colors"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.87a8.18 8.18 0 004.78 1.52V7a4.85 4.85 0 01-1.01-.31z" />
    </svg>
  );
}
