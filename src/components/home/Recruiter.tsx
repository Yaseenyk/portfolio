import Link from "next/link";
import { RESUME_ATS_URL } from "@/lib/site";
import { ArrowRightIcon } from "@/components/Icons";

/**
 * The home page below the hero, written for a recruiter with one minute: who, where, three proofs with results, how I work.
 * Server components only (no client JS). Every fact is on the résumé (scripts/generate-resume.js); nothing new is claimed here.
 * Plain headings on purpose: a recruiter scans for "Experience", not for a clever label.
 */

// No boxes: a thin line above each block, and space.
const card = "border-t border-white/10 pt-5 pb-1";
const eyebrow = "font-mono text-[11px] uppercase tracking-[0.22em] text-cyan";
const h2 = "mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl";
const lead = "mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-400";
const link = "inline-flex items-center gap-1 text-sm font-medium text-cyan underline-offset-4 hover:underline";

/* ------------------------------------------------------------------ 1. the 60-second version */

const FACTS: { k: string; v: string; d: string }[] = [
  { k: "Now", v: "Senior Software Developer, Sparity", d: "I own the LLM and agent layer of production MERN systems: RAG pipelines, function-calling agents, MCP servers." },
  { k: "Before", v: "Full Stack Developer, MSA Software", d: "Made dashboards 1.5 to 2x faster by profiling MongoDB pipelines. Moved the team from JavaScript to TypeScript and Next.js." },
  { k: "Stack", v: "React, Node.js, TypeScript, MongoDB", d: "Plus the AI side: LLM APIs, RAG, vector search, agents, evals. Python and PostgreSQL when the job needs them." },
  { k: "Looking for", v: "Senior full-stack or AI engineer roles", d: "Remote, hybrid or Hyderabad. Five years of experience. I also take fixed-price builds." },
];

