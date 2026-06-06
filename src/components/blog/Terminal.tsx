import type { ReactNode } from "react";

interface TerminalProps {
  /** Label shown in the window chrome, e.g. a filename or shell. */
  title?: string;
  children: ReactNode;
}

/**
 * A macOS-style terminal window for code blocks. Wrap code in token spans
 * (`tok-key`, `tok-fn`, `tok-str`, `tok-num`, `tok-com`, `tok-punc`) for color.
 * `not-prose` keeps Tailwind Typography from restyling it.
 */
export default function Terminal({ title = "bash", children }: TerminalProps) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-800 bg-[#0b1018]">
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-white/[0.02] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-zinc-500">{title}</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-zinc-300">
        <code>{children}</code>
      </pre>
    </div>
  );
}
