/** LinkedIn Pipeline — automation timeline, queue, and terminal execution. */
export default function LinkedInPipelineArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      role="img"
      aria-label="LinkedIn automation pipeline: cron timeline, publish queue, and a terminal run"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="lp-cp" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      <rect x="8" y="8" width="384" height="284" rx="12" stroke="#27272a" />

      {/* cron timeline */}
      <g transform="translate(0 64)">
        <line x1="40" y1="0" x2="360" y2="0" stroke="#27272a" strokeWidth="2" />
        <line x1="40" y1="0" x2="250" y2="0" stroke="url(#lp-cp)" strokeWidth="2" />
        {[40, 145, 250, 355].map((cx, i) => (
          <g key={cx}>
            <circle
              cx={cx}
              cy="0"
              r={i < 3 ? 6 : 5}
              fill="#05070A"
              stroke={i < 3 ? "#22D3EE" : "#3f3f46"}
              strokeWidth="2"
            />
            {i < 3 && <circle cx={cx} cy="0" r="2.5" fill="#67E8F9" />}
          </g>
        ))}
        <text x="40" y="22" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#71717a">Tue</text>
        <text x="145" y="22" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#71717a">Thu</text>
        <text x="250" y="22" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#71717a">Tue</text>
        <text x="200" y="-14" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#22D3EE">
          cron: 0 10 * * 2,4
        </text>
      </g>

      {/* publish queue (left) */}
      <g transform="translate(40 120)">
        <text x="0" y="-6" fontSize="8" fontFamily="monospace" fill="#71717a">PUBLISH QUEUE</text>
        {[0, 1, 2].map((row) => (
          <g key={row} transform={`translate(0 ${row * 26})`}>
            <rect width="120" height="20" rx="4" fill="#18181b" stroke="#27272a" />
            <rect width="4" height="20" rx="2" fill={row === 0 ? "#22D3EE" : "#3f3f46"} />
            <circle cx="16" cy="10" r="3" fill={row === 0 ? "#67E8F9" : "#52525b"} />
            <rect x="28" y="6" width={70 - row * 12} height="3" rx="1.5" fill="#3f3f46" />
            <rect x="28" y="12" width={48 - row * 8} height="3" rx="1.5" fill="#27272a" />
          </g>
        ))}
      </g>

      {/* terminal (right) */}
      <g transform="translate(200 116)">
        <rect width="160" height="120" rx="8" fill="#0a0c10" stroke="#27272a" />
        <line x1="0" y1="20" x2="160" y2="20" stroke="#27272a" />
        <circle cx="12" cy="10" r="2.5" fill="#3f3f46" />
        <circle cx="22" cy="10" r="2.5" fill="#3f3f46" />
        <circle cx="32" cy="10" r="2.5" fill="#3f3f46" />
        <text x="12" y="40" fontSize="8" fontFamily="monospace" fill="#67E8F9">$ python publisher.py</text>
        <text x="12" y="56" fontSize="8" fontFamily="monospace" fill="#a1a1aa">→ gemini: draft ok</text>
        <text x="12" y="72" fontSize="8" fontFamily="monospace" fill="#a1a1aa">→ post → linkedin</text>
        <text x="12" y="88" fontSize="8" fontFamily="monospace" fill="#22D3EE">✓ published.json +1</text>
        <g transform="translate(12 100)">
          <text x="0" y="6" fontSize="8" fontFamily="monospace" fill="#a855f7">$</text>
          <rect x="10" y="-2" width="6" height="9" fill="#67E8F9" className="animate-pulse" />
        </g>
      </g>
    </svg>
  );
}
