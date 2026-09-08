/**
 * Export every published post as DEV.to-ready Markdown.
 *
 * Half the blog is `.tsx` — a React component, not Markdown — so the DEV.to
 * sync only ever saw the `.mdx` half and the strongest writing was never
 * cross-posted. The built HTML in ./out is the one representation both halves
 * share, so that is what gets converted.
 *
 * Reads:  out/blog/<slug>/index.html   (run after `npm run build`)
 * Writes: .devto/<slug>.md             (front matter + Markdown, gitignored)
 *
 * Output is shaped exactly like src/content/blog/*.mdx so scripts/sync-dev-to.ts
 * consumes it unchanged.
 */
import { readdir, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import TurndownService from "turndown";

const ROOT = process.cwd();
const BUILD = path.join(ROOT, "out", "blog");
const DEST = path.join(ROOT, ".devto");

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});

// Everything after the article body is navigation, not prose.
turndown.remove(["script", "style", "noscript", "svg", "form", "button"]);

const attr = (html, re) => html.match(re)?.[1]?.trim();
const decode = (s = "") =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x2F;/g, "/");

const SITE = "https://yaseenkhatib.streamerosai.com";

/** Cut the first <tag>...</tag> block out of a string. Not nested on these pages. */
function dropBlock(html, tag) {
  const start = html.indexOf(`<${tag}`);
  if (start === -1) return html;
  const end = html.indexOf(`</${tag}>`, start);
  return end === -1 ? html : html.slice(0, start) + html.slice(end + tag.length + 3);
}

/**
 * The <article> element minus its page chrome. The breadcrumb nav, the title
 * header and the tag links are the site's furniture — on DEV.to the title is
 * rendered from front matter, so keeping them means a duplicate H1 and a row
 * of links to tag pages nobody asked for.
 */
function articleHtml(html) {
  const start = html.indexOf("<article");
  if (start === -1) return null;
  const open = html.indexOf(">", start) + 1;
  const end = html.indexOf("</article>", open);
  if (end === -1) return null;
  return dropBlock(dropBlock(html.slice(open, end), "nav"), "header");
}

/**
 * Point every in-post link at the live site. Left relative they resolve
 * against dev.to and 404 — and the links coming home are the whole reason
 * for cross-posting.
 */
function absolutise(markdown) {
  return markdown.replace(/\]\(\/(?!\/)/g, "](" + SITE + "/");
}

/**
 * Tags are how DEV.to surfaces an article, so they have to be tags DEV.to
 * actually has. The page's keyword meta is a phrase list ("Rust vs Electron"),
 * and taking leading words off it produced tags like "reduce" and "answer" —
 * valid, and read by nobody. Match against tags with real followings first.
 */
const KNOWN_TAGS = [
  "rust", "typescript", "javascript", "react", "nextjs", "node", "python",
  "webdev", "programming", "ai", "machinelearning", "llm", "opensource",
  "performance", "architecture", "devops", "github", "tutorial", "career",
  "productivity", "tauri", "webassembly", "database", "mongodb", "api",
  "security", "testing", "css", "showdev", "beginners", "computerscience",
  "showcase", "automation", "cloud", "docker", "sql", "html", "watercooler",
];

function tagsFrom(html, title) {
  const keywords = decode(attr(html, /<meta name="keywords" content="([^"]*)"/) ?? "");
  const haystack = `${keywords} ${title}`.toLowerCase();
  const picked = [];

  for (const tag of KNOWN_TAGS) {
    if (picked.length === 4) break;
    // Word-ish match so "ai" does not fire on "chain" or "detail".
    if (new RegExp(`(^|[^a-z0-9])${tag}([^a-z0-9]|$)`).test(haystack)) picked.push(tag);
  }

  // Still thin? Fall back to the leading word of each keyword phrase.
  for (const phrase of keywords.split(",")) {
    if (picked.length >= 3) break;
    const word = phrase.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (word && word.length > 2 && !picked.includes(word)) picked.push(word);
  }
  return picked.slice(0, 4);
}

/** Strip the trailing site name so the DEV.to title matches the post's own. */
function titleFrom(html) {
  const og = attr(html, /<meta property="og:title" content="([^"]*)"/);
  const raw = og ?? attr(html, /<title>([^<]*)<\/title>/) ?? "";
  return decode(raw).replace(/\s*[·|—-]\s*Yaseen.*$/, "").trim();
}

async function main() {
  if (!existsSync(BUILD)) {
    throw new Error("out/blog not found — run `npm run build` first");
  }
  await rm(DEST, { recursive: true, force: true });
  await mkdir(DEST, { recursive: true });

  const slugs = (await readdir(BUILD, { withFileTypes: true }))
    .filter((e) => e.isDirectory() && e.name !== "tag")
    .map((e) => e.name)
    .sort();

  let written = 0;
  const skipped = [];
  for (const slug of slugs) {
    const file = path.join(BUILD, slug, "index.html");
    if (!existsSync(file)) continue;
    const html = await readFile(file, "utf8");

    // Retired slugs are meta-refresh stubs, not posts.
    if (html.includes('http-equiv="refresh"')) continue;

    const body = articleHtml(html);
    const title = titleFrom(html);
    if (!body || !title) {
      skipped.push(`${slug} (no ${body ? "title" : "article"})`);
      continue;
    }

    const markdown = absolutise(turndown.turndown(body).trim());
    if (markdown.length < 400) {
      skipped.push(`${slug} (body too short: ${markdown.length} chars)`);
      continue;
    }

    const description = decode(
      attr(html, /<meta name="description" content="([^"]*)"/) ?? "",
    );
    const tags = tagsFrom(html, title);

    const frontMatter = [
      "---",
      `title: ${JSON.stringify(title)}`,
      `slug: ${JSON.stringify(slug)}`,
      ...(description ? [`description: ${JSON.stringify(description)}`] : []),
      ...(tags.length ? [`tags: ${JSON.stringify(tags)}`] : []),
      "---",
      "",
    ].join("\n");

    // DEV.to readers land here first; say where it lives and link it home.
    const footer =
      `

---

*Originally published at ` +
      `[yaseenkhatib.streamerosai.com/blog/${slug}/](${SITE}/blog/${slug}/).*
`;

    await writeFile(
      path.join(DEST, `${slug}.md`),
      `${frontMatter}${markdown}${footer}`,
      "utf8",
    );
    written += 1;
  }

  console.log(`devto export: ${written} posts written to .devto/`);
  if (skipped.length) console.log(`devto export: skipped ${skipped.length} — ${skipped.join(", ")}`);
}

await main();
