import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import {
  ROADMAP,
  ROADMAP_META,
  type RoadmapLesson,
} from "@/lib/roadmap";
import RoadmapHub from "@/components/blog/RoadmapHub";

const url = `${SITE_URL}/roadmap`;

export const metadata: Metadata = {
  title: ROADMAP_META.title,
  description: ROADMAP_META.tagline,
  keywords: [
    "AI systems architecture",
    "production AI roadmap",
    "RAG architecture",
    "agentic AI",
    "LLM engineering",
    "AI architect masterclass",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    title: `${ROADMAP_META.title} | Yaseen Khatib`,
    description: ROADMAP_META.tagline,
    url,
    siteName: "Yaseen Khatib",
  },
  twitter: {
    card: "summary_large_image",
    title: ROADMAP_META.title,
    description: ROADMAP_META.tagline,
  },
};

export default function RoadmapPage() {
  // AEO/SEO: a Course with each published lesson as a syllabus item.
  const liveLessons = ROADMAP.filter(
    (l: RoadmapLesson) => l.status === "published",
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: ROADMAP_META.title,
      description: ROADMAP_META.tagline,
      url,
      provider: {
        "@type": "Person",
        name: "Yaseen Khatib",
        url: SITE_URL,
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: `PT${ROADMAP_META.totalMinutes}M`,
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
        { "@type": "ListItem", position: 2, name: "Roadmap", item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RoadmapHub />
    </>
  );
}
