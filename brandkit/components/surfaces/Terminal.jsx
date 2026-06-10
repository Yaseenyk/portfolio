import React from "react";

/** macOS-style terminal window for code blocks. Wrap code in tok-* spans for syntax color. */
export function Terminal({ title = "bash", children }) {
  return (
    <div className="sk-terminal">
      <div className="sk-terminal-bar">
        <span></span>
        <span></span>
        <span></span>
        <span className="sk-terminal-title">{title}</span>
      </div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}
