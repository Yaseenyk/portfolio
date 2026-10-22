/**
 * Post-build: the student-projects portal moved to its own site,
 * campus.streamerosai.com (repo Yaseenyk/campus-site). Every old
 * /final-year-projects/* URL gets a redirect stub here so links already
 * shared in WhatsApp groups, by colleges and from search keep working.
 *
 * GitHub Pages cannot send a real 301, so each stub carries rel=canonical to
 * the new URL plus a zero-second meta refresh — the strongest redirect a
 * static host can issue, and the form Google treats as a permanent move.
 *
 * The map (scripts/campus-redirects.json) was generated from both builds and
 * only contains pairs whose target existed on the campus site.
 */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "out");
const CAMPUS = "https://campus.streamerosai.com";

const pairs = JSON.parse(readFileSync(join(ROOT, "scripts", "campus-redirects.json"), "utf-8"));

const stub = (target) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Moved to ${CAMPUS.replace("https://", "")}</title>
<link rel="canonical" href="${target}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${target}">
</head><body><p>This page has moved to <a href="${target}">${target}</a>.</p></body></html>
`;

let n = 0;
for (const [from, to] of pairs) {
  const dir = join(OUT, ...from.split("/").filter(Boolean));
  if (existsSync(join(dir, "index.html"))) {
    throw new Error(`campus redirect source is a live page, refusing to overwrite: ${from}`);
  }
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), stub(`${CAMPUS}${to}`));
  n += 1;
}
console.log(`campus redirects: ${n} stubs pointing at ${CAMPUS}`);
