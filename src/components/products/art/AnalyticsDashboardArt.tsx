/** Analytics dashboard: two Google data sources flowing into one page of charts and tables. */
export default function AnalyticsDashboardArt() {
  const bars = [34, 52, 44, 66, 58, 82, 70, 94];
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      role="img"
      aria-label="Analytics dashboard: Google Analytics and Search Console feeding one page with a line chart, bars and a ranked list"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="ad-cp" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="ad-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22D3EE" stopOpacity="0.28" />
          <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="8" y="8" width="384" height="284" rx="12" stroke="#27272a" />

      {/* two sources (left) */}
      <g transform="translate(26 54)">
        <rect width="74" height="46" rx="8" fill="#0a0c10" stroke="#27272a" />
        <text x="10" y="19" fontSize="8" fontFamily="monospace" fill="#67E8F9">GA4</text>
        <rect x="10" y="27" width="44" height="4" rx="2" fill="#27272a" />
        <rect x="10" y="35" width="30" height="4" rx="2" fill="#27272a" />
      </g>
      <g transform="translate(26 124)">
        <rect width="74" height="46" rx="8" fill="#0a0c10" stroke="#27272a" />
        <text x="10" y="19" fontSize="8" fontFamily="monospace" fill="#C084FC">Search Console</text>
        <rect x="10" y="27" width="50" height="4" rx="2" fill="#27272a" />
        <rect x="10" y="35" width="36" height="4" rx="2" fill="#27272a" />
      </g>

      {/* merge arrows */}
      <path d="M100 77 C124 77 124 125 148 125" stroke="url(#ad-cp)" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 147 C124 147 124 125 148 125" stroke="url(#ad-cp)" strokeWidth="2" strokeLinecap="round" />
      <path d="M144 120 L152 125 L144 130 Z" fill="#A855F7" />

      {/* the dashboard page (right) */}
      <g transform="translate(156 36)">
        <rect width="216" height="228" rx="10" fill="#0a0c10" stroke="#27272a" />
        <rect x="12" y="12" width="48" height="6" rx="3" fill="#3f3f46" />
        <circle cx="198" cy="15" r="3" fill="#22C55E" />

        {/* kpi tiles */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${12 + i * 66} 28)`}>
            <rect width="60" height="34" rx="6" fill="#11161d" stroke="#27272a" />
            <rect x="8" y="8" width="22" height="3" rx="1.5" fill="#52525b" />
            <rect x="8" y="17" width="30" height="7" rx="2" fill="#e4e4e7" fillOpacity="0.85" />
          </g>
        ))}

        {/* line chart */}
        <g transform="translate(12 74)">
          <rect width="192" height="72" rx="6" fill="#11161d" stroke="#27272a" />
          <path d="M8 56 L30 46 L52 50 L74 32 L96 38 L118 24 L140 30 L162 16 L184 20 L184 66 L8 66 Z" fill="url(#ad-fill)" />
          <path d="M8 56 L30 46 L52 50 L74 32 L96 38 L118 24 L140 30 L162 16 L184 20" stroke="#22D3EE" strokeWidth="1.8" strokeLinejoin="round" />
        </g>

        {/* bars + ranked list */}
        <g transform="translate(12 156)">
          <rect width="92" height="60" rx="6" fill="#11161d" stroke="#27272a" />
          {bars.map((h, i) => (
            <rect key={i} x={8 + i * 10} y={52 - h * 0.46} width="6" height={h * 0.46} rx="1.5" fill="url(#ad-cp)" />
          ))}
        </g>
        <g transform="translate(112 156)">
          <rect width="92" height="60" rx="6" fill="#11161d" stroke="#27272a" />
          {[88, 66, 52, 34].map((w, i) => (
            <g key={i} transform={`translate(8 ${10 + i * 12})`}>
              <rect width={w * 0.7} height="4" rx="2" fill="#22D3EE" fillOpacity={0.9 - i * 0.18} />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
