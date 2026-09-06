"use client";

import { useState } from "react";

/**
 * "Zero-shot / few-shot / chain-of-thought." Three tabs over the SAME task, so
 * a student sees what each style adds to the prompt and what it buys in the
 * answer. Canned but faithful — the task is a genuine classification where the
 * differences actually show.
 */

type Style = "zero" | "few" | "cot";

const TASK = 'Classify this notice as exam, event, or general:\n"Cultural fest auditions are on Friday. Exam-hall block C is the venue."';

const STYLES: Record<
  Style,
  { label: string; adds: string; prompt: string; answer: string; note: string }
> = {
  zero: {
    label: "Zero-shot",
    adds: "just the instruction",
    prompt: `Classify the notice as exam, event, or general.

Notice: "Cultural fest auditions are on Friday.
Exam-hall block C is the venue."`,
    answer: "exam",
    note: "Tripped by the word “Exam-hall”. With no guidance on tricky cases, the model grabbed the loudest keyword — wrong. Fine for easy inputs, fragile on ambiguous ones.",
  },
  few: {
    label: "Few-shot",
    adds: "instruction + examples",
    prompt: `Classify the notice as exam, event, or general.

Examples:
"Mid-sems begin Monday." -> exam
"Blood donation camp in the quad." -> event
"Library closed on Sunday." -> general

Notice: "Cultural fest auditions are on Friday.
Exam-hall block C is the venue."`,
    answer: "event",
    note: "The examples taught the SHAPE: classify by what the notice is about (auditions), not by stray words (a venue that happens to be an exam hall). Showing beats telling.",
  },
  cot: {
    label: "Chain-of-thought",
    adds: "instruction + “think step by step”",
    prompt: `Classify the notice as exam, event, or general.
Think step by step, then give the label on the last line.

Notice: "Cultural fest auditions are on Friday.
Exam-hall block C is the venue."`,
    answer:
      "The notice is about fest auditions — an activity students attend.\n“Exam-hall block C” is only the location, not the subject.\nSo the topic is an event.\n\nevent",
    note: "Given room to reason on the page, it separated the subject from the venue itself. Best for tasks with a catch — but it costs more tokens and time (Chapter 6).",
  },
};

const ORDER: Style[] = ["zero", "few", "cot"];

export default function PromptStyleDemo() {
  const [style, setStyle] = useState<Style>("zero");
  const s = STYLES[style];

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Interactive · same task, three amounts of help
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {/* tabs */}
        <div className="flex flex-wrap gap-2">
          {ORDER.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setStyle(k)}
              className={`rounded-lg border px-3.5 py-2 text-xs transition-colors duration-200 ${
                style === k
                  ? "border-cyan/60 bg-cyan/10 text-ice"
                  : "border-white/10 text-zinc-400 hover:border-cyan/40 hover:text-zinc-200"
              }`}
            >
              {STYLES[k].label}
            </button>
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-cyan">
          {s.adds}
        </p>

        {/* the prompt */}
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          the prompt
        </p>
        <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.02] p-4 font-mono text-[12.5px] leading-relaxed text-zinc-300">
          {s.prompt}
        </pre>

        {/* the answer */}
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          the model&apos;s answer
        </p>
        <pre
          className={`mt-2 overflow-x-auto rounded-lg border p-4 font-mono text-[12.5px] leading-relaxed ${
            style === "zero"
              ? "border-red-500/30 bg-red-500/[0.04] text-red-300"
              : "border-cyan/30 bg-cyan/[0.04] text-ice"
          }`}
        >
          {s.answer}
        </pre>

        <p className="mt-3 text-xs leading-relaxed text-zinc-500">{s.note}</p>
      </div>

      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        More help costs more tokens. Add exactly as much as the task&apos;s difficulty demands — no more.
      </figcaption>
    </figure>
  );
}
