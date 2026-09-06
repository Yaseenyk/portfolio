"use client";

import { useState } from "react";

/**
 * "Turn the dial and watch the same prompt change character." A slider from 0
 * to 1.5 that swaps a canned answer per band — honest imitation of what
 * temperature does to output character, without calling a model. Same prompt,
 * three temperaments.
 */

const PROMPT = "Write one line to announce the college fest.";

const BANDS: { max: number; label: string; tone: string; answer: string }[] = [
  {
    max: 0.3,
    label: "low · focused & repeatable",
    tone: "Same safe answer every time. Great for facts, JSON, code.",
    answer: "The college fest will be held next week. All students are invited to attend.",
  },
  {
    max: 0.8,
    label: "medium · balanced",
    tone: "A little life, still on the rails. A sensible default for most writing.",
    answer: "Get ready — the college fest is back next week, and everyone's invited to join the fun.",
  },
  {
    max: 1.2,
    label: "high · creative & varied",
    tone: "Surprising and punchy. Good for brainstorming, risky for anything factual.",
    answer: "Lights, music, chaos, chai — the fest lands next week and campus will never be the same.",
  },
  {
    max: 2,
    label: "very high · unhinged",
    tone: "Off the rails. Novelty wins over sense — rarely what you want in real software.",
    answer: "FEST!! neon nights, surprise everything, bring your wildest self — reality optional, legends only ✨",
  },
];

function bandFor(t: number) {
  return BANDS.find((b) => t <= b.max) ?? BANDS[BANDS.length - 1];
}

export default function TemperatureDemo() {
  const [t, setT] = useState(0.2);
  const band = bandFor(t);

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Interactive · one prompt, turn the temperature
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <p className="font-mono text-xs text-zinc-500">
          system + user prompt (fixed):
        </p>
        <p className="mt-1 font-mono text-sm text-zinc-300">&ldquo;{PROMPT}&rdquo;</p>

        {/* the dial */}
        <div className="mt-6 flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
            temp
          </span>
          <input
            type="range"
            min={0}
            max={1.5}
            step={0.1}
            value={t}
            onChange={(e) => setT(parseFloat(e.target.value))}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan"
            aria-label="Temperature"
          />
          <span className="w-10 text-right font-mono text-sm tabular-nums text-ice">
            {t.toFixed(1)}
          </span>
        </div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-cyan">
          {band.label}
        </p>

        {/* the output */}
        <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <p className="text-sm leading-relaxed text-zinc-100">{band.answer}</p>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-zinc-500">{band.tone}</p>
      </div>

      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        A teaching toy — real answers vary more. The direction is exactly right: low = safe, high = wild.
      </figcaption>
    </figure>
  );
}
