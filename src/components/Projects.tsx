"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ComponentType } from "react";
import PulseDot from "./PulseDot";
import { GithubIcon, ExternalLinkIcon } from "./Icons";
import SystemTelemetry from "./projects/SystemTelemetry";
import NodeGraph from "./projects/NodeGraph";
import DocumentScan from "./projects/DocumentScan";
import RealtimeSync from "./projects/RealtimeSync";
import DataSorting from "./projects/DataSorting";
import TVScreen from "./projects/TVScreen";
import Untangle from "./projects/Untangle";
import ShadowDocs from "./projects/ShadowDocs";
import SupportAgentDocs from "./projects/SupportAgentDocs";
import LinkedInPipelineArt from "./products/art/LinkedInPipelineArt";
import AiBloggerArt from "./products/art/AiBloggerArt";
import SableArt from "./products/art/SableArt";

interface ProjectLink {
  href: string;
  label: string;
  icon: "github" | "external";
}

interface Project {
  name: string;
  category: string;
  description: string;
  roi?: string;
  metrics: string[];
  tech: string[];
  Animation: ComponentType;
  /** Optional expandable visual rendered below the card (e.g. ShadowDocs). */
  Supplement?: ComponentType;
  links?: ProjectLink[];
}

const PROJECTS: Project[] = [
  {
    name: "streamerOS",
    category: "Flagship · Desktop Cockpit",
    description:
      "A Rust-powered desktop cockpit for streaming professionals, engineered via modular Claude orchestrations. Handles live system telemetry feeds, multi-platform chat velocity streams, and real-time automated OBS scene synchronization.",
    metrics: ["AI-Architected", "Rust / Next.js", "Live Telemetry"],
    tech: ["Rust", "WebSockets", "Claude AI"],
    Animation: SystemTelemetry,
    links: [
      {
        href: "https://yaseenyk.github.io/streamer-os-website/",
        label: "Live demo",
        icon: "external",
      },
      {
        href: "https://github.com/Yaseenyk/streamer-os-website",
        label: "Website repo",
        icon: "github",
      },
    ],
  },
  {
    name: "streamerOS AI Support Agent",
    category: "RAG · Tier-1 Support",
    description:
      "A Tier-1 support assistant for streamerOS built on a grounded RAG architecture. A Hono router on Cloudflare Workers embeds the product knowledge base into Upstash Vector, retrieves the relevant passages per question, and streams a gemini-flash answer constrained strictly to that context — refusing anything out of scope.",
    metrics: ["Zero-Hallucination", "Edge-Streamed", "Serverless"],
    tech: ["Hono", "Cloudflare Workers", "Upstash Vector", "gemini-flash", "@ai-sdk"],
    Animation: DocumentScan,
    Supplement: SupportAgentDocs,
    links: [
      {
        href: "https://yaseenyk.github.io/streamer-os-website/",
        label: "Live demo",
        icon: "external",
      },
      {
        href: "https://github.com/Yaseenyk/streamer-os-website/tree/main/api",
        label: "Agent API source",
        icon: "github",
      },
    ],
  },
  {
    name: "Sable",
    category: "Local-First · AI Finance Agent",
    description:
      "A personal-finance agent where the AI is structurally incapable of touching the money: every record lives in on-device SQLite (no cloud backend), and the model's function calls render as Review & Confirm cards — it proposes, only a human commits. Serialized writes, offline-first, and a daily on-device briefing.",
    metrics: ["Propose/Confirm Boundary", "Zero-Cloud", "On-Device RAG"],
    tech: ["React Native", "SQLite", "Function Calling", "TypeScript"],
    Animation: SableArt,
    links: [
      {
        href: "https://github.com/Yaseenyk/sable",
        label: "Source code",
        icon: "github",
      },
    ],
  },
  {
    name: "Portfolio Concierge — RAG + MCP",
    category: "AI Infrastructure · Edge",
    description:
      "One Cloudflare Worker, two interfaces: a grounded RAG API that answers questions about my work from a Vectorize index of my 95-article corpus (refusing anything out of scope), and an MCP server — add its URL to Claude and interrogate this portfolio from inside your own AI. Corpus re-embeds automatically after every deploy.",
    metrics: ["Interview me via MCP", "Grounding Contract", "Auto-Reindexed"],
    tech: ["Cloudflare Workers", "Vectorize", "Workers AI", "MCP", "TypeScript"],
    Animation: RealtimeSync,
    links: [
      {
        href: "https://github.com/Yaseenyk/portfolio/tree/main/worker",
        label: "Worker source",
        icon: "github",
      },
    ],
  },
  {
    name: "Path Saathi LMS",
    category: "Client Delivery · EdTech",
    description:
      "A free vocational-skilling LMS (“Learning to Livelihood”) for a client sitting on a library of course videos and PDFs. The brief arrived on a Monday — an MVP sketch and a vision of what it should become — and a working platform was live on the dev environment the next day: auth, course delivery for the client's video and PDF content, self-paced learning flow. One day from vision to a URL the client could click.",
    roi: "Brief on Monday → live on dev in 1 day",
    metrics: ["1-Day Delivery", "Client Work", "Self-Paced LMS"],
    tech: ["Next.js", "React", "Tailwind", "TypeScript"],
    Animation: TVScreen,
    links: [
      {
        href: "https://devlms.pathsaathi.in/login",
        label: "Live (dev)",
        icon: "external",
      },
    ],
  },
  {
    name: "Automated LinkedIn Pipeline",
    category: "Automation · Agent",
    description:
      "A self-hosted autonomous agent that lives entirely in a GitHub repository. On a cron schedule, a GitHub Actions runner drafts a technical post with the Gemini API, publishes it, and commits its state back to the repo — no server, no subscription.",
    metrics: ["Autonomous", "Zero-Cost", "Cron-Scheduled"],
    tech: ["Python", "GitHub Actions", "Gemini API"],
    Animation: LinkedInPipelineArt,
    links: [
      {
        href: "https://github.com/Yaseenyk/linkedin-bot",
        label: "Source code",
        icon: "github",
      },
    ],
  },
  {
    name: "Zero-Cost AI Blog Writer",
    category: "Pipeline · Content",
    description:
      "A native Next.js pipeline that autonomously writes, formats, and deploys Markdown articles straight to this site. Gemini drafts the MDX, GitHub Actions commits it, and GitHub Pages ships the static export — at a steady-state cost of exactly $0.",
    metrics: ["$0 Infra", "Self-Writing", "Static Export"],
    tech: ["Next.js", "MDX", "google-genai", "GitHub Actions"],
    Animation: AiBloggerArt,
    links: [
      {
        href: "https://github.com/Yaseenyk/portfolio",
        label: "Source code",
        icon: "github",
      },
    ],
  },
  {
    name: "Police RAG Agent — POSCO Cases",
    category: "Agentic AI · RAG",
    description:
      "An autonomous agentic retrieval-augmented generation engine deployed for law enforcement workflows. Scans massive multi-format legal structures to confidently trace, evaluate, and output systematic verdict matrices directly to investigators.",
    metrics: ["Agentic AI", "Vector Retrieval", "LLM Orchestration"],
    tech: ["LLM", "Vector DB", "Prompt Orchestration", "Python"],
    Animation: DocumentScan,
  },
  {
    name: "IntegrateX",
    category: "Workflow Automation",
    description:
      "An interactive workflow-automation environment featuring responsive connectors, processing layers, and directional edge bindings. Developed a custom state Serialization Adapter architecture to optimize graph serialization over the wire.",
    roi: "Achieved 94% reduction in workflow payload size by implementing a custom Serialization Adapter pattern, drastically lowering database I/O.",
    metrics: ["94% Payload Compression", "React Flow", "Zustand"],
    tech: ["React Flow", "Zustand", "TypeScript"],
    Animation: NodeGraph,
    Supplement: ShadowDocs,
  },
  {
    name: "CMZ App — Enterprise Portal",
    category: "Enterprise · Admin Portal",
    description:
      "A scaled administrative core engine supporting thousands of active endpoints. Hardened through structured cache rings and strict role-based authorization layers for low-latency, high-availability operation.",
    metrics: [
      "25% Latency Reduction",
      "99.9% Uptime",
      "35% Error Elimination",
    ],
    tech: ["React", "TypeScript", "Node", "Redis", "JWT", "WebSockets"],
    Animation: RealtimeSync,
  },
  {
    name: "Hospital-API",
    category: "Backend · REST API",
    description:
      "A high-throughput clinical workflow orchestration platform. Optimizes lookup routines through heavily cached queries and defensive server request-validation pipes for reliable patient-doctor data flow.",
    metrics: [
      "40% Workload Reduction",
      "30% Query Optimization",
      "25% Server Response Accel",
    ],
    tech: ["Node.js", "Express", "MongoDB"],
    Animation: DataSorting,
  },
  {
    name: "Cross-Platform TV Suite",
    category: "Embedded · Smart TV",
    description:
      "Embedded native smart-television systems engineered using modular vanilla abstractions for pristine execution over limited, multi-resolution, low-spec client platforms.",
    metrics: ["30% Retention Boost", "15% Performance Tuning"],
    tech: ["React", "Vanilla JS", "Samsung", "LG", "Vizio"],
    Animation: TVScreen,
  },
  {
    name: "SANKALP",
    category: "Architecture · Refactoring",
    description:
      "Structural system architectural optimization and deep defensive codebase translation for an enterprise core application. Implemented system type-safety definitions and refactored core data channels.",
    metrics: ["System Architecture", "Deep Code Refactoring"],
    tech: ["System Design", "TypeScript", "Refactoring"],
    Animation: Untangle,
  },
];

