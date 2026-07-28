/**
 * Fire a named conversion event to GoatCounter — the cookieless, privacy-
 * friendly analytics already loaded in the root layout (dashboard at
 * yaseen.goatcounter.com). Events land alongside pageviews, so we can finally
 * see which CTAs actually convert instead of only which pages draw traffic.
 *
 * No-ops safely on the server, before the beacon script has loaded, and on
 * localhost (GoatCounter skips localhost itself). It never throws — analytics
 * must never break a click or submit handler.
 *
 * Events show up in the dashboard under Pages as `evt-<name>`; the `evt-`
 * prefix keeps them grouped and distinct from real page paths.
 */
type GoatCounter = {
  count?: (opts: { path: string; title?: string; event?: boolean }) => void;
};

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

export function track(event: string): void {
  if (typeof window === "undefined") return;
  try {
    const gc = window.goatcounter;
    if (!gc || typeof gc.count !== "function") return;
    gc.count({ path: `evt-${event}`, title: event, event: true });
  } catch {
    /* analytics must never break UX */
  }
}
