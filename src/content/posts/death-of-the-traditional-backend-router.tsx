import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        The backend router has always been a polite fiction — a giant switch
        statement dressed up as architecture. A request comes in, you match a URL
        to a handler, and inside that handler a cascade of conditionals decides
        what actually happens. That model held for two decades because requests
        were structured and intent was implicit in the path. AI breaks the
        assumption: when the request is natural language and the intent is
        ambiguous, routing stops being a lookup and becomes a decision.
      </p>

      <h2>The router was always a conditional in disguise</h2>
      <p>
        Look honestly at a mature enterprise API and you will find business logic
        smeared across routing: nested if-branches on user role, feature flags,
        request shape, and a dozen special cases that accreted over years. The
        URL told you the noun; the conditionals decided the verb. That sprawl is
        exactly the part an LLM is now better at navigating than a hand-written
        decision tree.
      </p>

      <h2>Intent-driven routing</h2>
      <p>
        In an intent-driven backend, the first hop is not a path match — it is a
        classification. A schema-constrained model reads the request, decides
        what the caller actually wants, and dispatches to a small, fixed set of
        capabilities. The messy, fuzzy, many-to-one mapping from human intent to
        system action moves out of brittle conditionals and into a model that was
        built for ambiguity.
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
        capabilities the model is allowed to invoke. The endpoint sprawl
        collapses into a capability registry. Adding a feature means adding a
        tool and describing it, not threading another branch through a routing
        file nobody wants to touch.
      </p>

      <h2>Where deterministic routing still wins</h2>
      <p>
        This is not an argument for putting a model in front of your payment
        endpoint. Anything that must be exact, auditable, and fast — auth,
        billing, idempotent writes — stays deterministic, behind hard code. The
        AI router governs the ambiguous front door; the moment intent is
        resolved, execution drops back into ordinary, testable, type-safe
        handlers.
      </p>

      <h2>The hybrid that actually ships</h2>
      <p>
        The production shape is a layered one: an AI dispatcher resolves intent
        and selects a capability, a validation boundary enforces the contract,
        and deterministic code does the work. The model decides{" "}
        <em>what</em>; your code controls <em>how</em>. You get the flexibility
        of natural-language interfaces without surrendering correctness to a
        probabilistic system.
      </p>

      <blockquote>
        The switch statement is not dead — it just stopped being where the hard
        decisions live. The hard decision moved to a model, and the switch got
        small enough to read in one screen.
      </blockquote>

      <p>
        This dispatch-then-execute pattern is the backbone of the{" "}
        <a href="/#projects">Police RAG Agent</a> and the node-routing core of{" "}
        <a href="/#projects">IntegrateX</a>.
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
