"use client";

import { useState } from "react";

/**
 * "Watch it choose a word." A hand-authored, honest imitation of next-token
 * prediction: a fixed prompt, a probability list, click a word to append it
 * and reveal the next list. Not a real model — a teaching toy that makes the
 * mechanic (predict → sample → repeat) physical. Numbers are illustrative.
 */

type Cand = { word: string; p: number };

// A tiny scripted tree: after each chosen word, the next candidate list.
const START = "The final year project that got me the job was";
const TREE: Record<string, Cand[]> = {
  "": [
    { word: "a", p: 0.41 },
    { word: "the", p: 0.22 },
    { word: "built", p: 0.14 },
    { word: "actually", p: 0.09 },
    { word: "surprisingly", p: 0.06 },
  ],
  a: [
    { word: "small", p: 0.38 },
    { word: "simple", p: 0.29 },
    { word: "real", p: 0.18 },
    { word: "chat", p: 0.09 },
  ],
  "a small": [
    { word: "app", p: 0.44 },
    { word: "tool", p: 0.31 },
    { word: "one", p: 0.15 },
    { word: "but", p: 0.10 },
  ],
  "a small app": [
    { word: "I", p: 0.52 },
    { word: "that", p: 0.28 },
    { word: "built", p: 0.12 },
    { word: ".", p: 0.08 },
  ],
  "a small app I": [
    { word: "could", p: 0.4 },
    { word: "actually", p: 0.33 },
    { word: "shipped", p: 0.19 },
    { word: "understood", p: 0.08 },
  ],
};

const FALLBACK: Cand[] = [
  { word: "and", p: 0.34 },
  { word: "because", p: 0.27 },
  { word: "that", p: 0.21 },
  { word: ".", p: 0.18 },
];

const BARS = ["#22D3EE", "#67E8F9", "#8b74d6", "#A855F7", "#5b6472"];

export default function NextWordDemo() {
  const [picked, setPicked] = useState<string[]>([]);

  const key = picked.join(" ");
  const candidates = TREE[key] ?? FALLBACK;
  const done = picked.length >= 5;

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Interactive · predict → pick → repeat
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {/* the growing sentence */}
        <p className="font-mono text-sm leading-relaxed text-zinc-300">
          {START}{" "}
          {picked.map((w, i) => (
            <span key={i} className="text-ice">
              {w === "." ? "" : " "}
              {w}
            </span>
          ))}
          {!done && <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-cyan align-middle" />}
        </p>

        {!done ? (
          <>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              The model&apos;s next-token list — click one to pick it
            </p>
            <div className="mt-3 space-y-2">
              {candidates.map((c, i) => (
                <button
                  key={c.word}
                  type="button"
                  onClick={() => setPicked((p) => [...p, c.word])}
                  className="group flex w-full items-center gap-3 rounded-lg border border-white/10 px-3 py-2 text-left transition-colors hover:border-cyan/50"
                >
                  <span className="w-24 shrink-0 font-mono text-sm text-zinc-100">
                    {c.word === "." ? "· (end)" : c.word}
                  </span>
                  <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ width: `${c.p * 100}%`, background: BARS[i % BARS.length] }}
                    />
                  </span>
                  <span className="w-12 shrink-0 text-right font-mono text-[11px] tabular-nums text-zinc-500">
                    {(c.p * 100).toFixed(0)}%
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-zinc-500">
              Notice: the top word is likeliest, not certain. A real model
              rolls a weighted dice over this list — that roll is what the
              temperature knob (next chapter) controls.
            </p>
          </>
        ) : (
          <div className="mt-5 rounded-lg border border-cyan/30 bg-cyan/[0.05] p-4">
            <p className="text-sm leading-relaxed text-zinc-200">
              That is the whole mechanic. No plan for the sentence existed —
              you built it one prediction at a time, exactly as a model does,
              just billions of times faster and over a list of ~100,000
              tokens instead of four.
            </p>
            <button
              type="button"
              onClick={() => setPicked([])}
              className="mt-4 rounded-lg bg-gradient-to-r from-cyan to-purple px-5 py-2 text-xs font-medium text-ink"
            >
              Run it again
            </button>
          </div>
        )}
      </div>

      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        A teaching toy — the percentages are illustrative. The loop is exactly real.
      </figcaption>
    </figure>
  );
}
