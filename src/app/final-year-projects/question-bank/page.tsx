import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { VIVA_QUESTIONS } from "@/lib/vivaQuestions";
import { breadcrumbJsonLd, faqPageJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import VivaBank from "@/components/campus/VivaBank";
import StickyActionBar from "@/components/campus/StickyActionBar";

const COUNT = VIVA_QUESTIONS.length;

const DESCRIPTION = `${COUNT} real final year project viva questions, filterable by category and project type, each showing what the examiner is actually testing. Tick them off as you prepare — your progress is saved in the browser.`;

export const metadata: Metadata = {
  title: `${COUNT} Final Year Project Viva Questions — Filterable Question Bank`,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/final-year-projects/question-bank/` },
  openGraph: {
    type: "website",
    title: "Final Year Project Viva Question Bank",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/question-bank/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/question-bank.jpg`],
  },
};

const FAQ = [
  {
    question: "How many questions are asked in a project viva?",
    answer:
      "Usually between eight and twenty, depending on how the first few go. A confident, specific answer early tends to shorten the viva; a vague one invites the panel to keep digging until they find what you do not know.",
  },
  {
    question: "What is the hardest kind of viva question?",
    answer:
      "Not the technical ones. It is the failure-handling questions — what happens with two simultaneous users, bad input, or the network dropping — because almost every student prepares features and nobody prepares failure.",
  },
  {
    question: "Do examiners ask how much of the project you built yourself?",
    answer:
      "Yes, more often than students expect, and usually late in the viva when they have already formed a view. Prepare an honest answer. Panels respond far better to a student who says what they used and what they wrote than to one who claims everything.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Final Year Project Viva Question Bank",
  description: DESCRIPTION,
  url: `${SITE_URL}/final-year-projects/question-bank/`,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  author: personRef,
  offers: { "@type": "Offer", price: 0, priceCurrency: "INR" },
};

export default function QuestionBankPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 pb-32 md:pb-12">
      <JsonLd
        data={[
          jsonLd,
          faqPageJsonLd(FAQ),
          breadcrumbJsonLd([
            { name: "Final Year Projects", path: "/final-year-projects" },
            { name: "Viva Question Bank", path: "/final-year-projects/question-bank" },
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
          ~/question-bank
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          {COUNT} questions your panel might ask
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          Filter to your project type, then work through them. Each one shows what
          the examiner is actually testing, because the follow-up question is always
          aimed at that rather than at what they literally asked.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-500">
          Tick a question once you can answer it out loud, in full sentences,
          without notes. Progress is saved in your browser — nothing is uploaded and
          there is no signup.
        </p>
      </header>

      <div className="mt-12">
        <VivaBank />
      </div>

      <section className="mt-20 border-t border-white/5 pt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          How to use this properly
        </h2>
        <ol className="mt-6 space-y-4">
          {[
            "Filter to your project type and read every question first, without answering. Notice which ones make you uncomfortable — those are the real list.",
            "Answer out loud, not in your head. The gap between knowing and being able to say it is where vivas are lost.",
            "Anything you cannot answer is a task, not a worry. Either fix the code or prepare an honest explanation of the limitation.",
            "Get someone who understands code to ask you the ones you ticked. Self-marking is generous.",
          ].map((step, i) => (
            <li key={step} className="flex gap-4">
              <span className="font-mono text-xs text-cyan">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-zinc-400">{step}</span>
            </li>
          ))}
        </ol>
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
          Stuck on more than a few of these?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          That is normal, and it is fixable while there is still time. Every project
          here is built for you and then walked through line by line in daily
          sessions, ending in a mock viva using exactly these questions.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/final-year-projects"
            className="rounded-xl bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            See the projects
          </Link>
          <Link
            href="/final-year-projects/guides/final-year-project-viva-questions"
            className="rounded-xl border border-white/10 px-6 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            How vivas actually work
          </Link>
        </div>
      </section>

      <StickyActionBar />
    </div>
  );
}
