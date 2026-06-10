// Logo mark variants for the YK monogram redesign.
// Geometry is stroke-built in a 0–100 viewBox so it scales crisply to 16px.

/* Each mark gets its own gradient instance: userSpaceOnUse so vertical
   stems (zero-area bbox) still paint, unique id to avoid collisions. */
function Grad({ id }) {
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100">
      <stop offset="0" stopColor="#67E8F9"></stop>
      <stop offset="1" stopColor="#22D3EE"></stop>
    </linearGradient>
  );
}

/* Shared letterforms: refined geometric YK, stroke-built */
function LettersYK({ stroke, w = 12, caps = "butt" }) {
  return (
    <g stroke={stroke} strokeWidth={w} strokeLinecap={caps} strokeLinejoin="miter" fill="none">
      {/* Y */}
      <path d="M17 29 L34 51 L51 29"></path>
      <path d="M34 49 L34 72"></path>
      {/* K */}
      <path d="M62 28 L62 72"></path>
      <path d="M85 29 L63 51 L85 71"></path>
    </g>
  );
}

/* A · Refined Classic — gradient tile, ink letters, tighter optics than the old favicon */
function MarkA({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><Grad id="g-a"></Grad></defs>
      <rect width="100" height="100" rx="22" fill="url(#g-a)"></rect>
      <LettersYK stroke="#05070A"></LettersYK>
    </svg>
  );
}

/* B · Ligature — Y and K fused on a shared stem, round caps */
function MarkB({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><Grad id="g-b"></Grad></defs>
      <rect width="100" height="100" rx="22" fill="url(#g-b)"></rect>
      <g stroke="#05070A" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M49 21 L49 80"></path>
        <path d="M24 21 L49 44"></path>
        <path d="M76 27 L49 54 L76 80"></path>
      </g>
    </svg>
  );
}

/* C · Ink Inverse — ink tile, gradient letters, hairline gradient ring */
function MarkC({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><Grad id="g-c"></Grad></defs>
      <rect width="100" height="100" rx="22" fill="#05070A"></rect>
      <rect x="1.5" y="1.5" width="97" height="97" rx="20.5" fill="none" stroke="url(#g-c)" strokeOpacity="0.45" strokeWidth="2"></rect>
      <LettersYK stroke="url(#g-c)"></LettersYK>
    </svg>
  );
}

/* D · Terminal — ink tile, mono lowercase yk + ice cursor block */
function MarkD({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs><Grad id="g-d"></Grad></defs>
      <rect width="100" height="100" rx="22" fill="#05070A"></rect>
      <rect x="1.5" y="1.5" width="97" height="97" rx="20.5" fill="none" stroke="#3f3f46" strokeWidth="2"></rect>
      <text
        x="19"
        y="54"
        dominantBaseline="middle"
        fontFamily="'Fira Code', ui-monospace, monospace"
        fontWeight="600"
        fontSize="44"
        fill="url(#g-d)"
      >
        yk
      </text>
      <rect x="71" y="61" width="11" height="6" fill="#67E8F9"></rect>
    </svg>
  );
}

/* Favicon-size preview strip: 48 / 32 / 16 + a fake browser tab */
function FaviconStrip({ Mark }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        background: "#101216",
        borderTop: "1px solid #27272a",
      }}
    >
      <Mark size={48}></Mark>
      <Mark size={32}></Mark>
      <Mark size={16}></Mark>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "#27272a",
          borderRadius: "8px 8px 0 0",
          padding: "6px 14px 8px",
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
          color: "#d4d4d8",
          alignSelf: "flex-end",
        }}
      >
        <Mark size={16}></Mark>
        Yaseen Khatib
      </span>
    </div>
  );
}

/* Lockup: mark + wordmark on ink */
function Lockup({ Mark }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        height: "100%",
        padding: "0 28px",
        background: "#05070A",
        boxSizing: "border-box",
      }}
    >
      <Mark size={56}></Mark>
      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", color: "#fafafa" }}>
        Yaseen Khatib
      </span>
      <span className="sk-pulse-dot" style={{ marginLeft: 2 }}></span>
    </div>
  );
}

Object.assign(window, { MarkA, MarkB, MarkC, MarkD, FaviconStrip, Lockup });
