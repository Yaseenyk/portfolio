import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { PAYMENT_POLICY, SESSION_POLICY } from "@/lib/campus";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const DESCRIPTION =
  "Terms for final year projects: what you receive, how installments and delivery milestones work, session commitments, cancellation, and how the work is licensed to you.";

export const metadata: Metadata = {
  title: "Terms — Final Year Projects",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/final-year-projects/terms/` },
  openGraph: {
    type: "website",
    title: "Terms — Final Year Projects | Yaseen Khatib",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/terms/`,
    siteName: "Yaseen Khatib",
  },
};

interface Clause {
  heading: string;
  paragraphs: string[];
}

const CLAUSES: Clause[] = [
  {
    heading: "What you receive",
    paragraphs: [
      "Every tier includes the complete source code of the project, a setup guide, and seed data where the project needs it. The Academic tier adds the project report, the presentation deck, and the ER, DFD, and architecture diagrams. The Mentored tier adds live sessions, viva preparation, and one module varied specifically for you.",
      "What each tier includes is listed on the project page itself, and that listing is the agreement. If something is not written there, it is not included — ask before paying rather than after.",
    ],
  },
  {
    heading: "Payment and installments",
    paragraphs: [
      `Payment is direct — ${PAYMENT_POLICY.method.toLowerCase()}. There is no payment gateway, no checkout on this site, and no subscription. You will never be asked for card details, UPI PIN, OTP, or any login credential. Anyone asking for those in my name is not me.`,
      "The total for your tier is split into monthly installments, agreed in writing over email or WhatsApp before any money moves. The split is fixed once agreed; the price does not change midway.",
      "Every payment is acknowledged in writing. Keep that acknowledgement — it is your record.",
    ],
  },
  {
    heading: "Delivery milestones",
    paragraphs: [
      `Sessions begin ${PAYMENT_POLICY.sessionsStart.toLowerCase()}. Complete source, report, deck, and the deployment walkthrough are handed over ${PAYMENT_POLICY.handover.toLowerCase()}.`,
      "Work in progress is visible throughout — you see the code during sessions from the first one, so you are never paying against something you have not seen.",
    ],
  },
  {
    heading: "Sessions",
    paragraphs: [
      `Sessions run live on ${SESSION_POLICY.platform}, ${SESSION_POLICY.cadence.toLowerCase()}, starting after ${SESSION_POLICY.startsAfter}, and run about ${SESSION_POLICY.durationMinutes} minutes each. The number of sessions included is stated on each project page.`,
      "If you cannot attend on a given day, tell me in advance and the session is rescheduled at no cost. If I cannot attend, the session is rescheduled and does not count against your total. Sessions missed without notice are counted as used.",
      "Session slots are limited by the hours available in an evening. A slot is confirmed only once the first installment clears.",
    ],
  },
  {
    heading: "Cancellation",
    paragraphs: [
      "You can stop at any point between installments. You keep everything delivered up to that point and owe nothing further. Installments already paid cover work already done and sessions already held, so they are not refunded.",
      "If I fail to deliver what the project page promised, your remaining installments are cancelled, you keep everything delivered, and the last installment paid is returned.",
    ],
  },
  {
    heading: "How many students get the same project",
    paragraphs: [
      "Each listing states how many students from one college may buy it in one academic year. That cap is real and I hold to it — if the cap for your college is already filled, you will be told so before you pay, not after.",
      "On the Mentored tier one module is varied for you — the dataset, the domain, or a feature — so two submissions of the same listing do not read the same.",
    ],
  },
  {
    heading: "What this is, and what it is not",
    paragraphs: [
      "This is a source licence plus mentorship. You are buying working code and the understanding to defend it. The sessions exist so that you can explain every line you submit, and they end in a mock viva for exactly that reason.",
      "It is your responsibility to comply with your college's rules on external assistance, and to disclose it where your institution requires disclosure. The marks are yours to earn — I do not sit your viva, write your exam, or contact your college on your behalf.",
    ],
  },
  {
    heading: "Licence and ownership",
    paragraphs: [
      "On full payment you receive a perpetual licence to use, modify, and submit the delivered code as your academic project, and to show it in your portfolio or to an employer afterwards.",
      "You may not resell, redistribute, or sublicense the source to other students. Doing so is what causes duplicate submissions to surface at a college, and it is the one thing that ends the arrangement immediately, with no refund.",
    ],
  },
  {
    heading: "Support window",
    paragraphs: [
      "WhatsApp support on the Mentored tier runs until your submission date, agreed at the start. Setup and run issues on any tier are fixed at no charge — if the code does not run on your machine, that is mine to solve.",
      "New features requested after handover are a new scope and are quoted separately.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "Terms", path: "/final-year-projects/terms" },
        ])}
      />

      <Link
        href="/final-year-projects"
        className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan"
      >
        ← All projects
      </Link>

      <header className="mt-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/final-year-projects/terms
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Terms
        </h1>
        <p className="mt-5 leading-relaxed text-zinc-400">
          Plain terms, written so you know what you are paying for before you pay.
          Anything agreed over email or WhatsApp that differs from this page —
          a different installment split, a different session count — holds, as long
          as it is in writing.
        </p>
      </header>

      <div className="mt-14 space-y-12">
        {CLAUSES.map((clause, i) => (
          <section key={clause.heading}>
            <h2 className="flex gap-3 text-xl font-semibold tracking-tight text-zinc-50">
              <span className="font-mono text-sm text-cyan">
                {String(i + 1).padStart(2, "0")}
              </span>
              {clause.heading}
            </h2>
            <div className="mt-4 space-y-4 pl-9">
              {clause.paragraphs.map((p) => (
                <p key={p} className="leading-relaxed text-zinc-400">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-lg font-semibold text-zinc-50">Something unclear?</h2>
        <p className="mt-3 leading-relaxed text-zinc-400">
          Ask before you pay, not after. Every question about scope, price, or
          timeline gets a written answer.
        </p>
        <Link
          href="/final-year-projects/custom"
          className="mt-5 inline-block rounded-lg border border-white/10 px-6 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
        >
          Ask a question →
        </Link>
      </section>
    </div>
  );
}
