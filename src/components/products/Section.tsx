import type { ReactNode } from "react";

/** Consistent deep-dive section: mono eyebrow + optional title + body. */
export default function Section({
  label,
  title,
  children,
}: {
  label: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-16 scroll-mt-24">
      <div className="flex items-center gap-3">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          {label}
        </h2>
        <span className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
      </div>
      {title && (
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-50">
          {title}
        </h3>
      )}
      <div className="mt-5">{children}</div>
    </section>
  );
}
