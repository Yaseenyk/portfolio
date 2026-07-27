import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";

export const meta: GuideMeta = {
  slug: "final-year-project-viva-questions",
  title: "Final Year Project Viva Questions (And How To Answer Them)",
  h1: "Final year project viva questions — and how to actually answer them",
  description:
    "The questions panels really ask in a final year project viva, grouped by what they are testing, with the reasoning behind a good answer. Written by an engineer who builds these systems for a living.",
  category: "Viva prep",
  publishedAt: "2026-07-27",
  readingMinutes: 11,
  faq: [
    {
      question: "What is asked in a final year project viva?",
      answer:
        "Panels ask four kinds of question: what your project does, why you made each design choice, what happens when something goes wrong, and what you would change if you rebuilt it. The first is easy to prepare. The other three are where students lose marks, because they can only be answered by someone who understands the code rather than someone who memorised a description.",
    },
    {
      question: "How do I prepare for a project viva in a week?",
      answer:
        "Stop rehearsing your presentation and start explaining your code out loud. Pick each file in turn and say what it does and why it exists. Anything you cannot explain in a sentence is a question you will be asked. Then have someone who understands code ask you why you made each choice.",
    },
    {
      question: "What if I cannot answer a viva question?",
      answer:
        "Say so, then reason out loud towards an answer. Panels are far more forgiving of a student who says 'I am not certain, but I would expect it to fail here because...' than one who invents something confidently. Bluffing is the fastest way to invite three harder follow-up questions.",
    },
  ],
};

