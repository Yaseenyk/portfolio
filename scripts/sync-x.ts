/**
 * Announce newly added blog posts on X (Twitter) as a two-part thread.
 *
 * The X ranking model suppresses posts that carry an external link, so this
 * splits each announcement:
 *   1. HOOK  — a plain-text tweet (title + description + hashtags, NO url),
 *   2. REPLY — a reply to the hook that carries the canonical blog URL.
 * The link still gets clicks, but it rides in the reply where it doesn't drag
 * the hook's reach down.
 *
 * Which posts to announce is supplied via the ADDED_FILES env var by the
 * workflow (only *added* files — X has no upsert, so editing a post must not
 * re-announce it). All four OAuth 1.0a credentials are read from env vars and
 * never logged. Exit code is non-zero if any article fails.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {
  TwitterApi,
  ApiResponseError,
  type TwitterApiReadWrite,
} from "twitter-api-v2";

const SITE_BLOG_BASE = "https://yaseenkhatib.streamerosai.com/blog";
const MAX_TWEET = 280;
const HASHTAG_LIMIT = 3;
const THREAD_PAUSE_MS = 2000; // space out threads to stay clear of rate limits

/** OAuth 1.0a user-context credentials — the set that can *write* tweets. */
const REQUIRED_ENV = [
  "TWITTER_API_KEY",
  "TWITTER_API_SECRET",
  "TWITTER_ACCESS_TOKEN",
  "TWITTER_ACCESS_TOKEN_SECRET",
] as const;

/* ---------------------------------- types --------------------------------- */

interface PostFrontmatter {
  title?: string;
  description?: string;
  slug?: string;
  tags?: string[] | string;
}

interface Announcement {
  file: string;
  title: string;
  hook: string;
  reply: string;
}

/** Hook posted, but the link reply failed — the tweet is live without its URL. */
class DanglingThreadError extends Error {
  constructor(hookId: string, cause: unknown) {
    super(
      `hook posted (id ${hookId}) but the link reply failed: ${describeError(cause)}. ` +
        `Add the link manually or delete the hook and retry.`,
    );
    this.name = "DanglingThreadError";
  }
}

/* ------------------------------ credentials ------------------------------- */

function loadCredentials(): {
  appKey: string;
  appSecret: string;
  accessToken: string;
  accessSecret: string;
} {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]?.trim());
  if (missing.length > 0) {
    throw new Error(`Missing required env var(s): ${missing.join(", ")}`);
  }
  return {
    appKey: process.env.TWITTER_API_KEY!.trim(),
    appSecret: process.env.TWITTER_API_SECRET!.trim(),
    accessToken: process.env.TWITTER_ACCESS_TOKEN!.trim(),
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!.trim(),
  };
}

/* ------------------------------ compose text ------------------------------ */

/** Count code points, not UTF-16 units, so surrogate pairs count as one. */
const glyphs = (s: string): number => [...s].length;

/** Hard-truncate to a code-point budget with an ellipsis. */
function clamp(text: string, budget: number): string {
  if (glyphs(text) <= budget) return text;
  return `${[...text].slice(0, budget - 1).join("").trimEnd()}…`;
}

/** frontmatter tags -> up to N alphanumeric hashtags, de-duped. */
function toHashtags(raw: PostFrontmatter["tags"]): string[] {
  const list = Array.isArray(raw)
    ? raw
    : typeof raw === "string"
      ? raw.split(",")
      : [];
  const tags = list
    .map((tag) => tag.replace(/[^a-zA-Z0-9]/g, ""))
    .filter(Boolean)
    .map((tag) => `#${tag}`);
  return [...new Set(tags)].slice(0, HASHTAG_LIMIT);
}

/**
 * Compose the hook: title, then as much description as fits, then hashtags —
 * all inside the 280-char budget, and with NO URL.
 */
