import React from "react";

/** Glowing ice "live" status dot with a looping ping ring — the streamerOS signal. */
export function PulseDot({ className = "", ...rest }) {
  return <span className={`sk-pulse-dot ${className}`} aria-hidden="true" {...rest}></span>;
}
