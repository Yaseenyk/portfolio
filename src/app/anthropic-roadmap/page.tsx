import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { AN_ROADMAP, AN_META, type AnLesson } from "@/lib/anthropic-roadmap";
import RoadmapHub from "@/components/blog/RoadmapHub";

const url = `${SITE_URL}/anthropic-roadmap`;

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
      provider: {
        "@type": "Person",
        name: "Yaseen Khatib",
        url: SITE_URL,
      },
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Anthropic & Claude Developer Roadmap",
          item: url,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