function MetricPills({ metrics }: { metrics: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {metrics.map((m) => (
        <span
          key={m}
          className="inline-flex items-center gap-2 rounded-full border border-ice/20 bg-ice/[0.06] px-3 py-1.5 text-xs font-medium text-ice"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ice shadow-[0_0_6px_1px_rgba(103,232,249,0.7)]" />
          {m}
        </span>
      ))}
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const { Animation, Supplement } = project;
  const [showDocs, setShowDocs] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-ink/40 backdrop-blur-xl transition-all duration-300 hover:border-ice/30 hover:shadow-[0_0_44px_-12px_rgba(103,232,249,0.4)]"
    >
      <div className="grid grid-cols-1 items-center gap-12 p-8 lg:grid-cols-2 lg:p-12">
        {/* Left — content */}
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
              {project.category}
            </span>
            <PulseDot />
          </div>

          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {project.name}
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            {project.description}
          </p>

          {project.roi && (
            <div className="mt-5 flex items-start gap-2.5 rounded-md border border-emerald-500/30 bg-emerald-900/20 px-3 py-2 font-mono text-sm text-emerald-400 shadow-[0_0_24px_-8px_rgba(16,185,129,0.55)]">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_1px_rgba(16,185,129,0.8)]" />
              <span className="leading-relaxed">{project.roi}</span>
            </div>
          )}

          <div className="mt-6">
            <MetricPills metrics={project.metrics} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-zinc-800/80 px-2.5 py-1 text-[11px] text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>

          {project.links && project.links.length > 0 && (
            <div className="mt-7 flex items-center gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} — ${link.label}`}
                  className="text-zinc-500 transition-colors duration-200 hover:text-ice"
                >
                  {link.icon === "github" ? (
                    <GithubIcon className="h-[18px] w-[18px]" />
                  ) : (
                    <ExternalLinkIcon className="h-[18px] w-[18px]" />
                  )}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right — animation */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-800 bg-ink/40">
          <Animation />
        </div>
      </div>

      {/* Supplementary architectural proof (e.g. ShadowDocs), toggled open */}
      {Supplement && (
        <div className="border-t border-zinc-800/50 px-8 pb-8 lg:px-12 lg:pb-12">
          <button
            type="button"
            onClick={() => setShowDocs((v) => !v)}
            aria-expanded={showDocs}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/[0.06] px-4 py-2 font-mono text-xs text-cyan transition-colors hover:bg-cyan/10"
          >
            <span
              className={`inline-block transition-transform duration-200 ${
                showDocs ? "rotate-90" : ""
              }`}
            >
              ▸
            </span>
            {showDocs ? "Hide shadow documentation" : "View shadow documentation"}
          </button>

          <AnimatePresence initial={false}>
            {showDocs && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="overflow-hidden"
              >
                <div className="pt-6">
                  <Supplement />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-label="Selected projects" className="scroll-mt-24">
      <div className="flex items-center gap-3">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/projects
        </h2>
        <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
      </div>

      <div className="mt-10 space-y-12">
        {PROJECTS.map((project) => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
