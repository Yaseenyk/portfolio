"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Honest seasonal urgency — no fake countdown. Computes, at view time, how many
 * weeks remain to a typical end-of-March submission (the common window for
 * Indian final year projects) and frames it against a realistic buffer. Links to
 * the planner so the student works out their OWN deadline rather than trusting
 * this one. Computed in an effect (client-only) to avoid a hydration mismatch on
 * the static export and to use the real current date, not the build date.
 */
export default function SubmissionSeasonBand() {
  const [weeks, setWeeks] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    // Months 0-2 = Jan–Mar: target this year's end-of-March; otherwise next year.
    const year = now.getMonth() <= 2 ? now.getFullYear() : now.getFullYear() + 1;
    const target = new Date(year, 2, 31);
    const w = Math.round((target.getTime() - now.getTime()) / (7 * 86_400_000));
    setWeeks(Math.max(0, w));
  }, []);

  if (weeks === null) return null;
  const usable = Math.max(0, weeks - 4);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-amber-500/30 bg-amber-500/[0.06] px-5 py-3 text-sm text-amber-100/90">
      <span className="font-medium text-amber-200">≈ {weeks} weeks</span>
      <span className="text-amber-100/70">
        to a typical end-of-March submission — about {usable} once you keep a
        four-week buffer.
      </span>
      <Link
        href="/final-year-projects/planner"
        className="font-medium text-amber-200 underline-offset-4 hover:underline"
      >
        Check your real deadline →
      </Link>
    </div>
  );
}
