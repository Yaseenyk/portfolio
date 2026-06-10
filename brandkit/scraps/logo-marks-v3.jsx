// Circuit Y — variation set (v3). Chosen direction: Y as a circuit trace
// with node terminals. 0–100 viewBox, stroke-built, crisp at 16px.

function V3Grad({ id, from, to, x2 = 100, y2 = 100 }) {
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={x2} y2={y2}>
      <stop offset="0" stopColor={from}></stop>
      <stop offset="1" stopColor={to}></stop>
    </linearGradient>
  );
}

function V3Tile({ fill = "#05070A", glow, gid, ring = "#27272a" }) {
  return (
    <g>
      <rect width="100" height="100" rx="22" fill={fill}></rect>
      {glow ? (
        <g>
          <radialGradient id={gid}>
            <stop offset="0" stopColor={glow} stopOpacity="0.22"></stop>
            <stop offset="1" stopColor={glow} stopOpacity="0"></stop>
          </radialGradient>
          <ellipse cx="50" cy="44" rx="44" ry="36" fill={`url(#${gid})`}></ellipse>
        </g>
      ) : null}
      {ring ? <rect x="1" y="1" width="98" height="98" rx="21" fill="none" stroke={ring} strokeWidth="2"></rect> : null}
    </g>
  );
}

/* The core circuit-Y glyph, parameterized */
function CircuitGlyph({ stroke, w = 10, leftNode = "#67E8F9", rightNode = "#A855F7", port = "#67E8F9", dy = 0 }) {
  return (
    <g transform={`translate(0 ${dy})`}>
      <g stroke={stroke} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M28 26 L50 48 L50 66"></path>
        <path d="M72 26 L50 48"></path>
      </g>
      <circle cx="28" cy="26" r="7.5" fill={leftNode}></circle>
      <circle cx="72" cy="26" r="7.5" fill={rightNode}></circle>
      <circle cx="50" cy="76" r="8.5" fill="none" stroke={port} strokeWidth="5.5"></circle>
    </g>
  );
}

/* A · The pick — cyan→purple trace, mixed nodes, ink tile */
function CyA({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><V3Grad id="cya-g" from="#22D3EE" to="#A855F7"></V3Grad></defs>
      <V3Tile glow="#22D3EE" gid="cya-glow"></V3Tile>
      <CircuitGlyph stroke="url(#cya-g)"></CircuitGlyph>
    </svg>
  );
}

/* B · Pure signal — cyan→ice only, all-ice nodes */
function CyB({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><V3Grad id="cyb-g" from="#67E8F9" to="#22D3EE" x2="0" y2="100"></V3Grad></defs>
      <V3Tile glow="#22D3EE" gid="cyb-glow"></V3Tile>
      <CircuitGlyph stroke="url(#cyb-g)" rightNode="#67E8F9" leftNode="#67E8F9"></CircuitGlyph>
    </svg>
  );
}

/* C · Inverted — gradient tile (old favicon energy), ink circuit */
function CyC({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><V3Grad id="cyc-t" from="#67E8F9" to="#22D3EE" x2="0" y2="100"></V3Grad></defs>
      <rect width="100" height="100" rx="22" fill="url(#cyc-t)"></rect>
      <CircuitGlyph stroke="#05070A" leftNode="#05070A" rightNode="#05070A" port="#05070A"></CircuitGlyph>
    </svg>
  );
}

/* D · PCB — right-angle/45° traces like board routing, dotted rail */
function CyD({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><V3Grad id="cyd-g" from="#22D3EE" to="#A855F7"></V3Grad></defs>
      <V3Tile glow="#22D3EE" gid="cyd-glow"></V3Tile>
      <g stroke="url(#cyd-g)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M28 20 L28 32 L50 54 L50 68"></path>
        <path d="M72 20 L72 32 L50 54"></path>
      </g>
      <circle cx="28" cy="20" r="7" fill="#67E8F9"></circle>
      <circle cx="72" cy="20" r="7" fill="#A855F7"></circle>
      <circle cx="50" cy="78" r="8" fill="none" stroke="#67E8F9" strokeWidth="5"></circle>
    </svg>
  );
}

/* E · Live port — port replaced by the brand's pulse dot + ping ring */
function CyE({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><V3Grad id="cye-g" from="#22D3EE" to="#A855F7"></V3Grad></defs>
      <V3Tile glow="#22D3EE" gid="cye-glow"></V3Tile>
      <g stroke="url(#cye-g)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M28 24 L50 46 L50 62"></path>
        <path d="M72 24 L50 46"></path>
      </g>
      <circle cx="28" cy="24" r="7.5" fill="#67E8F9"></circle>
      <circle cx="72" cy="24" r="7.5" fill="#A855F7"></circle>
      <circle cx="50" cy="75" r="6.5" fill="#67E8F9"></circle>
      <circle cx="50" cy="75" r="13" fill="none" stroke="#67E8F9" strokeOpacity="0.45" strokeWidth="3"></circle>
    </svg>
  );
}

/* F · Badge — bare glyph inside a thin gradient ring, no tile */
function CyF({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><V3Grad id="cyf-g" from="#22D3EE" to="#A855F7"></V3Grad></defs>
      <circle cx="50" cy="50" r="47" fill="#05070A"></circle>
      <circle cx="50" cy="50" r="45.5" fill="none" stroke="url(#cyf-g)" strokeOpacity="0.6" strokeWidth="3"></circle>
      <CircuitGlyph stroke="url(#cyf-g)" w="9" dy="1"></CircuitGlyph>
    </svg>
  );
}

function V3Strip({ Mark }) {
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

function V3Lockup({ Mark }) {
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

Object.assign(window, { CyA, CyB, CyC, CyD, CyE, CyF, V3Strip, V3Lockup });
