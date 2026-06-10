import React from "react";

/** Text link with cyan hover and a subtly shifting arrow glyph. */
export function TextLink({ children, arrow, className = "", ...rest }) {
  return (
    <a className={`sk-textlink ${className}`} {...rest}>
      <span>{children}</span>
      {arrow ? (
        <span aria-hidden="true" className={`sk-arrow sk-arrow--${arrow}`}>
          {arrow === "right" ? "→" : "↗"}
        </span>
      ) : null}
    </a>
  );
}
