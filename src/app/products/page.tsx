import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { PRODUCTS, productUrl } from "@/lib/products";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import SpotlightCard from "@/components/products/SpotlightCard";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Shipped products and autonomous pipelines by Yaseen Khatib — streamerOS, the Automated LinkedIn Pipeline, and the Zero-Cost AI Blog Writer.",
  alternates: { canonical: `${SITE_URL}/products` },
  openGraph: {
    type: "website",
    title: "Products | Yaseen Khatib",
    description:
      "Shipped products and autonomous pipelines — built lean, deployed at AI-speed.",
    url: `${SITE_URL}/products`,
    siteName: "Yaseen Khatib",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    description: p.summary,
    url: productUrl(p.slug),
  })),
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <JsonLd
        data={[jsonLd, breadcrumbJsonLd([{ name: "Products", path: "/products" }])]}
      />

      <header>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/products
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Products
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-400">
          Shipped products and autonomous pipelines — built lean, deployed at
          AI-speed. Hover a tile, then dive into the architecture.
        </p>
      </header>

      <div
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
        style={{ perspective: 1000 }}
      >
        {PRODUCTS.map((product, i) => (
          <SpotlightCard key={product.slug} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
