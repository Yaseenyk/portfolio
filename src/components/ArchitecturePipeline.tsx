"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

/* ----------------------------- curve sampling ----------------------------- */

interface Pt {
  x: number;
  y: number;
}

function cubicPoints(p0: Pt, p1: Pt, p2: Pt, p3: Pt, n = 24) {
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const mt = 1 - t;
    const a = mt * mt * mt;
    const b = 3 * mt * mt * t;
    const c = 3 * mt * t * t;
    const d = t * t * t;
    xs.push(a * p0.x + b * p1.x + c * p2.x + d * p3.x);
    ys.push(a * p0.y + b * p1.y + c * p2.y + d * p3.y);
  }
  return { xs, ys };
}

// SVG space is 1000×560 (== aspect-[25/14]); node anchors are the curve endpoints.
const PATHS = [
  {
    d: "M250 140 C480 120 520 300 620 290",
    ...cubicPoints(
      { x: 250, y: 140 },
      { x: 480, y: 120 },
      { x: 520, y: 300 },
      { x: 620, y: 290 }
    ),
  },
  {
    d: "M620 290 C520 300 500 470 260 430",
    ...cubicPoints(
      { x: 620, y: 290 },
      { x: 520, y: 300 },
      { x: 500, y: 470 },
      { x: 260, y: 430 }
    ),
  },
];

// Node centers as % of the diagram (anchor / 1000, anchor / 560).
const POS = {
  database: { left: "25%", top: "25%" },
  backend: { left: "62%", top: "51.8%" },
  frontend: { left: "26%", top: "76.8%" },
};

/* ------------------------------ node visuals ------------------------------ */

const DB_ROWS = [80, 55, 70, 45, 65, 50];
const CODE_LINES = [
  "$ build --ai",
  "GET /api 200",
  "POST /sync ✓",
  "cache.hit()",
  "route.resolve()",
  "exec(task)",
];

