import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import Breadcrumb from "@/components/Breadcrumb";
import Experience from "@/components/Experience";

const url = `${SITE_URL}/experience`;

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Yaseen Khatib — Senior Software Developer at Sparity, Full-Stack Developer at MSA Software, and SDE at Manorama Infosolutions.",
  keywords: [
    "Yaseen Khatib experience",
    "Senior Software Developer",
    "Full-Stack AI Engineer",
    "Sparity",
    "MSA Software",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    title: "Experience | Yaseen Khatib",
    description:
      "Senior Software Developer → Full-Stack AI Engineer: roles, impact, and the systems shipped along the way.",
    url,
    siteName: "Yaseen Khatib",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Experience", item: url },
  ],
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Experience" }]} />

      <header className="mt-8">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Experience
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">
          From Full-Stack Developer to Senior Full-Stack AI Engineer — the roles,
          the impact, and the systems shipped along the way.
        </p>
      </header>

      <div className="mt-12">
        <Experience />
      </div>

      <div className="border-t border-zinc-800/70 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          Explore next
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <a href="/work" className="text-cyan transition-colors hover:text-ice">
            See the work →
          </a>
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/Resume.pdf`}
            className="text-cyan transition-colors hover:text-ice"
          >
            Download the resume →
          </a>
          <a
            href="/#contact"
            className="text-cyan transition-colors hover:text-ice"
          >
            Get in touch →
          </a>
        </div>
      </div>
    </div>
  );
}
