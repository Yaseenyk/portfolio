import { seoDescription } from "@/lib/seoText";
import type { Metadata } from "next";
import { getProduct, productUrl } from "@/lib/products";
import { personRef, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ProductHero from "@/components/products/ProductHero";
import Section from "@/components/products/Section";
import Prose from "@/components/products/Prose";
import FlowDiagram, { type FlowStep } from "@/components/products/FlowDiagram";
import RepoButton from "@/components/products/RepoButton";
import { ExternalLinkIcon } from "@/components/Icons";
import AnalyticsDashboardArt from "@/components/products/art/AnalyticsDashboardArt";

const product = getProduct("analytics-dashboard")!;

export const metadata: Metadata = {
  title: `${product.name}`,
  description: seoDescription(product.summary),
  keywords: [
    "GA4 Data API",
    "Search Console API",
    "GitHub Actions",
    "Cloudflare Workers",
    "first-touch attribution",
    "UTM",
    "AI search referrals",
  ],
  alternates: { canonical: productUrl(product.slug) },
  openGraph: {
    type: "website",
    title: `${product.name} | Yaseen Khatib`,
    description: seoDescription(product.summary),
    url: productUrl(product.slug),
    siteName: "Yaseen Khatib",
  },
};

const FLOW: FlowStep[] = [
  { label: "Tag on every page", detail: "A plain Google tag in the head of all five sites sends page views and tagged clicks and leads to one GA4 property." },
  { label: "GitHub Action", detail: "Every two hours a Node script signs in with a read-only service account and pulls GA4 and Search Console for six date ranges." },
  { label: "Static JSON files", detail: "Each range becomes its own small file (ga-28d.json, gsc-28d.json, live.json), published to GitHub Pages with the page." },
  { label: "Page opens", detail: "The browser draws the published copy straight away and loads only the date range you picked." },
  { label: "Live Worker", detail: "A free Cloudflare Worker answers the same files fresh from Google, cached for 45 seconds to 15 minutes." },
  { label: "Block by block", detail: "Each card reads one data file and redraws only when its own numbers change. If the Worker is down, the published copy stays." },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: seoDescription(product.summary),
    keywords: product.tech.join(", "),
    url: product.liveUrl,
    author: personRef,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  breadcrumbJsonLd([
    { name: "Products", path: "/products" },
    { name: product.name, path: `/products/${product.slug}` },
  ]),
];

export default function AnalyticsDashboardPage() {
  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd data={jsonLd} />

      <ProductHero product={product} art={<AnalyticsDashboardArt />} />

      <Section label="01 · What I Built">
        <div className="max-w-3xl">
          <Prose>
            <p>
              I run five sites: this portfolio, streamerOS, FitRank, DefendIt and SpotAI. Each has a
              different audience and a different goal, and I could not answer the plain questions
              about any of them. Who visited, and from where? Did anyone come from ChatGPT or
              LinkedIn? Which button turned into a lead? What do people type into Google before they
              land on us?
            </p>
            <p>
              Google Analytics and Search Console can answer all of it, but in two products, one site
              at a time. So I built a single page that reads both for all five sites, shows the answer
              in plain words, and works on a phone. Along with it came the tracking that makes the
              numbers worth reading: tagged events, first-touch attribution on every lead, and a
              UTM link builder.
            </p>
            <p>
              <strong>Who it is for:</strong> anyone who runs several small sites and wants one honest
              view of them, without a paid analytics tool and without a server to look after.
            </p>
          </Prose>
        </div>
      </Section>

      <Section label="02 · What It Does">
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            ["Tracking", "One GA4 property with five streams. Eight key events (WhatsApp, email, phone, app download, template download, lead, calculator, agreement) and seven custom fields, created through the Admin API."],
            ["First-touch attribution", "Every lead carries where that person first arrived from: source, medium and campaign. Old ?ref= tags become real campaigns."],
            ["Sources in plain words", "Visits grouped into search engines, social, AI assistants (ChatGPT, Perplexity, Claude, Gemini), communities, email and direct, with the exact pages that linked."],
            ["Search Console", "Queries, pages, countries and devices with clicks, impressions, CTR and position, plus a Google-style chart and compare-to-previous-period."],
            ["Date ranges", "Seven days to sixteen months, each loaded only when you open it. Tables sort and filter; on a phone they become cards."],
            ["Live now", "Visitors in the last 30 minutes, by site, page and country."],
          ].map(([term, desc]) => (
            <div key={term} className="rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-5 backdrop-blur-md">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                {term}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section label="03 · The Stack">
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            ["Data sources", "GA4 Data and Admin APIs, and the Search Console API, through a read-only Google service account."],
            ["Build", "A GitHub Actions workflow runs a dependency-free Node script every two hours, then builds the Next.js app and deploys it."],
            ["Hosting", "GitHub Pages on analytics.streamerosai.com. Only aggregate numbers are published; the Google key stays in repository secrets."],
            ["Live layer", "One Cloudflare Worker (free plan) that holds the key as a secret, answers only the dashboard's own origin, and caches for 45 seconds to 15 minutes."],
            ["Front end", "Next.js (static export), TypeScript and Tailwind. Every card loads its own data and shows its own skeleton. Charts are SVG drawn at the real width, so text stays readable on phones."],
            ["Cost", "$0 a month at this volume. Everything runs on free tiers."],
          ].map(([term, desc]) => (
            <div key={term} className="rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-5 backdrop-blur-md">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                {term}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section label="04 · How Data Flows">
        <FlowDiagram steps={FLOW} />
      </Section>

      <Section label="05 · Deep Technical Breakdown">
        <div className="max-w-3xl">
          <Prose>
            <h4>First-touch attribution on every event</h4>
            <p>
              GA4 tells you how a <em>session</em> arrived, but a lead often comes on the third visit,
              from a different source than the first. The tag stores the first source, medium and
              campaign in the browser once, then attaches them to every key event. A shared link
              tagged <code>?ref=whatsapp</code> is read as a campaign, so the old tagging habit still
              works.
            </p>
            <pre>
              <code>{`var ft = JSON.parse(localStorage.getItem('ga_ft') || 'null');
if (!ft) {
  ft = { s: utm_source || ref || referrerHost || 'direct',
         m: utm_medium || (ref ? 'share' : referrerHost ? 'referral' : 'none'),
         c: utm_campaign || (ref ? 'ref-tag' : '(not set)') };
  localStorage.setItem('ga_ft', JSON.stringify(ft));
}
window.gaEvent = function (name, p) {
  p = p || {};
  p.first_source = ft.s; p.first_medium = ft.m; p.first_campaign = ft.c;
  gtag('event', name, p);
};`}</code>
            </pre>

            <h4>Two copies of the data, one block at a time</h4>
            <p>
              The Action publishes the data every two hours, so the page can draw something
              immediately from GitHub&apos;s CDN. The Worker then fetches the same files fresh from
              Google. My first version rebuilt the whole page each time a live answer arrived, so
              the Overview redrew five times while loading. I first batched the answers into one
              swap, then rewrote the page in Next.js so the problem cannot come back: every card
              subscribes to just the file it reads, and a live answer that matches what is on screen
              causes no render at all.
            </p>
            <pre>
              <code>{`// one store entry per data file; a card re-renders only when its file changes
export function useGA(range: string) {
  return useSource<GAFile>(\`ga-\${range}.json\`);
}
function applyLive(file: string, j: unknown) {
  const cur = store.get(file);
  if (!cur?.data || sig(cur.data) !== sig(j)) put(file, { data: j, error: false });
}`}</code>
            </pre>

            <h4>Date ranges as separate files</h4>
            <p>
              A sixteen-month report is much bigger than a seven-day one, so each range is its own
              file and a tab loads only the sources it needs. Search Console is a separate file from
              Google Analytics, loaded only on the tabs that use it.
            </p>

            <h4>Grouping sources, including AI assistants</h4>
            <p>
              GA4 reports a visit from ChatGPT as a referral from a domain. A small rule list names
              the source (ChatGPT, Perplexity, Claude, Gemini, LinkedIn, GitHub and so on) and files
              it under search engines, social, AI assistants, communities, email or direct, so the
              answer to &quot;did anyone find us through an AI assistant&quot; is one line.
            </p>
          </Prose>
        </div>
      </Section>

      <Section label="06 · What Broke, and What I Changed">
        <div className="max-w-3xl">
          <Prose>
            <ul>
              <li>
                <strong>The page redrew itself four or five times while loading.</strong> Published
                data, live visitors, live Analytics and live Search Console each rebuilt it. Each card now loads and
                redraws on its own, so a slow answer never touches the others.
              </li>
              <li>
                <strong>Google&apos;s tag checker could not find the tag.</strong> It was injected with
                JavaScript after the page loaded. A plain script tag in the page head fixed it on
                all five sites.
              </li>
              <li>
                <strong>Old links lost their tracking.</strong> Redirect pages from earlier site moves
                dropped <code>?utm_</code> and <code>?ref=</code>. They now pass the query string
                through.
              </li>
              <li>
                <strong>One site had no <code>/sitemap.xml</code>.</strong> SpotAI serves
                <code> sitemap-index.xml</code> only, and my index-status checker assumed the other.
                It now follows sitemap indexes.
              </li>
            </ul>

            <h4>Honest limits</h4>
            <p>
              Google Analytics reports take hours to appear after a tag goes live, and Search Console
              runs about two days behind, so only the &quot;online now&quot; numbers are truly live.
              The dashboard is public and shows aggregate numbers only, with no login. And I tested
              the click events against the live pages, but I have not yet sent a real form on every
              site to see each lead event arrive.
            </p>
          </Prose>
        </div>
      </Section>

      <div className="mt-16 flex flex-col items-start gap-4 rounded-2xl border border-cyan/30 bg-gradient-to-br from-cyan/10 to-purple/10 p-8 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-50">
            See it live
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            The dashboard is running now. The source is public.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={product.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-cyan px-5 py-2.5 text-sm font-semibold text-black transition-shadow duration-300 hover:shadow-[0_0_28px_-6px_rgba(34,211,238,0.6)]"
          >
            <ExternalLinkIcon className="h-[18px] w-[18px]" />
            Open the dashboard
          </a>
          <RepoButton href={product.repoUrl} label="View on GitHub" />
        </div>
      </div>
    </article>
  );
}
