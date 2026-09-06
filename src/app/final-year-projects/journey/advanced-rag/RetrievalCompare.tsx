"use client";

import { useState } from "react";

/**
 * "Basic vs advanced retrieval." One lazy query; toggle between naive vector
 * search (right chunk buried or missing) and the advanced pipeline (expanded
 * query + hybrid + re-rank surfaces it to the top). Illustrative ranking.
 */

const RESULTS = {
  basic: [
    { text: "Cultural fest schedule for the week.", hit: false },
    { text: "Hostel mess timings updated.", hit: false },
    { text: "Library reading-room hours extended.", hit: false },
    { text: "Last date for tuition fee payment is Friday 14th.", hit: true },
  ],
  advanced: [
    { text: "Last date for tuition fee payment is Friday 14th.", hit: true },
    { text: "Late fee of ₹500 applies after the 14th.", hit: true },
    { text: "Scholarship students: fee waiver form due same day.", hit: true },
  ],
};

export default function RetrievalCompare() {
  const [mode, setMode] = useState<"basic" | "advanced">("basic");
  const rows = RESULTS[mode];

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Interactive · the same lazy query, two retrieval pipelines
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <p className="font-mono text-sm text-zinc-300">
          user asks: <span className="text-ice">&ldquo;fees?&rdquo;</span>
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode("basic")}
            className={`rounded-lg border px-3.5 py-2 text-xs transition-colors ${mode === "basic" ? "border-cyan/60 bg-cyan/10 text-ice" : "border-white/10 text-zinc-400 hover:border-cyan/40"}`}
          >
            Basic vector search
          </button>
          <button
            type="button"
            onClick={() => setMode("advanced")}
            className={`rounded-lg border px-3.5 py-2 text-xs transition-colors ${mode === "advanced" ? "border-cyan/60 bg-cyan/10 text-ice" : "border-white/10 text-zinc-400 hover:border-cyan/40"}`}
          >
            + expand · hybrid · re-rank
          </button>
        </div>

        <div className="mt-5 space-y-2">
          {rows.map((r, i) => (
            <div
              key={r.text}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${r.hit ? "border-cyan/30 bg-cyan/[0.05]" : "border-white/10 bg-white/[0.02]"}`}
            >
              <span className="font-mono text-[11px] text-zinc-500">#{i + 1}</span>
              <span className={`flex-1 text-xs ${r.hit ? "text-zinc-100" : "text-zinc-500"}`}>
                {r.text}
              </span>
              {r.hit && <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-cyan">relevant</span>}
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs leading-relaxed text-zinc-500">
          {mode === "basic"
            ? "The lazy query “fees?” embeds weakly, so the one relevant notice barely scrapes in at #4 — and if you only send the top 3 to the model (to save tokens), it never sees the answer at all."
            : "Query expansion turned “fees?” into a full question, hybrid search caught the exact match, and re-ranking floated the fee notices to the top. The model now gets exactly the right context."}
        </p>
      </div>

      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        Same model, same documents — only the retrieval changed. That is where most RAG quality lives.
      </figcaption>
    </figure>
  );
}
