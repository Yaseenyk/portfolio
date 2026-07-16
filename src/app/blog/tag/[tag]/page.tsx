import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, formatDate } from "@/lib/blog";
import { getTagIndex } from "@/lib/tags";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

interface PageProps {
  params: { tag: string };
}

export function generateStaticParams() {
  return [...getTagIndex().keys()].map((tag) => ({ tag }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = getTagIndex().get(params.tag);
  if (!entry) return {};
  const url = `${SITE_URL}/blog/tag/${params.tag}`;
  const description = `${entry.posts.length} article${entry.posts.length === 1 ? "" : "s"} on ${entry.label} by Yaseen Khatib — production lessons from shipped AI systems.`;
  return {
    title: `${entry.label} — Articles`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${entry.label} — Articles | Yaseen Khatib`,
      description,
      url,
      siteName: "Yaseen Khatib",
    },
  };
}

export default function TagPage({ params }: PageProps) {
  const entry = getTagIndex().get(params.tag);
  if (!entry) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Blog", path: "/blog" },
          { name: entry.label, path: `/blog/tag/${params.tag}` },
        ])}
      />

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
        <span className="text-zinc-400">{entry.label}</span>
      </nav>

      <header>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/blog/tag
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-50">
          #{entry.label}
        </h1>
        <p className="mt-3 text-zinc-400">
          {entry.posts.length} article{entry.posts.length === 1 ? "" : "s"} —
          newest first.
        </p>
      </header>

      <ul className="mt-10 space-y-5">
        {entry.posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group block rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-6 transition-colors hover:border-cyan/50"
            >
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                <span className="h-1 w-1 rounded-full bg-zinc-700" />
                <span>{p.readingMinutes} min read</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold leading-snug text-zinc-100 transition-colors group-hover:text-cyan">
                {p.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                {p.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-sm text-zinc-500">
        <Link
          href="/blog"
          className="text-ice underline-offset-4 hover:underline"
        >
          ← All field notes
        </Link>
      </p>
    </div>
  );
}
