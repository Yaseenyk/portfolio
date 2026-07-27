import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import {
  CAMPUS_FAQ,
  CAMPUS_PROJECTS,
  CUSTOM_BUILD_RANGE,
  DEGREE_SLUGS,
  PAYMENT_POLICY,
  SESSION_POLICY,
  allDegrees,
  allDomains,
  campusUrl,
  formatInr,
  projectsForDegree,
  type Degree,
} from "@/lib/campus";
import { breadcrumbJsonLd, faqPageJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import CampusIndex from "@/components/campus/CampusIndex";
import CampusFaq from "@/components/campus/CampusFaq";

const DESCRIPTION =
  "Final year projects for BCA, MCA and B.Tech students, built for you end to end — code, report, diagrams and deployment — or your own idea built from scratch. Daily live Google Meet sessions explain the code line by line so you can defend it in your viva. Direct payment in monthly installments.";

export const metadata: Metadata = {
  title: "Final Year Projects — Built, Explained, Defended",
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

const STEPS = [
  {
    n: "01",
    title: "Pick one, or name your own",
    body: "Browse the catalog, or send the idea your guide approved and it gets built from scratch. Any stack, any domain — the listing is a starting point, not a limit.",
  },
  {
    n: "02",
    title: "Start on the first installment",
    body: `Payment is direct — ${PAYMENT_POLICY.method.toLowerCase()} — split across months. Sessions begin ${PAYMENT_POLICY.sessionsStart.toLowerCase()}.`,
  },
  {
    n: "03",
    title: "Sit and learn it",
    body: `${SESSION_POLICY.cadence} sessions on ${SESSION_POLICY.platform} after ${SESSION_POLICY.startsAfter}, walking the code module by module. Nothing to build, nothing to figure out alone — turn up and understand what you are submitting. Ends in a mock viva.`,
  },
  {
    n: "04",
    title: "Take handover",
    body: `Complete source, report, deck, and deployment walkthrough ${PAYMENT_POLICY.handover.toLowerCase()}.`,
  },
];

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
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
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
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          I build it. You learn it. You defend it.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Pick a project below or tell me the one you want — either way I build the
          whole thing. Code, database, report, diagrams, deck, deployment. You do
          not write a line of it.
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
          Then, {SESSION_POLICY.cadence.toLowerCase()} after{" "}
          {SESSION_POLICY.startsAfter}, we sit on a call and I walk you through the
          code I wrote — line by line — until you can explain it without me. A
          working project is half the marks. The viva is the other half, and that is
          what the sessions are for.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/final-year-projects/custom"
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Get a custom project built
          </Link>
          <a
            href="#how-it-works"
            className="rounded-lg border border-white/10 px-6 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            How it works
          </a>
          <Link
            href="/final-year-projects/terms"
            className="rounded-lg border border-white/10 px-6 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            Terms
          </Link>
        </div>
      </header>

      <nav aria-label="Browse by course" className="mt-12">
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
              <span className="ml-2 text-xs text-zinc-600">
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

      <section id="how-it-works" className="mt-24 scroll-mt-28 border-t border-white/5 pt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          How it works
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
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
          className="mt-6 inline-block rounded-lg border border-white/10 px-6 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
        >
          Send a brief →
        </Link>
      </section>

      <div className="mt-24">
        <CampusFaq items={CAMPUS_FAQ} />
      </div>
    </div>
  );
}
