import { seoDescription } from "@/lib/seoText";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, PERSON, RESUME_ATS_URL, RESUME_URL } from "@/lib/site";
import { PERSON_ID, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";

const URL = `${SITE_URL}/hire/`;
const DESCRIPTION =
  "Hire Yaseen Khatib — a Full Stack AI Developer (MERN + TypeScript) who ships production AI systems solo: agentic RAG, LLM orchestration, real-time and edge architectures. Open to senior/lead roles and contract work, remote or on-site.";

export const metadata: Metadata = {
  title: "Hire a Full Stack AI Developer (MERN, RAG)",
  description: seoDescription(DESCRIPTION),
  keywords: [
    "hire ai engineer",
    "hire full-stack AI engineer",
    "hire rag developer",
    "senior AI engineer for hire",
    "RAG engineer for hire",
    "LLM engineer freelance",
    "MERN developer for hire",
    "AI systems architect contract",
    "Yaseen Khatib",
  ],
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    title: "Hire Yaseen Khatib — Full Stack AI Developer",
    description: seoDescription(DESCRIPTION),
    url: URL,
    siteName: "Yaseen Khatib",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Full-Stack AI Engineering — Yaseen Khatib",
  serviceType: "Full-stack AI engineering, RAG & LLM systems, MERN development",
  description: seoDescription(DESCRIPTION),
  provider: { "@type": "Person", "@id": PERSON_ID, name: PERSON.name },
  areaServed: "Worldwide (remote), or on-site in India",
  audience: {
    "@type": "Audience",
    audienceType: "Startups, product teams, and engineering managers",
  },
  url: URL,
};

const BUILDS: [string, string][] = [
  ["AI chatbots that answer from your documents", "It answers from your own files, shows where each answer came from, and says it does not know instead of guessing. Built with hybrid search, reranking, guardrails and an evaluation loop that proves it works (agentic RAG)."],
  ["AI agents that do a job for you", "An agent takes a request, uses your tools, and checks with a person before anything important changes. Reason, act, observe loops, memory and safety limits."],
  ["Web apps, from first screen to launch", "React, Node, TypeScript and MongoDB, from database design to deployment, built for real users and not a demo."],
  ["Live, real-time features", "Chat, scores and dashboards that update as things happen, on WebSockets and Cloudflare Workers, without a heavy server."],
  ["Private AI that stays on the device", "AI where the data never leaves the phone or laptop: on-device storage, function calling and local search."],
  ["Lower AI bills, faster apps", "Caching, smaller payloads and token-cost control, including a 94% payload cut on a real workflow engine."],
];

// Asked by recruiters and clients, and lifted by AI assistants. Every answer is a fact from the résumé or this site.
const FAQ: { question: string; answer: string }[] = [
  { question: "Who is Yaseen Khatib?", answer: "Yaseen Khatib is a Full Stack AI Developer based in Hyderabad, India. He has five years of experience building web products in React, Node.js, TypeScript and MongoDB, and since June 2025 he has been a Senior Software Developer at Sparity, where he builds the AI tooling layer: a hybrid RAG system with measured retrieval quality (Recall@5 0.95), a 20-tool MCP server for Claude Code and an AI pull-request review service." },
  { question: "What does he build?", answer: "Full-stack web apps on the MERN stack, and the AI inside them: chatbots that answer from a company's own documents (RAG), agents that do a job with a person approving each step, and MCP servers. His flagship products are SpotAI, FitRank and streamerOS." },
  { question: "Is he available for full-time roles?", answer: "Yes. He is open to Full Stack AI Developer roles (MERN with LLM, RAG and agents) in Hyderabad, Pune, Mumbai, Bangalore or remote India, and takes fixed-price builds." },
  { question: "Does he take freelance or contract work?", answer: "Yes. He takes fixed-price builds: the scope and price are agreed in writing before work starts, and the client owns the source code. Services and prices are on the Solutions page." },
  { question: "Where is he based, and does he work with teams abroad?", answer: "He is in Hyderabad, India (IST). Two of his three jobs were fully remote, and he works across Indian and Western hours." },
  { question: "How can I check his work before I talk to him?", answer: "Every project on the Projects page has a real screenshot and a link to the live product. The two-page CV is on this page, and the question box on the home page answers from his site and says when it does not know." },
];

const WAYS: [string, string][] = [
  ["Full-time", "Senior or lead engineer, remote / hybrid / on-site. Open now."],
  ["Contract / freelance", "A defined build or an ongoing engagement — I own it end to end."],
  ["Consulting", "Architecture reviews, RAG/agent design, or unblocking a stuck AI feature."],
];

export default function HirePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 pb-24">
      <JsonLd
        data={[
          serviceJsonLd,
          breadcrumbJsonLd([{ name: "Hire", path: "/hire" }]),
          faqPageJsonLd(FAQ),
        ]}
      />

      <header className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-1.5 text-xs font-medium text-emerald-300">
          Open to work · remote / hybrid / on-site
        </span>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-50 sm:text-5xl">
          Hire a Full Stack AI Developer
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          I&apos;m {PERSON.name}. I have five years of building web products
          from database to screen. Since 2025 I have built the AI side too:
          chatbots that answer from company documents, and agents that do work
          with a person approving each step. I have shipped several products on my
          own, and every one runs live.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded-lg bg-cyan px-6 py-3 text-sm font-semibold text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)] transition-shadow duration-300 hover:shadow-[0_0_30px_-2px_rgba(34,211,238,0.7)]"
          >
            Start a conversation
          </a>
          <a
            href={RESUME_URL}
            download="Yaseen-Khatib-Resume.pdf"
            className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors duration-300 hover:border-ice/60 hover:text-ice"
          >
            Download CV
          </a>
          <a
            href={RESUME_ATS_URL}
            download="Yaseen-Khatib-Resume-Plain.pdf"
            className="text-sm font-medium text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-ice"
          >
            Plain CV for application forms
          </a>
        </div>
      </header>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          What I build
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {BUILDS.map(([title, desc]) => (
            <div
              key={title}
              className="rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-6 backdrop-blur-md"
            >
              <h3 className="text-base font-semibold text-zinc-100">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Proof, not promises
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-zinc-400">
          This site&apos;s whole thesis is real artifacts over claims. Read the
          engineering decisions behind{" "}
          <Link href="/products/sable/" className="text-cyan underline-offset-4 hover:underline">
            Sable
          </Link>{" "}
          (a local-first AI finance agent that keeps 100% of data on-device),{" "}
          <Link href="/products/streameros/" className="text-cyan underline-offset-4 hover:underline">
            streamerOS
          </Link>{" "}
          (a Rust desktop cockpit plus a serverless RAG support agent on the
          edge), and the{" "}
          <Link
            href="/blog/94-percent-payload-reduction-react-flow/"
            className="text-cyan underline-offset-4 hover:underline"
          >
            94% payload cut on IntegrateX
          </Link>
          . Or browse{" "}
          <Link href="/products/" className="text-cyan underline-offset-4 hover:underline">
            every product
          </Link>{" "}
          and{" "}
          <Link href="/blog/" className="text-cyan underline-offset-4 hover:underline">
            the writing
          </Link>{" "}
          behind the decisions.
        </p>
      </section>

      <section className="mt-20" id="rag-developer">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Hire a RAG developer
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-zinc-400">
          Most of the AI work I am hired for is retrieval-augmented generation:
          getting a model to answer from a company&apos;s own documents, cite the
          passage it used, and refuse when the documents do not cover the
          question. The assistant on this site is that system in production. It
          runs on a Cloudflare Worker, embeds the query with Workers AI,
          retrieves from a Vectorize index of every article here, and declines
          below a confidence threshold. The same index is published as an MCP
          server, so it can be queried from inside Claude.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-zinc-400">
          If you need that built for your documents, the{" "}
          <Link href="/solutions/ai-chatbot/" className="text-cyan underline-offset-4 hover:underline">
            AI chatbot page
          </Link>{" "}
          has fixed prices. If you need an agent that also acts on your systems
          behind a human confirm step, see{" "}
          <Link href="/solutions/ai-agents/" className="text-cyan underline-offset-4 hover:underline">
            custom AI agents
          </Link>
          . The design decisions are written up in{" "}
          <Link href="/blog/semantic-caching-edge-rag/" className="text-cyan underline-offset-4 hover:underline">
            semantic caching for edge RAG
          </Link>{" "}
          and{" "}
          <Link href="/blog/llm-observability-opentelemetry-tracing/" className="text-cyan underline-offset-4 hover:underline">
            LLM observability with OpenTelemetry
          </Link>
          .
        </p>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          How I work
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            ["Solo, end to end", "Schema to deployment — no hand-offs, no coordination tax. You get one person who owns the whole system."],
            ["Production-first", "Built for real users and real failure modes, not a happy-path demo. Guardrails, tests, and honest limits."],
            ["Fast, AI-native", "An AI-augmented workflow that ships in days what used to take weeks — without cutting the corners that matter."],
            ["Honest by default", "No fabricated metrics or vanity claims. If a number is here, it&apos;s real — that&apos;s the whole point of this site."],
          ].map(([title, desc]) => (
            <li
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <h3 className="text-base font-semibold text-zinc-100">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Ways to work together
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {WAYS.map(([title, desc]) => (
            <div key={title} className="bg-ink p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          Based in Hyderabad, India (IST) — comfortable remote, hybrid, or
          on-site, and effective across global time zones.
        </p>
      </section>

      <section className="mt-20" aria-labelledby="hire-faq">
        <h2 id="hire-faq" className="text-2xl font-semibold tracking-tight text-zinc-50">Quick answers</h2>
        <dl className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {FAQ.map((f) => (
            <div key={f.question} className="border-t border-white/10 pt-5">
              <dt className="text-base font-semibold text-zinc-100">{f.question}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-zinc-400">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
