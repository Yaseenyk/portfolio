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
        FinOps for AI is treating token spend as a unit-economics problem with an
        owner, not a surprise on the monthly invoice. At scale, cost per request is an
        architectural property you design — with three levers in order of leverage:
        a semantic cache so you never pay for the same answer twice, a router so easy
        queries don&apos;t hit a frontier model, and per-tenant attribution so every
        dollar has a name. Optimizing a single prompt is tactics; governing the cost
        curve is architecture.
      </p>

      <h2>The cheapest token is the one you never spend</h2>
      <p>
        Real traffic is repetitive — the same question phrased a hundred ways. A{" "}
        <a href="/blog/semantic-caching-edge-rag">semantic cache</a> embeds the query
        and returns a prior answer when a near-identical one exists, which collapses
        your most common questions to roughly zero cost and zero latency. It&apos;s
        the first lever because it&apos;s pure subtraction: a cache hit isn&apos;t a
        cheaper model call, it&apos;s no model call at all. Everything downstream only
        sees genuine cache misses.
      </p>

      <CostCascadeDiagram />

      <h2>Route to the cheapest model that can answer</h2>
      <p>
        Sending every request to your most capable model is paying frontier prices
        for questions a small model answers perfectly. A router classifies difficulty
        first and sends the easy majority to a cheap, fast model, escalating only the
        hard minority. If a small model handles 80% of traffic at a fraction of the
        per-token price, your blended cost drops by most of that 80% — without the
        users on the easy path noticing anything but lower latency. Quality gates on
        the cheap path catch the rare misroute and escalate it.
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
        An unlabeled invoice is undebuggable: you can see spend doubled but not which
        tenant, feature, or model did it. Tag every call with the tenant and write a
        ledger entry, and cost becomes a dimension you can group by — showback per
        customer, a budget alert before a runaway loop empties the account, a clear
        answer to &quot;is this feature profitable?&quot;. Attribution is the
        difference between knowing your costs and merely paying them.
      </p>

      <blockquote>
        AI cost isn&apos;t a number you discover at month end — it&apos;s one you
        architect. Cache so you never pay twice, route so you never overpay, and
        attribute so every token traces to an owner.
      </blockquote>

      <p>
        FinOps is the governance layer over the tactical{" "}
        <a href="/blog/token-economics-cost-optimizing-llm-apps">token economics</a> of
        a single app, and it leans on the same{" "}
        <a href="/blog/router-agent-multi-agent-orchestration">router pattern</a> that
        directs multi-agent work. Continue on the <a href="/roadmap">roadmap</a>.
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
