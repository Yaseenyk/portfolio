"use client";

import { useState } from "react";

/**
 * "The loop — think, act, observe." A stepper through one agent run over a
 * two-part question, so students see the model choose a tool, the code run
 * it, and the result feed back — repeating until done. Teaching tool.
 */

const STEPS = [
  {
    phase: "goal",
    who: "you",
    title: "The goal",
    text: "“What's the total of the tuition fee and the exam fee?” — a task that needs two lookups and some maths.",
  },
  {
    phase: "think",
    who: "model",
    title: "Think",
    text: "The model decides: “I don't know the fees. I'll use search_notices for the tuition fee first.”",
  },
  {
    phase: "act",
    who: "code",
    title: "Act",
    text: "YOUR code runs search_notices(\"tuition fee\") against the real database and gets back: ₹40,000.",
  },
  {
    phase: "observe",
    who: "model",
    title: "Observe → think again",
    text: "The model reads ₹40,000, and decides: “Now I need the exam fee.” It calls search_notices again.",
  },
  {
    phase: "act",
    who: "code",
    title: "Act again",
    text: "Your code returns the exam fee: ₹2,500. The model now has both numbers, but must add them exactly.",
  },
  {
    phase: "think",
    who: "model",
    title: "Choose the calculator",
    text: "Rather than risk mental arithmetic (Chapter 5), the model calls calculate(\"40000 + 2500\").",
  },
  {
    phase: "done",
    who: "model",
    title: "Answer",
    text: "Your code returns 42,500. With everything it needs, the model stops looping and answers: “The total is ₹42,500.”",
  },
];

const WHO_COLOR: Record<string, string> = {
  you: "#67E8F9",
  model: "#A855F7",
  code: "#22D3EE",
};

export default function AgentLoop() {
  const [i, setI] = useState(0);
  const s = STEPS[i]!;

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Interactive · one agent run, step by step
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {/* the three-role loop, active role lit */}
        <div className="flex items-center justify-center gap-3">
          {[
            { key: "model", label: "model · thinks" },
            { key: "code", label: "your code · acts" },
          ].map((r) => {
            const on = s.who === r.key;
            return (
              <span
                key={r.key}
                className="rounded-lg border px-4 py-2 font-mono text-[11px] transition-colors"
                style={{
                  borderColor: on ? WHO_COLOR[r.key] : "rgba(255,255,255,0.1)",
                  color: on ? WHO_COLOR[r.key] : "#71717a",
                  background: on ? "rgba(34,211,238,0.06)" : "transparent",
                }}
              >
                {r.label}
              </span>
            );
          })}
          <span className="font-mono text-[11px] text-zinc-600">↻ loop</span>
        </div>

        <p className="mt-5 min-h-[4.5rem] text-sm leading-relaxed text-zinc-300">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: WHO_COLOR[s.who] }}
          >
            Step {i + 1}/{STEPS.length} · {s.who} · {s.title}
          </span>
          <span className="mt-1.5 block">{s.text}</span>
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setI((v) => Math.max(0, v - 1))}
            disabled={i === 0}
            className="rounded-lg border border-white/10 px-4 py-2 text-xs text-zinc-300 transition-colors hover:border-cyan/50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={() => setI((v) => (v + 1) % STEPS.length)}
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-5 py-2 text-xs font-medium text-ink"
          >
            {i === STEPS.length - 1 ? "Run it again" : "Next step →"}
          </button>
          <div className="flex gap-1.5">
            {STEPS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                className={`h-1.5 w-4 rounded-full transition-colors ${idx === i ? "bg-cyan" : idx < i ? "bg-cyan/30" : "bg-white/10"}`}
                aria-label={`Step ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        The model chooses; your code acts; the result returns. Loop until the goal is met.
      </figcaption>
    </figure>
  );
}
