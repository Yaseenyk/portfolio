import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        The instinct when migrating a large JavaScript codebase to TypeScript is
        to stop the world and rewrite. That instinct kills migrations. The
        successful playbook is incremental: ship types alongside features, tighten
        strictness in stages, and never let the codebase be un-runnable for more
        than a commit. Done this way, a sprawling legacy app becomes type-safe
        without a single feature freeze.
      </p>

      <h2>Allow JS, then advance the front</h2>
      <p>
        Turn on <code>allowJs</code> and rename files to <code>.ts</code> one
        module at a time, starting at the leaves — shared utilities and types —
        and working inward toward the application core. Each renamed file gets
        types; everything still importing it keeps working. The migration front
        advances continuously instead of arriving all at once.
      </p>

      <Terminal title="tsconfig.json">
        <span className="tok-com">{"// stage 1: coexist; ratchet strictness later, not now"}</span>
        {`
{
  "compilerOptions": {
    "allowJs": true,            // JS and TS live together
    "checkJs": false,           // don't boil the ocean yet
    "strict": false,            // turn on flags one at a time
    "noImplicitAny": true       // the first ratchet that matters
  }
}`}
      </Terminal>

      <h2>Ratchet strictness, never loosen</h2>
      <p>
        Strictness is a ratchet: each flag you enable stays enabled. Start with{" "}
        <code>noImplicitAny</code>, fix the fallout, commit. Then{" "}
        <code>strictNullChecks</code> — usually the highest-value flag, because it
        catches the entire class of null/undefined bugs that plague legacy JS.
        Add the rest of <code>strict</code> incrementally. Each step is a finite,
        reviewable diff rather than an unbounded rewrite.
      </p>

      <h2>Quarantine the <code>any</code></h2>
      <p>
        You will need escape hatches at the boundaries of untyped third-party code
        — that is fine, as long as <code>any</code> is contained, named, and
        tracked, not scattered. A single typed boundary that validates and casts
        external data keeps the untyped world from leaking into your core. The
        goal is not zero <code>any</code> on day one; it is no <em>silent</em>{" "}
        <code>any</code> in the parts you control.
      </p>

      <blockquote>
        A TypeScript migration that requires a feature freeze will be cancelled
        the first time the business needs to ship. The only migration that
        finishes is the one nobody has to stop for.
      </blockquote>

      <p>
        Strict types matter most at the AI boundary — see{" "}
        <a href="/blog/type-safe-llms-strict-schemas-typescript-express">
          Type-Safe LLMs
        </a>
        .
      </p>
    </>
  );
}

export const typescriptMigrationPlaybook: BlogPost = {
  slug: "typescript-migration-playbook",
  title: "The TypeScript Migration Playbook for Legacy Codebases",
  description:
    "Stop-the-world rewrites kill TypeScript migrations. The incremental playbook: allowJs coexistence, ratcheting strictness one flag at a time, and quarantining any at the boundary.",
  keywords: [
    "TypeScript migration",
    "legacy code",
    "allowJs",
    "strict mode",
    "noImplicitAny",
    "incremental adoption",
    "JavaScript",
  ],
  publishedAt: "2026-06-08",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["TypeScript", "Architecture", "Frontend"],
  takeaways: [
    "Migrate incrementally with allowJs — rename leaves first and advance the typed front inward, never freezing the app.",
    "Treat strictness as a ratchet: enable one flag at a time (noImplicitAny, then strictNullChecks), each a reviewable diff.",
    "Quarantine `any` behind a single validated boundary so untyped external data can't leak into your core.",
    "A migration that needs a feature freeze gets cancelled; the one that finishes is the one nobody has to stop for.",
  ],
  Body,
};
