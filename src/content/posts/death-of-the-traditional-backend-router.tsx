import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        I’ve treated the backend router as a necessary lie for years — a switch
        in a blazer. A request lands, you match a URL to a handler, and the real
        work hides behind a pile of conditionals. That survived because inputs
        were predictable and the path smuggled in intent. The moment the request
        is natural language and the intent is fuzzy, routing stops being a
        lookup and becomes a decision problem.
      </p>

      <h2>The router was always a conditional in disguise</h2>
      <p>
        Crack open a seasoned API and you’ll find rules smeared across the
        router: role checks, feature flags, payload quirks, and fossils of
        one-off incidents. The URL names the noun; the branches pick the verb.
        On the node-routing work for IntegrateX I watched these branches sprawl
        until they were harder to reason about than the feature itself. That
        seam — ambiguity plus special cases — is where a model now outperforms a
        hand-built decision tree.
      </p>

      <h2>Intent-driven routing</h2>
      <p>
        In an intent-first backend, the first hop isn’t path matching — it’s{" "}
        classification. A schema-bound model reads the request, decides what the
        caller actually means, and maps it to a tight, fixed set of
        capabilities. The messy, many-to-one mapping from human phrasing to
        system action leaves brittle if-chains and moves into a component built
        to hold ambiguity. When confidence is low, it asks instead of guessing.
      </p>

      <Terminal title="router.ts">
        <span className="tok-com">{`// classify intent, then dispatch a capability`}</span>
        {"\n"}
        <span className="tok-key">const</span> intent ={" "}
        <span className="tok-key">await</span>{" "}
        <span className="tok-fn">classify</span>
        <span className="tok-punc">(</span>req.text
        <span className="tok-punc">,</span> IntentSchema
        <span className="tok-punc">);</span>
        {"\n\n"}
        <span className="tok-key">switch</span>{" "}
        <span className="tok-punc">(</span>intent.tool
        <span className="tok-punc">)</span>{" "}
        <span className="tok-punc">{`{`}</span>
        {"\n  "}
        <span className="tok-key">case</span>{" "}
        <span className="tok-str">&quot;lookup&quot;</span>
        <span className="tok-punc">:</span>{" "}
        <span className="tok-key">return</span> tools.
        <span className="tok-fn">lookup</span>
        <span className="tok-punc">(</span>intent.args
        <span className="tok-punc">);</span>
        {"\n  "}
        <span className="tok-key">case</span>{" "}
        <span className="tok-str">&quot;summarize&quot;</span>
        <span className="tok-punc">:</span>{" "}
        <span className="tok-key">return</span> tools.
        <span className="tok-fn">summarize</span>
        <span className="tok-punc">(</span>intent.args
        <span className="tok-punc">);</span>
        {"\n  "}
        <span className="tok-key">default</span>
        <span className="tok-punc">:</span>{" "}
        <span className="tok-key">return</span>{" "}
        <span className="tok-fn">clarify</span>
        <span className="tok-punc">(</span>req
        <span className="tok-punc">);</span>{" "}
        <span className="tok-com">{`// ask, don't guess`}</span>
        {"\n"}
        <span className="tok-punc">{`}`}</span>
      </Terminal>

      <h3>Tools, not endpoints</h3>
      <p>
        Notice what the switch dispatches to: not routes, but{" "}
        <strong>tools</strong> — small, single-purpose, strongly-typed
        capabilities the model is allowed to invoke. Endpoint sprawl collapses
        into a capability registry. Shipping a feature turns into: add a tool,
        describe it, wire validation — not threading another brittle branch
        through a routing file nobody wants to touch.
      </p>

      <h2>Where deterministic routing still wins</h2>
      <p>
        This is not an argument for putting a model in front of your payment
        endpoint. Anything that must be exact, auditable, and fast — auth,
        billing, idempotent writes — stays deterministic, behind hard code and
        keys. On streamerOS, the real-time path guarding 60fps surfaces stayed
        pure and predictable for a reason. Let the AI router govern the fuzzy
        front door; once intent is resolved, execution drops into ordinary,
        testable, type-safe handlers.
      </p>

      <h2>The hybrid that actually ships</h2>
      <p>
        The production shape is a layered one: an AI dispatcher resolves intent
        and selects a capability, a validation boundary enforces the contract,
        and deterministic code does the work. The model decides{" "}
        <em>what</em>; your code controls <em>how</em>. It mirrors the pattern I
        call Trinity Architecture: presentation stays declarative, the
        orchestrator owns runtime truth and dispatch, and a serialization
        adapter translates to lean wire payloads. No layer talks past its
        neighbor — the model never formats DB schemas, the adapter never reaches
        into UI state, and correctness doesn’t leak.
      </p>

      <blockquote>
        The switch didn’t die; it got demoted. The hard choice moved into a
        model, and the remaining switch fits on one screen.
      </blockquote>

      <p>
        This dispatch-then-execute pattern is the backbone of the{" "}
        <a href="/#projects">Police RAG Agent</a> and the node-routing core of{" "}
        <a href="/#projects">IntegrateX</a> — where a Serialization Adapter
        stripped non-essential React Flow UI metadata before persistence and cut
        payloads 94%, keeping the capability calls fast and cheap.
      </p>
    </>
  );
}

export const deathOfTheBackendRouter: BlogPost = {
  slug: "death-of-the-traditional-backend-router",
  title: "The Death of the Traditional Backend Router",
  description:
    "Modern backends are evolving from rigid URL endpoints to intent-driven AI routers. How LLM dispatch replaces sprawling switch statements — and where deterministic code still wins.",
  keywords: [
    "AI router",
    "intent routing",
    "Node.js",
    "agentic backend",
    "LLM dispatch",
    "API design",
    "business logic",
  ],
  publishedAt: "2026-05-30",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Node.js", "AI Agents", "Backend"],
  takeaways: [
    "Traditional routing is a giant conditional; AI moves the ambiguous intent-to-action mapping out of brittle branches.",
    "An intent-driven backend classifies the request first, then dispatches to a small registry of typed tools, not endpoints.",
    "Keep exact, auditable operations (auth, billing, writes) deterministic — the AI router only governs the ambiguous front door.",
    "The production pattern is layered: the model decides what, validated contracts and deterministic code control how.",
  ],
  Body,
};
