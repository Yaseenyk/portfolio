"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ProductMeta } from "@/lib/products";
import { GithubIcon, ExternalLinkIcon, ArrowRightIcon } from "@/components/Icons";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Glass product tile with a cursor-tracked cyan→purple spotlight and a
 * spring-smoothed 3D tilt. The whole tile is keyboard/▸-linked to the
 * deep-dive; repo/live links are separate anchors (no nested <a>).
 */
export default function SpotlightCard({
  product,
  index = 0,
}: {
  product: ProductMeta;
  index?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(sy, [0, 1], [6, -6]);
  const rotateY = useTransform(sx, [0, 1], [-6, 6]);

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    px.set(nx);
    py.set(ny);
    el.style.setProperty("--mx", `${nx * 100}%`);
    el.style.setProperty("--my", `${ny * 100}%`);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.08 }}
      style={
        {
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          "--mx": "50%",
          "--my": "50%",
        } as CSSProperties
      }
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/50 bg-ink/40 p-6 backdrop-blur-md transition-colors duration-300 hover:border-ice/30 sm:p-7"
    >
      {/* Cursor-tracked cyan→purple spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(34,211,238,0.16), rgba(168,85,247,0.10) 38%, transparent 70%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div
        className="relative flex flex-1 flex-col"
        style={{ transform: "translateZ(28px)" }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
            {product.category}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-ice shadow-[0_0_6px_1px_rgba(103,232,249,0.7)]" />
        </div>

        <h3 className="mt-5 text-xl font-semibold tracking-tight text-zinc-50 transition-colors duration-200 group-hover:text-cyan">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-ice/80">{product.tagline}</p>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">
          {product.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {product.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-zinc-800/80 px-2.5 py-1 text-[11px] text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan transition-colors duration-200 hover:text-ice"
            aria-label={`Explore ${product.name}`}
          >
            Explore
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          <div className="flex items-center gap-3">
            {product.liveUrl && (
              <a
                href={product.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${product.name} — live demo`}
                className="text-zinc-500 transition-colors duration-200 hover:text-ice"
              >
                <ExternalLinkIcon className="h-[18px] w-[18px]" />
              </a>
            )}
            <a
              href={product.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${product.name} — source code`}
              className="text-zinc-500 transition-colors duration-200 hover:text-ice"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
