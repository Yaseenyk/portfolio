import type { BlogPost } from "@/lib/blog";

function Body() {
  return (
    <>
      <p>
        In late 2022 the cost of writing software dropped overnight. Not
        gradually, not for early adopters — for everyone, at once. A general-
        purpose model that could read intent and emit working code turned the
        single most time-consuming part of engineering, translation, into a
        conversation. Every assumption about how long a feature takes was
        suddenly wrong.
      </p>

      <h2>From Stack Overflow to a collaborator</h2>
      <p>
        The old loop was: hit a problem, search, read three threads, adapt an
        answer, move on. The new loop collapsed that into a dialogue with a
        system that already knew the libraries, the idioms, and the edge cases.
        The friction that defined day-to-day engineering — looking things up,
        boilerplate, glue code — mostly evaporated. What remained was the part
        that was always the actual job: deciding what to build and how it should
        be shaped.
      </p>

      <h2>The bottleneck moved to judgment</h2>
      <p>
        When typing is cheap, the constraint becomes knowing what to type. The
        engineers who got faster were not the ones who prompted best; they were
        the ones who already held a clear architecture in their head and could
        direct the model toward it. The model amplifies clarity — and, just as
        ruthlessly, amplifies confusion. Point it at a vague spec and it
        generates vague software very quickly.
      </p>

      <h2>What it meant for MERN engineers</h2>
      <p>
        Full-stack developers were positioned perfectly. The MERN surface — typed
        contracts from MongoDB to React — is exactly the kind of structured,
        well-understood domain a model navigates well. The engineers who treated
        the model as a force multiplier on a sound architecture pulled ahead. The
        ones who treated it as a replacement for understanding the system shipped
        faster bugs.
      </p>

      <blockquote>
        The day code became cheap to write was the day architecture became the
        entire job. Everything since has been a footnote to that shift.
      </blockquote>

      <p>
        Everything else on this blog — RAG, orchestration, type-safe outputs —
        is downstream of that 2022 inflection. It is where the{" "}
        <a href="/#projects">work</a> went next.
      </p>
    </>
  );
}

export const chatgptChangedEngineering: BlogPost = {
  slug: "chatgpt-changed-full-stack-engineering",
  title: "The Day ChatGPT Changed Full-Stack Engineering",
  description:
    "Late 2022 dropped the cost of writing software overnight. Why the bottleneck moved from syntax to judgment — and why MERN engineers were positioned to win.",
  keywords: [
    "ChatGPT",
    "AI engineering",
    "full-stack development",
    "MERN stack",
    "software architecture",
    "developer productivity",
  ],
  publishedAt: "2026-06-06",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["AI", "Industry", "MERN"],
  takeaways: [
    "Late 2022 made writing code cheap for everyone at once, invalidating every estimate of how long features take.",
    "The bottleneck moved from typing to judgment — the model amplifies architectural clarity and confusion alike.",
    "MERN's typed, structured surface is exactly what models navigate well, positioning full-stack engineers to win.",
    "Treat AI as a multiplier on sound architecture, not a substitute for understanding the system.",
  ],
  Body,
};
