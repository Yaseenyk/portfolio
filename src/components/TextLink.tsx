import type { AnchorHTMLAttributes, ReactNode } from "react";

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  arrow?: "right" | "diagonal";
}

/** Text link with a cyan hover color and a subtly shifting arrow. */
export default function TextLink({
  children,
  arrow,
  className = "",
  ...props
}: TextLinkProps) {
  return (
    <a
      className={`group inline-flex items-center gap-1.5 text-zinc-200 transition-colors duration-200 hover:text-cyan ${className}`}
      {...props}
    >
      <span>{children}</span>
      {arrow && (
        <span
          aria-hidden="true"
          className={`inline-block transition-transform duration-200 ${
            arrow === "right"
              ? "group-hover:translate-x-0.5"
              : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          }`}
        >
          {arrow === "right" ? "→" : "↗"}
        </span>
      )}
    </a>
  );
}
