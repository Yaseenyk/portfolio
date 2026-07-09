"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Span {
  name: string;
  detail: string;
  start: number;
  duration: number;
  color: string;
}

// Modeled on real production trace shapes; jitter keeps replays alive.
function coldSpans(): Span[] {
  const j = (base: number, spread: number) =>
    Math.round(base + (Math.random() - 0.5) * spread);
  const embed = j(14, 6);
  const search = j(44, 14);
  const rerank = j(86, 18);
  const guard = j(9, 4);
  const generate = j(610, 120);
  let t = 0;
  const mk = (name: string, detail: string, duration: number, color: string) => {
    const s = { name, detail, start: t, duration, color };
    t += duration;
    return s;
  };
  return [
    mk("embed query", "text-embedding · 768d", embed, "#67E8F9"),
    mk("vector search", "HNSW · top-k=12", search, "#22D3EE"),
    mk("rerank", "cross-encoder · 12 → 3 chunks", rerank, "#A855F7"),
    mk("guardrail check", "grounding contract · passed", guard, "#34D399"),
    mk("generate", "streaming · first token @ ~90ms", generate, "#F4F1EA"),
  ];
}

function cachedSpans(): Span[] {
  const embed = Math.round(13 + Math.random() * 4);
  const lookup = Math.round(5 + Math.random() * 3);
  return [
    { name: "embed query", detail: "text-embedding · 768d", start: 0, duration: embed, color: "#67E8F9" },
    { name: "semantic cache", detail: `cosine 0.9${Math.floor(Math.random() * 3) + 4} ≥ 0.92 → HIT`, start: embed, duration: lookup, color: "#34D399" },
    { name: "return cached", detail: "guardrail-approved answer", start: embed + lookup, duration: 2, color: "#F4F1EA" },
  ];
}

export default function RagTraceWaterfall() {
  const [cache, setCache] = useState(false);
  const [spans, setSpans] = useState<Span[]>([]);
  const [visible, setVisible] = useState(0);
  const [running, setRunning] = useState(false);
  const timers = useRef<number[]>([]);

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const next = cache ? cachedSpans() : coldSpans();
    setSpans(next);
    setVisible(0);
    setRunning(true);
    next.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setVisible(i + 1);
          if (i === next.length - 1) setRunning(false);
        }, 260 * (i + 1)),
      );
    });
  }, [cache]);

  const total = spans.length
    ? spans[spans.length - 1].start + spans[spans.length - 1].duration
    : 0;
  const scale = Math.max(total, 1);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
          RAG query — trace waterfall
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          modeled on production trace shapes
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={run}
          className="rounded-lg bg-cyan px-4 py-2 font-mono text-xs font-semibold text-ink shadow-[0_0_18px_-4px_rgba(34,211,238,0.7)] transition-shadow hover:shadow-[0_0_24px_-2px_rgba(34,211,238,0.8)]"
        >
          {running ? "tracing…" : "▶ run query"}
        </button>
        <label className="flex cursor-pointer items-center gap-2 font-mono text-xs text-zinc-400">
          <button
            type="button"
            role="switch"
            aria-checked={cache}
            onClick={() => setCache((c) => !c)}
            className={`flex h-5 w-9 shrink-0 items-center rounded-full px-0.5 transition-colors ${
              cache ? "justify-end bg-cyan" : "justify-start bg-zinc-700"
            }`}
          >
            <span className="h-4 w-4 rounded-full bg-white" />
          </button>
          semantic cache
        </label>
        <span className="font-mono text-[11px] text-zinc-600">
          &quot;What is Yaseen&apos;s tech stack?&quot;
        </span>
      </div>

      <div className="mt-6 min-h-[200px] space-y-2.5">
        {spans.length === 0 && (
          <p className="pt-10 text-center font-mono text-xs text-zinc-600">
            run the query — with the cache off, then on — and compare the totals
          </p>
        )}
        {spans.slice(0, visible).map((s) => (
          <div key={s.name} className="flex items-center gap-3">
            <span className="w-32 shrink-0 truncate text-right font-mono text-[11px] text-zinc-400">
              {s.name}
            </span>
            <div className="relative h-6 flex-1">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="absolute top-0 flex h-full origin-left items-center rounded px-2"
                style={{
                  left: `${(s.start / scale) * 100}%`,
                  width: `${Math.max((s.duration / scale) * 100, 4)}%`,
                  background: `${s.color}22`,
                  border: `1px solid ${s.color}66`,
                }}
              >
                <span className="truncate font-mono text-[10px]" style={{ color: s.color }}>
                  {s.duration}ms
                </span>
              </motion.div>
            </div>
            <span className="hidden w-56 shrink-0 truncate font-mono text-[10px] text-zinc-600 lg:block">
              {s.detail}
            </span>
          </div>
        ))}
      </div>

      {!running && spans.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/70 pt-4">
          <p className="text-xs leading-relaxed text-zinc-500">
            {cache
              ? "A paraphrased repeat never reaches the model — the vector cache serves the guardrail-approved answer."
              : "The cold path pays every stage. Now flip the semantic cache on and run it again."}
          </p>
          <div className="text-right">
            <div className="text-2xl font-semibold tracking-tight text-zinc-50">
              {total}ms
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              total latency
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
