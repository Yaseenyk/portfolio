import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { GUIDES, guideUrl } from "@/lib/guides";
import { breadcrumbJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import StickyActionBar from "@/components/campus/StickyActionBar";

const DESCRIPTION =
  "Practical guides for Indian final year students: the viva questions panels actually ask, project topics for BCA, MCA and B.Tech with honest difficulty ratings, report format chapter by chapter, and how to choose a project you can finish.";

export const metadata: Metadata = {
  title: "Final Year Project Guides — Topics, Viva Prep and Report Format",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/final-year-projects/guides/` },
  openGraph: {
    type: "website",
    title: "Final Year Project Guides | Yaseen Khatib",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/guides/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/guides.jpg`],
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Final year project guides",
  itemListElement: GUIDES.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: g.meta.title,
    description: g.meta.description,
    url: guideUrl(g.meta.slug),
  })),
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Final Year Project Guides",
  description: DESCRIPTION,
  url: `${SITE_URL}/final-year-projects/guides/`,
  author: personRef,
};

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 pb-32 md:pb-12">
      <JsonLd
        data={[
          collectionJsonLd,
          itemListJsonLd,
          breadcrumbJsonLd([
            { name: "Final Year Projects", path: "/final-year-projects" },
            { name: "Guides", path: "/final-year-projects/guides" },
          ]),
        ]}
      />

      <Link
        href="/final-year-projects/"
        className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan"
      >
        ← All projects
      </Link>

      <header className="mt-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/guides
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          Everything nobody tells you before your final year project
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Written from the other side of the table — these are systems I build
          professionally, so the difficulty ratings are honest rather than
          encouraging, and the viva questions are the ones that actually get asked.
          Free, no signup, nothing gated.
        </p>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
        {GUIDES.map((g) => (
          <Link
            key={g.meta.slug}
            href={`/final-year-projects/guides/${g.meta.slug}`}
            className="group flex h-full flex-col bg-ink p-6 transition-colors duration-300 hover:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                {g.meta.category}
              </span>
              <span className="font-mono text-[10px] tabular-nums text-zinc-600">
                {g.meta.readingMinutes} min
              </span>
            </div>
            <h2 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-zinc-50">
              {g.meta.h1}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {g.meta.description}
            </p>
            <span className="mt-auto pt-6 text-xs text-ice transition-transform duration-300 group-hover:translate-x-0.5">
              Read it →
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Past reading about it?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          If you already know what you need built, the projects come with the source,
          the report, and daily sessions that walk you through the code until you can
          defend it.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/final-year-projects/"
            className="rounded-xl bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            See the projects
          </Link>
          <Link
            href="/final-year-projects/custom/"
            className="rounded-xl border border-white/10 px-6 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            Get your own idea built
          </Link>
        </div>
      </section>

      <StickyActionBar />
    </div>
  );
}
