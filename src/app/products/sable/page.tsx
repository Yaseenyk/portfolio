import type { Metadata } from "next";
import { getProduct, productUrl } from "@/lib/products";
import { personRef, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ProductHero from "@/components/products/ProductHero";
import Section from "@/components/products/Section";
import Prose from "@/components/products/Prose";
import FlowDiagram, { type FlowStep } from "@/components/products/FlowDiagram";
import RepoButton from "@/components/products/RepoButton";
import SableArt from "@/components/products/art/SableArt";

const product = getProduct("sable")!;

export const metadata: Metadata = {
  title: `${product.name} — Local-First AI Financial Agent`,
  description: product.summary,
  keywords: [
    "React Native",
    "Expo",
    "TypeScript",
    "SQLite",
    "OpenAI Function Calling",
    "Local RAG",
    "offline-first",
    "on-device AI",
    "personal finance",
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
  { label: "SMS Received", detail: "A background task wakes when a bank transaction SMS arrives on-device." },
  { label: "Adapter Parse", detail: "A bank-specific adapter sanitizes the raw string into a typed record — regex fragility contained behind a stable interface." },
  { label: "Serialized Write", detail: "A p-queue funnels every write into SQLite one at a time, eliminating write-lock contention." },
  { label: "Local Context", detail: "The AI layer queries on-device SQLite (spend, pacing) — no financial data leaves the phone." },
  { label: "Dry-Run Proposal", detail: "A function call renders a Review & Confirm card. The model proposes an intent; it never writes." },
  { label: "Commit / Briefing", detail: "On confirm, the SQLite mutation runs; a daily cron pushes an AI Morning Briefing to the lock screen." },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "iOS, Android",
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

export default function SablePage() {
  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd data={jsonLd} />

      <ProductHero product={product} art={<SableArt />} />

      <Section label="01 · Executive Summary">
        <div className="max-w-3xl">
          <Prose>
            <p>
              Personal-finance apps ask for the most sensitive data a person owns
              — every transaction, balance, and counterparty — and almost always
              ship it to a cloud backend to do anything intelligent with it. That
              trade is exactly why most people never connect their real accounts.
            </p>
            <p>
              <strong>Sable</strong> inverts it. Every row of financial data lives
              in an on-device <strong>SQLite</strong> store — there is{" "}
              <strong>no cloud backend and no account</strong>. On top of that
              local store sits an <strong>OpenAI function-calling agent</strong>{" "}
              that categorizes spend, tracks peer-to-peer debts, and delivers
              proactive briefings — while a hard UI boundary ensures a
              probabilistic model can never silently mutate the ledger.
            </p>
            <p>
              <strong>Who it&apos;s for:</strong> people who want an AI that
              actually reasons over their finances without surrendering the data
              to anyone — privacy as an architectural guarantee, not a setting.
            </p>
          </Prose>
        </div>
      </Section>

      <Section label="02 · The Stack">
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-800/40 sm:grid-cols-2">
          {[
            ["Framework", "React Native (Expo) — a single TypeScript codebase across iOS and Android."],
            ["System of record", "On-device SQLite — the only source of truth; no cloud database or sync server."],
            ["State", "Zustand — lightweight, selector-based UI state over the local data layer."],
            ["UI / motion", "NativeWind (Tailwind for RN) + React Native Reanimated on the native thread."],
            ["AI", "OpenAI Chat Completions + Function Calling — the model proposes typed intents."],
            ["Retrieval", "A local RAG loop whose corpus is a SQLite query — grounded and fully private."],
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
            <h4>Serialized writes: taming SQLite write-lock contention</h4>
            <p>
              SQLite permits a single writer. When several bank SMS arrive in
              quick succession, concurrent write attempts collide — surfacing as{" "}
              <code>database is locked</code> errors and dropped or partial
              transactions, which is unacceptable for a financial ledger. The fix
              is architectural, not a retry loop: every write is routed through a{" "}
              <strong>p-queue</strong> with bounded concurrency, turning a bursty
              race into a deterministic, ordered stream.
            </p>
            <pre>
              <code>{`// A single-concurrency queue serializes every SQLite write.
import PQueue from "p-queue";

const writeQueue = new PQueue({ concurrency: 1 });

export function enqueueWrite(tx: TransactionRecord) {
  // Bursty SMS become an ordered stream — no write-lock contention.
  return writeQueue.add(() => db.runAsync(INSERT_TX, tx));
}`}</code>
            </pre>

            <h4>Containing regex fragility with the Adapter Pattern</h4>
            <p>
              Bank SMS have no standard — formats differ by bank and transaction
              type and change without notice. A monolithic parser would be
              brittle and fail <em>silently</em>, corrupting the ledger. Instead,
              each format is isolated behind an <strong>adapter</strong> with a
              shared interface: raw, untrusted strings are sanitized and validated
              at the boundary, and an unrecognized message is rejected cleanly
              rather than mis-parsed. Supporting a new bank is an additive change —
              a new adapter, not a rewrite of working code.
            </p>
            <pre>
              <code>{`interface SmsAdapter {
  matches(raw: string): boolean;
  parse(raw: string): TransactionRecord; // throws on malformed input
}

// Open/closed: register a new bank without touching the pipeline.
const ADAPTERS: SmsAdapter[] = [hdfcAdapter, iciciAdapter, sbiAdapter];

export function toTransaction(raw: string): TransactionRecord | null {
  const adapter = ADAPTERS.find((a) => a.matches(raw));
  return adapter ? adapter.parse(sanitize(raw)) : null; // reject, never guess
}`}</code>
            </pre>

            <h4>Function calling with a &quot;dry-run&quot; safety boundary</h4>
            <p>
              The chat agent can manage debts through natural language, but a
              function call is treated as an <strong>intent, not an action</strong>
              . The model never writes to the database directly — its proposed
              call is rendered as a <strong>Review &amp; Confirm card</strong> that
              shows exactly what will change and requires explicit confirmation
              before the SQLite transaction executes. This dry-run → confirm →
              commit flow makes a non-deterministic model safe to point at a real
              ledger.
            </p>
            <pre>
              <code>{`// The model returns a tool call; the UI — not the model — commits.
const call = completion.choices[0].message.tool_calls?.[0];

if (call?.function.name === "record_debt") {
  const intent = RecordDebt.parse(JSON.parse(call.function.arguments));
  showReviewCard(intent, {
    onConfirm: () => enqueueWrite(intent.toTransaction()), // commit
    onCancel: () => {},                                    // no-op, no mutation
  });
}`}</code>
            </pre>

            <h4>Proactive RAG: the Morning Briefing</h4>
            <p>
              A daily background job runs a small <strong>local RAG loop</strong>:
              it queries SQLite for the relevant window (yesterday&apos;s spend,
              month-to-date pacing, upcoming obligations), assembles a compact
              context window, generates a natural-language briefing, and pushes it
              to the lock screen. The retrieval corpus is the user&apos;s own local
              data — the &quot;R&quot; in RAG is a SQLite query — so the entire loop
              stays private and grounded in real numbers.
            </p>
            <pre>
              <code>{`// Retrieval = a local SQLite query. Nothing leaves the device.
const context = {
  yesterday: await db.getAllAsync(SPEND_YESTERDAY),
  pacing: await db.getFirstAsync(MONTH_PACING),
  upcoming: await db.getAllAsync(UPCOMING_OBLIGATIONS),
};

const briefing = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: buildBriefingPrompt(context) }],
});

await pushLockScreenNotification(briefing.choices[0].message.content);`}</code>
            </pre>
          </Prose>
        </div>
      </Section>

      <div className="mt-16 flex flex-col items-start gap-4 rounded-2xl border border-cyan/30 bg-gradient-to-br from-cyan/10 to-purple/10 p-8 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-50">
            Explore the source
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Local-first data layer, the ingestion pipeline, and the AI safety
            boundary.
          </p>
        </div>
        <RepoButton href={product.repoUrl} label="Sable on GitHub" />
      </div>
    </article>
  );
}
