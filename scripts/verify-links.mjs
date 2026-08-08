/**
 * Post-build guard: no internal link in ./out may point at a page the export
 * doesn't contain.
 *
 * Why this exists: the 2026-08 prune removed 48 posts, and the dead references
 * did not live where you'd guess — three lesson lists rendered by the roadmap
 * hubs, a dozen prose anchors buried inside surviving posts, and two `proof`
 * entries in the solutions data. Nothing in the type system connects a hand-
 * written `href="/blog/…"` string to the post it points at, so the compiler is
 * silent and the breakage only shows up as 404s in Search Console weeks later.
 *
 * Runs in `npm run build`, alongside verify-sitemap.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = join(process.cwd(), "out");

if (!existsSync(OUT)) {
  console.error("verify-links: ./out is missing — did the export run?");
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (entry.endsWith(".html")) acc.push(p);
  }
  return acc;
}

/** Does a root-relative path resolve to something in the export? */
function resolves(href) {
  const clean = href.split("#")[0].split("?")[0].replace(/^\/|\/$/g, "");
  if (clean === "") return true;
  return (
    existsSync(join(OUT, clean, "index.html")) ||
    existsSync(join(OUT, `${clean}.html`)) ||
    existsSync(join(OUT, clean))
  );
}

const pages = walk(OUT);
const broken = new Map();

for (const file of pages) {
  const html = readFileSync(file, "utf-8");
  for (const [, href] of html.matchAll(/href="(\/[^"#][^"]*)"/g)) {
    // Build assets are emitted by the bundler and always present.
    if (href.startsWith("/_next/") || href.startsWith("//")) continue;
    if (resolves(href)) continue;
    if (!broken.has(href)) broken.set(href, new Set());
    broken.get(href).add(relative(OUT, file));
  }
}

if (broken.size === 0) {
  console.log(`verify-links: OK — no dangling internal links across ${pages.length} pages.`);
  process.exit(0);
}

console.error(`\nverify-links: ${broken.size} dangling link target(s) across ${pages.length} pages:\n`);
for (const [href, sources] of [...broken].sort()) {
  const list = [...sources];
  console.error(`  ${href}`);
  console.error(`      linked from: ${list.slice(0, 4).join(", ")}${list.length > 4 ? ` (+${list.length - 4} more)` : ""}`);
}
console.error("\nBuild failed. Point these links somewhere real or remove them.\n");
process.exit(1);
