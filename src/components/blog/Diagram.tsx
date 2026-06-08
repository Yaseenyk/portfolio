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
      className="not-prose my-10 rounded-xl border border-zinc-800 bg-[#0b1018] p-4 sm:p-6"
    >
      {/* On phones the wide SVG would shrink its labels to ~5px, so keep a
          readable min-width and let the diagram scroll horizontally; on ≥sm it
          fits the column at full width with no scroll. */}
      <div className="-mx-1 overflow-x-auto px-1 [&_svg]:h-auto [&_svg]:w-full [&_svg]:min-w-[34rem] sm:[&_svg]:min-w-0">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-4 text-center font-mono text-[11px] leading-relaxed text-zinc-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
