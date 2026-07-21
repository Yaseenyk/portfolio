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
        Shipping a production MERN stack used to be a slog of auth glue, CRUD
        scaffolds, and CI plumbing before a single feature shipped. With an
        agentic AI workflow, the bottleneck shifts from <em>typing</em> to{" "}
        <em>architecture</em> — and the calendar compresses when contracts lead.
        Path Saathi went from a Monday brief to live-on-dev in a day because I
        laid the rails first and let the agent fill them.
      </p>

      <h2>Why the architecture matters more than the code</h2>
      <p>
        When AI handles the syntax, my leverage comes from the system&apos;s
        shape: data models that match access paths, boundaries that keep
        ownership crisp, and the contracts that move between them. I use the
        pattern I call Trinity Architecture: Presentation renders and dispatches
        only; a Reactive State/Orchestration layer owns runtime truth, optimistic
        updates, and side effects; a Data/Serialization Adapter translates rich
        state into lean wire shapes. On IntegrateX, that Serialization Adapter
        stripped React Flow UI metadata before persistence and cut payloads 94%,
        which kept real-time sync tight instead of thrashing.
      </p>

      <blockquote>
        The era of bloated squads is fading. One AI-specialized architect who
        owns the data flow end to end can routinely outpace a 10-person team.
      </blockquote>

      <h3>The pipeline, in one orchestration</h3>
      <p>
        Here&apos;s the minimal agent loop I lean on: define the contract once,
        and the run scaffolds a typed endpoint, wires MongoDB, and emits the
        matching React Query hook in a single pass. It keeps db → API → UI
        aligned without hand-stitching.
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
        <li>Draw the seams: which concerns become services vs modules, and who owns the cache.</li>
        <li>Design the data model and indexes for the actual query patterns under load.</li>
        <li>Review AI output for correctness, security, and intent — and reject anything that smears layers together.</li>
      </ul>

      <p>
        Want the full pattern? See the{" "}
        <a href="/#projects">project breakdowns</a> for production systems built
        exactly this way — IntegrateX, streamerOS, and SANKALP.
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
