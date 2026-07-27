import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";

export const meta: GuideMeta = {
  slug: "final-year-project-report-format",
  title: "Final Year Project Report Format — Chapter By Chapter",
  h1: "Final year project report format, chapter by chapter",
  description:
    "The standard structure of a final year project report for BCA, MCA and B.Tech, what belongs in each chapter, the diagrams you need, and the mistakes that cost marks at submission.",
  category: "Documentation",
  publishedAt: "2026-07-27",
  readingMinutes: 10,
  faq: [
    {
      question: "How many pages should a final year project report be?",
      answer:
        "Most colleges expect between 50 and 80 pages for BCA and MCA, and 60 to 100 for B.Tech, but your department's format document overrides any general guidance. Padding is obvious and counts against you — a tight 55-page report where every diagram matches the code beats an inflated 90-page one.",
    },
    {
      question: "Which diagrams are required in a project report?",
      answer:
        "At minimum an ER diagram, a data flow diagram, and a use case diagram. Most departments also want a class diagram or sequence diagram for at least the core flow. Every one of them must match the code you are submitting, because panels check.",
    },
    {
      question: "What is the difference between a synopsis and a report?",
      answer:
        "The synopsis is submitted for approval before you build, and is usually 8 to 15 pages: the problem, the proposed solution, the tools, and a timeline. The report is written after, documents what you actually built, and includes the full design, testing and results.",
    },
  ],
};

