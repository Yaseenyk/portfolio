import { execFileSync } from "node:child_process";

/**
 * Real last-modified date for a route, taken from git.
 *
 * Every static entry in the sitemap used to carry the newest blog post's
 * date, so the whole site claimed to have last changed whenever the blogger
 * last ran — sixteen journey chapters written in September announced
 * themselves as untouched since 3 August. A sitemap that reports no change
 * gives Google no reason to come back.
 *
 * Needs full history: the deploy workflow checks out with fetch-depth 0 for
 * this. On a shallow clone every file resolves to the same commit, which is
 * no worse than the fallback it replaces.
 */
const cache = new Map<string, string>();

export function routeDate(sourcePath: string, fallback: string): string {
  const hit = cache.get(sourcePath);
  if (hit) return hit;
  let date = fallback;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", sourcePath], {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) date = out;
  } catch {
    // No git, or a path git has never seen — the fallback is correct enough.
  }
  cache.set(sourcePath, date);
  return date;
}
