import type { Metadata } from "next";
import Link from "next/link";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ProjectsBento from "@/components/ProjectsBento";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

const DESCRIPTION =
  "Everything Yaseen Khatib has built — thirteen projects from a Rust desktop cockpit and a local-first AI finance agent to client platforms shipped in a day, enterprise portals, and autonomous pipelines. Each with its stack, metrics, and links.";

export const metadata: Metadata = {
  title: "Projects",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/projects/` },
  openGraph: {
    type: "website",
    title: "Projects | Yaseen Khatib",
    description: DESCRIPTION,
    url: `${SITE_URL}/projects/`,
    siteName: "Yaseen Khatib",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Projects", path: "/projects" }])}
      />

      <GridBackground />
      <Navbar />

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-24">
        <main className="pt-28 pb-12">
          <header className="mb-4">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
              Everything I&apos;ve built.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
              All thirteen — flagships, client work, enterprise systems, and
              the autonomous pipelines that run this site. Architecture
              deep-dives live in{" "}
              <Link
                href="/products"
                className="text-ice underline-offset-4 hover:underline"
              >
                /products
              </Link>
              . Tap any tile — it opens the live thing, or jumps to its
              full breakdown below.
            </p>
          </header>

          {/* Visual index — bento grid of all builds */}
          <ProjectsBento />

          <div className="mt-24 flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
              ~/details
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
          </div>

          <Projects all />
        </main>
      </div>
    </>
  );
}