export function Body() {
  return (
    <>
      <p>
        Your department has a format document. It overrides everything below — get
        it, read it, follow it exactly on margins, font, line spacing and binding,
        because those are the marks nobody should ever lose. What follows is the
        structure almost every Indian college converges on, and more usefully, what
        actually belongs inside each chapter.
      </p>
      <p>
        One rule matters more than all of the structure: <strong>the report must
        describe the code you are submitting.</strong> The most common way students
        lose marks here is a report describing a system slightly different from the
        one on the laptop. Panels check, and a mismatch reads as evidence that
        neither was made by you.
      </p>

      <h2>Front matter</h2>
      <ul>
        <li>Title page in your college&rsquo;s exact format</li>
        <li>Certificate from your guide, signed</li>
        <li>Declaration that the work is your own</li>
        <li>Acknowledgement</li>
        <li>Abstract — 200 to 300 words, written last</li>
        <li>Table of contents, list of figures, list of tables</li>
      </ul>
      <p>
        The abstract is written last and is the only page many examiners read
        closely before meeting you. It should state the problem, what you built, the
        technologies, and the outcome — in that order, without adjectives.
      </p>

      <h2>Chapter 1 — Introduction</h2>
      <ul>
        <li>The problem, stated concretely rather than in generalities</li>
        <li>Why it matters and who it affects</li>
        <li>Objectives, as a numbered list you can be held to</li>
        <li>Scope — and explicitly, what is out of scope</li>
        <li>Organisation of the report</li>
      </ul>
      <p>
        Write the out-of-scope list properly. It is the cheapest defence you have in
        a viva: &ldquo;why does it not do X&rdquo; is fully answered by pointing at
        a scope you declared in chapter one.
      </p>

      <h2>Chapter 2 — Literature survey / existing system</h2>
      <ul>
        <li>What already exists — real named systems, not vague statements</li>
        <li>What each one does badly, specifically</li>
        <li>How your project addresses that gap</li>
        <li>Comparison table of existing systems against yours</li>
      </ul>
      <p>
        For MCA and M.Tech this chapter should cite actual papers. For BCA a survey
        of existing applications is usually enough. Either way, be specific — a
        panel that recognises the systems you are dismissing will ask whether you
        used them.
      </p>

      <h2>Chapter 3 — System analysis</h2>
      <ul>
        <li>Feasibility: technical, economic, operational</li>
        <li>Functional requirements, numbered</li>
        <li>Non-functional requirements — performance, security, usability</li>
        <li>Hardware and software requirements</li>
        <li>Use case diagram and use case descriptions</li>
      </ul>
      <p>
        Number your functional requirements. It lets you map each one to a test case
        in chapter six, and that mapping is one of the easiest ways to look rigorous.
      </p>

      <h2>Chapter 4 — System design</h2>
      <p>The chapter that carries the most marks. It needs:</p>
      <ul>
        <li>Architecture diagram — the boxes and what flows between them</li>
        <li>ER diagram matching your actual database</li>
        <li>Data flow diagrams, level 0 and level 1 at minimum</li>
        <li>Class diagram or sequence diagram for the core flow</li>
        <li>Database schema — every table, column, type, and constraint</li>
        <li>Interface design — screen layouts and navigation</li>
      </ul>
      <p>
        Include a short justification under each major decision: why this database,
        why this table is separate, why this flow is asynchronous. Two sentences
        each. Those sentences are your viva answers, written down in advance while
        you still remember the reasoning.
      </p>

      <h2>Chapter 5 — Implementation</h2>
      <ul>
        <li>Technologies used and why each was chosen</li>
        <li>Module-by-module description of what was built</li>
        <li>Key algorithms, in pseudocode</li>
        <li>Selected code snippets — the interesting parts only</li>
        <li>Screenshots of the working application</li>
      </ul>
      <p>
        Do not paste your entire codebase. Nobody reads a forty-page appendix of
        source, and it signals padding. Include the parts that required a decision,
        with a paragraph explaining each.
      </p>

      <h2>Chapter 6 — Testing</h2>
      <ul>
        <li>Testing strategy — unit, integration, system, user acceptance</li>
        <li>A test case table: input, expected output, actual output, pass or fail</li>
        <li>Screenshots of tests running or of validation being triggered</li>
        <li>Known bugs and limitations</li>
      </ul>
      <p>
        Include tests that fail gracefully — invalid input, unauthorised access,
        empty submission. A test table containing only passes looks fabricated. A
        table showing that bad input is caught and handled looks like engineering.
      </p>

      <h2>Chapter 7 — Results and discussion</h2>
      <ul>
        <li>What the system achieves against each objective from chapter one</li>
        <li>Performance figures, if relevant</li>
        <li>For ML projects: metrics, confusion matrix, and error analysis</li>
        <li>An honest discussion of limitations</li>
      </ul>

      <h2>Chapter 8 — Conclusion and future scope</h2>
      <p>
        Short. What was built, what was learned, and three or four specific
        extensions. Make the future scope concrete — &ldquo;add multi-language
        support using the existing translation layer&rdquo; rather than &ldquo;the
        system can be enhanced further&rdquo;.
      </p>

      <h2>Back matter</h2>
      <ul>
        <li>References in your department&rsquo;s citation style</li>
        <li>Appendices — full schema, extended code, questionnaires</li>
      </ul>

      <h2>The five mistakes that actually cost marks</h2>
      <ol>
        <li>
          <strong>Diagrams that do not match the code.</strong> An ER diagram with
          seven tables and a database with four. This is the single most common
          reason a viva turns hostile.
        </li>
        <li>
          <strong>Padding.</strong> Forty pages of pasted source, three pages on the
          history of the internet. Examiners have read hundreds of these and spot it
          instantly.
        </li>
        <li>
          <strong>Screenshots with placeholder data.</strong> &ldquo;asdf&rdquo; and
          &ldquo;test test&rdquo; in every field. Seed realistic data before you
          capture screenshots.
        </li>
        <li>
          <strong>No limitations section.</strong> Every system has limits. Claiming
          none invites the panel to find them for you, in front of everyone.
        </li>
        <li>
          <strong>Format violations.</strong> Wrong margins, wrong font, missing
          certificate. Free marks, thrown away at the printer.
        </li>
      </ol>

      <hr />

      <p>
        Every project on this site ships with the report, the synopsis, the diagrams
        and the deck already written to match the code — because a report that
        matches the code is exactly the thing students run out of time to do.{" "}
        <Link href="/final-year-projects">See the projects</Link>, or read{" "}
        <Link href="/final-year-projects/guides/final-year-project-viva-questions">
          the viva questions panels actually ask
        </Link>
        .
      </p>
    </>
  );
}
