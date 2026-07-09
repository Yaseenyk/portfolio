import type { BlogPost } from "@/lib/blog";

function Body() {
  return (
    <>
      <p>
        Networking is a numbers game played with hours you don&apos;t have.
        Writing a good LinkedIn post takes an evening; doing it consistently
        takes a discipline that competes with actually building things. So I
        treated my own visibility as an engineering problem and shipped a
        product for it: an autonomous pipeline that turns my real work into
        scheduled LinkedIn content, publishes it, and tracks its own state —
        entirely on free infrastructure. My network started growing while I
        slept.
      </p>

      <h2>How do you automate LinkedIn content for $0?</h2>
      <p>
        The system is deliberately boring, which is the point. A GitHub Actions
        workflow wakes on a cron schedule. It reads a content queue, generates
        the post draft from the queued topic, publishes to LinkedIn, and then —
        the part most automation skips — commits its own state back to the
        repository in a <code>published.json</code> ledger. The Git history is
        the database. There is no server to babysit, no dashboard subscription,
        no runtime cost. If it ever misfires, the ledger is a diff I can read
        and revert like any other commit.
      </p>

      <h2>Automation with a quality gate</h2>
      <p>
        The word &quot;bot&quot; earns its bad reputation from systems that
        publish without judgment. Mine has a human trust boundary in the same
        place all my products do: the queue. Nothing enters it that I
        haven&apos;t decided is worth saying — the pipeline automates the{" "}
        <em>showing up</em>, not the <em>thinking</em>. It is the same
        propose/confirm split that governs my finance agent: the machine
        handles cadence and delivery, the human owns the content decisions
        that carry my name.
      </p>

      <blockquote>
        Consistency is a systems property, not a personality trait. If
        showing up matters and humans are bad at it, that is not a
        self-improvement problem — that is a pipeline waiting to be built.
      </blockquote>

      <h2>What it changed</h2>
      <p>
        The pipeline did what consistency always does: compounded. Posts went
        out on schedule through weeks when I was heads-down shipping Sable and
        streamerOS — precisely the weeks I would previously have gone silent.
        Profile visits, connection requests, and recruiter conversations
        arrived on the pipeline&apos;s schedule instead of my energy
        level&apos;s. The product&apos;s full architecture breakdown lives{" "}
        <a href="/products/linkedin-pipeline">on its product page</a>.
      </p>

      <h2>The transferable lesson for companies</h2>
      <p>
        Every company has a version of this problem: work that is valuable,
        repetitive, and chronically skipped because it competes with
        &quot;real&quot; work — release notes, changelogs, status updates,
        onboarding emails, documentation refreshes. The pattern that fixed my
        networking fixes those too: a queue a human curates, a scheduled
        worker that executes, state committed somewhere auditable, and zero
        new infrastructure to own. I&apos;ve now built that pattern three
        times (content, outreach, and blog publishing) — it takes days, not
        quarters, and it never calls in sick.
      </p>
    </>
  );
}

export const linkedinPipelineStory: BlogPost = {
  slug: "linkedin-pipeline-job-search-runs-itself",
  title:
    "My Networking Runs Itself: The LinkedIn Pipeline That Grew My Reach While I Slept",
  description:
    "How I engineered consistency: an autonomous GitHub Actions pipeline that turns real work into scheduled LinkedIn posts, tracks state in Git, costs $0 to run — and what the same pattern automates inside a company.",
  keywords: [
    "LinkedIn automation pipeline",
    "GitHub Actions automation",
    "personal brand engineering",
    "autonomous content pipeline",
    "developer marketing automation",
    "zero cost infrastructure",
  ],
  publishedAt: "2026-07-07",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Founder's Log", "Automation", "Products"],
  takeaways: [
    "Consistency is a systems property: a cron-driven GitHub Actions pipeline publishes to LinkedIn and commits its own state ledger back to Git.",
    "The human trust boundary is the queue — the machine automates showing up, never the judgment about what carries my name.",
    "The pipeline kept publishing through heads-down building weeks, so recruiter conversations arrived on its schedule, not my energy level's.",
    "The same queue → scheduled worker → auditable state pattern automates any valuable-but-skipped work inside a company, in days.",
  ],
  Body,
};
