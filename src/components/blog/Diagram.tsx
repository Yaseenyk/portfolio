import type { ReactNode } from "react";

interface DiagramProps {
  /** Accessible description of the diagram (also the figure's group label). */
  label: string;
  /** Optional monospace caption rendered under the figure. */
  caption?: string;
  /** The inline `<svg>` (or other vector markup) to frame. */
  children: ReactNode;
}

/**
 * A framed container for architectural SVG diagrams inside a post body. Matches
 * the `Terminal` window aesthetic (ink panel, zinc border) and normalises any
 * child `<svg>` to full width. `not-prose` keeps Tailwind Typography from
 * restyling the figure.
 */
export default function Diagram({ label, caption, children }: DiagramProps) {
  return (
    <figure
      role="group"
      aria-label={label}
      className="not-prose my-10 overflow-hidden rounded-xl border border-zinc-800 bg-[#0b1018] p-6 [&_svg]:h-auto [&_svg]:w-full"
    >
      {children}
      {caption && (
        <figcaption className="mt-4 text-center font-mono text-[11px] leading-relaxed text-zinc-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
