import React, { useState } from "react";
import { PulseDot } from "../../components/core/PulseDot.jsx";

const LINKS = ["Products", "Projects", "Experience", "Roadmap", "Blog", "Stack", "Sandbox", "Contact"];

/** Fixed centered pill navbar with sliding hover highlight. */
export function HomeNavbar() {
  const [hovered, setHovered] = useState(null);
  return (
    <nav style={{ position: "fixed", left: "50%", top: 24, zIndex: 50, transform: "translateX(-50%)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderRadius: 9999,
          border: "1px solid rgba(39,39,42,.5)",
          background: "rgba(9,9,11,.6)",
          padding: "12px 24px",
          boxShadow: "var(--shadow-nav)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: 4, textDecoration: "none" }}>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.025em", color: "var(--zinc-50)" }}>Yaseen Khatib</span>
          <PulseDot></PulseDot>
        </a>
        <span style={{ height: 16, width: 1, background: "var(--zinc-800)" }}></span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} onMouseLeave={() => setHovered(null)}>
          {LINKS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              onMouseEnter={() => setHovered(label)}
              style={{
                borderRadius: 9999,
                padding: "6px 16px",
                fontSize: 14,
                textDecoration: "none",
                color: hovered === label ? "var(--zinc-50)" : "var(--zinc-400)",
                background: hovered === label ? "rgba(39,39,42,.5)" : "transparent",
                transition: "color .2s, background .2s",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
