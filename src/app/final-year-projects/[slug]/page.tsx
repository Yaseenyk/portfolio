import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PERSON } from "@/lib/site";
import {
  CAMPUS_FAQ,
  CAMPUS_PROJECTS,
  DEGREE_SLUGS,
  PAYMENT_POLICY,
  SESSION_POLICY,
  campusImageUrl,
  campusUrl,
  getCampusProject,
  getTiers,
} from "@/lib/campus";
import type { CampusProject } from "@/lib/campus";
import { PERSON_ID, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import CampusFaq from "@/components/campus/CampusFaq";
import CampusLeadForm from "@/components/campus/CampusLeadForm";
import EarlyBirdBand from "@/components/campus/EarlyBirdBand";
import StickyActionBar from "@/components/campus/StickyActionBar";
import TierTable from "@/components/campus/TierTable";
import TrustStrip from "@/components/campus/TrustStrip";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return CAMPUS_PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getCampusProject(params.slug);
  if (!project) return {};

  const url = campusUrl(project.slug);
  const image = campusImageUrl(project);
  return {
    title: `${project.title} — Final Year Project`,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${project.title} | Final Year Project`,
      description: project.summary,
      url,
      siteName: "Yaseen Khatib",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Final Year Project`,
      description: project.summary,
      images: [image],
    },
  };
}

