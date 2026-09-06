"use client";

import { useState } from "react";

/**
 * "Prompt, RAG, or fine-tune? Decide." Pick a real scenario; get the right
 * approach with the reasoning — trains the judgement that fine-tuning is the
 * last resort, not the first.
 */

type Approach = "prompt" | "rag" | "finetune";

const SCENARIOS: {
  q: string;
  answer: Approach;
  why: string;
}[] = [
  {
    q: "Make the bot answer questions about this year's college notices.",
    answer: "rag",
    why: "It needs your FACTS, which change often. That is RAG — retrieve the real notices at question time. Fine-tuning would make it sound like notices while still inventing details.",
  },
  {
    q: "Make the bot always reply in one short, formal sentence.",
    answer: "prompt",
    why: "That is a behaviour you can just describe. A good system prompt (Chapter 7) does it for free, instantly. No RAG, no fine-tuning needed.",
  },
  {
    q: "Make the bot write in your company's very specific, unusual support voice — every time, without long instructions.",
    answer: "finetune",
    why: "This is consistent STYLE you can't reliably get from a prompt, and you have thousands of past replies as examples. This is fine-tuning's genuine use — teaching form, not facts.",
  },
  {
    q: "Stop the bot from using emojis.",
    answer: "prompt",
    why: "One line in the system prompt. Never reach for a heavier tool when a lighter one does the job.",
  },
  {
    q: "Answer support questions from a 500-page product manual.",
    answer: "rag",
    why: "Knowledge that lives in documents = RAG. Chunk the manual, embed it, retrieve the relevant part per question (Chapters 9–10).",
  },
];

const LABELS: Record<Approach, { name: string; color: string }> = {
  prompt: { name: "Prompt", color: "#22D3EE" },
  rag: { name: "RAG", color: "#67E8F9" },
  finetune: { name: "Fine-tune", color: "#A855F7" },
};

export default function ChooseApproach() {
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const s = SCENARIOS[i]!;

  const pick = (next: number) => {
    setI(next);
    setRevealed(false);
  };

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Interactive · prompt, RAG, or fine-tune?
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => pick(idx)}
              className={`h-1.5 w-6 rounded-full transition-colors ${idx === i ? "bg-cyan" : "bg-white/10 hover:bg-white/20"}`}
              aria-label={`Scenario ${idx + 1}`}
            />
          ))}
        </div>

        <p className="mt-5 text-sm leading-relaxed text-zinc-200">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            Scenario {i + 1}/{SCENARIOS.length}
          </span>
          <span className="mt-1.5 block">{s.q}</span>
        </p>

        {!revealed ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {(["prompt", "rag", "finetune"] as Approach[]).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setRevealed(true)}
                className="rounded-lg border border-white/10 px-4 py-2 text-xs text-zinc-300 transition-colors hover:border-cyan/50 hover:text-zinc-100"
              >
                {LABELS[a].name}?
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-lg border p-4" style={{ borderColor: `${LABELS[s.answer].color}55`, background: `${LABELS[s.answer].color}0f` }}>
            <p className="font-mono text-xs uppercase tracking-[0.15em]" style={{ color: LABELS[s.answer].color }}>
              → {LABELS[s.answer].name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200">{s.why}</p>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={() => setRevealed(false)}
                className="font-mono text-[11px] text-zinc-500 hover:text-zinc-300"
              >
                ↺ hide
              </button>
              {i < SCENARIOS.length - 1 && (
                <button
                  type="button"
                  onClick={() => pick(i + 1)}
                  className="font-mono text-[11px] text-ice hover:underline"
                >
                  next scenario →
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        Prompt for behaviour · RAG for knowledge · fine-tune for consistent style you can&rsquo;t prompt. Try the cheap one first.
      </figcaption>
    </figure>
  );
}
