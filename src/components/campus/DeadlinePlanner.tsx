"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { whatsappHref } from "@/lib/campus";

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

/** Fractions of the usable weeks, after the buffer and exams are removed. */
const PHASES = [
  {
    name: "Topic approval and synopsis",
    share: 0.12,
    detail: "Finalise the topic, write the synopsis, get your guide to sign it off.",
  },
  {
    name: "Design — schema and architecture",
    share: 0.15,
    detail: "ER diagram, data flow, screen plan. Settle the database before writing features.",
  },
  {
    name: "Core build",
    share: 0.3,
    detail: "The one feature the project exists for. Nothing else until this works end to end.",
  },
  {
    name: "Secondary features",
    share: 0.18,
    detail: "Roles, dashboards, reports. Stop adding here — this is where scope quietly doubles.",
  },
  {
    name: "Testing and validation",
    share: 0.1,
    detail: "Bad input, unauthorised access, empty forms. Write the test case table as you go.",
  },
  {
    name: "Report, diagrams and deck",
    share: 0.15,
    detail: "Every diagram must match the code you are submitting. Panels check.",
  },
];

interface Plan {
  totalWeeks: number;
  usableWeeks: number;
  rows: { name: string; detail: string; weeks: number; endsOn: Date }[];
  bufferEnds: Date;
  verdict: "comfortable" | "tight" | "critical" | "past";
}

function addWeeks(date: Date, weeks: number): Date {
  return new Date(date.getTime() + weeks * MS_PER_WEEK);
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function DeadlinePlanner() {
  const [submission, setSubmission] = useState("");
  const [examWeeks, setExamWeeks] = useState(3);

  const plan = useMemo<Plan | null>(() => {
    if (!submission) return null;
    const target = new Date(`${submission}T00:00:00`);
    if (Number.isNaN(target.getTime())) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const totalWeeks = Math.floor((target.getTime() - today.getTime()) / MS_PER_WEEK);

    if (totalWeeks <= 0) {
      return {
        totalWeeks,
        usableWeeks: 0,
        rows: [],
        bufferEnds: target,
        verdict: "past",
      };
    }

    // Four weeks of buffer is not optional — it absorbs guide-requested
    // changes and the things that break in the last fortnight.
    const BUFFER = 4;
    const usableWeeks = Math.max(0, totalWeeks - BUFFER - examWeeks);

    let cursor = today;
    const rows = PHASES.map((p) => {
      const weeks = Math.max(1, Math.round(usableWeeks * p.share));
      cursor = addWeeks(cursor, weeks);
      return { name: p.name, detail: p.detail, weeks, endsOn: new Date(cursor) };
    });

    const verdict =
      usableWeeks >= 16 ? "comfortable" : usableWeeks >= 9 ? "tight" : "critical";

    return {
      totalWeeks,
      usableWeeks,
      rows,
      bufferEnds: addWeeks(cursor, examWeeks + BUFFER),
      verdict,
    };
  }, [submission, examWeeks]);

  const VERDICT_COPY: Record<Plan["verdict"], { tone: string; text: string }> = {
    comfortable: {
      tone: "text-ice",
      text: "You have room. Use it on understanding the code rather than adding features — scope creep is what turns a comfortable timeline into a critical one.",
    },
    tight: {
      tone: "text-zinc-200",
      text: "Workable, but only if you start now and do not change topic. Cut one secondary feature from your plan before you begin, not in February.",
    },
    critical: {
      tone: "text-purple-400",
      text: "This is not enough time to build something ambitious from scratch alongside classes. Either reduce the scope hard, or get the build done for you and spend your weeks understanding it instead.",
    },
    past: {
      tone: "text-red-400",
      text: "That date has passed. Check the year on the date you entered.",
    },
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="submission"
            className="mb-2.5 block text-xs uppercase tracking-[0.2em] text-zinc-500"
          >
            Submission date
          </label>
          <input
            id="submission"
            type="date"
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-zinc-50 outline-none transition-colors duration-200 focus:border-cyan/60 focus:bg-white/[0.04]"
          />
        </div>
        <div>
          <label
            htmlFor="examWeeks"
            className="mb-2.5 block text-xs uppercase tracking-[0.2em] text-zinc-500"
          >
            Weeks lost to exams and breaks
          </label>
          <input
            id="examWeeks"
            type="number"
            min={0}
            max={12}
            value={examWeeks}
            onChange={(e) => setExamWeeks(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-zinc-50 outline-none transition-colors duration-200 focus:border-cyan/60 focus:bg-white/[0.04]"
          />
        </div>
      </div>

      {!plan && (
        <p className="mt-6 text-sm text-zinc-500">
          Enter your submission date to see how many weeks you actually have.
        </p>
      )}

      {plan && plan.verdict === "past" && (
        <p className={`mt-6 text-sm ${VERDICT_COPY.past.tone}`}>
          {VERDICT_COPY.past.text}
        </p>
      )}

      {plan && plan.verdict !== "past" && (
        <>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-y border-white/10 py-6">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                Weeks until submission
              </dt>
              <dd className="mt-1.5 font-mono text-2xl tabular-nums text-zinc-50">
                {plan.totalWeeks}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                Actually usable
              </dt>
              <dd className="mt-1.5 font-mono text-2xl tabular-nums text-ice">
                {plan.usableWeeks}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                Removed
              </dt>
              <dd className="mt-1.5 text-sm leading-tight text-zinc-300">
                {examWeeks} exam · 4 buffer
                <br />
                <span className="text-zinc-500">the buffer is not optional</span>
              </dd>
            </div>
          </dl>

          <p className={`mt-6 text-sm leading-relaxed ${VERDICT_COPY[plan.verdict].tone}`}>
            {VERDICT_COPY[plan.verdict].text}
          </p>

          {plan.usableWeeks > 0 && (
            <ol className="mt-8 space-y-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
              {plan.rows.map((row, i) => (
                <li
                  key={row.name}
                  className="flex flex-col gap-2 bg-ink p-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <div className="flex gap-3">
                    <span className="font-mono text-xs text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="block text-sm font-medium text-zinc-100">
                        {row.name}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-zinc-500">
                        {row.detail}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 pl-8 text-left sm:pl-0 sm:text-right">
                    <span className="block font-mono text-xs tabular-nums text-zinc-300">
                      {row.weeks} {row.weeks === 1 ? "week" : "weeks"}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] tabular-nums text-zinc-600">
                      done by {formatDate(row.endsOn)}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappHref(
                `Hi Yaseen, my final year project is due ${submission} and I have about ${plan.usableWeeks} usable weeks. Can you help?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-[#04220F] transition-transform duration-200 hover:scale-[1.03]"
            >
              Send this timeline on WhatsApp
            </a>
            <Link
              href="/final-year-projects/"
              className="rounded-xl border border-white/10 px-6 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
            >
              See projects that fit this
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
