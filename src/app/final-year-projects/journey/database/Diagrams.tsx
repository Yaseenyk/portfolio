/**
 * Chapter 4 diagram — the notice-board schema: two tables, one relationship.
 * Drawn exactly like the prose describes it: store a fact once, point at it.
 */

export function SchemaDiagram() {
  const row = (
    x: number,
    y: number,
    name: string,
    type: string,
    accent?: string,
  ) => (
    <g key={`${x}-${name}`}>
      <text x={x + 14} y={y} fontFamily="monospace" fontSize="10.5" fill={accent ?? "#a1a1aa"}>
        {name}
      </text>
      <text x={x + 176} y={y} textAnchor="end" fontFamily="monospace" fontSize="9" fill="#52525b">
        {type}
      </text>
    </g>
  );

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · two tables, one relationship
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <svg
          viewBox="0 0 760 280"
          className="h-auto w-full"
          role="img"
          aria-label="The users table and the notices table. The notices table's author_id column is a foreign key pointing at the users table's id — one user writes many notices."
        >
          <defs>
            <marker id="sc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#A855F7" />
            </marker>
          </defs>

          {/* users table */}
          <rect x="60" y="40" width="200" height="168" rx="12" fill="rgba(34,211,238,0.04)" stroke="#22D3EE" strokeWidth="1.5" />
          <rect x="60" y="40" width="200" height="34" rx="12" fill="rgba(34,211,238,0.08)" stroke="none" />
          <line x1="60" y1="74" x2="260" y2="74" stroke="#22D3EE" strokeWidth="1" opacity="0.4" />
          <text x="160" y="62" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#22D3EE">users</text>
          {row(60, 96, "id", "unique №", "#67E8F9")}
          {row(60, 118, "name", "text")}
          {row(60, 140, "email", "text · unique")}
          {row(60, 162, "password_hash", "text")}
          {row(60, 184, "role", "student | admin")}

          {/* notices table */}
          <rect x="480" y="40" width="220" height="190" rx="12" fill="rgba(168,85,247,0.04)" stroke="#A855F7" strokeWidth="1.5" />
          <rect x="480" y="40" width="220" height="34" rx="12" fill="rgba(168,85,247,0.08)" stroke="none" />
          <line x1="480" y1="74" x2="700" y2="74" stroke="#A855F7" strokeWidth="1" opacity="0.4" />
          <text x="590" y="62" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#A855F7">notices</text>
          {row(480, 96, "id", "unique №", "#67E8F9")}
          {row(480, 118, "title", "text · not empty")}
          {row(480, 140, "body", "text")}
          {row(480, 162, "author_id", "foreign key", "#A855F7")}
          {row(480, 184, "created_at", "timestamp")}
          {row(480, 206, "hidden", "true | false")}

          {/* relationship arrow: notices.author_id -> users.id */}
          <path d="M478 158 C 400 158, 340 96, 266 92" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="6 4" markerEnd="url(#sc-arrow)" />
          <text x="368" y="112" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#A855F7">&ldquo;written by user № …&rdquo;</text>

          {/* one-to-many note */}
          <text x="368" y="252" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#71717a">one user → many notices · the fact is stored once, pointed at from everywhere</text>
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        author_id points, never copies. Names can change in one place because they live in one place.
      </figcaption>
    </figure>
  );
}
