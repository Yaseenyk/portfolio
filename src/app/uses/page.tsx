import type { Metadata } from "next";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import GradientText from "@/components/GradientText";
import { SITE_URL, PERSON } from "@/lib/site";
import { PERSON_ID, personRef, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const DESCRIPTION =
  "The exact hardware, software, and AI orchestration stack Yaseen Khatib uses to architect and ship full-stack MERN applications at 10x velocity — Next.js, TypeScript, Node.js, Express, MongoDB, Redis, Claude, and Cursor.";

export const metadata: Metadata = {
  title: { absolute: "Uses | AI & MERN Development Stack" },
  description: DESCRIPTION,
  keywords: [
    "uses",
    "developer setup",
    "AI development stack",
    "MERN stack tools",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Redis",
    "Claude",
    "Cursor IDE",
    "GitHub Copilot",
  ],
  alternates: { canonical: `${SITE_URL}/uses/` },
  openGraph: {
    type: "article",
    title: "Uses | AI & MERN Development Stack",
    description: DESCRIPTION,
    url: `${SITE_URL}/uses/`,
    siteName: "Yaseen Khatib",
  },
};

interface ToolItem {
  name: string;
  desc: string;
}

interface Cluster {
  index: string;
  title: string;
  schemaType: "Product" | "SoftwareApplication";
  items: ToolItem[];
}

const CLUSTERS: Cluster[] = [
  {
    index: "01",
    title: "WORKSTATION HARDWARE",
    schemaType: "Product",
    items: [
      {
        name: '16" MacBook Pro · Apple Silicon',
        desc: "M-series primary workstation — silent, fast compiles, and all-day battery for deep architecture work.",
      },
      {
        name: 'Dual 27" 4K Displays',
        desc: "High-refresh external monitors — editor, terminal, and live preview side by side.",
      },
      {
        name: "Mechanical Keyboard",
        desc: "Tactile board tuned for long, low-fatigue coding sessions.",
      },
      {
        name: "Ergonomic Vertical Mouse",
        desc: "Wrist-neutral pointer for marathon refactors and reviews.",
      },
      {
        name: "Noise-Cancelling Headphones",
        desc: "Flow-state isolation during deep orchestration and design work.",
      },
    ],
  },
  {
    index: "02",
    title: "MERN ARCHITECTURE STACK",
    schemaType: "SoftwareApplication",
    items: [
      {
        name: "Next.js (App Router)",
        desc: "React framework of choice — server components, file-based routing, static export, first-class TypeScript.",
      },
      {
        name: "TypeScript",
        desc: "Strict end-to-end types — the contract that keeps AI-generated code safe to ship.",
      },
      {
        name: "Tailwind CSS",
        desc: "Utility-first styling and design tokens; the system AI composes new UI against.",
      },
      {
        name: "Node.js + Express",
        desc: "Service layer for REST APIs, validation middleware, and orchestration endpoints.",
      },
      {
        name: "MongoDB",
        desc: "Primary document store — flexible schemas and Atlas vector search for RAG.",
      },
      {
        name: "Redis",
        desc: "Cache rings and rate-limit insulation in front of both databases and LLM calls.",
      },
      {
        name: "Framer Motion",
        desc: "Declarative animation for high-fidelity, interactive interfaces.",
      },
    ],
  },
  {
    index: "03",
    title: "AI ORCHESTRATION CORE",
    schemaType: "SoftwareApplication",
    items: [
      {
        name: "Claude",
        desc: "Primary architectural reasoning and orchestration engine — system design, refactoring, and end-to-end generation.",
      },
      {
        name: "Cursor IDE",
        desc: "AI-native editor for codebase-aware generation, multi-file edits, and inline agentic flows.",
      },
      {
        name: "GitHub Copilot",
        desc: "Inline completion for the mechanical, line-by-line layer of implementation.",
      },
      {
        name: "Claude Code",
        desc: "Agentic CLI for terminal-driven, repository-wide engineering tasks.",
      },
    ],
  },
];

const TAKEAWAYS = [
  "An AI-orchestration-first workflow: architectural reasoning in Claude, codebase-aware generation in Cursor, and inline completion via GitHub Copilot.",
  "A strictly-typed MERN core (Next.js App Router, TypeScript, Node/Express, MongoDB, Redis) that keeps AI-generated code safe, validated, and scalable.",
  "The combination compounds into roughly 10x engineering velocity — one architect shipping the volume of an entire team.",
];

// AEO: JSON-LD mirrors exactly what is rendered on the page.
const usesJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Uses — AI & MERN Development Stack",
  description: DESCRIPTION,
  datePublished: "2026-06-06",
  dateModified: "2026-06-06",
  author: { "@id": PERSON_ID, name: PERSON.name },
  publisher: personRef,
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/uses/` },
  about: "Developer hardware, software, and AI orchestration tooling",
  mentions: CLUSTERS.flatMap((c) =>
    c.items.map((i) => ({
      "@type": c.schemaType,
      name: i.name,
      description: i.desc,
    }))
  ),
};

export default function UsesPage() {
  return (
    <>
      <JsonLd
        data={[usesJsonLd, breadcrumbJsonLd([{ name: "Uses", path: "/uses" }])]}
      />

      <GridBackground />
      <Navbar />

      <main className="pt-28">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <header>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
              ~/uses
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
              The <GradientText>Stack</GradientText>.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
              The exact hardware, software, and AI orchestration I use to
              architect and ship full-stack MERN products at AI-speed.
            </p>
          </header>

          {/* AEO: Executive Teardown */}
          <aside className="mt-10 rounded-2xl border border-cyan/30 bg-zinc-900/40 p-6 backdrop-blur-md sm:p-8">
            <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-ice shadow-[0_0_6px_1px_rgba(103,232,249,0.7)]" />
              [ EXECUTIVE TEARDOWN // TL;DR ]
            </div>
            <ul className="space-y-3">
              {TAKEAWAYS.map((point) => (
                <li key={point} className="flex gap-3 text-zinc-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ice" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* System clusters */}
          {CLUSTERS.map((cluster) => (
            <section key={cluster.index} className="mt-16">
              <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
                <span className="text-cyan">{cluster.index}</span>
                <span className="text-zinc-700">{" // "}</span>
                {cluster.title}
              </h2>

              <dl className="mt-4">
                {cluster.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col gap-2 border-b border-zinc-800/50 py-4 transition-colors duration-200 hover:border-ice/30 md:flex-row md:items-baseline"
                  >
                    <dt className="font-medium text-ice md:w-1/3 md:shrink-0">
                      {item.name}
                    </dt>
                    <dd className="text-sm leading-relaxed text-zinc-400">
                      {item.desc}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </main>

      <footer className="mx-auto max-w-4xl border-t border-zinc-800/70 px-6 py-10 text-sm text-zinc-500">
        <p>
          © {new Date().getFullYear()} Yaseen Khatib — Architected with Next.js
          &amp; Framer Motion, delivered at AI-speed.
        </p>
      </footer>
    </>
  );
}
