import type { BlogPost } from "@/lib/blog";

function Body() {
  return (
    <>
      <p>
        Personal-finance apps ask for the most sensitive data a person owns and
        then ship it to someone else&apos;s cloud. AI finance apps go further:
        they hand that data to a language model and let probabilistic text
        decide what happens to real money. I built Sable to reject both
        premises at the architecture level — a local-first AI financial agent
        where all data lives on-device in SQLite, and where the model can{" "}
        <em>propose</em> but is structurally incapable of <em>committing</em>.
      </p>

      <h2>Trust boundary #1: the data never leaves</h2>
      <p>
        Sable is a React Native app with no cloud backend. Every debt, every
        payment, every balance lives in on-device SQLite — full stop. When the
        AI layer needs context (&quot;how is my spending pacing this
        month?&quot;), it queries the local database. What crosses the network
        to the model is a distilled, minimal context — never the ledger. Most
        products bolt privacy on as a policy. Sable has it as a topology: there
        is no server to breach because there is no server.
      </p>

      <h2>Trust boundary #2: the model proposes, the human commits</h2>
      <p>
        The agent uses OpenAI function calling — but every function call is a{" "}
        <strong>dry run</strong>. When the model decides &quot;log a ₹5,000
        payment against the car loan,&quot; that intent renders as a
        Review &amp; Confirm card in the UI. The model&apos;s output is a
        proposal object; the database mutation only executes when a human taps
        confirm. An LLM hallucination in Sable can produce, at worst, a card
        you dismiss. It can never produce a wrong number in your ledger.
      </p>
      <blockquote>
        The question that should govern every agentic product: <em>what is the
        blast radius of the model&apos;s worst output?</em> In Sable the answer
        is &quot;one dismissible card&quot; — by architecture, not by prompt
        engineering.
      </blockquote>

      <h2>What makes a local-first AI agent production-real?</h2>
      <ul>
        <li>
          <strong>Serialized writes:</strong> a queue funnels every SQLite
          mutation through one at a time, eliminating the write-lock contention
          that plagues on-device databases.
        </li>
        <li>
          <strong>A daily local RAG job:</strong> each morning the agent reads
          the on-device ledger and delivers a proactive Morning Briefing to the
          lock screen — spend pacing, upcoming obligations, anomalies — without
          a single byte of financial data leaving the phone.
        </li>
        <li>
          <strong>Offline-first by default:</strong> the app is fully
          functional in airplane mode; the AI layer is an enhancement, not a
          dependency.
        </li>
      </ul>

      <h2>Why this pattern matters beyond finance</h2>
      <p>
        Every enterprise deploying agents faces Sable&apos;s problem in
        costume: healthcare records, legal documents, internal financials —
        data that wants AI leverage but cannot tolerate AI authority. The
        propose/confirm boundary and the local-context pattern transfer
        directly: give the model read access to distilled context, render its
        intents as reviewable artifacts, and reserve the commit for a human or
        a deterministic policy. I built the reference implementation into a
        product I use every day — the full breakdown is{" "}
        <a href="/products/sable">on Sable&apos;s product page</a>.
      </p>
    </>
  );
}

export const sableTrustBoundary: BlogPost = {
  slug: "sable-ai-agent-never-touches-money",
  title:
    "I Built an AI Money Agent That's Structurally Incapable of Touching the Money",
  description:
    "Sable is a local-first AI financial agent: all data in on-device SQLite, no cloud backend, and a Review & Confirm boundary where the model proposes but only a human commits. The trust architecture, explained.",
  keywords: [
    "local-first AI agent",
    "AI trust boundaries",
    "human in the loop AI",
    "function calling safety",
    "on-device SQLite React Native",
    "agentic AI architecture",
  ],
  publishedAt: "2026-07-07",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Founder's Log", "AI Safety", "Products"],
  takeaways: [
    "Sable has no cloud backend: every financial record lives in on-device SQLite, so privacy is a topology, not a policy.",
    "Every model function call is a dry run rendered as a Review & Confirm card — the human commits, so a hallucination's blast radius is one dismissible card.",
    "Serialized writes, a daily local RAG Morning Briefing, and offline-first design make the trust model production-real.",
    "The propose/confirm pattern transfers to any enterprise domain where data wants AI leverage but cannot tolerate AI authority.",
  ],
  Body,
};
