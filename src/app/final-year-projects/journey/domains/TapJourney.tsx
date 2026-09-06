"use client";

import { useState } from "react";

/**
 * The one-tap round trip, clickable. Mirrors the six numbered steps in the
 * chapter so a mentor can step through it live while teaching: each step
 * lights up the part of the system doing the work and moves the message dot
 * along the wire. No libraries — plain state + CSS transitions on transforms.
 */

const STEPS = [
  {
    label: "You tap the button",
    text: "You hit “Place order”. Everything you can see — the cart, the button, the colours — is the frontend, running on your own phone.",
    lit: { phone: true, server: false, db: false },
    wire: null as null | "req" | "query" | "data" | "res",
  },
  {
    label: "The request travels",
    text: "Your phone sends a small message across the internet: “this user wants to order these items”. That message is a request.",
    lit: { phone: true, server: false, db: false },
    wire: "req" as const,
  },
  {
    label: "The backend thinks",
    text: "Zomato's server receives it. The backend checks the rules: logged in? restaurant open? price correct? payment done?",
    lit: { phone: false, server: true, db: false },
    wire: null,
  },
  {
    label: "It asks the database",
    text: "To check those rules it needs stored facts — your account, the menu, past orders. It asks the database, the memory of the system.",
    lit: { phone: false, server: true, db: true },
    wire: "query" as const,
  },
  {
    label: "The response returns",
    text: "Decision made. The backend sends a response back to your phone: “order placed, here is the order number”.",
    lit: { phone: false, server: true, db: false },
    wire: "res" as const,
  },
  {
    label: "The screen updates",
    text: "The frontend receives the response and repaints the screen: Order confirmed ✓. You saw two seconds — this whole round trip happened underneath.",
    lit: { phone: true, server: false, db: false },
    wire: null,
  },
];

/* Message-dot x-position per wire segment (SVG coords). */
const DOT_X: Record<string, number> = { req: 240, query: 505, data: 505, res: 240 };
const DOT_Y: Record<string, number> = { req: 96, query: 96, data: 132, res: 132 };

export default function TapJourney() {
  const [step, setStep] = useState(0);
  const s = STEPS[step]!;

  const node = (on: boolean, color: string) =>
    on ? { stroke: color, opacity: 1 } : { stroke: "#3f3f46", opacity: 0.75 };

  return (
    <figure className="not-prose my-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Interactive · the life of one tap — click through it
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <svg viewBox="0 0 760 200" className="h-auto w-full" role="img" aria-label={`Step ${step + 1} of 6: ${s.label}`}>
          {/* wires */}
          <path d="M150 96 H 330" fill="none" strokeWidth="1.5" stroke={s.wire === "req" ? "#22D3EE" : "#33363f"} />
          <path d="M330 132 H 150" fill="none" strokeWidth="1.5" stroke={s.wire === "res" ? "#67E8F9" : "#33363f"} />
          <path d="M480 96 H 610" fill="none" strokeWidth="1.5" stroke={s.wire === "query" ? "#A855F7" : "#33363f"} />
          <path d="M610 132 H 480" fill="none" strokeWidth="1.5" stroke={s.wire === "query" ? "#A855F7" : "#33363f"} />

          {/* wire labels */}
          <text x="240" y="84" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={s.wire === "req" ? "#22D3EE" : "#52525b"}>request →</text>
          <text x="240" y="150" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={s.wire === "res" ? "#67E8F9" : "#52525b"}>← response</text>
          <text x="545" y="84" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={s.wire === "query" ? "#A855F7" : "#52525b"}>asks →</text>
          <text x="545" y="150" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={s.wire === "query" ? "#A855F7" : "#52525b"}>← answers</text>

          {/* the travelling message dot */}
          {s.wire && (
            <circle
              r="5"
              fill={s.wire === "query" ? "#A855F7" : "#22D3EE"}
              style={{
                transform: `translate(${DOT_X[s.wire]}px, ${DOT_Y[s.wire]}px)`,
                transition: "transform 400ms ease",
              }}
            />
          )}

          {/* Phone — frontend */}
          <rect x="40" y="58" width="110" height="112" rx="14" fill="rgba(34,211,238,0.05)" strokeWidth="1.5" {...node(s.lit.phone, "#22D3EE")} />
          <rect x="58" y="76" width="74" height="56" rx="6" fill="#0b1018" stroke="#33363f" />
          <text x="95" y="102" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={step === 5 ? "#34d399" : "#71717a"}>
            {step === 5 ? "confirmed ✓" : step === 0 ? "[ order ]" : "waiting…"}
          </text>
          <circle cx="95" cy="152" r="5" fill="none" stroke="#33363f" />
          <text x="95" y="190" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={s.lit.phone ? "#22D3EE" : "#71717a"}>frontend</text>

          {/* Server — backend */}
          <rect x="330" y="64" width="150" height="100" rx="12" fill="rgba(168,85,247,0.05)" strokeWidth="1.5" {...node(s.lit.server, "#A855F7")} />
          <text x="405" y="106" textAnchor="middle" fontFamily="monospace" fontSize="12" fill={s.lit.server ? "#A855F7" : "#a1a1aa"}>backend</text>
          <text x="405" y="124" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#71717a">checks the rules</text>
          <text x="405" y="190" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={s.lit.server ? "#A855F7" : "#71717a"}>a server that never sleeps</text>

          {/* Database */}
          <g strokeWidth="1.5" {...node(s.lit.db, "#67E8F9")}>
            <ellipse cx="660" cy="76" rx="50" ry="12" fill="rgba(103,232,249,0.05)" />
            <path d="M610 76 v72 a50 12 0 0 0 100 0 v-72" fill="rgba(103,232,249,0.05)" />
          </g>
          <text x="660" y="122" textAnchor="middle" fontFamily="monospace" fontSize="12" fill={s.lit.db ? "#67E8F9" : "#a1a1aa"}>database</text>
          <text x="660" y="190" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={s.lit.db ? "#67E8F9" : "#71717a"}>remembers</text>
        </svg>

        {/* step text */}
        <p className="mt-4 min-h-[3.5rem] text-sm leading-relaxed text-zinc-300">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
            Step {step + 1}/6 · {s.label}
          </span>
          <span className="mt-1.5 block">{s.text}</span>
        </p>

        {/* controls */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setStep((v) => Math.max(0, v - 1))}
            disabled={step === 0}
            className="rounded-lg border border-white/10 px-4 py-2 text-xs text-zinc-300 transition-colors hover:border-cyan/50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={() => setStep((v) => (v + 1) % STEPS.length)}
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-5 py-2 text-xs font-medium text-ink"
          >
            {step === STEPS.length - 1 ? "Play it again" : "Next step →"}
          </button>
          <div className="flex gap-1.5" aria-hidden>
            {STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStep(i)}
                className={`h-1.5 w-5 rounded-full transition-colors ${i === step ? "bg-cyan" : i < step ? "bg-cyan/30" : "bg-white/10"}`}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        Frontend asks · backend thinks · database remembers — every app is this loop.
      </figcaption>
    </figure>
  );
}
