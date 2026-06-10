/**
 * @startingPoint section="Core" subtitle="Primary cyan-glow CTA and zinc outline button" viewport="700x180"
 */
export interface ButtonProps {
  /** "primary" = solid cyan with glow; "secondary" = zinc outline, ice on hover */
  variant?: "primary" | "secondary";
  /** Optional trailing icon ("download" renders leading) */
  icon?: "arrow-right" | "download" | "external" | "github";
  /** Renders an <a> instead of <button> */
  href?: string;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
