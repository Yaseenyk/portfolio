import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function Body() {
  return (
    <>
      <p>
        Your agent worked perfectly in testing, then fell apart on a real
        codebase: halfway through a long task it started forgetting decisions it
        made twenty messages earlier, truncating files mid-function, and
        contradicting its own plan. Nothing in your code changed. What changed is
        that you ran out of a budget you were never tracking — the context window.
        Before you tune a single prompt, you have to understand the model as what
        it actually is: a fixed-size attention budget, and a separate, smaller
        budget for everything it&apos;s allowed to say back.
      </p>

      <h2>Core Architectural Concepts &amp; Trade-offs</h2>
      <p>
        A Claude model is stateless. It has no memory between calls; the only
        thing it &quot;knows&quot; on any given turn is whatever you pack into the{" "}
        <strong>context window</strong> — the system prompt, your tool
        definitions, the full conversation transcript, any extended-thinking
        blocks, and the space reserved for the reply. Every one of those competes
        for the same token pool. On the 2026 lineup that pool is large — Opus 4.8
        ships a 200K-token default window with a 1M-token extended mode, and
        Sonnet 4.6, Haiku 4.5, and Fable 5 sit at their own tiers — but
        &quot;large&quot; is not &quot;infinite,&quot; and the failure mode when
        you hit the ceiling is silent degradation, not a clean error.
      </p>
      <p>
        The trap is treating input and output as one quantity. They are not. The
        context window caps what the model can <em>read</em>; a separate, much
        smaller <strong>max-output</strong> limit caps what it can <em>write</em>{" "}
        in a single turn. You can hand Opus a 300K-token monorepo (in extended
        mode) and still only get back tens of thousands of tokens of generated
        code per response. That asymmetry is why &quot;summarize this whole repo
        into one file&quot; quietly truncates: the read fit, the write didn&apos;t.
        Output is the scarce resource, and it is the one developers forget to
        budget.
      </p>
      <p>
        Adaptive extended thinking adds a third claimant. When a request is hard
        enough to warrant it, the model spends tokens on internal reasoning blocks
        before it answers — and those blocks come out of the same window. A
        generous thinking budget buys accuracy on genuinely hard problems and
        wastes latency and tokens on easy ones; the engineering decision is
        matching the thinking budget to the problem, not maxing it globally. The
        related cost lever is the <strong>cached prefix</strong>: the static head
        of your context (system prompt, tool schemas, a stable document) can be
        cached so you don&apos;t re-pay full price to re-read it every turn. Keep
        that prefix stable and put it first; anything you mutate near the top
        invalidates the cache below it.
      </p>
      <p>
        Put together, these constraints define an operating envelope. The window
        is RAM, not disk — the moment a transcript no longer fits, something gets
        evicted, and you&apos;d rather choose what than let attention quietly thin
        out across a bloated history. The discipline that follows is mechanical:
        measure tokens before you send, reserve headroom for output and thinking,
        and treat the window as a budget you actively manage rather than a bucket
        you fill until it overflows.
      </p>

      <h2>Budgeting the Window in Code</h2>
      <p>
        Don&apos;t guess at token counts — measure them. Anthropic&apos;s SDK
        exposes a token-counting endpoint so you can price a request{" "}
        <em>before</em> you spend output on it. Here is a type-safe budget guard:
        it counts the input, subtracts a reservation for thinking and output, and
        refuses to send a request that can&apos;t fit a usable reply.
      </p>
      <Terminal title="context-budget.ts">
        <span className="tok-key">{"import"}</span>{" Anthropic "}
        <span className="tok-key">{"from"}</span>{" "}
        <span className="tok-str">{'"@anthropic-ai/sdk"'}</span>
        {`
`}
        <span className="tok-key">{"import type"}</span>
        {" { MessageParam } "}
        <span className="tok-key">{"from"}</span>{" "}
        <span className="tok-str">{'"@anthropic-ai/sdk/resources/messages"'}</span>
        {`

`}
        <span className="tok-key">{"const"}</span>{" MODEL = "}
        <span className="tok-str">{'"claude-opus-4-8"'}</span>
        {`
`}
        <span className="tok-com">{"// Opus 4.8 operating envelope. Extended mode lifts the window to 1M."}</span>
        {`
`}
        <span className="tok-key">{"const"}</span>{" CONTEXT_WINDOW = "}
        <span className="tok-num">{"200_000"}</span>
        {`
`}
        <span className="tok-key">{"const"}</span>{" MAX_OUTPUT = "}
        <span className="tok-num">{"32_000"}</span>{"      "}
        <span className="tok-com">{"// reply ceiling — the scarce budget"}</span>
        {`
`}
        <span className="tok-key">{"const"}</span>{" THINKING_RESERVE = "}
        <span className="tok-num">{"16_000"}</span>{" "}
        <span className="tok-com">{"// headroom for adaptive thinking"}</span>
        {`

`}
        <span className="tok-key">{"const"}</span>{" anthropic = "}
        <span className="tok-key">{"new"}</span>{" "}
        <span className="tok-fn">{"Anthropic"}</span>{"()"}
        {`

`}
        <span className="tok-key">{"export async function"}</span>{" "}
        <span className="tok-fn">{"guardedSend"}</span>
        {"(system: "}
        <span className="tok-key">{"string"}</span>
        {", messages: MessageParam[]) {"}
        {`
  `}
        <span className="tok-com">{"// Price the request before spending a single output token."}</span>
        {`
  `}
        <span className="tok-key">{"const"}</span>{" { input_tokens } = "}
        <span className="tok-key">{"await"}</span>{" anthropic.messages."}
        <span className="tok-fn">{"countTokens"}</span>{"({"}
        {`
    model: MODEL, system, messages,
  })

  `}
        <span className="tok-key">{"const"}</span>{" reserved = MAX_OUTPUT + THINKING_RESERVE"}
        {`
  `}
        <span className="tok-key">{"const"}</span>{" remaining = CONTEXT_WINDOW - input_tokens - reserved"}
        {`

  `}
        <span className="tok-key">{"if"}</span>{" (remaining < "}
        <span className="tok-num">{"0"}</span>{") {"}
        {`
    `}
        <span className="tok-key">{"throw new"}</span>{" "}
        <span className="tok-fn">{"Error"}</span>
        {`(
      `}
        <span className="tok-str">{"`Context over budget: ${input_tokens} in + ${reserved} reserved \\`"}</span>
        {`
      `}
        <span className="tok-str">{"`> ${CONTEXT_WINDOW}. Compact the transcript or split the task.`"}</span>
        {`,
    )
  }

  `}
        <span className="tok-key">{"return"}</span>{" anthropic.messages."}
        <span className="tok-fn">{"create"}</span>{"({"}
        {`
    model: MODEL,
    max_tokens: MAX_OUTPUT,
    thinking: { type: `}
        <span className="tok-str">{'"enabled"'}</span>
        {", budget_tokens: THINKING_RESERVE },"}
        {`
    system, messages,
  })
}`}
      </Terminal>
      <p>
        The shape that matters: <code>countTokens</code> is a cheap metering call,
        not the expensive generation. You spend a few milliseconds to learn the
        price, reserve explicit headroom for <code>max_tokens</code> and the
        thinking budget, and fail loudly the instant a request can&apos;t fit a
        real answer — instead of discovering it as a truncated file three function
        calls later.
      </p>

      <h2>The Window as a Budget</h2>
      <p>
        Visualize one turn&apos;s context as a single bar. Everything below shares
        the same token pool; the model can only generate into whatever slice you
        leave unspent.
      </p>
      <Diagram
        label="A Claude context window broken into its competing token regions: cached system prefix, tool schemas, conversation transcript, extended-thinking blocks, and the reserved output budget."
        caption="One context window, five claimants. Output is the smallest slice — and the one that truncates first."
      >
        <svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img">
          <rect x="0" y="0" width="760" height="320" fill="#05070A" />
          <defs>
            <linearGradient id="an1-cyan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#0e3a44" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="an1-purple" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#3b1f5e" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          <text x="32" y="40" fill="#e2e8f0" fontFamily="monospace" fontSize="16" fontWeight="600">
            Context Window
          </text>
          <text x="728" y="40" fill="#64748b" fontFamily="monospace" fontSize="13" textAnchor="end">
            200K tokens (1M extended)
          </text>

          {/* The full window track */}
          <rect x="32" y="64" width="696" height="56" rx="8" fill="#0b1220" stroke="#1e293b" strokeWidth="1.5" />

          {/* Segments: cached prefix / tools / transcript / thinking / output */}
          <rect x="36" y="68" width="150" height="48" rx="5" fill="url(#an1-cyan)" stroke="#22d3ee" strokeWidth="1.5" />
          <rect x="190" y="68" width="96" height="48" rx="5" fill="url(#an1-cyan)" stroke="#22d3ee" strokeWidth="1.5" opacity="0.78" />
          <rect x="290" y="68" width="248" height="48" rx="5" fill="url(#an1-purple)" stroke="#a855f7" strokeWidth="1.5" opacity="0.82" />
          <rect x="542" y="68" width="100" height="48" rx="5" fill="url(#an1-purple)" stroke="#a855f7" strokeWidth="1.5" />
          <rect x="646" y="68" width="78" height="48" rx="5" fill="#05070A" stroke="#22d3ee" strokeWidth="2" strokeDasharray="5 4" />

          {/* Segment labels */}
          <text x="111" y="97" fill="#e2f7fb" fontFamily="monospace" fontSize="12" textAnchor="middle">cached prefix</text>
          <text x="238" y="97" fill="#e2f7fb" fontFamily="monospace" fontSize="12" textAnchor="middle">tools</text>
          <text x="414" y="97" fill="#f3e8ff" fontFamily="monospace" fontSize="12" textAnchor="middle">conversation transcript</text>
          <text x="592" y="97" fill="#f3e8ff" fontFamily="monospace" fontSize="12" textAnchor="middle">thinking</text>
          <text x="685" y="97" fill="#67e8f9" fontFamily="monospace" fontSize="11" textAnchor="middle">output</text>

          {/* Bracket: read budget */}
          <line x1="36" y1="138" x2="642" y2="138" stroke="#475569" strokeWidth="1.5" />
          <line x1="36" y1="132" x2="36" y2="144" stroke="#475569" strokeWidth="1.5" />
          <line x1="642" y1="132" x2="642" y2="144" stroke="#475569" strokeWidth="1.5" />
          <text x="339" y="160" fill="#94a3b8" fontFamily="monospace" fontSize="12" textAnchor="middle">
            what the model can READ (input)
          </text>

          {/* Bracket: write budget */}
          <line x1="646" y1="138" x2="724" y2="138" stroke="#22d3ee" strokeWidth="1.5" />
          <line x1="646" y1="132" x2="646" y2="144" stroke="#22d3ee" strokeWidth="1.5" />
          <line x1="724" y1="132" x2="724" y2="144" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="685" y="160" fill="#67e8f9" fontFamily="monospace" fontSize="11" textAnchor="middle">
            WRITE
          </text>

          {/* Failure-mode callouts */}
          <rect x="32" y="196" width="338" height="92" rx="8" fill="#0b1220" stroke="#22d3ee" strokeWidth="1.5" opacity="0.9" />
          <text x="52" y="224" fill="#67e8f9" fontFamily="monospace" fontSize="13" fontWeight="600">Read overflow →</text>
          <text x="52" y="246" fill="#cbd5e1" fontFamily="monospace" fontSize="12">oldest transcript evicted,</text>
          <text x="52" y="264" fill="#cbd5e1" fontFamily="monospace" fontSize="12">attention thins silently.</text>

          <rect x="390" y="196" width="338" height="92" rx="8" fill="#0b1220" stroke="#a855f7" strokeWidth="1.5" opacity="0.9" />
          <text x="410" y="224" fill="#c4b5fd" fontFamily="monospace" fontSize="13" fontWeight="600">Write overflow →</text>
          <text x="410" y="246" fill="#cbd5e1" fontFamily="monospace" fontSize="12">reply truncates mid-token</text>
          <text x="410" y="264" fill="#cbd5e1" fontFamily="monospace" fontSize="12">at max_tokens. No error.</text>
        </svg>
      </Diagram>
      <p>
        Internalize that bar and most &quot;the model got dumber&quot; mysteries
        dissolve into budget math. The next lesson builds directly on it:{" "}
        <a href="/blog/xml-tag-structural-prompting-deterministic-shell">
          XML-tag structural prompting
        </a>{" "}
        — how to organize what you put <em>inside</em> the window so the model
        parses it deterministically instead of guessing at structure. Or jump to{" "}
        <a href="/anthropic-roadmap">the full roadmap</a>.
      </p>
    </>
  );
}

