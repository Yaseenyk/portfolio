"use client";

import { useState } from "react";

/**
 * "Keyword vs semantic search — feel it." Pick a query; see which notices
 * keyword search (shared words) returns vs what semantic search (meaning)
 * returns. Hand-authored matches — a faithful demo of why meaning wins.
 */

const NOTICES = [
  { id: "n1", text: "Last date for tuition payment is Friday 14th." },
  { id: "n2", text: "Cultural fest auditions open in the main auditorium." },
  { id: "n3", text: "Hostel mess menu revised from next week." },
  { id: "n4", text: "Scholarship application window closes this month." },
  { id: "n5", text: "Library fine waiver available till Sunday." },
];

type Q = {
  label: string;
  keyword: string[]; // notice ids a letter-matcher would return
  semantic: string[]; // notice ids a meaning-matcher would return
  note: string;
};

const QUERIES: Q[] = [
  {
    label: "fee deadline",
    keyword: [], // no notice contains "fee" or "deadline"
    semantic: ["n1", "n4"],
    note: "Keyword search finds NOTHING — not one notice contains the words “fee” or “deadline”. Semantic search surfaces the tuition-payment and scholarship notices, because it matches meaning, not letters.",
  },
  {
    label: "money I owe the college",
    keyword: [],
    semantic: ["n1", "n5"],
    note: "Again zero keyword hits. Semantic search understands “money I owe” covers a tuition payment and a library fine.",
  },
  {
    label: "library",
    keyword: ["n5"],
    semantic: ["n5"],
    note: "When the exact word IS present, both agree. Keyword search is perfect for precise, known terms — it is meaning-blind queries where it fails.",
  },
];

export default function SearchCompare() {
  const [qi, setQi] = useState(0);
  const q = QUERIES[qi]!;
  const notice = (id: string) => NOTICES.find((n) => n.id === id)!.text;

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Interactive · the same search, two ways
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          search the notice board for
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {QUERIES.map((query, i) => (
            <button
              key={query.label}
              type="button"
              onClick={() => setQi(i)}
              className={`rounded-lg border px-3.5 py-2 font-mono text-xs transition-colors duration-200 ${
                qi === i ? "border-cyan/60 bg-cyan/10 text-ice" : "border-white/10 text-zinc-400 hover:border-cyan/40"
              }`}
            >
              &ldquo;{query.label}&rdquo;
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* keyword column */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              keyword search · matches letters
            </p>
            <div className="mt-3 space-y-2">
              {q.keyword.length === 0 ? (
                <p className="rounded-lg border border-red-500/30 bg-red-500/[0.04] px-3 py-2 text-xs text-red-300">
                  No results — no shared words.
                </p>
              ) : (
                q.keyword.map((id) => (
                  <p key={id} className="rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-300">
                    {notice(id)}
                  </p>
                ))
              )}
            </div>
          </div>
          {/* semantic column */}
          <div className="rounded-xl border border-cyan/25 bg-cyan/[0.03] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
              semantic search · matches meaning
            </p>
            <div className="mt-3 space-y-2">
              {q.semantic.map((id) => (
                <p key={id} className="rounded-lg border border-cyan/20 bg-cyan/[0.04] px-3 py-2 text-xs text-zinc-200">
                  {notice(id)}
                </p>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-zinc-500">{q.note}</p>
      </div>

      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        Matches are illustrative. The lesson is exact: letters vs meaning, and why humans need meaning.
      </figcaption>
    </figure>
  );
}
