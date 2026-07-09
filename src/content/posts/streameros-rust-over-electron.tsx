import type { BlogPost } from "@/lib/blog";

function Body() {
  return (
    <>
      <p>
        When I started streamerOS — a desktop cockpit that gives streamers live
        system telemetry, chat velocity across platforms, and automated OBS
        scene control — every sensible voice said the same thing: use
        Electron, ship in a month. I wrote it in Rust with Tauri instead. This
        post is about that decision, because the decision <em>is</em> the
        product.
      </p>

      <h2>Know whose machine you&apos;re running on</h2>
      <p>
        A streamer&apos;s PC is the most contested computer in consumer
        software. It is simultaneously running a AAA game, OBS with an encoder,
        a browser full of dashboards, and a chat app — all fighting for the
        same cores and memory. Shipping a few-hundred-megabyte Chromium
        instance into that environment to draw some meters is not an
        engineering choice; it is a tax on your user&apos;s frame rate. The
        constraint that mattered was invisible in the feature list: <em>be
        weightless on a machine under siege.</em>
      </p>

      <h2>What does Rust buy you over Electron?</h2>
      <ul>
        <li>
          <strong>A native core:</strong> Tauri boots a Rust process with an
          async tokio runtime — the app idles at a fraction of Electron&apos;s
          memory and leaves the CPU to the game and the encoder.
        </li>
        <li>
          <strong>On-device ingestion:</strong> Twitch IRC and YouTube Live
          chat connect over WebSockets directly from the user&apos;s machine.
          Chat velocity and sentiment are scored in Rust, off the UI thread —
          no cloud relay, no latency, no privacy question.
        </li>
        <li>
          <strong>A disciplined bridge:</strong> events cross the Tauri
          boundary to the Next.js webview as batched MessagePack — the IPC is
          a designed contract, not a firehose.
        </li>
        <li>
          <strong>60fps where it counts:</strong> the React dashboard paints
          meters and graphs with transform-only updates, so the cockpit stays
          smooth while everything else on the machine burns.
        </li>
        <li>
          <strong>Real automation:</strong> rules fire OBS WebSocket v5
          commands — scene switches, source toggles — turning the cockpit from
          a display into an operator.
        </li>
      </ul>

      <blockquote>
        &quot;Just use Electron&quot; is usually correct — that&apos;s what
        makes it dangerous. The senior skill is recognizing the one project in
        ten where the default answer quietly destroys the product&apos;s
        reason to exist.
      </blockquote>

      <h2>The cost, honestly</h2>
      <p>
        Rust was slower to write. The borrow checker argued with me for the
        first two weeks; async lifetimes have a learning curve that JavaScript
        never demands. I paid roughly double the development time on the core
        compared to an Electron equivalent. But development time is paid once,
        by me. Runtime weight is paid on every stream, by every user, forever.
        Choosing where to spend was not a language preference — it was unit
        economics applied to CPU cycles.
      </p>

      <h2>What this tells you about how I work</h2>
      <p>
        I don&apos;t pick technologies; I price constraints. The same
        reasoning that put Rust in streamerOS put <em>zero</em> infrastructure
        in my content pipeline and put SQLite-on-device in my finance agent —
        three different answers from one method: find the constraint that
        actually governs the product, and spend where it lives. The full
        architecture — IPC design, chat ingestion, OBS rule engine — is broken
        down on <a href="/products/streameros">the streamerOS product page</a>.
      </p>
    </>
  );
}

export const streamerOsRustStory: BlogPost = {
  slug: "streameros-rust-over-electron",
  title:
    "Everyone Said 'Just Use Electron.' I Wrote streamerOS in Rust — Here's What That Bought",
  description:
    "streamerOS runs on the most contested consumer PC there is — game, encoder, OBS, chat. Why a Rust + Tauri core, on-device chat ingestion, and a MessagePack IPC bridge were the product decision, not a preference.",
  keywords: [
    "Rust vs Electron",
    "Tauri desktop app",
    "streaming software architecture",
    "OBS WebSocket automation",
    "high performance desktop apps",
    "Rust production experience",
  ],
  publishedAt: "2026-07-07",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Founder's Log", "Rust", "Products"],
  takeaways: [
    "A streamer's PC runs a game, an encoder, and OBS simultaneously — the governing constraint was being weightless on a machine under siege.",
    "Rust + Tauri delivers a native tokio core at a fraction of Electron's memory, with chat scored on-device and batched MessagePack IPC.",
    "The honest cost: roughly double the development time — paid once by me, versus runtime weight paid by every user on every stream.",
    "The method transfers: price the constraint that governs the product, then spend exactly where it lives.",
  ],
  Body,
};
