import type { BlogPost } from "@/lib/blog";

function Body() {
  return (
    <>
      <p>
        In September 2021 I started my first developer job at Manorama
        Infosolutions, a healthcare software company. The stack was ASP.NET on
        the backend and React on the front. Nothing about it was glamorous.
        Hospital information systems don&apos;t trend on Twitter. But real
        users depended on the software every day, and that changes how you
        write code before you have the experience to know why.
      </p>
      <p>
        Those first eighteen months taught me the things that still carry
        everything I build: how data actually moves through a system, why an
        API contract matters more than the code behind it, what happens to
        your architecture when concurrent users show up, and how much of
        engineering is unglamorous plumbing done carefully. I didn&apos;t know
        it then, but I was learning the substrate that AI systems would later
        run on.
      </p>

      <h2>Going full-stack</h2>
      <p>
        In January 2023 I moved to MSA Software as a full-stack web developer
        and went all-in on the JavaScript side: Node.js APIs, React frontends,
        MongoDB underneath. The work that shaped me most wasn&apos;t building
        new features. It was making existing systems behave — profiling slow
        MongoDB aggregation pipelines until legacy latency came down, and
        moving teams onto TypeScript and Next.js so a whole class of
        production bugs stopped existing.
      </p>
      <p>
        That period rewired how I think about the job. The valuable work
        wasn&apos;t typing code; it was deciding where types, boundaries, and
        indexes should live so the code that got typed couldn&apos;t go wrong.
        I didn&apos;t have the phrase for it yet, but that was my shift from
        developer to architect.
      </p>

      <h2>Then ChatGPT dropped</h2>
      <p>
        The timing is almost funny: ChatGPT launched a few weeks before I
        started that full-stack role. Like most engineers, I went through the
        arc — dismissed it, played with it, depended on it, and then realized
        the profession was quietly reorganizing underneath me. I decided
        early on that I&apos;d rather be the engineer who understands how
        these systems work than the one hoping they don&apos;t matter.
      </p>
      <p>
        So while my day job was MERN, my nights became embeddings, vector
        search, retrieval pipelines, prompt design, evals. The earliest posts
        on this blog are literally that homework in public. What I found
        surprised me: my full-stack background wasn&apos;t obsolete in the AI
        era — it was the prerequisite. A RAG pipeline is an API with a
        database and a cache. An agent is a state machine with side effects.
        The people who struggle to ship AI systems usually aren&apos;t missing
        AI knowledge; they&apos;re missing the systems fundamentals I&apos;d
        spent four years absorbing.
      </p>

      <h2>Making it official</h2>
      <p>
        In June 2025 the two tracks merged: I joined Sparity as a senior
        software developer working on exactly this — integrating LLMs and
        agentic workflows into production MERN systems, owning them from
        architecture through deployment. The night studies became the day
        job.
      </p>
      <p>
        And then I started building for myself. Over the following year I
        shipped five products solo — a Rust desktop cockpit for streamers, a
        React Flow workflow engine, a local-first AI finance agent, and two
        autonomous pipelines that write and distribute content for this site.
        Each one exists because I wanted to test a conviction about how AI
        systems should be built: models get leverage, never authority; data
        contracts before code; infrastructure only when nothing simpler
        works. This portfolio is the lab notebook.
      </p>

      <h2>What I&apos;d tell the 2021 version of me</h2>
      <ul>
        <li>
          The boring fundamentals compound. Every hour spent understanding
          data flow in a hospital records system is still paying dividends in
          agent architectures.
        </li>
        <li>
          Career shifts don&apos;t announce themselves. Mine happened at
          night, in the gap between what my job needed and what the industry
          was becoming.
        </li>
        <li>
          You don&apos;t abandon a stack to work in AI. You stand on it. The
          model is one component in a system, and someone still has to build
          the system.
        </li>
      </ul>
      <p>
        Five years from an ASP.NET healthcare backend to shipping autonomous
        AI products. The tools changed completely. The job — understanding
        systems well enough to be trusted with them — never did.
      </p>
    </>
  );
}

export const myJourneyPost: BlogPost = {
  slug: "my-journey-web-developer-to-ai-engineer",
  title: "How I Went From My First Dev Job to Building AI Systems",
  description:
    "Five years, honestly told: an ASP.NET healthcare backend in 2021, full-stack MERN through the ChatGPT shift, nights of embeddings homework, and finally shipping five AI products solo. The journey, without the gloss.",
  keywords: [
    "web developer to AI engineer",
    "career transition AI engineering",
    "full stack developer journey",
    "MERN to AI systems",
    "how to become an AI engineer",
    "self taught AI developer",
  ],
  publishedAt: "2026-07-20",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Founder's Log", "Career", "Journey"],
  takeaways: [
    "Started September 2021 at a healthcare software company on ASP.NET + React; the unglamorous fundamentals became the foundation for everything after.",
    "Full-stack MERN work from 2023 taught the real lesson: deciding where types, boundaries, and indexes live matters more than typing code.",
    "ChatGPT launched weeks before that role began; nights of embeddings and RAG homework — published as this blog's earliest posts — became the day job by June 2025.",
    "Full-stack fundamentals aren't obsolete in the AI era; they're the prerequisite. An agent is a state machine with side effects.",
  ],
  Body,
};
