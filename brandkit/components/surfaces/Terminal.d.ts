export interface TerminalProps {
  /** Window-chrome label, e.g. a filename or shell ("bash") */
  title?: string;
  children?: React.ReactNode;
}
/** macOS-style terminal code block over #0b1018. */
export declare function Terminal(props: TerminalProps): JSX.Element;
