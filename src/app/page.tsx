import Hero from "@/components/Hero";
import ArchitecturePipeline from "@/components/ArchitecturePipeline";
import Dashboard from "@/components/Dashboard";
import ContactForm from "@/components/ContactForm";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      {/* Faint CSS grid background */}
      <GridBackground />
      <Navbar />

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-24">
        <main className="pt-20">
          <Hero />
          <ArchitecturePipeline />
          <Dashboard />
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
