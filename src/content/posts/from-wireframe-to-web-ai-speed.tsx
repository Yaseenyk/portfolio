import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        The gap between a Figma frame and production React used to cost days of
        naming, token wiring, and wrestling breakpoints. That gap is now minutes.
        Point an AI at a real design system instead of a screenshot and it will
        assemble on-brand bento layouts and glass surfaces fast. The work that
        matters is the spec: define the contract so well that the output ships
        without rework. I keep the generator boxed into the Presentation layer of
        the pattern I call Trinity Architecture — components render from state and
        dispatch events, no data or persistence logic leaks into the JSX.
      </p>

      <h2>The bottleneck was translation, not taste</h2>
      <p>
        Taste wasn&apos;t slow; typing was. The drag was turning intent into
        markup — mapping spacing to utilities, motion ideas to transitions,
        layouts to resilient responsive grids. That translation is exactly what
        AI is good at when given structure, and exactly what it botches when you
        toss it a picture. On Path Saathi, the day-one push was mostly that
        mechanical grind; today I&apos;d hand that layer to a model and keep my
        attention on the contract and the state boundaries.
      </p>

      <h2>Feed the system, not the screenshot</h2>
      <p>
        Generic in, generic out. Make your design system the context: tokens,
        primitives, and hard rules the output must obey. Constrain the model to
        your palette, motion library, and compositional limits, and it stops
        inventing a new brand and starts assembling your own. That also guards
        the Trinity split — UI stays declarative, orchestration owns behavior, and
        nothing downstream has to guess at presentation rules.
      </p>

      <Terminal title="design-context.ts">
        <span className="tok-com">{`// the design system IS the prompt context`}</span>
        {"\n"}
        <span className="tok-key">const</span> system ={" "}
        <span className="tok-punc">{`{`}</span>
        {"\n  "}
        tokens<span className="tok-punc">:</span>{" "}
        <span className="tok-punc">{`{`}</span> bg
        <span className="tok-punc">:</span>{" "}
        <span className="tok-str">&quot;#05070A&quot;</span>
        <span className="tok-punc">,</span> accent
        <span className="tok-punc">:</span>{" "}
        <span className="tok-punc">[</span>
        <span className="tok-str">&quot;#22D3EE&quot;</span>
        <span className="tok-punc">,</span>{" "}
        <span className="tok-str">&quot;#A855F7&quot;</span>
        <span className="tok-punc">]</span>{" "}
        <span className="tok-punc">{`}`}</span>
        <span className="tok-punc">,</span>
        {"\n  "}
        primitives<span className="tok-punc">:</span>{" "}
        <span className="tok-punc">[</span>
        <span className="tok-str">&quot;GlassCard&quot;</span>
        <span className="tok-punc">,</span>{" "}
        <span className="tok-str">&quot;GradientText&quot;</span>
        <span className="tok-punc">,</span>{" "}
        <span className="tok-str">&quot;PulseDot&quot;</span>
        <span className="tok-punc">],</span>
        {"\n  "}
        rules<span className="tok-punc">:</span>{" "}
        <span className="tok-punc">[</span>
        <span className="tok-str">&quot;dark-mode only&quot;</span>
        <span className="tok-punc">,</span>{" "}
        <span className="tok-str">&quot;motion via Framer&quot;</span>
        <span className="tok-punc">,</span>{" "}
        <span className="tok-str">&quot;no images&quot;</span>
        <span className="tok-punc">],</span>
        {"\n"}
        <span className="tok-punc">{`}`};</span>
      </Terminal>

      <h3>Constraints produce fidelity</h3>
      <p>
        Counter-intuitively, tighter constraints make the output look finished.
        &quot;Build a dashboard&quot; gets you a template. &quot;Build a dashboard
        using only these three primitives, this palette, Framer Motion on every
        transition, and no raster images&quot; yields something that reads as
        designed. Specificity is what turns patterns into polish.
      </p>

      <h2>Bento and glassmorphism, at speed</h2>
      <p>
        The modern dark aesthetic — bento grids, glass, gradients, restrained
        motion — is highly systematic, which is why AI reproduces it cleanly. Once
        the primitives exist (glass card, gradient text, pulse), new pages are
        composition, not invention. That&apos;s how this portfolio was built: a
        small, sharp primitive set assembled at model speed into distinct,
        production-tight sections — and kept in the Presentation lane so state and
        data flows don&apos;t bleed into renders or cause thrash.
      </p>

      <h2>What the human still owns</h2>
      <p>
        The model assembles; the architect exercises judgment. Hierarchy,
        restraint, omission, and when motion serves meaning instead of stealing
        it — that&apos;s on us. AI removed the cost of producing the interface. It
        did not remove the cost of choosing which interface should exist and where
        the boundaries live.
      </p>

      <blockquote>
        Hand AI a screenshot and you get an imitation. Hand it your design system
        and you get your product. The difference is everything.
      </blockquote>

      <p>
        See the result across the{" "}
        <a href="/#projects">project showcases</a> — each visualization is a
        composed primitive, generated against a tight design contract.
      </p>
    </>
  );
}

export const fromWireframeToWeb: BlogPost = {
  slug: "from-wireframe-to-web-high-fidelity-ui-ai-speed",
  title: "From Wireframe to Web: High-Fidelity UIs at AI-Speed",
  description:
    "The Figma-to-production gap has collapsed. Feeding a real design system — Tailwind tokens, Framer Motion, primitives — into AI generates complex bento and glassmorphic UIs instantly.",
  keywords: [
    "AI UI generation",
    "Tailwind CSS",
    "Framer Motion",
    "design systems",
    "React",
    "glassmorphism",
    "prototyping",
  ],
  publishedAt: "2026-05-29",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Frontend", "AI", "Design Systems"],
  takeaways: [
    "The slow part of UI was never taste — it was the mechanical translation of intent into markup, which AI now absorbs.",
    "Generic prompts yield generic UIs; feed the design system (tokens, primitives, rules) as context to get on-brand output.",
    "Fidelity is downstream of specificity — tighter constraints produce more polished, production-grade results.",
    "AI removed the cost of producing the interface, not the cost of judging which interface is worth producing.",
  ],
  Body,
};
