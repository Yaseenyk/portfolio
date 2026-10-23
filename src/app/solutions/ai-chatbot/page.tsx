import { seoDescription } from "@/lib/seoText";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd, personRef, type FaqItem } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import SolutionsLeadForm from "@/components/solutions/SolutionsLeadForm";

const URL = `${SITE_URL}/solutions/ai-chatbot/`;

const DESCRIPTION =
  "A RAG chatbot trained on your company documents — on your website or WhatsApp — that answers with citations and refuses to guess. From $800; AI-integrated CRM from $2,000; $15–$30/hour for smaller work.";

// Prices are the owner's own, stated as starting points for a standard scope.
// Deeper integration into existing systems is quoted on /solutions/business/.
const OFFERS = [
  {
    name: "RAG chatbot on your documents",
    from: 800,
    best: "Answer questions from your PDFs, policies, product docs or knowledge base — on your website, WhatsApp, or both.",
    includes: [
      "Ingestion of your documents into a vector index",
      "Answers that cite the passage they came from",
      "A refusal path when nothing relevant is found, instead of a guess",
      "Website chat widget, WhatsApp Business API, or both",
      "Source code and deployment you own",
    ],
  },
  {
    name: "AI-integrated CRM",
    from: 2000,
    best: "A CRM built around how you sell, with AI doing the repetitive parts: summarising conversations, drafting replies, flagging leads that went cold.",
    includes: [
      "Contacts, pipeline and follow-ups modelled on your process",
      "AI summaries and draft replies, reviewed by a person before sending",
      "WhatsApp and email conversations in one place",
      "Role-based access for your team",
      "Source code and deployment you own",
    ],
  },
] as const;

const FAQ: FaqItem[] = [
  {
    question: "How much does a RAG chatbot cost?",
    answer:
      "A RAG chatbot trained on your own documents starts at $800 for a standard scope: your documents indexed, cited answers, a refusal path, and a website or WhatsApp channel. The fixed price is agreed in writing before work starts. Running costs (model usage and hosting) are estimated up front, because they are what surprises people later.",
  },
  {
    question: "Can an AI chatbot be trained on my company documents?",
    answer:
      "Yes. Strictly it is not retrained: your documents are split, embedded into a vector index, and the chatbot retrieves the relevant passages for each question and answers only from them. That is retrieval-augmented generation (RAG), and it is why every answer can cite its source.",
  },
  {
    question: "Will the chatbot make things up?",
    answer:
      "It answers only from what it retrieved, and when nothing relevant clears the similarity threshold it says it does not know rather than guess. You can try exactly this behaviour on the live assistant on this site, which runs on the same pattern.",
  },
  {
    question: "Can it work on WhatsApp?",
    answer:
      "Yes. WhatsApp is supported through the official WhatsApp Business Platform API, alongside or instead of a chat widget on your website. WhatsApp charges its own per-conversation fees, which are separate from the build.",
  },
  {
    question: "What does an AI-integrated CRM cost?",
    answer:
      "From $2,000 for a CRM built around your sales process, with AI summaries, draft replies a person approves, and WhatsApp and email in one place. Larger integrations into systems you already run are quoted separately.",
  },
  {
    question: "What is the hourly rate?",
    answer:
      "$15–$30 an hour for smaller pieces of work, depending on scope. Fixed-price projects are quoted as a single number before anything starts.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do. The code lives in your repository from the first commit and runs on infrastructure you control, so you can maintain it yourself or hire anyone else to.",
  },
];

export const metadata: Metadata = {
  title: "RAG Chatbot for Your Documents, From $800",
  description: seoDescription(DESCRIPTION),
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    title: "RAG Chatbot Trained on Your Documents | Yaseen Khatib",
    description: seoDescription(DESCRIPTION),
    url: URL,
    siteName: "Yaseen Khatib",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI chatbot and CRM services",
  itemListElement: OFFERS.map((o, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: o.name,
      description: o.best,
      provider: personRef,
      areaServed: ["India", "Worldwide"],
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        priceSpecification: { "@type": "PriceSpecification", minPrice: o.from, priceCurrency: "USD" },
      },
    },
  })),
};

