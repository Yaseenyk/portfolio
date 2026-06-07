/** AI Blogger — document generation, frontmatter, and Git-branch deploy. */
export default function AiBloggerArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      role="img"
      aria-label="AI blog pipeline: a generated Markdown document with frontmatter flowing into a Git branch deploy"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="ab-cp" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      <rect x="8" y="8" width="384" height="284" rx="12" stroke="#27272a" />

      {/* generated .mdx document (left) */}
      <g transform="translate(36 40)">
        <rect width="150" height="220" rx="8" fill="#0a0c10" stroke="#27272a" />
        {/* frontmatter block */}
        <rect x="12" y="14" width="126" height="62" rx="5" fill="#18181b" stroke="#22D3EE" strokeOpacity="0.4" />
        <text x="18" y="27" fontSize="7" fontFamily="monospace" fill="#52525b">---</text>
        <text x="18" y="40" fontSize="7.5" fontFamily="monospace" fill="#67E8F9">title:</text>
        <rect x="48" y="34" width="78" height="5" rx="2.5" fill="#3f3f46" />
        <text x="18" y="53" fontSize="7.5" fontFamily="monospace" fill="#67E8F9">slug:</text>
        <rect x="46" y="47" width="60" height="5" rx="2.5" fill="#3f3f46" />
        <text x="18" y="66" fontSize="7.5" fontFamily="monospace" fill="#67E8F9">date:</text>
        <rect x="46" y="60" width="44" height="5" rx="2.5" fill="#3f3f46" />
        <text x="18" y="74" fontSize="7" fontFamily="monospace" fill="#52525b">---</text>
        {/* body lines */}
        {[92, 104, 116, 128, 140, 152, 164, 176, 188, 200].map((y, i) => (
          <rect
            key={y}
            x="14"
            y={y}
            width={i % 3 === 0 ? 122 : i % 2 === 0 ? 96 : 110}
            height="4"
            rx="2"
            fill="#27272a"
          />
        ))}
      </g>

      {/* flow arrow */}
      <g transform="translate(196 145)">
        <line x1="0" y1="0" x2="34" y2="0" stroke="url(#ab-cp)" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 -4 L38 0 L30 4 Z" fill="#A855F7" />
        <text x="2" y="-8" fontSize="7" fontFamily="monospace" fill="#71717a">commit</text>
      </g>

      {/* git branch graph + deploy (right) */}
      <g transform="translate(244 56)">
        <text x="0" y="-2" fontSize="8" fontFamily="monospace" fill="#71717a">main</text>
        <line x1="10" y1="8" x2="10" y2="180" stroke="#27272a" strokeWidth="2" />
        {[16, 60, 104].map((cy) => (
          <circle key={cy} cx="10" cy={cy} r="5" fill="#05070A" stroke="#3f3f46" strokeWidth="2" />
        ))}
        {/* new AI commit */}
        <circle cx="10" cy="148" r="6" fill="#05070A" stroke="url(#ab-cp)" strokeWidth="2.5" />
        <circle cx="10" cy="148" r="2.5" fill="#67E8F9" className="animate-pulse" />
        <text x="24" y="151" fontSize="7.5" fontFamily="monospace" fill="#22D3EE">content(blog): post</text>

        {/* deploy box */}
        <g transform="translate(-6 182)">
          <rect width="120" height="34" rx="7" fill="#18181b" stroke="#22D3EE" strokeOpacity="0.45" />
          <circle cx="18" cy="17" r="8" fill="none" stroke="url(#ab-cp)" strokeWidth="2" />
          <path d="M14 17 l3 3 l5 -6" stroke="#67E8F9" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="34" y="14" fontSize="8" fontFamily="monospace" fill="#e4e4e7">GitHub Pages</text>
          <text x="34" y="25" fontSize="7" fontFamily="monospace" fill="#71717a">output: export → live</text>
        </g>
      </g>
    </svg>
  );
}
