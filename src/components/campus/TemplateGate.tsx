"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { whatsappHref } from "@/lib/campus";
import type { Degree } from "@/lib/campus";

const DEGREES: Degree[] = ["BCA", "MCA", "B.Tech", "B.Sc IT", "M.Tech", "Diploma"];

const TEMPLATES = [
  {
    name: "Project Report Template",
    desc: "Front matter, all eight chapters, and back matter — each with a prompt for what belongs there.",
    href: "/downloads/final-year-project-report-template.md",
  },
  {
    name: "Synopsis Template",
    desc: "The ten sections your approval synopsis needs, from problem statement to timeline.",
    href: "/downloads/final-year-project-synopsis-template.md",
  },
];

export default function TemplateGate() {
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const ready = name.trim().length > 1 && degree !== "";

  const wa = whatsappHref(
    `Hi Yaseen, I'm ${name.trim() || "a student"}${degree ? `, ${degree}` : ""}. ` +
      `I grabbed the report + synopsis templates — can you send the editable Word versions ` +
      `and tell me about getting my project built?`,
  );

  if (!unlocked) {
    return (
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          if (ready) setUnlocked(true);
        }}
        className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
      >
        <p className="text-sm leading-relaxed text-zinc-400">
          Two quick details and the templates are yours — free, no email spam.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="tg-name"
              className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500"
            >
              Your name
            </label>
            <input
              id="tg-name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-zinc-50 outline-none transition-colors duration-200 placeholder:text-zinc-600 focus:border-cyan/60 focus:bg-white/[0.04]"
              placeholder="First name"
            />
          </div>
          <div>
            <label
              htmlFor="tg-degree"
              className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500"
            >
              Your course
            </label>
            <select
              id="tg-degree"
              value={degree}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setDegree(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-zinc-50 outline-none transition-colors duration-200 focus:border-cyan/60 focus:bg-white/[0.04]"
            >
              <option value="" disabled className="bg-ink">
                Select…
              </option>
              {DEGREES.map((d) => (
                <option key={d} value={d} className="bg-ink">
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={!ready}
          className="mt-8 rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Get the templates
        </button>
      </form>
    );
  }

  return (
    <div className="rounded-2xl border border-cyan/30 bg-white/[0.02] p-6 sm:p-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
        Yours, {name.trim()} 👋
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-50">
        Download your templates
      </h2>
      <ul className="mt-6 space-y-3">
        {TEMPLATES.map((t) => (
          <li key={t.href}>
            <a
              href={t.href}
              download
              className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors duration-200 hover:border-cyan/40"
            >
              <span>
                <span className="block text-sm font-medium text-zinc-100">
                  {t.name}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-zinc-500">
                  {t.desc}
                </span>
              </span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-ice">
                Download ↓
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-sm leading-relaxed text-zinc-300">
          Want the editable Word versions — or the whole project built to match?
        </p>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-[#04220F] transition-transform duration-200 hover:scale-[1.03]"
        >
          Message me on WhatsApp
        </a>
      </div>
    </div>
  );
}
