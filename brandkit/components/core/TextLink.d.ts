export interface TextLinkProps {
  children?: React.ReactNode;
  /** Unicode arrow that nudges on hover: "right" → or "diagonal" ↗ */
  arrow?: "right" | "diagonal";
  href?: string;
  className?: string;
}
/** Text link with cyan hover and shifting arrow glyph. */
export declare function TextLink(props: TextLinkProps): JSX.Element;
