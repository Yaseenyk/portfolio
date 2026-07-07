import type { BlogPost } from "@/lib/blog";

function Body() {
  return (
    <>
      <p>
        The blog you are reading is partly written by an employee who costs me
        nothing. Twice a week, on a cron schedule, a pipeline wakes up inside
        this site&apos;s own repository: it pulls the next topic from a plain
        text queue, drafts a technical article with Gemini, writes it as an
        MDX file, commits it, and lets the deploy workflow publish the static
        site. No CMS. No database. No server. The steady-state bill is exactly
        $0 — and it has never missed a deadline.
      </p>

      <h2>The whole stack is a Git repository</h2>
      <p>
        The design bet was to refuse infrastructure. The content queue is{" "}
        <code>scripts/topics.txt</code> — one topic per line, consumed
        top-down, editable with a normal commit. The &quot;database&quot; is
        the Git history. The &quot;deploy hook&quot; is a push to{" "}
        <code>main</code>. The writer is a small Python script using the{" "}
        <code>google-genai</code> SDK against <code>gemini-2.5-flash</code>,
        and — crucially — the script, not the model, owns the slug, the date,
        and the frontmatter, so a malformed response can never corrupt the
        typed build. Every article is a commit I can diff, revert, or edit by
        hand.
      </p>

      <h2>Discipline is what makes it free</h2>
      <ul>
        <li>
          <strong>Static export:</strong> Next.js compiles the entire site to
          plain HTML at build time — GitHub Pages serves it for free, with no
          runtime to secure or scale.
        </li>
        <li>
          <strong>Free compute at the edges:</strong> GitHub Actions runs both
          the writer and the deploy inside free-tier minutes, because the jobs
          are minutes long by design.
        </li>
        <li>
          <strong>Model as contractor, script as employer:</strong> the LLM is
          invoked for prose only; structure, validation, and publishing remain
          deterministic code. That boundary is why the pipeline is trustable
          enough to run unattended.
        </li>
      </ul>

      <blockquote>
        Everyone building with AI eventually learns the same lesson: the model
        is the cheap part. What you pay for — in money and in incidents — is
        the infrastructure you wrap around it. So I wrapped it in nothing.
      </blockquote>

      <h2>Why a hiring manager should care</h2>
      <p>
        This little system demonstrates the judgment that expensive cloud
        architectures often lack: knowing when the correct amount of
        infrastructure is <em>none</em>. The same instinct scales up. Before I
        reach for a queue service, a serverless fleet, or a vector database
        with a monthly invoice, I ask what the Git-history version of the
        solution looks like — and a surprising fraction of the time, it is
        good enough to ship and cheap enough to forget.
      </p>
      <p>
        An SEO-ready technical blog that grows itself is a real business
        asset — content compounds into search traffic, authority, and
        inbound interest. Mine costs zero and runs on rails I built in days.
        The full teardown, including the workflow YAML and the writer script,
        is on the <a href="/products/ai-blogger">product page</a>.
      </p>
    </>
  );
}

export const zeroDollarContentEngine: BlogPost = {
  slug: "zero-dollar-content-engine",
  title:
    "The $0 Content Engine: My Blog Writes, Commits, and Deploys Itself Twice a Week",
  description:
    "A cron-scheduled pipeline drafts articles with Gemini, writes MDX, commits to Git, and redeploys the static site — no CMS, no server, no database, no bill. The architecture of refusing infrastructure.",
  keywords: [
    "autonomous blog pipeline",
    "AI content automation",
    "zero cost infrastructure",
    "GitHub Actions cron",
    "static site automation",
    "Gemini API pipeline",
  ],
  publishedAt: "2026-07-07",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Founder's Log", "Automation", "Products"],
  takeaways: [
    "The pipeline's entire stack is a Git repository: topics.txt is the queue, the Git history is the database, a push is the deploy hook.",
    "The script — not the model — owns slugs, dates, and frontmatter, so a malformed LLM response can never corrupt the typed build.",
    "Static export + free-tier Actions minutes make the steady-state cost exactly $0.",
    "The transferable judgment: knowing when the correct amount of infrastructure is none.",
  ],
  Body,
};
