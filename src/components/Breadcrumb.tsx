import Link from "next/link";

export interface Crumb {
  label: string;
  /** Omit href on the current (last) crumb. */
  href?: string;
}

/** Shared breadcrumb trail — orients the visitor and links back up the hub. */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-500"
    >
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && <span className="text-zinc-700">/</span>}
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-cyan">
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-400">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
