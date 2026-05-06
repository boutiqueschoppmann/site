import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-charbon/40 font-mono mb-6">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-charbon transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-charbon/70">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
