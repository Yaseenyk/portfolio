import type { Metadata } from "next";
import { getProduct, productUrl } from "@/lib/products";
import { personRef, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ProductHero from "@/components/products/ProductHero";
import Section from "@/components/products/Section";
import Prose from "@/components/products/Prose";
import FlowDiagram, { type FlowStep } from "@/components/products/FlowDiagram";
import RepoButton from "@/components/products/RepoButton";
import StreamerOsArt from "@/components/products/art/StreamerOsArt";

const product = getProduct("streameros")!;

export const metadata: Metadata = {
  title: `${product.name} — Rust Streaming Cockpit`,
  description: product.summary,
  keywords: [
    "Rust",
    "Tauri v2",
    "OBS WebSocket v5",
    "Twitch",
    "YouTube",
    "streaming tools",
    "low memory footprint",
  ],
  alternates: { canonical: productUrl(product.slug) },
  openGraph: {
    type: "website",
    title: `${product.name} | Yaseen Khatib`,
    description: product.summary,
    url: productUrl(product.slug),
    siteName: "Yaseen Khatib",
  },
};

const FLOW: FlowStep[] = [
  { label: "Tauri Core Boot", detail: "Rust process starts, spinning up an async tokio runtime in the desktop shell." },
  { label: "Local Ingestion", detail: "Twitch IRC + YouTube Live chat connect over WebSockets — entirely on-device." },
  { label: "Rust Processing", detail: "Chat velocity & sentiment scored, system telemetry sampled, off the UI thread." },
  { label: "IPC Bridge", detail: "Batched events cross the Tauri boundary to the Next.js webview as MessagePack." },
  { label: "OBS Routing", detail: "Rules fire OBS WebSocket v5 commands to switch scenes and toggle sources." },
  { label: "60fps Render", detail: "The React dashboard paints meters and graphs with transform-only updates." },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Windows, macOS, Linux",
    description: product.summary,
    keywords: product.tech.join(", "),
    author: personRef,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  breadcrumbJsonLd([
    { name: "Products", path: "/products" },
    { name: product.name, path: `/products/${product.slug}` },
  ]),
];

export default function StreamerOsPage() {
  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd data={jsonLd} />

      <ProductHero product={product} art={<StreamerOsArt />} />

      <Section label="01 · Executive Summary">
        <div className="max-w-3xl">
          <Prose>
            <p>
              Most streaming toolkits are heavy. Overlay suites, chat bots, and
              alert services each spawn their own browser engine, idle at double-digit
              CPU, and round-trip your audience&apos;s chat through someone else&apos;s
              cloud — adding latency and quietly exporting data you never agreed to
              share. On a machine that is <strong>already</strong> encoding video,
              that overhead is the difference between a smooth broadcast and dropped
              frames.
            </p>
            <p>
              <strong>streamerOS</strong> is a native desktop cockpit that collapses
              telemetry, multi-platform chat, and scene automation into a single Rust
              binary. It runs everything locally and stays out of the way — a{" "}
              <strong>~152 MB resident / 1.8% idle CPU</strong> footprint — so the GPU
              and encoder keep the headroom that matters.
            </p>
            <p>
              <strong>Who it&apos;s for:</strong> Twitch and YouTube streamers who run
              on the same PC they game on, value privacy, and want OBS to react to chat
              automatically without a fragile stack of plugins and cloud webhooks.
            </p>
          </Prose>
        </div>
      </Section>

      <Section label="02 · The Stack">
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-800/40 sm:grid-cols-2">
          {[
            ["Core language", "Rust — the async runtime, ingestion, parsing, and OBS routing."],
            ["Desktop shell", "Tauri v2 — OS-native WebView (no bundled Chromium) + typed IPC."],
            ["UI", "Next.js (App Router, static export) + React, rendered in the WebView."],
            ["Realtime", "WebSockets — Twitch IRC, YouTube Live chat, and OBS WebSocket v5."],
            ["Concurrency", "tokio tasks, bounded crossbeam channels, zero-copy byte parsing."],
            ["Transport", "MessagePack (rmp-serde) over the Rust ↔ WebView IPC bridge."],
          ].map(([term, desc]) => (
            <div key={term} className="bg-ink/60 p-5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                {term}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section label="03 · System Architecture Flow">
        <FlowDiagram steps={FLOW} />
      </Section>

      <Section label="04 · Deep Technical Breakdown">
        <div className="max-w-3xl">
          <Prose>
            <h4>The 1.8% CPU / 152 MB RAM footprint</h4>
            <p>
              The budget is held by architecture, not micro-tuning. There is{" "}
              <strong>no embedded browser</strong> — Tauri renders the UI in the OS
              WebView, which alone saves the ~150 MB an Electron app spends before it
              does any work. The core is <strong>event-driven</strong>: nothing polls.
              Sockets wake tasks only when bytes arrive, so idle cost approaches zero.
            </p>
            <p>
              Chat parsing is <strong>zero-copy</strong> — messages are sliced out of
              the receive buffer rather than allocated per line — and producers feed
              consumers through <strong>bounded</strong> channels, so a chat flood
              applies backpressure instead of ballooning memory.
            </p>
            <pre>
              <code>{`// Bounded queue: chat floods apply backpressure, not unbounded growth.
let (tx, mut rx) = tokio::sync::mpsc::channel::<ChatEvent>(1024);

tokio::spawn(async move {
    while let Some(ev) = rx.recv().await {
        // score velocity/sentiment without leaving the worker thread
        analyzer.ingest(&ev);
    }
});`}</code>
            </pre>

            <h4>Real-time local Twitch / YouTube chat ingestion</h4>
            <p>
              Each platform connects directly from the user&apos;s machine. The Twitch
              IRC client runs a reconnect state machine with exponential backoff and
              jitter; YouTube Live chat is consumed on its own task. Both normalize into
              one ordered, de-duplicated event stream. Crucially, chat <strong>never
              leaves the device</strong> for a third-party relay — the only network
              peers are Twitch, YouTube, and your local OBS. That is the zero-leakage
              guarantee.
            </p>

            <h4>OBS WebSocket v5 scene routing</h4>
            <p>
              streamerOS speaks OBS WebSocket v5 over a single multiplexed connection:
              it subscribes to the event stream, batches outbound requests, and maps
              automation rules to scene switches and source toggles. A debounced,
              priority-resolved dispatcher prevents a burst of triggers from
              thrashing scenes.
            </p>
            <pre>
              <code>{`// Webview side: receive batched, MessagePack-decoded events from Rust core.
listen<ChatBatch>("chat:batch", ({ payload }) => {
  meters.apply(payload.velocity);      // 60fps, transform-only
  if (payload.hype > THRESHOLD) {
    invoke("obs_set_scene", { scene: "HYPE" }); // -> OBS WebSocket v5
  }
});`}</code>
            </pre>
          </Prose>
        </div>
      </Section>

      <div className="mt-16 flex flex-col items-start gap-4 rounded-2xl border border-cyan/30 bg-gradient-to-br from-cyan/10 to-purple/10 p-8 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-50">
            See it live
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            The app repo is private — explore the public website &amp; landing
            experience.
          </p>
        </div>
        <RepoButton href={product.repoUrl} label="streamerOS website on GitHub" />
      </div>
    </article>
  );
}
