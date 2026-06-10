import React from "react";

/* CSS-animated recreation of the site's breathing "AI core" hero art
   (NeuralCore.tsx): glow core, rotating dashed orbital rings, hex nodes. */

const NODES = [
  { x: 200, y: 62 },
  { x: 320, y: 131 },
  { x: 320, y: 269 },
  { x: 200, y: 338 },
  { x: 80, y: 269 },
  { x: 80, y: 131 },
];

export function NeuralCoreArt() {
  return (
    <div className="nc-float" style={{ position: "relative", margin: "0 auto", aspectRatio: "1", width: "100%", maxWidth: 520 }}>
      <style>{`
        @keyframes nc-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes nc-breathe { 0%,100% { opacity: .45; transform: scale(1); } 50% { opacity: .75; transform: scale(1.05); } }
        @keyframes nc-spin { to { transform: rotate(360deg); } }
        @keyframes nc-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes nc-link { 0%,100% { opacity: .15; } 50% { opacity: .6; } }
        @keyframes nc-node { 0%,100% { transform: scale(1); } 50% { transform: scale(1.25); } }
        .nc-float { animation: nc-float 7s ease-in-out infinite; }
        .nc-center { transform-box: fill-box; transform-origin: center; }
      `}</style>
      <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }} aria-hidden="true">
        <defs>
          <linearGradient id="nc-line" gradientUnits="userSpaceOnUse" x1="200" y1="345" x2="200" y2="55">
            <stop offset="0%" stopColor="#22D3EE"></stop>
            <stop offset="100%" stopColor="#A855F7"></stop>
          </linearGradient>
          <radialGradient id="nc-glow">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.85"></stop>
            <stop offset="55%" stopColor="#22D3EE" stopOpacity="0.22"></stop>
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0"></stop>
          </radialGradient>
          <radialGradient id="nc-node-grad">
            <stop offset="0%" stopColor="#67E8F9"></stop>
            <stop offset="100%" stopColor="#22D3EE"></stop>
          </radialGradient>
        </defs>
        <circle className="nc-center" cx="200" cy="200" r="172" fill="url(#nc-glow)" style={{ animation: "nc-breathe 5s ease-in-out infinite" }}></circle>
        <circle className="nc-center" cx="200" cy="200" r="150" fill="none" stroke="url(#nc-line)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 10" style={{ animation: "nc-spin 42s linear infinite" }}></circle>
        <circle className="nc-center" cx="200" cy="200" r="112" fill="none" stroke="url(#nc-line)" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="1 14" style={{ animation: "nc-spin-rev 30s linear infinite" }}></circle>
        <polygon points={NODES.map((n) => `${n.x},${n.y}`).join(" ")} fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1"></polygon>
        {NODES.map((n, i) => (
          <line key={`l${i}`} x1="200" y1="200" x2={n.x} y2={n.y} stroke="url(#nc-line)" strokeWidth="1" style={{ animation: `nc-link 3s ease-in-out ${i * 0.3}s infinite` }}></line>
        ))}
        {NODES.map((n, i) => (
          <circle key={`n${i}`} className="nc-center" cx={n.x} cy={n.y} r="7" fill="url(#nc-node-grad)" style={{ animation: `nc-node 3s ease-in-out ${i * 0.3}s infinite` }}></circle>
        ))}
        <circle className="nc-center" cx="200" cy="200" r="26" fill="url(#nc-node-grad)" style={{ animation: "nc-node 3s ease-in-out infinite" }}></circle>
        <circle cx="200" cy="200" r="40" fill="none" stroke="#67E8F9" strokeOpacity="0.35" strokeWidth="1"></circle>
      </svg>
    </div>
  );
}
