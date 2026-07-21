import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        After shipping enough &quot;live&quot; dashboards, one truth stuck: a
        polling dashboard is lying most of the time. Between ticks, operators
        act on stale numbers; shrink the window and you DoS your own APIs with
        empty work. For telemetry — CPU, chat velocity, scene state — stop
        interrogating the server and let it speak. WebSockets push changes the
        instant they occur. That sub-second parity across clients is what cut
        manual data errors by 35% in production.
      </p>

      <h2>Why polling fails at scale</h2>
      <p>
        Polling forces a bad trade: either ship latency or ship waste. At 5s,
        your UI is up to 5s wrong and your fleet fires a wall of redundant
        reads. At 500ms, you approach freshness while torching CPU, caches, and
        rate limits with &quot;nothing changed&quot; responses. There isn&apos;t
        a magic interval; the question itself is expensive. Flip the model so
        the server only emits when state actually mutates.
      </p>

      <h2>The push architecture</h2>
      <p>
        The backend owns an event stream and broadcasts to subscribers over a
        persistent socket. No request fan-out, no timers — a value flips, the
        server emits, every dashboard updates in the same frame. In the pattern
        I call Trinity Architecture, the socket handler lives in the Reactive
        State / Orchestration layer, the Presentation layer just renders from
        state and dispatches intents, and a thin Data / Serialization Adapter
        shapes wire events into the in-memory model. No layer talks past its
        neighbor, which keeps both payloads and coupling under control.
      </p>

      <Terminal title="telemetry.ts">
        <span className="tok-com">{`// server: broadcast on change, not on request`}</span>
        {"\n"}
        metrics.
        <span className="tok-fn">on</span>
        <span className="tok-punc">(</span>
        <span className="tok-str">&quot;tick&quot;</span>
        <span className="tok-punc">,</span>{" "}
        <span className="tok-punc">(</span>m
        <span className="tok-punc">)</span>{" "}
        <span className="tok-key">{`=>`}</span> io.
        <span className="tok-fn">emit</span>
        <span className="tok-punc">(</span>
        <span className="tok-str">&quot;telemetry&quot;</span>
        <span className="tok-punc">,</span> m
        <span className="tok-punc">));</span>
        {"\n\n"}
        <span className="tok-com">{`// client: subscribe once, render on push`}</span>
        {"\n"}
        <span className="tok-fn">useEffect</span>
        <span className="tok-punc">(()</span>{" "}
        <span className="tok-key">{`=>`}</span>{" "}
        <span className="tok-punc">{`{`}</span>
        {"\n  "}
        <span className="tok-key">const</span> s ={" "}
        <span className="tok-fn">socket</span>
        <span className="tok-punc">(</span>URL
        <span className="tok-punc">);</span>
        {"\n  "}
        s.
        <span className="tok-fn">on</span>
        <span className="tok-punc">(</span>
        <span className="tok-str">&quot;telemetry&quot;</span>
        <span className="tok-punc">,</span> setMetrics
        <span className="tok-punc">);</span>
        {"\n  "}
        <span className="tok-key">return</span>{" "}
        <span className="tok-punc">()</span>{" "}
        <span className="tok-key">{`=>`}</span> s.
        <span className="tok-fn">close</span>
        <span className="tok-punc">();</span>
        {"\n"}
        <span className="tok-punc">{`}</span>, []);`}</span>
      </Terminal>

      <h3>Throttle the wire, not the truth</h3>
      <p>
        A telemetry source can fire hundreds of events per second. Humans can&apos;t
        read that, and React can&apos;t reconcile that without jank. Shape the
        firehose at the edge — sample or debounce to a renderable cadence before
        broadcast — so the feed is truthful but frame-friendly. On{" "}
        <a href="/#projects">streamerOS</a> we had to respect 60fps while chat
        and system metrics spiked; coalescing server-side kept backpressure off
        the socket and the main thread, without lying about the latest value.
      </p>

      <h2>Consuming streams in React without thrashing</h2>
      <p>
        The foot-gun is wiring &quot;telemetry&quot; to setState and letting it
        reflow the whole tree each packet. Keep hot values in a small, focused
        store and subscribe only the components that care. I use a Trinity split:
        Presentation renders from selectors; the orchestrator (Zustand or an
        event bus) owns the source of truth and optimistic merges; the adapter
        translates over-the-wire shapes into minimal, denormalized state. A CPU
        tick should repaint one gauge, not your navbar, tables, and modals.
      </p>

      <h2>Why this kills manual errors</h2>
      <p>
        When every client observes the same state at the same moment, an entire
        class of &quot;acted on stale data&quot; mistakes disappears. No operator
        is reconciling conflicting numbers; no action races a 3s-old snapshot.
        The win isn&apos;t speed for its own sake — it&apos;s a single, timely
        source of truth, which is what drove the 35% reduction we saw across
        platforms.
      </p>

      <blockquote>
        Polling asks &quot;has it changed?&quot; a thousand times a minute.
        Push answers once, the moment it does. At scale, that&apos;s the line
        between &quot;live&quot; and &quot;laggy.&quot;
      </blockquote>

      <p>
        This is the live-data backbone of{" "}
        <a href="/#projects">streamerOS</a> and the real-time sync layer in the{" "}
        <a href="/#projects">CMZ portal</a>, the same playbook I reach for when
        correctness, smoothness, and cost need to coexist.
      </p>
    </>
  );
}

export const realTimeTelemetry: BlogPost = {
  slug: "real-time-telemetry-websockets-react",
  title: "Real-Time Telemetry: WebSockets, React, and Live Data",
  description:
    "Polling is obsolete for live dashboards. How a WebSocket push architecture delivers sub-second cross-platform sync — and cut manual data errors by 35%.",
  keywords: [
    "WebSockets",
    "real-time",
    "React",
    "live dashboard",
    "telemetry",
    "Socket.IO",
    "cross-platform sync",
  ],
  publishedAt: "2026-05-31",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["WebSockets", "React", "Real-Time"],
  takeaways: [
    "Polling can't be both fresh and cheap; a push model has the server speak only when state actually changes.",
    "Broadcast events over a persistent socket and map them onto React state with a thin subscription.",
    "Coalesce high-frequency sources on the server to a renderable frame rate, and isolate live state so only affected components repaint.",
    "Single-source-of-truth sync — every client identical in the same instant — is what eliminates stale-data errors (35% fewer).",
  ],
  Body,
};
