"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PROJECT_KINDS,
  VIVA_CATEGORIES,
  VIVA_QUESTIONS,
  type ProjectKind,
  type VivaCategory,
} from "@/lib/vivaQuestions";

const STORAGE_KEY = "campus.viva.prepared";

export default function VivaBank() {
  const [category, setCategory] = useState<VivaCategory | "All">("All");
  const [kind, setKind] = useState<ProjectKind | "All">("All");
  const [query, setQuery] = useState("");
  const [prepared, setPrepared] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  // Progress persists locally so a student can drill across several sittings.
  // Read after mount — localStorage does not exist during the static export.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPrepared(new Set(JSON.parse(raw) as string[]));
    } catch {
      // Corrupt or blocked storage just means starting from zero.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...prepared]));
    } catch {
      // Private mode — the checklist still works for this session.
    }
  }, [prepared, loaded]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VIVA_QUESTIONS.filter((item) => {
      if (category !== "All" && item.category !== category) return false;
      if (kind !== "All" && item.kind !== kind && item.kind !== "Any") return false;
      if (!q) return true;
      return `${item.q} ${item.why}`.toLowerCase().includes(q);
    });
  }, [category, kind, query]);

  const doneHere = visible.filter((v) => prepared.has(v.id)).length;
  const pct = visible.length ? Math.round((doneHere / visible.length) * 100) : 0;

  const toggle = (id: string) =>
    setPrepared((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div>
      <div className="flex flex-col gap-5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the questions…"
          className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-zinc-50 outline-none transition-colors duration-200 placeholder:text-zinc-600 focus:border-cyan/60 sm:max-w-sm"
        />

        <Chips
          label="Project type"
          options={["All", ...PROJECT_KINDS.filter((k) => k !== "Any")]}
          active={kind}
          onSelect={(v) => setKind(v as ProjectKind | "All")}
        />
        <Chips
          label="Category"
          options={["All", ...VIVA_CATEGORIES]}
          active={category}
          onSelect={(v) => setCategory(v as VivaCategory | "All")}
        />
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan to-purple transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="shrink-0 font-mono text-xs tabular-nums text-zinc-400">
          {doneHere}/{visible.length} ready
        </span>
      </div>

      <ul className="mt-8 space-y-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
        {visible.map((item) => {
          const isDone = prepared.has(item.id);
          return (
            <li key={item.id} className="bg-ink">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-pressed={isDone}
                className="flex w-full gap-4 p-4 text-left transition-colors duration-200 hover:bg-white/[0.03]"
              >
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[11px] transition-colors duration-200 ${
                    isDone
                      ? "border-cyan/60 bg-cyan/20 text-ice"
                      : "border-white/15 text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span className="min-w-0">
                  <span
                    className={`block text-sm leading-relaxed transition-colors duration-200 ${
                      isDone ? "text-zinc-500 line-through" : "text-zinc-100"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span className="mt-1.5 block text-xs leading-relaxed text-zinc-500">
                    Really testing: {item.why}
                  </span>
                  <span className="mt-2 flex flex-wrap gap-1.5">
                    <Tag>{item.category}</Tag>
                    {item.kind !== "Any" && <Tag>{item.kind}</Tag>}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 && (
        <p className="mt-8 text-center text-sm text-zinc-500">
          Nothing matches that filter.
        </p>
      )}

      {prepared.size > 0 && (
        <button
          type="button"
          onClick={() => setPrepared(new Set())}
          className="mt-6 text-xs text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-400 hover:underline"
        >
          Reset progress
        </button>
      )}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-600">
      {children}
    </span>
  );
}

function Chips({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: string[];
  active: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
        {label}
      </span>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onSelect(o)}
          className={`rounded-full border px-3 py-1 text-xs transition-colors duration-200 ${
            active === o
              ? "border-cyan/60 bg-cyan/10 text-ice"
              : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
