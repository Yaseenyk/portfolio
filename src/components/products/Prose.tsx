import type { ReactNode } from "react";

/** Long-form text wrapper sharing the blog's dark prose-invert tuning. */
export default function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className="prose prose-invert max-w-none
        prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight
        prose-h4:mt-8 prose-h4:text-zinc-50
        prose-p:text-zinc-300 prose-p:leading-relaxed
        prose-a:text-ice prose-a:no-underline prose-a:underline-offset-4 hover:prose-a:underline
        prose-strong:text-zinc-100
        prose-code:text-ice prose-code:before:content-none prose-code:after:content-none
        prose-pre:border prose-pre:border-zinc-800 prose-pre:bg-zinc-950/70
        prose-li:text-zinc-300 prose-hr:border-zinc-800"
    >
      {children}
    </div>
  );
}
