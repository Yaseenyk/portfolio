"use client";

import { useMemo, useState } from "react";

/** Average tokens consumed per request (prompt + completion). */
const TOKENS_PER_REQUEST = 2_000;
/** Frontier model price per 1M tokens (USD). */
const FRONTIER_PRICE_PER_M = 15.0;
/** Flash model price per 1M tokens (USD). */
const FLASH_PRICE_PER_M = 0.075;
/** Of cache misses, share routed to the Flash tier. */
const FLASH_ROUTE_SHARE = 0.8;

const VOLUME_MIN = 10_000;
const VOLUME_MAX = 500_000;
const VOLUME_STEP = 10_000;

const CACHE_MIN = 0;
const CACHE_MAX = 80;
const CACHE_STEP = 5;

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const compact = new Intl.NumberFormat("en-US", { notation: "compact" });

interface CostBreakdown {
  naive: number;
  optimized: number;
  savings: number;
  reductionPct: number;
}

function computeCosts(volume: number, cacheHitPct: number): CostBreakdown {
  const totalTokens = volume * TOKENS_PER_REQUEST;
  const naive = (totalTokens / 1_000_000) * FRONTIER_PRICE_PER_M;

  const missTokens = totalTokens * (1 - cacheHitPct / 100);
  const flashCost =
    ((missTokens * FLASH_ROUTE_SHARE) / 1_000_000) * FLASH_PRICE_PER_M;
  const frontierCost =
    ((missTokens * (1 - FLASH_ROUTE_SHARE)) / 1_000_000) * FRONTIER_PRICE_PER_M;
  const optimized = flashCost + frontierCost;

  const savings = naive - optimized;
  const reductionPct = naive > 0 ? (savings / naive) * 100 : 0;

  return { naive, optimized, savings, reductionPct };
}

const sliderClass =
  "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-800 accent-cyan " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

export default function FinOpsSimulator() {
  const [volume, setVolume] = useState(100_000);
  const [cacheHitPct, setCacheHitPct] = useState(40);

  const { naive, optimized, savings, reductionPct } = useMemo(
    () => computeCosts(volume, cacheHitPct),
    [volume, cacheHitPct],
  );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-ink p-6 sm:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
            FinOps Cost Simulator
          </h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
          Live token economics: naive frontier-only inference vs. a semantic
          cache + model-cascade architecture, at {TOKENS_PER_REQUEST.toLocaleString()}{" "}
          tokens per request.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="flex items-baseline justify-between text-xs uppercase tracking-wider text-zinc-400">
            Monthly Ingestion Volume
            <span className="font-mono text-sm normal-case tracking-normal text-cyan">
              {compact.format(volume)} req
            </span>
          </span>
          <input
            type="range"
            min={VOLUME_MIN}
            max={VOLUME_MAX}
            step={VOLUME_STEP}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Monthly ingestion volume in requests"
            className={`mt-3 ${sliderClass}`}
          />
        </label>

        <label className="block">
          <span className="flex items-baseline justify-between text-xs uppercase tracking-wider text-zinc-400">
            Semantic Cache Hit Rate
            <span className="font-mono text-sm normal-case tracking-normal text-purple">
              {cacheHitPct}%
            </span>
          </span>
          <input
            type="range"
            min={CACHE_MIN}
            max={CACHE_MAX}
            step={CACHE_STEP}
            value={cacheHitPct}
            onChange={(e) => setCacheHitPct(Number(e.target.value))}
            aria-label="Semantic cache hit rate percentage"
            className={`mt-3 ${sliderClass}`}
          />
        </label>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Naive Stack
          </p>
          <p className="mt-2 font-mono text-3xl font-semibold tabular-nums text-zinc-200">
            {usd.format(naive)}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            100% frontier model · ${FRONTIER_PRICE_PER_M.toFixed(2)}/1M tokens
          </p>
        </div>

        <div className="rounded-xl border border-cyan/30 bg-cyan/5 p-5">
          <p className="text-xs uppercase tracking-wider text-cyan">
            Optimized Cascade Stack
          </p>
          <p className="mt-2 font-mono text-3xl font-semibold tabular-nums text-zinc-50">
            {usd.format(optimized)}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            Cache hits free · {Math.round(FLASH_ROUTE_SHARE * 100)}% of misses →
            Flash (${FLASH_PRICE_PER_M}/1M) · {Math.round((1 - FLASH_ROUTE_SHARE) * 100)}%
            → Frontier
          </p>
        </div>
      </div>

      <div
        role="status"
        className="mt-6 flex flex-col gap-1 rounded-xl border border-purple/30 bg-gradient-to-r from-purple/10 to-cyan/10 p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-400">
            Monthly Savings
          </p>
          <p className="font-mono text-2xl font-semibold tabular-nums text-ice">
            {usd.format(savings)}
          </p>
        </div>
        <p className="font-mono text-sm text-zinc-300">
          <span className="text-purple">▼ {reductionPct.toFixed(1)}%</span>{" "}
          infrastructure deficit reduction
        </p>
      </div>
    </div>
  );
}
