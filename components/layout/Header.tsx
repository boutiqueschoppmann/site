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
      <div className="w-full pl-4 md:pl-6 pr-4 md:pr-8 h-16 md:h-28 flex items-center justify-between">
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

        {/* Actions */}
        <div className="flex items-center md:self-end md:pb-2">
          {/* Contact mobile */}
          <Link
            href="/contact"
            className="md:hidden p-2 text-charbon/60 hover:text-charbon transition-colors"
            aria-label="Contact"
          >
            <MailIcon />
          </Link>

          {/* Panier mobile */}
          <Link
            href="/panier"
            className="md:hidden relative p-2 text-charbon hover:opacity-70 transition-opacity"
            aria-label="Panier"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-cuir text-lin text-[9px] font-mono flex items-center justify-center rounded-full leading-none">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>

          {/* Panier desktop */}
          <Link
            href="/panier"
            className="group hidden md:inline-flex items-center gap-2 text-sm border border-charbon px-4 py-2 hover:bg-charbon hover:text-lin transition-all duration-200"
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  );
}
