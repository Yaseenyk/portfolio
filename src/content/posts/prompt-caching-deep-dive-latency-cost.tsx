import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function Body() {
  return (
    <>
      <p>
        Your RAG endpoint sends the same 8,000-token system prompt — instructions,
        tool schemas, a fat style guide — on every single request, then appends a
        20-token user question. You are re-paying full input price to re-read an
        identical preamble thousands of times a day. The model doesn&apos;t need
        to re-read what hasn&apos;t changed. Prompt caching makes it stop, and the
        savings on a high-volume path are not marginal — they&apos;re structural.
      </p>

      <h2>Core Architectural Concepts &amp; Trade-offs</h2>
      <p>
        Prompt caching stores the internal representation of a prompt{" "}
        <em>prefix</em> so subsequent requests that share that exact prefix skip
        recomputing it. You mark cacheable boundaries with{" "}
        <code>cache_control</code> breakpoints; on a cache hit, those input tokens
        bill at roughly a tenth of the normal rate and skip the compute, which
        cuts cost <em>and</em> time-to-first-token. On a high-traffic endpoint
        with a big static preamble, that&apos;s the single highest-ROI change you
        can make — and it requires zero quality trade-off, unlike compaction
        (Lesson 1) which is lossy.
      </p>
      <p>
        The mechanic that governs everything is <strong>prefix matching</strong>:
        the cache keys on an exact-match prefix from the very start of the prompt.
        Everything up to a breakpoint must be byte-identical to hit. The
        engineering consequence is an ordering discipline — <strong>static
        content first, dynamic content last</strong>. System prompt, then tool
        definitions, then stable reference documents, <em>then</em> the volatile
        conversation and the user&apos;s turn. Put a timestamp or a per-request ID
        near the top and you&apos;ve invalidated the entire cache below it; the
        prefix no longer matches and you pay full price for all of it.
      </p>
      <p>
        Caches are ephemeral, and that shapes the workload they help. The cached
        prefix has a short time-to-live — on the order of a few minutes — refreshed
        on each hit. So caching is a windfall for bursty, repeated traffic
        (multi-turn sessions, a flood of requests over the same documents) and does
        nothing for cold, one-off calls spaced hours apart. Know your traffic
        shape before you count the savings: a chat session reuses the prefix every
        turn; a nightly batch job hits a cold cache every time.
      </p>
      <p>
        Two interactions to design around. Caching pairs naturally with cheap-tier
        routing — a Haiku 4.5 extraction loop (Lesson 3) over a cached document
        prefix is about as cheap as production inference gets. And it constrains
        compaction: summarizing or editing early conversation rewrites the prefix
        and breaks the cache below it, so compact at boundaries where you were
        going to invalidate anyway, never mid-burst inside a tight cached loop.
        The cheapest token is the one you don&apos;t recompute — but only if you
        keep the prefix stable.
      </p>

      <h2>Caching the Static Prefix</h2>
      <p>
        Mark the stable preamble — tools and system — with a breakpoint. The
        volatile user turn stays uncached at the end.
      </p>
      <Terminal title="cached-call.ts">
        <span className="tok-com">{"// Static first, dynamic last. The breakpoint caches everything above it."}</span>
        {`
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic()

// Stable across every request → cache it once, reuse it for ~minutes.
const TOOLS = [/* …large, stable tool schemas… */]
const SYSTEM_PREAMBLE = LONG_INSTRUCTIONS + STYLE_GUIDE   // ~8K tokens

export async function answer(question: string) {
  return anthropic.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    tools: TOOLS,
    system: [
      {
        type: "text",
        text: SYSTEM_PREAMBLE,
        // Breakpoint: cache the system + tools prefix above this point.
        cache_control: { type: "ephemeral" },
      },
    ],
    // Dynamic tail — never cached, byte-changes every call. Always LAST.
    messages: [{ role: "user", content: question }],
  })
}

// First call: cache write (slightly higher). Every call for the next few
// minutes: cache hit → ~90% off the prefix tokens + faster first token.`}
      </Terminal>
      <p>
        Check the response&apos;s usage fields —{" "}
        <code>cache_creation_input_tokens</code> on the write,{" "}
        <code>cache_read_input_tokens</code> on the hits — to confirm you&apos;re
        actually landing in the cache and not silently paying full freight.
      </p>

      <h2>The Economics of a Stable Prefix</h2>
      <Diagram
        label="A prompt split into a large static prefix and a small dynamic suffix across repeated requests: the first request writes the cache at full price, and subsequent requests read the prefix at roughly one tenth the cost while only the small suffix bills at full rate."
        caption="Write once, read cheap. The static prefix bills at ~10% on every hit; only the small dynamic tail pays full price."
      >
        <svg viewBox="0 0 760 270" xmlns="http://www.w3.org/2000/svg" role="img">
          <rect x="0" y="0" width="760" height="270" fill="#05070A" />
          <defs>
            <linearGradient id="an9-cyan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#0e3a44" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          {/* Request 1 — cache write */}
          <text x="40" y="48" fill="#94a3b8" fontFamily="monospace" fontSize="12">request 1 — cache WRITE (full price)</text>
          <rect x="40" y="58" width="520" height="40" rx="6" fill="url(#an9-cyan)" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="300" y="83" fill="#04141a" fontFamily="monospace" fontSize="12" textAnchor="middle">static prefix · system + tools · ~8K tokens</text>
          <rect x="564" y="58" width="156" height="40" rx="6" fill="#160d1f" stroke="#a855f7" strokeWidth="1.5" />
          <text x="642" y="83" fill="#c4b5fd" fontFamily="monospace" fontSize="11" textAnchor="middle">user turn</text>

          {/* Request 2..N — cache read */}
          <text x="40" y="146" fill="#67e8f9" fontFamily="monospace" fontSize="12">requests 2…N — cache READ (~10% price)</text>
          <rect x="40" y="156" width="520" height="40" rx="6" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="300" y="181" fill="#67e8f9" fontFamily="monospace" fontSize="12" textAnchor="middle">same prefix → cache hit · skips compute</text>
          <rect x="564" y="156" width="156" height="40" rx="6" fill="#160d1f" stroke="#a855f7" strokeWidth="1.5" />
          <text x="642" y="181" fill="#c4b5fd" fontFamily="monospace" fontSize="11" textAnchor="middle">new user turn</text>

          {/* invalidation warning */}
          <rect x="40" y="218" width="680" height="34" rx="7" fill="#1a0f0f" stroke="#ef4444" strokeWidth="1.3" opacity="0.85" />
          <text x="380" y="240" fill="#f87171" fontFamily="monospace" fontSize="11" textAnchor="middle">put a timestamp / request-id near the top → prefix breaks → full price below it</text>
        </svg>
      </Diagram>
      <p>
        Caching makes single-agent calls cheap; the next module scales out to
        many agents at once —{" "}
        <a href="/blog/constitutional-ai-safety-system-prompts-guardrails">
          but first, safety: constitutional AI &amp; guardrails
        </a>
        . Or browse{" "}
        <a href="/anthropic-roadmap">the full roadmap</a>.
      </p>
    </>
  );
}

