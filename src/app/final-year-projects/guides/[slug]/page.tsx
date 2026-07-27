import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, PERSON } from "@/lib/site";
import { GUIDES, getGuide, guideUrl } from "@/lib/guides";
import { breadcrumbJsonLd, faqPageJsonLd, personRef } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import CampusLeadForm from "@/components/campus/CampusLeadForm";
import StickyActionBar from "@/components/campus/StickyActionBar";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.meta.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};

  const { meta } = guide;
  const url = guideUrl(meta.slug);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      url,
      siteName: "Yaseen Khatib",
      publishedTime: meta.publishedAt,
      authors: [PERSON.name],
    },
  };
}

export default function GuidePage({ params }: Params) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const { meta, Body } = guide;
  const others = GUIDES.filter((g) => g.meta.slug !== meta.slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    url: guideUrl(meta.slug),
    datePublished: meta.publishedAt,
    dateModified: meta.publishedAt,
    author: personRef,
    publisher: personRef,
    mainEntityOfPage: { "@type": "WebPage", "@id": guideUrl(meta.slug) },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "Final year students in India",
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 pb-32 md:pb-12">
      <JsonLd
        data={[
          articleJsonLd,
          ...(meta.faq ? [faqPageJsonLd(meta.faq)] : []),
          breadcrumbJsonLd([
            { name: "Final Year Projects", path: "/final-year-projects" },
            { name: "Guides", path: "/final-year-projects/guides" },
            { name: meta.h1, path: `/final-year-projects/guides/${meta.slug}` },
          ]),
        ]}
      />

      <Link
        href="/final-year-projects/guides"
        className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan"
      >
        ← All guides
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            {meta.category}
          </span>
          <span className="font-mono text-[10px] tabular-nums uppercase tracking-[0.2em] text-zinc-600">
            {meta.readingMinutes} min read
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.12] tracking-tight text-zinc-50 sm:text-[2.75rem]">
          {meta.h1}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-zinc-400">
          {meta.description}
        </p>
      </header>

      <article
        className="prose prose-invert mt-14 max-w-none
          prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-zinc-50
          prose-h2:mt-14 prose-h2:text-2xl
          prose-p:leading-relaxed prose-p:text-zinc-400
          prose-a:text-cyan prose-a:no-underline hover:prose-a:underline
          prose-strong:text-zinc-200
          prose-li:text-zinc-400 prose-li:leading-relaxed
          prose-ol:text-zinc-400 prose-ul:text-zinc-400
          prose-hr:border-white/10"
      >
        <Body />
      </article>

      {meta.faq && (
        <section className="mt-20 border-t border-white/5 pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
            Quick answers
          </h2>
          <dl className="mt-8 space-y-6">
            {meta.faq.map((f) => (
              <div
                key={f.question}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
              >
                <dt className="font-medium text-zinc-100">{f.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {f.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {others.length > 0 && (
        <nav aria-label="More guides" className="mt-20">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
            Read next
          </h2>
          <ul className="mt-5 space-y-3">
            {others.map((g) => (
              <li key={g.meta.slug}>
                <Link
                  href={`/final-year-projects/guides/${g.meta.slug}`}
                  className="group flex items-baseline justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors duration-200 hover:border-cyan/40"
                >
                  <span className="text-sm text-zinc-200">{g.meta.h1}</span>
                  <span className="shrink-0 font-mono text-[10px] tabular-nums text-zinc-600">
                    {g.meta.readingMinutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="mt-16">
        <CampusLeadForm
          heading="Want this built rather than explained?"
          intro="Every project is built for you end to end — code, report, diagrams, deployment — then walked through line by line in daily sessions until you can defend it. Tell me what you need and your deadline."
          messageLabel="What you want built + your deadline"
          messagePlaceholder="What the project should do, any stack your college mandates, and your submission date…"
        />
      </div>

      <StickyActionBar />
    </div>
  );
}
