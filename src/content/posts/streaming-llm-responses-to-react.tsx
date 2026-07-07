import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        A model that takes eight seconds to answer feels broken if the user stares
        at a spinner the whole time, and instant if the words appear as they are
        generated. The perceived latency of an LLM feature is almost entirely a
        streaming problem. Get the tokens onto the screen as they arrive and a
        slow model feels alive.
      </p>

      <h2>Why you must stream</h2>
      <p>
        Generation is sequential — the model produces tokens one at a time, and
        you can have them the moment each is ready instead of waiting for the
        whole completion. Buffering the full response before rendering throws away
        that free latency win and turns a responsive interface into a loading
        screen. For any user-facing generation, streaming is not an optimization;
        it is the baseline.
      </p>

      <h2>SSE vs. WebSockets for token flow</h2>
      <p>
        Token streaming is one-way: server to client. That is exactly what
        Server-Sent Events are for — a single HTTP response that stays open and
        pushes chunks, with automatic reconnection and no protocol ceremony.
        Reserve WebSockets for genuinely bidirectional needs; for streaming a
        completion, SSE is simpler and fits the request/response model you already
        have.
      </p>

      <Terminal title="stream.ts">
        <span className="tok-com">{"// server: pipe model tokens straight to the client"}</span>
        {`
for await (const chunk of llm.stream(prompt)) {
  res.write(\`data: \${JSON.stringify(chunk)}\\n\\n\`);
}
res.end();

// client: append each token as it lands
const es = new EventSource("/api/stream");
es.onmessage = (e) => setText((t) => t + JSON.parse(e.data));`}
      </Terminal>

      <h2>Render without thrashing</h2>
      <p>
        Tokens can arrive faster than the eye needs and faster than React wants to
        reconcile. Append into a single piece of state and keep the streaming text
        isolated so only that component re-renders, not the whole page. The goal
        is a smooth crawl of text, not a stutter — buttery output is part of why
        the feature feels premium.
      </p>

      <blockquote>
        Users do not experience your model&apos;s latency. They experience the
        moment the first token appears. Stream, and that moment comes almost
        immediately.
      </blockquote>

      <p>
        For true bidirectional, high-frequency data, the{" "}
        <a href="/blog/real-time-telemetry-websockets-react">
          WebSocket telemetry
        </a>{" "}
        pattern picks up where SSE leaves off.
      </p>
    </>
  );
}

export const streamingLlmToReact: BlogPost = {
  slug: "streaming-llm-responses-to-react",
  title: "Streaming LLM Responses to React with Server-Sent Events",
  description:
    "Perceived LLM latency is a streaming problem. Why SSE is the right tool for one-way token flow, and how to render a stream in React without thrashing.",
  keywords: [
    "streaming",
    "server-sent events",
    "SSE",
    "React",
    "LLM",
    "latency",
    "EventSource",
  ],
  publishedAt: "2026-06-06",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["React", "Streaming", "AI"],
  takeaways: [
    "Perceived LLM latency is mostly a streaming problem — get tokens on screen as they generate.",
    "Token flow is one-way, so SSE fits better than WebSockets: an open HTTP response with auto-reconnect, no ceremony.",
    "Append tokens into isolated state so only the streaming component re-renders, keeping output smooth.",
    "Users experience the first token, not the total latency — stream and it arrives almost instantly.",
  ],
  Body,
};
