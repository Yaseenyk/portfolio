import type { ReactNode } from "react";
import Link from "next/link";
import type { ProductMeta } from "@/lib/products";
import RepoButton from "@/components/products/RepoButton";
import { ExternalLinkIcon } from "@/components/Icons";

/** Shared deep-dive header: breadcrumb, title, repo/live CTAs, and inline art. */
export default function ProductHero({
  product,
  art,
}: {
  product: ProductMeta;
  art: ReactNode;
}) {
  return (
    <header>
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 font-mono text-xs text-zinc-500"
      >
        <Link href="/" className="transition-colors hover:text-cyan">
          Home
        </Link>
        <span className="text-zinc-700">/</span>
        <Link href="/products" className="transition-colors hover:text-cyan">
          Products
        </Link>
        <span className="text-zinc-700">/</span>
        <span className="truncate text-zinc-400">{product.name}</span>
      </nav>

      <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan">
            {product.category}
          </span>
          <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.12] tracking-tight text-zinc-50 sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-300">
            {product.tagline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <RepoButton href={product.repoUrl} />
            {product.liveUrl && (
              <a
                href={product.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition-colors duration-200 hover:border-ice/40 hover:text-ice"
              >
                <ExternalLinkIcon className="h-[18px] w-[18px]" />
                Live demo
              </a>
            )}
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {product.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-zinc-800/80 px-2.5 py-1 text-[11px] text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Inline SVG art */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-ink/40 p-4 backdrop-blur-md">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent"
          />
          {art}
        </div>
      </div>
    </header>
  );
}
