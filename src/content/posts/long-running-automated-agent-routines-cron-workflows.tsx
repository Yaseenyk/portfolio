import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function Body() {
  return (
    <>
      <p>
        Everything so far assumed a human in the loop — you typed the prompt, you
        watched it run. The endgame is an agent that runs without you: a nightly
        routine that triages new issues, sweeps dependencies for CVEs, or drafts a
        standup from yesterday&apos;s commits, on a cron, while you sleep. That is
        also where the danger lives. An unattended agent with a bug, a runaway
        loop, or an injected instruction (Lesson 10) has no human to hit stop. The
        final discipline is making autonomy safe.
      </p>

      <h2>Core Architectural Concepts &amp; Trade-offs</h2>
      <p>
        An autonomous routine is the whole series composed into one scheduled
        process: a cron trigger fires a checkpointed agent loop (Lesson 12),
        bounded by guardrails (Lesson 10), gated by evals (Lesson 14), running
        against governed tools (Lesson 13). The shift from interactive to
        autonomous removes the human safety valve, so everything that was a nice-
        to-have becomes mandatory. The question for every design choice is no
        longer &quot;is this convenient?&quot; but &quot;what happens at 3am when
        this misbehaves and nobody is watching?&quot;
      </p>
      <p>
        Three controls are non-negotiable. A <strong>budget cap</strong> — a hard
        token and dollar ceiling that aborts the run, not a soft target — because
        an unattended loop with no ceiling is an unbounded bill. A{" "}
        <strong>kill switch</strong> — an external flag the routine checks each
        iteration, so you can stop a misbehaving agent without a deploy. And{" "}
        <strong>idempotency</strong> across runs — if last night&apos;s routine
        half-finished, tonight&apos;s must not double-process, the same
        exactly-once discipline from Lesson 12 applied at the schedule level. None
        of these matter much with a human watching; all of them are load-bearing
        without one.
      </p>
      <p>
        Observability replaces the human you removed. With nobody watching the run,
        the run has to report itself: structured logs of every decision and tool
        call, the token spend, and a summary delivered to a channel you actually
        read. A routine that silently succeeds and silently fails is
        indistinguishable from one that isn&apos;t running at all — and the failure
        mode you fear most is the one that fails quietly for a week. Make success
        and failure both loud.
      </p>
      <p>
        The trade-off is autonomy versus blast radius, and it sets the altitude of
        the work you delegate. Scope unattended routines to bounded, reversible,
        low-stakes tasks — drafting, triaging, summarizing, opening a PR for
        review — and keep a human gate on anything that ships to production,
        moves money, or contacts a customer. The mature pattern is autonomy that{" "}
        <em>prepares</em> and a human that <em>approves</em>: the agent does the
        tireless overnight work and stops at the boundary where judgment and
        accountability still belong to a person.
      </p>

      <h2>A Scheduled Autonomous Routine</h2>
      <p>
        A cron-triggered routine with a hard budget cap, an external kill switch
        checked each iteration, run-level idempotency, and a delivered report.
      </p>
      <Terminal title="nightly-triage.ts">
        <span className="tok-com">{"// Unattended autonomy. Every control here is load-bearing without a human."}</span>
        {`
export async function nightlyTriage(runId: string) {
  // Run-level idempotency: never re-run a completed night.
  if (await store.get(\`done:\${runId}\`)) return

  const BUDGET = 200_000           // hard token ceiling — aborts, not warns
  let spent = 0
  const log: Decision[] = []

  for (const issue of await fetchNewIssues()) {
    // Kill switch: an external flag you can flip without a deploy.
    if (await flags.get("triage.kill")) { await report(log, "KILLED"); return }
    if (spent >= BUDGET)             { await report(log, "BUDGET_EXCEEDED"); return }

    const res = await classify(issue.body)         // eval-gated prompt (L14)
    spent += res.usage.tokens

    // Bounded + reversible only: label and comment. No closing, no shipping.
    await gateway.call("github__label", { id: issue.id, label: res.label })
    log.push({ issue: issue.id, label: res.label, tokens: res.usage.tokens })
  }

  await store.put(\`done:\${runId}\`, true)          // idempotency marker
  await report(log, "OK")                          // loud success AND failure
}

// Scheduler — fires the routine; the routine governs itself.
export const schedule = { cron: "0 3 * * *", handler: nightlyTriage }`}
      </Terminal>
      <p>
        The budget aborts a runaway, the kill flag stops it mid-run without a
        deploy, the <code>done</code> marker prevents a double-run, and the report
        fires whether the night succeeded or failed. The agent works while you
        sleep — inside a box you can prove the edges of.
      </p>

      <h2>Autonomy Inside a Box</h2>
      <Diagram
        label="A cron-scheduled autonomous agent routine: the schedule triggers a checkpointed loop that, each iteration, checks a kill switch and budget ceiling, executes bounded reversible actions through governed tools, and emits a report — with high-stakes actions escalating to a human gate."
        caption="A cron fires the loop; budget, kill switch, and idempotency bound it; a report closes it. Autonomy prepares, a human approves."
      >
        <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" role="img">
          <rect x="0" y="0" width="760" height="280" fill="#05070A" />
          <defs>
            <marker id="an15-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#22d3ee" />
            </marker>
            <marker id="an15-stop" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#ef4444" />
            </marker>
            <marker id="an15-esc" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="#fbbf24" />
            </marker>
          </defs>

          <rect x="28" y="112" width="118" height="56" rx="8" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="87" y="136" fill="#67e8f9" fontFamily="monospace" fontSize="12" textAnchor="middle">cron</text>
          <text x="87" y="154" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">0 3 * * *</text>
          <line x1="146" y1="140" x2="206" y2="140" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an15-arrow)" />

          {/* guarded loop box */}
          <rect x="208" y="74" width="300" height="156" rx="11" fill="#0b1220" stroke="#a855f7" strokeWidth="2" strokeDasharray="7 4" />
          <text x="358" y="98" fill="#c4b5fd" fontFamily="monospace" fontSize="12" textAnchor="middle">checkpointed loop — per iteration</text>

          <rect x="226" y="112" width="120" height="40" rx="7" fill="#160d1f" stroke="#ef4444" strokeWidth="1.4" />
          <text x="286" y="136" fill="#f87171" fontFamily="monospace" fontSize="11" textAnchor="middle">kill switch?</text>
          <rect x="370" y="112" width="120" height="40" rx="7" fill="#160d1f" stroke="#fbbf24" strokeWidth="1.4" />
          <text x="430" y="130" fill="#fbbf24" fontFamily="monospace" fontSize="11" textAnchor="middle">budget</text>
          <text x="430" y="146" fill="#fbbf24" fontFamily="monospace" fontSize="11" textAnchor="middle">ceiling?</text>

          <rect x="226" y="166" width="264" height="46" rx="7" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="358" y="188" fill="#e2e8f0" fontFamily="monospace" fontSize="11" textAnchor="middle">bounded · reversible action</text>
          <text x="358" y="204" fill="#7f8ea3" fontFamily="monospace" fontSize="10" textAnchor="middle">via governed tools · idempotent</text>

          {/* abort rail */}
          <line x1="358" y1="74" x2="358" y2="50" stroke="#ef4444" strokeWidth="1.6" />
          <text x="358" y="42" fill="#f87171" fontFamily="monospace" fontSize="10" textAnchor="middle">kill / over-budget → abort + report</text>

          {/* report */}
          <line x1="508" y1="152" x2="568" y2="152" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#an15-arrow)" />
          <rect x="570" y="100" width="160" height="50" rx="8" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="650" y="122" fill="#67e8f9" fontFamily="monospace" fontSize="12" textAnchor="middle">report</text>
          <text x="650" y="139" fill="#7f8ea3" fontFamily="monospace" fontSize="10" textAnchor="middle">loud success + failure</text>

          {/* human gate */}
          <line x1="650" y1="150" x2="650" y2="196" stroke="#fbbf24" strokeWidth="1.8" markerEnd="url(#an15-esc)" />
          <rect x="566" y="200" width="168" height="44" rx="8" fill="#160d1f" stroke="#fbbf24" strokeWidth="1.6" />
          <text x="650" y="222" fill="#fbbf24" fontFamily="monospace" fontSize="11" textAnchor="middle">human gate</text>
          <text x="650" y="238" fill="#94a3b8" fontFamily="monospace" fontSize="10" textAnchor="middle">approves high-stakes</text>
        </svg>
      </Diagram>
      <p>
        That closes the roadmap: from a single token in a context window to an
        autonomous routine that works overnight inside a box you can prove the
        edges of. Revisit any stage from{" "}
        <a href="/anthropic-roadmap">the full roadmap</a>, or{" "}
        <a href="/#contact">start a conversation</a> about shipping this into your
        own stack.
      </p>
    </>
  );
}

