/**
 * Post-build: write redirect stubs for retired URLs into ./out so pruned
 * pages consolidate into their successor instead of 404-ing. Each stub is a
 * tiny HTML page with rel=canonical + meta-refresh to the target.
 *
 * Reads the map from src/lib/redirects.ts (parsed, not imported — this is a
 * plain .mjs run after `next build`). Runs in `npm run build`.
 *
 * Keys and values are either bare slugs (live under /blog/) or absolute
 * paths starting with "/". Two hard guards: a target that does not exist in
 * ./out fails the build (a redirect to nothing is worse than a clean 404),
 * and a source that is a live page is never overwritten.
 */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "out");
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yaseenkhatib.streamerosai.com";

// Parse the "old": "new" pairs out of the TS source (avoids a TS import step).
const src = readFileSync(join(ROOT, "src", "lib", "redirects.ts"), "utf-8");
const pairs = [...src.matchAll(/"(\/?[a-z0-9/-]+)":\s*"(\/?[a-z0-9/-]+)"/g)];

const toPath = (v) => (v.startsWith("/") ? v.replace(/\/$/, "") : `/blog/${v}`);
const toDir = (p) => join(OUT, ...p.split("/").filter(Boolean));

let n = 0;
for (const [, from, to] of pairs) {
  const fromPath = toPath(from);
  const targetPath = toPath(to);
  const target = `${SITE}${targetPath}/`;
  const dir = toDir(fromPath);

  if (!existsSync(join(toDir(targetPath), "index.html"))) {
    throw new Error(`redirect target does not exist in ./out: ${fromPath}/ -> ${targetPath}/`);
  }
  if (existsSync(join(dir, "index.html"))) {
    throw new Error(`redirect source is a live page, refusing to overwrite: ${fromPath}/`);
  }

  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, "index.html"),
    // NOTE: deliberately NO `noindex` here. `noindex` and `rel=canonical` are
    // contradictory instructions — Google honours the noindex, drops the URL,
    // and discards the consolidation signal, so the retired post's accumulated
    // ranking equity is thrown away instead of being merged into its successor.
    // A canonical + meta-refresh alone is the strongest soft-301 available on
    // GitHub Pages, which cannot issue a real 301.
    `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Moved</title>
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0; url=${target}">
</head><body>This page moved to <a href="${target}">${target}</a>.</body></html>\n`,
  );
  n += 1;
}
console.log(`redirects: ${n} stubs written`);
