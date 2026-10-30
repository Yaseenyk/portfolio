import { seoDescription } from "@/lib/seoText";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, faqPageJsonLd, personRef, type FaqItem } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import SolutionsLeadForm from "@/components/solutions/SolutionsLeadForm";

const URL = `${SITE_URL}/solutions/ai-agents/`;

const DESCRIPTION =
  "Custom AI agent development services: agents that read your data, propose actions, and let a person confirm before anything is written. Built on the propose-and-confirm pattern from Sable and the grounded RAG agent that runs on this site. Fixed price, you own the code.";

// Everything here is drawn from systems that are live and documented on this
// site: Sable (products/sable), the concierge worker (worker/README.md) and
// the operating model in /blog/one-architect-claude-mcp-full-squad/.
const PATTERNS = [
  {
    name: "Propose, then confirm",
    body: "The model never writes to your records directly. Every action it wants to take is rendered as a dry run a person approves or dismisses. A wrong answer costs one dismissed card, not a corrupted ledger. This is how Sable handles money.",
    href: "/blog/sable-ai-agent-never-touches-money/",
    link: "How Sable keeps the model away from money",
  },
  {
    name: "Grounded, with a refusal path",
    body: "The agent answers only from passages it retrieved from your documents, cites them, and declines when nothing relevant clears the similarity threshold. The assistant on this site runs exactly this way on a Cloudflare Worker.",
    href: "/#rag-concierge",
    link: "Try the live agent on this site",
  },
  {
    name: "Tools through MCP, read-only first",
    body: "Agents get governed access to your systems through Model Context Protocol servers. Read access ships first, write access only behind the confirm step, and every call is logged. This site publishes its own MCP server you can connect to from Claude.",
    href: "/blog/one-architect-claude-mcp-full-squad/",
    link: "The operating model, with a 30-day plan",
  },
  {
    name: "Local-first when the data cannot leave",
    body: "Where privacy is the requirement, the agent runs against on-device SQLite with no cloud backend at all. Privacy becomes a property of the architecture rather than a promise in a policy.",
    href: "/products/sable/",
    link: "Sable, the local-first finance agent",
  },
] as const;

const USE_CASES: [string, string][] = [
  ["Support and sales agents", "Answer from your documents on your website or WhatsApp, hand off to a person with the full context, and draft replies a human sends."],
  ["Back-office agents", "Read invoices, tickets or forms, propose the next action in your CRM or ERP, and wait for the click that commits it."],
  ["Research and reporting agents", "Pull from your database and documents on a schedule and produce a briefing, the way Sable's morning briefing works, with every number traceable."],
  ["Internal copilots over your systems", "An MCP server over your Postgres, Git or admin tools so your team can ask questions and run approved actions from inside the AI they already use."],
];

const FAQ: FaqItem[] = [
  {
    question: "What does custom AI agent development cost?",
    answer:
      "It is quoted as a fixed price after a short scoping call, because the cost depends almost entirely on how many systems the agent has to read and write and how much of that needs the confirm step. Smaller pieces of work are $15 to $30 an hour. A document-answering agent on its own starts at $800 on the AI chatbot page.",
  },
  {
    question: "Will the agent take actions on its own?",
    answer:
      "Only the ones you have approved it to take without review, and the default is none. Everything else is proposed and waits for a person. That boundary is in the code, not in a prompt, so it holds even when the model is wrong.",
  },
  {
    question: "Which models and platforms do you use?",
    answer:
      "Whichever fit the job and your constraints. The agents on this site run on Cloudflare Workers with Workers AI and Vectorize; Sable runs a model against local SQLite with no backend. Claude, OpenAI and local models through Ollama are all options, and the architecture does not lock you to one.",
  },
  {
    question: "Can an agent work inside Claude or ChatGPT instead of a separate app?",
    answer:
      "Yes. An MCP server exposes your data and approved actions as tools, and your team connects it from Claude or any MCP-capable client. This site's own MCP server is live and documented, so you can see the pattern before paying for one.",
  },
  {
    question: "What are the running costs?",
    answer:
      "Model usage and hosting, estimated before work starts, because that is what surprises people later. The edge stack used here has a generous free tier; a local-first agent has almost none.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do. The code is in your repository from the first commit and runs on infrastructure you control, so you can maintain it yourself or hire anyone else to.",
  },
];

