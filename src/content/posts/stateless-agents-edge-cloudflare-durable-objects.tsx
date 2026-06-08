import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Diagram() {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-800 bg-[#0b1018] p-6">
      <svg
        viewBox="0 0 760 300"
        className="h-auto w-full"
        role="img"
        aria-label="Two requests hit two ephemeral stateless workers that both read and write conversation state to an external durable store; the worker forgets, the store remembers."
      >
        <defs>
          <marker id="sl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {/* Turn 1 worker */}
        <text x="40" y="40" fill="#71717a" fontFamily="monospace" fontSize="11">turn 1</text>
        <rect x="40" y="52" width="150" height="60" rx="10" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeDasharray="4 3" />
        <text x="115" y="80" fill="#22D3EE" fontFamily="monospace" fontSize="12" textAnchor="middle">
          Worker
        </text>
        <text x="115" y="97" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          ephemeral · no memory
        </text>

        {/* Turn 2 worker */}
        <text x="40" y="208" fill="#71717a" fontFamily="monospace" fontSize="11">turn 2</text>
        <rect x="40" y="220" width="150" height="60" rx="10" fill="rgba(34,211,238,0.05)" stroke="#22D3EE" strokeDasharray="4 3" />
        <text x="115" y="248" fill="#22D3EE" fontFamily="monospace" fontSize="12" textAnchor="middle">
          Worker
        </text>
        <text x="115" y="265" fill="#71717a" fontFamily="monospace" fontSize="9" textAnchor="middle">
          fresh · forgets again
        </text>

        {/* Durable store */}
        <rect x="470" y="104" width="240" height="92" rx="12" fill="rgba(168,85,247,0.07)" stroke="#A855F7" />
        <text x="590" y="140" fill="#A855F7" fontFamily="monospace" fontSize="13" textAnchor="middle">
          Durable Object / KV
        </text>
        <text x="590" y="160" fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle">
          conversation state
        </text>
        <text x="590" y="176" fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle">
          the source of memory
        </text>

        {/* Arrows read/write */}
        <path d="M190 82 C 330 82, 360 130, 466 135" stroke="#52525b" strokeWidth="1.5" fill="none" markerEnd="url(#sl-arrow)" />
        <path d="M466 155 C 360 165, 330 230, 192 240" stroke="#52525b" strokeWidth="1.5" fill="none" markerEnd="url(#sl-arrow)" />
        <text x="300" y="100" fill="#71717a" fontFamily="monospace" fontSize="9">write history</text>
        <text x="300" y="205" fill="#71717a" fontFamily="monospace" fontSize="9">read history</text>
      </svg>
      <figcaption className="mt-4 text-center font-mono text-[11px] text-zinc-500">
        The worker forgets, the store remembers. State lives outside the compute that touches it.
      </figcaption>
    </figure>
  );
}

function Body() {
  return (
    <>
      <p>
        Edge functions are stateless by design — each request gets a fresh,
        short-lived execution with no memory of the last one. Conversations are the
        opposite: an agent that cannot remember what you said two messages ago is
        not an agent, it is a search box. Reconciling those two facts is the
        architectural puzzle that stops most developers from shipping a real
        agent on serverless. The resolution is simple once you name it: separate
        the compute from the memory.
      </p>

      <h2>The mistake: state in the function</h2>
      <p>
        The instinct from server-land is to hold conversation history in a
        variable, a session object, an in-process map. On the edge that is a
        category error. Your Worker may handle this turn in Frankfurt and the next
        in São Paulo; there is no &quot;this process&quot; that persists between
        turns. Anything you stash in module scope is either gone or, worse,
        belongs to a different user. The function must be treated as genuinely
        amnesiac.
      </p>

      <Diagram />

      <h2>The pattern: the worker forgets, the store remembers</h2>
      <p>
        Make memory an external resource the stateless function reads at the start
        of a turn and writes at the end. Every request follows the same liturgy:
        load the conversation by its id, append the new turn, do the work, persist
        the updated history, respond, and vanish. The Worker holds state only for
        the milliseconds it is alive. The continuity lives entirely in the store.
      </p>

      <Terminal title="turn.ts">
        <span className="tok-com">{`// load → work → persist → vanish. the function keeps nothing.`}</span>
        {"\n"}
        {`app.post("/chat/:id", async (c) => {\n`}
        {`  const id = c.req.param("id");\n`}
        {`  const history = await store.get(id) ?? [];     // remember\n\n`}
        {`  history.push({ role: "user", content: await c.req.text() });\n`}
        {`  const reply = await runAgent(history, c.env);\n`}
        {`  history.push({ role: "assistant", content: reply });\n\n`}
        {`  await store.put(id, history);                  // persist for next turn\n`}
        {`  return c.json({ reply });\n`}
        {`});`}
      </Terminal>

      <h2>KV vs Durable Objects: pick by contention</h2>
      <p>
        Cloudflare gives you two homes for that state, and the choice hinges on
        concurrency. <strong>KV</strong> is eventually consistent and perfect when
        a conversation is effectively single-threaded — one user, one tab, turns
        arriving in sequence. <strong>Durable Objects</strong> give you a single
        authoritative instance with strong consistency and serialised access,
        which is what you want the moment multiple clients can touch the same
        conversation at once. Start with KV; reach for a Durable Object when you
        have real contention, not before.
      </p>

      <h2>The payoff: scale and memory, no contradiction</h2>
      <p>
        Once state lives outside the compute, the apparent contradiction
        dissolves. The agent scales to zero between turns because there is nothing
        to keep running, yet it remembers everything because the store never went
        away. You get the cost profile of a static site and the continuity of a
        stateful service, and you never provisioned a server to get either. That
        is the whole reason to build agents on the edge.
      </p>

      <blockquote>
        Stateless compute and stateful conversation are only contradictory if you
        put the state in the function. Move it out, and the edge gives you both.
      </blockquote>

      <p>
        This completes the serverless agent stack alongside{" "}
        <a href="/blog/edge-native-rag-cloudflare-workers-hono">
          edge-native retrieval
        </a>{" "}
        and{" "}
        <a href="/blog/streaming-ai-edge-hono-ai-sdk-nextjs">
          streamed responses
        </a>{" "}
        — stateless where it is cheap, stateful exactly where it matters.
      </p>
    </>
  );
}

export const statelessAgentsEdge: BlogPost = {
  slug: "stateless-agents-edge-cloudflare-durable-objects",
  title: "Stateless by Default: Managing Agent Memory at the Edge with Cloudflare KV and Durable Objects",
  description:
    "Edge functions are stateless; conversations are not. The pattern for shipping stateful agents on serverless — keep the compute amnesiac and move conversation memory into an external store, choosing KV or Durable Objects by contention.",
  keywords: [
    "Cloudflare Durable Objects",
    "serverless state",
    "agent memory",
    "stateless architecture",
    "edge conversation state",
    "Cloudflare KV",
  ],
  publishedAt: "2026-05-28",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "AI Architect" },
  tags: ["Serverless", "Agentic AI", "Cloudflare"],
  takeaways: [
    "Edge functions are amnesiac by design — holding conversation state in process is a category error.",
    "Make memory an external resource: load history at the start of a turn, persist it at the end, keep nothing in the function.",
    "Use KV for single-threaded conversations; reach for Durable Objects when multiple clients contend for the same state.",
    "With state outside the compute, the agent scales to zero yet remembers everything — no contradiction.",
  ],
  Body,
};
