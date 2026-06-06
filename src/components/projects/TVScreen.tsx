"use client";

import { motion } from "framer-motion";

/** Cross-Platform TV — a wireframe TV whose skeleton resolves into a dashboard UI. */
export default function TVScreen() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-full max-w-xs">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-zinc-700 bg-ink">
          {/* Skeleton (loading) layer */}
          <div className="absolute inset-0 space-y-2 p-3">
            <div className="h-3 w-1/3 rounded bg-zinc-800" />
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-9 rounded bg-zinc-800" />
              ))}
            </div>
            <div className="h-10 rounded bg-zinc-800" />
          </div>

          {/* Resolved dashboard, revealed by a left-to-right wipe */}
          <motion.div
            className="absolute inset-0 space-y-2 bg-ink p-3"
            animate={{
              clipPath: [
                "inset(0 100% 0 0)",
                "inset(0 0% 0 0)",
                "inset(0 0% 0 0)",
                "inset(0 100% 0 0)",
              ],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.4, 0.8, 1],
            }}
          >
            <div className="h-3 w-1/3 rounded bg-gradient-to-r from-cyan to-purple" />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-9 rounded border border-cyan/40 bg-cyan/25" />
              <div className="h-9 rounded border border-purple/40 bg-purple/25" />
              <div className="h-9 rounded border border-ice/40 bg-ice/25" />
            </div>
            <div className="h-10 rounded border border-zinc-700 bg-gradient-to-r from-cyan/20 to-purple/20" />
          </motion.div>

          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-ice/20 to-transparent"
            animate={{ left: ["-20%", "120%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Stand */}
        <div className="mx-auto mt-2 h-3 w-14 rounded-b bg-zinc-700" />
        <div className="mx-auto h-1 w-24 rounded bg-zinc-700" />
      </div>
    </div>
  );
}
