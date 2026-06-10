import React from "react";

/** Terminal-path section heading: "~/projects ————" with optional right-side action. */
export function TerminalPath({ path, action, actionHref }) {
  return (
    <div className="sk-terminal-path">
      <h2>{path}</h2>
      <span className="sk-path-rule"></span>
      {action ? (
        <a
          href={actionHref || "#"}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-caption)",
            color: "var(--text-muted)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          {action}
        </a>
      ) : null}
    </div>
  );
}
