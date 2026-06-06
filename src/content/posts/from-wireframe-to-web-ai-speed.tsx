import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        The gap between a Figma frame and production React used to be measured in
        days — slicing, naming, wiring tokens, fighting responsive edge cases.
        That gap has collapsed. Feed an AI a real design system rather than a
        screenshot and it will produce complex, on-brand bento layouts and
        glassmorphic interfaces in minutes. The skill that matters now is not
        drawing the UI; it is specifying the system precisely enough that the
        generated output is production-grade rather than generic.
      </p>

      <h2>The bottleneck was translation, not taste</h2>
      <p>
        Designers were never the slow part. The slow part was the mechanical
        translation of intent into markup: turning a spacing decision into the
        right utility classes, a motion idea into the right transition, a layout
        into a responsive grid that survives every breakpoint. That translation
        is exactly what AI does well — and what it does badly if you hand it a
        picture and hope.
      </p>

      <h2>Feed the system, not the screenshot</h2>
      <p>
        Generic AI output comes from generic prompts. The fix is to make your
        design system the context: the tokens, the primitive components, and the
        hard rules the output must obey. Constrain the model to your palette,
        your motion library, your aesthetic constraints, and it stops inventing a
        new look and starts assembling yours.
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
        Counter-intuitively, the more you constrain the generator, the more
        polished the result. &quot;Build a dashboard&quot; yields a template.
        &quot;Build a dashboard using only these three primitives, this palette,
        Framer Motion for every transition, and no raster images&quot; yields
        something that looks designed. Fidelity is downstream of specificity.
      </p>

      <h2>Bento and glassmorphism, at speed</h2>
      <p>
        The modern dark-mode aesthetic — bento grids, glass surfaces, gradient
        accents, restrained motion — is highly systematic, which is precisely why
        AI reproduces it so well. Once the primitives exist (a glass card, a
        gradient text span, a pulsing node), generating a new page is composition,
        not creation. The portfolio you are reading was built exactly this way:
        a small set of primitives, assembled at AI-speed into distinct,
        high-fidelity sections.
      </p>

      <h2>What the human still owns</h2>
      <p>
        The model assembles; the architect decides. Hierarchy, restraint, what to
        leave out, when motion serves the content versus distracting from it —
        these are taste judgments that do not come from a prompt. AI removed the
        cost of producing the interface. It did not remove the cost of knowing
        which interface is worth producing.
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
