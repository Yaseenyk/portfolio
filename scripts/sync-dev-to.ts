/**
 * Cross-post blog posts to DEV.to with UPSERT semantics.
 *
 * For each changed Markdown file (paths supplied via the ADDED_FILES env var by
 * the workflow), the script:
 *   1. fetches every existing DEV.to article once (paginated GET /articles/me/all),
 *   2. matches the local post to a live article by canonical_url (title fallback),
 *   3. PUTs an update if it already exists, or POSTs a new one if it does not,
 * always with `published: true` so the article goes live immediately.
 *
 * Matching on canonical_url means editing a post (typo fix, tag change) updates
 * the SAME DEV.to article instead of creating a duplicate.
 *
 * The api-key is read from DEV_TO_API_KEY; it is never written to disk or logged.
 * Exit code is non-zero if the article list can't be fetched or any post fails.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const DEV_TO_BASE = "https://dev.to/api";
const SITE_BLOG_BASE = "https://yaseenkhatib.streamerosai.com/blog";
const PER_PAGE = 100;
const MAX_PAGES = 100; // safety stop (~10k articles) — never loop forever
const RATE_LIMIT_PAUSE_MS = 1000; // DEV.to rate-limits article writes

/* ---------------------------------- types --------------------------------- */

interface PostFrontmatter {
  title?: string;
  description?: string;
  slug?: string;
  tags?: string[] | string;
}

/** Exact request body shared by POST /articles and PUT /articles/{id}. */
interface ArticlePayload {
  article: {
    title: string;
    body_markdown: string;
    published: boolean;
    canonical_url: string;
    description?: string;
    tags?: string[];
  };
}

/** Shape returned by the DEV.to article LIST/write endpoints (no body). */
interface DevToArticle {
  id: number;
  title: string;
  url: string;
  canonical_url: string | null;
}

/** A local post, parsed and ready to sync. */
interface LocalPost {
  file: string;
  title: string;
  canonicalUrl: string;
  payload: ArticlePayload;
}

/** Existing articles indexed for O(1) matching. */
interface ArticleIndex {
  byCanonical: Map<string, DevToArticle>;
  byTitle: Map<string, DevToArticle>;
}

/* ------------------------------- error type ------------------------------- */

/**
 * Wraps a non-2xx DEV.to response and parses its `{ error, status }` body so
 * failing Action runs log the actual API reason, not just a status code.
 */
class DevToApiError extends Error {
  readonly status: number;
  constructor(status: number, rawBody: string, context: string) {
    let detail = rawBody;
    try {
      const parsed = JSON.parse(rawBody) as { error?: string };
      if (parsed?.error) detail = parsed.error;
    } catch {
      /* body was not JSON — keep it raw */
    }
    super(`${context} — DEV.to ${status}: ${detail || "(empty body)"}`);
    this.name = "DevToApiError";
    this.status = status;
  }
}

/* ------------------------------ http helpers ------------------------------ */

function authHeaders(apiKey: string): Record<string, string> {
  return {
    Accept: "application/vnd.forem.api-v1+json",
    "api-key": apiKey,
  };
}

function jsonHeaders(apiKey: string): Record<string, string> {
  return { ...authHeaders(apiKey), "Content-Type": "application/json" };
}

/** GET one page of the authenticated user's articles (all statuses). */
async function fetchArticlePage(
  apiKey: string,
  page: number,
): Promise<DevToArticle[]> {
  const url = `${DEV_TO_BASE}/articles/me/all?per_page=${PER_PAGE}&page=${page}`;
  const res = await fetch(url, { headers: authHeaders(apiKey) });
  const text = await res.text();
  if (!res.ok) throw new DevToApiError(res.status, text, `GET ${url}`);
  return JSON.parse(text) as DevToArticle[];
}

