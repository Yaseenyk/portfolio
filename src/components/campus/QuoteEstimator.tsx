"use client";

import { useState } from "react";
import { CUSTOM_BUILD_RANGE, formatInr, whatsappHref } from "@/lib/campus";
import { track } from "@/lib/analytics";

const TYPES = ["Web app (MERN)", "AI / ML", "Mobile app", "Something else"] as const;
const COMPLEXITY = ["Simple", "Standard", "Advanced"] as const;
const TIMELINE = ["8+ weeks", "4-8 weeks", "Under 4 weeks"] as const;

type Type = (typeof TYPES)[number];
type Complexity = (typeof COMPLEXITY)[number];
type Timeline = (typeof TIMELINE)[number];

const BASE: Record<Complexity, [number, number]> = {
  Simple: [10000, 16000],
  Standard: [16000, 30000],
  Advanced: [30000, 48000],
};

/** Honest estimate within the real custom-build band; final quote is on a call. */
function estimate(type: Type, complexity: Complexity, timeline: Timeline): [number, number] {
  const typeFactor = type === "AI / ML" ? 1.15 : type === "Mobile app" ? 1.05 : 1;
  const timeFactor = timeline === "Under 4 weeks" ? 1.15 : timeline === "8+ weeks" ? 0.95 : 1;
  const round = (n: number) => Math.round(n / 500) * 500;
  const clamp = (n: number) =>
    Math.min(CUSTOM_BUILD_RANGE.max, Math.max(CUSTOM_BUILD_RANGE.min, n));
  const [lo, hi] = BASE[complexity];
  return [round(clamp(lo * typeFactor * timeFactor)), round(clamp(hi * typeFactor * timeFactor))];
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <span className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`rounded-lg border px-4 py-2.5 text-sm transition-colors duration-200 ${
              value === opt
                ? "border-cyan/60 bg-cyan/10 text-ice"
                : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-cyan/40 hover:text-zinc-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function QuoteEstimator() {
  const [type, setType] = useState<Type>("Web app (MERN)");
  const [complexity, setComplexity] = useState<Complexity>("Standard");
  const [timeline, setTimeline] = useState<Timeline>("4-8 weeks");

  const [lo, hi] = estimate(type, complexity, timeline);

  const wa = whatsappHref(
    `Hi Yaseen, I used the cost estimator — a ${complexity.toLowerCase()} ${type} project with ${timeline} left. ` +
      `It showed roughly ${formatInr(lo)}-${formatInr(hi)}. Can we confirm a quote and a plan?`,
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <div className="space-y-6">
        <Segmented label="Project type" options={TYPES} value={type} onChange={setType} />
        <Segmented
          label="Complexity"
          options={COMPLEXITY}
          value={complexity}
          onChange={setComplexity}
        />
        <Segmented
          label="Time you have"
          options={TIMELINE}
          value={timeline}
          onChange={setTimeline}
        />
      </div>

      <div className="mt-8 rounded-xl border border-cyan/30 bg-cyan/[0.04] p-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
          Estimated range
        </p>
        <p className="mt-2 font-mono text-3xl tabular-nums text-zinc-50 sm:text-4xl">
          {formatInr(lo)} <span className="text-zinc-500">–</span> {formatInr(hi)}
        </p>
        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-zinc-500">
          A ballpark for a custom build — split across monthly installments. The
          real quote is fixed on a free 15-minute call once we pin the scope.
        </p>
      </div>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("fyp-estimator-lock")}
        className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-[#04220F] transition-transform duration-200 hover:scale-[1.02]"
      >
        Lock this quote on WhatsApp
      </a>
    </div>
  );
}
