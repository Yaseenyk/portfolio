/** FitRank — code rules, a five-head decision model, policy bands, and a human gate. */
export default function FitRankArt() {
  const heads: [string, number][] = [
    ["skill_match", 0.82],
    ["level_fit", 0.74],
    ["domain", 0.61],
    ["risk_low", 0.68],
    ["overall_fit", 0.79],
  ];
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      role="img"
      aria-label="FitRank architecture: hard rules in code filter candidates, a ModernBERT decision model returns probabilities for five typed questions, policy thresholds band each person as shortlist, review or hidden, and a manager accepts or rejects"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="fr-cp" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      <rect x="8" y="8" width="384" height="284" rx="12" stroke="#27272a" />

      {/* Code rules (left) */}
      <g transform="translate(24 40)">
        <rect width="88" height="148" rx="10" fill="#0a0c10" stroke="#27272a" />
        <text x="12" y="20" fontSize="8" fontFamily="monospace" fill="#67E8F9">rules · code</text>
        {["available", "location", "cost band", "must-haves"].map((r, i) => (
          <g key={r} transform={`translate(12 ${36 + i * 26})`}>
            <rect width="10" height="10" rx="2" fill="#18181b" stroke="#22D3EE" strokeOpacity="0.5" />
            <path d="M2 5 l2.5 2.5 l4 -5" stroke="#67E8F9" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <text x="16" y="8.5" fontSize="7.5" fontFamily="monospace" fill="#a1a1aa">{r}</text>
          </g>
        ))}
      </g>

      {/* Flow → model */}
      <g transform="translate(116 114)">
        <line x1="0" y1="0" x2="20" y2="0" stroke="url(#fr-cp)" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 -4 L26 0 L18 4 Z" fill="#A855F7" />
      </g>

      {/* Decision model with five probability heads (center) */}
      <g transform="translate(146 40)">
        <rect width="128" height="148" rx="10" fill="#18181b" stroke="#27272a" />
        <circle cx="16" cy="17" r="5" fill="none" stroke="url(#fr-cp)" strokeWidth="1.5" />
        <circle cx="16" cy="17" r="2" fill="#67E8F9" className="animate-pulse" />
        <text x="27" y="20" fontSize="8" fontFamily="monospace" fill="#e4e4e7">ModernBERT · 5 heads</text>
        {heads.map(([label, p], i) => (
          <g key={label} transform={`translate(10 ${36 + i * 22})`}>
            <text x="0" y="7" fontSize="7" fontFamily="monospace" fill="#71717a">{label}</text>
            <rect x="0" y="10" width="108" height="4" rx="2" fill="#27272a" />
            <rect x="0" y="10" width={108 * p} height="4" rx="2" fill="url(#fr-cp)" />
            <text x="108" y="7" fontSize="7" fontFamily="monospace" fill="#67E8F9" textAnchor="end">
              {Math.round(p * 100)}%
            </text>
          </g>
        ))}
      </g>

      {/* Flow → policy */}
      <g transform="translate(278 114)">
        <line x1="0" y1="0" x2="16" y2="0" stroke="url(#fr-cp)" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 -4 L22 0 L14 4 Z" fill="#A855F7" />
      </g>

      {/* Policy bands (right) */}
      <g transform="translate(304 40)">
        <rect width="72" height="148" rx="10" fill="#0a0c10" stroke="#27272a" />
        <text x="10" y="20" fontSize="8" fontFamily="monospace" fill="#67E8F9">policy</text>
        {[
          ["shortlist", "≥0.80", "#22D3EE"],
          ["review", "≥0.50", "#A855F7"],
          ["hidden", "<0.50", "#52525b"],
        ].map(([band, rule, color], i) => (
          <g key={band} transform={`translate(10 ${34 + i * 36})`}>
            <rect width="52" height="26" rx="6" fill="#18181b" stroke={color} strokeOpacity="0.6" />
            <text x="26" y="11" fontSize="7" fontFamily="monospace" fill="#e4e4e7" textAnchor="middle">{band}</text>
            <text x="26" y="20" fontSize="6.5" fontFamily="monospace" fill="#71717a" textAnchor="middle">{rule}</text>
          </g>
        ))}
      </g>

      {/* Human gate (bottom) */}
      <g transform="translate(24 206)">
        <rect width="352" height="64" rx="10" fill="#0a0c10" stroke="#22D3EE" strokeOpacity="0.4" />
        <text x="14" y="22" fontSize="8" fontFamily="monospace" fill="#67E8F9">manager decides — nothing is auto-assigned</text>
        <g transform="translate(14 34)">
          <rect width="60" height="18" rx="5" fill="#22D3EE" fillOpacity="0.15" stroke="#22D3EE" strokeOpacity="0.6" />
          <text x="30" y="12" fontSize="7.5" fontFamily="monospace" fill="#67E8F9" textAnchor="middle">accept</text>
          <rect x="70" width="60" height="18" rx="5" fill="#18181b" stroke="#3f3f46" />
          <text x="100" y="12" fontSize="7.5" fontFamily="monospace" fill="#a1a1aa" textAnchor="middle">reject</text>
        </g>
        <text x="338" y="47" fontSize="7" fontFamily="monospace" fill="#71717a" textAnchor="end">feedback → retrain ↺</text>
      </g>
    </svg>
  );
}
