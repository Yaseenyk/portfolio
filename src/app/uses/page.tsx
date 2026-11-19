import { seoDescription } from "@/lib/seoText";
import type { Metadata } from "next";
import Link from "next/link";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import GradientText from "@/components/GradientText";
import { SITE_URL, PERSON } from "@/lib/site";
import { PERSON_ID, personRef, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

/**
 * /uses, rewritten 19 Nov 2026. Every line is read from the repositories in D:\Streamer OS (package.json files,
 * workflows, git log) on that date. The old version listed hardware and tools that could not be verified and a
 * "10x velocity" claim with no measurement behind it; both were removed. Add a tool here only when a repo shows it.
 */

const DESCRIPTION =
  "The tools Yaseen Khatib actually builds with, read from his own repositories: Claude Code, Next.js static exports, Cloudflare Workers, Rust and Tauri, Playwright and Vitest, GitHub Pages and Actions. Includes how many commits were written with an AI co-author.";

export const metadata: Metadata = {
  title: { absolute: "Uses: the tools behind my sites and apps | Yaseen Khatib" },
  description: seoDescription(DESCRIPTION),
  keywords: ["uses", "developer setup", "Claude Code", "Next.js static export", "Cloudflare Workers", "Tauri", "Playwright", "Vitest"],
  alternates: { canonical: `${SITE_URL}/uses/` },
  openGraph: {
    type: "article",
    title: "Uses: the tools behind my sites and apps",
    description: seoDescription(DESCRIPTION),
    url: `${SITE_URL}/uses/`,
    siteName: "Yaseen Khatib",
  },
};

interface ToolItem {
  name: string;
  desc: string;
}

interface Cluster {
  index: string;
  title: string;
  intro: string;
  items: ToolItem[];
}

const CLUSTERS: Cluster[] = [
  {
    index: "01",
    title: "Writing code",
    intro:
      "I work on Windows 11 in VS Code, with PowerShell and Git Bash as shells. Most of the code is written with an AI agent and reviewed by me before it is pushed.",
    items: [
      {
        name: "Claude Code",
        desc: "The agent I build with, in the terminal and in VS Code. Across the 14 repositories on my machine, 1,132 of 1,455 commits (78%) carry a Claude co-author line, counted from git log on 19 Nov 2026. The streamerOS desktop app is the highest: 197 of 203.",
      },
      {
        name: "A rules file in every repo",
        desc: "Each repository has a CLAUDE.md with the rules that bite in that codebase. This site's file, for example, says never to import the blog registry from a client component (it would ship every post body to the browser) and records that scheduled posts need a person's review before they are committed.",
      },
      {
        name: "Build gates instead of trust",
        desc: "Review misses things, so the builds check them. This site's build fails on a broken internal link, a sitemap problem or any ad code; its schedule check fails on a number in a post that is not in that post's source brief. The exam and solar sites fail to build if a fact loses its official source or its checked date.",
      },
    ],
  },
  {
    index: "02",
    title: "Frontend",
    intro: "One framework for almost every site, so a fix learnt on one applies to the others.",
    items: [
      {
        name: "Next.js 14, App Router, static export",
        desc: "This portfolio, the esports, exam, solar, DefendIt, Sable and FitRank sites, the analytics dashboard and the four tool sites are all Next.js 14 exported to static HTML. No server to keep alive, and every page is plain HTML a crawler can read. The streamerOS site is the exception, on Next.js 16 with React 19.",
      },
      {
        name: "TypeScript, strict",
        desc: "Strict mode everywhere. The tool-site monorepo goes further, with unchecked index access and unused code as errors and any banned.",
      },
      {
        name: "Tailwind CSS",
        desc: "Styling on every site. Design tokens live in the Tailwind config so a colour is named once.",
      },
      {
        name: "Framer Motion",
        desc: "Animation on this site only where it helps, and never on the first heading, which must be visible at first paint.",
      },
    ],
  },
  {
    index: "03",
    title: "Backends, apps and data",
    intro: "Chosen per product, not by habit. Each is linked to the product that uses it.",
    items: [
      {
        name: "Cloudflare Workers, D1, KV and Vectorize",
        desc: "The esports API is a Hono app on Workers with a D1 database, on the free plan. This site's AI concierge and MCP server run on a Worker with Vectorize and Workers AI. The analytics dashboard keeps its saved Google reports in KV.",
      },
      {
        name: "Rust and Tauri 2",
        desc: "The streamerOS desktop app, which reads stream chat on the streamer's own PC and drives OBS over its WebSocket.",
      },
      {
        name: "Vue 3, Capacitor, NestJS and PostgreSQL",
        desc: "SpotAI, the gym app, with MediaPipe running the squat coach on the phone camera.",
      },
      {
        name: "Python, FastAPI and PyTorch",
        desc: "FitRank's ranking model and its API, with PostgreSQL and pgvector.",
      },
      {
        name: "React Native (Expo) and SQLite",
        desc: "Sable, the Android expense tracker that keeps its records on the phone.",
      },
    ],
  },
  {
    index: "04",
    title: "Testing",
    intro: "The counts below are the ones published on each product page, checked against the repos on 14 Nov 2026.",
    items: [
      { name: "Playwright", desc: "About 640 browser tests on desktop and phone sizes for Esports Hub, with axe-core accessibility checks." },
      { name: "Vitest", desc: "284 unit tests across the four tool sites and their shared package, including the US paycheck calculator against the tax authority's printed figures." },
      { name: "Rust tests", desc: "306 tests in the streamerOS app." },
    ],
  },
  {
    index: "05",
    title: "Hosting and automation",
    intro: "Free tiers, on purpose, so a site that earns nothing yet costs nothing to keep online.",
    items: [
      { name: "GitHub Pages", desc: "Hosts every static site on its own custom domain. DNS is on GoDaddy; Cloudflare runs only the Workers." },
      { name: "GitHub Actions", desc: "Deploys on every push. This site also rebuilds daily at 00:17 UTC to release posts whose date has come, and the exam site rebuilds daily at 00:20 UTC so passed dates drop off." },
      { name: "IndexNow", desc: "Pinged after deploys so search engines that support it hear about new and changed pages." },
      { name: "Python and Pillow", desc: "Draws each blog post's cover image from its title in one fixed style, with no image API." },
    ],
  },
];

const RETIRED: ToolItem[] = [
  {
    name: "An AI blog writer in GitHub Actions",
    desc: "It called the Claude API on a schedule and pushed posts. It failed on 26 Oct and again on 2 Nov 2026, and I removed it. Posts are now written ahead in a working session, with every number backed by a source in a brief, and a person reviews each batch before it is scheduled.",
  },
];

const usesJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Uses: the tools behind my sites and apps",
  description: seoDescription(DESCRIPTION),
  datePublished: "2026-06-06",
  dateModified: "2026-11-19",
  author: { "@id": PERSON_ID, name: PERSON.name },
  publisher: personRef,
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/uses/` },
  about: "The software, hosting and testing tools used across Yaseen Khatib's repositories",
  mentions: CLUSTERS.flatMap((c) => c.items.map((i) => ({ "@type": "SoftwareApplication", name: i.name, description: seoDescription(i.desc) }))),
};

function ToolList({ items }: { items: ToolItem[] }) {
  return (
    <dl className="mt-4">
      {items.map((item) => (
        <div key={item.name} className="flex flex-col gap-2 border-b border-zinc-800/50 py-4 md:flex-row md:items-baseline">
          <dt className="font-medium text-zinc-100 md:w-1/3 md:shrink-0">{item.name}</dt>
          <dd className="text-[15px] leading-relaxed text-zinc-400">{item.desc}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function UsesPage() {
  return (
    <>
      <JsonLd data={[usesJsonLd, breadcrumbJsonLd([{ name: "Uses", path: "/uses" }])]} />

      <GridBackground />
      <Navbar />

      <main className="pt-28">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <header>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">~/uses</span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
              What I <GradientText>build with</GradientText>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-300">
              Read from my own repositories on 19 November 2026, not a wish list. If a tool is here, a repository shows
              it in use. Hardware is left out: a list of gear says nothing about the work.
            </p>
            <p className="mt-3 text-sm text-zinc-500">Updated 19 November 2026.</p>
          </header>

          {CLUSTERS.map((cluster) => (
            <section key={cluster.index} className="mt-14 border-t border-white/10 pt-8">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-50">
                <span className="mr-3 font-mono text-sm text-cyan">{cluster.index}</span>
                {cluster.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-300">{cluster.intro}</p>
              <ToolList items={cluster.items} />
            </section>
          ))}

          <section className="mt-14 border-t border-white/10 pt-8">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-50">What I stopped using</h2>
            <ToolList items={RETIRED} />
          </section>

          <p className="mt-12 text-[15px] leading-relaxed text-zinc-400">
            Each product named here has its own page with what it does and what it does not do yet: see{" "}
            <Link href="/projects/" className="text-cyan underline-offset-4 hover:underline">all projects</Link>.
          </p>
        </div>
      </main>
    </>
  );
}
