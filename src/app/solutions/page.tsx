import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, PERSON } from "@/lib/site";
import {
  ENGAGEMENT_STEPS,
  HOSTED_TIERS,
  SERVICES,
  SOLUTIONS_FAQ,
  formatInr,
  formatInrShort,
} from "@/lib/solutions";
import { breadcrumbJsonLd, faqPageJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import EvidenceGrid from "@/components/solutions/EvidenceGrid";
import SolutionsLeadForm from "@/components/solutions/SolutionsLeadForm";

const DESCRIPTION =
  "Solution architecture and software builds for businesses that were quoted enterprise prices for a problem that does not need one — AI integration, custom internal systems, and ERP replacement. Plus hosted tools for small businesses from ₹800 a month. Fixed prices, you own the code.";

export const metadata: Metadata = {
  title: "Solutions — Systems Built For What They Should Cost",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/solutions/` },
  openGraph: {
    type: "website",
    title: "Solutions | Yaseen Khatib",
    description: DESCRIPTION,
    url: `${SITE_URL}/solutions/`,
    siteName: "Yaseen Khatib",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Yaseen Khatib — Solution Architecture & Software Engineering",
  description: DESCRIPTION,
  url: `${SITE_URL}/solutions/`,
  provider: personRef,
  founder: personRef,
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Place", name: "Remote, worldwide" },
  ],
  knowsAbout: PERSON.knowsAbout,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      name: s.name,
      description: s.summary,
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: s.priceFrom,
        maxPrice: s.priceTo,
        priceCurrency: "INR",
      },
    })),
  },
};

export default function SolutionsPage() {
  const cheapestService = Math.min(...SERVICES.map((s) => s.priceFrom));
  const cheapestHosted = Math.min(...HOSTED_TIERS.map((t) => t.monthly));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <JsonLd
        data={[
          serviceJsonLd,
          faqPageJsonLd(SOLUTIONS_FAQ),
          breadcrumbJsonLd([{ name: "Solutions", path: "/solutions" }]),
        ]}
      />

      <header>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/solutions
        </span>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-50 sm:text-6xl">
          You were quoted enterprise money
          <br />
          for a problem that{" "}
          <span className="text-gradient animate-gradient">is not enterprise-sized</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
          I design and build the system — architecture through deployment. Same
          engineer does both, which removes the layer where requirements get lost
          and most of the cost lives.
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
          Fixed price agreed before anything starts. Code in your repository from
          the first commit. No licence, no per-seat fee, no lock-in — if you want
          to hire someone else afterwards, nothing stops you.
        </p>

        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-y border-white/10 py-6">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Business engagements
            </dt>
            <dd className="mt-1.5 font-mono text-2xl tabular-nums text-zinc-50">
              from {formatInrShort(cheapestService)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Small business, hosted
            </dt>
            <dd className="mt-1.5 font-mono text-2xl tabular-nums text-zinc-50">
              {formatInr(cheapestHosted)}
              <span className="text-base text-zinc-500">/mo</span>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              You own
            </dt>
            <dd className="mt-1.5 text-sm leading-tight text-zinc-300">
              The source code
              <br />
              <span className="text-zinc-500">not a licence</span>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              First call
            </dt>
            <dd className="mt-1.5 text-sm leading-tight text-zinc-300">
              Free, 30 min
              <br />
              <span className="text-zinc-500">honest answer, no pitch</span>
            </dd>
          </div>
        </dl>
      </header>

      {/* Two audiences, one proof base — split them immediately. */}
      <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Link
          href="/solutions/business/"
          className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-cyan/40"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
            For businesses
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-50">
            You have a quote and a bad feeling about it
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Architecture review, AI integration, custom systems, ERP replacement.
            Start with a paid review that tells you what the work should actually
            cost — including when the answer is to buy rather than build.
          </p>
          <span className="mt-auto pt-8 font-mono text-xs tabular-nums text-zinc-500">
            {formatInrShort(cheapestService)} –{" "}
            {formatInrShort(Math.max(...SERVICES.map((s) => s.priceTo)))}
          </span>
          <span className="mt-2 text-xs text-ice transition-transform duration-300 group-hover:translate-x-0.5">
            See the four services →
          </span>
        </Link>

        <Link
          href="/solutions/small-business/"
          className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-cyan/40"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
            For small businesses
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-50">
            You just need the thing to work, cheaply
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            A booking page, an invoice system, a stock tracker — built once, then
            hosted and maintained for a monthly fee that costs less than a phone
            plan. Cancel any month, data exported free.
          </p>
          <span className="mt-auto pt-8 font-mono text-xs tabular-nums text-zinc-500">
            {formatInr(cheapestHosted)}/month + setup
          </span>
          <span className="mt-2 text-xs text-ice transition-transform duration-300 group-hover:translate-x-0.5">
            See the plans →
          </span>
        </Link>
      </section>

      <div className="mt-24">
        <EvidenceGrid />
      </div>

      <section className="mt-24">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          How an engagement runs
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ENGAGEMENT_STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
            >
              <span className="font-mono text-xs text-cyan">{s.n}</span>
              <h3 className="mt-3 text-base font-medium text-zinc-50">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 border-t border-white/5 pt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          The questions that come up first
        </h2>
        <dl className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SOLUTIONS_FAQ.map((f) => (
            <div
              key={f.question}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
            >
              <dt className="text-sm font-medium text-zinc-100">{f.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-400">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-20">
        <SolutionsLeadForm
          heading="Start with the free call"
          intro="Thirty minutes. Tell me what you are trying to fix, what you already run, and what it has been quoted at. You will get an honest view on whether it is worth building — including when the answer is that you should not build anything."
          messageLabel="What you're trying to solve"
          messagePlaceholder="The problem, what systems you already run, any quote or proposal you're weighing up, and your timeline…"
        />
      </div>
    </div>
  );
}
