"use client";

import { motion } from "framer-motion";

interface Node {
  id: string;
  cx: number;
  cy: number;
  label: string;
}

const NODES: Node[] = [
  { id: "A", cx: 60, cy: 70, label: "trigger" },
  { id: "B", cx: 160, cy: 125, label: "logic" },
  { id: "C", cx: 260, cy: 70, label: "output" },
  { id: "D", cx: 260, cy: 180, label: "webhook" },
];

const EDGES: [string, string][] = [
  ["A", "B"],
  ["B", "C"],
  ["B", "D"],
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

/** IntegrateX — a node-graph of glass blocks with data packets flowing along edges. */
export default function NodeGraph() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      <defs>
        <linearGradient id="ig-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      {EDGES.map(([f, t], i) => {
        const a = byId[f];
        const b = byId[t];
        return (
          <line
            key={`e-${i}`}
            x1={a.cx}
            y1={a.cy}
            x2={b.cx}
            y2={b.cy}
            stroke="url(#ig-line)"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />
        );
      })}

      {EDGES.map(([f, t], i) => {
        const a = byId[f];
        const b = byId[t];
        return (
          <motion.circle
            key={`p-${i}`}
            r="3"
            fill="#67E8F9"
            animate={{ cx: [a.cx, b.cx], cy: [a.cy, b.cy], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        );
      })}

      {NODES.map((n, i) => (
        <g key={n.id}>
          <motion.rect
            x={n.cx - 30}
            y={n.cy - 16}
            width="60"
            height="32"
            rx="8"
            fill="#0b1018"
            stroke="url(#ig-line)"
            strokeWidth="1"
            animate={{ strokeOpacity: [0.3, 0.85, 0.3] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
          <text
            x={n.cx}
            y={n.cy + 3}
            textAnchor="middle"
            fill="#d4d4d8"
            style={{ fontSize: "9px", fontFamily: "var(--font-mono)" }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
