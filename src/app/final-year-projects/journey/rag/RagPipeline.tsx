"use client";

import { useState } from "react";

/**
 * "Walk the pipeline." A five-step click-through of a RAG query, each step
 * lighting the active stage and showing what is happening in plain words.
 * Teaching tool for live sessions — click through it while explaining.
 */

const STEPS = [
  {
    tag: "question",
    title: "A question arrives",
    text: "The student asks, in plain language: “When is the fee due?” — words that may not appear in any notice.",
    active: 0,
  },
  {
    tag: "embed",
    title: "Embed the question",
    text: "The question is turned into a position (Chapter 8) using the same embedding model that indexed the notices.",
    active: 1,
  },
  {
    tag: "retrieve",
    title: "Retrieve the nearest chunks",
    text: "The vector database returns the notices closest in meaning (Chapter 9) — the tuition-payment notice comes back, despite sharing no words with the question.",
    active: 2,
  },
  {
    tag: "augment",
    title: "Augment the prompt",
    text: "Those retrieved notices are dropped into a prompt with a strict rule: “answer using ONLY these notices” (Chapter 7). This is the grounding contract.",
    active: 3,
  },
  {
    tag: "generate",
    title: "Generate the grounded answer",
    text: "The LLM (Chapter 6) reads the notices and writes the answer — anchored to real text, with the source it used: “The fee is due Friday 14th.”",
    active: 4,
  },
];

const NODES = ["question", "embed", "vector DB", "prompt", "LLM"];
const COLORS = ["#22D3EE", "#67E8F9", "#67E8F9", "#A855F7", "#67E8F9"];

export default function RagPipeline() {
  const [i, setI] = useState(0);
  const s = STEPS[i]!;

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Interactive · walk one RAG query, step by step
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <svg viewBox="0 0 720 90" className="h-auto w-full" role="img" aria-label={`Step ${i + 1}: ${s.title}`}>
          {NODES.map((label, idx) => {
            const x = 24 + idx * 140;
            const on = idx === s.active;
            const done = idx < s.active;
            const color = COLORS[idx];
            return (
              <g key={label}>
                {idx < NODES.length - 1 && (
                  <line
                    x1={x + 96}
                    y1={45}
                    x2={x + 140}
                    y2={45}
                    stroke={done ? color : "#33363f"}
                    strokeWidth="1.5"
                  />
                )}
                <rect
                  x={x}
                  y={24}
                  width={96}
                  height={42}
                  rx={9}
                  fill={on ? "rgba(34,211,238,0.08)" : "transparent"}
                  stroke={on || done ? color : "#3f3f46"}
                  strokeWidth={on ? 1.8 : 1.2}
                  opacity={on || done ? 1 : 0.6}
                />
                <text
                  x={x + 48}
                  y={49}
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontSize="10.5"
                  fill={on ? "#67E8F9" : done ? "#a1a1aa" : "#71717a"}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>

        <p className="mt-4 min-h-[4.5rem] text-sm leading-relaxed text-zinc-300">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
            Step {i + 1}/5 · {s.title}
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
            {i === STEPS.length - 1 ? "Play it again" : "Next step →"}
          </button>
          <div className="flex gap-1.5">
            {STEPS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                className={`h-1.5 w-5 rounded-full transition-colors ${idx === i ? "bg-cyan" : idx < i ? "bg-cyan/30" : "bg-white/10"}`}
                aria-label={`Step ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        No magic box — vector search finds, the prompt grounds, the LLM writes. Tools you already know.
      </figcaption>
    </figure>
  );
}
