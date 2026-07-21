import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function StackDiagram() {
  const layers = [
    ["Client / UI", "#67E8F9", false],
    ["Orchestration loop", "#22D3EE", true],
    ["Model gateway", "#A855F7", true],
    ["Tool / function layer", "#22D3EE", false],
    ["Vector store + memory", "#A855F7", false],
    ["System of record (Mongo)", "#67E8F9", false],
  ] as const;

  return (
    <Diagram
      label="The classic four-tier MERN stack on the left expands into a six-tier AI-native stack on the right, with the orchestration loop and model gateway marked as the new probabilistic core."
      caption="MERN keeps its data and UI tiers. The AI-native stack inserts a probabilistic core — orchestration + model gateway + tools + memory — between them."
    >
      <svg viewBox="0 0 760 340" role="img" aria-label="MERN to AI-native stack">
        <defs>
          <marker id="s1-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* MERN column */}
        <text x="110" y="34" fill="#71717a" fontFamily="monospace" fontSize="11" textAnchor="middle">
          MERN (2015)
        </text>
        {["React", "Express", "Node", "MongoDB"].map((t, i) => (
          <g key={t}>
            <rect x="35" y={56 + i * 58} width="150" height="46" rx="8" fill="#0b1018" stroke="#3f3f46" />
            <text x="110" y={84 + i * 58} fill="#a1a1aa" fontFamily="monospace" fontSize="12" textAnchor="middle">
              {t}
            </text>
          </g>
        ))}

        <line x1="200" y1="170" x2="250" y2="170" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#s1-arrow)" />

        {/* AI-native stack */}
        <text x="510" y="34" fill="#22D3EE" fontFamily="monospace" fontSize="11" textAnchor="middle">
          AI-native (today)
        </text>
        {layers.map(([label, color, core], i) => (
          <g key={label}>
            <rect
              x="285"
              y={48 + i * 46}
              width="450"
              height="38"
              rx="8"
              fill={core ? "rgba(168,85,247,0.07)" : "#0b1018"}
              stroke={color}
              strokeDasharray={core ? "0" : "0"}
            />
            <text x="510" y={72 + i * 46} fill={color} fontFamily="monospace" fontSize="12" textAnchor="middle">
              {label}
            </text>
            {core && (
              <text x="715" y={72 + i * 46} fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="end">
                probabilistic
              </text>
            )}
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
        MERN didn&apos;t die — it grew a nervous system. The framework choices
        haven&apos;t changed: Mongo still stores, Express still routes, React still
        renders. What changed is that a probabilistic core now sits in the middle
        of your stack, and every architectural assumption you inherited from the
        CRUD era has to be re-examined against it. Token budgets, latency targets,
        cost ceilings, and streaming backpressure start dictating structure, not
        the other way around.
      </p>

      <h2>Three new tiers, not a rewrite</h2>
      <p>
        An AI-native stack is MERN plus three tiers the old playbook never needed:
        a <strong>vector store + memory layer</strong> that holds meaning rather
        than rows, a <strong>model gateway</strong> that brokers calls to one or
        more LLMs with retries, budgets, and fallbacks, and an{" "}
        <strong>orchestration loop</strong> that decides what to retrieve, which
        tools to call, and when to stop. The data and UI tiers you already know;
        the new tiers are where the architecture lives now. I map this cleanly to
        the pattern I call Trinity Architecture: presentation stays declarative and
        dumb, the orchestration loop is the reactive state layer making decisions,
        and a strict data/serialization adapter shapes payloads at the model and
        storage boundary.
      </p>

      <StackDiagram />

      <h2>The backend&apos;s job changed from CRUD to context assembly</h2>
      <p>
        In a classic MERN app the backend&apos;s job is to validate a request and
        move rows. In an AI-native app its job is to <em>assemble context</em>:
        pull the right documents from the vector store, stitch in conversation
        history and tool results, fit it all inside the model&apos;s token budget,
        and broker the call. The endpoint that used to return a record now returns
        a grounded, generated answer — and the hard part is everything that
        happens before the model is even invoked. On IntegrateX, our
        <em> Serialization Adapter</em> stripped React Flow UI metadata from graph
        state before retrieval and prompting; that single step cut payloads 94%,
        kept us within token windows, and stabilized tail latency.
      </p>

      <Terminal title="route.ts — CRUD vs context assembly">
        <span className="tok-com">{`// before: move a row`}</span>
        {"\n"}
        {`app.get("/answer", async (req, res) => {\n`}
        {`  const doc = await db.find(req.query.id);\n`}
        {`  res.json(doc);\n`}
        {`});\n\n`}
        <span className="tok-com">{`// after: assemble context, then generate`}</span>
        {"\n"}
        {`app.post("/answer", async (req, res) => {\n`}
        {`  const ctx = await retrieve(req.body.q);     // vector tier\n`}
        {`  const prompt = assemble(ctx, history(req)); // fit the budget\n`}
        {`  const answer = await gateway.generate(prompt); // model tier\n`}
        {`  res.json({ answer, sources: ctx.map(c => c.id) });\n`}
        {`});`}
      </Terminal>

      <h2>Determinism moves to the edges</h2>
      <p>
        The middle of the stack is now non-deterministic by design, so the
        engineering discipline migrates outward. Validation, schema enforcement,
        and guardrails harden the <em>boundaries</em> — what goes into the model
        and what comes out — because you can no longer assume the core behaves the
        same way twice. This is the single biggest mental shift: you stop trying to
        make the middle predictable and start making the edges trustworthy. On
        streamerOS, we treat output as a stream with backpressure — the gateway can
        emit tokens as fast as it wants, but the client only paints at 60fps to
        avoid render thrash. On the input side we require typed tools and
        JSON-shaped contracts, with retries and budgets enforced at the gateway,
        not in the UI.
      </p>

      <blockquote>
        AI-native isn&apos;t a new framework. It&apos;s MERN with a probabilistic
        core — and the reality that your job moved from moving rows to assembling
        context and defending the edges.
      </blockquote>

      <p>
        The rest of this roadmap walks each new tier in turn — starting with the{" "}
        <a href="/blog/beyond-the-prompt-llm-mechanics">mechanics of the model itself</a>,
        then the <a href="/blog/vector-foundations-semantic-search">vector layer</a>{" "}
        that makes retrieval possible. See the full series on the{" "}
        <a href="/roadmap">roadmap</a>.
      </p>
    </>
  );
}

export const aiNativeDevStack: BlogPost = {
  slug: "ai-native-dev-stack-rethinking-mern",
  title: "The AI-Native Dev Stack: Rethinking MERN for Production AI",
  description:
    "MERN didn't die — it grew a nervous system. The AI-native stack keeps Mongo, Express, React and Node but adds three new tiers — vector memory, a model gateway, and an orchestration loop — that change every architectural assumption.",
  keywords: [
    "AI-native stack",
    "MERN AI architecture",
    "model gateway",
    "vector store",
    "LLM orchestration",
    "production AI architecture",
  ],
  publishedAt: "2026-03-02",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["Architecture", "AI", "Backend"],
  takeaways: [
    "AI-native is MERN plus three tiers: a vector/memory store, a model gateway, and an orchestration loop.",
    "The backend's job shifts from CRUD to context assembly — retrieving, stitching, and budgeting context before the model is called.",
    "Because the core is now probabilistic, determinism moves to the edges: validation and guardrails defend the boundaries.",
  ],
  Body,
};
