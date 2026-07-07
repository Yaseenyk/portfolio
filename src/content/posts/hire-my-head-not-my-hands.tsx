import type { BlogPost } from "@/lib/blog";

function Body() {
  return (
    <>
      <p>
        Most engineering résumés are inventories of hands: languages typed,
        frameworks used, years accumulated. But hands are exactly what AI just
        made abundant. What remains scarce — what was always scarce — is the
        head: the ability to see a whole system before it exists, price its
        trade-offs, and refuse the failures in advance. This post is the
        closing argument of my Founder&apos;s Log series, and it is addressed
        directly to the person deciding whether to interview me.
      </p>

      <h2>What the evidence shows</h2>
      <p>
        Everything claimed on this site is deployed and inspectable. Five
        products built solo — each one embodying a different architectural
        judgment call. A Rust cockpit that chose native weight over Electron
        convenience because the user&apos;s machine was the constraint. A
        finance agent that made the AI structurally unable to touch the money.
        A workflow engine that cut payloads 94% by refusing to persist the
        view. Two autonomous pipelines that run my content and my networking
        on $0 of infrastructure. Plus this site itself: a static-exported
        Next.js app with a grounded RAG concierge, a live FinOps simulator,
        and an entity-graph SEO layer designed for the AI crawlers that now
        read the web.
      </p>

      <h2>The pattern underneath the products</h2>
      <ul>
        <li>
          <strong>I find the governing constraint</strong> — frame rate,
          trust, cost, consistency — and architect around it, not around the
          fashionable stack.
        </li>
        <li>
          <strong>I build systems that work while I sleep.</strong> Pipelines
          with human-curated queues and machine-owned execution. That instinct
          — automate the cadence, keep the judgment — is precisely what
          companies need as they adopt AI.
        </li>
        <li>
          <strong>I treat AI as a workforce with a constitution.</strong>{" "}
          Claude and MCP give me squad-level throughput, but every system has
          hard boundaries the model cannot cross. Leverage without authority.
        </li>
        <li>
          <strong>I ship, then I write.</strong> Eighty-plus articles on this
          site document the thinking behind the code — because an architect
          who can&apos;t transfer understanding is a bus-factor of one.
        </li>
      </ul>

      <blockquote>
        The question in 2026 is not &quot;can this engineer build it?&quot; —
        the model guarantees a version of it gets built. The question is:
        &quot;will this engineer make the three or four decisions that
        determine whether it survives contact with production, users, and the
        invoice?&quot;
      </blockquote>

      <h2>What I&apos;m looking for</h2>
      <p>
        A team where the hard problems are architectural: AI systems that need
        trust boundaries, infrastructure that needs its economics fixed,
        products that need to feel instant at scale. Lead or senior
        full-stack / AI engineering roles, remote-first from Hyderabad,
        effective across time zones — my work is asynchronous by construction,
        as the pipelines prove.
      </p>
      <p>
        The fastest way to evaluate me is to use the site the way an engineer
        would: interrogate the{" "}
        <a href="/#rag-concierge">RAG concierge</a>, break the{" "}
        <a href="/sandbox">chaos-engineering sandbox</a>, read a{" "}
        <a href="/products">product teardown</a>, and check the{" "}
        <a href="/interview">interview brief</a> built for engineering
        leadership. Then <a href="/#contact">start the conversation</a> — the
        vision comes with references, and all of them are running in
        production.
      </p>
    </>
  );
}

export const hireMyHead: BlogPost = {
  slug: "hire-my-head-not-my-hands",
  title:
    "Hire My Head, Not My Hands: What 5 Solo Products Prove That a Résumé Can't",
  description:
    "AI made hands abundant; heads stayed scarce. The closing argument of the Founder's Log series — the architectural judgment pattern across five shipped products, addressed to the person deciding whether to interview me.",
  keywords: [
    "hire senior AI engineer",
    "engineering judgment",
    "architectural decision making",
    "solo product portfolio",
    "lead full-stack engineer remote",
    "AI systems architect",
  ],
  publishedAt: "2026-07-07",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Founder's Log", "Vision", "Career"],
  takeaways: [
    "AI made implementation abundant; scarce value is the head — seeing whole systems, pricing trade-offs, refusing failures in advance.",
    "Every claim on this site is deployed and inspectable: five solo products, two autonomous pipelines, and a portfolio that is itself a working AI system.",
    "The consistent pattern: find the governing constraint, keep judgment human, give AI leverage without authority, and document the thinking.",
    "Evaluate by using the artifacts — the RAG concierge, the chaos sandbox, the product teardowns — not by scanning keywords.",
  ],
  Body,
};
