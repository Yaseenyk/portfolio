import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { getProduct, productUrl } from "@/lib/products";
import ProductHero from "@/components/products/ProductHero";
import Section from "@/components/products/Section";
import Prose from "@/components/products/Prose";
import FlowDiagram, { type FlowStep } from "@/components/products/FlowDiagram";
import RepoButton from "@/components/products/RepoButton";
import AiBloggerArt from "@/components/products/art/AiBloggerArt";

const product = getProduct("ai-blogger")!;

export const metadata: Metadata = {
  title: `${product.name} — Git-Triggered Content Pipeline`,
  description: product.summary,
  keywords: [
    "Next.js",
    "static export",
    "google-genai",
    "gemini-2.5-flash",
    "GitHub Actions",
    "GitHub Pages",
    "MDX",
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
  { label: "Cron Trigger", detail: "GitHub Actions fires on schedule: 0 10 * * 1,3 (Mon & Wed, 10:00 UTC)." },
  { label: "Topic Extract", detail: "ai_writer.py reads the top line of scripts/topics.txt." },
  { label: "Model Call", detail: "google-genai calls gemini-2.5-flash for a strict-Markdown article." },
  { label: "File Output", detail: "A frontmatter .mdx is written to src/content/blog/<slug>.mdx." },
  { label: "Commit & Push", detail: "The new post and the popped topic are committed back to main." },
  { label: "CD Deploy", detail: "deploy.yml builds output: export and ships ./out to GitHub Pages." },
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
    author: { "@type": "Person", name: "Yaseen Khatib", url: SITE_URL },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
      { "@type": "ListItem", position: 3, name: product.name, item: productUrl(product.slug) },
    ],
  },
];

export default function AiBloggerPage() {
  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProductHero product={product} art={<AiBloggerArt />} />

      <Section label="01 · Executive Summary">
        <div className="max-w-3xl">
          <Prose>
            <p>
              A blog is only an asset if it stays alive. The friction of writing,
              formatting, and deploying means most developer blogs go stale within
              months. Hosted CMS platforms solve the friction but add a bill, a
              database, and a runtime to maintain.
            </p>
            <p>
              The <strong>Zero-Cost AI Blog Writer</strong> removes both problems. It is
              a pipeline native to <strong>this very repository</strong>: on a schedule,
              an agent drafts a post with Gemini, writes it as Markdown, commits it, and
              GitHub Pages redeploys the static site. There is no server and no
              database — only files in Git — so the running cost is exactly{" "}
              <strong>$0</strong>.
            </p>
            <p>
              <strong>Who it&apos;s for:</strong> engineers who want a continuously
              growing, SEO-ready technical blog without owning any infrastructure or
              touching a CMS.
            </p>
          </Prose>
        </div>
      </Section>

      <Section label="02 · The Stack">
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-800/40 sm:grid-cols-2">
          {[
            ["Framework", "Next.js (App Router) with output: 'export' — pure static HTML."],
            ["Content", "MDX files + gray-matter frontmatter, compiled at build with remark/rehype."],
            ["Agent", "Python + the google-genai SDK calling gemini-2.5-flash."],
            ["Runtime / CD", "GitHub Actions — a scheduled writer job and a deploy job."],
            ["Hosting", "GitHub Pages — free static hosting, no server runtime."],
            ["Queue", "scripts/topics.txt — one topic per line, consumed top-down."],
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
            <h4>Git-driven static file generation lifecycle</h4>
            <p>
              The pipeline has no runtime of its own — its &quot;database&quot; is the
              Git history and its &quot;deploy hook&quot; is a push to{" "}
              <code>main</code>. The writer workflow generates a file and commits it;
              that commit triggers the deploy workflow, which rebuilds the static export
              and publishes it. Every published article is therefore a normal commit you
              can diff, revert, or edit by hand.
            </p>

            <h4>The <code>google-genai</code> SDK with <code>gemini-2.5-flash</code></h4>
            <p>
              Content is generated with Google&apos;s current SDK (the legacy{" "}
              <code>google-generativeai</code> package is end-of-life). The agent
              constructs a client from an API key supplied via environment and requests
              a strict-Markdown article; the script — not the model — owns the{" "}
              <code>slug</code>, <code>date</code>, and reading time, so a malformed
              response can never corrupt the typed build.
            </p>
            <pre>
              <code>{`from google import genai

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
resp = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=build_prompt(topic),
)
article = resp.text`}</code>
            </pre>

            <h4>Automated topic extraction from <code>topics.txt</code></h4>
            <p>
              The backlog is a plain text file — one topic per line. The agent reads the
              top non-empty line, generates from it, then removes exactly that line so
              the next run advances automatically. The queue is human-editable: reorder,
              add, or delete topics with a normal commit.
            </p>
            <pre>
              <code>{`topic = next(l.strip() for l in TOPICS.read_text().splitlines() if l.strip())
# ...generate + write the .mdx...
remaining = [l for l in lines if l.strip() != topic]
TOPICS.write_text("\\n".join(remaining))`}</code>
            </pre>

            <h4>Zero-cost builds via <code>output: &apos;export&apos;</code></h4>
            <p>
              Because Next.js is configured for static export, the entire site compiles
              to plain HTML/CSS/JS in <code>./out</code> with no Node server to host. The
              MDX is parsed and compiled <strong>at build time</strong>, so posts render
              with zero client-side runtime cost. GitHub Actions builds it and GitHub
              Pages serves it — both free tiers — which is what makes the steady-state
              cost genuinely zero.
            </p>
            <pre>
              <code>{`// next.config.mjs
const nextConfig = {
  output: "export",               // static HTML -> ./out
  images: { unoptimized: true },
  trailingSlash: true,
};`}</code>
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
            It&apos;s this site — scripts/ai_writer.py and the Actions workflows.
          </p>
        </div>
        <RepoButton href={product.repoUrl} label="View on GitHub" />
      </div>
    </article>
  );
}