export function Body() {
  return (
    <>
      <p>
        Most students prepare for a viva by rehearsing what their project does.
        Panels already know what it does — it is written on the front of your
        report. What they are testing is whether you built it, and there is a
        specific set of questions designed to establish that in under five minutes.
      </p>
      <p>
        Below are the questions that actually get asked, grouped by what each one
        is really testing. The trick is not memorising answers. It is
        understanding why the question exists, because panels follow up.
      </p>

      <h2>Category 1 — Does this run, and did you run it?</h2>
      <p>
        The opening questions. They sound trivial and they are eliminating
        candidates.
      </p>
      <ul>
        <li>Show me the project running. Not the presentation — the application.</li>
        <li>Where is this deployed? Can you run it right now on this machine?</li>
        <li>How long does it take to set up from scratch on a fresh system?</li>
        <li>What are the dependencies, and why those versions?</li>
        <li>Show me the database. Open it and show me a real record.</li>
      </ul>
      <p>
        <strong>What they are testing:</strong> whether you have ever run this
        outside a screenshot. A student who bought a project cannot usually get it
        running on an unfamiliar laptop, and panels know it.
      </p>

      <h2>Category 2 — Why did you build it this way?</h2>
      <p>
        This is where most of the marks live, and where memorised answers collapse.
        Every one of these has a follow-up.
      </p>
      <ul>
        <li>Why this database? Why not the other kind?</li>
        <li>Why did you normalise this table — or why did you not?</li>
        <li>Why is this a separate module instead of one file?</li>
        <li>Why this framework? What would break if you had used a different one?</li>
        <li>Why this algorithm? What is its complexity, and does that matter here?</li>
        <li>Where is the business logic — in the frontend or the backend? Why there?</li>
        <li>What happens to this design if you have a hundred thousand records?</li>
      </ul>
      <p>
        <strong>How to answer:</strong> name the alternative you rejected and why.
        &ldquo;I used a relational database because the data has fixed relationships
        and I need joins across four tables; a document store would have meant
        duplicating the patient record in every appointment&rdquo; is a complete
        answer. &ldquo;Because it is popular&rdquo; is not an answer, and the panel
        will keep going until they find the bottom of your understanding.
      </p>

      <h2>Category 3 — What happens when it goes wrong?</h2>
      <p>
        The single most under-prepared category, and the easiest to score on
        because so few students expect it.
      </p>
      <ul>
        <li>What happens if two users do this at the same time?</li>
        <li>What if I enter a negative number here? Show me.</li>
        <li>What if the network drops halfway through this operation?</li>
        <li>Can I access this page without logging in? Try it.</li>
        <li>What happens if the file I upload is not the format you expect?</li>
        <li>Where are passwords stored, and in what form?</li>
        <li>What is the largest input this can handle before it becomes unusable?</li>
      </ul>
      <p>
        <strong>What they are testing:</strong> whether you thought past the happy
        path. If your project handles even two of these gracefully, say so before
        you are asked — demonstrate the failure and show it being handled. It
        reframes the entire viva.
      </p>

      <h2>Category 4 — Do you understand your own code?</h2>
      <p>
        Usually delivered by opening a random file and pointing at a line.
      </p>
      <ul>
        <li>Explain this function. What does it return, and who calls it?</li>
        <li>What does this line do? Why is it necessary?</li>
        <li>Delete this line — what breaks?</li>
        <li>Where does this variable come from?</li>
        <li>Walk me through what happens between clicking this button and the database changing.</li>
        <li>Which part of this did you find hardest, and why?</li>
      </ul>
      <p>
        That last one is not small talk. A student who built something has an
        immediate, specific answer with a story attached. A student who did not
        gives a vague one. Have a real answer ready — a genuine problem you hit and
        how you got past it.
      </p>

      <h2>Category 5 — Machine learning and AI projects</h2>
      <p>If your project involves a model, add these:</p>
      <ul>
        <li>Where did your dataset come from, and how large is it?</li>
        <li>How did you split training and test data? Why that split?</li>
        <li>What is your accuracy — and why is accuracy the wrong metric here?</li>
        <li>What is overfitting, and how do you know your model is not?</li>
        <li>What does this model get wrong? Show me a case where it fails.</li>
        <li>Could you have solved this without machine learning?</li>
        <li>If this is an LLM project: how do you stop it from making things up?</li>
      </ul>
      <p>
        The strongest possible answer to &ldquo;what does it get wrong&rdquo; is a
        prepared example. Walk in knowing a case where your model fails and be able
        to explain why. It signals that you evaluated your work rather than
        celebrating it.
      </p>

      <h2>Category 6 — The closing questions</h2>
      <ul>
        <li>What would you do differently if you started again?</li>
        <li>What would you add with another three months?</li>
        <li>What did you learn that you did not expect to?</li>
        <li>Is any of this actually useful to anyone? Who would use it?</li>
      </ul>
      <p>
        Have a real, specific answer to the first one. &ldquo;I would separate the
        business logic out of the route handlers, because by the end they were
        doing three things each and testing them was painful&rdquo; tells a panel
        more about your ability than the entire demonstration did.
      </p>

      <h2>The rule that matters more than any answer</h2>
      <p>
        When you do not know, say you do not know — then reason out loud towards an
        answer. &ldquo;I have not tested that, but I would expect it to fail here,
        because nothing validates that input before it reaches the query&rdquo; will
        be marked well. Panels are experienced people who have watched hundreds of
        students bluff, and a confident invention is what turns one question into
        four.
      </p>

      <h2>How to prepare in the week you have left</h2>
      <ol>
        <li>
          Open every file in turn. Say out loud what it does and why it exists.
          Anything you stumble on is a question you will be asked.
        </li>
        <li>
          Break your own project deliberately. Enter bad input, skip the login,
          disconnect the database. Know what happens.
        </li>
        <li>
          Write down the three design decisions you are least sure about. Those are
          the ones the panel will find.
        </li>
        <li>
          Have someone who understands code ask you &ldquo;why&rdquo; five times in
          a row about the same decision. If you reach &ldquo;I do not know&rdquo; at
          level two, that is your weak spot.
        </li>
      </ol>

      <hr />

      <p>
        That last step is the one students cannot do alone, and it is exactly what
        the sessions on this site exist for. Every project is built for you and
        then walked through line by line, ending in a mock viva where these are the
        questions you get asked — while there is still time to fix the answers.
      </p>
      <p>
        <Link href="/final-year-projects">See the projects</Link>, or{" "}
        <Link href="/final-year-projects/custom">
          have your own idea built from scratch
        </Link>
        .
      </p>
    </>
  );
}
