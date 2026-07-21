import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function CostCascadeDiagram() {
  return (
    <Diagram
      label="A cost-control cascade for an AI request. The request first checks a semantic cache; a hit returns for zero cost. A miss goes to a router that sends easy queries to a small cheap model and escalates only hard ones to a frontier model. Every call writes a cost ledger entry tagged by tenant."
      caption="Three levers, in order of leverage: don't pay twice (cache), don't overpay (route to the cheapest model that can answer), and always know who pays (per-tenant attribution)."
    >
      <svg viewBox="0 0 760 250" role="img" aria-label="AI cost-control cascade">
        <defs>
          <marker id="f-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* request */}
        <rect x="20" y="100" width="104" height="48" rx="10" fill="#0b1018" stroke="#67E8F9" />
        <text x="72" y="129" fill="#67E8F9" fontFamily="monospace" fontSize="11" textAnchor="middle">
          request
        </text>

        {/* cache */}
        <line x1="124" y1="124" x2="176" y2="124" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#f-arrow)" />
        <rect x="180" y="100" width="120" height="48" rx="10" fill="rgba(103,232,249,0.06)" stroke="#67E8F9" />
        <text x="240" y="122" fill="#67E8F9" fontFamily="monospace" fontSize="11" textAnchor="middle">
          semantic cache
        </text>
        <text x="240" y="138" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          hit → $0
        </text>
        <line x1="240" y1="148" x2="240" y2="196" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#f-arrow)" />
        <text x="240" y="212" fill="#22D3EE" fontFamily="monospace" fontSize="9" textAnchor="middle">
          cached answer
        </text>

        {/* router */}
        <line x1="300" y1="124" x2="352" y2="124" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#f-arrow)" />
        <rect x="356" y="100" width="110" height="48" rx="10" fill="#0b1018" stroke="#A855F7" />
        <text x="411" y="122" fill="#A855F7" fontFamily="monospace" fontSize="11" textAnchor="middle">
          router
        </text>
        <text x="411" y="138" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          miss · by difficulty
        </text>

        {/* small model */}
        <line x1="466" y1="112" x2="540" y2="74" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#f-arrow)" />
        <rect x="544" y="50" width="180" height="44" rx="10" fill="rgba(34,211,238,0.06)" stroke="#22D3EE" />
        <text x="634" y="70" fill="#22D3EE" fontFamily="monospace" fontSize="10" textAnchor="middle">
          small model · ~80%
        </text>
        <text x="634" y="85" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          cheap, fast
        </text>

        {/* frontier model */}
        <line x1="466" y1="136" x2="540" y2="174" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#f-arrow)" />
        <rect x="544" y="152" width="180" height="44" rx="10" fill="rgba(251,113,133,0.06)" stroke="#fb7185" />
        <text x="634" y="172" fill="#fb7185" fontFamily="monospace" fontSize="10" textAnchor="middle">
          frontier · ~20%
        </text>
        <text x="634" y="187" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          escalate hard queries
        </text>
      </svg>
    </Diagram>
  );
}