export const metadata: Metadata = {
  title: "Custom AI Agent Development Services, Fixed Price",
  description: seoDescription(DESCRIPTION),
  keywords: [
    "custom ai agent development services",
    "ai agent development",
    "ai agent developer",
    "mcp server development",
    "agentic rag",
    "generative ai development services",
  ],
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    title: "Custom AI Agent Development | Yaseen Khatib",
    description: seoDescription(DESCRIPTION),
    url: URL,
    siteName: "Yaseen Khatib",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom AI agent development",
  serviceType: "AI agent development, agentic RAG, MCP server development",
  description: seoDescription(DESCRIPTION),
  provider: personRef,
  areaServed: ["India", "Worldwide"],
  url: URL,
};

export default function AiAgentsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd
        data={[
          serviceJsonLd,
          faqPageJsonLd(FAQ),
          breadcrumbJsonLd([
            { name: "Solutions", path: "/solutions" },
            { name: "AI Agents", path: "/solutions/ai-agents" },
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
          Custom AI agent development services · fixed price · you own the code
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          AI agents that propose, and people who confirm.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
          An agent that reads your documents and systems, works out the next
          step, and shows it to a person before anything is written. That one
          boundary is what separates an agent you can run in production from a
          demo that looked good once.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#enquire"
            className="rounded-lg bg-cyan px-6 py-3 text-sm font-semibold text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)]"
          >
            Scope an agent
          </a>
          <Link
            href="/#rag-concierge"
            className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-ice/60 hover:text-ice"
          >
            Try the agent on this site →
          </Link>
        </div>
      </header>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          Four patterns, all running somewhere you can inspect
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          None of this is theoretical. Each pattern below links to the live
          system or the write-up of the decisions behind it.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PATTERNS.map((p) => (
            <article key={p.name} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-lg font-semibold text-zinc-50">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.body}</p>
              <Link href={p.href} className="mt-auto pt-5 text-sm text-ice underline-offset-4 hover:underline">
                {p.link} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          What gets built
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {USE_CASES.map(([title, desc]) => (
            <li key={title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-base font-semibold text-zinc-100">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-zinc-500">
          A document-answering agent on its own is priced on the{" "}
          <Link href="/solutions/ai-chatbot/" className="text-ice underline-offset-4 hover:underline">
            AI chatbot page
          </Link>
          , from $800. Wiring agents into systems you already run is scoped on the{" "}
          <Link href="/solutions/business/#ai-integration" className="text-ice underline-offset-4 hover:underline">
            business services page
          </Link>
          .
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">How an engagement runs</h2>
        <ol className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Scope", "Which systems the agent reads, which actions it may propose, and which of those, if any, it may take without review."],
            ["02", "Read-only first", "Retrieval and MCP read access ship first, so you can watch the agent reason over real data before it can change anything."],
            ["03", "Confirm step", "Write actions arrive as review cards. The boundary lives in code and is logged, so it holds when the model is wrong."],
            ["04", "Evals and hand-over", "A test set of real questions and actions, run on every change, and the repository in your hands from the first commit."],
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
          heading="Scope an agent"
          intro="Tell me what the agent should read, what it should be allowed to propose, and which systems it touches. You'll get a fixed price and an estimate of the monthly running cost."
          messageLabel="What should the agent do"
          messagePlaceholder="The data it reads (documents, database, CRM), the actions it should propose, who approves them, and where your team wants to use it…"
          defaultInterest="AI integration into existing systems"
        />
      </div>
    </div>
  );
}
