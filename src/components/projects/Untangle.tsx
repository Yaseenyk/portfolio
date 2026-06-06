"use client";

import { motion, type Transition } from "framer-motion";

interface UNode {
  messy: { x: number; y: number };
  grid: { x: number; y: number };
}

// 6 nodes: scattered "messy" positions → clean 3×2 grid.
const NODES: UNode[] = [
  { messy: { x: 60, y: 45 }, grid: { x: 95, y: 80 } },
  { messy: { x: 255, y: 195 }, grid: { x: 160, y: 80 } },
  { messy: { x: 90, y: 200 }, grid: { x: 225, y: 80 } },
  { messy: { x: 275, y: 50 }, grid: { x: 95, y: 165 } },
  { messy: { x: 150, y: 115 }, grid: { x: 160, y: 165 } },
  { messy: { x: 45, y: 150 }, grid: { x: 225, y: 165 } },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 4],
  [2, 5],
  [3, 4],
  [4, 5],
];

const T: Transition = {
  duration: 3,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
  repeatDelay: 0.7,
};

/** SANKALP — a tangled web of nodes untangling into a clean, symmetrical grid. */
export default function Untangle() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      <defs>
        <linearGradient id="sankalp-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      {EDGES.map(([a, b], i) => (
        <motion.line
          key={`e-${i}`}
          stroke="url(#sankalp-line)"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          initial={{
            x1: NODES[a].messy.x,
            y1: NODES[a].messy.y,
            x2: NODES[b].messy.x,
            y2: NODES[b].messy.y,
          }}
          animate={{
            x1: NODES[a].grid.x,
            y1: NODES[a].grid.y,
            x2: NODES[b].grid.x,
            y2: NODES[b].grid.y,
          }}
          transition={T}
        />
      ))}

      {NODES.map((n, i) => (
        <motion.circle
          key={`n-${i}`}
          r="7"
          fill="#0b1018"
          stroke="#67E8F9"
          strokeWidth="1.5"
          initial={{ cx: n.messy.x, cy: n.messy.y }}
          animate={{ cx: n.grid.x, cy: n.grid.y }}
          transition={T}
        />
      ))}
    </svg>
  );
}
