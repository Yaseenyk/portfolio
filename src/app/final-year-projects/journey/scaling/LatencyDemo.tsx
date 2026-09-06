"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "The timeout problem." Three modes of handling a slow (simulated) model
 * call — wait, stream, async — run as a little animated timeline so students
 * feel the difference in perceived responsiveness. No real network.
 */

type Mode = "wait" | "stream" | "async";

const MODES: { key: Mode; label: string; blurb: string }[] = [
  { key: "wait", label: "Wait for it", blurb: "Backend holds the request until the whole answer is ready. The user stares at a spinner — and long jobs hit the connection timeout." },
  { key: "stream", label: "Stream it", blurb: "Tokens paint as they arrive. Same total time, but it feels instant because something starts immediately." },
  { key: "async", label: "Do it async", blurb: "Reply “working on it” at once; a background worker finishes and notifies. Nothing waits, nothing times out — right for truly long jobs." },
];

export default function LatencyDemo() {
  const [mode, setMode] = useState<Mode>("wait");
  const [t, setT] = useState(0); // 0..100
  const raf = useRef<number | null>(null);

  useEffect(() => {
    setT(0);
    const start = performance.now();
    const dur = 2600;
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / dur) * 100);
      setT(p);
      if (p < 100) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [mode]);

  // What the user sees at progress t, per mode.
  const userState = () => {
    if (mode === "wait") return t < 100 ? "⏳ spinner… (frozen-feeling)" : "answer appears, all at once";
    if (mode === "stream") return t < 8 ? "…" : `answer, ${Math.floor(t / 100 * 40)} words so far →`;
    return t < 6 ? "submitting…" : "✓ “Working on it — ticket #4213.” (instant)";
  };

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Interactive · one slow model call, three ways to handle it
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setMode(m.key)}
              className={`rounded-lg border px-3.5 py-2 text-xs transition-colors ${mode === m.key ? "border-cyan/60 bg-cyan/10 text-ice" : "border-white/10 text-zinc-400 hover:border-cyan/40"}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* the model work bar */}
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">model doing the work</p>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan to-purple transition-none" style={{ width: `${t}%` }} />
        </div>

        {/* what the user sees */}
        <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">what the user sees</p>
          <p className={`mt-2 font-mono text-sm ${mode === "wait" && t < 100 ? "text-red-300" : "text-ice"}`}>
            {userState()}
          </p>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-zinc-500">{MODES.find((m) => m.key === mode)!.blurb}</p>
      </div>

      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        The work takes the same time in all three. What changes is whether the user — and the connection — can bear the wait.
      </figcaption>
    </figure>
  );
}
