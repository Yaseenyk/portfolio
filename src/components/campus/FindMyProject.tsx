"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { whatsappHref } from "@/lib/campus";
import type { Degree, Difficulty } from "@/lib/campus";
import { track } from "@/lib/analytics";

/** Lean project shape passed from the server page (no heavy data client-side). */
export interface QuizProject {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  degrees: Degree[];
  domain: string;
  difficulty: Difficulty;
}

type Interest = "AI & Machine Learning" | "Web Development" | "Mobile App" | "Not sure yet";
type TimeLeft = "8+ weeks" | "4-8 weeks" | "Under 4 weeks";
type Goal = "Top marks" | "A job in this stack" | "Higher study / research";

interface Answers {
  degree?: Degree;
  interest?: Interest;
  time?: TimeLeft;
  goal?: Goal;
}

const DEGREES: Degree[] = ["BCA", "MCA", "B.Tech", "B.Sc IT", "M.Tech", "Diploma"];
const INTERESTS: Interest[] = [
  "AI & Machine Learning",
  "Web Development",
  "Mobile App",
  "Not sure yet",
];
const TIMES: TimeLeft[] = ["8+ weeks", "4-8 weeks", "Under 4 weeks"];
const GOALS: Goal[] = ["Top marks", "A job in this stack", "Higher study / research"];

const QUESTIONS = [
  { key: "degree" as const, prompt: "What are you studying?", options: DEGREES },
  { key: "interest" as const, prompt: "What kind of project excites you?", options: INTERESTS },
  { key: "time" as const, prompt: "How much time do you realistically have?", options: TIMES },
  { key: "goal" as const, prompt: "What matters most to you?", options: GOALS },
];

/** Additive scoring — every project gets a score, so a result always exists. */
function scoreProject(p: QuizProject, a: Answers): number {
  let s = 0;
  const domain = p.domain.toLowerCase();

  if (a.degree && p.degrees.includes(a.degree)) s += 3;

  if (a.interest === "AI & Machine Learning" && /(machine learning|computer vision|\bai\b)/.test(domain)) s += 3;
  else if (a.interest === "Web Development" && domain.includes("web")) s += 3;
  else if (a.interest === "Mobile App" && domain.includes("mobile")) s += 3;

  const d = p.difficulty;
  if (a.time === "Under 4 weeks") s += d === "Beginner" ? 2 : d === "Intermediate" ? 1 : -1;
  else if (a.time === "4-8 weeks") s += d === "Intermediate" ? 2 : 1;
  else if (a.time === "8+ weeks") s += d === "Advanced" ? 2 : d === "Intermediate" ? 1 : 0;

  if (a.goal === "Higher study / research" && d === "Advanced") s += 2;
  if (a.goal === "A job in this stack" && domain.includes("web")) s += 2;
  if (a.goal === "Top marks" && a.degree && p.degrees.includes(a.degree)) s += 1;

  return s;
}

function recommend(projects: QuizProject[], a: Answers): QuizProject[] {
  return [...projects]
    .map((p) => ({ p, s: scoreProject(p, a) }))
    .sort((x, y) => y.s - x.s)
    .slice(0, 3)
    .map((x) => x.p);
}

function waLink(p: QuizProject, a: Answers): string {
  return whatsappHref(
    `Hi Yaseen, I'm a ${a.degree ?? ""} student. The "${p.title}" project looks like a fit for my final year` +
      `${a.time ? ` (I have ${a.time})` : ""}. Can we discuss?`,
  );
}

export default function FindMyProject({ projects }: { projects: QuizProject[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const total = QUESTIONS.length;
  const done = step >= total;

  const pick = (key: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
    // Answering the last question reveals the recommendations.
    if (step === total - 1) track("fyp-quiz-complete");
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const results = done ? recommend(projects, answers) : [];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      {/* progress */}
      <div className="mb-6 flex items-center gap-2">
        {QUESTIONS.map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < step ? "bg-cyan" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      {!done ? (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            Step {step + 1} of {total}
          </p>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
            {QUESTIONS[step]!.prompt}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {QUESTIONS[step]!.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => pick(QUESTIONS[step]!.key, opt)}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-left text-sm text-zinc-200 transition-colors duration-200 hover:border-cyan/60 hover:bg-white/[0.04] hover:text-zinc-50"
              >
                {opt}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan"
            >
              ← Back
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
            Your best-fit projects
          </p>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
            Based on {answers.degree}, {answers.interest?.toLowerCase()}, {answers.time} left
          </h2>

          <ul className="mt-6 space-y-4">
            {results.map((p) => (
              <li
                key={p.slug}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                  {p.category}
                </span>
                <Link
                  href={`/final-year-projects/${p.slug}`}
                  className="mt-1.5 block text-base font-semibold text-zinc-50 transition-colors hover:text-cyan"
                >
                  {p.title}
                </Link>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">{p.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/final-year-projects/${p.slug}`}
                    className="rounded-lg border border-white/10 px-4 py-2 text-xs text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
                  >
                    See the project →
                  </Link>
                  <a
                    href={waLink(p, answers)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("fyp-quiz-whatsapp")}
                    className="rounded-lg bg-[#25D366] px-4 py-2 text-xs font-semibold text-[#04220F] transition-transform duration-200 hover:scale-[1.03]"
                  >
                    Discuss on WhatsApp
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={reset}
              className="rounded-lg bg-gradient-to-r from-cyan to-purple px-5 py-2.5 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
            >
              Start over
            </button>
            <Link
              href="/final-year-projects/"
              className="text-sm text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-cyan"
            >
              Or browse all projects
            </Link>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-zinc-500">
            None quite right? Any of these can be varied to your problem statement, or
            built from scratch — tell me on WhatsApp or the{" "}
            <Link href="/final-year-projects/custom/" className="text-cyan hover:underline">
              custom build form
            </Link>
            .
          </p>
        </motion.div>
      )}
    </div>
  );
}