export const masteringClaudeArchitecture: BlogPost = {
  slug: "mastering-claude-architecture-context-windows-output-limits",
  title:
    "Claude Architecture: Context Windows, Output Limits & Token Physics",
  description:
    "Claude's context window is one fixed token budget shared by your prompt, tools, thinking, and reply. How context windows and output caps really work — and how to budget them.",
  keywords: [
    "Claude context window",
    "Claude output limit",
    "token physics",
    "Claude Opus 4.8",
    "max_tokens",
    "extended thinking budget",
    "context window management",
    "Anthropic SDK",
  ],
  publishedAt: "2026-06-10",
  readingMinutes: 9,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Anthropic", "Claude", "LLM Architecture"],
  takeaways: [
    "A Claude model is a single fixed token budget: system prompt, tools, transcript, extended thinking, and the reply all compete for the same context window.",
    "Input and output are separate budgets — the context window caps what the model reads; a much smaller max-output limit caps what it writes per turn, and output is the resource that truncates first.",
    "Count tokens with the SDK before sending, and reserve explicit headroom for max_tokens and the adaptive-thinking budget so requests fail loudly instead of degrading silently.",
    "Opus 4.8 runs a 200K-token default window (1M extended); keep the static prefix stable and first so it caches instead of re-paying to re-read it every turn.",
  ],
  Body,
};
