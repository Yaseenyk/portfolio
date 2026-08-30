import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import TemplateGate from "@/components/campus/TemplateGate";
import StickyActionBar from "@/components/campus/StickyActionBar";

const URL = `${SITE_URL}/final-year-projects/templates/`;
const DESCRIPTION =
  "Free final year project report template and synopsis template — the exact chapter-by-chapter structure Indian colleges expect, with a prompt for what belongs in each section. Grab both, no email spam.";

export const metadata: Metadata = {
  title: "Free Final Year Project Report & Synopsis Templates",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    title: "Final Year Project Report & Synopsis Templates",
    description: DESCRIPTION,
    url: URL,
    siteName: "Yaseen Khatib",
    images: ["/og/campus/templates.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Final Year Project Report & Synopsis Templates",
    description: DESCRIPTION,
    images: ["/og/campus/templates.jpg"],
  },
};

const FAQ = [
  {
    question: "What is the standard final year project report format?",
    answer:
      "Front matter (title page, certificate, declaration, abstract, contents), then eight chapters — introduction, literature survey, system analysis, system design, implementation, testing, results, and conclusion — followed by references and appendices. The template lays out exactly what belongs in each.",
  },
  {
    question: "Are these templates really free?",
    answer:
      "Yes. Enter your name and course and both the report and synopsis templates download immediately — no payment, no email list. The editable Word versions and a project built to match are what you'd message about.",
  },
  {
    question: "Will a template alone get me good marks?",
    answer:
      "It gets the structure right, which is half the battle. The marks come from the content matching your actual code and from being able to defend it in the viva — which is exactly what the mentored build here is for.",
  },
];

const templatesJsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Final Year Project Report & Synopsis Templates",
  description: DESCRIPTION,
  url: URL,
  author: personRef,
  learningResourceType: "Template",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "Final year students in India",
  },
  isAccessibleForFree: true,
};

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 pb-32 md:pb-12">
      <JsonLd
        data={[
          templatesJsonLd,
          faqPageJsonLd(FAQ),
          breadcrumbJsonLd([
            { name: "Final Year Projects", path: "/final-year-projects" },
            { name: "Templates", path: "/final-year-projects/templates" },
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
          ~/templates
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          Report & synopsis templates, free
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          The exact structure Indian colleges expect — every chapter and section,
          with a prompt for what belongs inside. Start from a real skeleton
          instead of a blank page.
        </p>
      </header>

      <div className="mt-12">
        <TemplateGate />
      </div>

      <section className="mt-16 border-t border-white/5 pt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          What&rsquo;s inside
        </h2>
        <p className="mt-4 leading-relaxed text-zinc-400">
          The report template covers front matter, all eight chapters
          (introduction through conclusion) and back matter, with the one rule
          that decides your marks flagged throughout: the report must describe
          the code you actually submit. The synopsis template covers the ten
          sections your approval document needs, from a concrete problem
          statement to a buffered timeline. Both are plain Markdown you can paste
          straight into Word or Docs.
        </p>
        <p className="mt-4 leading-relaxed text-zinc-400">
          Prefer to skip the writing entirely? Every{" "}
          <Link
            href="/final-year-projects/"
            className="text-cyan underline-offset-4 hover:underline"
          >
            project here
          </Link>{" "}
          ships with the report, synopsis, diagrams and deck already written to
          match the code — then walked through line by line so you can defend it.
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

      <StickyActionBar />
    </div>
  );
}
