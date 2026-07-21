export interface FlowStep {
  label: string;
  detail: string;
}

/**
 * System Architecture Flow as a uniform grid of numbered glass cards.
 * A grid (not wrapping flex) so every card is equal-height and the last
 * row never orphan-stretches; the number chips carry the sequence.
 */
export default function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  const lgCols =
    steps.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <ol className={`not-prose grid grid-cols-1 gap-3 md:grid-cols-2 ${lgCols}`}>
      {steps.map((step, i) => (
        <li key={step.label} className="h-full">
          <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-5 backdrop-blur-md transition-colors hover:border-cyan/40">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan/40 via-purple/30 to-transparent"
            />
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 font-mono text-xs text-cyan">
                {i + 1}
              </span>
              <span className="text-sm font-semibold tracking-tight text-zinc-100">
                {step.label}
              </span>
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-zinc-400">
              {step.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
