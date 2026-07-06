/** Sable — on-device SQLite store, an AI function-call agent, and a confirm gate. */
export default function SableArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      role="img"
      aria-label="Sable architecture: bank SMS parsed into an on-device SQLite store, an OpenAI function-calling agent, and a Review & Confirm gate before any write"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="sb-cp" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      <rect x="8" y="8" width="384" height="284" rx="12" stroke="#27272a" />

      {/* Phone: local-first device (left) */}
      <g transform="translate(34 44)">
        <rect width="120" height="212" rx="16" fill="#0a0c10" stroke="#27272a" />
        <rect x="42" y="10" width="36" height="5" rx="2.5" fill="#27272a" />

        {/* on-device shield */}
        <g transform="translate(60 60)">
          <path
            d="M0 -26 L22 -17 V2 C22 18 12 27 0 33 C-12 27 -22 18 -22 2 V-17 Z"
            fill="#18181b"
            stroke="url(#sb-cp)"
            strokeWidth="2"
          />
          <path
            d="M-8 2 l6 6 l11 -13"
            stroke="#67E8F9"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* SQLite cylinder */}
        <g transform="translate(38 118)">
          <ellipse cx="22" cy="6" rx="22" ry="6" fill="#18181b" stroke="#22D3EE" strokeOpacity="0.45" />
          <path d="M0 6 V34 C0 37 10 40 22 40 C34 40 44 37 44 34 V6" fill="#0a0c10" stroke="#22D3EE" strokeOpacity="0.45" />
          <ellipse cx="22" cy="6" rx="22" ry="6" fill="none" stroke="#22D3EE" strokeOpacity="0.45" />
          <text x="22" y="27" fontSize="8" fontFamily="monospace" fill="#67E8F9" textAnchor="middle">SQLite</text>
        </g>
        <text x="60" y="200" fontSize="8" fontFamily="monospace" fill="#71717a" textAnchor="middle">on-device</text>
      </g>

      {/* Flow → AI agent */}
      <g transform="translate(160 96)">
        <line x1="0" y1="0" x2="30" y2="0" stroke="url(#sb-cp)" strokeWidth="2" strokeLinecap="round" />
        <path d="M26 -4 L34 0 L26 4 Z" fill="#A855F7" />
      </g>

      {/* AI function-call agent (center) */}
      <g transform="translate(202 66)">
        <rect width="94" height="64" rx="10" fill="#18181b" stroke="#27272a" />
        <circle cx="20" cy="22" r="9" fill="none" stroke="url(#sb-cp)" strokeWidth="2" />
        <circle cx="20" cy="22" r="3" fill="#67E8F9" className="animate-pulse" />
        <text x="36" y="19" fontSize="8" fontFamily="monospace" fill="#e4e4e7">OpenAI</text>
        <text x="36" y="30" fontSize="7.5" fontFamily="monospace" fill="#71717a">fn-call</text>
        <text x="12" y="50" fontSize="7.5" fontFamily="monospace" fill="#22D3EE">propose(intent)</text>
      </g>

      {/* Flow → confirm gate */}
      <g transform="translate(202 150)">
        <line x1="47" y1="-16" x2="47" y2="14" stroke="url(#sb-cp)" strokeWidth="2" strokeLinecap="round" />
        <path d="M43 10 L47 18 L51 10 Z" fill="#A855F7" />
      </g>

      {/* Review & Confirm gate (bottom-right) */}
      <g transform="translate(196 176)">
        <rect width="164" height="84" rx="10" fill="#0a0c10" stroke="#22D3EE" strokeOpacity="0.4" />
        <text x="14" y="22" fontSize="8" fontFamily="monospace" fill="#67E8F9">Review &amp; Confirm</text>
        {[36, 48].map((y, i) => (
          <rect key={y} x="14" y={y} width={i === 0 ? 120 : 92} height="5" rx="2.5" fill="#27272a" />
        ))}
        {/* confirm button */}
        <g transform="translate(14 60)">
          <rect width="64" height="16" rx="8" fill="none" stroke="url(#sb-cp)" strokeWidth="1.5" />
          <text x="32" y="11" fontSize="7.5" fontFamily="monospace" fill="#67E8F9" textAnchor="middle">Confirm</text>
        </g>
        <text x="88" y="72" fontSize="7.5" fontFamily="monospace" fill="#71717a">→ commit</text>
      </g>
    </svg>
  );
}