/** Fetch EVERY existing article, walking pages until one comes back short. */
async function fetchAllMyArticles(apiKey: string): Promise<DevToArticle[]> {
  const all: DevToArticle[] = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const batch = await fetchArticlePage(apiKey, page);
    all.push(...batch);
    if (batch.length < PER_PAGE) break; // last page reached
  }
  return all;
}

/** POST a brand-new article. */
async function createArticle(
  payload: ArticlePayload,
  apiKey: string,
): Promise<DevToArticle> {
  const res = await fetch(`${DEV_TO_BASE}/articles`, {
    method: "POST",
    headers: jsonHeaders(apiKey),
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) throw new DevToApiError(res.status, text, "POST /articles");
  return JSON.parse(text) as DevToArticle;
}

/** PUT an update to an existing article. */
async function updateArticle(
  id: number,
  payload: ArticlePayload,
  apiKey: string,
): Promise<DevToArticle> {
  const res = await fetch(`${DEV_TO_BASE}/articles/${id}`, {
    method: "PUT",
    headers: jsonHeaders(apiKey),
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) throw new DevToApiError(res.status, text, `PUT /articles/${id}`);
  return JSON.parse(text) as DevToArticle;
}

/**
 * Unpublish an article — DEV.to has no DELETE endpoint, so sending only
 * `published: false` flips it to a draft without touching the body. Used when
 * a post is removed from the repo so it stops being live on DEV.to too.
 */
async function unpublishArticle(id: number, apiKey: string): Promise<void> {
  const res = await fetch(`${DEV_TO_BASE}/articles/${id}`, {
    method: "PUT",
    headers: jsonHeaders(apiKey),
    body: JSON.stringify({ article: { published: false } }),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new DevToApiError(res.status, text, `PUT /articles/${id} (unpublish)`);
  }
}

/* ------------------------------ parsing/logic ----------------------------- */

/** DEV.to tags: lowercase-alphanumeric, max 4, de-duped. */
function normalizeTags(raw: PostFrontmatter["tags"]): string[] {
  const list = Array.isArray(raw)
    ? raw
    : typeof raw === "string"
      ? raw.split(",")
      : [];
  const cleaned = list
    .map((tag) => tag.toLowerCase().replace(/[^a-z0-9]/g, ""))
    .filter(Boolean);
  return [...new Set(cleaned)].slice(0, 4);
}

function resolveSlug(fm: PostFrontmatter, file: string): string {
  return fm.slug?.trim() || path.basename(file).replace(/\.mdx?$/, "");
}

/** Normalize a canonical URL for matching (case- and trailing-slash-insensitive). */
function canonicalKey(url: string | null | undefined): string {
  return (url ?? "").trim().toLowerCase().replace(/\/+$/, "");
}

async function parseLocalPost(file: string): Promise<LocalPost> {
  const { data, content } = matter(await readFile(file, "utf8"));
  const fm = data as PostFrontmatter;

  const title = fm.title?.trim();
  if (!title) throw new Error(`missing \`title\` in front matter`);

  const body = content.trim();
  if (!body) throw new Error(`empty Markdown body`);

  const canonicalUrl = `${SITE_BLOG_BASE}/${resolveSlug(fm, file)}/`;

  return {
    file,
    title,
    canonicalUrl,
    payload: {
      article: {
        title,
        body_markdown: body,
        published: true, // fully automated — goes live on sync
        canonical_url: canonicalUrl,
        ...(fm.description?.trim()
          ? { description: fm.description.trim() }
          : {}),
        tags: normalizeTags(fm.tags),
      },
    },
  };
}

/** Index existing articles by canonical_url (primary) and title (fallback). */
function indexArticles(articles: DevToArticle[]): ArticleIndex {
  const byCanonical = new Map<string, DevToArticle>();
  const byTitle = new Map<string, DevToArticle>();
  for (const article of articles) {
    const key = canonicalKey(article.canonical_url);
    if (key) byCanonical.set(key, article);
    byTitle.set(article.title.trim().toLowerCase(), article);
  }
  return { byCanonical, byTitle };
}

/** Match a local post to an existing article — canonical_url first, then title. */
function findMatch(post: LocalPost, index: ArticleIndex): DevToArticle | undefined {
  return (
    index.byCanonical.get(canonicalKey(post.canonicalUrl)) ??
    index.byTitle.get(post.title.trim().toLowerCase())
  );
}

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Changed files arrive via env (space/newline separated), never argv. */
function filesToSync(): string[] {
  return (process.env.ADDED_FILES ?? "")
    .split(/\s+/)
    .map((f) => f.trim())
    .filter(Boolean);
}

/** Deleted files (via DELETED_FILES) whose DEV.to copy should be unpublished. */
function deletedFiles(): string[] {
  return (process.env.DELETED_FILES ?? "")
    .split(/\s+/)
    .map((f) => f.trim())
    .filter(Boolean);
}

/* ---------------------------------- main ---------------------------------- */

async function main(): Promise<void> {
  const apiKey = process.env.DEV_TO_API_KEY?.trim();
  if (!apiKey) {
    console.error("DEV_TO_API_KEY is not set — aborting.");
    process.exit(1);
  }

  const files = filesToSync();
  const deleted = deletedFiles();
  if (files.length === 0 && deleted.length === 0) {
    console.log("No changed Markdown files to sync. Nothing to do.");
    return;
  }

  // Fetch the existing catalogue ONCE. If this fails we abort rather than
  // blind-create — creating without knowing what exists risks duplicates.
  let index: ArticleIndex;
  try {
    const existing = await fetchAllMyArticles(apiKey);
    console.log(`Fetched ${existing.length} existing DEV.to article(s).`);
    index = indexArticles(existing);
  } catch (err) {
    console.error(
      `Could not fetch existing articles — aborting to avoid duplicates.\n  ${(err as Error).message}`,
    );
    process.exit(1);
    return; // unreachable, but narrows `index` for TS
  }

  const failures: string[] = [];

  for (const file of files) {
    try {
      const post = await parseLocalPost(file);
      const match = findMatch(post, index);
      if (match) {
        const updated = await updateArticle(match.id, post.payload, apiKey);
        console.log(`↻ updated #${match.id}: ${updated.url}  (${file})`);
      } else {
        const created = await createArticle(post.payload, apiKey);
        console.log(`＋ created #${created.id}: ${created.url}  (${file})`);
      }
    } catch (err) {
      console.error(`✗ ${file}: ${(err as Error).message}`);
      failures.push(file);
    }
    await sleep(RATE_LIMIT_PAUSE_MS);
  }

  // Unpublish DEV.to copies of posts removed from the repo. The deleted file is
  // gone, so its slug is derived from the filename (MDX slug == filename).
  for (const file of deleted) {
    try {
      const slug = path.basename(file).replace(/\.mdx?$/, "");
      const match = index.byCanonical.get(
        canonicalKey(`${SITE_BLOG_BASE}/${slug}/`),
      );
      if (!match) {
        console.log(`· ${file}: no live DEV.to article for /${slug}/ — skipping`);
        continue;
      }
      await unpublishArticle(match.id, apiKey);
      console.log(`⊘ unpublished #${match.id}: ${slug} (removed from repo)`);
    } catch (err) {
      console.error(`✗ ${file} (unpublish): ${(err as Error).message}`);
      failures.push(file);
    }
    await sleep(RATE_LIMIT_PAUSE_MS);
  }

  const processed = files.length + deleted.length;
  if (failures.length > 0) {
    console.error(`\n${failures.length}/${processed} operation(s) failed.`);
    process.exit(1);
  }
  console.log(
    `\nDone: ${files.length} upserted, ${deleted.length} unpublished on DEV.to.`,
  );
}

main().catch((err) => {
  console.error("Unexpected failure:", err);
  process.exit(1);
});
