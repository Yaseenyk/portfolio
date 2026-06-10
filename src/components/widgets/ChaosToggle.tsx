"use client";

import { useEffect, useState } from "react";

type Phase = "healthy" | "hanging" | "timeout" | "retrying" | "fallback";

/** How long the synthetic request hangs before the 504 fires. */
const HANG_MS = 3_500;
/** How long the raw 504 is shown before the recovery loop kicks in. */
const TIMEOUT_HOLD_MS = 900;
/** Exponential backoff schedule between failed attempts. */
const BACKOFF_MS = [1_000, 2_000] as const;
const MAX_ATTEMPTS = 3;
/** Pause after the final failure before switching to the cache. */
const FALLBACK_SWITCH_MS = 1_200;

const HEALTHY_BASE_LATENCY_MS = 120;

type Tone = "ok" | "warn" | "error" | "info";

interface TelemetryLine {
  text: string;
  tone: Tone;
}

const toneClass: Record<Tone, string> = {
  ok: "text-emerald-400",
  warn: "text-amber-400",
  error: "text-red-400",
  info: "text-ice",
};

const dotClass: Record<Phase, string> = {
  healthy: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse",
  hanging: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse",
  timeout: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
  retrying: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse",
  fallback: "bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse",
};

const phaseLabel: Record<Phase, string> = {
  healthy: "LIVE · UPSTREAM HEALTHY",
  hanging: "DEGRADED · AWAITING UPSTREAM",
  timeout: "FAILED · GATEWAY TIMEOUT",
  retrying: "RECOVERING · EXPONENTIAL BACKOFF",
  fallback: "STABLE · LOCAL FALLBACK CACHE",
};

function buildLines(
  phase: Phase,
  attempt: number,
  latencyMs: number,
  elapsedMs: number,
): TelemetryLine[] {
  switch (phase) {
    case "healthy":
      return [
        { text: `GET /api/inference → 200 OK · ${latencyMs}ms`, tone: "ok" },
        { text: "stream: telemetry packets flowing", tone: "info" },
      ];
    case "hanging":
      return [
        {
          text: `GET /api/inference → … awaiting response (${(elapsedMs / 1000).toFixed(1)}s)`,
          tone: "warn",
        },
        { text: "upstream saturated · injected fault active", tone: "warn" },
      ];
    case "timeout":
      return [
        { text: "GET /api/inference → 504 Gateway Timeout", tone: "error" },
        { text: "circuit breaker tripped · entering recovery", tone: "warn" },
      ];
    case "retrying": {
      const lines: TelemetryLine[] = [
        { text: "GET /api/inference → 504 Gateway Timeout", tone: "error" },
      ];
      for (let i = 1; i <= attempt; i++) {
        lines.push(
          i < MAX_ATTEMPTS
            ? {
                text: `Attempt ${i} failed. Retrying in ${BACKOFF_MS[i - 1]! / 1000}s...`,
                tone: "warn",
              }
            : {
                text: `Attempt ${MAX_ATTEMPTS} failed. Switching to Local Fallback Cache...`,
                tone: "info",
              },
        );
      }
      return lines;
    }
    case "fallback":
      return [
        { text: "GET /api/inference → 200 OK (cache) · 0ms network", tone: "ok" },
        {
          text: "serving Local Fallback Cache · stale-while-revalidate",
          tone: "info",
        },
        { text: "degraded gracefully · zero user-facing errors", tone: "info" },
      ];
  }
}

export default function ChaosToggle() {
  const [phase, setPhase] = useState<Phase>("healthy");
  const [attempt, setAttempt] = useState(0);
  const [latencyMs, setLatencyMs] = useState(HEALTHY_BASE_LATENCY_MS);
  const [elapsedMs, setElapsedMs] = useState(0);

  const chaosOn = phase !== "healthy";

  // Drives the failure → recovery state machine; every timer is cleared on
  // phase change or unmount.
  useEffect(() => {
    if (phase === "hanging") {
      const t = setTimeout(() => setPhase("timeout"), HANG_MS);
      return () => clearTimeout(t);
    }
    if (phase === "timeout") {
      const t = setTimeout(() => {
        setAttempt(1);
        setPhase("retrying");
      }, TIMEOUT_HOLD_MS);
      return () => clearTimeout(t);
    }
    if (phase === "retrying") {
      if (attempt < MAX_ATTEMPTS) {
        const t = setTimeout(
          () => setAttempt((a) => a + 1),
          BACKOFF_MS[attempt - 1],
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("fallback"), FALLBACK_SWITCH_MS);
      return () => clearTimeout(t);
    }
  }, [phase, attempt]);

  // Healthy-state latency jitter. Runs only after hydration, so SSR markup
  // stays deterministic at the base latency.
  useEffect(() => {
    if (phase !== "healthy") return;
    const id = setInterval(() => {
      setLatencyMs(HEALTHY_BASE_LATENCY_MS - 20 + Math.round(Math.random() * 40));
    }, 1_200);
    return () => clearInterval(id);
  }, [phase]);

  // Elapsed-time counter while the synthetic request hangs.
  useEffect(() => {
    if (phase !== "hanging") return;
    setElapsedMs(0);
    const id = setInterval(() => setElapsedMs((e) => e + 100), 100);
    return () => clearInterval(id);
  }, [phase]);

  const toggleChaos = () => {
    if (chaosOn) {
      setPhase("healthy");
      setAttempt(0);
      setLatencyMs(HEALTHY_BASE_LATENCY_MS);
    } else {
      setPhase("hanging");
    }
  };

  const lines = buildLines(phase, attempt, latencyMs, elapsedMs);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-ink p-6 sm:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-purple shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
            Chaos Engineering Degrader
          </h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
          Inject a synthetic upstream failure and watch the client degrade
          gracefully: timeout → exponential backoff → local fallback cache. No
          crash, no blank screen.
        </p>
      </div>

      <button
        type="button"
        onClick={toggleChaos}
        aria-pressed={chaosOn}
        className={
          chaosOn
            ? "w-full animate-pulse rounded-xl border border-red-500/60 bg-red-500/10 px-5 py-3 font-mono text-sm font-semibold tracking-wider text-red-400 transition-colors hover:bg-red-500/20 sm:w-auto"
            : "w-full rounded-xl border border-zinc-700 bg-zinc-900/60 px-5 py-3 font-mono text-sm font-semibold tracking-wider text-zinc-200 transition-colors hover:border-cyan/50 hover:text-cyan sm:w-auto"
        }
      >
        {chaosOn ? "▲ CHAOS ACTIVE — CLICK TO RESTORE" : "▸ INJECT CHAOS"}
      </button>

      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
            <span className={`h-2 w-2 rounded-full ${dotClass[phase]}`} />
            {phaseLabel[phase]}
          </span>
          <span className="font-mono text-[11px] text-zinc-600">
            live telemetry
          </span>
        </div>
        <div
          role="log"
          aria-live="polite"
          className="min-h-[7.5rem] space-y-1.5 px-4 py-4 font-mono text-xs leading-relaxed"
        >
          {lines.map((line, i) => (
            <p key={`${phase}-${i}`} className={toneClass[line.tone]}>
              <span className="mr-2 select-none text-zinc-600">›</span>
              {line.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
