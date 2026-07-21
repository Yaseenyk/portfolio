import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        In production, the LLM hop is the tall pole — slow, pricey, and throttled
        by someone else&apos;s quota. Treat it like a cheap database read and the
        first thousand-user burst will crater your p95s. The practical move isn&apos;t
        a faster model; it&apos;s not calling the model when you don&apos;t need to. A
        hard cache tier between the user and the LLM is what kept our enterprise
        admin portal steady at 99.9% uptime with ~25% lower latency when traffic
        got noisy.
      </p>

      <h2>The LLM is a network call you cannot trust to be fast</h2>
      <p>
        Provider latency swings, throughput is rate-limited, and every token is a
        bill. You don&apos;t paper over that in a prompt template — you solve it in the
        shape of the system: put a cache in front of the model and make the common
        paths terminate there. When the hot path never leaves your infra, your SLOs
        stop depending on a vendor&apos;s Tuesday.
      </p>

      <h2>A cache between the user and the model</h2>
      <p>
        Start with cache-aside on Redis. Normalize and hash the resolved prompt,
        then check for a hit before you even look at the SDK. Deterministic asks —
        system summaries, classification, idempotent lookups — come back in single
        milliseconds and cost $0. Scope TTLs by volatility and evict on the write
        paths that actually change meaning. Save the tokens for the true unknowns.
      </p>

      <Terminal title="cache.ts">
        <span className="tok-com">{`// cache-aside: never pay for the model on a repeat`}</span>
        {"\n"}
        <span className="tok-key">const</span> key ={" "}
        <span className="tok-fn">hash</span>
        <span className="tok-punc">(</span>prompt
        <span className="tok-punc">);</span>
        {"\n"}
        <span className="tok-key">const</span> hit ={" "}
        <span className="tok-key">await</span> redis.
        <span className="tok-fn">get</span>
        <span className="tok-punc">(</span>key
        <span className="tok-punc">);</span>
        {"\n"}
        <span className="tok-key">if</span>{" "}
        <span className="tok-punc">(</span>hit
        <span className="tok-punc">)</span>{" "}
        <span className="tok-key">return</span> JSON.
        <span className="tok-fn">parse</span>
        <span className="tok-punc">(</span>hit
        <span className="tok-punc">);</span>{" "}
        <span className="tok-com">{`// ~3ms, $0`}</span>
        {"\n\n"}
        <span className="tok-key">const</span> answer ={" "}
        <span className="tok-key">await</span> llm.
        <span className="tok-fn">complete</span>
        <span className="tok-punc">(</span>prompt
        <span className="tok-punc">);</span>
        {"\n"}
        <span className="tok-key">await</span> redis.
        <span className="tok-fn">set</span>
        <span className="tok-punc">(</span>key
        <span className="tok-punc">,</span> JSON.
        <span className="tok-fn">stringify</span>
        <span className="tok-punc">(</span>answer
        <span className="tok-punc">),</span>{" "}
        <span className="tok-str">&quot;EX&quot;</span>
        <span className="tok-punc">,</span>{" "}
        <span className="tok-num">3600</span>
        <span className="tok-punc">);</span>
        {"\n"}
        <span className="tok-key">return</span> answer
        <span className="tok-punc">;</span>
      </Terminal>

      <h3>Exact-match is not enough — add a semantic layer</h3>
      <p>
        Users ask the same thing twelve different ways. An exact key misses most
        of them. Add a semantic cache: embed the incoming prompt, search a vector
        index of recent prompts, and if the nearest neighbor clears a tight
        similarity bar, return its cached answer. Keep the threshold conservative
        to avoid clever-but-wrong hits. This turns the long tail of near-duplicates
        into cache wins — the single biggest lever on provider load I&apos;ve seen in
        high-traffic portals.
      </p>

      <h2>MongoDB indexing for the data the model reads</h2>
      <p>
        Caching the model is only half the battle. If each request waits on a cold
        Mongo scan, you just moved the bottleneck. Index to the actual query
        shapes: compound indexes for your filter+sort pairs, projections to ship
        only what the prompt needs, and covered indexes so common reads return
        straight from the index. The point is simple — retrieval should never be
        why a user stares at a spinner.
      </p>

      <h2>Insulating the rate limit at 4,000+ users</h2>
      <p>
        With exact and semantic caches eating repeats, only truly novel prompts
        reach the provider. Those ride a request queue with a concurrency cap
        tuned to your rate limit, so spikes turn into predictable queueing instead
        of a 429 storm. Same playbook I used on streamerOS to keep 60fps while
        ingesting chat + telemetry: embrace backpressure, smooth the burst, and
        let the system breathe.
      </p>

      <blockquote>
        Scaling an AI feature isn&apos;t about making the model fast; it&apos;s about
        making the model rare on your hot path.
      </blockquote>

      <p>
        This is the caching architecture behind the{" "}
        <a href="/#projects">CMZ enterprise portal</a> — Redis cache rings,
        indexed reads, and rate-limit insulation that keep latency and uptime
        boring across thousands of active endpoints.
      </p>
    </>
  );
}

export const cachingTheAi: BlogPost = {
  slug: "caching-the-ai-redis-mongodb-llm-latency",
  title: "Caching the AI: Slashing LLM Latency with Redis & MongoDB",
  description:
    "AI APIs are the slowest hop in your stack. How exact + semantic Redis caching and optimized MongoDB indexing hold 99.9% uptime and cut latency 25% under real load.",
  keywords: [
    "LLM caching",
    "Redis",
    "MongoDB indexing",
    "API latency",
    "rate limiting",
    "backend scaling",
    "semantic cache",
  ],
  publishedAt: "2026-06-02",
  readingMinutes: 9,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Redis", "MongoDB", "Backend"],
  takeaways: [
    "The LLM call is the slowest, costliest, most rate-limited hop — architect to avoid it on the common case.",
    "Layer caching: exact-match on Redis for deterministic prompts, plus a semantic cache to catch near-duplicate questions.",
    "Index MongoDB for real access patterns so the retrieval feeding the prompt is never the bottleneck.",
    "A request queue + concurrency cap insulate the provider rate limit, turning spikes into queueing instead of 429s.",
  ],
  Body,
};
