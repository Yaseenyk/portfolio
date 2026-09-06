/**
 * Chapter 5 diagram — the four stages that build a model, and who runs each.
 * Site diagram style: ink panel, cyan/violet/ice, mono labels.
 */

export function TrainingPipelineDiagram() {
  const stage = (
    x: number,
    stroke: string,
    fill: string,
    title: string,
    who: string,
    out: string,
  ) => (
    <g key={title}>
      <rect x={x} y="54" width="150" height="86" rx="12" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <text x={x + 75} y="84" textAnchor="middle" fontFamily="monospace" fontSize="12" fill={stroke}>
        {title}
      </text>
      <text x={x + 75} y="104" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">
        {who}
      </text>
      <text x={x + 75} y="120" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#71717a">
        {out}
      </text>
    </g>
  );

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1018]">
      <div className="border-b border-white/5 px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Diagram · the four stages that build a model
        </span>
      </div>
      <div className="overflow-x-auto p-5 sm:p-6">
        <svg
          viewBox="0 0 820 220"
          className="h-auto w-full min-w-[680px]"
          role="img"
          aria-label="Four stages: data curation, pretraining, fine-tuning and preference training, each feeding into the next, with the people who run each stage and what comes out."
        >
          <defs>
            <marker id="tp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
          </defs>

          {stage(20, "#67E8F9", "rgba(103,232,249,0.05)", "1 · data", "data engineers", "clean text")}
          <line x1="170" y1="97" x2="196" y2="97" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#tp-arrow)" />

          {stage(200, "#A855F7", "rgba(168,85,247,0.07)", "2 · pretrain", "GPUs · months", "base model")}
          <line x1="350" y1="97" x2="376" y2="97" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#tp-arrow)" />

          {stage(380, "#22D3EE", "rgba(34,211,238,0.06)", "3 · fine-tune", "annotators", "assistant")}
          <line x1="530" y1="97" x2="556" y2="97" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#tp-arrow)" />

          {stage(560, "#22D3EE", "rgba(34,211,238,0.06)", "4 · preference", "human ranking", "RLHF-polished")}
          <line x1="710" y1="97" x2="742" y2="97" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#tp-arrow)" />

          {/* final model */}
          <circle cx="782" cy="97" r="26" fill="rgba(103,232,249,0.08)" stroke="#67E8F9" strokeWidth="1.5" />
          <text x="782" y="101" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#67E8F9">chat</text>

          {/* under-labels: what each stage costs / feels like */}
          <text x="95" y="168" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#52525b">trillions of tokens</text>
          <text x="275" y="168" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#52525b">the expensive one</text>
          <text x="275" y="182" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#52525b">knows everything,</text>
          <text x="275" y="194" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#52525b">no manners</text>
          <text x="455" y="168" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#52525b">learns to be helpful</text>
          <text x="635" y="168" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#52525b">learns what people prefer</text>
          <text x="635" y="182" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#52525b">+ safety / red-teaming</text>
        </svg>
      </div>
      <figcaption className="border-t border-white/5 px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
        Curate the food, learn the world, learn manners, learn taste. A different team runs each stage.
      </figcaption>
    </figure>
  );
}
