// Checks every Markdown post before it is due, so a scheduled publish day can never fail.
// Posts live in src/content/blog/*.mdx and go live on their `date` (see src/lib/mdx.ts).
//
//  1. frontmatter, cover image, filename = slug, title and description lengths;
//  2. the house rules the old API writer enforced, now a lint on posts a Claude Code session writes:
//     banned phrases, em dash and question limits, and every number in the prose must come from
//     that slug's brief in scripts/post-briefs.json;
//  3. cadence: at most two posts per ISO week from 2026-11-03 on (flooding cost this site its
//     index in July 2026);
//  4. links to other posts only point at posts that are live by that post's date;
//  5. one build "as of" the last scheduled date renders every post and lists it in the sitemap.
//
// Run with: npm run check:schedule   (CI runs it on every push). SKIP_BUILD=1 lints only.
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import matter from "gray-matter";

const DIR = "src/content/blog";
const SITE = "https://yaseenkhatib.streamerosai.com";
const CADENCE_FROM = "2026-11-03";
const MAX_PER_WEEK = 2;
const BANNED = [
  "delve", "game-changer", "game changer", "in conclusion", "let's dive", "let us dive",
  "in today's fast-paced", "unlock the power", "seamless", "it's not just", "isn't just",
  "not only", "revolutionize", "elevate your",
];
const problems = [];

const briefs = new Map(
  JSON.parse(readFileSync("scripts/post-briefs.json", "utf8")).briefs.map((b) => [b.slug, b]),
);
const numbersIn = (t) =>
  new Set((t.match(/\d[\d,]*(?:\.\d+)?/g) ?? []).map((n) => n.replace(/,/g, "").replace(/\.$/, "")));

const posts = readdirSync(DIR)
  .filter((f) => /\.mdx?$/.test(f))
  .map((file) => {
    const { data, content } = matter(readFileSync(`${DIR}/${file}`, "utf8"));
    const slug = String(data.slug || file.replace(/\.mdx?$/, ""));
    const raw = data.date ?? data.publishedAt ?? "";
    const date = raw instanceof Date ? raw.toISOString().slice(0, 10) : String(raw);
    return { file, slug, date, data, content };
  });

const isoWeek = (iso) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d - yearStart) / 864e5 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
};

const live = new Map(posts.map((p) => [p.slug, p.date]));
const perWeek = new Map();

for (const p of posts) {
  const at = p.file;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date)) {
    problems.push(`${at}: missing or malformed date (YYYY-MM-DD)`);
    continue;
  }
  if (p.file.replace(/\.mdx?$/, "") !== p.slug) problems.push(`${at}: slug "${p.slug}" does not match the file name`);
  if (p.date < CADENCE_FROM) continue; // older posts predate these rules

  const week = isoWeek(p.date);
  perWeek.set(week, [...(perWeek.get(week) ?? []), p.slug]);

  const { title, description } = p.data;
  const tl = String(title ?? "").length;
  const dl = String(description ?? "").length;
  if (!tl || tl > 65) problems.push(`${at}: title missing or over 65 characters (${tl})`);
  if (dl < 110 || dl > 160) problems.push(`${at}: description must be 110 to 160 characters (${dl})`);
  if (!Array.isArray(p.data.tags) || !p.data.tags.length) problems.push(`${at}: no tags`);
  if (!Array.isArray(p.data.keywords) || !p.data.keywords.length) problems.push(`${at}: no keywords`);
  if (!Array.isArray(p.data.takeaways) || p.data.takeaways.length < 3) problems.push(`${at}: needs at least 3 takeaways`);
  if (!existsSync(`public/og/${p.slug}.jpg`))
    problems.push(`${at}: no cover at public/og/${p.slug}.jpg (python scripts/post-cover.py "<title>" ${p.slug})`);

  const prose = p.content.replace(/```[\s\S]*?```/g, "");
  const lowered = `${prose} ${title} ${description}`.toLowerCase();
  for (const b of BANNED) if (lowered.includes(b)) problems.push(`${at}: banned phrase "${b}"`);
  const dashes = (prose.match(/—/g) ?? []).length;
  if (dashes > 3) problems.push(`${at}: ${dashes} em dashes (limit 3)`);
  const questions = (prose.replace(/^#+ .*$/gm, "").match(/\w\?/g) ?? []).length;
  if (questions > 1) problems.push(`${at}: ${questions} questions in the prose (limit 1, headings excluded)`);
  const words = prose.split(/\s+/).filter(Boolean).length;
  if (words < 900) problems.push(`${at}: ${words} words (minimum 900)`);

  const brief = briefs.get(p.slug);
  if (!brief) {
    problems.push(`${at}: no brief "${p.slug}" in scripts/post-briefs.json, so its numbers cannot be checked against sources`);
  } else {
    const allowed = numbersIn(JSON.stringify(brief));
    const checked = `${prose} ${(p.data.takeaways ?? []).join(" ")} ${description}`;
    for (const n of numbersIn(checked)) {
      const small = /^\d+$/.test(n) && Number(n) <= 12;
      const year = /^\d+$/.test(n) && Number(n) >= 2020 && Number(n) <= 2030;
      if (!allowed.has(n) && !small && !year) problems.push(`${at}: number ${n} is not in the "${p.slug}" brief facts`);
    }
  }

  for (const [, target] of p.content.matchAll(/\]\(\/blog\/([a-z0-9-]+)\/?\)/g)) {
    if (target === p.slug) continue;
    const when = live.get(target);
    if (!when) {
      if (!existsSync(`src/content/posts/${target}.tsx`) && !existsSync(`src/content/posts/${target}`))
        problems.push(`${at}: links to /blog/${target}/, which does not exist`);
    } else if (when > p.date) {
      problems.push(`${at} (${p.date}): links to /blog/${target}/, not live until ${when}`);
    }
  }
}
for (const [week, slugs] of perWeek)
  if (slugs.length > MAX_PER_WEEK)
    problems.push(`${week}: ${slugs.length} posts (${slugs.join(", ")}); the limit is ${MAX_PER_WEEK} a week`);

if (problems.length) {
  console.error(`Schedule check failed:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}

const last = posts.map((p) => p.date).sort().at(-1);
const scheduled = posts.filter((p) => p.date >= CADENCE_FROM).length;
console.log(`${posts.length} MDX posts (${scheduled} scheduled from ${CADENCE_FROM}), last date ${last}.`);
if (process.env.SKIP_BUILD) {
  console.log("SKIP_BUILD set: lint only.");
  process.exit(0);
}

console.log(`Building the site as of ${last}...`);
execSync("npx next build", { stdio: "inherit", env: { ...process.env, POSTS_NOW: last } });
const sitemap = readFileSync("out/sitemap.xml", "utf8");
for (const p of posts) {
  if (!existsSync(`out/blog/${p.slug}/index.html`)) problems.push(`${p.file}: page was not built`);
  if (!sitemap.includes(`${SITE}/blog/${p.slug}/`)) problems.push(`${p.file}: missing from the sitemap`);
}
if (problems.length) {
  console.error(`Schedule check failed:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log("OK: every post builds, is in the sitemap, and links only to posts live by its date.");
