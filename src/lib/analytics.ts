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


type GaEvent = (name: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gaEvent?: GaEvent;
  }
}

/**
 * Forward the same named event to Google Analytics 4 (window.gaEvent comes from the tag in the
 * root layout, which also stamps first-touch source/medium/campaign on it). WhatsApp taps and
 * template downloads are skipped here: the tag's click listener already counts those links, so
 * forwarding them as well would count each tap twice.
 */
function forwardToGa(event: string): void {
  const ga = window.gaEvent;
  if (!ga || /whatsapp|template-download/.test(event)) return;
  if (event === "contact-submit" || event === "fyp-lead-submit" || event === "fyp-college-lead-submit") {
    ga("generate_lead", { form_name: event });
  } else if (event.startsWith("solutions-lead:")) {
    ga("generate_lead", { form_name: "solutions-lead", cta_text: event.slice("solutions-lead:".length) });
  } else if (event === "agreement-signed") {
    ga("agreement_signed", { form_name: "agreement" });
  } else if (event.startsWith("read:")) {
    ga("read_depth", { cta_text: event.slice(5) });
  } else {
    ga(event.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").toLowerCase().slice(0, 40), { cta_text: event });
  }
}

export function track(event: string): void {
  if (typeof window === "undefined") return;
  try {
    const gc = window.goatcounter;
    if (gc && typeof gc.count === "function") {
      gc.count({ path: `evt-${event}`, title: event, event: true });
    }
  } catch {
    /* analytics must never break UX */
  }
  try {
    forwardToGa(event);
  } catch {
    /* analytics must never break UX */
  }
}
