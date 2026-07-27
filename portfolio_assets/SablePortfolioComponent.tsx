// SablePortfolioComponent.tsx
// Self-contained case-study section for a portfolio site.
// Deps: React + Tailwind CSS only (no external UI libs). Drop it anywhere.
// Brand: Sable — blue on near-black. Tweak the `blue-*` / `zinc-*` tokens to taste.

import type { FC, ReactNode } from "react";

/* ------------------------------------------------------------------ data --- */

const TECH_STACK = [
  "React Native (Expo)",
  "TypeScript",
  "SQLite",
  "Zustand",
  "NativeWind",
  "Reanimated",
  "OpenAI · Function Calling",
  "Local RAG",
] as const;

interface Feature {
  title: string;
  blurb: string;
  icon: ReactNode;
}

const FEATURES: Feature[] = [
  {
    title: "Offline-First Privacy",
    blurb:
      "Every transaction, balance, and counterparty lives in on-device SQLite. No cloud backend, no account — financial data never leaves the phone.",
    icon: (
      <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Zm0 10.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
    ),
  },
  {
    title: "AI Function Calling — Dry-Run Safety",
    blurb:
      "The agent manages peer-to-peer debts via OpenAI function calling, but a strict Review & Confirm card gates every write. The model proposes; the user commits.",
    icon: (
      <path d="M9 12.5 11 14.5 15.5 10M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Z" />
    ),
  },
  {
    title: "Proactive RAG Briefing",
    blurb:
      "A daily background job queries local SQLite (spend, pacing), builds a context window, and pushes an AI-generated Morning Briefing straight to the lock screen.",
    icon: (
      <path d="M12 3v2m0 14v2M5 12H3m18 0h-2M6.3 6.3 4.9 4.9m14.2 1.4 1.4-1.4M6.3 17.7l-1.4 1.4m14.2-1.4 1.4 1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
    ),
  },
];

/* -------------------------------------------------------------- primitives - */

const Icon: FC<{ children: ReactNode }> = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const Badge: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-xs font-medium text-blue-200/90">
    {children}
  </span>
);

/* ------------------------------------------------------------------ view --- */

const SableCaseStudy: FC = () => {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-zinc-100">
      {/* ambient blue glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 max-w-4xl rounded-full bg-blue-600/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        {/* -------------------------------------------------------- hero --- */}
        <header className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 font-bold text-white shadow-lg shadow-blue-900/40">
              S
            </span>
            <span className="text-sm font-medium tracking-wide text-zinc-400">
              Sable
            </span>
          </div>

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-blue-400">
            Flagship Product · Case Study
          </p>

          <h2 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            Local-First{" "}
            <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
              AI Financial Agent
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-zinc-400">
            An AI agent that reasons over your finances — categorization, debt
            tracking, proactive briefings — while{" "}
            <span className="text-zinc-200">
              100% of your data stays on-device
            </span>
            . No cloud backend. Non-deterministic AI, held behind hard UI safety
            boundaries.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#" /* TODO: live/App Store link */
              className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition-colors hover:bg-blue-400"
            >
              View Live
            </a>
            <a
              href="#" /* TODO: repo link */
              className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-blue-500/60 hover:text-blue-200"
            >
              Source
            </a>
          </div>
        </header>

        {/* -------------------------------------------------- tech badges --- */}
        <div className="mt-12 flex flex-wrap gap-2.5">
          {TECH_STACK.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        {/* ----------------------------------------------- feature grid --- */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-colors hover:border-blue-500/40 hover:bg-zinc-900/70"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-500/20 transition-colors group-hover:bg-blue-500/15">
                <Icon>{f.icon}</Icon>
              </div>
              <h3 className="text-base font-semibold text-zinc-50">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {f.blurb}
              </p>
            </article>
          ))}
        </div>

        {/* ------------------------------------------- screenshots row --- */}
        <div className="mt-16">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            ~/screens
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              "Home / Balance",
              "AI Chat",
              "Review & Confirm",
              "Morning Briefing",
            ].map((label) => (
              <div
                key={label}
                className="flex aspect-[9/19] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/30 p-4 text-center"
              >
                {/* TODO: replace with <img src="..." alt={label} /> */}
                <span className="text-xs text-zinc-600">{label}</span>
                <span className="mt-1 text-[10px] text-zinc-700">
                  screenshot
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SableCaseStudy;
