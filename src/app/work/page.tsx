import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Breadcrumb from "@/components/Breadcrumb";
import Products from "@/components/Products";
import Projects from "@/components/Projects";

const url = `${SITE_URL}/work`;

export const metadata: Metadata = {
  title: "Work — Products & Projects",
  description:
    "Shipped AI products and selected engineering projects by Yaseen Khatib — Sable, streamerOS, agentic RAG systems, autonomous pipelines, and enterprise platforms.",
  keywords: [
    "AI products",
    "Sable",
    "streamerOS",
    "Agentic RAG",
    "portfolio projects",
    "Full-Stack AI Engineer",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    title: "Work | Yaseen Khatib",
    description:
      "Shipped AI products and selected engineering projects — click any card into its deep-dive.",
    url,
    siteName: "Yaseen Khatib",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Work", item: url },
  ],
};

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work" }]} />

      <header className="mt-8 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Work
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">
          Shipped AI products and selected engineering projects. Each product
          card opens a full technical deep-dive; the projects below carry the
          architecture and outcomes inline.
        </p>
      </header>

      <Products />
      <Projects />

      <div className="border-t border-zinc-800/70 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          Explore next
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <a href="/blog" className="text-cyan transition-colors hover:text-ice">
            Read the engineering blog →
          </a>
          <a
            href="/sandbox"
            className="text-cyan transition-colors hover:text-ice"
          >
            Try the interactive sandbox →
          </a>
          <a
            href="/experience"
            className="text-cyan transition-colors hover:text-ice"
          >
            See work experience →
          </a>
        </div>
      </div>
    </div>
  );
}
