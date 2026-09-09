import type { BlogPost } from "@/lib/blog";

function Body() {
  return (
    <>
      <p>
        Everyone said &ldquo;just put it on serverless.&rdquo; For the product I
        was building — a live dashboard holding thousands of open connections,
        pushing telemetry as it happened — I ran a long-lived Node process
        instead. This post is about that decision, because the decision{" "}
        <em>is</em> the product.
      </p>

      <h2>Know what your product actually is</h2>
      <p>
        Serverless is close to unbeatable for request-response work: a function
        wakes, does one job, returns, and you pay for milliseconds. If that is
        your workload, the argument is over and you should stop reading.
      </p>
      <p>
        A real-time product is not that workload. Its defining feature is the
        connection that <em>stays open</em> — and the whole economic model of
        serverless is that nothing stays open. Every constraint that follows
        comes from that one sentence, and none of it is visible in a feature
        list.
      </p>

      <h2>What a long-lived process buys you</h2>
      <ul>
        <li>
          <strong>State that survives between messages:</strong> a subscription
          registry, an in-process cache, a rate-limit window. On serverless each
          of those becomes a Redis round trip, on every message, forever.
        </li>
        <li>
          <strong>Fan-out that is a loop, not a bill:</strong> pushing one update
          to 5,000 subscribers is an iteration over a Map. The same fan-out
          through a serverless gateway is 5,000 billable invocations.
        </li>
        <li>
          <strong>Backpressure you can actually apply:</strong> the socket tells
          you when the client is not keeping up. A stateless function has no
          idea a consumer is drowning, because it never sees the consumer twice.
        </li>
        <li>
          <strong>Warm everything:</strong> connection pools, compiled
          serialisers, prepared statements — all established once at boot rather
          than re-established on a cold start in front of a waiting user.
        </li>
        <li>
          <strong>Ordering within a connection:</strong> messages from one client
          arrive at one process in order. Getting that guarantee across
          independent invocations means a queue and sequence numbers you now
          maintain.
        </li>
      </ul>

      <blockquote>
        &ldquo;Just go serverless&rdquo; is usually correct — that is what makes
        it dangerous. The senior skill is recognising the one project in ten
        where the default answer quietly removes the thing the product is
        made of.
      </blockquote>

      <h2>The bill nobody models</h2>
      <p>
        The comparison people run is per-invocation price against per-hour price,
        and serverless usually wins it. The comparison that decides the question
        is different: a real-time product bills on <em>connection-minutes and
        messages</em>, not requests. Ten thousand idle connections cost a
        long-lived process almost nothing — some file descriptors and a little
        memory. On a managed WebSocket gateway they are a line item that grows
        while your users do nothing at all.
      </p>

      <h2>The honest cost</h2>
      <p>
        I now own things serverless would have owned for me. Deployment without
        dropping connections means draining: stop accepting, let clients
        reconnect to the new instance, then exit. Scaling is a decision I make
        rather than one that happens. A crashed process takes its connections
        with it, so health checks and restarts are mine to get right. And memory
        discipline matters in a way it never does in a function that exits after
        200ms — every leak I write, I keep.
      </p>
      <p>
        That is roughly a week of infrastructure work I would not otherwise have
        done, paid once by me, against latency and cost paid by every user on
        every session.
      </p>

      <h2>Where I would still choose serverless</h2>
      <p>
        Without hesitation: the REST API around the real-time core, scheduled
        jobs, webhook receivers, image processing, anything spiky and stateless.
        The interesting architecture is not one or the other — it is a
        long-lived process for the connections and functions for everything
        else, with the boundary drawn at exactly the point where state stops
        mattering.
      </p>

      <h2>The method, which is the transferable part</h2>
      <p>
        Find the constraint that governs the product — here, <em>connections
        stay open</em> — and check the default answer against it before
        accepting the default. Most of the time the default survives and you
        move on in five minutes. Occasionally it does not, and those are the
        decisions worth writing down.
      </p>
    </>
  );
}

export const nodeOverServerlessRealtime: BlogPost = {
  slug: "node-over-serverless-for-realtime",
  title:
    "Everyone Said 'Just Go Serverless.' I Ran a Long-Lived Node Process — Here's What That Bought",
  description:
    "A live dashboard holding thousands of open connections is the one workload serverless is worst at. Why in-process state, loop-based fan-out and real backpressure were the product decision, not a preference.",
  keywords: [
    "Node.js vs serverless",
    "WebSockets at scale",
    "real-time architecture",
    "stateful Node service",
    "serverless cold start latency",
    "Node production experience",
  ],
  publishedAt: "2026-07-07",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Founder's Log", "Node.js", "Architecture"],
  takeaways: [
    "A real-time product is defined by the connection that stays open, and the economics of serverless assume nothing stays open.",
    "In-process state turns per-message Redis round trips into memory reads, and fan-out into a loop rather than thousands of billable invocations.",
    "The honest cost: draining deploys, scaling decisions and memory discipline become mine — roughly a week of work paid once.",
    "The method transfers: find the constraint that governs the product, then check the default answer against it before accepting it.",
  ],
  Body,
};