function DatabaseViz({ engaged }: { engaged: boolean }) {
  return (
    <div className="relative h-12 overflow-hidden rounded-md border border-zinc-800 bg-ink/60">
      <motion.div
        className="absolute inset-x-0 top-0 flex flex-col gap-1 p-1.5"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: engaged ? 1.2 : 4, repeat: Infinity, ease: "linear" }}
      >
        {[...DB_ROWS, ...DB_ROWS].map((w, i) => (
          <div
            key={i}
            className="h-1 rounded bg-cyan/40"
            style={{ width: `${w}%` }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function BackendViz({ engaged }: { engaged: boolean }) {
  return (
    <div className="relative h-12 overflow-hidden rounded-md border border-zinc-800 bg-black/60 p-1.5 font-mono text-[7px] leading-tight text-cyan">
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: engaged ? 0.9 : 3.5, repeat: Infinity, ease: "linear" }}
      >
        {[...CODE_LINES, ...CODE_LINES].map((l, i) => (
          <div key={i} className="whitespace-nowrap">
            <span className="text-purple">›</span> {l}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function FrontendViz({ engaged }: { engaged: boolean }) {
  return (
    <div className="flex h-12 gap-1.5">
      <div className="w-1/4 rounded bg-zinc-700/40" />
      <div className="flex flex-1 flex-col gap-1">
        <div className="h-1.5 rounded bg-zinc-600/50" />
        <div className="grid flex-1 grid-cols-2 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="rounded bg-cyan/30"
              animate={{ opacity: [0.3, 0.85, 0.3] }}
              transition={{
                duration: engaged ? 0.8 : 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- node card -------------------------------- */

function NodeCard({
  title,
  engaged,
  className = "",
  style,
  children,
}: {
  title: string;
  engaged: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <motion.div
      style={style}
      className={`rounded-xl border p-3 backdrop-blur-xl transition-colors duration-300 ${
        engaged
          ? "border-ice/70 bg-zinc-900/50 shadow-[0_0_34px_-6px_rgba(103,232,249,0.55)]"
          : "border-zinc-700/80 bg-zinc-900/40"
      } ${className}`}
      animate={engaged ? { x: [0, -1.5, 1.5, -1, 0] } : { x: 0 }}
      transition={
        engaged
          ? { duration: 0.3, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.3 }
      }
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan">
          {title}
        </span>
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            engaged ? "bg-ice shadow-[0_0_6px_1px_rgba(103,232,249,0.8)]" : "bg-zinc-600"
          }`}
        />
      </div>
      {children}
    </motion.div>
  );
}

/* ---------------------------------- main ---------------------------------- */

const GRID_STYLE: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, #4f4f4f2e 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f2e 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

export default function ArchitecturePipeline() {
  const [engaged, setEngaged] = useState(false);
  const engage = () => setEngaged(true);
  const disengage = () => setEngaged(false);

  const particlesPerPath = engaged ? 12 : 2;
  const particleDuration = engaged ? 0.7 : 3.5;
  const particleStagger = engaged ? 0.05 : 1.6;

  return (
    <section id="architecture" className="py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT — manifesto + reactor */}
        <div>
      {/* Manifesto */}
      <Reveal className="max-w-xl">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          ~/architecture
        </span>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          The Architecture is Everything.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">
          AI handles the syntax; the engineer dictates the flow. Master the
          pipeline:{" "}
          <span className="font-mono text-ice">
            Database → Backend → Frontend
          </span>
          . An AI-equipped architect{" "}
          <span className="text-gradient animate-gradient font-semibold">
            ships the volume of an entire engineering squad
          </span>
          . Hold the reactor to see the difference.
        </p>
      </Reveal>

      {/* Reactor button + readout */}
      <div className="mt-10 flex flex-col items-start gap-3">
        <motion.button
          type="button"
          aria-pressed={engaged}
          animate={{ scale: engaged ? 1.02 : 1 }}
          whileTap={{ scale: 0.98 }}
          onPointerEnter={engage}
          onPointerDown={(e) => {
            e.preventDefault();
            engage();
          }}
          onPointerLeave={disengage}
          onPointerCancel={disengage}
          onFocus={engage}
          onBlur={disengage}
          className={`relative flex w-full max-w-md touch-none select-none items-center justify-center gap-3 rounded-2xl border px-8 py-5 font-mono text-sm uppercase tracking-widest transition-colors duration-300 ${
            engaged
              ? "border-ice bg-ice/10 text-ice shadow-[0_0_55px_-5px_rgba(103,232,249,0.7)]"
              : "border-cyan/40 bg-cyan/5 text-cyan shadow-[0_0_30px_-12px_rgba(34,211,238,0.6)] hover:border-cyan hover:bg-cyan/10"
          }`}
        >
          <span className="relative flex h-4 w-4 items-center justify-center">
            <motion.span
              className="absolute h-full w-full rounded-full bg-ice"
              animate={{ scale: engaged ? [1, 2] : [1, 1.4], opacity: [0.6, 0] }}
              transition={{
                duration: engaged ? 0.5 : 1.6,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <span className="relative h-2.5 w-2.5 rounded-full bg-ice" />
          </span>
          {engaged ? "AI Engaged" : "Hold to Engage AI"}
        </motion.button>
        <div className="font-mono text-xs uppercase tracking-widest">
          <span className="text-zinc-500">Speed: </span>
          {engaged ? (
            <span className="text-ice">10x (AI-Assisted)</span>
          ) : (
            <span className="text-zinc-400">1x (Manual)</span>
          )}
        </div>
      </div>
        </div>

        {/* RIGHT — pipeline diagram */}
        <div>
      {/* Immersive diagram (md+) */}
      <div className="hidden md:block">
        <div className="relative aspect-[25/14] w-full overflow-hidden rounded-2xl border border-zinc-800">
          {/* Radial glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan/20 via-ink to-transparent"
          />
          {/* Accelerating grid */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            style={GRID_STYLE}
            animate={{
              backgroundPosition: ["0px 0px", "40px 40px"],
              opacity: engaged ? 0.5 : 0.22,
            }}
            transition={{
              backgroundPosition: {
                duration: engaged ? 0.9 : 6,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: { duration: 0.4 },
            }}
          />

          {/* Connection lines + particle swarm */}
          <svg
            viewBox="0 0 1000 560"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="ap-line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>

            {PATHS.map((p, i) => (
              <g key={`path-${i}`}>
                {/* Glow underlay (brightens when engaged) */}
                <motion.path
                  d={p.d}
                  fill="none"
                  stroke="#67E8F9"
                  strokeWidth="6"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  className="blur-[3px]"
                  animate={{ opacity: engaged ? 0.5 : 0 }}
                  transition={{ duration: 0.4 }}
                />
                {/* Flowing dashed line */}
                <motion.path
                  d={p.d}
                  fill="none"
                  stroke="url(#ap-line)"
                  strokeWidth={engaged ? 2.5 : 1.5}
                  strokeLinecap="round"
                  strokeDasharray="6 10"
                  vectorEffect="non-scaling-stroke"
                  animate={{
                    strokeDashoffset: [0, -160],
                    opacity: engaged ? 1 : 0.5,
                  }}
                  transition={{
                    strokeDashoffset: {
                      duration: engaged ? 0.5 : 2.6,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    opacity: { duration: 0.4 },
                  }}
                />
              </g>
            ))}

            {/* Data particles */}
            {PATHS.map((p, pi) =>
              Array.from({ length: particlesPerPath }).map((_, i) => (
                <motion.circle
                  key={`${engaged ? "ai" : "m"}-${pi}-${i}`}
                  r={2.4}
                  fill="#67E8F9"
                  cx={p.xs[0]}
                  cy={p.ys[0]}
                  animate={{ cx: p.xs, cy: p.ys, opacity: [0, 1, 1, 0] }}
                  transition={{
                    cx: {
                      duration: particleDuration,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * particleStagger,
                    },
                    cy: {
                      duration: particleDuration,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * particleStagger,
                    },
                    opacity: {
                      duration: particleDuration,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * particleStagger,
                      times: [0, 0.08, 0.92, 1],
                    },
                  }}
                />
              ))
            )}
          </svg>

          {/* Mini-dashboard nodes (positioned over the curves) */}
          <NodeCard
            title="Database"
            engaged={engaged}
            className="absolute z-10 w-40 -translate-x-1/2 -translate-y-1/2 xl:w-52"
            style={POS.database}
          >
            <DatabaseViz engaged={engaged} />
          </NodeCard>
          <NodeCard
            title="Backend API"
            engaged={engaged}
            className="absolute z-10 w-40 -translate-x-1/2 -translate-y-1/2 xl:w-52"
            style={POS.backend}
          >
            <BackendViz engaged={engaged} />
          </NodeCard>
          <NodeCard
            title="Frontend UI"
            engaged={engaged}
            className="absolute z-10 w-40 -translate-x-1/2 -translate-y-1/2 xl:w-52"
            style={POS.frontend}
          >
            <FrontendViz engaged={engaged} />
          </NodeCard>
        </div>
      </div>

      {/* Cohesive vertical stack (mobile) */}
      <div className="flex flex-col items-center gap-3 md:hidden">
        <NodeCard title="Database" engaged={engaged} className="w-full max-w-xs">
          <DatabaseViz engaged={engaged} />
        </NodeCard>
        <span className="h-8 w-px bg-gradient-to-b from-cyan to-purple" />
        <NodeCard title="Backend API" engaged={engaged} className="w-full max-w-xs">
          <BackendViz engaged={engaged} />
        </NodeCard>
        <span className="h-8 w-px bg-gradient-to-b from-cyan to-purple" />
        <NodeCard title="Frontend UI" engaged={engaged} className="w-full max-w-xs">
          <FrontendViz engaged={engaged} />
        </NodeCard>
      </div>
        </div>
      </div>
    </section>
  );
}
