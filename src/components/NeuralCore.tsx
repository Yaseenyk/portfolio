"use client";

import { motion } from "framer-motion";

// Nodes at varied radii/angles for an organic constellation (center 200,200).
const NODES = [
  { x: 200, y: 54, accent: "#22D3EE", d: 0.0 },
  { x: 330, y: 122, accent: "#A855F7", d: 0.5 },
  { x: 342, y: 252, accent: "#22D3EE", d: 1.0 },
  { x: 232, y: 344, accent: "#67E8F9", d: 1.5 },
  { x: 96, y: 300, accent: "#A855F7", d: 2.0 },
  { x: 66, y: 158, accent: "#22D3EE", d: 2.5 },
];

// Curved energy path from the core to a node (bends around the midpoint).
function curveTo(x: number, y: number): string {
  const mx = (200 + x) / 2;
  const my = (200 + y) / 2;
  // Perpendicular offset for the control point → gentle arc, not a spoke.
  const nx = -(y - 200) * 0.22;
  const ny = (x - 200) * 0.22;
  return `M200,200 Q${mx + nx},${my + ny} ${x},${y}`;
}

const centered = { transformBox: "fill-box", transformOrigin: "center" } as const;
const spin = { transformOrigin: "200px 200px" } as const;

/** The hero's AI core: curved energy conduits with flowing current and
 *  travelling packets, orbiting satellites, and a breathing reactor that
 *  emits ripple rings. Transform/opacity-only — cheap to composite. */
export default function NeuralCore() {
  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[480px] lg:max-w-[600px]"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#22D3EE" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="coreBody">
            <stop offset="0%" stopColor="#F0FDFF" />
            <stop offset="35%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#0E7490" />
          </radialGradient>
          <linearGradient id="conduit" gradientUnits="userSpaceOnUse" x1="200" y1="340" x2="200" y2="60">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient glow, breathing */}
        <motion.circle
          cx="200" cy="200" r="175"
          fill="url(#coreGlow)"
          style={centered}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbit rings with riding satellites */}
        <motion.g style={spin} animate={{ rotate: 360 }} transition={{ duration: 48, repeat: Infinity, ease: "linear" }}>
          <circle cx="200" cy="200" r="158" fill="none" stroke="#22D3EE" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="3 9" />
          <circle cx="200" cy="42" r="3" fill="#67E8F9" filter="url(#glow)" />
          <circle cx="337" cy="279" r="2.2" fill="#A855F7" filter="url(#glow)" />
        </motion.g>
        <motion.g style={spin} animate={{ rotate: -360 }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }}>
          <circle cx="200" cy="200" r="122" fill="none" stroke="#A855F7" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="1 12" />
          <circle cx="322" cy="200" r="2.4" fill="#22D3EE" filter="url(#glow)" />
        </motion.g>

        {/* Curved conduits: base + flowing current */}
        {NODES.map((n, i) => (
          <g key={`conduit-${i}`}>
            <path
              d={curveTo(n.x, n.y)}
              fill="none"
              stroke="url(#conduit)"
              strokeOpacity="0.12"
              strokeWidth="1.4"
            />
            <motion.path
              d={curveTo(n.x, n.y)}
              fill="none"
              stroke={n.accent}
              strokeWidth="1.2"
              strokeDasharray="5 14"
              strokeLinecap="round"
              animate={{ strokeDashoffset: [0, -76], strokeOpacity: [0.5, 0.5] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "linear", delay: n.d * 0.3 }}
            />
            {/* Packet riding the exact curve */}
            <circle r="2.8" fill="#F0FDFF" filter="url(#glow)">
              <animateMotion
                dur="2.8s"
                begin={`${n.d}s`}
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
                path={curveTo(n.x, n.y)}
              />
            </circle>
          </g>
        ))}

        {/* Terminal nodes: steady body + soft halo pulse */}
        {NODES.map((n, i) => (
          <g key={`node-${i}`}>
            <motion.circle
              cx={n.x} cy={n.y} r="11"
              fill={n.accent}
              opacity="0.15"
              style={centered}
              animate={{ scale: [1, 1.8, 1], opacity: [0.18, 0, 0.18] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: n.d }}
            />
            <circle cx={n.x} cy={n.y} r="5" fill="#05070A" stroke={n.accent} strokeWidth="1.6" filter="url(#glow)" />
            <circle cx={n.x} cy={n.y} r="1.8" fill={n.accent} />
          </g>
        ))}

        {/* Ripple rings emitted by the core */}
        {[0, 1.6, 3.2].map((delay) => (
          <motion.circle
            key={`ripple-${delay}`}
            cx="200" cy="200"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="1"
            initial={{ r: 26, opacity: 0 }}
            animate={{ r: [26, 96], opacity: [0.45, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeOut", delay }}
          />
        ))}

        {/* Reactor core: rotating facet ring + breathing body */}
        <motion.g style={spin} animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          <path
            d="M200 168 L227 184 L227 216 L200 232 L173 216 L173 184 Z"
            fill="none"
            stroke="#67E8F9"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
        </motion.g>
        <motion.circle
          cx="200" cy="200" r="20"
          fill="url(#coreBody)"
          filter="url(#glow)"
          style={centered}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="200" cy="200" r="7"
          fill="#ffffff"
          style={centered}
          animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}
