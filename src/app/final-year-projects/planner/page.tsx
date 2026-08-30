import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import DeadlinePlanner from "@/components/campus/DeadlinePlanner";
import StickyActionBar from "@/components/campus/StickyActionBar";

const DESCRIPTION =
  "Enter your submission date and see how many weeks you actually have for your final year project, after exams and a realistic buffer — plus a week-by-week plan with dates for every phase.";

export const metadata: Metadata = {
  title: "Final Year Project Timeline Planner — How Many Weeks Do You Really Have?",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/final-year-projects/planner/` },
  openGraph: {
    type: "website",
    title: "Final Year Project Timeline Planner",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/planner/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/planner.jpg`],
  },
};

const FAQ = [
  {
    question: "How many weeks do I need for a final year project?",
    answer:
      "Between nine and sixteen usable weeks for a moderate project, where usable means after exams, breaks and a four-week buffer are removed. Most students who believe they have twenty-four weeks have around eleven once those are subtracted honestly.",
  },
  {
    question: "Why should I keep a four-week buffer?",
    answer:
      "Because guides ask for changes late, features break in the final fortnight, and the report always takes longer than planned. A buffer is not slack — it is the part of the schedule that absorbs everything nobody planned for. Projects without one submit incomplete.",
  },
  {
    question: "What if I have almost no time left?",
    answer:
      "Cut scope hard rather than working faster. Pick one core feature, build it properly, document it honestly, and declare the rest out of scope in chapter one of your report. A small project you can defend beats a large one you cannot.",
  },
];

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Final Year Project Timeline Planner",
  description: DESCRIPTION,
  url: `${SITE_URL}/final-year-projects/planner/`,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  author: personRef,
  offers: { "@type": "Offer", price: 0, priceCurrency: "INR" },
};

export default function PlannerPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 pb-32 md:pb-12">
      <JsonLd
        data={[
          toolJsonLd,
          faqPageJsonLd(FAQ),
          breadcrumbJsonLd([
            { name: "Final Year Projects", path: "/final-year-projects" },
            { name: "Timeline Planner", path: "/final-year-projects/planner" },
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
          ~/planner
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          How many weeks do you actually have?
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          Not the number on the calendar. The number left after exams, breaks, and
          the buffer you will need when your guide asks for changes in February.
          Most students are surprised, and it is better to be surprised now.
        </p>
      </header>

      <div className="mt-12">
        <DeadlinePlanner />
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Why the buffer is not negotiable
        </h2>
        <p className="mt-4 leading-relaxed text-zinc-400">
          Every final year project loses time to the same four things: a guide
          asking for a change after review, a feature that breaks the week before
          submission, the report taking twice as long as planned, and something in
          your personal life that does not care about your deadline.
        </p>
        <p className="mt-4 leading-relaxed text-zinc-400">
          Four weeks covers those. Students who plan without a buffer are not
          planning to finish early — they are planning to submit something
          incomplete, they just do not know it yet.
        </p>
      </section>

      <section className="mt-16 border-t border-white/5 pt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Common questions
        </h2>
        <dl className="mt-8 space-y-6">
          {FAQ.map((f) => (
            <div
              key={f.question}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
            >
              <dt className="font-medium text-zinc-100">{f.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-400">
                {f.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Not enough weeks?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          That is the situation this site exists for. The project gets built for you
          — code, report, diagrams, deployment — and your remaining weeks go into
          understanding it in daily sessions rather than fighting it alone.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/final-year-projects/"
            className="rounded-xl bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            See the projects
          </Link>
          <Link
            href="/final-year-projects/guides/how-to-choose-a-final-year-project/"
            className="rounded-xl border border-white/10 px-6 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            How to choose one
          </Link>
        </div>
      </section>

      <StickyActionBar />
    </div>
  );
}
