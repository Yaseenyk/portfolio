import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";
import Diagram from "@/components/blog/Diagram";

function PortfolioLoopDiagram() {
  return (
    <Diagram
      label="A closed loop showing how this portfolio works as an AI system: authored content flows into a typed registry, which generates SEO and JSON-LD structured data, which surfaces in AI search, which sends qualified leads back to the author — closing the loop."
      caption="The portfolio is itself the proof-of-work: content → typed registry → structured data → AI-search surfaces → qualified leads. The system you describe is the system you shipped."
    >
      <svg viewBox="0 0 760 280" role="img" aria-label="AI-native portfolio as a closed loop">
        <defs>
          <marker id="p-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
          </marker>
        </defs>

        {[
          ["architecture\ncontent", 60, 60, "#67E8F9"],
          ["typed registry\n+ MDX", 300, 60, "#22D3EE"],
          ["SEO + JSON-LD\n(AEO)", 540, 60, "#A855F7"],
          ["AI-search\nsurfaces you", 540, 190, "#22D3EE"],
          ["qualified\nlead", 300, 190, "#67E8F9"],
          ["systems\nsignal", 60, 190, "#A855F7"],
        ].map(([label, x, y, color]) => {
          const lines = (label as string).split("\n");
          return (
            <g key={label as string}>
              <rect x={(x as number) - 70} y={(y as number) - 28} width="140" height="56" rx="10" fill="#0b1018" stroke={color as string} />
              {lines.map((ln, i) => (
                <text
                  key={ln}
                  x={x as number}
                  y={(y as number) - 2 + i * 14}
                  fill={color as string}
                  fontFamily="monospace"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {ln}
                </text>
              ))}
            </g>
          );
        })}

        {/* loop arrows */}
        <line x1="130" y1="60" x2="226" y2="60" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#p-arrow)" />
        <line x1="370" y1="60" x2="466" y2="60" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#p-arrow)" />
        <line x1="540" y1="88" x2="540" y2="160" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#p-arrow)" />
        <line x1="470" y1="190" x2="372" y2="190" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#p-arrow)" />
        <line x1="230" y1="190" x2="132" y2="190" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#p-arrow)" />
        <line x1="60" y1="160" x2="60" y2="90" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#p-arrow)" />
      </svg>
    </Diagram>
  );
}

function Body() {
  return (
    <>
      <p>
        A portfolio that lists &quot;used ChatGPT&quot; reads junior. One that
        demonstrates systems architecture — RAG with a grounding contract, agents
        with control loops, guardrails that fail closed, latency budgets defended at
        the edge — reads like the lead they&apos;re trying to hire. This final
        lesson is about building the second kind, using everything the first nine
        established.
      </p>

      <h2>Show the system, not the tool usage</h2>
      <p>
        Anyone can call an API. Seniority is signalled by the decisions <em>around</em>
        the call: why retrieval is chunked the way it is, where determinism lives,
        what happens when the model is wrong, how you kept time-to-first-token under
        300ms. Architecture diagrams and explicit tradeoffs are the artifacts that
        separate someone who used a tool from someone who can be trusted to design
        the system. Lead with the tradeoffs.
      </p>

      <PortfolioLoopDiagram />

      <h2>Make the portfolio itself an AI system</h2>
      <p>
        The most credible proof that you can build production AI systems is a
        portfolio that <em>is</em> one. This site is the example: posts are typed
        objects in a registry, an autonomous pipeline drafts new ones, and every
        page emits structured data so machines can read it. When the artifact
        demonstrates the competence the artifact claims, you stop asking the reader
        to take your word for it. This roadmap is proof-of-work, not a reading list.
      </p>

      <Terminal title="post.ts — the artifact is the evidence">
        <span className="tok-com">{`// a post is a typed object, not a CMS row — the system is legible`}</span>
        {"\n"}
        {`export const lesson: BlogPost = {\n`}
        {`  slug: "ai-native-portfolio-landing-lead-roles",\n`}
        {`  takeaways: [ /* direct answers → JSON-LD abstract for AI search */ ],\n`}
        {`  tags: ["Career", "AI", "Architecture"],\n`}
        {`  Body, // SVG diagrams + architectural snippets, not screenshots\n`}
        {`};`}
      </Terminal>

      <h2>Engineer for AI search, not just Google</h2>
      <p>
        The audience now includes machines. Answer-engine optimisation (AEO) means
        structuring content so an AI search surfaces <em>you</em> as the expert:
        direct-answer takeaways, <code>TechArticle</code> and <code>Course</code>{" "}
        JSON-LD, a clean entity graph that ties every post to a named author who
        &quot;knowsAbout&quot; these topics. The same grounding discipline you apply
        to a RAG system, you apply to your own visibility — make yourself the
        well-structured, citable source.
      </p>

      <blockquote>
        The strongest portfolio doesn&apos;t describe an AI systems architect. It
        runs as one — and lets the machine reading it reach the same conclusion the
        hiring manager does.
      </blockquote>

      <p>
        That closes the loop: the{" "}
        <a href="/blog/ai-native-dev-stack-rethinking-mern">stack</a>, the{" "}
        <a href="/blog/rag-grounding-the-agent">grounding</a>, the{" "}
        <a href="/blog/guardrail-engineering-hallucination-prevention">guardrails</a>{" "}
        — all of it, demonstrated by the thing you&apos;re reading. Revisit the full{" "}
        <a href="/roadmap">roadmap</a>, or{" "}
        <a href="/#contact">start a conversation</a>.
      </p>
    </>
  );
}

export const aiNativePortfolio: BlogPost = {
  slug: "ai-native-portfolio-landing-lead-roles",
  title: "The AI-Native Portfolio: Landing Lead Roles by Shipping the System",
  description:
    "A portfolio that lists 'used ChatGPT' reads junior. One that demonstrates systems architecture — RAG, agents, guardrails, latency budgets — reads like the lead they're trying to hire. Here's how to build the second one.",
  keywords: [
    "AI engineer portfolio",
    "landing senior AI roles",
    "answer engine optimization",
    "AEO portfolio",
    "AI systems architect",
    "developer personal brand",
  ],
  publishedAt: "2026-06-08",
  readingMinutes: 6,
  author: { name: "Yaseen Khatib", role: "AI Systems Architect" },
  tags: ["Career", "AI", "Architecture"],
  takeaways: [
    "Show the system, not the tool usage: architecture diagrams and explicit tradeoffs are what signal seniority.",
    "Make the portfolio itself an AI system — when the artifact demonstrates the competence it claims, it becomes proof-of-work.",
    "Engineer for AI search with AEO: direct-answer takeaways and structured data so machines surface you as the expert.",
  ],
  Body,
};
