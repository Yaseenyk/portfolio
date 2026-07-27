import { PAYMENT_POLICY, SESSION_POLICY } from "@/lib/campus";

interface Step {
  stage: string;
  title: string;
  body: string;
  /** Deliberately blunt — the selling point is how little the student does. */
  youDo: string;
  youPay: string;
}

const STEPS: Step[] = [
  {
    stage: "Before anything",
    title: "A call that costs you nothing",
    body: "Fifteen minutes on WhatsApp or a Meet call. We settle what you want built, when you have to submit, what it costs, and how the installments split. If it does not fit, you walk away and that is the end of it.",
    youDo: "Turn up and talk",
    youPay: "Nothing",
  },
  {
    stage: "Week 1",
    title: "The build starts",
    body: "First installment clears and your slot is confirmed. I start building — schema, backend, frontend, the lot. You are not asked for code, designs, or decisions you are not equipped to make.",
    youDo: "Nothing",
    youPay: "Installment 1",
  },
  {
    stage: "From day one",
    title: "Sessions, every evening",
    body: `${SESSION_POLICY.cadence} on ${SESSION_POLICY.platform} after ${SESSION_POLICY.startsAfter}, about ${SESSION_POLICY.durationMinutes} minutes. One module per session, working through the code that is being written for you. Ask anything. Ask it twice.`,
    youDo: "Show up and learn",
    youPay: "As agreed",
  },
  {
    stage: "Review checkpoints",
    title: "Whatever your guide asks for",
    body: "Guides always want something changed. Those changes are made at no extra cost — they are part of the build, not a new quotation. You are never stuck between your guide and an invoice.",
    youDo: "Forward the feedback",
    youPay: "Nothing extra",
  },
  {
    stage: "Before submission",
    title: "Handover and mock viva",
    body: `Everything is delivered ${PAYMENT_POLICY.handover.toLowerCase()} — source, report, deck, diagrams, deployment. Then a mock viva where I ask the questions your panel will ask, until you stop hesitating on the answers.`,
    youDo: "Answer the questions",
    youPay: "Final installment",
  },
];

export default function ProcessTimeline() {
  return (
    <section id="how-it-works" className="scroll-mt-28 py-4">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        What actually happens
      </h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
        Start to submission. Note the middle column — it is short on purpose.
      </p>

      <ol className="mt-10">
        {STEPS.map((step, i) => (
          <li key={step.title} className="group relative flex gap-5 sm:gap-8">
            {/* Rail */}
            <div className="flex flex-col items-center">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan/40 bg-cyan/[0.06] font-mono text-xs text-ice">
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < STEPS.length - 1 && (
                <span className="w-px flex-1 bg-gradient-to-b from-cyan/30 to-white/5" />
              )}
            </div>

            <div className="pb-12">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                {step.stage}
              </span>
              <h3 className="mt-2 text-lg font-medium text-zinc-50">{step.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                {step.body}
              </p>

              <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                <div className="flex items-baseline gap-2">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                    You do
                  </dt>
                  <dd className="text-sm text-zinc-200">{step.youDo}</dd>
                </div>
                <div className="flex items-baseline gap-2">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                    You pay
                  </dt>
                  <dd className="text-sm text-zinc-200">{step.youPay}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
