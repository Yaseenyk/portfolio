import React from "react";
import { TextLink } from "../../components/core/TextLink.jsx";

/** Site footer with sign-off and external links. */
export function HomeFooter() {
  return (
    <footer
      id="contact"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        borderTop: "1px solid rgba(39,39,42,.7)",
        padding: "2.5rem 0",
        fontSize: 14,
        color: "var(--zinc-500)",
      }}
    >
      <p style={{ margin: 0 }}>© 2026 Yaseen Khatib — Architected with Next.js &amp; Framer Motion, delivered at AI-speed.</p>
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        <TextLink href="#" style={{ color: "var(--zinc-600)", fontSize: 14 }}>Interview Context</TextLink>
        <TextLink href="#" arrow="diagonal" style={{ color: "var(--zinc-500)", fontSize: 14 }}>View source</TextLink>
      </div>
    </footer>
  );
}
