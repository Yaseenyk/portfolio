import Link from "next/link";
import Hero from "@/components/Hero";
import TerminalAgent from "@/components/widgets/TerminalAgent";
import ArchitecturePipeline from "@/components/ArchitecturePipeline";
import Products from "@/components/Products";
import Dashboard from "@/components/Dashboard";
import ContactForm from "@/components/ContactForm";
import RoadmapSection from "@/components/RoadmapSection";
import RecentPosts from "@/components/RecentPosts";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import { SITE_URL, PERSON } from "@/lib/site";

const author = { "@type": "Person", name: PERSON.name, url: SITE_URL };

// AEO: SoftwareApplication entities for the flagship projects.
const projectsJsonLd = [
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

          <section id="rag-concierge" className="py-16">
            <h2 className="text-2xl font-semibold text-zinc-100">
              RAG Terminal Concierge
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Query my experience through a context-grounded RAG pipeline — live
              execution traces, structured outputs, and no answers outside the
              indexed corpus.
            </p>
            <div className="mt-6 max-w-2xl">
              <TerminalAgent />
            </div>
          </section>

          <ArchitecturePipeline />
          <Products />
          <Dashboard />
          <RoadmapSection />
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
