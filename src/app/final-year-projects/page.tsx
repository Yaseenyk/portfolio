import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import {
  CAMPUS_FAQ,
  CAMPUS_PROJECTS,
  CUSTOM_BUILD_RANGE,
  DEGREE_SLUGS,
  SESSION_POLICY,
  allDegrees,
  allDomains,
  campusUrl,
  formatInr,
  lowestPrice,
  projectsForDegree,
  whatsappHref,
  type Degree,
} from "@/lib/campus";
import { breadcrumbJsonLd, faqPageJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import CampusIndex from "@/components/campus/CampusIndex";
import CampusFaq from "@/components/campus/CampusFaq";
import EarlyBirdBand from "@/components/campus/EarlyBirdBand";
import PriceComparison from "@/components/campus/PriceComparison";
import ProcessTimeline from "@/components/campus/ProcessTimeline";
import StickyActionBar from "@/components/campus/StickyActionBar";
import TrustStrip from "@/components/campus/TrustStrip";

const DESCRIPTION =
  "Final year projects for BCA, MCA and B.Tech students, built for you end to end — code, report, diagrams and deployment — or your own idea built from scratch. Daily live Google Meet sessions explain the code line by line so you can defend it in your viva. Direct payment in monthly installments.";

export const metadata: Metadata = {
  title: "Final Year Projects — Built For You, Then Explained To You",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/final-year-projects/` },
  openGraph: {
    type: "website",
    title: "Final Year Projects | Yaseen Khatib",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/`,
    siteName: "Yaseen Khatib",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Final Year Project Build & Mentorship",
  serviceType: "Academic project development and code mentorship",
  description: DESCRIPTION,
  provider: personRef,
  areaServed: { "@type": "Country", name: "India" },
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "BCA, MCA, B.Tech and Diploma final year students",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    lowPrice: CUSTOM_BUILD_RANGE.min,
    highPrice: CUSTOM_BUILD_RANGE.max,
    offerCount: CAMPUS_PROJECTS.length,
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: CAMPUS_PROJECTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.title,
    description: p.summary,
    url: campusUrl(p.slug),
  })),
};

export default function FinalYearProjectsPage() {
  const cheapest = Math.min(...CAMPUS_PROJECTS.map(lowestPrice));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 pb-32 md:pb-12">
      <JsonLd
        data={[
          serviceJsonLd,
          itemListJsonLd,
          faqPageJsonLd(CAMPUS_FAQ),
          breadcrumbJsonLd([
            { name: "Final Year Projects", path: "/final-year-projects" },
          ]),
        ]}
      />

      <header>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/final-year-projects
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-50 sm:text-6xl">
          I build it.
          <br />
          You learn it.
          <br />
          <span className="text-gradient animate-gradient">You defend it.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
          Pick a project below or tell me the one you want — either way I build the
          whole thing. Code, database, report, diagrams, deck, deployment.{" "}
          <span className="text-zinc-50">You do not write a line of it.</span>
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
          Then, {SESSION_POLICY.cadence.toLowerCase()} after{" "}
          {SESSION_POLICY.startsAfter}, we sit on a call and I walk you through the
          code I wrote — line by line — until you can explain it without me. A
          working project is half the marks. The viva is the other half.
        </p>

        {/* Price anchor — students filter on price before anything else. */}
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-y border-white/10 py-6">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Ready projects from
            </dt>
            <dd className="mt-1.5 font-mono text-2xl tabular-nums text-zinc-50">
              {formatInr(cheapest)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Your own idea
            </dt>
            <dd className="mt-1.5 font-mono text-2xl tabular-nums text-zinc-50">
              {formatInr(CUSTOM_BUILD_RANGE.min)}–{formatInr(CUSTOM_BUILD_RANGE.max)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Payment
            </dt>
            <dd className="mt-1.5 text-sm leading-tight text-zinc-300">
              Monthly installments
              <br />
              <span className="text-zinc-500">direct, no gateway</span>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              First call
            </dt>
            <dd className="mt-1.5 text-sm leading-tight text-zinc-300">
              Free
              <br />
              <span className="text-zinc-500">15 min, no commitment</span>
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={whatsappHref(
              "Hi Yaseen, I want to know about the final year projects.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-[#04220F] transition-transform duration-200 hover:scale-[1.03]"
          >
            Ask on WhatsApp
          </a>
          <Link
            href="/final-year-projects/custom"
            className="rounded-xl bg-gradient-to-r from-cyan to-purple px-6 py-3.5 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Get your own idea built
          </Link>
          <a
            href="#how-it-works"
            className="rounded-xl border border-white/10 px-6 py-3.5 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            How it works
          </a>
          <Link
            href="/final-year-projects/terms"
            className="rounded-xl border border-white/10 px-6 py-3.5 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            Terms
          </Link>
        </div>
      </header>

      <div className="mt-16">
        <EarlyBirdBand />
      </div>

      <nav aria-label="Browse by course" className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
          Browse by course
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {(Object.keys(DEGREE_SLUGS) as Degree[]).map((d) => (
            <Link
              key={d}
              href={`/final-year-projects/for/${DEGREE_SLUGS[d]}`}
              className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-zinc-400 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
            >
              {d}
              <span className="ml-2 font-mono text-xs tabular-nums text-zinc-600">
                {projectsForDegree(d).length}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <CampusIndex
        projects={CAMPUS_PROJECTS}
        degrees={allDegrees()}
        domains={allDomains()}
      />

      <div className="mt-24">
        <TrustStrip />
      </div>

      <div className="mt-20">
        <ProcessTimeline />
      </div>

      <div className="mt-16">
        <PriceComparison />
      </div>

      <section className="mt-24 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Want something that is not on this page?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Then describe it and it gets built. The problem statement your guide
          approved, an idea you saw somewhere, a stack your department insists on —
          any of it. Same sessions, same installments, still nothing for you to
          build. Custom work is quoted between {formatInr(CUSTOM_BUILD_RANGE.min)}{" "}
          and {formatInr(CUSTOM_BUILD_RANGE.max)} depending on scope.
        </p>
        <Link
          href="/final-year-projects/custom"
          className="mt-6 inline-block rounded-xl bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
        >
          Describe your project →
        </Link>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          For departments
        </span>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50">
          Running a batch, not one project?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          HODs and placement cells: batch mentoring, a free workshop for your final
          year students, or distinct projects across a cohort so no two submissions
          collide.
        </p>
        <Link
          href="/final-year-projects/colleges"
          className="mt-6 inline-block rounded-xl border border-white/10 px-6 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
        >
          For colleges →
        </Link>
      </section>

      <div className="mt-24">
        <CampusFaq items={CAMPUS_FAQ} />
      </div>

      <StickyActionBar />
    </div>
  );
}