export const autonomousAgentRoutines: BlogPost = {
  slug: "long-running-automated-agent-routines-cron-workflows",
  title: "Autonomous Agent Routines: Cron Workflows That Run Without You",
  description:
    "The endgame is an agent that runs unattended on a cron. Without a human to hit stop, budget caps, a kill switch, idempotency, and loud reporting become mandatory, not optional.",
  keywords: [
    "autonomous agents",
    "cron agent routines",
    "scheduled AI agents",
    "agent kill switch",
    "token budget cap",
    "unattended automation",
    "agent observability",
    "Claude automation",
  ],
  publishedAt: "2026-05-27",
  readingMinutes: 10,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Anthropic", "Agents", "Automation"],
  takeaways: [
    "An autonomous routine composes the whole series into one scheduled process — a cron-triggered, checkpointed, guardrailed, eval-gated loop — where removing the human makes every safety control mandatory.",
    "Three controls are non-negotiable: a hard budget cap that aborts the run, an external kill switch checked each iteration, and run-level idempotency so a half-finished night never double-processes.",
    "Observability replaces the human you removed — structured logs and a delivered report on both success and failure, because a silently failing routine is indistinguishable from one that isn't running.",
    "Scope unattended autonomy to bounded, reversible, low-stakes work and keep a human gate on anything that ships, pays, or contacts a customer: autonomy prepares, a human approves.",
  ],
  Body,
};
