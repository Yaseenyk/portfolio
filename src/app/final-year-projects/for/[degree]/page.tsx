import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site";
import {
  CAMPUS_FAQ,
  CUSTOM_BUILD_RANGE,
  DEGREE_SLUGS,
  SESSION_POLICY,
  campusUrl,
  degreeFromSlug,
  formatInr,
  projectsForDegree,
  type Degree,
} from "@/lib/campus";
import { guidesForDegree } from "@/lib/guides";
import { breadcrumbJsonLd, faqPageJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ProjectCard from "@/components/campus/ProjectCard";
import CampusFaq from "@/components/campus/CampusFaq";
import EarlyBirdBand from "@/components/campus/EarlyBirdBand";
import StickyActionBar from "@/components/campus/StickyActionBar";
import TrustStrip from "@/components/campus/TrustStrip";

interface Params {
  params: { degree: string };
}

/**
 * Per-course copy. Each landing page targets a different search intent
 * ("bca final year project", "mca project topics"), so the body text is
 * written per course rather than templated — near-duplicate pages get
 * filtered out of the index.
 */
const COPY: Record<Degree, { h1: string; intro: string; expectation: string }> = {
  BCA: {
    h1: "BCA final year projects with source code",
    intro:
      "A BCA project is marked on whether it runs, whether the documentation matches the code, and whether you can walk your examiner through it. Depth of algorithm matters less than a clean, complete, working application with a sensible database behind it.",
    expectation:
      "Most BCA departments expect a working web or desktop application, an ER diagram that matches the actual schema, and a report in the college's format. The projects below are scoped to that — nothing so large that you cannot finish the documentation.",
  },
  MCA: {
    h1: "MCA final year projects with source code and code explanation",
    intro:
      "MCA is a postgraduate course, and the viva reflects it. Examiners push past what the application does and into why it was built that way — which algorithm, which trade-off, which alternative you rejected. A downloaded project cannot survive that conversation.",
    expectation:
      "Expect questions on architecture, database normalisation, and any model or algorithm you used. Every project below comes with sessions that specifically prepare that layer, ending in a mock viva on the exact code you are submitting.",
  },
  "B.Tech": {
    h1: "B.Tech final year projects for CSE and IT students",
    intro:
      "B.Tech projects are usually built by a team and judged in a review panel across two or three checkpoints, not one final demo. That means the project has to be presentable early and still have room to grow between reviews.",
    expectation:
      "Panels reward technical depth and a clear problem statement. The projects below are modular enough to split across a team, and the sessions cover each module separately so every member can answer for their part.",
  },
  "B.Sc IT": {
    h1: "B.Sc IT final year projects with full source code",
    intro:
      "B.Sc IT projects are judged on much the same lines as BCA — a complete, working application with documentation that matches it. The trap is picking something too ambitious and submitting a half-finished demo.",
    expectation:
      "Pick something you can finish and explain. Each project below ships with the report, diagrams, and a deployment walkthrough so the submission is complete on day one and the remaining time goes into understanding it.",
  },
  "M.Tech": {
    h1: "M.Tech final year projects with implementation and code walkthrough",
    intro:
      "An M.Tech project is expected to carry a real technical contribution and often a paper alongside it. The implementation is the evidence, so it has to be defensible line by line, not just runnable.",
    expectation:
      "The advanced projects below are the right starting point — they involve retrieval pipelines, model evaluation, and trade-offs worth writing up. The sessions go into why each design decision was made, which is what a thesis defence actually turns on.",
  },
  Diploma: {
    h1: "Diploma final year projects with source code",
    intro:
      "A diploma project is marked mostly on the demo. It has to run reliably in front of an examiner, on the hardware available, without a network dependency you cannot control.",
    expectation:
      "The projects below run locally and demo reliably. The sessions focus on the parts an examiner is most likely to point at and ask you to explain.",
  },
};

export function generateStaticParams() {
  return Object.values(DEGREE_SLUGS).map((degree) => ({ degree }));
}

export function generateMetadata({ params }: Params): Metadata {
  const degree = degreeFromSlug(params.degree);
  if (!degree) return {};

  const copy = COPY[degree];
  const count = projectsForDegree(degree).length;
  const description = `${count} final year projects for ${degree} students — full source code, project report, and ${SESSION_POLICY.cadence.toLowerCase()} live sessions explaining the code for viva defence. Direct payment in monthly installments.`;
  const url = `${SITE_URL}/final-year-projects/for/${params.degree}/`;

  return {
    title: copy.h1,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${copy.h1} | Yaseen Khatib`,
      description,
      url,
      siteName: "Yaseen Khatib",
      images: [`${SITE_URL}/og/campus/hub.jpg`],
    },
  };
}

export default function DegreePage({ params }: Params) {
  const degree = degreeFromSlug(params.degree);
  if (!degree) notFound();

  const copy = COPY[degree];
  const projects = projectsForDegree(degree);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.h1,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      description: p.summary,
      url: campusUrl(p.slug),
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Final Year Project Build & Mentorship for ${degree} Students`,
    serviceType: "Academic project development and code mentorship",
    provider: personRef,
    areaServed: { "@type": "Country", name: "India" },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: `${degree} final year students`,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: Math.min(...projects.map((p) => p.prices.source)),
      highPrice: Math.max(...projects.map((p) => p.prices.mentored)),
      offerCount: projects.length,
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 pb-32 md:pb-12">
      <JsonLd
        data={[
          serviceJsonLd,
          itemListJsonLd,
          faqPageJsonLd(CAMPUS_FAQ),
          breadcrumbJsonLd([
            { name: "Final Year Projects", path: "/final-year-projects" },
            {
              name: degree,
              path: `/final-year-projects/for/${params.degree}`,
            },
          ]),
        ]}
      />

      <Link
        href="/final-year-projects"
        className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan"
      >
        ← All projects
      </Link>

      <header className="mt-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/for/{params.degree}
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          {copy.h1}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
          {copy.intro}
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
          {copy.expectation}
        </p>
      </header>

      <div className="mt-12">
        <EarlyBirdBand />
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          {projects.length} project{projects.length === 1 ? "" : "s"} that suit {degree}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Your guide approved a different topic?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Send the problem statement and it gets built to spec — same{" "}
          {SESSION_POLICY.cadence.toLowerCase()} sessions after{" "}
          {SESSION_POLICY.startsAfter}, same installments. Custom builds are quoted
          between {formatInr(CUSTOM_BUILD_RANGE.min)} and{" "}
          {formatInr(CUSTOM_BUILD_RANGE.max)} depending on scope.
        </p>
        <Link
          href="/final-year-projects/custom"
          className="mt-6 inline-block rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
        >
          Send a brief →
        </Link>
      </section>

      <nav aria-label="Other courses" className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
          Other courses
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {(Object.keys(DEGREE_SLUGS) as Degree[])
            .filter((d) => d !== degree)
            .map((d) => (
              <Link
                key={d}
                href={`/final-year-projects/for/${DEGREE_SLUGS[d]}`}
                className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-zinc-400 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
              >
                {d} projects
              </Link>
            ))}
        </div>
      </nav>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Read before you decide
        </h2>
        <ul className="mt-6 space-y-3">
          {guidesForDegree(degree).map((g) => (
            <li key={g.slug}>
              <Link
                href={`/final-year-projects/guides/${g.slug}`}
                className="group flex items-baseline justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors duration-200 hover:border-cyan/40"
              >
                <span className="text-sm text-zinc-200">{g.h1}</span>
                <span className="shrink-0 font-mono text-[10px] tabular-nums text-zinc-600">
                  {g.readingMinutes} min
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-20">
        <TrustStrip />
      </div>

      <div className="mt-20">
        <CampusFaq items={CAMPUS_FAQ} />
      </div>

      <StickyActionBar />
    </div>
  );
}
