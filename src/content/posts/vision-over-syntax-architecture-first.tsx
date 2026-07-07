import type { BlogPost } from "@/lib/blog";

function Body() {
  return (
    <>
      <p>
        Every product I have shipped began the same way: not with{" "}
        <code>npm create</code>, but with days of thinking until I could see
        the entire system — the data&apos;s journey, the trust boundaries, the
        failure modes, the cost curve — before writing a single line. Syntax is
        a solved problem in 2026. Vision is not. This post is about the part of
        engineering that no model generates for you.
      </p>

      <h2>The whiteboard test</h2>
      <p>
        Before I opened an editor for Sable, my finance agent, I could answer
        these on a whiteboard: Where does the data live? (On-device SQLite —
        nowhere else, ever.) What is the model allowed to do? (Propose, never
        commit.) What happens when two writes collide? (A queue serializes
        them.) What does day 30 look like for the user? (A morning briefing
        that reads their real numbers.) When you can answer questions like
        these before coding, the build becomes transcription. When you
        can&apos;t, no amount of generated code will save the product — you
        will just arrive at the wrong destination faster.
      </p>

      <h2>Architecture is a set of refusals</h2>
      <p>
        The strongest decisions in my products are the things they refuse to
        do. streamerOS refuses to send chat data to a server — it ingests
        Twitch and YouTube directly on the user&apos;s machine. Sable refuses
        to let the LLM mutate the database — every write passes a human
        Review &amp; Confirm gate. The blog pipeline refuses to own a CMS, a
        database, or a server — its state is the Git history. Each refusal
        deleted an entire class of cost, risk, and maintenance from the
        product&apos;s future.
      </p>
      <blockquote>
        Junior engineers add capabilities. Architects delete futures. Every
        &quot;no&quot; made early is a pager that never goes off, an invoice
        that never arrives, a breach that never happens.
      </blockquote>

      <h2>Why this matters more than ever</h2>
      <p>
        AI collapsed the cost of implementation to near zero — which means the
        value of knowing <em>what to implement</em> has gone vertical. Two
        engineers with the same Claude subscription will produce wildly
        different outcomes, and the difference is entirely in the quality of
        the questions they ask before generating anything. My job, as I
        practice it, is to be the person in the room who has already thought
        three layers deeper than the ticket: not &quot;build the export
        feature,&quot; but &quot;what schema makes exports free forever?&quot;
      </p>

      <h2>How I run the thinking phase</h2>
      <ul>
        <li>
          <strong>Write the data contract first.</strong> One authoritative
          schema. Every layer — DB, API, UI, even the AI&apos;s structured
          outputs — is generated to satisfy it.
        </li>
        <li>
          <strong>Name the trust boundaries.</strong> Who can do what, and what
          can the model never do? These lines are drawn before the first
          prompt, because they are unpromptable.
        </li>
        <li>
          <strong>Price the architecture.</strong> Every design gets a cost
          model — tokens, storage, compute — before it gets code. A design that
          doesn&apos;t know its own unit economics is a demo.
        </li>
        <li>
          <strong>Only then, orchestrate.</strong> With contracts, boundaries,
          and costs fixed, Claude fills the layers at a speed no team can
          match — because there is nothing left to be ambiguous about.
        </li>
      </ul>

      <p>
        Recruiters read a hundred résumés that say &quot;proficient in React,
        Node, TypeScript.&quot; Fine — so is the model. The question worth
        asking a candidate is: <em>show me a system you refused to build the
        easy way, and what that refusal bought.</em> I have{" "}
        <a href="/products">five answers deployed</a>.
      </p>
    </>
  );
}

export const visionOverSyntax: BlogPost = {
  slug: "vision-over-syntax-architecture-first",
  title:
    "Vision Over Syntax: I Design the Entire Product in My Head Before the First Commit",
  description:
    "Syntax is solved; vision is not. How architecture-first thinking — data contracts, trust boundaries, and deliberate refusals — is the real engineering skill in the AI era, shown through shipped products.",
  keywords: [
    "software architecture thinking",
    "vision driven engineering",
    "architecture first development",
    "AI era engineering skills",
    "systems design",
    "hire software architect",
  ],
  publishedAt: "2026-07-07",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Founder's Log", "Vision", "Architecture"],
  takeaways: [
    "Every shipped product started as a complete mental model — data flow, trust boundaries, failure modes, cost curve — before any code.",
    "The strongest architecture decisions are refusals: what the system will never do deletes entire classes of future cost and risk.",
    "AI made implementation nearly free, which makes knowing what to implement the highest-leverage skill in engineering.",
    "The thinking phase runs on four artifacts: a data contract, named trust boundaries, a cost model, and only then AI orchestration.",
  ],
  Body,
};
