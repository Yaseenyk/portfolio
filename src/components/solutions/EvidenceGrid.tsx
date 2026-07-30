import Link from "next/link";
import { SOCIALS } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

/**
 * "If you have trust issues, look at what I've built" — made into links rather
 * than a request. Every card points at something already public on this site
 * or on GitHub; nothing here is a claim that cannot be opened and checked.
 */
export default function EvidenceGrid() {
  return (
    <section className="py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          Do not take any of this on trust. Go and check.
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
          Every system below is documented with its architecture, its trade-offs,
          and what it cost to run. Read those before you read the pricing.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
        {PRODUCTS.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="group flex h-full flex-col bg-ink p-6 transition-colors duration-300 hover:bg-white/[0.03]"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
              {p.category}
            </span>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-50">
              {p.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.summary}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-zinc-500"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="mt-auto pt-6 text-xs text-ice transition-transform duration-300 group-hover:translate-x-0.5">
              Read the teardown →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
        >
          Client and enterprise work →
        </Link>
        <a
          href={SOCIALS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
        >
          Read the source on GitHub ↗
        </a>
        <a
          href={SOCIALS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
        >
          Employment history ↗
        </a>
      </div>
    </section>
  );
}
