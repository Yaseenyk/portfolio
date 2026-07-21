import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Say &quot;we&apos;re moving to TypeScript&quot; and someone suggests a freeze and a big‑bang rewrite. That&apos;s how migrations die. On IntegrateX and streamerOS, real-time flows couldn&apos;t pause — frames would drop, operators would lose trust. What worked was incremental: ship types with features, ratchet strictness in stages, and never leave main un-runnable past a single commit. Do that and even a sprawling legacy app turns type-safe without a feature freeze.
      </p>

      <h2>Allow JS, then advance the front</h2>
      <p>
        Flip <code>allowJs</code> on and rename files to <code>.ts</code> one leaf at a time — utilities, shared types, pure functions — then move inward toward the core. Each renamed file gets types and tests; everything that imports it still runs. The typed front moves every PR instead of landing in one risky blast, which kept IntegrateX’s canvas and real-time execution online while we migrated the edges first.
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
        Treat strictness like a ratchet: once a flag is on, it never turns off. Start with{" "}
        <code>noImplicitAny</code>, fix the fallout, commit. Then{" "}
        <code>strictNullChecks</code> — usually the highest‑value flag because it
        catches the whole class of null/undefined landmines that plague legacy JS and React props.
        Add the rest of <code>strict</code> incrementally. Each step is a finite,
        reviewable diff rather than an unbounded rewrite.
      </p>

      <h2>Quarantine the <code>any</code></h2>
      <p>
        You will need escape hatches at the boundaries of untyped third-party code
        — that is fine, as long as <code>any</code> is contained, named, and
        tracked, not scattered. One typed boundary that validates and casts
        external data keeps the mess from leaking inward. In the pattern I call Trinity Architecture, that boundary lives in the Data / Serialization Adapter and never mutates UI state directly — it only talks through the orchestrator. The
        goal is not zero <code>any</code> on day one; it is no <em>silent</em>{" "}
        <code>any</code> in the parts you control.
      </p>

      <blockquote>
        A migration that asks for a feature freeze gets killed the first time product needs to ship. The one that finishes is the one nobody has to stop for.
      </blockquote>

      <p>
        Type safety pays the biggest dividends at the AI boundary — see{" "}
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
