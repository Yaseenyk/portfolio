import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

/** Home-page Products section — medium clickable cards (2×2): enough story
 *  to sell each product, one click to its /products deep-dive. */
export default function Products() {
  return (
    <section id="products" aria-label="Products" className="scroll-mt-24 py-10 sm:py-16">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/products
        </h2>
        <Link
          href="/products"
          className="font-mono text-xs text-zinc-500 transition-colors duration-200 hover:text-cyan"
        >
          View all →
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {PRODUCTS.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group flex flex-col rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-6 backdrop-blur-md transition-colors hover:border-cyan/50"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              {product.category}
            </span>
            <span className="mt-2 flex items-baseline justify-between gap-3">
              <span className="text-xl font-semibold tracking-tight text-zinc-50 transition-colors group-hover:text-cyan">
                {product.name}
              </span>
              <span
                aria-hidden
                className="font-mono text-sm text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-cyan"
              >
                →
              </span>
            </span>
            <span className="mt-0.5 block text-sm font-medium text-ice/90">
              {product.tagline}
            </span>
            <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-400">
              {product.summary}
            </span>
            <span className="mt-4 flex flex-wrap gap-1.5">
              {product.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-zinc-800 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] text-zinc-500"
                >
                  {t}
                </span>
              ))}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
