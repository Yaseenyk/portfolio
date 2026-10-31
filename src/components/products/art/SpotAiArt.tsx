/** SpotAI — a phone tracking a squat on device, the gym's leaderboard, and the owner's dues view. */
export default function SpotAiArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      role="img"
      aria-label="SpotAI architecture: pose tracked on the phone, rep counts and flags to the API, a gym leaderboard and an owner dashboard with dues"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="sp-cp" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="sp-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#67E8F9" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#67E8F9" stopOpacity="0.9" />
          <stop offset="1" stopColor="#A855F7" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <rect x="8" y="8" width="384" height="284" rx="12" stroke="#27272a" />

      {/* Phone: pose on device (left) */}
      <g transform="translate(30 36)">
        <rect width="118" height="228" rx="16" fill="#0a0c10" stroke="#27272a" />
        <rect x="41" y="9" width="36" height="5" rx="2.5" fill="#27272a" />
        {/* viewfinder corners */}
        <path d="M18 34 v-8 a4 4 0 0 1 4 -4 h8" stroke="url(#sp-cp)" strokeWidth="2" />
        <path d="M100 22 h-8 M100 22 v8" stroke="url(#sp-cp)" strokeWidth="2" />
        {/* skeleton */}
        <g stroke="#67E8F9" strokeWidth="2.5" strokeLinecap="round">
          <line x1="59" y1="78" x2="59" y2="126" />
          <line x1="59" y1="92" x2="38" y2="118" />
          <line x1="59" y1="92" x2="80" y2="118" />
          <line x1="59" y1="126" x2="42" y2="160" />
          <line x1="59" y1="126" x2="76" y2="160" />
          <line x1="42" y1="160" x2="44" y2="198" />
          <line x1="76" y1="160" x2="74" y2="198" />
        </g>
        <circle cx="59" cy="62" r="9" stroke="#f8fafc" strokeWidth="2.5" />
        <circle cx="42" cy="160" r="4" fill="#22D3EE" />
        <circle cx="76" cy="160" r="4" fill="#22D3EE" />
        <circle cx="59" cy="126" r="3" fill="#f8fafc" />
        {/* on-device chip */}
        <rect x="20" y="206" width="78" height="14" rx="7" fill="#18181b" stroke="#22D3EE" strokeOpacity="0.5" />
        <text x="59" y="216" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="#67E8F9" letterSpacing="1">
          ON DEVICE
        </text>
      </g>

      {/* flow: only counts and flags leave the phone */}
      <line x1="150" y1="150" x2="210" y2="150" stroke="url(#sp-line)" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="180" y="140" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="#71717a" letterSpacing="1">
        REPS · FLAGS
      </text>

      {/* API core */}
      <g transform="translate(210 118)">
        <rect width="64" height="64" rx="12" fill="#05070A" stroke="url(#sp-cp)" strokeWidth="2" />
        <text x="32" y="29" textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" fill="#f8fafc" letterSpacing="1">
          API
        </text>
        <text x="32" y="43" textAnchor="middle" fontSize="6.5" fontFamily="ui-monospace, monospace" fill="#71717a" letterSpacing="0.5">
          RLS / GYM
        </text>
        <circle cx="32" cy="52" r="3" fill="#67E8F9" className="animate-pulse" />
      </g>

      {/* leaderboard (top right) */}
      <g transform="translate(300 40)">
        <rect width="84" height="80" rx="10" fill="#0a0c10" stroke="#27272a" />
        <text x="10" y="16" fontSize="6.5" fontFamily="ui-monospace, monospace" fill="#A855F7" letterSpacing="1">
          LEADERBOARD
        </text>
        {[
          ["#1", 60, "#A855F7"],
          ["#2", 46, "#22D3EE"],
          ["#3", 34, "#3f3f46"],
          ["you", 26, "#22D3EE"],
        ].map(([label, w, color], i) => (
          <g key={String(label)} transform={`translate(10 ${26 + i * 13})`}>
            <text y="6" fontSize="6" fontFamily="ui-monospace, monospace" fill="#a1a1aa">
              {label}
            </text>
            <rect x="20" y="1" width={Number(w)} height="5" rx="2.5" fill={String(color)} opacity={i === 3 ? 1 : 0.8} />
          </g>
        ))}
      </g>

      {/* owner dues (bottom right) */}
      <g transform="translate(300 180)">
        <rect width="84" height="80" rx="10" fill="#0a0c10" stroke="#27272a" />
        <text x="10" y="16" fontSize="6.5" fontFamily="ui-monospace, monospace" fill="#22D3EE" letterSpacing="1">
          OWNER · DUES
        </text>
        <text x="10" y="40" fontSize="16" fontWeight="700" fontFamily="ui-sans-serif, system-ui" fill="#f8fafc">
          ₹2,000
        </text>
        <text x="10" y="52" fontSize="6.5" fontFamily="ui-monospace, monospace" fill="#71717a">
          2 overdue · UPI
        </text>
        <rect x="10" y="60" width="64" height="11" rx="5.5" fill="url(#sp-cp)" />
        <text x="42" y="68" textAnchor="middle" fontSize="6" fontWeight="700" fontFamily="ui-sans-serif, system-ui" fill="#05070A">
          REMIND
        </text>
      </g>

      {/* links from API */}
      <line x1="274" y1="140" x2="300" y2="90" stroke="url(#sp-line)" strokeWidth="1.5" />
      <line x1="274" y1="160" x2="300" y2="210" stroke="url(#sp-line)" strokeWidth="1.5" />

      {/* consent note */}
      <text x="200" y="280" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="#52525b" letterSpacing="1">
        CONSENT PER PURPOSE · FRAMES NEVER LEAVE THE PHONE
      </text>
    </svg>
  );
}
