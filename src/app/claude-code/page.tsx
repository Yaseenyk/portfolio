import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { CC_ROADMAP, CC_META, type CcLesson } from "@/lib/claude-code-roadmap";
import RoadmapHub from "@/components/blog/RoadmapHub";
import { personRef, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const url = `${SITE_URL}/claude-code`;

export const metadata: Metadata = {
  title: CC_META.title,
  description: CC_META.tagline,
  keywords: [
    "Claude Code",
    "token optimization",
    "LLM cost optimization",
    "Claude Code efficiency",
    "context window management",
    "prompt caching",
    "AI coding workflow",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    title: `${CC_META.title} | Yaseen Khatib`,
    description: CC_META.tagline,
    url,
    siteName: "Yaseen Khatib",
  },
  twitter: {
    card: "summary_large_image",
    title: CC_META.title,
    description: CC_META.tagline,
  },
};

export default function ClaudeCodeRoadmapPage() {
  // AEO/SEO: a Course with each published lesson as a syllabus item.
  const liveLessons = CC_ROADMAP.filter(
    (l: CcLesson) => l.status === "published",
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: CC_META.title,
      description: CC_META.tagline,
      url,
      provider: personRef,
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: `PT${CC_META.totalMinutes}M`,
      },
      syllabusSections: liveLessons.map((l) => ({
        "@type": "Syllabus",
        name: `Lesson ${l.step}: ${l.title}`,
        description: l.blurb,
        url: `${SITE_URL}/blog/${l.slug}`,
      })),
    },
    breadcrumbJsonLd([{ name: "Claude Code Roadmap", path: "/claude-code" }]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <RoadmapHub
        meta={CC_META}
        lessons={CC_ROADMAP}
        eyebrow="Claude Code · Efficiency Roadmap"
        cta={{
          heading: "Burning tokens faster than budget?",
          body: "This is the workflow I use to keep Claude Code lean. Let's tune yours.",
        }}
      />
    </>
  );
}
