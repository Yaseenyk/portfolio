export interface TerminalPathProps {
  /** Terminal-style path, e.g. "~/projects" or "~/field-notes" */
  path: string;
  /** Optional right-aligned mono action label, e.g. "View all →" */
  action?: string;
  actionHref?: string;
}
/** Mono terminal-path section heading with a fading rule. */
export declare function TerminalPath(props: TerminalPathProps): JSX.Element;
