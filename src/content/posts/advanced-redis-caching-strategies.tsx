import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Caching is the highest-leverage lever in a backend, and most teams use a
        fraction of what Redis offers. On a portal serving thousands of active
        endpoints, a disciplined caching layer is what cut API latency by 25%
        while holding 99.9% uptime — not a faster database, but fewer trips to it.
      </p>

      <h2>The interceptor pattern</h2>
      <p>
        Rather than sprinkling cache logic through controllers, put it at a
        single boundary: a middleware that reads through Redis and only falls
        back to the handler on a miss. The controller stays oblivious; caching
        becomes a cross-cutting concern you can reason about in one place.
      </p>

      <Terminal title="cache.middleware.ts">
        <span className="tok-com">{"// read-through interceptor: one boundary, every route"}</span>
        {`
export const cached = (ttl: number) => async (req, res, next) => {
  const key = \`\${req.method}:\${req.originalUrl}\`;
  const hit = await redis.get(key);
  if (hit) return res.json(JSON.parse(hit));

  res.sendJson = res.json;
  res.json = (body) => {
    redis.set(key, JSON.stringify(body), "EX", ttl);
    return res.sendJson(body);
  };
  next();
};`}
      </Terminal>

      <h2>Choose the write strategy deliberately</h2>
      <p>
        Cache-aside (lazy) is the default — populate on read, expire on TTL.
        Write-through keeps the cache hot by writing on every mutation, ideal for
        read-heavy data that must never serve stale. The trap is forgetting
        invalidation: a write path that updates the database but not the cache
        ships confidently wrong data until the TTL saves you. Pick the strategy
        per data shape, not per project.
      </p>

      <h2>TTL, stampedes, and key hygiene</h2>
      <p>
        Three details decide whether caching helps or hurts at scale. Set TTLs to
        the data&apos;s actual volatility, not a global guess. Guard against cache
        stampedes — when a hot key expires and a thousand requests hit the
        database at once — with a short lock or a probabilistic early refresh.
        And keep keys structured and namespaced so invalidation is surgical
        rather than a blunt flush.
      </p>

      <blockquote>
        A cache is not a performance trick you add at the end. It is an
        architecture decision about which data is allowed to be slightly stale —
        and for how long.
      </blockquote>

      <p>
        For caching specifically in front of slow LLM calls, see{" "}
        <a href="/blog/caching-the-ai-redis-mongodb-llm-latency">Caching the AI</a>
        ; the production system is the{" "}
        <a href="/#projects">CMZ enterprise portal</a>.
      </p>
    </>
  );
}

export const advancedRedisCaching: BlogPost = {
  slug: "advanced-redis-caching-strategies",
  title: "Advanced Redis Caching Strategies: Slashing API Latency 25%",
  description:
    "Caching is the highest-leverage backend lever. The interceptor pattern, cache-aside vs write-through, and the TTL/stampede details that cut API latency 25% at scale.",
  keywords: [
    "Redis caching",
    "cache-aside",
    "write-through",
    "API latency",
    "backend performance",
    "cache stampede",
    "Node.js",
  ],
  publishedAt: "2026-06-13",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Redis", "Performance", "Backend"],
  takeaways: [
    "Centralize caching in a read-through interceptor so controllers stay oblivious and the policy lives in one place.",
    "Pick cache-aside vs write-through per data shape — and never let a write path update the DB without the cache.",
    "Tune TTLs to real volatility, guard hot keys against stampedes, and namespace keys for surgical invalidation.",
    "On a high-traffic portal this approach cut API latency 25% while holding 99.9% uptime.",
  ],
  Body,
};
