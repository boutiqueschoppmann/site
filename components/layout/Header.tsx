"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";

const nav = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/boutique" },
  { label: "Golf", href: "/golf" },
  { label: "Cadeaux entreprises", href: "/cadeaux-entreprises" },
  { label: "À propos", href: "/notre-histoire" },
  { label: "Contact", href: "/contact" },
];

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-lin/95 backdrop-blur-sm ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-28 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo_schoppmann_sans_fond_recadre.png"
            alt="Schoppmann"
            width={500}
            height={150}
            className="object-contain h-11 md:h-24 w-auto"
            priority
          />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-end h-16 md:h-28">
          {nav.map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 pb-4 text-base whitespace-nowrap border-b-2 transition-all duration-200 ${
                  active
                    ? "border-charbon text-charbon font-medium"
                    : "border-transparent text-charbon/50 hover:text-charbon hover:border-charbon/30"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions desktop */}
        <div className="hidden md:flex md:self-end md:pb-2">
          <Link
            href="/panier"
            className="group inline-flex items-center gap-2 text-sm border border-charbon px-4 py-2 hover:bg-charbon hover:text-lin transition-all duration-200"
          >
            <CartIcon />
            Panier
            {totalItems > 0 && (
              <span className="flex items-center gap-2 border-l border-charbon/25 group-hover:border-lin/25 pl-2 transition-colors">
                <span className="font-mono text-cuir group-hover:text-lin/80 text-xs transition-colors">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              </span>
            )}
          </Link>
        </div>
      </div>

    </header>
  );
}

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
