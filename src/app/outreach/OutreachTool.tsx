"use client";

import { useState } from "react";

const CONCIERGE_URL = process.env.NEXT_PUBLIC_CONCIERGE_URL ?? "";

export default function OutreachTool() {
  const [passcode, setPasscode] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [goal, setGoal] = useState("");

  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const draft = async () => {
    if (!CONCIERGE_URL) {
      setStatus("Concierge URL not configured in this build.");
      return;
    }
    if (!passcode) {
      setStatus("Enter the passcode first.");
      return;
    }
    setBusy(true);
    setStatus("Drafting…");
    try {
      const res = await fetch(`${CONCIERGE_URL}/api/outreach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode, name, company, companyUrl, goal }),
      });
      const data = (await res.json()) as {
        subject?: string;
        body?: string;
        error?: string;
        researched?: boolean;
        grounded?: boolean;
      };
      if (!res.ok) {
        setStatus(data.error ?? `Error ${res.status}`);
        return;
      }
      setSubject(data.subject ?? "");
      setEmailBody(data.body ?? "");
      const bits = [
        data.grounded ? "grounded in your corpus" : null,
        data.researched ? "read their website" : null,
      ].filter(Boolean);
      setStatus(
        `Draft ready${bits.length ? ` (${bits.join(", ")})` : ""} — review, edit, then open in Gmail.`,
      );
    } catch {
      setStatus("Network error reaching the drafter.");
    } finally {
      setBusy(false);
    }
  };

  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(email)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(emailBody)}`;

  const copy = () => {
    navigator.clipboard?.writeText(`Subject: ${subject}\n\n${emailBody}`);
    setStatus("Copied to clipboard.");
  };

  const field =
    "w-full rounded-lg border border-zinc-800 bg-ink px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-cyan/50";

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
        ~/outreach · private
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-50">
        Outreach drafter
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        Give it a person, a company, and what you want. It reads their website,
        pulls the most relevant proof from your own corpus, and drafts a
        grounded, personalized email — then you send it from Gmail. Nothing is
        sent automatically.
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="prospect email *" className={field} />
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="person's name" className={field} />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="company" className={field} />
          <input value={companyUrl} onChange={(e) => setCompanyUrl(e.target.value)} placeholder="company website (optional — it reads it)" className={field} />
        </div>
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="what you want — e.g. 'a senior full-stack role' or 'to build their MVP'"
          className={field}
        />
        <button
          type="button"
          onClick={draft}
          disabled={busy}
          className="rounded-lg bg-cyan px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_0_18px_-4px_rgba(34,211,238,0.7)] transition-shadow hover:shadow-[0_0_24px_-2px_rgba(34,211,238,0.8)] disabled:opacity-50"
        >
          {busy ? "drafting…" : "Draft email"}
        </button>
      </div>

      {status && (
        <p className="mt-4 font-mono text-xs text-zinc-500">{status}</p>
      )}

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
            rows={12}
            className={`${field} leading-relaxed`}
          />
          <div className="flex flex-wrap gap-3">
            <a
              href={email ? gmailUrl : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!email}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold ${
                email
                  ? "bg-emerald-500 text-ink"
                  : "cursor-not-allowed bg-zinc-800 text-zinc-500"
              }`}
            >
              Open in Gmail →
            </a>
            <button
              type="button"
              onClick={copy}
              className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:border-cyan/50 hover:text-cyan"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-zinc-600">
            Review every draft before sending. Personalize the first line
            further if you can — generic sends get filtered and ignored.
          </p>
        </div>
      )}
    </div>
  );
}
