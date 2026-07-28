import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        The change that steadied a high-traffic portal wasn’t a faster
        database — it was fewer trips to it. Once thousands of endpoints are live,
        tail latency is dominated by round-trips, serializers on the hot path, and
        lock contention, and nothing relieves that pressure like a cache used
        deliberately rather than sprinkled in. Most stacks reach for Redis and
        still use a sliver of what it can do.
      </p>

      <h2>The interceptor pattern</h2>
      <p>
        Stop scattering cache branches through controllers. Put the policy at a
        single boundary: a read-through middleware that checks Redis and only
        falls back to the handler on a miss. Controllers stay boring and
        testable; caching becomes a cross-cutting concern you can reason about
        in one place. That boundary also cleanly fits the pattern I call Trinity
        Architecture: controllers live in the orchestration layer, while this
        middleware acts as the Data/Serialization Adapter — it shapes bytes and
        TTLs, but never mutates application state directly.
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
        Write-through keeps hot sets warm by writing on every mutation, great
        for read-heavy data that must not drift. The real foot-gun is partial
        invalidation: a write path that updates the database but not the cache
        serves confidently wrong data until TTL bails you out. Decide per data
        shape: payload size, fan-out of invalidation, and tolerance for
        staleness. When I can’t guarantee atomic invalidation, I favor
        cache-aside with short TTLs and versioned keys.
      </p>

      <h2>TTL, stampedes, and key hygiene</h2>
      <p>
        Three details decide whether caching helps or hurts at scale. Set TTLs
        to the data&apos;s real volatility, not a global constant, and add a small
        jitter to avoid synchronized expiry. Guard against cache stampedes —
        when a hot key expires and a thousand requests dog-pile the database —
        with single-flight locks or a probabilistic early refresh. And treat
        keys like schemas: namespaced and structured so invalidation is
        surgical, not a blunt flush. Payload size matters, too. On IntegrateX,
        the Serialization Adapter stripped non-essential React Flow UI metadata
        before persistence and cut payloads 94%; that same discipline keeps
        Redis memory, bandwidth, and stampede blast radius under control.
      </p>

      <blockquote>
        A cache isn’t a last-minute speed hack; it’s an architectural contract
        about which data may be slightly stale — and for how long.
      </blockquote>

      <p>
        For caching specifically in front of slow LLM calls, see{" "}
        <a href="/blog/caching-the-ai-redis-mongodb-llm-latency">Caching the AI</a>
        ; the production system is the{" "}
        <a href="/#projects">CMZ enterprise portal</a>. Across the five products I
        shipped solo this year the pattern holds — the judgment I bring to a team
        is treating a cache as an architectural contract about staleness, not a
        speed hack bolted on at the end.
      </p>
    </>
  );
}

export const advancedRedisCaching: BlogPost = {
  slug: "advanced-redis-caching-strategies",
  title: "Redis Caching Strategies That Don't Serve Stale Data",
  description:
    "On a busy portal I learned Redis caching strategies live or die on details: one interceptor boundary, cache-aside vs write-through, TTL jitter, stampede guards.",
  keywords: [
    "Redis caching",
    "cache-aside",
    "write-through",
    "cache stampede",
    "backend performance",
    "Redis caching engineer",
    "MERN developer for hire",
    "Yaseen Khatib",
  ],
  publishedAt: "2026-06-13",
  updatedAt: "2026-07-28",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Redis", "Performance", "Backend"],
  takeaways: [
    "Centralize caching in a read-through interceptor so controllers stay oblivious and the policy lives in one place.",
    "Pick cache-aside vs write-through per data shape — and never let a write path update the DB without the cache.",
    "Tune TTLs to real volatility, guard hot keys against stampedes, and namespace keys for surgical invalidation.",
    "On a high-traffic portal this approach cut API latency and shielded the origin database from read spikes.",
  ],
  Body,
};
