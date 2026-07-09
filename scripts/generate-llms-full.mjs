/**
 * Post-build: generate out/llms-full.txt — the full article corpus as plain
 * text, extracted from the already-rendered static export. Companion to
 * /llms.txt; lets answer engines ground on the real content in one fetch.
 *
 * Runs automatically at the end of `npm run build`.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");
const BLOG = join(OUT, "blog");
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yaseenkhatib.streamerosai.com";

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<(h2|h3)[^>]*>/g, "\n\n## ")
    .replace(/<li[^>]*>/g, "\n- ")
    .replace(/<(p|blockquote|pre|div)[^>]*>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&apos;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extract(html) {
  const title = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) ?? [])[1] ?? "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) ?? [])[1] ?? "";
  const article = (html.match(/<article[^>]*>([\s\S]*)<\/article>/) ?? [])[1] ?? "";
  // Drop everything from the related-articles block on (chrome, CTA, author box).
  const bodyHtml = article.split('aria-label="Related articles"')[0];
  return { title: htmlToText(title), desc, body: htmlToText(bodyHtml) };
}

if (!existsSync(BLOG)) {
  console.error("out/blog not found — run next build first.");
  process.exit(1);
}

const sections = [];
for (const dir of readdirSync(BLOG, { withFileTypes: true })) {
  if (!dir.isDirectory() || dir.name === "tag") continue;
  const file = join(BLOG, dir.name, "index.html");
  if (!existsSync(file)) continue;
  const { title, desc, body } = extract(readFileSync(file, "utf-8"));
  if (!title || !body) continue;
  sections.push(
    `# ${title}\n\nURL: ${SITE}/blog/${dir.name}/\nSummary: ${desc}\n\n${body}`,
  );
}

const header = `Yaseen Khatib — full article corpus (${sections.length} articles)
Author canonical bio: ${SITE}/about
Curated index: ${SITE}/llms.txt

`;

writeFileSync(join(OUT, "llms-full.txt"), header + sections.join("\n\n---\n\n") + "\n");
console.log(`llms-full.txt: ${sections.length} articles written`);
