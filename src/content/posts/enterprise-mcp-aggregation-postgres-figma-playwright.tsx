import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function Body() {
  return (
    <>
      <p>
        Your production agent needs to query Postgres, read a Figma design, and
        drive a Playwright browser — so you wired in three MCP servers (Lesson 5)
        and shipped it. Now every request drags three servers&apos; worth of tool
        schemas through the context window, three sets of credentials live in
        three configs, and a teammate&apos;s agent re-does the same wiring with
        subtly different auth. Connecting MCP servers is easy; <em>governing</em>{" "}
        a fleet of them is the enterprise problem.
      </p>

      <h2>Core Architectural Concepts &amp; Trade-offs</h2>
      <p>
        The pattern is an <strong>MCP aggregation gateway</strong>: a single MCP
        server that the agent connects to, which itself fans out to many backend
        MCP servers. The agent sees one governed surface; the gateway owns the
        connections to Postgres, Figma, Playwright, and the rest. This is the same
        N+M collapse MCP gave you for integrations (Lesson 5), now applied to the
        servers themselves — one connection point, one auth boundary, one place to
        enforce policy, instead of every agent managing the full mesh.
      </p>
      <p>
        Aggregation forces <strong>namespacing</strong>, because tool names
        collide. Postgres and Playwright might both expose <code>query</code>; the
        gateway prefixes them — <code>postgres__query</code>,{" "}
        <code>browser__query</code> — so the agent can address the right one
        unambiguously. The gateway also becomes the natural <strong>auth
        broker</strong>: it holds the scoped credentials for each backend, and the
        agent never sees a database password or a Figma token. Credentials live in
        one audited place with least privilege per backend, not scattered across
        every agent&apos;s environment.
      </p>
      <p>
        The dominant cost is context, and the gateway is where you control it.
        Every backend tool schema the gateway exposes is re-sent on every turn
        (Lesson 1), so naively aggregating ten servers can put a hundred tool
        definitions in the window — token bloat and worse tool selection, because
        the model is choosing from noise. The gateway should <strong>filter and
        lazily expose</strong>: present only the tools an agent&apos;s role needs,
        and cache the aggregated schema as a stable prefix (Lesson 9) so the whole
        toolset bills at cache rates. Governance and cost control are the same
        knob.
      </p>
      <p>
        The trade-off is a new hop and a single point of failure. The gateway adds
        latency and an availability dependency — if it&apos;s down, every agent
        loses every tool — so it needs health checks, per-backend timeouts, and
        graceful degradation when one backend is unreachable (a failing Figma
        server shouldn&apos;t take down database access). You&apos;re trading the
        sprawl of an unmanaged mesh for the discipline of a managed chokepoint;
        that&apos;s the right trade at scale, but only if the chokepoint is built
        to stay up.
      </p>

      <h2>An Aggregation Gateway</h2>
      <p>
        One gateway server, three namespaced backends, role-filtered tools, and
        per-backend scoped credentials the agent never sees.
      </p>
      <Terminal title="mcp-gateway.ts">
        <span className="tok-com">{"// One surface to the agent; the gateway owns the fan-out, auth, and policy."}</span>
        {`
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { connectBackend } from "./backends"

// Each backend: its own scoped credentials, held only here.
const BACKENDS = {
  postgres: { url: "stdio://pg-mcp",   env: { DATABASE_URL: secrets.PG_RO } },
  figma:    { url: "https://figma-mcp", auth: secrets.FIGMA_TOKEN },
  browser:  { url: "stdio://playwright-mcp" },
} as const

// Role → which namespaced tools are exposed. Least privilege per agent.
const ROLE_TOOLS: Record<string, string[]> = {
  analyst:  ["postgres__query", "figma__get_file"],
  qa:       ["browser__navigate", "browser__click", "postgres__query"],
}

export async function buildGateway(role: string) {
  const gateway = new McpServer({ name: "gateway", version: "1.0.0" })
  const allowed = new Set(ROLE_TOOLS[role] ?? [])

  for (const [ns, cfg] of Object.entries(BACKENDS)) {
    const backend = await connectBackend(cfg)        // auth brokered here
    for (const tool of await backend.listTools()) {
      const name = \`\${ns}__\${tool.name}\`            // namespace to avoid collisions
      if (!allowed.has(name)) continue                // filter → small context
      gateway.tool(name, tool.description, tool.schema, (args) =>
        backend.callTool(tool.name, args),            // proxy through
      )
    }
  }
  return gateway   // exposes only this role's tools, as a cacheable prefix
}`}
      </Terminal>
      <p>
        The agent connects to one server and sees a handful of role-scoped,
        namespaced tools. The database password, the Figma token, and the
        full backend mesh stay behind the gateway.
      </p>

      <h2>One Governed Surface</h2>
      <Diagram
        label="An MCP aggregation gateway: a single agent connects to one gateway server that namespaces, role-filters, and brokers authentication to multiple backend MCP servers — Postgres, Figma, and Playwright — each holding its own scoped credentials."
        caption="The agent sees one role-scoped, namespaced surface. The gateway owns auth, filtering, and the backend mesh."
      >
        <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" role="img">
          <rect x="0" y="0" width="760" height="280" fill="#05070A" />
          <defs>
            <marker id="an13-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#22d3ee" />
            </marker>
            <marker id="an13-arrow-p" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#a855f7" />
            </marker>
          </defs>

          <rect x="36" y="110" width="140" height="60" rx="9" fill="#0b1220" stroke="#22d3ee" strokeWidth="2" />
          <text x="106" y="136" fill="#67e8f9" fontFamily="monospace" fontSize="13" textAnchor="middle">agent</text>
          <text x="106" y="155" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">role: analyst</text>

          <line x1="176" y1="140" x2="248" y2="140" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an13-arrow)" />

          <rect x="250" y="84" width="190" height="112" rx="10" fill="#160d1f" stroke="#a855f7" strokeWidth="2.2" />
          <text x="345" y="110" fill="#c4b5fd" fontFamily="monospace" fontSize="13" textAnchor="middle">MCP gateway</text>
          <text x="345" y="132" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">namespace · filter by role</text>
          <text x="345" y="150" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">auth broker · cache schema</text>
          <text x="345" y="168" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">health · timeouts · degrade</text>

          {[
            { y: 50, t: "postgres__*", s: "scoped: PG_RO" },
            { y: 118, t: "figma__*", s: "scoped: FIGMA_TOKEN" },
            { y: 186, t: "browser__*", s: "Playwright" },
          ].map((b) => (
            <g key={b.t}>
              <line x1="440" y1="140" x2="552" y2={b.y + 22} stroke="#a855f7" strokeWidth="2" markerEnd="url(#an13-arrow-p)" />
              <rect x="554" y={b.y} width="176" height="44" rx="8" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.5" />
              <text x="642" y={b.y + 20} fill="#e2e8f0" fontFamily="monospace" fontSize="12" textAnchor="middle">{b.t}</text>
              <text x="642" y={b.y + 36} fill="#7f8ea3" fontFamily="monospace" fontSize="9" textAnchor="middle">{b.s}</text>
            </g>
          ))}
        </svg>
      </Diagram>
      <p>
        A governed tool surface is only trustworthy if you can prove the agent
        behaves. The next lesson makes that measurable:{" "}
        <a href="/blog/evaluation-driven-prompt-engineering-golden-datasets">
          eval-driven prompt engineering with golden datasets
        </a>
        . Or browse{" "}
        <a href="/anthropic-roadmap">the full roadmap</a>.
      </p>
    </>
  );
}

