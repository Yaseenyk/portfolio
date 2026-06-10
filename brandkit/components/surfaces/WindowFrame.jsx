import React from "react";
import { PulseDot } from "../core/PulseDot.jsx";

/** Mission-control macOS window chrome housing main content ("portfolio -- interactive-mode"). */
export function WindowFrame({ title = "portfolio -- interactive-mode", status = "live", children }) {
  return (
    <div className="sk-window">
      <div className="sk-window-bar">
        <span className="sk-traffic-lights">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="sk-window-title">{title}</span>
        {status ? (
          <span className="sk-window-status">
            <PulseDot></PulseDot>
            {status}
          </span>
        ) : null}
      </div>
      <div>{children}</div>
    </div>
  );
}
