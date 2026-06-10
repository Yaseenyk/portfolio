export interface WindowFrameProps {
  /** Mono filename centered in the title bar */
  title?: string;
  /** Right-side status label ("live"); empty string hides it */
  status?: string;
  children?: React.ReactNode;
}
/** macOS-chrome "mission control" window with traffic lights and live status. */
export declare function WindowFrame(props: WindowFrameProps): JSX.Element;
