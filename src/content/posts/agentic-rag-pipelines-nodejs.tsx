import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Most teams shipping &quot;RAG&quot; in 2026 are shipping a search box
        with a language model stapled to the end of it. Retrieve the top-k
        chunks, stuff them into a prompt, generate an answer. It demos well and
        collapses the moment a real question requires more than one lookup.
        Agentic RAG is the architecture that survives contact with production:
        the model does not just retrieve, it <strong>decides</strong> — what to
        look up, when it has enough, and what verdict the evidence supports.
      </p>

      <h2>Why naive RAG plateaus</h2>
      <p>
        Retrieve-then-generate assumes the answer lives in a single neighborhood
        of your vector space. Real questions rarely do. A case analyst asking
        whether a statute was violated needs the statute, the precedent, the
        timeline, and the specific record — four retrievals across three
        sources, each one informed by the last. A fixed first-step retrieval
        cannot express that. You end up with confident answers built on partial
        evidence, which is the single most dangerous failure mode an
        AI-augmented backend can have.
      </p>

      <h2>The agentic loop</h2>
      <p>
        Agentic RAG inverts the control flow. Retrieval stops being a step and
        becomes a <strong>tool</strong> — one of several the model can invoke,
        in a loop, until it has grounded itself enough to commit to a decision.
        The Node.js backend owns the loop; the model owns the choices inside it.
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
        still does the heavy lifting of semantic recall — but it is invoked on
        demand, with a query the model composes from what it has already learned.
        The second retrieval is smarter than the first because it is conditioned
        on the first. That conditioning is the entire point.
      </p>

      <h2>Prompt orchestration and grounding</h2>
      <p>
        Each turn of the loop is a tightly scoped prompt: here is the question,
        here is what you have gathered, here are your tools, choose one or
        commit. The orchestration layer enforces that every claim in the final
        output carries a citation back to a retrieved record. A decision the
        system cannot ground, it is not allowed to make. This is what separates
        an autonomous analyst from a confident fabricator.
      </p>

      <h2>Autonomous decisions need hard contracts</h2>
      <p>
        The dangerous moment in any agentic system is the commit — when the model
        stops gathering and states a verdict. That output must be validated
        against a strict schema before it leaves the backend: a typed
        decision, a confidence, and an array of citations. If it does not
        validate, it does not ship; the loop continues or the request fails
        loudly.
      </p>

      <blockquote>
        An agent that can act autonomously is only safe if it cannot act
        ambiguously. The schema is the seatbelt.
      </blockquote>

      <h2>A real shape: the case analyzer</h2>
      <p>
        In a POSCO-style legal analyzer, the loop runs exactly this way: retrieve
        the relevant statute, pull the specific case record, cross-check the
        timeline, then commit to a Guilty / Not-Guilty statement with the
        supporting passages attached. The LLM is not answering a question — it is
        executing an investigation and returning a defensible conclusion. The
        Node.js backend is the investigator&apos;s discipline: the loop, the
        tools, the citations, and the contract that the verdict must satisfy.
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
