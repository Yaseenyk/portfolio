import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

/**
 * The article body. Write standard HTML tags — they're styled by Tailwind
 * Typography (`prose`) in the template. Use <Terminal> for code blocks.
 */
function Body() {
  return (
    <>
      <p>
        Shipping a production MERN stack used to mean weeks of boilerplate before
        the first real feature landed. With an agentic AI workflow, the
        bottleneck shifts from <em>typing</em> to <em>architecture</em> — and the
        timeline collapses from weeks to days.
      </p>

      <h2>Why the architecture matters more than the code</h2>
      <p>
        When AI handles the syntax, the engineer&apos;s leverage comes entirely
        from the shape of the system: the data model, the boundaries between
        services, and the contracts that flow across them. Get the pipeline right
        and the implementation becomes almost mechanical.
      </p>

      <blockquote>
        The era of bloated engineering teams is over. An AI-specialized architect
        can execute the work of a 10-person squad — if they own the data flow
        end to end.
      </blockquote>

      <h3>The pipeline, in one orchestration</h3>
      <p>
        Here&apos;s a stripped-down agent loop that scaffolds a typed endpoint,
        wires it to MongoDB, and generates the matching React Query hook in a
        single pass:
      </p>

      <Terminal title="orchestrate.ts">
        <span className="tok-com">{`// define the contract once — AI fills the layers`}</span>
        {"\n"}
        <span className="tok-key">const</span> result ={" "}
        <span className="tok-key">await</span>{" "}
        <span className="tok-fn">orchestrate</span>
        <span className="tok-punc">(</span>
        {"\n  "}
        schema<span className="tok-punc">,</span>{" "}
        <span className="tok-com">{`// zod model`}</span>
        {"\n  "}
        <span className="tok-punc">{`{`}</span> retries:{" "}
        <span className="tok-num">3</span>
        <span className="tok-punc">,</span> layer:{" "}
        <span className="tok-str">&quot;db-to-ui&quot;</span>{" "}
        <span className="tok-punc">{`}`}</span>
        {"\n"}
        <span className="tok-punc">)</span>
        <span className="tok-punc">;</span>
      </Terminal>

      <h2>What stays human</h2>
      <ul>
        <li>Deciding the boundaries — what is a service, what is a module.</li>
        <li>Designing the data model and its indexes for real query patterns.</li>
        <li>Reviewing AI output for correctness, security, and intent.</li>
      </ul>

      <p>
        Want the full pattern? See the{" "}
        <a href="/#projects">project breakdowns</a> for production systems built
        exactly this way.
      </p>
    </>
  );
}

export const architectingMernAtAiSpeed: BlogPost = {
  slug: "architecting-mern-at-ai-speed",
  title: "Architecting a MERN Stack at AI-Speed",
  description:
    "How an agentic AI workflow shifts the engineering bottleneck from typing to architecture — letting one developer ship a production MERN stack in days.",
  keywords: [
    "MERN stack",
    "AI-accelerated development",
    "agentic workflows",
    "LLM orchestration",
    "software architecture",
    "Next.js",
  ],
  publishedAt: "2026-06-06",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["MERN", "AI", "Architecture"],
  takeaways: [
    "AI handles syntax; the engineer's leverage is the architecture — data model, boundaries, and contracts.",
    "An agentic workflow collapses MERN setup from weeks to days by scaffolding DB → API → UI in one pass.",
    "Humans still own service boundaries, data modeling, and reviewing AI output for correctness and security.",
    "One AI-equipped architect can deliver the throughput of a full engineering squad.",
  ],
  Body,
};
