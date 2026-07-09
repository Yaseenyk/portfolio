"use client";

import { useEffect, useState } from "react";
import { onCLS, onINP, onLCP, type Metric } from "web-vitals";

interface Vital {
  value: number | null;
  format: (v: number) => string;
  good: number;
  poor: number;
  hint: string;
}

const INITIAL: Record<string, Vital> = {
  LCP: {
    value: null,
    format: (v) => `${(v / 1000).toFixed(2)}s`,
    good: 2500,
    poor: 4000,
    hint: "largest contentful paint",
  },
  CLS: {
    value: null,
    format: (v) => v.toFixed(3),
    good: 0.1,
    poor: 0.25,
    hint: "cumulative layout shift",
  },
  INP: {
    value: null,
    format: (v) => `${Math.round(v)}ms`,
    good: 200,
    poor: 500,
    hint: "interaction to next paint",
  },
};

function tone(v: Vital): string {
  if (v.value === null) return "text-zinc-600";
  if (v.value <= v.good) return "text-emerald-400";
  if (v.value <= v.poor) return "text-amber-400";
  return "text-red-400";
}

/** This page's real Core Web Vitals, measured in the visitor's own browser.
 *  No lab scores, no caveats — the metrics Google actually ranks with. */
export default function WebVitalsPanel() {
  const [vitals, setVitals] = useState(INITIAL);

  useEffect(() => {
    const report = (m: Metric) =>
      setVitals((prev) => ({
        ...prev,
        [m.name]: { ...prev[m.name], value: m.value },
      }));
    onLCP(report, { reportAllChanges: true });
    onCLS(report, { reportAllChanges: true });
    onINP(report, { reportAllChanges: true });
  }, []);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
          Core Web Vitals — this page, your browser
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
          ● measured live via the web-vitals library
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">
        {Object.entries(vitals).map(([name, v]) => (
          <div
            key={name}
            className="rounded-xl border border-zinc-800/60 bg-white/[0.02] p-4 text-center"
          >
            <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              {name}
            </div>
            <div className={`mt-1 text-2xl font-semibold tracking-tight ${tone(v)}`}>
              {v.value === null ? "—" : v.format(v.value)}
            </div>
            <div className="mt-1 hidden font-mono text-[9px] text-zinc-600 sm:block">
              {v.value === null && name === "INP" ? "interact to measure" : v.hint}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        Green thresholds are Google&apos;s own (LCP ≤ 2.5s · CLS ≤ 0.1 · INP ≤
        200ms). If you&apos;re seeing green on a page running three interactive
        simulations, that&apos;s the performance engineering working.
      </p>
    </div>
  );
}
