// Logo marks v2 — designed from scratch around the brand's signal motifs.
// 0–100 viewBox, stroke-built, crisp at 16px.

function GradV({ id, from = "#67E8F9", to = "#22D3EE" }) {
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100">
      <stop offset="0" stopColor={from}></stop>
      <stop offset="1" stopColor={to}></stop>
    </linearGradient>
  );
}
function GradD({ id, from = "#22D3EE", to = "#A855F7" }) {
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="100">
      <stop offset="0" stopColor={from}></stop>
      <stop offset="1" stopColor={to}></stop>
    </linearGradient>
  );
}
function Tile({ children, glow, gid }) {
  return (
    <g>
      <rect width="100" height="100" rx="22" fill="#05070A"></rect>
      {glow ? (
        <g>
          <radialGradient id={gid}>
            <stop offset="0" stopColor={glow} stopOpacity="0.22"></stop>
            <stop offset="1" stopColor={glow} stopOpacity="0"></stop>
          </radialGradient>
          <ellipse cx="50" cy="44" rx="44" ry="36" fill={`url(#${gid})`}></ellipse>
        </g>
      ) : null}
      <rect x="1" y="1" width="98" height="98" rx="21" fill="none" stroke="#27272a" strokeWidth="2"></rect>
    </g>
  );
}

/* 1 · Neural Hex — the NeuralCore reduced to a glyph: hexagon shell,
   Y formed by three spokes from a glowing core node. */
function MarkHex({ size = 150 }) {
  // hex vertices around (50,52), r=33
  const pts = "78.6,35.5 78.6,68.5 50,85 21.4,68.5 21.4,35.5 50,19";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><GradV id="hx-g"></GradV></defs>
      <Tile glow="#22D3EE" gid="hx-glow"></Tile>
      <polygon points={pts} fill="none" stroke="url(#hx-g)" strokeOpacity="0.38" strokeWidth="4" strokeLinejoin="round"></polygon>
      <g stroke="url(#hx-g)" strokeWidth="8.5" strokeLinecap="round" fill="none">
        <path d="M50 52 L26.5 38.5"></path>
        <path d="M50 52 L73.5 38.5"></path>
        <path d="M50 52 L50 80"></path>
      </g>
      <circle cx="26.5" cy="38.5" r="6" fill="#67E8F9"></circle>
      <circle cx="73.5" cy="38.5" r="6" fill="#67E8F9"></circle>
      <circle cx="50" cy="80" r="6" fill="#67E8F9"></circle>
      <circle cx="50" cy="52" r="9.5" fill="#05070A" stroke="#67E8F9" strokeWidth="5"></circle>
    </svg>
  );
}

/* 2 · Circuit Y — Y as a circuit trace: branches end in node dots,
   stem terminates in an open ring port. */
function MarkCircuit({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><GradD id="cc-g"></GradD></defs>
      <Tile glow="#22D3EE" gid="cc-glow"></Tile>
      <g stroke="url(#cc-g)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M28 26 L50 48 L50 66"></path>
        <path d="M72 26 L50 48"></path>
      </g>
      <circle cx="28" cy="26" r="7.5" fill="#67E8F9"></circle>
      <circle cx="72" cy="26" r="7.5" fill="#A855F7"></circle>
      <circle cx="50" cy="76" r="8.5" fill="none" stroke="#67E8F9" strokeWidth="5.5"></circle>
    </svg>
  );
}

/* 3 · Velocity — italic YK monogram sliced by a speed cut,
   filled with the cyan→purple signal gradient. */
function MarkVelocity({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><GradD id="vl-g"></GradD></defs>
      <Tile glow="#A855F7" gid="vl-glow"></Tile>
      <g transform="skewX(-10) translate(9 0)" stroke="url(#vl-g)" strokeWidth="12" strokeLinecap="butt" strokeLinejoin="miter" fill="none">
        <path d="M16 27 L32 49 L48 27"></path>
        <path d="M32 47 L32 73"></path>
        <path d="M60 27 L60 73"></path>
        <path d="M82 28 L61 50 L82 72"></path>
      </g>
      {/* speed slash knocked out in ink */}
      <path d="M14 64 L86 36" stroke="#05070A" strokeWidth="7"></path>
    </svg>
  );
}

/* 4 · Orbit — bold Y core with a dashed orbital ring and an ice
   satellite node: the hero's rotating rings as a static glyph. */
function MarkOrbit({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><GradV id="ob-g"></GradV></defs>
      <Tile glow="#22D3EE" gid="ob-glow"></Tile>
      <circle cx="50" cy="51" r="33" fill="none" stroke="url(#ob-g)" strokeOpacity="0.55" strokeWidth="3" strokeDasharray="2.5 7" strokeLinecap="round"></circle>
      <g stroke="url(#ob-g)" strokeWidth="10.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M35 35 L50 51 L65 35"></path>
        <path d="M50 51 L50 69"></path>
      </g>
      <circle cx="76" cy="28" r="6.5" fill="#67E8F9"></circle>
    </svg>
  );
}

/* Standalone glyph (no tile) for lockups */
function bare(Mark) {
  return function Bare({ size = 56 }) {
    return (
      <div style={{ width: size, height: size, borderRadius: size * 0.22, overflow: "hidden", flex: "none" }}>
        <Mark size={size}></Mark>
      </div>
    );
  };
}

function FaviconStrip2({ Mark }) {
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, background: "#101216", borderTop: "1px solid #27272a" }}>
      <Mark size={48}></Mark>
      <Mark size={32}></Mark>
      <Mark size={16}></Mark>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#27272a", borderRadius: "8px 8px 0 0", padding: "6px 14px 8px", fontFamily: "Inter, sans-serif", fontSize: 11, color: "#d4d4d8", alignSelf: "flex-end" }}>
        <Mark size={16}></Mark>
        Yaseen Khatib
      </span>
    </div>
  );
}

function Lockup2({ Mark }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, height: "100%", padding: "0 28px", background: "#05070A", boxSizing: "border-box" }}>
      <Mark size={54}></Mark>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: "-0.02em", color: "#fafafa", lineHeight: 1.1 }}>
          Yaseen Khatib
        </span>
        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#22d3ee" }}>
          AI + MERN Architect
        </span>
      </div>
    </div>
  );
}

Object.assign(window, { MarkHex, MarkCircuit, MarkVelocity, MarkOrbit, FaviconStrip2, Lockup2 });
