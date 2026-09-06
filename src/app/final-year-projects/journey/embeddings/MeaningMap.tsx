"use client";

import { useState } from "react";

/**
 * "Give meaning a location." A 2D meaning-map: click a word and its nearest
 * neighbours (by a hand-authored 2D position) light up, with the cosine-ish
 * closeness shown. Not a real embedding space — a faithful 2D shadow of the
 * idea, so students feel "similar meaning = close position".
 */

type Word = { id: string; label: string; x: number; y: number; group: string };

// Positions are hand-placed so meaning-neighbours really are near each other.
const WORDS: Word[] = [
  { id: "king", label: "king", x: 150, y: 70, group: "royalty" },
  { id: "queen", label: "queen", x: 185, y: 95, group: "royalty" },
  { id: "prince", label: "prince", x: 130, y: 110, group: "royalty" },
  { id: "dog", label: "dog", x: 560, y: 90, group: "animal" },
  { id: "puppy", label: "puppy", x: 600, y: 120, group: "animal" },
  { id: "cat", label: "cat", x: 545, y: 135, group: "animal" },
  { id: "pizza", label: "pizza", x: 340, y: 300, group: "food" },
  { id: "pasta", label: "pasta", x: 380, y: 325, group: "food" },
  { id: "burger", label: "burger", x: 300, y: 335, group: "food" },
  { id: "fee", label: "fee deadline", x: 120, y: 300, group: "money" },
  { id: "tuition", label: "tuition due date", x: 160, y: 330, group: "money" },
];

function dist(a: Word, b: Word) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export default function MeaningMap() {
  const [selId, setSelId] = useState<string>("fee");
  const sel = WORDS.find((w) => w.id === selId)!;

  // nearest 2 others
  const ranked = WORDS.filter((w) => w.id !== sel.id)
    .map((w) => ({ w, d: dist(sel, w) }))
    .sort((a, b) => a.d - b.d);
  const near = new Set(ranked.slice(0, 2).map((r) => r.w.id));
  const maxD = 620;

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Interactive · a meaning map — click any word
        </span>
      </div>

      <div className="p-3 sm:p-5">
        <svg viewBox="0 0 720 400" className="h-auto w-full" role="img" aria-label="A 2D map of words where similar meanings sit close together.">
          {/* links from selection to its nearest neighbours */}
          {WORDS.filter((w) => near.has(w.id)).map((w) => (
            <line key={w.id} x1={sel.x} y1={sel.y} x2={w.x} y2={w.y} stroke="#22D3EE" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.7" />
          ))}

          {WORDS.map((w) => {
            const isSel = w.id === sel.id;
            const isNear = near.has(w.id);
            const fill = isSel ? "#22D3EE" : isNear ? "#A855F7" : "#3f3f46";
            return (
              <g
                key={w.id}
                onClick={() => setSelId(w.id)}
                style={{ cursor: "pointer" }}
              >
                <circle cx={w.x} cy={w.y} r={isSel ? 9 : 6} fill={fill} />
                <text
                  x={w.x + 12}
                  y={w.y + 4}
                  fontFamily="monospace"
                  fontSize="12"
                  fill={isSel ? "#67E8F9" : isNear ? "#c4b5fd" : "#71717a"}
                >
                  {w.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="border-t border-white/5 px-5 py-4">
        <p className="text-sm leading-relaxed text-zinc-300">
          <span className="font-mono text-ice">{sel.label}</span> is closest in
          meaning to{" "}
          {ranked.slice(0, 2).map((r, i) => (
            <span key={r.w.id}>
              <span className="font-mono text-purple">{r.w.label}</span>
              {" "}
              <span className="font-mono text-[11px] text-zinc-500">
                (~{(1 - r.d / maxD).toFixed(2)})
              </span>
              {i === 0 ? " and " : ""}
            </span>
          ))}
          . Different words can be near; related words cluster; unrelated ones
          sit far apart.
        </p>
      </div>

      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        A flat 2D shadow of the real idea. Real embeddings use ~1,500 dimensions — same concept, more room.
      </figcaption>
    </figure>
  );
}