export const promptCachingDeepDive: BlogPost = {
  slug: "prompt-caching-deep-dive-latency-cost",
  title: "Prompt Caching Deep Dive: Cutting Latency & Cost",
  description:
    "Re-sending an 8K static preamble every request re-pays full price for unchanged tokens. Prompt caching bills the prefix at ~10% on every hit — if you keep it stable and first.",
  keywords: [
    "prompt caching",
    "Claude cache_control",
    "prefix caching",
    "LLM cost optimization",
    "cache breakpoints",
    "Anthropic caching",
    "time to first token",
    "ephemeral cache",
  ],
  publishedAt: "2026-06-02",
  readingMinutes: 9,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Anthropic", "Claude", "Cost Optimization"],
  takeaways: [
    "Prompt caching stores a prompt prefix so requests sharing it skip recompute; cached input tokens bill at roughly a tenth the rate and cut time-to-first-token, with no quality trade-off.",
    "The cache keys on an exact prefix match, so order static content first (system, tools, stable docs) and dynamic content last — a timestamp near the top invalidates everything below it.",
    "The cached prefix has a short TTL (minutes), so caching is a windfall for bursty repeated traffic and does nothing for cold one-off calls.",
    "Verify hits via cache_creation_input_tokens and cache_read_input_tokens, and compact only at boundaries where you'd invalidate the prefix anyway.",
  ],
  Body,
};
