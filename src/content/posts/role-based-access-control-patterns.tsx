import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        Authorization bugs are the most expensive bugs, because they do not crash
        — they quietly let the wrong person do the right thing. The only reliable
        place to enforce access control in a Node.js API is the middleware layer,
        before a request ever reaches business logic. Scatter permission checks
        through controllers and you guarantee that one route, someday, forgets.
      </p>

      <h2>Authentication is not authorization</h2>
      <p>
        Knowing <em>who</em> a user is (authentication) is a different problem
        from knowing <em>what</em> they may do (authorization). JWTs answer the
        first; they should also carry the claims — roles, permissions — that
        answer the second. The middleware verifies the token, trusts the signed
        claims, and decides access from them, without a database round-trip on
        every request.
      </p>

      <Terminal title="rbac.ts">
        <span className="tok-com">{"// declarative guard at the boundary — controllers stay clean"}</span>
        {`
export const requirePermission =
  (perm: string) => (req, res, next) => {
    const { permissions } = req.user;   // from the verified JWT
    if (!permissions.includes(perm)) {
      return res.status(403).json({ error: "forbidden" });
    }
    next();
  };

router.delete("/cases/:id", requirePermission("cases:delete"), handler);`}
      </Terminal>

      <h2>Permissions, not just roles</h2>
      <p>
        Roles are a convenient bundle, but checking <code>{`role === "admin"`}</code>
        everywhere hard-codes policy into your routes. Check fine-grained{" "}
        <em>permissions</em> (<code>cases:delete</code>,{" "}
        <code>reports:export</code>) instead, and let roles be named sets of
        permissions defined in one place. When the policy changes, you edit the
        role definition — not a hundred route guards.
      </p>

      <h2>Default deny</h2>
      <p>
        The safest systems are deny-by-default: a route is inaccessible unless a
        guard explicitly allows it. A new endpoint shipped without a permission
        check should fail closed, not fall through to open. That single
        invariant — nothing is public until someone says so — is what turns
        access control from a hopeful convention into a guarantee.
      </p>

      <blockquote>
        An authorization bug never throws. It just lets the wrong request succeed
        — which is why it has to be impossible by construction, not caught by
        testing.
      </blockquote>

      <p>
        For validating what crosses that boundary, see{" "}
        <a href="/blog/type-safe-llms-strict-schemas-typescript-express">
          Type-Safe LLMs
        </a>
        ; RBAC hardens the{" "}
        <a href="/#projects">CMZ enterprise portal</a>.
      </p>
    </>
  );
}

export const rbacPatterns: BlogPost = {
  slug: "role-based-access-control-patterns",
  title: "Role-Based Access Control Patterns for Node.js APIs",
  description:
    "Authorization bugs don't crash — they let the wrong person succeed. Enforcing RBAC at the middleware layer with JWT claims, fine-grained permissions, and deny-by-default.",
  keywords: [
    "RBAC",
    "access control",
    "Node.js",
    "Express middleware",
    "JWT",
    "authorization",
    "API security",
  ],
  publishedAt: "2026-06-10",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["Backend", "Node.js", "Validation"],
  takeaways: [
    "Enforce authorization in middleware, before business logic — scattered checks guarantee one route eventually forgets.",
    "Carry roles/permissions as signed JWT claims so the guard decides without a DB round-trip per request.",
    "Check fine-grained permissions, not roles, and define roles as named permission sets in one place.",
    "Default deny: a route is inaccessible until a guard explicitly allows it, so new endpoints fail closed.",
  ],
  Body,
};
