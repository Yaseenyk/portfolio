/** streamerOS — stylized system-dashboard / node-graph telemetry visual. */
export default function StreamerOsArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      role="img"
      aria-label="streamerOS system dashboard: node graph, telemetry bars and a chat-velocity stream"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="sos-cp" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="sos-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#67E8F9" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#67E8F9" stopOpacity="0.9" />
          <stop offset="1" stopColor="#A855F7" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* window frame */}
      <rect x="8" y="8" width="384" height="284" rx="12" stroke="#27272a" />
      <circle cx="26" cy="26" r="3.5" fill="#3f3f46" />
      <circle cx="38" cy="26" r="3.5" fill="#3f3f46" />
      <circle cx="50" cy="26" r="3.5" fill="#3f3f46" />
      <line x1="8" y1="44" x2="392" y2="44" stroke="#27272a" />

      {/* node graph (top-left) */}
      <g>
        <line x1="70" y1="90" x2="140" y2="70" stroke="url(#sos-line)" strokeWidth="1.5" />
        <line x1="70" y1="90" x2="130" y2="130" stroke="url(#sos-line)" strokeWidth="1.5" />
        <line x1="140" y1="70" x2="200" y2="100" stroke="url(#sos-line)" strokeWidth="1.5" />
        <line x1="130" y1="130" x2="200" y2="100" stroke="url(#sos-line)" strokeWidth="1.5" />
        <circle cx="70" cy="90" r="9" fill="#05070A" stroke="url(#sos-cp)" strokeWidth="2" />
        <circle cx="140" cy="70" r="7" fill="#05070A" stroke="#22D3EE" strokeWidth="2" />
        <circle cx="130" cy="130" r="7" fill="#05070A" stroke="#A855F7" strokeWidth="2" />
        <circle cx="200" cy="100" r="11" fill="#05070A" stroke="url(#sos-cp)" strokeWidth="2.5" />
        <circle cx="200" cy="100" r="4" fill="#67E8F9" className="animate-pulse" />
      </g>

      {/* telemetry bars (bottom-left) */}
      <g>
        <rect x="64" y="200" width="14" height="60" rx="3" fill="#18181b" />
        <rect x="64" y="226" width="14" height="34" rx="3" fill="#22D3EE" />
        <rect x="88" y="200" width="14" height="60" rx="3" fill="#18181b" />
        <rect x="88" y="214" width="14" height="46" rx="3" fill="#67E8F9" />
        <rect x="112" y="200" width="14" height="60" rx="3" fill="#18181b" />
        <rect x="112" y="238" width="14" height="22" rx="3" fill="#A855F7" />
        <rect x="136" y="200" width="14" height="60" rx="3" fill="#18181b" />
        <rect x="136" y="208" width="14" height="52" rx="3" fill="#22D3EE" />
      </g>

      {/* gauge (CPU) */}
      <g transform="translate(250 90)">
        <path d="M-34 14 A38 38 0 0 1 34 14" stroke="#27272a" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M-34 14 A38 38 0 0 1 -18 -22" stroke="url(#sos-cp)" strokeWidth="7" fill="none" strokeLinecap="round" />
        <text x="0" y="6" textAnchor="middle" fontSize="15" fontFamily="monospace" fill="#67E8F9">1.8%</text>
        <text x="0" y="24" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#71717a">CPU</text>
      </g>

      {/* RAM chip badge */}
      <g transform="translate(300 170)">
        <rect x="-44" y="-16" width="88" height="32" rx="6" fill="#18181b" stroke="#27272a" />
        <text x="0" y="-1" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="#22D3EE">152 MB</text>
        <text x="0" y="11" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#71717a">RESIDENT RAM</text>
      </g>

      {/* chat-velocity stream (bottom-right) */}
      <g>
        <polyline
          points="230,250 248,238 266,244 284,224 302,232 320,210 338,218 360,200"
          fill="none"
          stroke="url(#sos-line)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="360" cy="200" r="3" fill="#67E8F9" className="animate-pulse" />
        <text x="230" y="270" fontSize="7" fontFamily="monospace" fill="#71717a">CHAT VELOCITY · msgs/s</text>
      </g>
    </svg>
  );
}
