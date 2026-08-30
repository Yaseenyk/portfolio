import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";

export const meta: GuideMeta = {
  slug: "how-to-explain-your-project-in-the-viva",
  title: "How to Explain Your Final Year Project in the Viva",
  h1: "How to explain your final year project in the viva",
  description:
    "How to confidently walk a panel through your own project: the two-minute overview, narrating your architecture and ER diagram, defending your choices, and what to say when you do not know.",
  tldr: "Explain your project by leading the panel rather than waiting to be quizzed: open with a rehearsed two-minute overview — problem, what you built, stack, core flow, one honest limitation — then narrate your architecture and ER diagram and defend each choice. When you do not know something, say so and reason out loud instead of bluffing.",
  category: "Viva prep",
  publishedAt: "2026-07-27",
  readingMinutes: 10,
  ogImage: "/og/campus/question-bank.jpg",
  faq: [
    {
      question: "How do I start explaining my project in the viva?",
      answer:
        "With a rehearsed two-minute overview: the problem in one sentence, what you built in one sentence, the stack in one, the core flow in two, and one honest limitation. It sets the frame so the panel asks about what you have prepared rather than probing for a story you never told.",
    },
    {
      question: "What should I do if I do not know the answer to a viva question?",
      answer:
        "Do not bluff — panels have heard every bluff. Say plainly what you do know, reason out loud toward the answer, and if it is a design decision you did not take, say so and explain what you would consider. A calm 'I did not implement that; here is how I would' beats a confident wrong answer every time.",
    },
    {
      question: "How is explaining your project different from answering viva questions?",
      answer:
        "Answering questions is reactive — you respond to what the panel asks. Explaining your project is proactive: you walk them through your own system in a structure you chose, which lets you steer the viva toward the parts you understand best. Do the proactive part well and there are far fewer hostile questions left to answer.",
    },
  ],
};

