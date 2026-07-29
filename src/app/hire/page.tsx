import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, PERSON, RESUME_URL } from "@/lib/site";
import { PERSON_ID, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";

const URL = `${SITE_URL}/hire/`;
const DESCRIPTION =
  "Hire Yaseen Khatib — a Senior Full-Stack AI Engineer (MERN + TypeScript) who ships production AI systems solo: agentic RAG, LLM orchestration, real-time and edge architectures. Open to senior/lead roles and contract work, remote or on-site.";

export const metadata: Metadata = {
  title: "Hire a Senior Full-Stack AI Engineer",
  description: DESCRIPTION,
  keywords: [
    "hire full-stack AI engineer",
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
    title: "Hire Yaseen Khatib — Senior Full-Stack AI Engineer",
    description: DESCRIPTION,
    url: URL,
    siteName: "Yaseen Khatib",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Full-Stack AI Engineering — Yaseen Khatib",
  serviceType: "Full-stack AI engineering, RAG & LLM systems, MERN development",
  description: DESCRIPTION,
  provider: { "@type": "Person", "@id": PERSON_ID, name: PERSON.name },
  areaServed: "Worldwide (remote), or on-site in India",
  audience: {
    "@type": "Audience",
    audienceType: "Startups, product teams, and engineering managers",
  },
  url: URL,
};

const BUILDS: [string, string][] = [
  ["Agentic RAG systems", "Retrieval that grounds and cites — hybrid search, reranking, guardrails, and the eval loop that proves it works."],
  ["LLM orchestration & agents", "Reason → act → observe loops, tool use, memory, and the safety boundaries that make a probabilistic model production-safe."],
  ["Full-stack MERN apps", "React, Node, TypeScript, MongoDB — from schema to deployment, built to hold up under real users, not a demo."],
  ["Real-time & edge", "WebSockets, streaming, and serverless on Cloudflare Workers + Hono — low-latency systems that scale past one process."],
  ["On-device & local-first AI", "Private, offline-capable AI where the data never leaves the device — SQLite, function calling, local retrieval."],
  ["FinOps & performance", "Token-cost governance, caching, and serialization work — including a 94% payload cut on a real workflow engine."],
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
        ]}
      />

      <header className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-1.5 text-xs font-medium text-emerald-300">
          Open to work · remote / hybrid / on-site
        </span>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-50 sm:text-5xl">
          Hire a senior full-stack AI engineer
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          I&apos;m {PERSON.name} — five years building for the web end to end,
          the last few wiring that into production AI. I ship complete systems
          solo: five products in the last twelve months, from a Rust desktop app
          to autonomous pipelines. Everything on this site actually runs.
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
          <Link href="/products/sable" className="text-cyan underline-offset-4 hover:underline">
            Sable
          </Link>{" "}
          (a local-first AI finance agent that keeps 100% of data on-device),{" "}
          <Link href="/products/streameros" className="text-cyan underline-offset-4 hover:underline">
            streamerOS
          </Link>{" "}
          (a Rust desktop cockpit plus a serverless RAG support agent on the
          edge), and the{" "}
          <Link
            href="/blog/the-94-percent-decision-integratex"
            className="text-cyan underline-offset-4 hover:underline"
          >
            94% payload cut on IntegrateX
          </Link>
          . Or browse{" "}
          <Link href="/products" className="text-cyan underline-offset-4 hover:underline">
            every product
          </Link>{" "}
          and{" "}
          <Link href="/blog" className="text-cyan underline-offset-4 hover:underline">
            the writing
          </Link>{" "}
          behind the decisions.
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

      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
