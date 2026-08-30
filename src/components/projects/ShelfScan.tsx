"use client";

import { motion } from "framer-motion";

/** Four shelves, drawn as the rack they represent — front of shelf at the left. */
const ROWS = [
  { y: 58, facings: 7, short: 0 },
  { y: 100, facings: 5, short: 2 },
  { y: 142, facings: 7, short: 0 },
  { y: 184, facings: 3, short: 4 },
];

const X0 = 78;
const GAP = 20;
const BOX = 14;

/**
 * ShelfSight -- a rack being counted.
 *
 * The sweep is the honest part of the story: the detector finds every packet
 * and has no idea what any of them is, so the boxes light up as located rather
 * than identified. The gaps that stay dark are the finding -- two shelves short
 * of their plan, which is the number a person is actually sent to fix.
 */
export default function ShelfScan() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      <defs>
        <linearGradient id="shelf-sweep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
          <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Rack uprights */}
      <rect x="60" y="34" width="4" height="176" rx="2" fill="#3f3f46" />
      <rect x="256" y="34" width="4" height="176" rx="2" fill="#3f3f46" />

      {ROWS.map((row, r) => (
        <g key={`row-${r}`}>
          {/* The deck the packets stand on */}
          <rect x="60" y={row.y + BOX + 3} width="200" height="2.5" rx="1.25" fill="#3f3f46" />

          {Array.from({ length: row.facings + row.short }).map((_, i) => {
            const filled = i < row.facings;
            const x = X0 + i * GAP;
            return filled ? (
              <motion.rect
                key={`f-${r}-${i}`}
                x={x}
                y={row.y}
                width={BOX}
                height={BOX}
                rx="2.5"
                fill="#0b1018"
                stroke="#67E8F9"
                strokeWidth="1.2"
                initial={{ strokeOpacity: 0.18 }}
                animate={{ strokeOpacity: [0.18, 1, 1, 0.18] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  // Each row lights as the sweep reaches it.
                  times: [0, 0.06, 0.55, 0.7],
                  delay: r * 0.28,
                }}
              />
            ) : (
              // A gap the camera found: drawn, never lit.
              <rect
                key={`g-${r}-${i}`}
                x={x}
                y={row.y}
                width={BOX}
                height={BOX}
                rx="2.5"
                fill="none"
                stroke="#52525b"
                strokeWidth="1"
                strokeDasharray="2 3"
                strokeOpacity="0.7"
              />
            );
          })}

          {/* What the row is short by -- the actionable half of the answer */}
          {row.short > 0 ? (
            <motion.text
              x="268"
              y={row.y + 11}
              fill="#A855F7"
              style={{ fontSize: "9px", fontFamily: "var(--font-mono)" }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                times: [0, 0.3, 0.42, 0.72, 0.82],
                delay: r * 0.28,
              }}
            >
              -{row.short}
            </motion.text>
          ) : null}
        </g>
      ))}

      {/* The camera pass */}
      <motion.rect
        x="56"
        width="208"
        height="26"
        fill="url(#shelf-sweep)"
        animate={{ y: [30, 200, 200] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.6, 1] }}
      />

      <text
        x="60"
        y="24"
        fill="#a1a1aa"
        style={{ fontSize: "8px", fontFamily: "var(--font-mono)" }}
      >
        RACK R78
      </text>
      <motion.text
        x="260"
        y="24"
        textAnchor="end"
        fill="#67E8F9"
        style={{ fontSize: "8px", fontFamily: "var(--font-mono)" }}
        animate={{ opacity: [0.35, 1, 1, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.7, 0.85] }}
      >
        22 COUNTED
      </motion.text>
    </svg>
  );
}
