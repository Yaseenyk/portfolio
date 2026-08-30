import type { Metadata } from "next";
import Link from "next/link";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

/*
 * No count in this copy, deliberately.
 *
 * It said "thirteen" while the array already held fourteen — a number written in prose
 * beside the list it describes drifts the first time the list changes, and on a site whose
 * thesis is real artifacts over claims, a stale count is the worst kind of small error.
 * Deriving it is not an option here either: PROJECTS lives in a client module, and a
 * server component cannot read into one. So the number lives where it is computed —
 * `all {PROJECTS.length} builds` on the homepage — and nowhere else.
 */
const DESCRIPTION =
  "Everything Yaseen Khatib has built — from a Rust desktop cockpit and a local-first AI " +
  "finance agent to client platforms shipped in a day, campus systems, enterprise portals, " +
  "and autonomous pipelines. Each with its stack, metrics, and links.";

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
              Flagships, client work, campus and enterprise systems, and the
              autonomous pipelines that run this site. Architecture deep-dives
              live in{" "}
              <Link
                href="/products/"
                className="text-ice underline-offset-4 hover:underline"
              >
                /products
              </Link>
              .
            </p>
          </header>

          <Projects all />
        </main>
      </div>
    </>
  );
}
