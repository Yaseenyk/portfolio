"use client";

import { motion } from "framer-motion";

// Hexagonal node layout around a central core (SVG user space, center 200,200).
const NODES = [
  { x: 200, y: 62 },
  { x: 320, y: 131 },
  { x: 320, y: 269 },
  { x: 200, y: 338 },
  { x: 80, y: 269 },
  { x: 80, y: 131 },
];

const centered = { transformBox: "fill-box", transformOrigin: "center" } as const;

/** An abstract, breathing "AI core" — pulsing nodes, flowing data, rotating rings. */
export default function NeuralCore() {
  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[480px] lg:max-w-[600px]"
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient
            id="lineGrad"
            gradientUnits="userSpaceOnUse"
            x1="200"
            y1="345"
            x2="200"
            y2="55"
          >
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#22D3EE" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGrad">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#22D3EE" />
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient core glow */}
        <motion.circle
          cx="200"
          cy="200"
          r="172"
          fill="url(#coreGlow)"
          style={centered}
          animate={{ opacity: [0.45, 0.75, 0.45], scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Rotating orbital rings */}
        <motion.circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeDasharray="2 10"
          style={centered}
          animate={{ rotate: 360 }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="112"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeDasharray="1 14"
          style={centered}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Faint network outline */}
        <polygon
          points={NODES.map((n) => `${n.x},${n.y}`).join(" ")}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.06"
          strokeWidth="1"
        />

        {/* Core → node connections */}
        {NODES.map((n, i) => (
          <motion.line
            key={`line-${i}`}
            x1="200"
            y1="200"
            x2={n.x}
            y2={n.y}
            stroke="url(#lineGrad)"
            strokeWidth="1"
            animate={{ opacity: [0.15, 0.6, 0.15] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Data pulses travelling core → node */}
        {NODES.map((n, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="2.6"
            fill="#67E8F9"
            animate={{ cx: [200, n.x], cy: [200, n.y], opacity: [0, 1, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Pulsing nodes */}
        {NODES.map((n, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={n.x}
            cy={n.y}
            r="6"
            fill="url(#nodeGrad)"
            filter="url(#softGlow)"
            style={centered}
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
          />
        ))}

        {/* Central core */}
        <motion.circle
          cx="200"
          cy="200"
          r="22"
          fill="url(#nodeGrad)"
          filter="url(#softGlow)"
          style={centered}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="9"
          fill="#ffffff"
          style={centered}
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}
