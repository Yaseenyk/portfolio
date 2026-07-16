import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { AN_ROADMAP, AN_META, type AnLesson } from "@/lib/anthropic-roadmap";
import RoadmapHub from "@/components/blog/RoadmapHub";
import { personRef, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const url = `${SITE_URL}/anthropic-roadmap/`;

export const metadata: Metadata = {
  title: AN_META.title,
  description: AN_META.tagline,
  keywords: [
    "Anthropic",
    "Claude",
    "Claude developer roadmap",
    "Model Context Protocol",
    "tool use",
    "extended thinking",
    "prompt caching",
    "multi-agent systems",
    "Claude Opus 4.8",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    title: `${AN_META.title} | Yaseen Khatib`,
    description: AN_META.tagline,
    url,
    siteName: "Yaseen Khatib",
  },
  twitter: {
    card: "summary_large_image",
    title: AN_META.title,
    description: AN_META.tagline,
  },
};

export default function AnthropicRoadmapPage() {
  // AEO/SEO: a Course with each published lesson as a syllabus item.
  const liveLessons = AN_ROADMAP.filter(
    (l: AnLesson) => l.status === "published",
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: AN_META.title,
      description: AN_META.tagline,
      url,
      provider: personRef,
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: `PT${AN_META.totalMinutes}M`,
      },
      syllabusSections: liveLessons.map((l) => ({
        "@type": "Syllabus",
        name: `Lesson ${l.step}: ${l.title}`,
        description: l.blurb,
        url: `${SITE_URL}/blog/${l.slug}`,
      })),
    },
    breadcrumbJsonLd([
      { name: "Anthropic & Claude Developer Roadmap", path: "/anthropic-roadmap" },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <RoadmapHub
        meta={AN_META}
        lessons={AN_ROADMAP}
        eyebrow="Anthropic · Claude Developer Roadmap"
        cta={{
          heading: "Shipping Claude into production?",
          body: "This is the roadmap I build agents by — from token physics to autonomous routines. Let's architect yours.",
        }}
      />
    </>
  );
}
