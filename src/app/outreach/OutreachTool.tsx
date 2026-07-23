"use client";

import { useState } from "react";

const CONCIERGE_URL = process.env.NEXT_PUBLIC_CONCIERGE_URL ?? "";

function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

export default function OutreachTool() {
  const [passcode, setPasscode] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [jd, setJd] = useState("");
  const [showJd, setShowJd] = useState(false);

  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const draft = async () => {
    if (!CONCIERGE_URL) return setStatus("Concierge URL not configured in this build.");
    if (!passcode) return setStatus("Enter the passcode first.");
    setBusy(true);
    setStatus("Drafting with ChatGPT…");
    try {
      const res = await fetch(`${CONCIERGE_URL}/api/outreach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode, company, companyUrl, jd }),
      });
      const data = (await res.json()) as {
        subject?: string;
        body?: string;
        error?: string;
        researched?: boolean;
        tailored?: boolean;
      };
      if (!res.ok) return setStatus(data.error ?? `Error ${res.status}`);
      setSubject(data.subject ?? "");
      setEmailBody(data.body ?? "");
      const bits = [
        data.tailored ? "tailored to the JD" : null,
        data.researched ? "read their website" : null,
      ].filter(Boolean);
      setStatus(`Draft ready${bits.length ? ` (${bits.join(", ")})` : ""}. Review, then open in your mail.`);
    } catch {
      setStatus("Network error reaching the drafter.");
    } finally {
      setBusy(false);
    }
  };

  // Mobile → mailto: (opens the native Mail/Gmail app). Desktop → Gmail
  // compose in a new tab, pre-filled, ready to review and send.
  const openMail = () => {
    if (!email) return setStatus("Add the prospect's email first.");
    const su = encodeURIComponent(subject);
    const bo = encodeURIComponent(emailBody);
    const url = isMobile()
      ? `mailto:${encodeURIComponent(email)}?subject=${su}&body=${bo}`
      : `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${su}&body=${bo}`;
    window.open(url, isMobile() ? "_self" : "_blank");
  };

  const field =
    "w-full rounded-lg border border-zinc-800 bg-ink px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-cyan/50";

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
        ~/outreach · private
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-50">
        Outreach drafter
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        Paste the prospect&apos;s email. ChatGPT writes the whole email — subject,
        body, and your links. Optionally add a job description and it tailors to
        that. Then it opens in your mail, ready to review and send.
      </p>

      <div className="mt-8 space-y-3">
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="passcode"
          className={field}
          autoComplete="off"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="prospect email *"
          className={field}
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="company (optional)"
            className={field}
          />
          <input
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
            placeholder="company website (optional — it reads it)"
            className={field}
          />
        </div>

        {/* Optional JD tab */}
        <button
          type="button"
          onClick={() => setShowJd((v) => !v)}
          className="flex items-center gap-2 font-mono text-xs text-zinc-400 transition-colors hover:text-cyan"
        >
          <span className={`inline-block transition-transform ${showJd ? "rotate-90" : ""}`}>▸</span>
          {jd.trim() ? "Job description added" : "Add a job description (optional)"}
        </button>
        {showJd && (
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the JD here — the email will be tailored to match your strengths to the role."
            rows={6}
            className={field}
          />
        )}

        <button
          type="button"
          onClick={draft}
          disabled={busy}
          className="rounded-lg bg-cyan px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_0_18px_-4px_rgba(34,211,238,0.7)] transition-shadow hover:shadow-[0_0_24px_-2px_rgba(34,211,238,0.8)] disabled:opacity-50"
        >
          {busy ? "drafting…" : "Draft email with ChatGPT"}
        </button>
      </div>

      {status && <p className="mt-4 font-mono text-xs text-zinc-500">{status}</p>}

      {(subject || emailBody) && (
        <div className="mt-8 space-y-3">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="subject"
            className={`${field} font-medium`}
          />
          <textarea
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            rows={16}
            className={`${field} leading-relaxed`}
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openMail}
              className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-ink"
            >
              Open in mail →
            </button>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(`Subject: ${subject}\n\n${emailBody}`);
                setStatus("Copied to clipboard.");
              }}
              className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:border-cyan/50 hover:text-cyan"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-zinc-600">
            On mobile this opens your Mail/Gmail app; on desktop, a Gmail compose
            tab — pre-filled, so you just review and hit send. The links become
            clickable once the email is sent.
          </p>
        </div>
      )}
    </div>
  );
}
