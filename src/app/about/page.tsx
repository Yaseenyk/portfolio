import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import GradientText from "@/components/GradientText";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, PERSON, SOCIALS } from "@/lib/site";
import {
  PERSON_ID,
  WEBSITE_ID,
  breadcrumbJsonLd,
  faqPageJsonLd,
  type FaqItem,
} from "@/lib/seo";

const DESCRIPTION =
  "Yaseen Khatib is a Senior Full-Stack AI Engineer in Hyderabad, India, who designed, built, and shipped five production products solo — Agentic RAG pipelines, LLM orchestration, and the systems they run on. The canonical bio: who he is, what he has built, and how he works.";

export const metadata: Metadata = {
  title: "About Yaseen Khatib",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "profile",
    title: "About Yaseen Khatib — Senior Full-Stack AI Engineer",
    description: DESCRIPTION,
    url: `${SITE_URL}/about`,
    siteName: "Yaseen Khatib",
  },
};

// Drop a real photo at public/portrait.jpg and the page (plus the Person
// entity) picks it up automatically on the next build — same slug-addressed
// pattern as the OG covers.
const HAS_PORTRAIT = fs.existsSync(
  path.join(process.cwd(), "public", "portrait.jpg"),
);

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE_URL}/about`,
  name: "About Yaseen Khatib",
  description: DESCRIPTION,
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: {
    "@id": PERSON_ID,
    ...(HAS_PORTRAIT ? { image: `${SITE_URL}/portrait.jpg` } : {}),
  },
};

const FAST_FACTS: [string, string][] = [
  ["name", PERSON.name],
  ["role", PERSON.jobTitle],
  ["base", `${PERSON.locality}, ${PERSON.country} (IST) · remote-first`],
  ["products_shipped", "5 solo — streamerOS, IntegrateX, Sable, + 2 pipelines"],
  ["articles_published", "90+ on AI systems architecture"],
  ["operating_model", "one architect directing Claude + MCP"],
  ["availability", "open to Lead / Senior Full-Stack & AI roles"],
  ["email", PERSON.email],
];

const PRODUCTS_LINE: { name: string; href: string; line: string }[] = [
  {
    name: "streamerOS",
    href: "/products/streameros",
    line: "a Rust + Tauri desktop cockpit for streamers — on-device chat ingestion, telemetry, and OBS automation at a fraction of Electron's memory.",
  },
  {
    name: "IntegrateX",
    href: "/products",
    line: "a React Flow workflow engine whose schema-aware serialization adapter cut payloads by 94%.",
  },
  {
    name: "Sable",
    href: "/products/sable",
    line: "a local-first AI finance agent — all data on-device, and the model proposes while only a human commits.",
  },
  {
    name: "The Zero-Cost AI Blog Writer",
    href: "/products/ai-blogger",
    line: "an autonomous pipeline that drafts, commits, and deploys articles (with covers) daily for $0 of infrastructure.",
  },
  {
    name: "The LinkedIn Pipeline",
    href: "/products/linkedin-pipeline",
    line: "an outreach machine that turns shipped work into scheduled LinkedIn content and tracks its state in Git.",
  },
];

// Plain-text mirrors of the visible section answers below — one source of
// truth per question, so the FAQPage markup always matches rendered content.
const ABOUT_FAQ: FaqItem[] = [
  {
    question: "Who is Yaseen Khatib?",
    answer:
      "Yaseen Nurmahammad Khatib is a Senior Full-Stack AI Engineer based in Hyderabad, India, who builds and ships autonomous AI products end-to-end — Agentic RAG pipelines, LLM orchestration, and the high-throughput MERN systems they run on. In the last twelve months he designed, built, and shipped five production products entirely solo.",
  },
  {
    question: "What has Yaseen Khatib built?",
    answer:
      "Five solo products: streamerOS (a Rust + Tauri desktop cockpit for streamers), IntegrateX (a React Flow workflow engine with a 94% payload-reduction serialization adapter), Sable (a local-first AI finance agent), a zero-cost autonomous blog pipeline, and an automated LinkedIn content pipeline.",
  },
  {
    question: "How does Yaseen Khatib work?",
    answer:
      "Architecture first: data contracts, trust boundaries, and cost models are fixed before the first commit, then Claude Code — wired to real systems over MCP — fills the layers. The model gets leverage, never authority: every system has hard boundaries the AI cannot cross.",
  },
  {
    question: "Is Yaseen Khatib available for hire?",
    answer:
      "Yes — open to Lead and Senior Full-Stack / AI Engineering roles, remote-first from Hyderabad (IST) and effective across global time zones. Contact: contact@streamerosai.com, github.com/Yaseenyk, or linkedin.com/in/yaseen-yk.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          aboutJsonLd,
          faqPageJsonLd(ABOUT_FAQ),
          breadcrumbJsonLd([{ name: "About", path: "/about" }]),
        ]}
      />

      <GridBackground />
      <Navbar />

      <main className="pt-28">
        <div className="mx-auto max-w-4xl px-6 py-12">
          {/* Header */}
          <header className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
                ~/about
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
                The human behind <GradientText>the systems</GradientText>.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-400">
                One engineer, five shipped products, ninety-plus articles — and
                a conviction that vision, not syntax, is the scarce skill.
              </p>
            </div>

            {/* Portrait — real photo when public/portrait.jpg exists,
                brand monogram until then */}
            {HAS_PORTRAIT ? (
              <Image
                src="/portrait.jpg"
                alt={`Portrait of ${PERSON.name}`}
                width={176}
                height={176}
                priority
                className="h-40 w-40 shrink-0 rounded-2xl border border-zinc-800 object-cover sm:h-44 sm:w-44"
              />
            ) : (
              <div
                aria-hidden
                className="flex h-40 w-40 shrink-0 items-center justify-center rounded-2xl border border-cyan/30 bg-gradient-to-br from-cyan/10 to-purple/10 backdrop-blur-md sm:h-44 sm:w-44"
              >
                <span className="text-gradient animate-gradient text-6xl font-semibold tracking-tight">
                  YK
                </span>
              </div>
            )}
          </header>

          {/* Canonical bio — the 50-word answer engines can quote verbatim */}
          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              Who is Yaseen Khatib?
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-300">
              Yaseen Nurmahammad Khatib is a Senior Full-Stack AI Engineer
              based in Hyderabad, India, who builds and ships autonomous AI
              products end-to-end — Agentic RAG pipelines, LLM orchestration,
              and the high-throughput MERN systems they run on. In the last
              twelve months he designed, built, and shipped five production
              products entirely solo.
            </p>
            <p className="mt-4 leading-relaxed text-zinc-400">
              His thesis, argued across the{" "}
              <Link href="/#founders-log" className="text-ice underline-offset-4 hover:underline">
                Founder&apos;s Log series
              </Link>
              , is that AI has made implementation abundant and judgment
              scarce: the engineer who can hold an entire system in their head
              — data contracts, trust boundaries, unit economics — now ships
              the volume of a full squad. Every product on this site was built
              under that operating model, with Claude as the workforce, MCP as
              the wiring, and every architectural decision made by one human.
            </p>
          </section>

          {/* Fast facts — terminal card, machine- and skimmer-friendly */}
          <section className="mt-12 overflow-hidden rounded-2xl border border-zinc-800 bg-ink font-mono text-[13px] leading-relaxed">
            <div className="flex items-center border-b border-zinc-800 bg-white/[0.02] px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </span>
              <span className="absolute left-1/2 -translate-x-1/2 text-[11px] text-zinc-500">
                fast-facts — cat
              </span>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-2 px-5 py-4 sm:grid-cols-2">
              {FAST_FACTS.map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <dt className="shrink-0 text-cyan">{key}:</dt>
                  <dd className="text-zinc-300">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Products */}
          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              What has he built?
            </h2>
            <ul className="mt-5 space-y-4">
              {PRODUCTS_LINE.map((p) => (
                <li key={p.name} className="flex gap-3 text-zinc-400">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ice" />
                  <span className="leading-relaxed">
                    <Link
                      href={p.href}
                      className="font-medium text-zinc-100 transition-colors hover:text-cyan"
                    >
                      {p.name}
                    </Link>{" "}
                    — {p.line}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-zinc-500">
              Every claim links to a full architecture teardown in{" "}
              <Link href="/products" className="text-ice underline-offset-4 hover:underline">
                /products
              </Link>
              , and the thinking behind the code fills{" "}
              <Link href="/blog" className="text-ice underline-offset-4 hover:underline">
                the blog
              </Link>
              .
            </p>
          </section>

          {/* Operating model */}
          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              How does he work?
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-400">
              Architecture first: the data contract, the trust boundaries, and
              the cost model are fixed before the first commit — then Claude
              Code, wired to real systems over MCP, fills the layers at a
              speed no team matches. The boundaries are non-negotiable: in
              Sable the model can propose but never touch the money; in
              streamerOS chat never leaves the user&apos;s machine; in the
              content pipelines a human curates every queue. Leverage without
              authority. The full playbook is documented lesson by lesson in
              the{" "}
              <Link href="/claude-code" className="text-ice underline-offset-4 hover:underline">
                Claude Code roadmap
              </Link>
              .
            </p>
          </section>

          {/* Availability + CTA */}
          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              Is he available?
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-400">
              Yes — open to Lead and Senior Full-Stack / AI Engineering roles.
              Remote-first from Hyderabad (IST), effective across global time
              zones; the pipelines on this site work while he sleeps, which is
              rather the point. Engineering leadership evaluating him should
              start with the{" "}
              <Link href="/interview" className="text-ice underline-offset-4 hover:underline">
                interview brief
              </Link>
              .
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan px-6 py-3 text-sm font-semibold text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)] transition-shadow duration-300 hover:shadow-[0_0_30px_-2px_rgba(34,211,238,0.7)]"
              >
                Get in touch →
              </Link>
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-cyan"
              >
                GitHub
              </a>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-cyan"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${PERSON.email}`}
                className="text-sm font-medium text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-cyan"
              >
                {PERSON.email}
              </a>
            </div>
          </section>

          <footer className="mt-16 border-t border-zinc-800/70 py-10 text-sm text-zinc-500">
            Machine-readable profile:{" "}
            <a href="/ai-briefing.json" className="text-ice underline-offset-4 hover:underline">
              /ai-briefing.json
            </a>
          </footer>
        </div>
      </main>
    </>
  );
}