export const enterpriseMcpAggregation: BlogPost = {
  slug: "enterprise-mcp-aggregation-postgres-figma-playwright",
  title: "Enterprise MCP Aggregation: Postgres, Figma & Playwright",
  description:
    "Wiring three MCP servers into an agent is easy; governing a fleet is the enterprise problem. An aggregation gateway gives one namespaced, auth-brokered, role-filtered surface.",
  keywords: [
    "MCP aggregation",
    "MCP gateway",
    "enterprise MCP",
    "Postgres MCP",
    "Figma MCP",
    "Playwright MCP",
    "tool namespacing",
    "MCP auth broker",
  ],
  publishedAt: "2026-05-29",
  readingMinutes: 9,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Anthropic", "MCP", "Architecture"],
  takeaways: [
    "An MCP aggregation gateway is a single server the agent connects to that fans out to many backends, collapsing the server mesh into one governed surface with one auth boundary.",
    "Aggregation requires namespacing (postgres__query vs browser__query) to avoid tool-name collisions, and makes the gateway the natural auth broker holding scoped per-backend credentials.",
    "Every exposed schema is re-sent each turn, so the gateway must role-filter and lazily expose tools and cache the aggregated schema as a stable prefix — governance and cost control are the same knob.",
    "The gateway is a new hop and single point of failure, so it needs health checks, per-backend timeouts, and graceful degradation when one backend is down.",
  ],
  Body,
};
