import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import type { Author } from "@/lib/blog";

// AI-generated posts live here as raw Markdown (.mdx) with YAML frontmatter.
// They are parsed and compiled to HTML at BUILD time only — this module is
// imported solely by server components / route generators, so `node:fs` never
// reaches the client bundle and everything is compatible with `output: 'export'`.
const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

const DEFAULT_AUTHOR: Author = {
  name: "Yaseen Khatib",
  role: "MERN + AI Architect",
};

export interface MdxMeta {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  author: Author;
  tags: string[];
  takeaways: string[];
  ogImage?: string;
}

function readingTimeFromMarkdown(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function deriveDescription(body: string): string {
  const firstPara = body
    .replace(/^#.*$/gm, "") // drop headings
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p.length > 0);
  if (!firstPara) return "";
  const plain = firstPara.replace(/\s+/g, " ").trim();
  return plain.length > 180 ? `${plain.slice(0, 177)}…` : plain;
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

/** Normalize one parsed .mdx file into typed metadata (no body compilation). */
function toMeta(fileName: string, raw: string): MdxMeta {
  const { data, content } = matter(raw);
  const fallbackSlug = fileName.replace(/\.mdx?$/, "");
  const slug = String(data.slug || fallbackSlug);
  const tags = toStringArray(data.tags);
  const keywords = toStringArray(data.keywords);
  const publishedAt = String(data.date || data.publishedAt || "");

  return {
    slug,
    title: String(data.title || slug),
    description: String(data.description || deriveDescription(content)),
    keywords: keywords.length ? keywords : tags,
    publishedAt,
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    readingMinutes:
      Number(data.readingMinutes) || readingTimeFromMarkdown(content),
    author: data.author
      ? {
          name: String((data.author as Author).name || DEFAULT_AUTHOR.name),
          role: String((data.author as Author).role || DEFAULT_AUTHOR.role),
        }
      : DEFAULT_AUTHOR,
    tags,
    takeaways: toStringArray(data.takeaways),
    ogImage: data.ogImage ? String(data.ogImage) : undefined,
  };
}

/**
 * Scheduled publishing. A post goes live on its `date` (UTC) and not before:
 * posts are written ahead in batches by a Claude Code session, committed, and
 * a daily scheduled deploy (deploy.yml) releases each one on its day. Until
 * then the page is not built, listed, in the sitemap, the feed or llms-full.
 *
 * POSTS_NOW=YYYY-MM-DD overrides "today". `npm run check:schedule` builds as of
 * the last scheduled date to prove every post renders on its day; preview
 * locally with `POSTS_NOW=2099-01-01 npm run dev`.
 */
function liveCutoff(): string {
  return process.env.POSTS_NOW?.slice(0, 10) || new Date().toISOString().slice(0, 10);
}

function isLive(publishedAt: string): boolean {
  return publishedAt.slice(0, 10) <= liveCutoff();
}

function listFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f));
}

/** All MDX post metadata (sync; safe to call from sitemap / index). */
export function getAllMdxMeta(): MdxMeta[] {
  return listFiles()
    .map((file) => toMeta(file, fs.readFileSync(path.join(BLOG_DIR, file), "utf8")))
    .filter((m) => m.publishedAt && isLive(m.publishedAt)) // skip drafts and not-yet-due posts
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getMdxSlugs(): string[] {
  return getAllMdxMeta().map((m) => m.slug);
}

/** Compile a single post's body to sanitized, highlighted HTML (build-time). */
export async function getMdxPostBySlug(
  slug: string
): Promise<{ meta: MdxMeta; html: string } | null> {
  const match = listFiles()
    .map((file) => ({
      file,
      raw: fs.readFileSync(path.join(BLOG_DIR, file), "utf8"),
    }))
    .map(({ file, raw }) => ({ meta: toMeta(file, raw), raw }))
    .find(({ meta }) => meta.slug === slug);

  if (!match || !isLive(match.meta.publishedAt)) return null;

  const { content } = matter(match.raw);
  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return { meta: match.meta, html: String(processed) };
}
