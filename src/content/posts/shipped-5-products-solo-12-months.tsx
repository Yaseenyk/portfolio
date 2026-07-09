import type { BlogPost } from "@/lib/blog";

function Body() {
  return (
    <>
      <p>
        In the last twelve months I designed, built, and shipped five production
        products — a Rust desktop cockpit, a node-based workflow engine, a
        local-first AI finance agent, an autonomous content pipeline, and a
        LinkedIn outreach machine. No team. No funding. No standups. Every
        architecture decision, every line of infrastructure, every product call
        came from one place: my own head.
      </p>
      <p>
        This post is not a humble-brag. It is a thesis about how software gets
        built now — and what a company actually buys when it hires an engineer
        who has done this.
      </p>

      <h2>The portfolio, in one table</h2>
      <ul>
        <li>
          <strong>streamerOS</strong> — a Rust + Tauri desktop cockpit for
          streamers: live system telemetry, multi-platform chat velocity, and
          automated OBS scene control, rendering at 60fps on a fraction of
          Electron&apos;s memory.
        </li>
        <li>
          <strong>IntegrateX</strong> — a React Flow workflow-automation canvas
          whose custom serialization adapter cut graph payloads by 94%,
          making save/load feel instant.
        </li>
        <li>
          <strong>Sable</strong> — a local-first AI financial agent. All data
          lives on-device in SQLite; the model proposes, a human confirms, and
          nothing financial ever leaves the phone.
        </li>
        <li>
          <strong>The Zero-Cost AI Blog Writer</strong> — a pipeline that
          drafts, commits, and deploys technical articles on a cron schedule
          for exactly $0 of infrastructure.
        </li>
        <li>
          <strong>The LinkedIn Pipeline</strong> — an autonomous system that
          turns my shipped work into scheduled LinkedIn content and grew my
          professional network while I slept.
        </li>
      </ul>

      <h2>What does &quot;solo&quot; mean when AI writes the code?</h2>
      <p>
        Solo does not mean I typed every character by hand like it&apos;s 2015.
        It means every decision was mine: the data model, the trust boundaries,
        the failure modes, the economics. I use Claude as a workforce and MCP as
        the wiring between it and my systems — but AI is leverage, not vision.
        A model can generate a component; it cannot decide that a finance app
        should never let the model touch the money, or that a streaming cockpit
        should be written in Rust because streamers run OBS, a game, and an
        encoder on the same machine. Those calls are the product. The rest is
        throughput.
      </p>

      <blockquote>
        The scarce skill in 2026 is not writing code. It is holding an entire
        product in your head — data flow, trust boundaries, unit economics —
        clearly enough that the code becomes an output, not a struggle.
      </blockquote>

      <h2>The compounding trick: products that work for you</h2>
      <p>
        The pattern across all five products is that each one removed a job
        from my life. The blog writer removed content production. The LinkedIn
        pipeline removed outreach. Sable removed money anxiety. streamerOS
        removed the four-apps-and-a-prayer streaming setup. I did not build
        demos — I built <strong>employees</strong>, and they have been on shift
        ever since. That is the mindset I bring to a company: look at the
        recurring work, ask which of it deserves a human, and ship a system for
        the rest.
      </p>

      <h2>What this proves to an employer</h2>
      <p>
        A candidate who has shipped five products alone has, by construction,
        done the job of a product manager, a backend engineer, a frontend
        engineer, a DevOps engineer, and a QA function — and paid the price for
        every mistake personally. There is no diffusion of responsibility in a
        team of one. When I say I understand systems end-to-end, the evidence
        is deployed, running, and documented across this site — every product
        has a full architecture breakdown in the{" "}
        <a href="/products">products section</a>.
      </p>
      <p>
        The next nine posts in this series each take one of these systems — or
        one of the operating principles behind them — and show exactly how it
        was built, why it was built that way, and what the same thinking would
        do inside your company.
      </p>
    </>
  );
}

export const shippedFiveProductsSolo: BlogPost = {
  slug: "shipped-5-products-solo-12-months",
  title:
    "I Shipped 5 Products in 12 Months — Solo, Unfunded, and Faster Than Most Teams Ship One",
  description:
    "Five production systems — a Rust desktop cockpit, a workflow engine, a local-first AI finance agent, and two autonomous pipelines — designed, built, and shipped by one engineer. Here's the operating model.",
  keywords: [
    "solo founder engineer",
    "shipped production products",
    "one person engineering team",
    "AI-accelerated development",
    "Claude MCP workflow",
    "hire full-stack AI engineer",
  ],
  publishedAt: "2026-07-07",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Founder's Log", "Vision", "Products"],
  takeaways: [
    "Five production products shipped in twelve months by one engineer: streamerOS, IntegrateX, Sable, a zero-cost content engine, and a LinkedIn automation pipeline.",
    "Solo means every architecture, trust-boundary, and economics decision was made by one head — AI supplied throughput, not vision.",
    "Each product was built to remove a recurring job from my life; that automation mindset transfers directly to company work.",
    "One engineer who has shipped alone has verifiably done the work of PM, backend, frontend, DevOps, and QA.",
  ],
  Body,
};
