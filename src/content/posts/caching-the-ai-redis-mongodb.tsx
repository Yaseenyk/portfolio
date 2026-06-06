import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Every LLM call is the slowest, most expensive, most rate-limited hop in
        your request path. Treat it like a fast database query and your portal
        falls over the first time a thousand users hit it at once. The fix is not
        a faster model — it is refusing to call the model at all when you do not
        have to. A disciplined cache tier between the user and the LLM is what
        keeps an enterprise admin portal at 99.9% uptime and 25% lower latency
        under real load.
      </p>

      <h2>The LLM is a network call you cannot trust to be fast</h2>
      <p>
        Provider latency is variable by design, throughput is capped by a rate
        limit you do not control, and every token costs money. None of those are
        problems you solve in the prompt — they are problems you solve in the
        architecture, by putting a cache between your traffic and the model and
        making sure the common case never reaches the provider.
      </p>

      <h2>A cache between the user and the model</h2>
      <p>
        Start with the obvious win: cache-aside on Redis. Before paying for a
        completion, hash the resolved prompt and check for a hit. Deterministic
        prompts — system summaries, classification, repeated lookups — return in
        single-digit milliseconds instead of seconds, and never consume rate
        budget.
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
        Users phrase the same question ten ways. An exact-match key misses all
        ten. Layer a semantic cache on top: embed the incoming prompt, search a
        vector index of recent prompts, and if the nearest neighbor is within a
        tight similarity threshold, return its cached answer. This converts a
        long tail of near-duplicates into hits — the single biggest lever on
        provider load in a high-traffic portal.
      </p>

      <h2>MongoDB indexing for the data the model reads</h2>
      <p>
        Caching the model is half the story; the other half is the retrieval the
        model depends on. If every completion is preceded by a slow Mongo query,
        you have just moved the bottleneck. Index for the actual access
        patterns — compound indexes on the fields your queries filter and sort
        by, covered indexes where you can return straight from the index without
        touching documents. The goal is that the data feeding the prompt is
        never the thing keeping the user waiting.
      </p>

      <h2>Insulating the rate limit at 4,000+ users</h2>
      <p>
        With exact and semantic caching absorbing the repeat traffic, only
        genuinely novel prompts reach the provider — and those you shape with a
        request queue and a concurrency cap tuned to your rate limit, so a spike
        degrades into a few hundred extra milliseconds of queueing rather than a
        wall of 429s. The provider never sees your peak; it sees your cache-miss
        rate, which is a fraction of it.
      </p>

      <blockquote>
        Scaling an AI feature is not about making the model faster. It is about
        ensuring the model is the exception in your request path, not the rule.
      </blockquote>

      <p>
        This is the caching architecture behind the{" "}
        <a href="/#projects">CMZ enterprise portal</a> — Redis cache rings,
        indexed reads, and rate-limit insulation holding latency and uptime
        steady across thousands of active endpoints.
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
