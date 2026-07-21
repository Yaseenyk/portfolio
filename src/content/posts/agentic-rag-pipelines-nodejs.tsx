import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Most of what passes for &quot;RAG&quot; in 2026 is a search box with a
        model glued on the end. Top‑k, shove into a prompt, pray the context
        window holds. It screenshots great and falls over the first time a real
        question spans sources or needs iteration. Agentic RAG is what survives
        production: the model doesn&apos;t just retrieve, it{" "}
        <strong>decides</strong> — what to look up next, when evidence is
        sufficient, and which conclusion the record actually supports.
      </p>

      <h2>Why naive RAG plateaus</h2>
      <p>
        Retrieve‑then‑generate assumes the whole answer lives in one pocket of
        your embedding space. Real work rarely cooperates. That analyst checking
        a potential statute breach needs the statute, precedent, a timeline, and
        the case record — different stores, different shapes, each query informed
        by the last. A fixed first retrieval can&apos;t express that dependency
        chain. You get fluent answers on partial evidence — the most dangerous
        failure mode in an AI‑assisted backend — plus blown token budgets,
        repeated chunks, and latency you can&apos;t justify.
      </p>

      <h2>The agentic loop</h2>
      <p>
        Agentic RAG flips control flow. Retrieval stops being a step and becomes
        a <strong>tool</strong> the model can invoke in a loop until it&apos;s
        grounded enough to commit. The Node.js backend owns the loop; the model
        chooses the tools. In the pattern I call Trinity Architecture, this loop
        is the Reactive Orchestration layer: it holds state, sequences tool
        calls, and enforces contracts. The tools sit behind a Data /
        Serialization Adapter. Presentation — your React client — just renders
        stream and citations and dispatches events. No layer talks past its
        neighbor.
      </p>

      <Terminal title="agent.ts">
        <span className="tok-key">async</span>{" "}
        <span className="tok-key">function</span>{" "}
        <span className="tok-fn">analyze</span>
        <span className="tok-punc">(</span>question
        <span className="tok-punc">:</span>{" "}
        <span className="tok-key">string</span>
        <span className="tok-punc">)</span> <span className="tok-punc">{`{`}</span>
        {"\n  "}
        <span className="tok-key">let</span> state ={" "}
        <span className="tok-fn">init</span>
        <span className="tok-punc">(</span>question
        <span className="tok-punc">);</span>
        {"\n  "}
        <span className="tok-key">while</span>{" "}
        <span className="tok-punc">(!</span>state.decided
        <span className="tok-punc">)</span> <span className="tok-punc">{`{`}</span>
        {"\n    "}
        <span className="tok-key">const</span> step ={" "}
        <span className="tok-key">await</span>{" "}
        <span className="tok-fn">plan</span>
        <span className="tok-punc">(</span>state
        <span className="tok-punc">);</span>{" "}
        <span className="tok-com">{`// model picks the next tool`}</span>
        {"\n    "}
        <span className="tok-key">switch</span>{" "}
        <span className="tok-punc">(</span>step.tool
        <span className="tok-punc">)</span> <span className="tok-punc">{`{`}</span>
        {"\n      "}
        <span className="tok-key">case</span>{" "}
        <span className="tok-str">&quot;vectorSearch&quot;</span>
        <span className="tok-punc">:</span> state ={" "}
        <span className="tok-key">await</span>{" "}
        <span className="tok-fn">retrieve</span>
        <span className="tok-punc">(</span>state, step.query
        <span className="tok-punc">);</span> <span className="tok-key">break</span>
        <span className="tok-punc">;</span>
        {"\n      "}
        <span className="tok-key">case</span>{" "}
        <span className="tok-str">&quot;queryRecord&quot;</span>
        <span className="tok-punc">:</span> state ={" "}
        <span className="tok-key">await</span>{" "}
        <span className="tok-fn">fetchRecord</span>
        <span className="tok-punc">(</span>state, step.id
        <span className="tok-punc">);</span> <span className="tok-key">break</span>
        <span className="tok-punc">;</span>
        {"\n      "}
        <span className="tok-key">case</span>{" "}
        <span className="tok-str">&quot;decide&quot;</span>
        <span className="tok-punc">:</span> state ={" "}
        <span className="tok-key">await</span>{" "}
        <span className="tok-fn">commit</span>
        <span className="tok-punc">(</span>state, VerdictSchema
        <span className="tok-punc">);</span> <span className="tok-key">break</span>
        <span className="tok-punc">;</span>
        {"\n    "}
        <span className="tok-punc">{`}`}</span>
        {"\n  "}
        <span className="tok-punc">{`}`}</span>
        {"\n  "}
        <span className="tok-key">return</span> state.verdict
        <span className="tok-punc">;</span>{" "}
        <span className="tok-com">{`// typed, cited, defensible`}</span>
        {"\n"}
        <span className="tok-punc">{`}`}</span>
      </Terminal>

      <h3>Vector retrieval as a tool, not a step</h3>
      <p>
        The vector store (pgvector, Pinecone, or a Mongo Atlas vector index)
        still does the heavy lifting — but only when called, with a query
        composed from what the loop already learned. That makes the{" "}
        second call strictly smarter than the first because it is conditioned on
        prior evidence. That conditioning is the whole game, and it prevents the
        prompt from filling with redundant chunks that inflate tokens and stall
        the pipeline.
      </p>

      <h2>Prompt orchestration and grounding</h2>
      <p>
        Each loop turn is a tight prompt: the question, what you&apos;ve
        gathered, allowed tools, choose or commit. The orchestrator forces every
        claim in the final answer to cite a retrieved record. If a claim can&apos;t
        be grounded, it doesn&apos;t make it into the output. Here the
        Serialization Adapter earns its keep: it trims retrieval traces and
        citations to only what the next tool or the final answer needs — the
        same idea that, on IntegrateX, stripped React Flow UI metadata before
        persistence and cut payloads 94%. Keep the model fed with context, not
        cruft.
      </p>

      <h2>Autonomous decisions need hard contracts</h2>
      <p>
        The riskiest moment is commit — the switch from gathering to verdict.
        That payload must validate against a strict schema before it ever leaves
        Node: a typed decision, confidence, citations. If it fails validation,
        it doesn&apos;t ship. The loop keeps working or returns a hard error.
        Contracts over vibes.
      </p>

      <blockquote>
        Autonomy is safe only when ambiguity is impossible. The schema is the
        seatbelt.
      </blockquote>

      <h2>A real shape: the case analyzer</h2>
      <p>
        In a POSCO‑style legal analyzer, the loop runs as described: retrieve
        the statute, fetch the case record, reconcile the timeline, then commit
        a Guilty / Not‑Guilty with supporting passages attached. The LLM isn&apos;t
        chatting — it&apos;s conducting an investigation and returning a
        defensible conclusion. The Node.js backend provides the discipline:
        orchestration state, tool gating, citations, and the contract the verdict
        must satisfy.
      </p>
      <p>
        See the{" "}
        <a href="/#projects">Police RAG Agent breakdown</a> for the production
        version of this architecture.
      </p>
    </>
  );
}

export const agenticRagPipelines: BlogPost = {
  slug: "architecting-agentic-rag-pipelines-nodejs",
  title: "Architecting Agentic RAG Pipelines in Node.js",
  description:
    "Standard RAG retrieves; Agentic RAG decides. A teardown of building autonomous Node.js pipelines where the LLM extracts grounded verdicts from legacy data via vector retrieval, prompt orchestration, and tool-driven reasoning.",
  keywords: [
    "agentic RAG",
    "RAG pipeline",
    "Node.js",
    "vector retrieval",
    "LLM orchestration",
    "autonomous agents",
    "AI architecture",
  ],
  publishedAt: "2026-06-05",
  readingMinutes: 9,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Agentic AI", "RAG", "Node.js"],
  takeaways: [
    "Standard retrieve-then-generate RAG is a floor, not a ceiling — agentic RAG adds autonomous tool use and decision-making.",
    "Treat vector retrieval as one tool the model invokes in a loop, conditioned on what it has already learned, not a fixed first step.",
    "Every autonomous decision must validate against a strict, cited output contract before it leaves the backend.",
    "The architecture is a controller loop in Node.js: plan → retrieve → reason → commit → verify.",
  ],
  Body,
};
