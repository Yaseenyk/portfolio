import React from "react";
import { PulseDot } from "../core/PulseDot.jsx";

/** Hero status pill: live dot + role label ("Senior MERN + AI Developer"). */
export function StatusBadge({ children }) {
  return (
    <span className="sk-status-badge">
      <PulseDot></PulseDot>
      {children}
    </span>
  );
}
