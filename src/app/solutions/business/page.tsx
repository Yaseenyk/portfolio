import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import {
  ENGAGEMENT_STEPS,
  SERVICES,
  SOLUTIONS_FAQ,
  formatInrShort,
} from "@/lib/solutions";
import { breadcrumbJsonLd, faqPageJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import EvidenceGrid from "@/components/solutions/EvidenceGrid";
import SolutionsLeadForm from "@/components/solutions/SolutionsLeadForm";

const DESCRIPTION =
  "Architecture review, AI integration, fixed-scope custom systems and ERP replacement for Indian and remote businesses. Fixed prices published, code delivered into your repository, no licence and no per-seat fee.";

export const metadata: Metadata = {
  title: "For Businesses — Architecture, AI Integration, Custom Systems & ERP",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/solutions/business/` },
  openGraph: {
    type: "website",
    title: "Solutions for Businesses | Yaseen Khatib",
    description: DESCRIPTION,
    url: `${SITE_URL}/solutions/business/`,
    siteName: "Yaseen Khatib",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Business services",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.name,
      description: s.summary,
      provider: personRef,
      areaServed: { "@type": "Country", name: "India" },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: s.priceFrom,
          maxPrice: s.priceTo,
          priceCurrency: "INR",
        },
      },
    },
  })),
};

export default function BusinessPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd
        data={[
          jsonLd,
          faqPageJsonLd(SOLUTIONS_FAQ),
          breadcrumbJsonLd([
            { name: "Solutions", path: "/solutions" },
            { name: "For Businesses", path: "/solutions/business" },
          ]),
        ]}
      />

      <Link
        href="/solutions"
        className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan"
      >
        ← Solutions
      </Link>

      <header className="mt-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/solutions/business
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          Four ways in. Start with the cheapest one.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
          Most people arrive holding a proposal they cannot evaluate. The right
          first step is almost never the big build — it is a paid review that tells
          you what the work genuinely requires, so that every later decision is made
          with a number you trust.
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
          Prices below are real ranges, not &ldquo;contact us&rdquo;. The final
          number is fixed in writing before work starts and does not move unless you
          change the scope.
        </p>
      </header>

      <div className="mt-16 space-y-6">
        {SERVICES.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                  {String(i + 1).padStart(2, "0")} · {s.category}
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50">
                  {s.name}
                </h2>
                <p className="mt-2 text-zinc-300">{s.tagline}</p>
              </div>
              <div className="text-right">
                <span className="block font-mono text-xl tabular-nums text-zinc-50">
                  {formatInrShort(s.priceFrom)} – {formatInrShort(s.priceTo)}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  {s.timeline}
                </span>
              </div>
            </div>

            <p className="mt-5 max-w-3xl leading-relaxed text-zinc-400">{s.summary}</p>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  What you get
                </h3>
                <ul className="mt-3 space-y-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-2.5 text-sm text-zinc-400">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ice" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="text-sm font-medium text-zinc-100">
                  &ldquo;{s.objection.q}&rdquo;
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                  {s.objection.a}
                </p>
              </div>
            </div>

            <a
              href="#enquire"
              className="mt-6 inline-block rounded-xl border border-white/10 px-5 py-2.5 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
            >
              Talk about {s.name.toLowerCase()} →
            </a>
          </article>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          What I will tell you that a vendor will not
        </h2>
        <ul className="mt-8 space-y-5">
          {[
            {
              t: "When you should buy, not build.",
              b: "If an off-the-shelf tool solves eighty per cent of it for a fraction of a build, that is what the review will say. Custom software is the right answer far less often than people selling custom software suggest.",
            },
            {
              t: "When the scope is too large for one engineer.",
              b: "Some work needs a team of twenty and a support rota. I will say so rather than take a project I cannot land, because a half-delivered system is worse for you than a firm no.",
            },
            {
              t: "What it will actually cost to run.",
              b: "Build cost is the part everyone quotes. Hosting, model spend, and maintenance are what surprise people in year two, so they are estimated up front and in writing.",
            },
            {
              t: "Where your existing quote is real.",
              b: "Not every enterprise proposal is padded. Sometimes the number is fair and the answer is to proceed with them — you will be told that too.",
            },
          ].map((row) => (
            <li key={row.t} className="flex gap-4">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
              <div>
                <span className="text-zinc-100">{row.t}</span>{" "}
                <span className="text-zinc-400">{row.b}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          How an engagement runs
        </h2>
        <ol className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ENGAGEMENT_STEPS.map((s) => (
            <li
              key={s.n}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
            >
              <span className="font-mono text-xs text-cyan">{s.n}</span>
              <h3 className="mt-3 text-base font-medium text-zinc-50">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-24">
        <EvidenceGrid />
      </div>

      <div className="mt-20">
        <SolutionsLeadForm
          heading="Book the free call"
          intro="Thirty minutes, no charge, no pitch. Bring the problem and any quote you are weighing up. You leave with an honest read on what it should cost and whether it is worth building at all."
          messageLabel="What you're trying to solve"
          messagePlaceholder="The problem, the systems you already run, any proposal you're evaluating, and your timeline…"
          defaultInterest="Architecture review / advisory"
        />
      </div>
    </div>
  );
}
