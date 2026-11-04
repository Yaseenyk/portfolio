"use client";

import { useEffect, useRef } from "react";

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


/** The hero's AI core, animated with pure CSS (transform/opacity keyframes in
 *  globals.css under .nc-*). No JS animation: an IntersectionObserver only
 *  toggles `data-paused` so the loops stop while it is off-screen. */
export default function NeuralCore() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const svg = el.querySelector("svg");
    const io = new IntersectionObserver(([e]) => {
      const off = !e.isIntersecting;
      el.dataset.paused = off ? "1" : "0";
      try {
        if (off) svg?.pauseAnimations();
        else svg?.unpauseAnimations();
      } catch {}
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="nc relative mx-auto aspect-square w-full max-w-[480px] lg:max-w-[600px]">
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

        <circle className="nc-breathe" cx="200" cy="200" r="175" fill="url(#coreGlow)" />

        <g className="nc-spin" style={{ animationDuration: "48s" }}>
          <circle cx="200" cy="200" r="158" fill="none" stroke="#22D3EE" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="3 9" />
          <circle cx="200" cy="42" r="6" fill="#67E8F9" opacity="0.25" />
          <circle cx="200" cy="42" r="3" fill="#67E8F9" />
          <circle cx="337" cy="279" r="5" fill="#A855F7" opacity="0.25" />
          <circle cx="337" cy="279" r="2.2" fill="#A855F7" />
        </g>
        <g className="nc-spin" style={{ animationDuration: "32s", animationDirection: "reverse" }}>
          <circle cx="200" cy="200" r="122" fill="none" stroke="#A855F7" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="1 12" />
          <circle cx="322" cy="200" r="5" fill="#22D3EE" opacity="0.25" />
          <circle cx="322" cy="200" r="2.4" fill="#22D3EE" />
        </g>

        {NODES.map((n, i) => (
          <g key={`conduit-${i}`}>
            <path d={curveTo(n.x, n.y)} fill="none" stroke="url(#conduit)" strokeOpacity="0.12" strokeWidth="1.4" />
            <path
              className="nc-flow"
              d={curveTo(n.x, n.y)}
              fill="none"
              stroke={n.accent}
              strokeOpacity="0.5"
              strokeWidth="1.2"
              strokeDasharray="5 14"
              strokeLinecap="round"
              style={{ animationDelay: `${n.d * 0.3}s` }}
            />
            <circle r="2.8" fill="#F0FDFF">
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

        {NODES.map((n, i) => (
          <g key={`node-${i}`}>
            <circle className="nc-halo" cx={n.x} cy={n.y} r="11" fill={n.accent} opacity="0.15" style={{ animationDelay: `${n.d}s` }} />
            <circle cx={n.x} cy={n.y} r="9" fill={n.accent} opacity="0.12" />
            <circle cx={n.x} cy={n.y} r="5" fill="#05070A" stroke={n.accent} strokeWidth="1.6" />
            <circle cx={n.x} cy={n.y} r="1.8" fill={n.accent} />
          </g>
        ))}

        {[0, 1.6, 3.2].map((delay) => (
          <circle
            key={`ripple-${delay}`}
            className="nc-ripple"
            cx="200" cy="200" r="26"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="1"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}

        <g className="nc-spin" style={{ animationDuration: "20s" }}>
          <path d="M200 168 L227 184 L227 216 L200 232 L173 216 L173 184 Z" fill="none" stroke="#67E8F9" strokeOpacity="0.5" strokeWidth="1" />
        </g>
        <circle cx="200" cy="200" r="30" fill="#22D3EE" opacity="0.18" />
        <circle className="nc-pulse" cx="200" cy="200" r="20" fill="url(#coreBody)" />
        <circle className="nc-pulse2" cx="200" cy="200" r="7" fill="#ffffff" />
      </svg>
    </div>
  );
}