export function Body() {
  return (
    <>
      <p>
        A viva is not an interrogation you survive. It is a walkthrough you lead.
        The students who do well are not the ones who memorised the most answers —
        they are the ones who can take a panel through their own project in a
        clear, confident structure, so that most of the questions are already
        answered before they are asked. This guide is about that skill: walking
        your own project. For the question bank, see{" "}
        <Link href="/final-year-projects/guides/final-year-project-viva-questions/">
          the viva questions panels actually ask
        </Link>{" "}
        — here we cover how to present the whole thing on your own terms.
      </p>

      <h2>Structure the two-minute overview</h2>
      <p>
        Most vivas open with some version of &ldquo;so, tell us about your
        project.&rdquo; This is the most important two minutes you will get,
        because it sets the frame for everything after. Do not improvise it.
        Rehearse it to a fixed shape:
      </p>
      <ul>
        <li>The problem, in one sentence — concrete, not &ldquo;in today&rsquo;s world&rdquo;</li>
        <li>What you built, in one sentence</li>
        <li>The stack, in one sentence</li>
        <li>The core flow, in two sentences — what happens end to end</li>
        <li>One honest limitation, stated before they find it</li>
      </ul>
      <p>
        That last line does more work than it looks. Naming a limitation yourself
        signals that you understand the system&rsquo;s edges, and it quietly steers
        the panel toward the boundary <em>you</em> chose to discuss rather than one
        they went looking for. End the overview on it and you have set the agenda.
      </p>

      <h2>Narrate the architecture, ER and DFD</h2>
      <p>
        At some point you will be asked to explain a diagram — the architecture,
        the ER diagram, or a data flow diagram. The failure mode here is reading
        the diagram aloud: &ldquo;this is the user table, it connects to the orders
        table.&rdquo; The panel can see that. What they want is the <em>why</em>.
      </p>
      <p>Narrate a diagram as a story of decisions, not a list of boxes:</p>
      <ul>
        <li>
          <strong>Architecture:</strong> trace one request through the system —
          &ldquo;the user submits here, the request goes to this service, which
          writes to this database and returns this.&rdquo; Movement, not boxes.
        </li>
        <li>
          <strong>ER diagram:</strong> explain why entities are separate and why
          the relationships are what they are — &ldquo;orders and users are
          separate because one user has many orders, so the foreign key lives
          here.&rdquo;
        </li>
        <li>
          <strong>DFD:</strong> follow the data, not the screens — where it enters,
          what transforms it, where it comes to rest.
        </li>
      </ul>
      <p>
        This only works if the diagrams match the code you submitted. A diagram
        with seven tables in front of a database with four is the single fastest
        way to turn a panel hostile. If you are not certain yours line up, fix that
        before anything else — the{" "}
        <Link href="/final-year-projects/guides/final-year-project-report-format/">
          report format guide
        </Link>{" "}
        covers which diagrams must agree with the code and why.
      </p>

      <h2>Answer &ldquo;why did you choose X&rdquo;</h2>
      <p>
        Every project attracts a handful of &ldquo;why did you choose&rdquo;
        questions — why this database, why this framework, why this algorithm. The
        trap is answering with popularity: &ldquo;because it is the most used.&rdquo;
        That invites the follow-up you cannot answer.
      </p>
      <p>
        Answer with a trade-off instead. A good justification names the
        alternative and says why yours fit <em>this</em> project:
        &ldquo;I used a document database because the records are nested and read
        far more than they are written; a relational schema would have meant
        several joins on every read.&rdquo; You do not need the deepest answer in
        the room — you need to show you made a choice rather than copied one. Write
        these two-sentence justifications down while you build, for every real
        decision, and the viva version is just reading your own reasoning back.
      </p>

      <h2>Handle &ldquo;what would you improve?&rdquo;</h2>
      <p>
        This question is not a trap and it is not asking you to confess failure. It
        is checking whether you can see your own system clearly. The wrong answers
        are &ldquo;nothing, it is complete&rdquo; (nobody believes it) and a vague
        &ldquo;I would add more features.&rdquo;
      </p>
      <p>
        Give two or three <em>specific, informed</em> improvements that show you
        understand the system&rsquo;s real limits: &ldquo;caching on this read path
        because it is the slowest,&rdquo; &ldquo;a queue here so this step does not
        block the response,&rdquo; &ldquo;more training data for the class the model
        currently confuses.&rdquo; Naming the exact weakness and the exact fix is
        the most senior thing you can do in a viva. It reads as engineering
        judgment, which is what the question is actually testing.
      </p>

      <h2>What to do when you do not know</h2>
      <p>
        You will get a question you cannot answer. This is normal and it is not
        the disaster it feels like — how you handle it matters more than the gap
        itself. The one fatal move is bluffing, because panels have heard every
        bluff and the follow-up exposes it in seconds.
      </p>
      <p>Instead:</p>
      <ul>
        <li>
          Say what you <em>do</em> know around the edge of the question, so the
          panel sees the boundary of your understanding rather than a blank.
        </li>
        <li>
          Reason out loud toward it — &ldquo;I have not measured that, but I would
          expect it to slow down here because&hellip;&rdquo; Working toward an
          answer earns credit that silence does not.
        </li>
        <li>
          If it is a decision you simply did not take, say so plainly and say what
          you would consider. &ldquo;I did not implement that; if I did, I would
          approach it this way&rdquo; is a strong answer, not a weak one.
        </li>
      </ul>
      <p>
        A calm, honest &ldquo;I do not know, but here is how I would find
        out&rdquo; leaves a far better impression than a confident wrong answer.
        Panels are testing judgment as much as knowledge, and admitting a limit
        cleanly demonstrates exactly the judgment they want to see.
      </p>

      <h2>Rehearse it as a walkthrough, not a Q&amp;A</h2>
      <p>
        Preparation for most students means reading a list of likely questions the
        night before. Do that too, but it is the smaller half. The larger half is
        rehearsing the <em>walkthrough</em> — the two-minute overview, the diagram
        narration, the justifications — out loud, ideally to another person, until
        it is smooth. When you can walk your own project confidently, you control
        the room, and there are simply fewer hostile questions left to be asked.
      </p>

      <hr />

      <p>
        The reason vivas go wrong is rarely a hard question — it is a project the
        student did not fully build or fully understand, defended on nerve. If that
        is where you are, the honest fix is a project built and documented for you
        and then walked through line by line in daily live sessions, until the
        overview, the diagrams and the justifications are genuinely yours to give.
        Every tier ships with the full source code, and seats are capped per
        college so no two students defend the same submission.{" "}
        <Link href="/final-year-projects/custom/">Start a custom build</Link>, see{" "}
        <Link href="/final-year-projects/ai-college-assistant/">
          the AI college assistant
        </Link>{" "}
        for a project with plenty to explain, or read{" "}
        <Link href="/final-year-projects/guides/final-year-project-viva-questions/">
          the viva questions guide
        </Link>{" "}
        next.
      </p>
    </>
  );
}