export default function CampusProjectPage({ params }: Params) {
  const project = getCampusProject(params.slug);
  if (!project) notFound();

  const tiers = getTiers(project);

  // Related projects for internal linking: prefer ones sharing a degree, fall
  // back to the same domain, then anything — excluding this project. Cap at 3.
  const relatedProjects: CampusProject[] = (() => {
    const others = CAMPUS_PROJECTS.filter((p) => p.slug !== project.slug);
    const score = (p: CampusProject) =>
      (p.degrees.some((d) => project.degrees.includes(d)) ? 2 : 0) +
      (p.domain === project.domain ? 1 : 0);
    return [...others].sort((a, b) => score(b) - score(a)).slice(0, 3);
  })();

  const image = campusImageUrl(project);
  const provider = { "@type": "Person", "@id": PERSON_ID, name: PERSON.name };

  // Modeled as a Service, not Product/Course. Those are Google rich-result
  // types whose recommended review/aggregateRating fields we cannot fill
  // honestly (no fabricated ratings — the site's whole thesis), so they emit
  // permanent "missing field" warnings in Search Console. Service has no rich
  // result to validate, so it produces ZERO GSC issues while still exposing the
  // full offer/price data to answer engines and the sitewide FYP Service node.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Final year project development and viva mentoring",
    name: project.title,
    description: project.summary,
    category: project.domain,
    url: campusUrl(project.slug),
    image: [image],
    provider,
    areaServed: { "@type": "Country", name: "India" },
    audience: { "@type": "EducationalAudience", educationalRole: "student" },
    offers: tiers.map((tier) => ({
      "@type": "Offer",
      name: `${project.title} — ${tier.name}`,
      price: tier.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${campusUrl(project.slug)}#enquire`,
      seller: provider,
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        maxValue: project.seatsPerCollege,
        unitText: "students per college per academic year",
      },
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 pb-32 md:pb-12">
      <JsonLd
        data={[
          serviceJsonLd,
          faqPageJsonLd(CAMPUS_FAQ),
          breadcrumbJsonLd([
            { name: "Final Year Projects", path: "/final-year-projects" },
            { name: project.title, path: `/final-year-projects/${project.slug}` },
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
          {project.category}
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-300">{project.tagline}</p>
        <p className="mt-5 max-w-2xl leading-relaxed text-zinc-400">{project.summary}</p>

        <dl className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Suits
            </dt>
            <dd className="mt-1.5 flex flex-wrap gap-x-1.5 text-sm text-zinc-200">
              {project.degrees.map((d, i) => (
                <span key={d}>
                  <Link
                    href={`/final-year-projects/for/${DEGREE_SLUGS[d]}`}
                    className="underline-offset-4 hover:text-cyan hover:underline"
                  >
                    {d}
                  </Link>
                  {i < project.degrees.length - 1 && (
                    <span className="text-zinc-600"> ·</span>
                  )}
                </span>
              ))}
            </dd>
          </div>
          <Meta label="Level" value={project.difficulty} />
          <Meta label="Live sessions" value={`${project.sessionCount}`} />
          <Meta
            label="Seats per college"
            value={`${project.seatsPerCollege} / year`}
          />
        </dl>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#enquire"
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Enquire about this project
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 px-6 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
            >
              See it running →
            </a>
          )}
        </div>
      </header>

      <section className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-50">
            What it does
          </h2>
          <ul className="mt-5 space-y-3">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ice" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-50">
            What the sessions cover
          </h2>
          <ol className="mt-5 space-y-3">
            {project.modules.map((m, i) => (
              <li key={m} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                <span className="shrink-0 font-mono text-xs text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {m}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-50">Stack</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          Pick what you need
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          {PAYMENT_POLICY.method} in monthly installments. Sessions start{" "}
          {PAYMENT_POLICY.sessionsStart.toLowerCase()}; handover is{" "}
          {PAYMENT_POLICY.handover.toLowerCase()}. Full{" "}
          <Link
            href="/final-year-projects/terms/"
            className="text-cyan underline-offset-4 hover:underline"
          >
            terms
          </Link>{" "}
          — including what happens if you stop midway.
        </p>
        <div className="mt-8">
          <TierTable tiers={tiers} />
        </div>
        <div className="mt-10">
          <EarlyBirdBand />
        </div>
      </section>

      <div className="mt-20">
        <TrustStrip />
      </div>

      <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-zinc-50">
          Two things I hold myself to
        </h2>
        <ul className="mt-5 space-y-4">
          <li className="text-sm leading-relaxed text-zinc-400">
            <span className="text-zinc-200">
              Only {project.seatsPerCollege} students from your college get this
              project in an academic year.
            </span>{" "}
            On the Mentored tier one module is varied for you — the dataset, the
            domain, or a feature — so no two submissions read the same.
          </li>
          <li className="text-sm leading-relaxed text-zinc-400">
            <span className="text-zinc-200">
              You build nothing. You just have to be able to explain it.
            </span>{" "}
            The project is delivered finished — code, report, diagrams, deployed.
            Then {SESSION_POLICY.cadence.toLowerCase()}{" "}
            {SESSION_POLICY.durationMinutes}-minute sessions on{" "}
            {SESSION_POLICY.platform} after {SESSION_POLICY.startsAfter}, walking the
            code you are submitting, ending in a mock viva. Turn up and you will know
            it well enough to answer anything the panel asks.
          </li>
        </ul>
      </section>

      <div className="mt-16">
        <CampusLeadForm
          projectTitle={project.title}
          tiers={tiers}
          heading="Enquire about this project"
          intro="Tell me your submission deadline and which tier fits. You get a session schedule and an installment split back — usually within a day."
          messageLabel="Your deadline + anything your college mandates"
          messagePlaceholder="Submission date, any stack your department requires, and what you want varied…"
        />
      </div>

      {relatedProjects.length > 0 && (
        <nav aria-label="Related projects" className="mt-20">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-50">
            Other projects like this
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {relatedProjects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/final-year-projects/${p.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors duration-200 hover:border-cyan/40"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                    {p.category}
                  </span>
                  <span className="mt-2 text-sm font-medium text-zinc-100">
                    {p.title}
                  </span>
                  <span className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                    {p.tagline}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="mt-20">
        <CampusFaq items={CAMPUS_FAQ} />
      </div>

      <StickyActionBar context={project.title} />
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm text-zinc-200">{value}</dd>
    </div>
  );
}
