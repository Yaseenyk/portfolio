"use client";

import { motion } from "framer-motion";
import Signal from "../Signal";

const BARS = [
  { label: "CPU Load", peak: 0.85, delay: 0 },
  { label: "Chat Velocity", peak: 0.62, delay: 0.4 },
  { label: "OBS Sync", peak: 0.95, delay: 0.8 },
];

/** streamerOS — a live "system telemetry" dashboard of pulsing progress bars. */
export default function SystemTelemetry() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-5 p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          system telemetry
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ice">
          <Signal />
          live
        </span>
      </div>

      {BARS.map((b) => (
        <div key={b.label}>
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            {b.label}
          </span>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800/80">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-cyan to-purple shadow-[0_0_10px_0_rgba(34,211,238,0.5)]"
              animate={{ scaleX: [0.2, b.peak, 0.5, b.peak * 0.9, 0.3] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: b.delay,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