function Body() {
  return (
    <>
      <p>
        I treat token spend like unit economics with a named owner, not a line item I
        discover after finance runs the card. At scale, cost per request is something
        you engineer. The three levers with the most leverage are simple: a semantic
        cache so you never pay for the same answer twice, a router so trivial queries
        don&apos;t touch a frontier model, and per-tenant attribution so every dollar
        has a name. Tuning a single prompt is tactics; designing the cost curve is
        architecture. The same mindset that drove my Serialization Adapter on
        IntegrateX — stripping non-essential React Flow UI metadata before persistence
        for a 94% payload reduction — applies here: stop shipping what you don&apos;t
        need, whether that&apos;s UI chrome on the wire or redundant context to a
        model.
      </p>

      <h2>The cheapest token is the one you never spend</h2>
      <p>
        Real traffic repeats. The same question shows up a hundred slightly different
        ways. A{" "}
        <a href="/blog/semantic-caching-edge-rag">semantic cache</a> embeds the query
        and returns a prior answer when a near-identical one exists, collapsing your
        heaviest edges to roughly zero cost and near-zero latency. That&apos;s pure
        subtraction: a hit isn&apos;t a cheaper call, it&apos;s no call at all. It
        also trims load-induced tail latency and streaming backpressure — the miss
        path is the only thing downstream systems ever see.
      </p>

      <CostCascadeDiagram />

      <h2>Route to the cheapest model that can answer</h2>
      <p>
        Sending everything to your best model is how you get a heroic demo and a
        painful invoice. Classify difficulty first, send the easy majority to a
        smaller, faster model, and escalate the hard minority. If a small model handles
        ~80% at a fraction of the rate, your blended cost drops with it and latency
        improves for most users. Guard the cheap path with quality gates and fall back
        when they trip. In the pattern I call Trinity Architecture, the router lives
        in the Reactive State / Orchestration layer: the UI only renders and dispatches,
        and the Data / Serialization Adapter translates model choices and payloads —
        no layer talks past its neighbor. That clean split keeps routing decisions
        testable and cost-aware instead of sprinkled through components.
      </p>

      <Terminal title="route.ts — cache, route, attribute">
        <span className="tok-com">{`// don't pay twice · don't overpay · always know who pays`}</span>
        {"\n"}
        {`const hit = await cache.lookup(q);\n`}
        {`if (hit) return ledger.record(tenant, "cache", 0), hit;\n\n`}
        {`const tier = classify(q);        // "easy" | "hard"\n`}
        {`const model = tier === "easy" ? CHEAP : FRONTIER;\n`}
        {`const res = await model.generate(q);\n\n`}
        {`ledger.record(tenant, model.name, cost(res.usage)); // per-tenant showback\n`}
        {`return res;`}
      </Terminal>

      <h2>Attribution turns a bill into a budget</h2>
      <p>
        An unlabeled invoice is undebuggable. Spend can double and you still won&apos;t
        know which tenant, feature, or model is driving it. Tag every call with the
        tenant and write a ledger entry, and cost becomes a dimension you can group,
        alert, and forecast on — showback per customer, a budget tripwire before a loop
        burns cash, and a real answer to &quot;is this feature profitable?&quot;. In my
        Trinity split, the orchestrator owns the ledger updates, and the adapter only
        shapes usage data; the UI never touches attribution, it just benefits from the
        guardrails.
      </p>

      <blockquote>
        AI cost isn&apos;t something you learn at month end — it&apos;s something you
        wire in. Cache so you never pay twice, route so you don&apos;t overpay, and
        attribute so every token traces to an owner.
      </blockquote>

      <p>
        FinOps is the governance layer over the tactical{" "}
        <a href="/blog/token-economics-cost-optimizing-llm-apps">token economics</a> of
        a single app, and it rides the same{" "}
        <a href="/blog/router-agent-multi-agent-orchestration">router pattern</a> that
        coordinates multi-agent work. Keep the layers tight — presentation, orchestration,
        adapter — and the costs stay predictable. Continue on the <a href="/roadmap">roadmap</a>.
      </p>
    </>
  );
}

export const finopsForAi: BlogPost = {
  slug: "finops-for-ai-cost-governance",
  title: "FinOps for AI: Routing, Caching, and Cost Attribution",
  description:
    "At scale, cost per request is an architectural property you design, not an invoice surprise. FinOps for AI uses three levers — a semantic cache, a difficulty-aware model router, and per-tenant attribution — to govern the token-spend curve.",
  keywords: [
    "FinOps for AI",
    "LLM cost optimization",
    "model routing",
    "semantic caching",
    "cost attribution",
    "AI cost governance",
  ],
  publishedAt: "2026-06-04",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["AI", "FinOps", "Architecture"],
  takeaways: [
    "Cache first: a semantic-cache hit is no model call at all, collapsing your most common questions to near-zero cost.",
    "Route by difficulty so the easy majority hits a cheap model and only the hard minority escalates to a frontier model.",
    "Attribute every call to a tenant and model so cost becomes a dimension you can budget, alert on, and answer profitability questions with.",
  ],
  Body,
};
