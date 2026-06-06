import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        A single WebSocket server streaming telemetry to a few clients is a
        weekend project. Streaming live data to thousands of clients across
        multiple server instances is an architecture problem. The naive design —
        one process holding every connection in memory — falls over the moment
        you scale horizontally, because instance A cannot broadcast to a client
        connected to instance B.
      </p>

      <h2>The horizontal-scaling problem</h2>
      <p>
        Once you run more than one server process behind a load balancer,
        connections fan out across instances. An event that originates on one
        instance has to reach subscribers on all of them. In-memory broadcast
        only reaches the local process; you need a shared backplane so every
        instance hears every event.
      </p>

      <Terminal title="scale.ts">
        <span className="tok-com">{"// Redis pub/sub backplane → broadcast across every instance"}</span>
        {`
import { createAdapter } from "@socket.io/redis-adapter";

io.adapter(createAdapter(pubClient, subClient));

// emit anywhere; every instance's subscribers receive it
metrics.on("tick", (m) => io.to("telemetry").emit("metric", m));`}
      </Terminal>

      <h2>Rooms, not broadcasts</h2>
      <p>
        Do not push every metric to every client. Scope subscriptions into rooms
        — per dashboard, per device, per tenant — so a client receives only the
        streams it is watching. This collapses bandwidth and CPU from O(clients ×
        events) toward O(interested clients), which is the difference between a
        system that scales and one that melts at a few thousand connections.
      </p>

      <h2>Coalesce at the source</h2>
      <p>
        High-frequency sources emit faster than any client can render or any
        socket should carry. Sample or debounce on the server to a sane frame
        rate before broadcasting, so you push the latest truth at a rate the wire
        and the React reconciler can actually absorb. Backpressure handled at the
        source beats backpressure discovered at the client.
      </p>

      <blockquote>
        Scaling real-time is not about a faster socket. It is about making sure
        each event travels exactly as far as it needs to — and no further.
      </blockquote>

      <p>
        For the single-server fundamentals and the React consumption side, see{" "}
        <a href="/blog/real-time-telemetry-websockets-react">
          Real-Time Telemetry
        </a>
        ; the live systems are{" "}
        <a href="/#projects">streamerOS and the CMZ portal</a>.
      </p>
    </>
  );
}

export const websocketTelemetryAtScale: BlogPost = {
  slug: "websocket-telemetry-at-scale",
  title: "WebSocket Telemetry at Scale: Real-Time Streaming Architectures",
  description:
    "A single WebSocket server is a weekend project; streaming to thousands across instances is architecture. Redis pub/sub backplanes, room-scoped subscriptions, and source-side coalescing.",
  keywords: [
    "WebSockets",
    "real-time",
    "horizontal scaling",
    "Redis pub/sub",
    "Socket.IO",
    "telemetry",
    "backpressure",
  ],
  publishedAt: "2026-06-12",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["WebSockets", "Real-Time", "Backend"],
  takeaways: [
    "In-memory broadcast only reaches the local process — multi-instance real-time needs a shared backplane (Redis pub/sub).",
    "Scope subscriptions into rooms so each client receives only the streams it watches, collapsing bandwidth and CPU.",
    "Coalesce high-frequency sources on the server to a renderable frame rate before broadcasting.",
    "Handle backpressure at the source, not after it has already flooded the client.",
  ],
  Body,
};
