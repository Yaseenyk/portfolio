import type { BlogPost } from "@/lib/blog";

function Body() {
  return (
    <>
      <p>
        An AI engineer portfolio has one job: let a stranger verify, in a few
        minutes and without talking to you, that you have put a model into
        production and understood what happened. Most portfolios fail that test
        not because the work is weak but because the site shows a list of
        technologies instead of a system someone can inspect. This post is the
        checklist I used to build mine, with this site as the worked example,
        including the parts I got wrong.
      </p>

      <h2>What a hiring manager is actually checking</h2>
      <p>
        Nobody reading an AI engineer portfolio is impressed by the words RAG,
        agents or fine-tuning any more. They are looking for four things, in
        roughly this order.
      </p>
      <ol>
        <li>
          <strong>Does anything here run?</strong> A live system beats a
          screenshot, and a screenshot beats a bullet point.
        </li>
        <li>
          <strong>Did you make the hard decisions, or follow a tutorial?</strong>{" "}
          Retrieval thresholds, refusal behaviour, cost controls, the boundary
          between what the model proposes and what the system commits.
        </li>
        <li>
          <strong>Can you explain a trade-off in writing?</strong> One honest
          paragraph about a failure is worth more than ten about a success.
        </li>
        <li>
          <strong>Is any of it measured?</strong> Latency, cost per request,
          eval scores, a payload reduction with a before and after.
        </li>
      </ol>

      <h2>Example 1: a live, grounded assistant on the site itself</h2>
      <p>
        The strongest example an AI engineer can put on a portfolio is a
        retrieval system that answers questions about the portfolio. It is
        self-demonstrating: the visitor asks, the system cites its source, and
        when asked something the site does not cover, it refuses instead of
        guessing.
      </p>
      <p>
        On this site that is the concierge on the home page. It runs on a
        Cloudflare Worker, embeds the question with Workers AI, retrieves from
        a Vectorize index built from the site&apos;s own content, and declines
        below a confidence threshold. The same index is exposed as an MCP
        server, so a reviewer can connect it from inside Claude and interrogate
        it there. The design decisions are written up in{" "}
        <a href="/blog/semantic-caching-edge-rag/">semantic caching for edge RAG</a>{" "}
        and the pipeline is re-indexed automatically after every deploy.
      </p>
      <p>
        What makes it a portfolio piece rather than a widget is that the
        refusal path is visible. Ask it something it cannot know and watch it
        say so. That one behaviour answers the &quot;did you follow a
        tutorial&quot; question.
      </p>

      <h2>Example 2: a product with a trust boundary you can read</h2>
      <p>
        The second example is a shipped product where the AI can do damage if
        it is wrong, and the architecture stops it. For me that is{" "}
        <a href="/products/sable/">Sable</a>, a local-first finance agent. Every
        record lives in on-device SQLite with no cloud backend, and every
        action the model wants to take is rendered as a review card a person
        confirms. A hallucination&apos;s blast radius is one dismissed card.
      </p>
      <p>
        The portfolio piece is not the app. It is the{" "}
        <a href="/blog/sable-ai-agent-never-touches-money/">
          write-up of why the model never touches money
        </a>
        . A reviewer can disagree with the design, and that is the point: it
        gives them something to disagree with.
      </p>

      <h2>Example 3: a measured engineering result</h2>
      <p>
        Every AI engineer portfolio should contain at least one number that
        was measured rather than estimated, with the before and the after. Mine
        is a{" "}
        <a href="/blog/94-percent-payload-reduction-react-flow/">
          94% payload reduction
        </a>{" "}
        on a workflow engine&apos;s graph serialisation. It is not an AI
        result. It is there because it shows the habit of measuring, which is
        the same habit that makes LLM cost control and evals possible. The
        FinOps side of that habit is in the{" "}
        <a href="/blog/ai-finops-playbook-stop-burning-money/">AI FinOps playbook</a>.
      </p>

      <h2>Example 4: the operating model, written down</h2>
      <p>
        Senior roles are increasingly about how you work with AI tools, not
        only how you build AI products. A portfolio can show that directly: a
        description of the workflow, what is automated, what is reviewed, and
        what the constitution files say. Mine is in{" "}
        <a href="/blog/one-architect-claude-mcp-full-squad/">
          one architect, Claude Code and MCP
        </a>
        , with a 30-day plan a team could copy. Pipelines on this site, such as
        the weekly AI-drafted post that opens a pull request for review rather
        than publishing, are that model running in public.
      </p>

      <h2>What I got wrong, which is also an example</h2>
      <p>
        For four months this site was invisible to Google because an entrance
        animation shipped its hidden state into the static HTML, so the
        crawler&apos;s snapshot was blank. A separate mistake before that was an
        auto-publishing pipeline that flooded the site with commodity explainer
        posts, which got the whole site treated as low value. Both are
        documented in the repository and both are on this page on purpose. An
        AI engineer portfolio that admits what broke is more credible than one
        that does not, because every reviewer knows something broke.
      </p>

      <h2>A checklist you can apply to your own</h2>
      <ul>
        <li>One live system a visitor can poke, with a visible refusal or guardrail.</li>
        <li>One product where the AI could do harm and the architecture prevents it, with the reasoning written down.</li>
        <li>One measured result with a before and after, even if it is not about AI.</li>
        <li>One description of how you work with AI tools, specific enough to copy.</li>
        <li>One failure, told plainly.</li>
        <li>Source code or a repository link for at least one of the above.</li>
        <li>No fabricated metrics, testimonials or dates. Reviewers check.</li>
      </ul>
      <p>
        Templates and themes do not matter much. The list above does. If you
        would rather see the whole thing applied, the{" "}
        <a href="/projects/">projects page</a> is the index and the{" "}
        <a href="/hire/">hire page</a> is where it leads.
      </p>
    </>
  );
}

export const aiEngineerPortfolioExamples: BlogPost = {
  slug: "ai-engineer-portfolio-examples",
  title: "AI Engineer Portfolio Examples: What Reviewers Verify",
  description:
    "Four kinds of AI engineer portfolio pieces that let a reviewer verify production experience in minutes: a live grounded assistant, a product with a readable trust boundary, a measured result, and the operating model. With this site as the worked example and its failures included.",
  keywords: [
    "ai engineer portfolio",
    "ai engineer portfolio examples",
    "ai engineer portfolio projects",
    "ai engineer portfolio website",
    "machine learning portfolio examples",
  ],
  publishedAt: "2026-10-30",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "Full-Stack AI Engineer" },
  tags: ["Career", "Hiring", "RAG"],
  takeaways: [
    "Reviewers check whether anything runs, whether you made the hard decisions, whether you can explain a trade-off, and whether anything is measured.",
    "The strongest piece is a live retrieval assistant on the portfolio itself, with a visible refusal path and its index exposed as an MCP server.",
    "A product with a readable trust boundary, such as a propose-and-confirm agent, gives reviewers something to disagree with, which is the point.",
    "Include one measured before-and-after result and one plainly told failure; both raise credibility more than another success.",
  ],
  Body,
};
