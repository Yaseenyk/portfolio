/**
 * Post-build: write redirect stubs for retired blog slugs into ./out so
 * pruned posts consolidate into their successor instead of 404-ing. Each stub
 * is a tiny HTML page with rel=canonical + meta-refresh to the target.
 *
 * Reads the map from src/lib/redirects.ts (parsed, not imported — this is a
 * plain .mjs run after `next build`). Runs in `npm run build`.
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "out");
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yaseenkhatib.streamerosai.com";

// Parse the "old": "new" pairs out of the TS source (avoids a TS import step).
const src = readFileSync(join(ROOT, "src", "lib", "redirects.ts"), "utf-8");
const pairs = [...src.matchAll(/"([a-z0-9-]+)":\s*"([a-z0-9-]+)"/g)];

let n = 0;
for (const [, from, to] of pairs) {
  const target = `${SITE}/blog/${to}/`;
  const dir = join(OUT, "blog", from);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, "index.html"),
    `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Moved</title>
<link rel="canonical" href="${target}">
<meta name="robots" content="noindex,follow">
<meta http-equiv="refresh" content="0; url=${target}">
</head><body>This post moved to <a href="${target}">${target}</a>.</body></html>\n`,
  );
  n += 1;
}
console.log(`redirects: ${n} stubs written`);
