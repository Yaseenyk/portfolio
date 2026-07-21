import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import Hero from "@/components/Hero";
import FoundersLog from "@/components/FoundersLog";
import { getPostBySlug, FOUNDERS_LOG_SLUGS } from "@/lib/blog";
import TerminalAgent from "@/components/widgets/TerminalAgent";
import Products from "@/components/Products";
import Dashboard from "@/components/Dashboard";
import ContactForm from "@/components/ContactForm";
import RoadmapSection from "@/components/RoadmapSection";
import Testimonials from "@/components/Testimonials";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { PERSON_ID, WEBSITE_ID, personRef } from "@/lib/seo";

const author = personRef;

// AEO: the homepage is the Person's profile — mainEntity points at the
// sitewide Person node by @id instead of redeclaring it.
const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: SITE_URL,
  mainEntity: { "@id": PERSON_ID },
  isPartOf: { "@id": WEBSITE_ID },
};

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

export default function Home() {
  // Server-side mapping to plain props — keeps the blog registry (and every
  // post body) out of the client JS bundle. Top 6 (a full 3×2 card grid);
  // the full list lives at /blog. Covers resolve from public/og/ at build.
  const logEntries = FOUNDERS_LOG_SLUGS.slice(0, 6).flatMap((slug) => {
    const p = getPostBySlug(slug);
    if (!p) return [];
    const cover = path.join(process.cwd(), "public", "og", `${p.slug}.jpg`);
    return [
      {
        slug: p.slug,
        title: p.title,
        description: p.description,
        image: fs.existsSync(cover) ? `/og/${p.slug}.jpg` : undefined,
      },
    ];
  });

  return (
    <>
      <JsonLd data={[profilePageJsonLd, ...projectsJsonLd]} />

      {/* Faint CSS grid background */}
      <GridBackground />
      <Navbar />

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-24">
        <main className="pt-20">
          <Hero />

          {/* Recruiter-first: the vision series headlines read in the first scroll. */}
          <FoundersLog entries={logEntries} />

          <Products />

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

          <Dashboard />
          <RoadmapSection />
          <Testimonials />
          <ContactForm />
        </main>

      </div>
    </>
  );
}
