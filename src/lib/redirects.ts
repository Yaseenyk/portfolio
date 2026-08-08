/**
 * Retired blog slugs → their strongest surviving equivalent. Pruned posts
 * redirect here (meta-refresh + rel=canonical stub written into the static
 * export by scripts/generate-redirects.mjs) so link equity consolidates
 * instead of 404-ing. Keys and values are bare slugs under /blog/.
 *
 * Deliberately empty as of the 2026-08 prune.
 *
 * This map previously held 10 entries. Every one of their *targets* was itself
 * a commodity explainer that the prune removed, so keeping them would have
 * pointed ten redirect stubs at ten deleted pages — strictly worse than a clean
 * 404, because it spends crawl budget to arrive at nothing.
 *
 * The retired slugs are intentionally left to 404. There is no surviving post
 * on a comparable topic to consolidate them into, and redirecting to a loosely
 * related page (or to /blog) is a soft-404 pattern Google discounts anyway.
 *
 * Keep the mechanism: it is the right tool when a post is genuinely superseded
 * by a specific successor. Add an entry only when that successor actually
 * exists — scripts/verify-sitemap.mjs will fail the build if a stub URL ends up
 * in the sitemap.
 */
export const BLOG_REDIRECTS: Record<string, string> = {};
