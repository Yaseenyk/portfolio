import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function MemoryHierarchyDiagram() {
  return (
    <Diagram
      label="A tiered memory architecture for a stateful agent. A working buffer holds the current turn; an episodic store keeps vector-indexed conversation summaries; a semantic store keeps durable extracted facts. A recall step pulls relevant memory from the lower tiers back into the prompt each turn."
      caption="The context window is RAM, not disk. Stateful agents tier their memory — a small working buffer in the prompt, summaries and facts in stores — and recall only what this turn needs."
    >
      <svg viewBox="0 0 760 250" role="img" aria-label="Tiered agent memory architecture">
        <defs>
          <marker id="m-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* prompt / working buffer */}
        <rect x="40" y="40" width="200" height="56" rx="10" fill="rgba(103,232,249,0.08)" stroke="#67E8F9" />
        <text x="140" y="64" fill="#67E8F9" fontFamily="monospace" fontSize="11" textAnchor="middle">
          working buffer
        </text>
        <text x="140" y="80" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          this turn · in the prompt
        </text>

        {/* episodic */}
        <rect x="40" y="116" width="200" height="48" rx="10" fill="#0b1018" stroke="#A855F7" />
        <text x="140" y="138" fill="#A855F7" fontFamily="monospace" fontSize="11" textAnchor="middle">
          episodic store
        </text>
        <text x="140" y="153" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          vector summaries
        </text>

        {/* semantic */}
        <rect x="40" y="180" width="200" height="48" rx="10" fill="#0b1018" stroke="#22D3EE" />
        <text x="140" y="202" fill="#22D3EE" fontFamily="monospace" fontSize="11" textAnchor="middle">
          semantic store
        </text>
        <text x="140" y="217" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          durable facts (kv)
        </text>

        {/* recall arrow up */}
        <line x1="270" y1="200" x2="270" y2="70" stroke="#67E8F9" strokeWidth="1.5" markerEnd="url(#m-arrow)" />
        <text x="282" y="120" fill="#67E8F9" fontFamily="monospace" fontSize="10">
          recall ↑ relevant only
        </text>

        {/* write path */}
        <rect x="470" y="40" width="250" height="56" rx="10" fill="#0b1018" stroke="#A855F7" />
        <text x="595" y="64" fill="#A855F7" fontFamily="monospace" fontSize="11" textAnchor="middle">
          after response
        </text>
        <text x="595" y="80" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          summarize · extract facts
        </text>
        <line x1="470" y1="68" x2="346" y2="68" stroke="#52525b" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#m-arrow)" />
        <text x="360" y="34" fill="#71717a" fontFamily="monospace" fontSize="9">
          write back ↓
        </text>
        <line x1="595" y1="96" x2="595" y2="140" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#m-arrow)" />
        <text x="610" y="124" fill="#71717a" fontFamily="monospace" fontSize="9">
          upsert to stores
        </text>
      </svg>
    </Diagram>
  );
}

function Body() {
  return (
    <>
      <p>
        Memory is what separates an agent that knows you from a chatbot that forgets
        you between messages. The context window is RAM, not disk — small, expensive,
        and wiped every request — so a stateful agent can&apos;t just keep appending
        the transcript. It tiers its memory: a working buffer for the current turn,
        an episodic store of conversation summaries, and a semantic store of durable
        facts — and it recalls only the slice each turn actually needs.
      </p>

      <h2>The context window is RAM, not disk</h2>
      <p>
        Treating the window as storage fails twice. It overflows — a long
        relationship will not fit, and naive truncation amputates the oldest, often
        most important, context. And it&apos;s costly — every token of stuffed history
        is paid for on every single turn. The fix is the fix every computer uses: a
        small fast tier you compute over (the prompt) backed by larger slow tiers you
        fetch from on demand. You don&apos;t hold the whole history in context; you
        retrieve the relevant part of it.
      </p>

      <MemoryHierarchyDiagram />

      <h2>Tier by lifetime: turn, episode, fact</h2>
      <p>
        Different memories have different half-lives. The current exchange lives in
        the <strong>working buffer</strong> — verbatim, in the prompt, gone next turn.
        Older exchanges get compressed into the <strong>episodic store</strong> as
        vector-indexed summaries you can semantically retrieve when something relevant
        comes up again. And stable truths — the user&apos;s name, preferences,
        account tier — get promoted to a <strong>semantic store</strong> of durable
        facts, looked up by key, never summarized away. Recall pulls from the lower
        tiers into the prompt; it never loads everything.
      </p>

      <Terminal title="memory.ts — recall, respond, persist">
        <span className="tok-com">{`// each turn: pull only relevant memory, answer, then write back`}</span>
        {"\n"}
        {`const facts = await semantic.get(userId);          // durable, by key\n`}
        {`const episodes = await episodic.search(embed(turn), 4); // relevant summaries\n`}
        {`const prompt = assemble({ facts, episodes, turn }); // small, targeted\n\n`}
        {`const res = await model.generate(prompt);\n\n`}
        {`await episodic.upsert(summarize(turn, res));        // compress this exchange\n`}
        {`await semantic.merge(userId, extractFacts(res));    // promote stable truths`}
      </Terminal>

      <h2>Compression is a first-class step, not an afterthought</h2>
      <p>
        Memory that only grows is memory that eventually breaks — retrieval gets
        noisier and costs climb. So the write path matters as much as the read path:
        after each response, summarize the exchange before storing it, and extract
        any durable facts into the semantic tier. Summarization is lossy on purpose —
        it&apos;s the forgetting that keeps the system usable, the same way human
        memory keeps the gist and drops the wording. An agent that remembers
        everything is as broken as one that remembers nothing.
      </p>

      <blockquote>
        Statefulness isn&apos;t a bigger context window — it&apos;s a memory
        hierarchy. Keep the turn in RAM, summaries and facts on disk, and recall only
        what this moment needs. The window is where you think, not where you store.
      </blockquote>

      <p>
        Memory is the layer that makes{" "}
        <a href="/blog/stateless-agents-edge-cloudflare-durable-objects">stateless edge agents</a>{" "}
        feel continuous, and its episodic tier is just{" "}
        <a href="/blog/vector-foundations-semantic-search">vector retrieval</a> pointed
        at the conversation instead of the docs — bounded by the same{" "}
        <a href="/blog/beyond-the-prompt-llm-mechanics">context budget</a> every prompt
        lives under. Continue on the <a href="/roadmap">roadmap</a>.
      </p>
    </>
  );
}

export const memoryAndStatefulAi: BlogPost = {
  slug: "memory-and-stateful-ai-architecture",
  title: "Memory & Stateful AI: Beyond the Context Window",
  description:
    "The context window is RAM, not disk — small, costly, and wiped every request. Stateful agents tier their memory into a working buffer, an episodic vector store, and durable semantic facts, recalling only the slice each turn needs.",
  keywords: [
    "AI memory architecture",
    "stateful agents",
    "long-term memory LLM",
    "episodic semantic memory",
    "conversation summarization",
    "context window management",
  ],
  publishedAt: "2026-06-06",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["AI", "Architecture", "Agents"],
  takeaways: [
    "Treat the context window as RAM, not storage: hold the turn in the prompt and fetch older context from backing stores on demand.",
    "Tier memory by lifetime — verbatim working buffer, vector-indexed episodic summaries, and durable key-value semantic facts.",
    "Make compression first-class: summarize each exchange and promote stable facts on the write path, so memory stays useful as it grows.",
  ],
  Body,
};