function composeHook(
  title: string,
  description: string,
  hashtags: string[],
): string {
  const tagLine = hashtags.join(" ");
  const tagBudget = tagLine ? glyphs(tagLine) + 2 : 0; // + blank-line separator
  let hook = title.trim();

  const room = MAX_TWEET - glyphs(hook) - tagBudget - 2; // 2 for "\n\n"
  const description_ = description.trim();
  if (description_ && room > 8) {
    hook += `\n\n${clamp(description_, room)}`;
  }
  if (tagLine) hook += `\n\n${tagLine}`;

  return clamp(hook, MAX_TWEET); // final safety net
}

/** The reply carries the link. A t.co URL always weighs 23 chars — safe. */
function composeReply(canonicalUrl: string): string {
  return `Full write-up — code, diagrams and the reasoning:\n${canonicalUrl}`;
}

/* -------------------------------- parsing --------------------------------- */

async function parseAnnouncement(file: string): Promise<Announcement> {
  const { data } = matter(await readFile(file, "utf8"));
  const fm = data as PostFrontmatter;

  const title = fm.title?.trim();
  if (!title) throw new Error("missing `title` in front matter");

  const slug = fm.slug?.trim() || path.basename(file).replace(/\.mdx?$/, "");
  const canonicalUrl = `${SITE_BLOG_BASE}/${slug}/`;

  return {
    file,
    title,
    hook: composeHook(title, fm.description?.trim() ?? "", toHashtags(fm.tags)),
    reply: composeReply(canonicalUrl),
  };
}

/* --------------------------------- posting -------------------------------- */

/** Post the hook, then reply to it with the link. */
async function postThread(
  client: TwitterApiReadWrite,
  announcement: Announcement,
): Promise<void> {
  const hook = await client.v2.tweet(announcement.hook);
  const hookId = hook.data.id;
  console.log(`  hook  → https://x.com/i/web/status/${hookId}`);

  try {
    await client.v2.reply(announcement.reply, hookId);
    console.log(`  reply → link attached`);
  } catch (err) {
    throw new DanglingThreadError(hookId, err);
  }
}

/* ---------------------------- error formatting ---------------------------- */

function describeError(err: unknown): string {
  if (err instanceof ApiResponseError) {
    const parts = [`X API HTTP ${err.code}`];
    if (err.rateLimitError && err.rateLimit) {
      const reset = new Date(err.rateLimit.reset * 1000).toISOString();
      parts.push(`RATE LIMITED — resets at ${reset}`);
    } else if (err.code === 401 || err.code === 403) {
      parts.push("authentication/permission failure — check keys & app write access");
    }
    if (err.data) parts.push(JSON.stringify(err.data));
    return parts.join(" — ");
  }
  return err instanceof Error ? err.message : String(err);
}

/* ---------------------------------- main ---------------------------------- */

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

function filesToSync(): string[] {
  return (process.env.ADDED_FILES ?? "")
    .split(/\s+/)
    .map((f) => f.trim())
    .filter(Boolean);
}

async function main(): Promise<void> {
  let credentials: ReturnType<typeof loadCredentials>;
  try {
    credentials = loadCredentials();
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }

  const files = filesToSync();
  if (files.length === 0) {
    console.log("No newly added posts to announce. Nothing to do.");
    return;
  }

  const client = new TwitterApi(credentials).readWrite;
  const failures: string[] = [];

  for (const file of files) {
    try {
      const announcement = await parseAnnouncement(file);
      console.log(`→ ${announcement.title}`);
      await postThread(client, announcement);
      console.log(`✓ announced (${file})`);
    } catch (err) {
      console.error(`✗ ${file}: ${describeError(err)}`);
      failures.push(file);
    }
    await sleep(THREAD_PAUSE_MS);
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length}/${files.length} article(s) failed.`);
    process.exit(1);
  }
  console.log(`\nAll ${files.length} article(s) announced on X.`);
}

main().catch((err) => {
  console.error("Unexpected failure:", describeError(err));
  process.exit(1);
});
