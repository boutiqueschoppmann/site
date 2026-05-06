"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Accueil", href: "/", icon: HomeIcon },
  { label: "Boutique", href: "/boutique", icon: ShopIcon },
  { label: "Golf", href: "/golf", icon: GolfIcon },
  { label: "Cadeaux", href: "/cadeaux-entreprises", icon: GiftIcon },
  { label: "À propos", href: "/notre-histoire", icon: InfoIcon },
];

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-lin/95 backdrop-blur-sm border-t border-charbon/10"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
    >
      <div className="flex items-stretch h-12">
        {items.map(({ label, href, icon: Icon }) => {
          const active = isActive(href, pathname);
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
                active ? "text-charbon" : "text-charbon/40 hover:text-charbon/70"
              }`}
            >
              <Icon active={active} />
              <span className="text-[9px] font-mono leading-none">{label}</span>
            </Link>
          );
        })}

      </div>
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" strokeLinejoin="round" />
    </svg>
  );
}

function ShopIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function GolfIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M12 2l7 4-7 4V2z" fill={active ? "currentColor" : "none"} />
      <ellipse cx="9" cy="20" rx="4" ry="1.5" fill={active ? "currentColor" : "none"} />
    </svg>
  );
}

function GiftIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7" />
      <path d="M12 8c0 0-2-4 0-4s2 4 0 4zM12 8c0 0 2-4 0-4" />
    </svg>
  );
}

function InfoIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="8" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="12" x2="12" y2="16" />
    </svg>
  );
}

function MailIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  );
}

