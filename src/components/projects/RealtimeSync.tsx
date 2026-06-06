"use client";

import { motion } from "framer-motion";

const CENTER = { x: 160, y: 120 };
const SATELLITES = [
  { x: 55, y: 55 },
  { x: 265, y: 55 },
  { x: 40, y: 135 },
  { x: 280, y: 135 },
  { x: 90, y: 205 },
  { x: 235, y: 205 },
];

/** CMZ App — a central server broadcasting real-time data packets to user nodes. */
export default function RealtimeSync() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      <defs>
        <radialGradient id="cmz-core">
          <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
        </radialGradient>
      </defs>

      {SATELLITES.map((s, i) => (
        <line
          key={`l-${i}`}
          x1={CENTER.x}
          y1={CENTER.y}
          x2={s.x}
          y2={s.y}
          stroke="#3f3f46"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      ))}

      {SATELLITES.map((s, i) => (
        <motion.circle
          key={`p-${i}`}
          r="2.6"
          fill="#67E8F9"
          animate={{ cx: [CENTER.x, s.x], cy: [CENTER.y, s.y], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.18,
          }}
        />
      ))}

      {SATELLITES.map((s, i) => (
        <motion.circle
          key={`s-${i}`}
          cx={s.x}
          cy={s.y}
          r="8"
          fill="#0b1018"
          stroke="#52525b"
          strokeWidth="1"
          animate={{ strokeOpacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.18,
          }}
        />
      ))}

      <motion.circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="36"
        fill="url(#cmz-core)"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.12, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <rect
        x={CENTER.x - 22}
        y={CENTER.y - 17}
        width="44"
        height="34"
        rx="9"
        fill="#0b1018"
        stroke="#67E8F9"
        strokeWidth="1.5"
      />
      <text
        x={CENTER.x}
        y={CENTER.y + 3}
        textAnchor="middle"
        fill="#67E8F9"
        style={{ fontSize: "8px", fontFamily: "var(--font-mono)" }}
      >
        SERVER
      </text>
    </svg>
  );
}
