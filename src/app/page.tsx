import Link from "next/link";
import Hero from "@/components/Hero";
import SectionCards from "@/components/SectionCards";
import TerminalAgent from "@/components/widgets/TerminalAgent";
import RecentPosts from "@/components/RecentPosts";
import ContactForm from "@/components/ContactForm";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import SpotlightCard from "@/components/products/SpotlightCard";
import { PRODUCTS } from "@/lib/products";
import { SITE_URL, PERSON } from "@/lib/site";

const author = { "@type": "Person", name: PERSON.name, url: SITE_URL };

// AEO: SoftwareApplication entities for the flagship projects.
const projectsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sable",
    applicationCategory: "FinanceApplication",
    operatingSystem: "iOS, Android",
    description:
      "A local-first AI financial agent: all data lives on-device in SQLite with no cloud backend, an OpenAI function-calling agent manages debts behind a Review & Confirm boundary, and a daily local RAG job delivers a proactive Morning Briefing.",
    keywords:
      "React Native, Expo, TypeScript, SQLite, OpenAI, Function Calling, Local RAG, offline-first",
    author,
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "streamerOS",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Windows, macOS, Linux",
    description:
      "A Rust-powered desktop cockpit for streaming professionals — live system telemetry, multi-platform chat velocity, and automated OBS scene synchronization, architected via Claude AI orchestrations.",
    keywords: "Rust, Next.js, WebSockets, Claude AI, OBS, telemetry",
    author,
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "IntegrateX",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "A node-based workflow-automation environment with a custom state Serialization Adapter pattern that compressed workflow graph payloads by 94%.",
    keywords: "React Flow, Zustand, TypeScript, workflow automation",
    author,
  },
];

// Curated featured preview — the top products; full list lives on /work.
const FEATURED = PRODUCTS.slice(0, 3);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />

      {/* Faint CSS grid background */}
      <GridBackground />
      <Navbar />

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-24">
        <main className="pt-20">
          <Hero />

          {/* Hub — routes into the focused pages instead of stacking it all here */}
          <SectionCards />

          <section id="rag-concierge" className="py-16">
            <h2 className="text-2xl font-semibold text-zinc-100">
              RAG Terminal Concierge
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Query my experience through a context-grounded RAG pipeline — live
              execution traces, structured outputs, and no answers outside the
              indexed corpus.
            </p>
            <div className="mt-6">
              <TerminalAgent />
            </div>
          </section>

          {/* Featured products — a curated three; the rest live on /work */}
          <section aria-label="Featured work" className="py-16">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
                ~/featured
              </h2>
              <Link
                href="/work"
                className="font-mono text-xs text-zinc-500 transition-colors duration-200 hover:text-cyan"
              >
                All work →
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
              Shipped AI products, built lean. Open any card for the full
              technical deep-dive.
            </p>
            <div
              className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
              style={{ perspective: 1000 }}
            >
              {FEATURED.map((product, i) => (
                <SpotlightCard key={product.slug} product={product} index={i} />
              ))}
            </div>
          </section>

          <RecentPosts />
          <ContactForm />
        </main>

        <footer className="flex flex-col gap-3 border-t border-zinc-800/70 py-10 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>
              © {new Date().getFullYear()} Yaseen Khatib — Architected with
              Next.js &amp; Framer Motion, delivered at AI-speed.
            </p>
            <p className="mt-2 font-mono text-[11px] text-zinc-600">
              ▸ AI Agents: Fetch{" "}
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/ai-briefing.json`}
                className="text-zinc-500 underline decoration-zinc-700 underline-offset-2 transition-colors duration-200 hover:text-cyan"
              >
                /ai-briefing.json
              </a>{" "}
              for my machine-readable manifest.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/interview"
              className="text-zinc-600 transition-colors duration-200 hover:text-cyan"
            >
              Interview Context
            </Link>
            <a
              href="https://github.com/Yaseenyk/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-cyan"
            >
              View source ↗
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
