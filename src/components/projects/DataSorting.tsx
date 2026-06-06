"use client";

import { motion } from "framer-motion";

const GATE = { x: 150, y: 120 };
const DBS = [
  { x: 282, y: 60 },
  { x: 282, y: 120 },
  { x: 282, y: 180 },
];
const DOTS = Array.from({ length: 6 }, (_, i) => ({
  i,
  db: i % 3,
  delay: i * 0.45,
}));

/** Hospital-API — incoming requests routed through a gateway into databases. */
export default function DataSorting() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      <defs>
        <linearGradient id="hapi-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      {/* Gateway → DB rails */}
      {DBS.map((d, i) => (
        <line
          key={`rail-${i}`}
          x1={GATE.x}
          y1={GATE.y}
          x2={d.x}
          y2={d.y}
          stroke="#3f3f46"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      ))}

      {/* Request packets */}
      {DOTS.map((d) => {
        const db = DBS[d.db];
        return (
          <motion.circle
            key={`dot-${d.i}`}
            r="3"
            fill="#67E8F9"
            animate={{
              cx: [16, GATE.x, db.x],
              cy: [120, GATE.y, db.y],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: d.delay,
              times: [0, 0.45, 1],
            }}
          />
        );
      })}

      {/* Databases */}
      {DBS.map((d, i) => (
        <g key={`db-${i}`}>
          <rect
            x={d.x - 18}
            y={d.y - 14}
            width="36"
            height="28"
            rx="6"
            fill="#0b1018"
            stroke="#52525b"
            strokeWidth="1"
          />
          <text
            x={d.x}
            y={d.y + 3}
            textAnchor="middle"
            fill="#a1a1aa"
            style={{ fontSize: "8px", fontFamily: "var(--font-mono)" }}
          >
            DB{i + 1}
          </text>
        </g>
      ))}

      {/* API Gateway */}
      <motion.rect
        x={GATE.x - 26}
        y={GATE.y - 22}
        width="52"
        height="44"
        rx="9"
        fill="#0b1018"
        stroke="#67E8F9"
        strokeWidth="1.5"
        animate={{ strokeOpacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <text
        x={GATE.x}
        y={GATE.y + 2}
        textAnchor="middle"
        fill="#67E8F9"
        style={{ fontSize: "7.5px", fontFamily: "var(--font-mono)" }}
      >
        GATEWAY
      </text>
    </svg>
  );
}
