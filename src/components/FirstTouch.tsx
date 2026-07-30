"use client";

import { useEffect } from "react";

/**
 * Remembers where this session originally came from.
 *
 * GoatCounter already attributes pageviews to referrers, but messaging apps
 * (WhatsApp, Telegram, Instagram) strip the Referer header — exactly the
 * channels the FYP funnel lives on. Shared links carry ?ref=<channel> instead,
 * and this stores the first-touch source once per session so recordLead() can
 * stamp it onto the enquiry. First write wins: the source of the visit is
 * where they ENTERED, not the last internal page they navigated.
 */
export const FIRST_TOUCH_KEY = "first-touch";

export default function FirstTouch() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(FIRST_TOUCH_KEY)) return;
      const params = new URLSearchParams(window.location.search);
      const tagged = params.get("ref") || params.get("utm_source");
      let source = tagged ?? "";
      if (!source && document.referrer) {
        const host = new URL(document.referrer).hostname;
        // Internal navigation isn't a source.
        if (host && host !== window.location.hostname) source = host;
      }
      if (source) sessionStorage.setItem(FIRST_TOUCH_KEY, source.slice(0, 80));
    } catch {
      /* storage blocked or malformed referrer — attribution is best-effort */
    }
  }, []);
  return null;
}
