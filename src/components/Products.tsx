import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import SpotlightCard from "@/components/products/SpotlightCard";

/** Home-page Products section — a preview grid that links into /products. */
export default function Products() {
  return (
    <section id="products" aria-label="Products" className="scroll-mt-24 py-24">
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
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
        Shipped products and autonomous pipelines — built lean, deployed at
        AI-speed.
      </p>

      <div
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
        style={{ perspective: 1000 }}
      >
        {PRODUCTS.map((product, i) => (
          <SpotlightCard key={product.slug} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
