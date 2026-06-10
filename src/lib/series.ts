/**
 * Multi-series registry. The site now hosts more than one masterclass, so the
 * blog-post chrome (progress bar + stepper + Next-lesson nav) can no longer read
 * a single roadmap module. Each series stays the source of truth for its own
 * lessons; this file unifies them behind one resolver keyed by post slug.
 *
 * `RoadmapLesson` here is the structural supertype every series' lesson satisfies
 * (its `module` is a plain string so each series can name its own modules). The
 * stricter per-series unions in `roadmap.ts` / `claude-code-roadmap.ts` remain
 * assignable to it.
 */

import { ROADMAP, ROADMAP_META } from "./roadmap";
import { CC_ROADMAP, CC_META } from "./claude-code-roadmap";
import { AN_ROADMAP, AN_META } from "./anthropic-roadmap";

export type LessonStatus = "published" | "coming-soon";

export interface RoadmapLesson {
  step: number;
  slug: string;
  title: string;
  blurb: string;
  module: string;
  status: LessonStatus;
}

export interface SeriesMeta {
  title: string;
  tagline: string;
  totalMinutes: number;
}

export interface Series {
  /** Hub route, e.g. "/roadmap" or "/claude-code". */
  hubPath: string;
  /** schema.org Course name for JSON-LD membership. */
  courseName: string;
  meta: SeriesMeta;
  lessons: RoadmapLesson[];
}

export const SERIES: Series[] = [
  {
    hubPath: "/roadmap",
    courseName: "The AI Systems Architect Roadmap",
    meta: ROADMAP_META,
    lessons: ROADMAP,
  },
  {
    hubPath: "/claude-code",
    courseName: CC_META.title,
    meta: CC_META,
    lessons: CC_ROADMAP,
  },
  {
    hubPath: "/anthropic-roadmap",
    courseName: AN_META.title,
    meta: AN_META,
    lessons: AN_ROADMAP,
  },
];

export interface LessonContext {
  series: Series;
  lesson: RoadmapLesson;
  /** Nearest previous published lesson in the same series, if any. */
  prev: RoadmapLesson | null;
  /** Nearest next published lesson in the same series, if any. */
  next: RoadmapLesson | null;
  total: number;
}

/** Resolve a post slug to its lesson context across every series (or null). */
export function resolveLesson(slug: string): LessonContext | null {
  for (const series of SERIES) {
    const i = series.lessons.findIndex((l) => l.slug === slug);
    if (i === -1) continue;

    const isLive = (l: RoadmapLesson) => l.status === "published";
    // Walk outward for the nearest live neighbours so a staged lesson never
    // produces a dead Next/Prev link.
    let prev: RoadmapLesson | null = null;
    for (let j = i - 1; j >= 0; j--) {
      if (isLive(series.lessons[j])) {
        prev = series.lessons[j];
        break;
      }
    }
    let next: RoadmapLesson | null = null;
    for (let j = i + 1; j < series.lessons.length; j++) {
      if (isLive(series.lessons[j])) {
        next = series.lessons[j];
        break;
      }
    }

    return { series, lesson: series.lessons[i], prev, next, total: series.lessons.length };
  }
  return null;
}
