import type { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

/** Animated Cyan→Purple gradient text (flows horizontally). */
export default function GradientText({
  children,
  className = "",
}: GradientTextProps) {
  return (
    <span className={`text-gradient animate-gradient ${className}`}>
      {children}
    </span>
  );
}
