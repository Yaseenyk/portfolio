export interface FlowStep {
  label: string;
  detail: string;
}

/**
 * Renders a System Architecture Flow as connected, numbered glass nodes —
 * a vertical chain on small screens, a horizontal pipeline on large ones.
 */
export default function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="not-prose flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-stretch lg:gap-0">
      {steps.map((step, i) => (
        <li
          key={step.label}
          className="flex items-stretch gap-3 lg:flex-1 lg:basis-[180px] lg:items-center"
        >
          <div className="relative flex-1 overflow-hidden rounded-xl border border-zinc-800/70 bg-ink/50 p-4 backdrop-blur-md">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan/40 via-purple/30 to-transparent"
            />
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 font-mono text-xs text-cyan">
                {i + 1}
              </span>
              <span className="text-sm font-semibold tracking-tight text-zinc-100">
                {step.label}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              {step.detail}
            </p>
          </div>

          {/* Connector arrow between nodes (down on mobile, right on desktop) */}
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="flex items-center justify-center px-1 font-mono text-cyan/70 lg:px-2"
            >
              <span className="lg:hidden">↓</span>
              <span className="hidden lg:inline">→</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
