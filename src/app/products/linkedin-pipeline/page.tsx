import type { Metadata } from "next";
import { getProduct, productUrl } from "@/lib/products";
import { personRef, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ProductHero from "@/components/products/ProductHero";
import Section from "@/components/products/Section";
import Prose from "@/components/products/Prose";
import FlowDiagram, { type FlowStep } from "@/components/products/FlowDiagram";
import RepoButton from "@/components/products/RepoButton";
import LinkedInPipelineArt from "@/components/products/art/LinkedInPipelineArt";

const product = getProduct("linkedin-pipeline")!;

export const metadata: Metadata = {
  title: `${product.name} — Autonomous Content Agent`,
  description: product.summary,
  keywords: [
    "GitHub Actions",
    "Python",
    "Gemini API",
    "cron",
    "automation",
    "LinkedIn",
    "content pipeline",
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
  { label: "Cron Trigger", detail: "GitHub Actions fires on schedule: 0 10 * * 2,4 (Tue & Thu, 10:00 UTC)." },
  { label: "Runner Boot", detail: "ubuntu-latest checks out the repo and installs Python dependencies." },
  { label: "Topic Select", detail: "The agent reads the next queued topic and skips anything in published.json." },
  { label: "Gemini Draft", detail: "The Gemini API generates a formatted, on-brand technical post." },
  { label: "Publish", detail: "The post is pushed to LinkedIn; the entry is recorded as published." },
  { label: "State Commit", detail: "published.json is updated and committed back to the repository." },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "GitHub Actions (Linux runner)",
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

export default function LinkedInPipelinePage() {
  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd data={jsonLd} />

      <ProductHero product={product} art={<LinkedInPipelineArt />} />

      <Section label="01 · Executive Summary">
        <div className="max-w-3xl">
          <Prose>
            <p>
              Showing up consistently on LinkedIn is a content problem disguised as a
              discipline problem. Manual posting is the first thing to slip during a
              busy sprint, and SaaS schedulers charge a subscription to do something a
              cron job can do for free — while holding your account credentials on
              their servers.
            </p>
            <p>
              The <strong>Automated LinkedIn Pipeline</strong> is a self-hosted agent
              that lives entirely in a GitHub repository. On a schedule, a GitHub
              Actions runner spins up, asks the <strong>Gemini API</strong> to draft a
              technical post, publishes it, and records what it shipped. No server, no
              subscription, and credentials never leave GitHub&apos;s encrypted secrets
              store.
            </p>
            <p>
              <strong>Who it&apos;s for:</strong> developers and technical founders who
              want a reliable, hands-off publishing cadence without paying for — or
              trusting — a third-party scheduler.
            </p>
          </Prose>
        </div>
      </Section>

      <Section label="02 · The Stack">
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-800/40 sm:grid-cols-2">
          {[
            ["Language", "Python — the agent, prompt assembly, and publishing client."],
            ["Runtime / CD", "GitHub Actions — scheduled ubuntu-latest runner, zero infra."],
            ["Model", "Gemini API — drafts each post from a queued topic."],
            ["Scheduling", "cron — 0 10 * * 2,4 (Tuesday & Thursday, 10:00 UTC)."],
            ["State", "published.json — committed back to the repo for idempotency."],
            ["Secrets", "GitHub Actions encrypted secrets — keys injected at runtime only."],
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
            <h4>The cron scheduler: <code>0 10 * * 2,4</code></h4>
            <p>
              The whole pipeline is triggered by a single workflow schedule. The
              five-field expression reads field-by-field as: minute <code>0</code>, hour{" "}
              <code>10</code>, any day-of-month, any month, on days-of-week{" "}
              <code>2,4</code> — Tuesday and Thursday. GitHub evaluates cron in UTC, so
              this is a dependable twice-weekly 10:00 UTC run with a manual{" "}
              <code>workflow_dispatch</code> escape hatch for ad-hoc posts.
            </p>
            <pre>
              <code>{`on:
  schedule:
    - cron: "0 10 * * 2,4"   # Tue & Thu, 10:00 UTC
  workflow_dispatch: {}        # manual run from the Actions tab`}</code>
            </pre>

            <h4>Python + Gemini integration</h4>
            <p>
              The agent selects the next topic, assembles a structured prompt, and calls
              Gemini for a draft constrained to a house style and length. The model call
              is the only network dependency for content generation; everything else is
              local file work on the runner.
            </p>

            <h4>State tracking via <code>published.json</code></h4>
            <p>
              Idempotency is the hard part of any scheduler — a retried or duplicated run
              must never double-post. The agent treats <code>published.json</code> as an
              append-only ledger: before publishing it checks the ledger, and after a
              successful post it appends the entry and commits the file back to the repo.
              Because the state lives <strong>in the repository</strong>, history is
              auditable in <code>git log</code> and there is no external database.
            </p>
            <pre>
              <code>{`published = json.loads(LEDGER.read_text())
topic = next(t for t in topics if t["id"] not in published)

post = gemini.generate(prompt_for(topic))
publish_to_linkedin(post)               # post first...

published[topic["id"]] = {"date": today}  # ...then record
LEDGER.write_text(json.dumps(published, indent=2))`}</code>
            </pre>

            <h4>Secure repository secrets</h4>
            <p>
              The Gemini key and LinkedIn credentials are stored as{" "}
              <strong>GitHub Actions secrets</strong>, injected into the job&apos;s
              environment only at run time and masked in logs. They are never committed,
              never printed, and never reach a third party — the runner is destroyed when
              the job ends.
            </p>
            <pre>
              <code>{`- name: Publish
  env:
    GEMINI_API_KEY: \${{ secrets.GEMINI_API_KEY }}
    LINKEDIN_TOKEN: \${{ secrets.LINKEDIN_TOKEN }}
  run: python scripts/publisher.py`}</code>
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
            The agent, the workflow, and the published.json ledger.
          </p>
        </div>
        <RepoButton href={product.repoUrl} label="Pipeline on GitHub" />
      </div>
    </article>
  );
}
