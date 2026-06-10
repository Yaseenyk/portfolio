/**
 * @startingPoint section="Surfaces" subtitle="Glass card with ice-glow hover" viewport="700x220"
 */
export interface GlassCardProps {
  /** Hover behavior: "glow" = ice border + glow (project rows), "lift" = rise 5px + cyan border (post cards), "none" */
  hover?: "glow" | "lift" | "none";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export declare function GlassCard(props: GlassCardProps): JSX.Element;
