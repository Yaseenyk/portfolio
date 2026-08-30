import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import QuoteEstimator from "@/components/campus/QuoteEstimator";
import StickyActionBar from "@/components/campus/StickyActionBar";

const URL = `${SITE_URL}/final-year-projects/cost-estimator/`;
const DESCRIPTION =
  "How much does a final year project cost? Pick your project type, complexity and timeline for an instant honest estimate, then lock the real quote on a free call. Built for you, paid in monthly installments.";

export const metadata: Metadata = {
  title: "Final Year Project Cost — Instant Estimate",
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    title: "Final Year Project Cost Estimator",
    description: DESCRIPTION,
    url: URL,
    siteName: "Yaseen Khatib",
    images: ["/og/campus/cost-estimator.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Final Year Project Cost Estimator",
    description: DESCRIPTION,
    images: ["/og/campus/cost-estimator.jpg"],
  },
};

const FAQ = [
  {
    question: "How much does a final year project cost in India?",
    answer:
      "A ready project from the catalogue starts in the low thousands per tier; a fully custom build is quoted between the low tens of thousands depending on scope, stack and timeline. Everything is split into monthly installments, and the source code is included on every tier.",
  },
  {
    question: "Is the estimate the final price?",
    answer:
      "No — it is an honest ballpark to set expectations. The exact quote is fixed on a free 15-minute call once the scope, stack and deadline are clear, so you never pay for work that was not agreed.",
  },
  {
    question: "Why does a custom project cost more than a ₹2,000 zip online?",
    answer:
      "Because that zip is sold to hundreds of students and nobody explains it. Here the project is built for you, capped per college so it is not duplicated, and walked through line by line in live sessions so you can defend it in your viva.",
  },
];

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Final Year Project Cost Estimator",
  description: DESCRIPTION,
  url: URL,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  author: personRef,
  offers: { "@type": "Offer", price: 0, priceCurrency: "INR" },
};

export default function CostEstimatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 pb-32 md:pb-12">
      <JsonLd
        data={[
          toolJsonLd,
          faqPageJsonLd(FAQ),
          breadcrumbJsonLd([
            { name: "Final Year Projects", path: "/final-year-projects" },
            { name: "Cost Estimator", path: "/final-year-projects/cost-estimator" },
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
          ~/cost-estimator
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          What will your project cost?
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          Three taps for an honest ballpark — no email wall, no fake discount
          timer. Then lock the real number on a free call and pay it across
          monthly installments.
        </p>
      </header>

      <div className="mt-12">
        <QuoteEstimator />
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
