import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Every message you send to Claude Code carries a hidden passenger: the
        entire conversation that came before it. The model is stateless, so the
        client re-sends the full transcript on every turn. That means a context
        window you never tidy isn&apos;t just messy — it&apos;s a recurring line
        item on your bill. This first lesson is about the cheapest optimization
        there is: throwing away tokens you no longer need.
      </p>

      <h2>The Challenge</h2>
      <p>
        Picture a two-hour session. You start by debugging an auth middleware,
        drift into a database migration, then end up styling a React component.
        By message fifty, the model is still re-reading the stack trace from
        message three on every single request. None of that auth context helps
        with CSS — but you pay for it anyway, token-for-token, turn after turn.
      </p>
      <p>
        This is <strong>context bloat</strong>, and it compounds in three ways:
      </p>
      <ul>
        <li>
          <strong>Cost.</strong> Input tokens scale with transcript length. A
          conversation that has grown to 120K tokens costs roughly 10× more per
          message than the same task started clean at 12K.
        </li>
        <li>
          <strong>Latency.</strong> More input tokens means more time to first
          token. Bloated context feels sluggish.
        </li>
        <li>
          <strong>Quality.</strong> Irrelevant history dilutes attention. The
          model is more likely to confuse the migration schema with the auth
          flow when both are crammed in the window.
        </li>
      </ul>
      <p>
        The instinct is to keep one long-running session because &quot;it
        already knows everything.&quot; That instinct is what&apos;s draining
        your budget.
      </p>

      <h2>The Solution</h2>
      <p>
        Claude Code ships two commands for managing the window. They solve
        different problems — using the wrong one wastes the technique.
      </p>

      <h3>/clear — the hard reset</h3>
      <p>
        <code>/clear</code> wipes the conversation history entirely. The next
        message starts from an empty window (your <code>CLAUDE.md</code> and
        project context still load — only the chat transcript is dropped). Use
        it at <em>task boundaries</em>: the moment you finish one unit of work
        and start something unrelated, clear.
      </p>
      <Terminal title="claude — task boundary">
        <span className="tok-com">{"# Finished the auth fix. The migration has nothing to do with it."}</span>
        {`
`}
        <span className="tok-fn">{"/clear"}</span>
        {`
`}
        <span className="tok-com">{"# Fresh window. Next prompt is cheap again."}</span>
        {`
> Now help me write the users-table migration.`}
      </Terminal>
      <p>
        The rule of thumb: <strong>one task, one context.</strong> If you
        can&apos;t explain why the previous discussion helps the current task,
        clear it.
      </p>

      <h3>/compact — the lossy save</h3>
      <p>
        Sometimes you <em>do</em> need continuity — you&apos;re deep into a
        feature, the window is filling, but the history still matters.{" "}
        <code>/compact</code> asks the model to summarize the conversation so
        far into a dense recap, then replaces the raw transcript with that
        summary. You keep the thread of the work at a fraction of the token
        cost.
      </p>
      <Terminal title="claude — mid-task compaction">
        <span className="tok-com">{"# 90K tokens deep in a refactor, still going. Don't lose the plot —"}</span>
        {`
`}
        <span className="tok-com">{"# just shrink it."}</span>
        {`
`}
        <span className="tok-fn">{"/compact"}</span>{" "}
        <span className="tok-str">{"Keep the new repository interface and the files still left to migrate."}</span>
      </Terminal>
      <p>
        Passing focus instructions after <code>/compact</code> is the move most
        people miss. Left to its own devices the summary is generic; tell it
        what to preserve and the recap stays surgical. Everything you don&apos;t
        name is fair game to drop.
      </p>
      <blockquote>
        <code>/clear</code> when the past is irrelevant. <code>/compact</code>{" "}
        when the past is relevant but bulky. Reaching for compact at a real task
        boundary just pays a summarization tax to keep junk.
      </blockquote>

      <h2>Pro-Tip</h2>
      <p>
        <strong>Don&apos;t wait for auto-compact — it&apos;s the most expensive
        compaction you can run.</strong> Claude Code triggers an automatic
        compaction when you approach the context limit. By definition that fires
        when the window is at its <em>fullest</em>, so the summarization pass
        itself reads a maximal transcript — you pay top dollar for the one
        compaction you didn&apos;t choose, at a moment you didn&apos;t pick.
      </p>
      <p>
        Experienced users compact <em>proactively</em>, on their own cadence: at
        natural checkpoints (a passing test suite, a committed change), while the
        window is still half-empty and the summary is cheap to produce. Pair
        that with a discipline of clearing between tasks and you almost never hit
        the auto-trigger at all.
      </p>
      <p>
        One caveat that pays for itself: if you rely on{" "}
        <strong>prompt caching</strong>, remember that editing or summarizing the
        early part of the conversation invalidates the cached prefix. Compact at
        boundaries where you were going to break the cache anyway (a new sub-task,
        a fresh file set) — not in the middle of a tight cached loop.
      </p>

      <h2>Metrics</h2>
      <p>
        A representative three-task session — auth fix, migration, component
        styling — run two ways. &quot;Before&quot; is one unbroken context;
        &quot;After&quot; clears at each task boundary. Numbers are illustrative
        but the ratio is the point.
      </p>
      <Terminal title="token cost — before vs. after">
        <span className="tok-com">{"Technique          | Input tokens / final msg | Session input total"}</span>
        {`
`}
        <span className="tok-punc">{"-------------------+--------------------------+--------------------"}</span>
        {`
`}
        {"One long context   |        ~118,000          |     ~2,400,000"}
        {`
`}
        {"/clear per task    |         ~14,000          |       ~430,000"}
        {`
`}
        <span className="tok-punc">{"-------------------+--------------------------+--------------------"}</span>
        {`
`}
        <span className="tok-key">{"Reduction          |          ~88%            |          ~82%"}</span>
      </Terminal>
      <p>
        Roughly an 8× cut on the per-message cost of the final task, and over 80%
        off the session&apos;s total input spend — from one command, typed at the
        right moments. No model downgrade, no quality trade-off. Just refusing to
        re-send tokens that stopped being useful.
      </p>
      <p>
        Context hygiene is the foundation the rest of this series builds on. Next
        up:{" "}
        <a href="/claude-code">the full roadmap</a> — including the token budget
        mental model that makes the meter legible before you spend.
      </p>
    </>
  );
}

export const claudeCodeContextHygiene: BlogPost = {
  slug: "claude-code-context-hygiene-clear-compact",
  title: "Context Hygiene: Mastering /clear and /compact in Claude Code",
  description:
    "Claude re-sends the whole conversation every turn, so a messy context window is a recurring bill. How /clear and /compact cut token spend by ~85%.",
  keywords: [
    "Claude Code",
    "/clear",
    "/compact",
    "context window",
    "token optimization",
    "LLM cost reduction",
    "prompt caching",
    "AI coding efficiency",
  ],
  publishedAt: "2026-06-09",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Claude Code", "Cost Optimization", "Developer Tools"],
  takeaways: [
    "Claude Code re-sends the entire transcript every turn, so unmanaged context is a recurring per-message cost — not a one-time one.",
    "Use /clear at task boundaries (one task, one context) and /compact mid-task when history is relevant but bulky.",
    "Pass focus instructions after /compact (e.g. /compact keep the new interface) so the summary stays surgical instead of generic.",
    "Compact proactively at checkpoints; auto-compact is the most expensive run because it fires when the window is fullest.",
  ],
  Body,
};
