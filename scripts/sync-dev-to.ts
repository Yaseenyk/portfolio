/**
 * Cross-post newly added blog posts to DEV.to as drafts.
 *
 * Invoked by .github/workflows/dev-to-sync.yml. The list of newly-added
 * Markdown files is supplied through the `ADDED_FILES` env var (space-separated)
 * rather than argv, so untrusted-looking Action outputs are never interpolated
 * into a shell command line.
 *
 * Every post is created with `published: false` — a draft you review before it
 * goes live — and a `canonical_url` pointing back to the original on the
 * personal site, so DEV.to's copy never competes with yours for SEO.
 *
 * Exit code is non-zero if ANY post fails, so the GitHub Action surfaces it.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const DEV_TO_ENDPOINT = "https://dev.to/api/articles";
const SITE_BLOG_BASE = "https://yaseenkhatib.streamerosai.com/blog";

/** Front-matter fields we read. Optional at the type level — a file may omit
 *  them — and validated at runtime before use. */
interface PostFrontmatter {
  title?: string;
  description?: string;
  slug?: string;
  tags?: string[] | string;
}

/** Exact request body DEV.to's `POST /api/articles` expects. */
interface DevToArticlePayload {
  article: {
    title: string;
    body_markdown: string;
    published: boolean;
    canonical_url: string;
    description?: string;
    tags?: string[];
  };
}

/** The subset of the DEV.to response we log. */
interface DevToArticleResponse {
  id: number;
  url: string;
}

/** Carries the offending file so failures are reported with context. */
class SyncError extends Error {
  constructor(
    message: string,
    readonly file: string,
  ) {
    super(message);
    this.name = "SyncError";
  }
}

/** DEV.to tags must be lowercase-alphanumeric, max 4. Sanitize, de-dupe, cap. */
function normalizeTags(raw: PostFrontmatter["tags"]): string[] {
  const list = Array.isArray(raw)
    ? raw
    : typeof raw === "string"
      ? raw.split(",")
      : [];
  const cleaned = list
    .map((tag) => tag.toLowerCase().replace(/[^a-z0-9]/g, ""))
    .filter((tag) => tag.length > 0);
  return [...new Set(cleaned)].slice(0, 4);
}

/** Slug drives the canonical URL. Prefer front matter; fall back to the
 *  filename so a post without an explicit slug still canonicalizes correctly. */
function resolveSlug(fm: PostFrontmatter, file: string): string {
  const explicit = fm.slug?.trim();
  return explicit || path.basename(file).replace(/\.mdx?$/, "");
}

/** Parse one Markdown file into a DEV.to payload, or throw a SyncError. */
async function toPayload(file: string): Promise<DevToArticlePayload> {
  const raw = await readFile(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  const title = fm.title?.trim();
  if (!title) throw new SyncError("missing `title` in front matter", file);

  const body = content.trim();
  if (!body) throw new SyncError("empty Markdown body", file);

  const slug = resolveSlug(fm, file);

  return {
    article: {
      title,
      body_markdown: body,
      published: false, // always a draft — reviewed before going live
      // Trailing slash matches the site's real canonical (trailingSlash: true).
      canonical_url: `${SITE_BLOG_BASE}/${slug}/`,
      ...(fm.description?.trim()
        ? { description: fm.description.trim() }
        : {}),
      tags: normalizeTags(fm.tags),
    },
  };
}

/** POST one payload to DEV.to. Throws a SyncError on any non-2xx response. */
async function createDraft(
  payload: DevToArticlePayload,
  apiKey: string,
  file: string,
): Promise<DevToArticleResponse> {
  const res = await fetch(DEV_TO_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.forem.api-v1+json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) {
    // DEV.to returns `{ error, status }` on failure — surface it verbatim.
    throw new SyncError(
      `DEV.to responded ${res.status}: ${text || res.statusText}`,
      file,
    );
  }
  return JSON.parse(text) as DevToArticleResponse;
}

/** Files come in via env (space- or newline-separated), never argv. */
function filesToSync(): string[] {
  return (process.env.ADDED_FILES ?? "")
    .split(/\s+/)
    .map((f) => f.trim())
    .filter(Boolean);
}

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function main(): Promise<void> {
  const apiKey = process.env.DEV_TO_API_KEY?.trim();
  if (!apiKey) {
    console.error("DEV_TO_API_KEY is not set — aborting.");
    process.exit(1);
  }

  const files = filesToSync();
  if (files.length === 0) {
    console.log("No added Markdown files to sync. Nothing to do.");
    return;
  }

  const failures: SyncError[] = [];

  for (const file of files) {
    try {
      const draft = await createDraft(await toPayload(file), apiKey, file);
      console.log(`✓ ${file} → draft created: ${draft.url}`);
    } catch (err) {
      const failure =
        err instanceof SyncError
          ? err
          : new SyncError((err as Error).message, file);
      failures.push(failure);
      console.error(`✗ ${failure.file}: ${failure.message}`);
    }
    // DEV.to rate-limits article creation; space requests out defensively.
    await sleep(1000);
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length}/${files.length} post(s) failed.`);
    process.exit(1);
  }
  console.log(`\nAll ${files.length} post(s) synced to DEV.to as drafts.`);
}

main().catch((err) => {
  console.error("Unexpected failure:", err);
  process.exit(1);
});
