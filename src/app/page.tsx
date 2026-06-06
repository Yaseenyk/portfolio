import Hero from "@/components/Hero";
import ArchitecturePipeline from "@/components/ArchitecturePipeline";
import Dashboard from "@/components/Dashboard";
import ContactForm from "@/components/ContactForm";
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
          <ArchitecturePipeline />
          <Dashboard />
          <RecentPosts />
          <ContactForm />
        </main>

        <footer className="border-t border-zinc-800/70 py-10 text-sm text-zinc-500">
          <p>
            © {new Date().getFullYear()} Yaseen Khatib — Architected with Next.js
            &amp; Framer Motion, delivered at AI-speed.
          </p>
        </footer>
      </div>
    </>
  );
}
