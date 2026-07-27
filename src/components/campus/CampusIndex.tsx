"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CampusProject, Degree } from "@/lib/campus";
import ProjectCard from "./ProjectCard";

interface Props {
  projects: CampusProject[];
  degrees: Degree[];
  domains: string[];
}

export default function CampusIndex({ projects, degrees, domains }: Props) {
  const [query, setQuery] = useState("");
  const [degree, setDegree] = useState<Degree | "All">("All");
  const [domain, setDomain] = useState<string>("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (degree !== "All" && !p.degrees.includes(degree)) return false;
      if (domain !== "All" && p.domain !== domain) return false;
      if (!q) return true;
      return [p.title, p.tagline, p.summary, p.domain, ...p.stack]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [projects, query, degree, domain]);

  if (projects.length === 0) {
    return (
      <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
        <p className="text-zinc-300">The first listings go live shortly.</p>
        <p className="mt-2 text-sm text-zinc-500">
          Need something specific in the meantime?{" "}
          <Link
            href="/final-year-projects/custom"
            className="text-cyan underline-offset-4 hover:underline"
          >
            Send a custom brief
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, stack, or domain…"
          className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-zinc-50 outline-none transition-colors duration-200 placeholder:text-zinc-600 focus:border-cyan/60 sm:max-w-xs"
        />
        <Chips
          label="Course"
          options={["All", ...degrees]}
          active={degree}
          onSelect={(v) => setDegree(v as Degree | "All")}
        />
        <Chips
          label="Domain"
          options={["All", ...domains]}
          active={domain}
          onSelect={setDomain}
        />
      </div>

      <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
        {visible.length} project{visible.length === 1 ? "" : "s"}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {visible.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-sm text-zinc-500">
          Nothing matches that filter.{" "}
          <Link
            href="/final-year-projects/custom"
            className="text-cyan underline-offset-4 hover:underline"
          >
            Ask for it to be built
          </Link>
          .
        </p>
      )}
    </>
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

