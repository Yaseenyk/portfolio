import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function McpDiagram() {
  return (
    <Diagram
      label="On the left, three models each wired to four tools form a dense N-times-M tangle of bespoke integrations. On the right, models and tools both connect to a single MCP protocol hub, collapsing the wiring to N plus M."
      caption="Without a protocol, every model-to-tool pair is bespoke glue: N×M integrations that rot. MCP makes each model a client and each tool a server — N+M, composable."
    >
      <svg viewBox="0 0 760 320" role="img" aria-label="N×M integrations collapsing into MCP">
        {/* LEFT: tangle */}
        <text x="170" y="30" fill="#fb7185" fontFamily="monospace" fontSize="11" textAnchor="middle">
          N × M bespoke glue
        </text>
        {[70, 140, 210].map((y, mi) => (
          <g key={`m${mi}`}>
            <circle cx="70" cy={y} r="16" fill="#0b1018" stroke="#22D3EE" />
            <text x="70" y={y + 4} fill="#22D3EE" fontFamily="monospace" fontSize="9" textAnchor="middle">
              M{mi + 1}
            </text>
          </g>
        ))}
        {[55, 110, 165, 220].map((y, ti) => (
          <g key={`t${ti}`}>
            <rect x="250" y={y - 12} width="40" height="24" rx="5" fill="#0b1018" stroke="#A855F7" />
            <text x="270" y={y + 4} fill="#c4b5fd" fontFamily="monospace" fontSize="8" textAnchor="middle">
              T{ti + 1}
            </text>
          </g>
        ))}
        {[70, 140, 210].map((my) =>
          [55, 110, 165, 220].map((ty) => (
            <line key={`${my}-${ty}`} x1="86" y1={my} x2="250" y2={ty} stroke="#3f3f46" strokeWidth="0.8" opacity="0.7" />
          )),
        )}

        {/* arrow */}
        <text x="380" y="145" fill="#52525b" fontFamily="monospace" fontSize="20" textAnchor="middle">
          ⇒
        </text>

        {/* RIGHT: MCP hub */}
        <text x="600" y="30" fill="#22D3EE" fontFamily="monospace" fontSize="11" textAnchor="middle">
          N + M via MCP
        </text>
        <rect x="560" y="120" width="90" height="80" rx="12" fill="rgba(34,211,238,0.07)" stroke="#22D3EE" />
        <text x="605" y="155" fill="#22D3EE" fontFamily="monospace" fontSize="11" textAnchor="middle">
          MCP
        </text>
        <text x="605" y="172" fill="#71717a" fontFamily="monospace" fontSize="8" textAnchor="middle">
          protocol
        </text>

        {[120, 160, 200].map((y, mi) => (
          <g key={`rm${mi}`}>
            <circle cx="450" cy={y} r="15" fill="#0b1018" stroke="#22D3EE" />
            <text x="450" y={y + 4} fill="#22D3EE" fontFamily="monospace" fontSize="8" textAnchor="middle">
              M{mi + 1}
            </text>
            <line x1="465" y1={y} x2="558" y2="160" stroke="#52525b" strokeWidth="1" />
          </g>
        ))}
        {[100, 145, 190, 235].map((y, ti) => (
          <g key={`rt${ti}`}>
            <rect x="700" y={y - 12} width="44" height="24" rx="5" fill="#0b1018" stroke="#A855F7" />
            <text x="722" y={y + 4} fill="#c4b5fd" fontFamily="monospace" fontSize="8" textAnchor="middle">
              srv{ti + 1}
            </text>
            <line x1="652" y1="160" x2="700" y2={y} stroke="#52525b" strokeWidth="1" />
          </g>
        ))}
      </svg>
    </Diagram>
  );
}

function Body() {
  return (
    <>
      <p>
        Every integration you hand-wire between a model and a tool is a bespoke
        adapter — and bespoke adapters rot. Three models times four tools is twelve
        custom integrations to build, version, and maintain. The Model Context
        Protocol is the USB-C of AI tooling: one standard so any model can discover
        and call any tool, resource, or prompt without the N×M glue.
      </p>

      <h2>It standardises how capability is exposed</h2>
      <p>
        MCP defines a small, consistent contract for three things a model needs from
        the outside world: <strong>tools</strong> it can call, <strong>resources</strong>{" "}
        it can read, and <strong>prompts</strong> it can reuse. A tool provider
        implements the protocol once as a server; any MCP-aware client can then
        discover and use it. The integration stops being &quot;wire this model to
        this API&quot; and becomes &quot;speak the protocol.&quot;
      </p>

      <McpDiagram />

      <h2>It separates capability from reasoning</h2>
      <p>
        The deeper win is the boundary. An MCP server owns a capability — querying a
        database, hitting an internal API — and knows nothing about which model will
        use it or how it reasons. The client owns the reasoning and knows nothing
        about how the capability is implemented. That clean separation is what lets
        the two sides evolve independently: swap the model without touching the
        tools, add a tool without retraining anything.
      </p>

      <Terminal title="server.ts — an MCP tool server">
        <span className="tok-com">{`// expose a capability once; any MCP client can discover it`}</span>
        {"\n"}
        {`server.tool("search_docs", {\n`}
        {`  description: "Semantic search over the product docs",\n`}
        {`  inputSchema: { query: z.string(), topK: z.number().default(6) },\n`}
        {`}, async ({ query, topK }) => {\n`}
        {`  const hits = await store.search({ vector: await embed(query), topK });\n`}
        {`  return { content: hits.map(h => ({ type: "text", text: h.chunk })) };\n`}
        {`});`}
      </Terminal>

      <h2>N×M becomes N+M</h2>
      <p>
        The combinatorial math is the whole point. Without a protocol, every new
        model has to be wired to every existing tool, and every new tool to every
        existing model — the integration surface grows as the product. With MCP, a
        new model is one client and a new tool is one server: the surface grows as
        the <em>sum</em>. That&apos;s the difference between an integration layer
        that compounds in cost and one that scales linearly.
      </p>

      <blockquote>
        MCP doesn&apos;t make your model smarter. It makes your integrations
        composable — turning a rotting mesh of bespoke adapters into a protocol any
        side can plug into.
      </blockquote>

      <p>
        MCP servers are how the <a href="/blog/agentic-control-loops">control loop</a>{" "}
        gets its hands without bespoke wiring — and a disciplined protocol pairs
        naturally with disciplined{" "}
        <a href="/blog/payload-compression-serialization-patterns">payload design</a>.
        Continue on the <a href="/roadmap">roadmap</a>.
      </p>
    </>
  );
}

export const modelContextProtocol: BlogPost = {
  slug: "model-context-protocol-mcp",
  title: "The Model Context Protocol: USB-C for AI Tooling",
  description:
    "Every integration you hand-wire between a model and a tool rots. MCP is a single protocol so any model can discover and call any tool, resource, or prompt — collapsing N×M bespoke adapters into N+M servers and clients.",
  keywords: [
    "Model Context Protocol",
    "MCP",
    "AI tool integration",
    "agent tooling",
    "LLM interoperability",
    "MCP server",
  ],
  publishedAt: "2026-05-18",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["Agentic AI", "Architecture", "AI"],
  takeaways: [
    "MCP standardises how tools, resources, and prompts are exposed so any model can discover and use them.",
    "It separates capability (server) from reasoning (client/model), letting each side evolve independently.",
    "It turns N×M bespoke integrations into N+M servers and clients — the integration surface grows linearly, not combinatorially.",
  ],
  Body,
};
