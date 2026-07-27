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
const CAMPUS = join(OUT, "final-year-projects");
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

/** Campus pages are not <article>-wrapped — take the whole <main> instead. */
function extractMain(html) {
  const title = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) ?? [])[1] ?? "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) ?? [])[1] ?? "";
  const main = (html.match(/<main[^>]*>([\s\S]*)<\/main>/) ?? [])[1] ?? "";
  return { title: htmlToText(title), desc, body: htmlToText(main) };
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

const articleCount = sections.length;

// Final-year-project pages: the catalog, the custom-build brief, and every
// listing. These carry the pricing, session, and payment terms, so grounding
// on them is what lets an answer engine (or the concierge bot) field a student
// question without inventing numbers.
if (existsSync(CAMPUS)) {
  // Listings sit one level down; course pages and guides are nested one deeper
  // ("for/bca", "guides/<slug>") and those sections have an index page too.
  const NESTED = new Set(["for", "guides"]);
  const pages = [{ path: "", label: "final-year-projects" }];
  for (const dir of readdirSync(CAMPUS, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    pages.push({ path: dir.name, label: `final-year-projects/${dir.name}` });
    if (!NESTED.has(dir.name)) continue;
    for (const sub of readdirSync(join(CAMPUS, dir.name), { withFileTypes: true })) {
      if (!sub.isDirectory()) continue;
      pages.push({
        path: join(dir.name, sub.name),
        label: `final-year-projects/${dir.name}/${sub.name}`,
      });
    }
  }
  for (const page of pages) {
    const file = join(CAMPUS, page.path, "index.html");
    if (!existsSync(file)) continue;
    const { title, desc, body } = extractMain(readFileSync(file, "utf-8"));
    if (!title || !body) continue;
    sections.push(
      `# ${title}\n\nURL: ${SITE}/${page.label}/\nSummary: ${desc}\n\n${body}`,
    );
  }
}

const campusCount = sections.length - articleCount;

const header = `Yaseen Khatib — full corpus (${articleCount} articles, ${campusCount} final-year-project pages)
Author canonical bio: ${SITE}/about
Curated index: ${SITE}/llms.txt

`;

writeFileSync(join(OUT, "llms-full.txt"), header + sections.join("\n\n---\n\n") + "\n");
console.log(
  `llms-full.txt: ${articleCount} articles + ${campusCount} campus pages written`,
);
