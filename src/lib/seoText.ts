/**
 * Google shows roughly 60 characters of a title and 160 of a description, and
 * cuts the rest mid-word. An audit on 2026-10-01 found 76 of 127 indexable
 * pages with truncated titles and 105 with over-long descriptions — the campus
 * pages worst, where a 64-character project title picked up " — Final Year
 * Project" and then " | Yaseen Khatib" and arrived at 101.
 *
 * These trim at a word boundary so the snippet ends on a whole thought rather
 * than Google's ellipsis.
 */

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

function trimToWord(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:—-]+$/, "");
}

/**
 * A title that still fits once the root layout appends " | Yaseen Khatib".
 * Pass the suffix the page template adds so the budget accounts for it.
 */
export function seoTitle(title: string, suffix = ""): string {
  const ROOT_SUFFIX = " | Yaseen Khatib".length;
  const budget = TITLE_MAX - ROOT_SUFFIX - suffix.length;
  return trimToWord(title, Math.max(20, budget)) + suffix;
}

/** First sentences of a summary, inside the snippet limit. */
export function seoDescription(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= DESCRIPTION_MAX) return clean;

  // Prefer ending on a sentence if one lands in the last third of the budget.
  const cut = clean.slice(0, DESCRIPTION_MAX);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  if (lastStop > DESCRIPTION_MAX * 0.6) return cut.slice(0, lastStop + 1);

  return trimToWord(clean, DESCRIPTION_MAX - 1) + "…";
}
