import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SITE_URL,
  getAllSlugs,
  getPostBySlug,
  formatDate,
} from "@/lib/blog";

interface PageProps {
  params: { slug: string };
}

// Pre-render every post at build time.
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// --- SEO: dynamic <head> metadata -----------------------------------------
export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  const images = post.ogImage ? [{ url: post.ogImage }] : undefined;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author.name }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: "Yaseen Khatib",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.ogImage ? [post.ogImage] : undefined,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { Body } = post;
  const url = `${SITE_URL}/blog/${post.slug}`;

  // --- AEO/SEO: JSON-LD (TechArticle + BreadcrumbList) ---------------------
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: post.title,
      description: post.description,
      abstract: post.takeaways.join(" "),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author.name,
        jobTitle: post.author.role,
        url: SITE_URL,
      },
      publisher: { "@type": "Person", name: post.author.name },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: post.keywords.join(", "),
      articleSection: post.tags[0],
      ...(post.ogImage ? { image: [`${SITE_URL}${post.ogImage}`] } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${SITE_URL}/blog`,
        },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <article className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-2 font-mono text-xs text-zinc-500"
      >
        <Link href="/" className="transition-colors hover:text-cyan">
          Home
        </Link>
        <span className="text-zinc-700">/</span>
        <Link href="/blog" className="transition-colors hover:text-cyan">
          Blog
        </Link>
        <span className="text-zinc-700">/</span>
        <span className="truncate text-zinc-400">{post.title}</span>
      </nav>

      {/* Header */}
      <header>
        <h1 className="text-gradient animate-gradient text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="text-zinc-700">•</span>
          <span>{post.readingMinutes} min read</span>
          <span className="text-zinc-700">•</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-ice shadow-[0_0_6px_1px_rgba(103,232,249,0.7)]" />
            {post.author.name} · {post.author.role}
          </span>
        </div>
      </header>

      {/* AEO: Executive Summary */}
      <aside className="mt-10 rounded-2xl border border-cyan/30 bg-zinc-900/40 p-6 backdrop-blur-md sm:p-8">
        <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-ice shadow-[0_0_6px_1px_rgba(103,232,249,0.7)]" />
          [ EXECUTIVE TEARDOWN // TL;DR ]
        </div>
        <ul className="space-y-3">
          {post.takeaways.map((point) => (
            <li key={point} className="flex gap-3 text-zinc-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ice" />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Body */}
      <div
        className="prose prose-invert mt-12 max-w-none
          prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight
          prose-h2:mt-16 prose-h2:text-cyan prose-h3:mt-10 prose-h3:text-zinc-50
          prose-p:text-zinc-300 prose-p:leading-relaxed
          prose-a:text-ice prose-a:no-underline prose-a:underline-offset-4 hover:prose-a:underline
          prose-strong:text-zinc-100
          prose-blockquote:border-l-4 prose-blockquote:border-cyan prose-blockquote:bg-white/[0.02]
          prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:text-zinc-300
          prose-code:text-ice prose-code:before:content-none prose-code:after:content-none
          prose-li:text-zinc-300 prose-hr:border-zinc-800"
      >
        <Body />
      </div>

      {/* Footer CTA */}
      <div className="mt-16 overflow-hidden rounded-2xl border border-cyan/30 bg-gradient-to-br from-cyan/10 to-purple/10 p-8 text-center backdrop-blur-md sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          Looking to architect a similar system?
        </h2>
        <p className="mt-3 text-zinc-400">Let&apos;s ship it at AI-speed.</p>
        <Link
          href="/#contact"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan px-6 py-3 text-sm font-semibold text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)] transition-shadow duration-300 hover:shadow-[0_0_30px_-2px_rgba(34,211,238,0.7)]"
        >
          Start a conversation →
        </Link>
      </div>
    </article>
  );
}
