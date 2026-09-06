"use client";

import { useState } from "react";

/**
 * "Grade the two halves separately." A small golden-set run: each row shows a
 * question, whether retrieval found the right source, and whether the answer
 * was correct — so the pass/fail split between the two is visible. Toggle a
 * "prompt change" to see answer-quality move while retrieval stays fixed.
 */

type Row = {
  q: string;
  retrieved: boolean;
  answerBefore: boolean;
  answerAfter: boolean;
};

const ROWS: Row[] = [
  { q: "When is the fee due?", retrieved: true, answerBefore: true, answerAfter: true },
  { q: "How much is the late fee?", retrieved: true, answerBefore: false, answerAfter: true },
  { q: "Who do I contact for scholarships?", retrieved: true, answerBefore: true, answerAfter: true },
  { q: "What's the WiFi password?", retrieved: false, answerBefore: false, answerAfter: false },
  { q: "Refund policy for hostel?", retrieved: true, answerBefore: false, answerAfter: true },
];

function Pill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] ${ok ? "bg-cyan/10 text-cyan" : "bg-red-500/10 text-red-300"}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-cyan" : "bg-red-400"}`} />
      {label}
    </span>
  );
}

export default function GradeDemo() {
  const [after, setAfter] = useState(false);
  const answerOf = (r: Row) => (after ? r.answerAfter : r.answerBefore);

  const retrievalScore = Math.round((ROWS.filter((r) => r.retrieved).length / ROWS.length) * 100);
  const answerScore = Math.round((ROWS.filter((r) => answerOf(r)).length / ROWS.length) * 100);

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Interactive · a golden-set run, graded in two halves
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="space-y-2">
          {ROWS.map((r) => (
            <div key={r.q} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
              <span className="text-xs text-zinc-300">{r.q}</span>
              <span className="flex gap-2">
                <Pill ok={r.retrieved} label={r.retrieved ? "retrieved" : "missed"} />
                <Pill ok={answerOf(r)} label={answerOf(r) ? "answer ✓" : "answer ✗"} />
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <div className="rounded-lg border border-cyan/25 bg-cyan/[0.04] px-4 py-2 font-mono text-xs text-ice">
            retrieval: {retrievalScore}%
          </div>
          <div className="rounded-lg border border-purple/25 bg-purple/[0.05] px-4 py-2 font-mono text-xs text-purple">
            answer: {answerScore}%
          </div>
          <button
            type="button"
            onClick={() => setAfter((v) => !v)}
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-4 py-2 text-xs font-medium text-ink"
          >
            {after ? "← revert the prompt change" : "apply a prompt improvement →"}
          </button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-zinc-500">
          Notice: the prompt change lifts <span className="text-purple">answer quality</span> from 40% to 80%,
          while <span className="text-ice">retrieval</span> stays flat at 80% — it was never the problem. The
          WiFi question <em>should</em> miss retrieval and refuse; that is a correct refusal, not a failure.
          Two numbers tell you exactly what to fix next.
        </p>
      </div>

      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        Illustrative. The discipline is exact: measure the two halves apart, change one thing, re-measure.
      </figcaption>
    </figure>
  );
}
