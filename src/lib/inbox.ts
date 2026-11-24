/**
 * The form inbox: every form on the site is saved in the owner's own database (the pulse Worker behind the analytics
 * dashboard's Leads page), so a message is kept even when email delivery fails. Email (EmailJS) is only a notification
 * on top. The tab id the visit tracker keeps in sessionStorage is sent along so the dashboard can show where the person
 * came from; it is a random id that dies with the tab, not a cookie.
 */
const INBOX = "https://pulse.yaseenyk.workers.dev/lead";
const SITE = "yk.streamerosai.com";

export interface InboxForm {
  form: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  /** A few named answers, for example interest or budget. */
  extra?: Record<string, string>;
}

/** True when the inbox stored the form. Never throws. */
export async function sendToInbox(f: InboxForm): Promise<boolean> {
  let sid = "";
  try { sid = sessionStorage.getItem("_ps") || ""; } catch { /* storage can be blocked */ }
  try {
    const r = await fetch(INBOX, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site: SITE, path: location.pathname, sid, ...f }),
    });
    return r.ok;
  } catch {
    return false;
  }
}
