/**
 * Post-build guard: every URL in the emitted sitemap must correspond to a real
 * file in ./out, and nothing in the sitemap may be noindex'd.
 *
 * Why this exists: serving 404s or noindex'd pages from your own sitemap is a
 * direct trust hit with a crawler that has already decided to be sparing with
 * this host — 72 of these URLs currently sit in GSC's "Discovered – currently
 * not indexed", meaning Google reads the sitemap and declines to spend a crawl.
 * Every entry in it needs to be worth the fetch. The sister repo shipped two
 * sitemap URLs that 404'd in production for a month because nothing checked.
 *
 * Runs last in `npm run build`, after the redirect stubs are written.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "out");
const SITEMAP = join(OUT, "sitemap.xml");

if (!existsSync(SITEMAP)) {
  console.error("verify-sitemap: out/sitemap.xml is missing — did the export run?");
  process.exit(1);
}

const xml = readFileSync(SITEMAP, "utf-8");
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (locs.length === 0) {
  console.error("verify-sitemap: sitemap.xml contains no <loc> entries.");
  process.exit(1);
}

/**
 * Map a public URL to the static file Pages would serve. Handles both export
 * conventions: `about/index.html` (trailingSlash: true) and `about.html`.
 */
function candidatesFor(url) {
  const path = new URL(url).pathname.replace(/^\/|\/$/g, "");
  if (path === "") return [join(OUT, "index.html")];
  return [join(OUT, path, "index.html"), join(OUT, `${path}.html`)];
}

const missing = [];
const noindexed = [];
const redirectStubs = [];

for (const url of locs) {
  const found = candidatesFor(url).find(existsSync);
  if (!found) {
    missing.push(url);
    continue;
  }
  const html = readFileSync(found, "utf-8");
  if (/<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) {
    noindexed.push(url);
  }
  // A retired slug's redirect stub must never appear in the sitemap: it asks
  // Google to crawl a page whose only purpose is to point somewhere else.
  if (/<meta[^>]+http-equiv=["']refresh["']/i.test(html)) {
    redirectStubs.push(url);
  }
}

const problems = missing.length + noindexed.length + redirectStubs.length;
if (problems === 0) {
  console.log(`verify-sitemap: OK — all ${locs.length} sitemap URLs resolve and are indexable.`);
  process.exit(0);
}

if (missing.length > 0) {
  console.error(`\nverify-sitemap: ${missing.length} sitemap URL(s) have no file in ./out:`);
  for (const url of missing) console.error(`  404  ${url}`);
}
if (noindexed.length > 0) {
  console.error(`\nverify-sitemap: ${noindexed.length} sitemap URL(s) are marked noindex:`);
  for (const url of noindexed) console.error(`  noindex  ${url}`);
}
if (redirectStubs.length > 0) {
  console.error(`\nverify-sitemap: ${redirectStubs.length} sitemap URL(s) are redirect stubs:`);
  for (const url of redirectStubs) console.error(`  redirect  ${url}`);
  console.error("  → remove these slugs from the sitemap; they live in src/lib/redirects.ts.");
}
console.error("\nBuild failed. Fix the routes above or drop them from src/app/sitemap.ts.\n");
process.exit(1);
