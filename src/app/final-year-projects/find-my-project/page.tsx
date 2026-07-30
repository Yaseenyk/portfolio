import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { CAMPUS_PROJECTS } from "@/lib/campus";
import { breadcrumbJsonLd, faqPageJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import FindMyProject, {
  type QuizProject,
} from "@/components/campus/FindMyProject";
import StickyActionBar from "@/components/campus/StickyActionBar";

const URL = `${SITE_URL}/final-year-projects/find-my-project/`;
const DESCRIPTION =
  "Answer four quick questions — your degree, the area you enjoy, the time you have, and your goal — and get the 2-3 final year projects that fit you best, each with source code and live viva prep.";

export const metadata: Metadata = {
  title: "Find Your Final Year Project — a 30-Second Match",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    title: "Find Your Final Year Project",
    description: DESCRIPTION,
    url: URL,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/find-my-project.jpg`],
  },
};

const FAQ = [
  {
    question: "How does this pick a project for me?",
    answer:
      "It matches four things against the real catalogue: your degree, the area you enjoy (AI/ML, web, mobile), the weeks you actually have, and whether you are optimising for marks, a job, or higher study. It then shows the closest two or three fits — not a random list.",
  },
  {
    question: "What if none of the suggestions feel right?",
    answer:
      "Every listed project can be varied to your own problem statement, and anything not in the catalogue can be built from scratch through the custom-build form. The suggestions are a starting point, not a limit.",
  },
  {
    question: "Is the tool free, and what do the projects cost?",
    answer:
      "The tool is free. Each project is quoted in tiers on its own page — source code on every tier, with the mentored tier adding daily live sessions that walk the code line by line for your viva.",
  },
];

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Find Your Final Year Project",
  description: DESCRIPTION,
  url: URL,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  author: personRef,
  offers: { "@type": "Offer", price: 0, priceCurrency: "INR" },
};

export default function FindMyProjectPage() {
  // Map to lean props — keep the full catalogue objects off the client bundle.
  const projects: QuizProject[] = CAMPUS_PROJECTS.map((p) => ({
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
    category: p.category,
    degrees: p.degrees,
    domain: p.domain,
    difficulty: p.difficulty,
  }));

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 pb-32 md:pb-12">
      <JsonLd
        data={[
          toolJsonLd,
          faqPageJsonLd(FAQ),
          breadcrumbJsonLd([
            { name: "Final Year Projects", path: "/final-year-projects" },
            { name: "Find My Project", path: "/final-year-projects/find-my-project" },
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
          ~/find-my-project
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          Which final year project fits you?
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          Four questions, thirty seconds. You get the two or three projects that
          actually match your degree, your interest, and the time you have left —
          each one buildable, defensible in a viva, and shipped with its source.
        </p>
      </header>

      <div className="mt-12">
        <FindMyProject projects={projects} />
      </div>

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

      <StickyActionBar />
    </div>
  );
}
