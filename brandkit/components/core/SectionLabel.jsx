import React from "react";

/** Numbered uppercase eyebrow: "01 ── PROFESSIONAL TIMELINE". */
export function SectionLabel({ index, title }) {
  return (
    <div className="sk-section-label">
      <span className="sk-section-index">{index}</span>
      <span className="sk-section-rule"></span>
      <span>{title}</span>
    </div>
  );
}
