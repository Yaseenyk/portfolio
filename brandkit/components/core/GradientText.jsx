import React from "react";

/** Animated cyan→purple gradient text — the hero keyword treatment. */
export function GradientText({ children, className = "", ...rest }) {
  return (
    <span className={`sk-text-gradient ${className}`} {...rest}>
      {children}
    </span>
  );
}
