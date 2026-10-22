import { useEffect, useState } from "react";

/**
 * False on the server and during the first client render, true once the
 * component has hydrated.
 *
 * Why: Framer Motion writes an element's `initial` state into the server
 * HTML as inline styles, so anything that fades in from `opacity: 0` ships
 * invisible and only appears after JavaScript runs. Google's renderer took
 * a snapshot of this site in that state and filed the home page as a
 * duplicate of unrelated blank pages. Entrance animations therefore start
 * from the visible state and only arm themselves after hydration.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}
