import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function Body() {
  return (
    <>
      <p>
        You wired Claude to your orders database with a hand-rolled tool. Then you
        needed the same database in your support bot, your internal CLI, and a
        teammate&apos;s agent — so you copy-pasted the integration four times, and
        now a schema change means four edits and three forgotten ones. Tool use
        (Lesson 4) solved <em>how</em> the model calls a function; it said nothing
        about how that capability is packaged, discovered, and reused. The Model
        Context Protocol is that missing layer.
      </p>

      <h2>Core Architectural Concepts &amp; Trade-offs</h2>
      <p>
        MCP is an open protocol that standardizes how an AI client talks to an
        external capability — think of it as a USB-C port for tools. A{" "}
        <strong>server</strong> exposes three kinds of primitive:{" "}
        <strong>tools</strong> (functions the model can invoke),{" "}
        <strong>resources</strong> (read-only context the model can pull in by
        URI), and <strong>prompts</strong> (reusable templated workflows). A{" "}
        <strong>client</strong> — Claude Code, the desktop app, your own agent —
        connects, calls <code>list_tools</code> to <em>discover</em> what&apos;s
        available, and invokes by name. The integration is written once, behind a
        stable contract, and every client speaks the same wire format.
      </p>
      <p>
        The decoupling is the whole point. Without MCP, every agent embeds bespoke
        glue for every system, and N agents × M systems is an N×M maintenance
        matrix. With MCP, each system ships one server and each agent speaks one
        protocol, collapsing N×M into N+M. Your orders server is authored, tested,
        and versioned in one place; a schema change is one edit, and every
        connected client picks it up through discovery rather than a redeploy.
      </p>
      <p>
        Transport is a deliberate choice with security weight. <code>stdio</code>{" "}
        runs the server as a local subprocess — lowest latency, no network surface,
        ideal for local dev tooling and filesystem access. Streamable HTTP runs it
        as a remote service for shared, multi-user, or cloud deployments, at the
        cost of needing real auth and network hardening. Local-first by default;
        reach for HTTP when a capability genuinely must be shared across machines.
      </p>
      <p>
        The trade-offs mirror tool use, amplified. Every server&apos;s tool
        schemas load into the context window, so connecting a dozen chatty servers
        silently inflates token cost on every turn — the motivation for the
        aggregation gateway in Lesson 13. And an MCP server is an execution and
        data-egress boundary: it runs with whatever credentials you hand it and
        can read whatever you scope it to. Treat each server as a trust boundary —
        least-privilege credentials, explicit allowlists, audited tools — not a
        convenient backdoor.
      </p>

      <h2>A Working MCP Server</h2>
      <p>
        A complete stdio server exposing one tool and one resource. Claude
        discovers both at connect time and calls them on demand.
      </p>
      <Terminal title="orders-server.ts">
        <span className="tok-com">{"// One server, authored once. Every MCP client discovers it the same way."}</span>
        {`
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

const server = new McpServer({ name: "orders", version: "1.0.0" })

// TOOL — a function the model can invoke. The description drives selection.
server.tool(
  "lookup_order",
  "Fetch a single order by its ID. Use for status, totals, or line items.",
  { orderId: z.string() },
  async ({ orderId }) => {
    const order = await db.orders.find(orderId)   // parameterized, scoped creds
    return { content: [{ type: "text", text: JSON.stringify(order) }] }
  },
)

// RESOURCE — read-only context the model can pull in by URI.
server.resource("schema", "schema://orders", async (uri) => ({
  contents: [{ uri: uri.href, text: ORDERS_DDL }],
}))

// stdio: a local subprocess. No network surface, lowest latency.
await server.connect(new StdioServerTransport())`}
      </Terminal>
      <p>
        A client registers it with a few lines of config — command, args, and
        scoped environment. The same server now serves Claude Code, the desktop
        app, and any custom agent without a single line of re-integration.
      </p>
      <Terminal title=".mcp.json — client config">
        {`{
  "mcpServers": {
    "orders": {
      "command": "node",
      "args": ["./dist/orders-server.js"],
      "env": { "DATABASE_URL": "postgres://localhost/shop?sslmode=require" }
    }
  }
}`}
      </Terminal>

      <h2>One Protocol, Many Clients</h2>
      <Diagram
        label="The Model Context Protocol decoupling AI clients from backend systems: multiple clients speak one protocol to multiple servers, each server wrapping one backend system, collapsing an N-by-M integration matrix into N plus M."
        caption="N clients × M systems becomes N + M. Each integration is authored once behind a stable contract."
      >
        <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" role="img">
          <rect x="0" y="0" width="760" height="280" fill="#05070A" />
          <defs>
            <marker id="an5-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0,0 L7,3 L0,6 Z" fill="#64748b" />
            </marker>
          </defs>

          {/* Clients */}
          <text x="110" y="36" fill="#67e8f9" fontFamily="monospace" fontSize="12" textAnchor="middle">MCP clients</text>
          {["Claude Code", "Desktop app", "Custom agent"].map((label, i) => (
            <g key={label}>
              <rect x="32" y={56 + i * 64} width="156" height="46" rx="8" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.5" />
              <text x="110" y={84 + i * 64} fill="#e2e8f0" fontFamily="monospace" fontSize="12" textAnchor="middle">{label}</text>
              <line x1="188" y1={79 + i * 64} x2="300" y2="140" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#an5-arrow)" />
            </g>
          ))}

          {/* Protocol spine */}
          <rect x="300" y="108" width="160" height="64" rx="10" fill="#160d1f" stroke="#a855f7" strokeWidth="2" />
          <text x="380" y="138" fill="#c4b5fd" fontFamily="monospace" fontSize="13" textAnchor="middle">MCP</text>
          <text x="380" y="157" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">discover · invoke</text>

          {/* Servers */}
          <text x="650" y="36" fill="#c4b5fd" fontFamily="monospace" fontSize="12" textAnchor="middle">servers → systems</text>
          {["Postgres", "Filesystem", "HTTP API"].map((label, i) => (
            <g key={label}>
              <line x1="460" y1="140" x2="572" y2={79 + i * 64} stroke="#64748b" strokeWidth="1.5" markerEnd="url(#an5-arrow)" />
              <rect x="572" y={56 + i * 64} width="156" height="46" rx="8" fill="#0b1220" stroke="#a855f7" strokeWidth="1.5" />
              <text x="650" y={84 + i * 64} fill="#e2e8f0" fontFamily="monospace" fontSize="12" textAnchor="middle">{label}</text>
            </g>
          ))}
        </svg>
      </Diagram>
      <p>
        With a capability layer in place, the next lever is the model&apos;s own
        reasoning effort:{" "}
        <a href="/blog/adaptive-extended-thinking-latency-vs-compute">
          adaptive extended thinking — latency vs. compute
        </a>
        . Or browse{" "}
        <a href="/anthropic-roadmap">the full roadmap</a>.
      </p>
    </>
  );
}

