import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { CAMPUS_PROJECTS, SESSION_POLICY } from "@/lib/campus";
import { breadcrumbJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import CampusLeadForm from "@/components/campus/CampusLeadForm";
import TrustStrip from "@/components/campus/TrustStrip";

const DESCRIPTION =
  "For HODs and placement cells: a free workshop for your final year students, batch mentoring, and distinct projects across a cohort so no two submissions collide. Run by a working Senior Full-Stack AI Engineer.";

export const metadata: Metadata = {
  title: "For Colleges — Final Year Project Mentoring for a Whole Batch",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/final-year-projects/colleges/` },
  openGraph: {
    type: "website",
    title: "For Colleges | Final Year Project Mentoring",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/colleges/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/social/colleges-wide.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Colleges | Final Year Project Mentoring",
    images: [`${SITE_URL}/social/colleges-wide.jpg`],
  },
};

const OFFERS = [
  {
    n: "01",
    title: "A free workshop for your batch",
    body: "One session, online or on campus, for your final year students: how to pick a project that survives a viva, what panels actually ask, and how to scope something they can finish. No cost, no obligation, nothing sold from the stage.",
    detail: "60–90 minutes · any batch size",
  },
  {
    n: "02",
    title: "Distinct projects across a cohort",
    body: "The problem every department has: fifteen students submit variations of the same library management system. Projects are allocated so that no two students in a batch build the same thing, and each one is scoped to the student's actual ability.",
    detail: "Allocation planned with the department",
  },
  {
    n: "03",
    title: "Batch mentoring",
    body: `Group sessions on ${SESSION_POLICY.platform} for students working on related projects, plus individual viva preparation before submission. Priced per batch rather than per student.`,
    detail: "Quoted per cohort",
  },
  {
    n: "04",
    title: "Guide and panel support",
    body: "Documentation in your college's format, review-ready checkpoints aligned to your internal review dates, and a written scope per student so guides know exactly what was external and what was not.",
    detail: "Full transparency to the department",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Final Year Project Mentoring for Colleges",
  serviceType: "Academic project mentoring, workshops and cohort supervision",
  description: DESCRIPTION,
  provider: personRef,
  areaServed: { "@type": "Country", name: "India" },
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "teacher",
    audienceType:
      "Heads of Department, project guides and placement cells at Indian colleges",
  },
};

export default function CollegesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd
        data={[
          serviceJsonLd,
          breadcrumbJsonLd([
            { name: "Final Year Projects", path: "/final-year-projects" },
            { name: "For Colleges", path: "/final-year-projects/colleges" },
          ]),
        ]}
      />

      <Link
        href="/final-year-projects"
        className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan"
      >
        ← Student page
      </Link>

      <header className="mt-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/for-colleges
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          Your batch submits fifteen versions of the same project.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
          Every department knows the pattern. Students buy something online in
          January, cannot answer for it in March, and the panel spends the viva
          establishing that nobody built anything.
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
          I work the other way round. Projects are allocated so no two students in a
          cohort build the same system, every student is taken through their own code
          until they can defend it, and the department gets a written scope of what
          was external. Openness is the point — this only works if guides know
          exactly what happened.
        </p>

        <div className="mt-8">
          <a
            href="#enquire"
            className="inline-block rounded-xl bg-gradient-to-r from-cyan to-purple px-6 py-3.5 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Book the free workshop
          </a>
        </div>
      </header>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          What is on offer
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {OFFERS.map((o) => (
            <div
              key={o.n}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <span className="font-mono text-xs text-cyan">{o.n}</span>
              <h3 className="mt-3 text-lg font-medium text-zinc-50">{o.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{o.body}</p>
              <p className="mt-auto pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                {o.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-20">
        <TrustStrip />
      </div>

      <section className="mt-20 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-zinc-50">
          Where the catalog stands today
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          {CAMPUS_PROJECTS.length} ready projects spanning AI and machine learning,
          full-stack web, computer vision and mobile — plus anything built to a
          problem statement your department sets. Each listed project is capped per
          college precisely so a cohort does not end up duplicating.
        </p>
        <Link
          href="/final-year-projects"
          className="mt-5 inline-block text-sm text-cyan underline-offset-4 hover:underline"
        >
          See the catalog →
        </Link>
      </section>

      <div className="mt-16">
        <CampusLeadForm
          heading="Talk to me about your batch"
          intro="Tell me your department, roughly how many students, and when your internal reviews fall. The workshop costs nothing and is the easiest place to start — you can decide about everything else afterwards."
          messageLabel="Department, batch size, and review dates"
          messagePlaceholder="Department and course, number of final year students, when your reviews and submission fall…"
          collegeSide
        />
      </div>
    </div>
  );
}
