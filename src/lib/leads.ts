/**
 * Durable lead recording, alongside EmailJS.
 *
 * EmailJS stays the primary delivery path — it is what actually reaches the
 * inbox. This is the second write, so that a quota exhaustion, a blocked
 * origin, or a broken template does not silently destroy an enquiry that may
 * be worth six figures.
 *
 * Every failure mode here is swallowed on purpose. A lead must never fail to
 * submit because the record-keeping endpoint was unreachable.
 */
const CONCIERGE_URL = process.env.NEXT_PUBLIC_CONCIERGE_URL ?? "";

export interface LeadPayload {
  /** Which surface the enquiry came from. */
  source: "solutions" | "campus";
  name: string;
  email: string;
  phone?: string;
  /** Company, institution or college. */
  org?: string;
  /** Service selected, or the student's course. */
  interest?: string;
  budget?: string;
  /** Project title, tier, or whatever else identifies the request. */
  context?: string;
  message: string;
}

/** Fire-and-forget. Resolves to whether the lead was durably stored, which
 *  callers may log but must not gate the UI on. */
export async function recordLead(payload: LeadPayload): Promise<boolean> {
  if (!CONCIERGE_URL) return false;

  try {
    // Give up quickly — this runs in parallel with the EmailJS send and must
    // never be the reason a user waits.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${CONCIERGE_URL}/api/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        ...payload,
        page: typeof window === "undefined" ? "" : window.location.pathname,
      }),
    });
    clearTimeout(timeout);

    if (!res.ok) return false;
    const data = (await res.json()) as { stored?: boolean };
    return data.stored === true;
  } catch {
    // Offline, aborted, CORS, worker down — all non-fatal by design.
    return false;
  }
}