export const modelContextProtocolFoundations: BlogPost = {
  slug: "model-context-protocol-mcp-server-foundations",
  title: "Model Context Protocol: MCP Server Foundations",
  description:
    "Hard-wiring integrations into every agent doesn't scale. MCP is a USB-C port for tools: author a server once, and any client discovers and calls it over one protocol.",
  keywords: [
    "Model Context Protocol",
    "MCP server",
    "MCP tools resources",
    "Claude MCP",
    "Anthropic MCP",
    "stdio transport",
    "AI integrations",
    "MCP SDK",
  ],
  publishedAt: "2026-06-06",
  readingMinutes: 9,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Anthropic", "Claude", "MCP"],
  takeaways: [
    "MCP is an open protocol — a USB-C port for tools — where servers expose tools, resources, and prompts, and any client connects, discovers via list_tools, and invokes by name.",
    "It collapses an N agents × M systems integration matrix into N + M: each system ships one versioned server, each agent speaks one protocol, and schema changes are a single edit.",
    "Use the stdio transport for local subprocess tools (no network surface, lowest latency) and streamable HTTP only when a capability must be shared across machines.",
    "Every server's schemas load into the context window and run with the credentials you grant — treat each as a trust boundary with least-privilege creds and explicit allowlists.",
  ],
  Body,
};