export function OneMinute() {
  return (
    <section aria-labelledby="one-minute" className="py-14 sm:py-20">
      <p className={eyebrow}>If you have one minute</p>
      <h2 id="one-minute" className={h2}>The short version</h2>
      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map((f) => (
          <div key={f.k} className={card}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">{f.k}</p>
            <p className="mt-2 text-base font-semibold leading-snug text-zinc-50">{f.v}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <a href={RESUME_ATS_URL} download="Yaseen-Khatib-Resume-Plain.pdf" className="font-medium text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-ice">
          Prefer one page? Plain CV for application forms
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 2. experience */

const JOBS: { role: string; org: string; when: string; where: string; points: string[]; stack: string }[] = [
  {
    role: "Senior Software Developer", org: "Sparity", when: "Jun 2025 to now", where: "Hyderabad, hybrid",
    points: [
      "Own the LLM and agent layer of production MERN systems end to end: architecture, orchestration and deployment.",
      "Build agentic RAG services with schema-validated outputs, guardrails and cost-aware routing between models.",
    ],
    stack: "Node.js, React, TypeScript, MongoDB, LLM APIs, RAG, MCP",
  },
  {
    role: "Full Stack Developer", org: "MSA Software", when: "Jan 2023 to May 2025", where: "Remote",
    points: [
      "Cut dashboard response times 1.5 to 2x by profiling slow MongoDB aggregation pipelines, adding a caching layer and lazy-loading heavy panels.",
      "Moved the team's legacy JavaScript to TypeScript and Next.js, removing a class of type-related production bugs.",
    ],
    stack: "React, Node.js, TypeScript, Next.js, MongoDB, Redux Toolkit",
  },
  {
    role: "Software Developer (SDE 1)", org: "Manorama Infosolutions", when: "Sep 2021 to Jan 2023", where: "Healthcare software, remote",
    points: [
      "Built REST routing layers for hospital information systems on ASP.NET and React, with 2x payload throughput on the hot paths.",
      "Hardened request handling for concurrent user sessions in software clinical staff used every day.",
    ],
    stack: "ASP.NET, MVC, React, REST APIs",
  },
];

export function ExperienceTimeline() {
  return (
    <section id="experience" aria-labelledby="experience-h" className="scroll-mt-24 py-14 sm:py-20">
      <p className={eyebrow}>Where I have worked</p>
      <h2 id="experience-h" className={h2}>Experience</h2>
      <ol className="mt-10 space-y-8">
        {JOBS.map((j) => (
          <li key={j.org} className={card}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-lg font-semibold text-zinc-50">{j.role} <span className="font-medium text-cyan">· {j.org}</span></h3>
              <p className="font-mono text-xs text-zinc-500">{j.when} · {j.where}</p>
            </div>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-zinc-300">
              {j.points.map((p) => (
                <li key={p} className="flex gap-3"><span aria-hidden="true" className="mt-[10px] h-1 w-1 flex-none rounded-full bg-cyan" />{p}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-zinc-500"><span className="text-zinc-400">Stack:</span> {j.stack}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ 3. three proofs */

interface Proof { name: string; kind: string; problem: string; built: string; result: string; proves: string[]; links: [string, string][] }
const PROOFS: Proof[] = [
  {
    name: "IntegrateX", kind: "Workflow engine · React Flow, MongoDB",
    problem: "A drag-and-drop workflow canvas was saving its whole screen state to the database, so every save was huge.",
    built: "A serialization adapter that separates what the screen needs from what the database should store.",
    result: "Stored payloads cut by 94%, with nothing lost on reload. You can run it in your browser.",
    proves: ["React", "MongoDB", "State design", "Performance"],
    links: [["Open the live sandbox", "/sandbox/"], ["Read how", "/blog/94-percent-payload-reduction-react-flow/"]],
  },
  {
    name: "Portfolio Concierge", kind: "RAG API and MCP server · Cloudflare Workers",
    problem: "AI chatbots guess when they do not know. On a company's own documents, a confident wrong answer is worse than none.",
    built: "A question-answering service over this site that answers only from what it finds, and refuses below a confidence threshold.",
    result: "It runs on this page. It also works as an MCP server, so you can question my work from inside Claude.",
    proves: ["RAG", "Vector search", "MCP", "TypeScript"],
    links: [["Ask it something", "#rag-concierge"], ["Read the code", "https://github.com/Yaseenyk/portfolio/tree/main/worker"]],
  },
  {
    name: "FitRank", kind: "AI decision model · FastAPI, PostgreSQL",
    problem: "Asking a chatbot who should take a shift gives an opinion nobody can check or measure.",
    built: "A small model I trained from a larger one. It scores every option, and a manager makes every final decision.",
    result: "Beats a rules-only baseline on shortlists (94% vs 91%) and publishes where it loses. 93.5% backend test coverage.",
    proves: ["Python", "Model evaluation", "Testing", "CI"],
    links: [["See it live", "https://fitrank.streamerosai.com"], ["Case study", "/products/fitrank/"]],
  },
];

const ALSO: [string, string, string][] = [
  ["SpotAI", "AI gym app. Form check runs on the phone and no video ever leaves it. 190 API tests.", "/products/spotai/"],
  ["Path Saathi LMS", "Client project. A working learning platform was live one day after the brief.", "/projects/"],
  ["Sable", "AI finance agent. The model proposes, and only a person can commit a change.", "/products/sable/"],
  ["streamerOS", "Rust desktop app for streamers, built with Claude Code. 306 tests.", "/products/streameros/"],
];

const isExternal = (h: string) => h.startsWith("http");

export function Proofs() {
  return (
    <section id="work" aria-labelledby="work-h" className="scroll-mt-24 py-14 sm:py-20">
      <p className={eyebrow}>Proof, not adjectives</p>
      <h2 id="work-h" className={h2}>Three things I built, and what each one shows</h2>
      <p className={lead}>Each one is live. Open it, break it, read the code.</p>
      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-3">
        {PROOFS.map((p) => (
          <article key={p.name} className={`${card} flex flex-col`}>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">{p.kind}</p>
            <h3 className="mt-2 text-xl font-semibold text-zinc-50">{p.name}</h3>
            <dl className="mt-4 flex-1 space-y-3 text-sm leading-relaxed">
              <div><dt className="font-semibold text-zinc-300">The problem</dt><dd className="mt-0.5 text-zinc-400">{p.problem}</dd></div>
              <div><dt className="font-semibold text-zinc-300">What I built</dt><dd className="mt-0.5 text-zinc-400">{p.built}</dd></div>
              <div><dt className="font-semibold text-cyan">The result</dt><dd className="mt-0.5 text-zinc-200">{p.result}</dd></div>
            </dl>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills this shows">
              {p.proves.map((s) => <li key={s} className="text-[12px] text-zinc-500 after:ml-1.5 after:content-['·'] last:after:content-none">{s}</li>)}
            </ul>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {p.links.map(([label, href]) =>
                isExternal(href) ? (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={link}>{label} <ArrowRightIcon className="h-3.5 w-3.5" /></a>
                ) : (
                  <Link key={href} href={href} className={link}>{label} <ArrowRightIcon className="h-3.5 w-3.5" /></Link>
                ),
              )}
            </div>
          </article>
        ))}
      </div>

      <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-400">Also shipped</h3>
      <ul className="mt-4 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
        {ALSO.map(([name, text, href]) => (
          <li key={name}>
            <Link href={href} className="group flex h-full items-start gap-3 border-t border-white/10 py-4">
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-zinc-100">{name}</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-zinc-400">{text}</span>
              </span>
              <ArrowRightIcon className="mt-1 h-4 w-4 flex-none text-zinc-600 transition-colors group-hover:text-cyan" />
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5"><Link href="/projects/" className={link}>All projects <ArrowRightIcon className="h-3.5 w-3.5" /></Link></p>
    </section>
  );
}

/* ------------------------------------------------------------------ 4. how I work */

const RULES: [string, string, string][] = [
  ["The AI proposes. A person decides.", "In Sable, the model cannot change your money: every change waits for you to confirm. In FitRank, a manager makes every final call.", "Why it matters: nobody wants to explain an AI's mistake to a customer."],
  ["It says “I don't know”.", "The concierge on this page refuses to answer when it has no good source. My retail vision project returns an error instead of a score it cannot support.", "Why it matters: a wrong answer costs more than no answer."],
  ["I measure against a baseline, and publish the losses.", "FitRank is tested against plain rules on every release. It wins on shortlists and loses on picking the single best person, so it only shortlists.", "Why it matters: you learn what a system is good for before your users do."],
  ["Fast, when the job is clear.", "A client's learning platform was live one day after the brief: login, course videos and a self-paced flow.", "Why it matters: a working link ends more debates than a slide deck."],
];

export function HowIWork() {
  return (
    <section aria-labelledby="how-h" className="py-14 sm:py-20">
      <p className={eyebrow}>What you get on your team</p>
      <h2 id="how-h" className={h2}>How I build AI into real products</h2>
      <p className={lead}>Four habits, each with the project that shows it.</p>
      <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
        {RULES.map(([title, text, why], i) => (
          <li key={title} className={card}>
            <p className="font-mono text-xs text-cyan">0{i + 1}</p>
            <h3 className="mt-2 text-lg font-semibold leading-snug text-zinc-50">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-400">{text}</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">{why}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ 5. writing, three picks */

export function WritingPicks({ posts }: { posts: { slug: string; title: string; description: string }[] }) {
  if (!posts.length) return null;
  return (
    <section aria-labelledby="writing-h" className="py-14 sm:py-20">
      <p className={eyebrow}>If you want to go deeper</p>
      <h2 id="writing-h" className={h2}>Three things I wrote</h2>
      <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}/`} className={`${card} group block h-full`}>
              <span className="block text-base font-semibold leading-snug text-zinc-50 group-hover:text-cyan">{p.title}</span>
              <span className="mt-2 block text-sm leading-relaxed text-zinc-400">{p.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5"><Link href="/blog/" className={link}>All articles <ArrowRightIcon className="h-3.5 w-3.5" /></Link></p>
    </section>
  );
}
