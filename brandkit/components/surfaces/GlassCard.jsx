import React from "react";

/** Translucent dark glass card — the base surface for projects, posts, panels. */
export function GlassCard({ hover = "glow", className = "", style, children, ...rest }) {
  const hoverClass =
    hover === "glow" ? "sk-glass-card--hoverable" : hover === "lift" ? "sk-glass-card--lift" : "";
  return (
    <div className={`sk-glass-card ${hoverClass} ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
}