export default function AiChatbotPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd
        data={[
          serviceJsonLd,
          faqPageJsonLd(FAQ),
          breadcrumbJsonLd([
            { name: "Solutions", path: "/solutions" },
            { name: "AI Chatbot", path: "/solutions/ai-chatbot" },
          ]),
        ]}
      />

      <Link
        href="/solutions/"
        className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan"
      >
        ← Solutions
      </Link>

      <header className="mt-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          RAG chatbot trained on your company documents · website &amp; WhatsApp
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          A chatbot that answers from your documents, and admits when it can&apos;t.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
          Your policies, product manuals and FAQs, answerable on your website or
          on WhatsApp. Every answer cites the passage it came from. When the
          documents don&apos;t cover a question, it says so instead of guessing —
          which is the part most chatbot demos skip.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#enquire"
            className="rounded-lg bg-cyan px-6 py-3 text-sm font-semibold text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)]"
          >
            Get a fixed quote
          </a>
          <Link
            href="/#rag-concierge"
            className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-ice/60 hover:text-ice"
          >
            Try the live one on this site →
          </Link>
        </div>
      </header>

      <section className="mt-16 rounded-2xl border border-cyan/30 bg-cyan/[0.04] p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-50">See it before you pay for it</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-zinc-400">
          The assistant on this site&apos;s home page is a RAG chatbot built the way
          yours would be: it answers questions about my work from an index of every
          article here, shows where each answer came from, and refuses questions its
          sources don&apos;t cover. Ask it something it can&apos;t know and watch it
          decline. The same index is also published as an MCP server, so it can be
          queried from inside Claude.
        </p>
        <Link href="/#rag-concierge" className="mt-4 inline-block text-sm text-ice underline-offset-4 hover:underline">
          Open the live assistant →
        </Link>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">What it costs</h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Starting prices for a standard scope. The final number is fixed in writing
          before work starts.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {OFFERS.map((o) => (
            <article key={o.name} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-lg font-semibold text-zinc-50">{o.name}</h3>
              <p className="mt-2 font-mono text-3xl tabular-nums text-zinc-50">
                from ${o.from.toLocaleString("en-US")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{o.best}</p>
              <ul className="mt-5 space-y-2">
                {o.includes.map((x) => (
                  <li key={x} className="flex gap-2.5 text-sm text-zinc-400">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ice" />
                    {x}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          Smaller pieces of work: <span className="text-zinc-300">$15–$30 an hour</span>.
          Wiring AI into systems you already run (ERP, internal tools) is scoped and
          priced on the{" "}
          <Link href="/solutions/business/#ai-integration" className="text-ice underline-offset-4 hover:underline">
            business services page
          </Link>
          .
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">How it works</h2>
        <ol className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Your documents", "PDFs, Word files, web pages or a knowledge base are split into passages and embedded into a vector index."],
            ["02", "Retrieval", "Each question is matched to the most relevant passages. Below a similarity threshold, nothing is passed on."],
            ["03", "A grounded answer", "The model answers only from those passages and cites them. No passages, no answer — it says it doesn't know."],
            ["04", "Your channel", "A chat widget on your site, a WhatsApp number through the WhatsApp Business API, or both."],
          ].map(([n, t, b]) => (
            <li key={n} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <span className="font-mono text-xs text-cyan">{n}</span>
              <h3 className="mt-3 text-base font-medium text-zinc-50">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{b}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">Questions people ask</h2>
        <div className="mt-6 space-y-3">
          {FAQ.map((f) => (
            <details key={f.question} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <summary className="cursor-pointer list-none font-medium text-zinc-100">{f.question}</summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-20">
        <SolutionsLeadForm
          heading="Get a fixed quote"
          intro="Tell me what documents the chatbot should answer from and where people should reach it. You'll get a fixed price and an estimate of the monthly running cost."
          messageLabel="What should it answer, and where"
          messagePlaceholder="The documents (how many, what format), who will ask questions, and whether it should live on your website, WhatsApp, or both…"
          defaultInterest="AI integration into existing systems"
        />
      </div>
    </div>
  );
}
