import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

/** Home-page Products section — a compact clickable strip. Each tile jumps
 *  straight to its /products deep-dive; the big spotlight cards live there. */
export default function Products() {
  return (
    <section id="products" aria-label="Products" className="scroll-mt-24 py-16">
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

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-4 backdrop-blur-md transition-colors hover:border-cyan/50"
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              {product.category}
            </span>
            <span className="mt-1.5 flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold text-zinc-100 transition-colors group-hover:text-cyan">
                {product.name}
              </span>
              <span
                aria-hidden
                className="font-mono text-xs text-zinc-600 transition-all group-hover:translate-x-0.5 group-hover:text-cyan"
              >
                →
              </span>
            </span>
            <span className="mt-1 block text-xs leading-snug text-zinc-500">
              {product.tagline}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
