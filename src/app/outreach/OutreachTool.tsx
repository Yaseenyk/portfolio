"use client";

import { useState } from "react";

const CONCIERGE_URL = process.env.NEXT_PUBLIC_CONCIERGE_URL ?? "";

function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

export default function OutreachTool() {
  // "role" tailors to a job description; "agency" introduces Yaseen to a
  // staffing consultant who has no vacancy in hand, where the JD field is
  // meaningless and the email has to answer what a recruiter screens on.
  // "jobs" logs an application you just submitted: the screenshot is read for
  // company / role / platform, you correct the fields, one tap writes the row
  // to the Google Sheet tracker and files the screenshot in Drive.
  const [mode, setMode] = useState<"role" | "agency" | "jobs">("role");
  const [passcode, setPasscode] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [jd, setJd] = useState("");
  const [showJd, setShowJd] = useState(false);
  const [image, setImage] = useState(""); // data URL of an uploaded job-post screenshot
  const [imageName, setImageName] = useState("");

  const EMPTY_JOB = { company: "", role: "", platform: "", location: "", url: "", applicants: "", date: "", notes: "" };
  const [job, setJob] = useState(EMPTY_JOB);
  const [jobRead, setJobRead] = useState(false);
  const [saved, setSaved] = useState<{ row?: number; screenshotUrl?: string; sheetUrl?: string } | null>(null);
  const setJobField = (k: keyof typeof EMPTY_JOB, v: string) => setJob((j) => ({ ...j, [k]: v }));

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
        body: JSON.stringify({ passcode, company, companyUrl, jd, image, mode }),
      });
      const data = (await res.json()) as {
        subject?: string;
        body?: string;
        error?: string;
        researched?: boolean;
        tailored?: boolean;
        extractedEmail?: string;
        extractedCompany?: string;
      };
      if (!res.ok) return setStatus(data.error ?? `Error ${res.status}`);
      setSubject(data.subject ?? "");
      setEmailBody(data.body ?? "");
      // Auto-fill anything the screenshot extraction pulled out.
      if (data.extractedEmail && !email) setEmail(data.extractedEmail);
      if (data.extractedCompany && !company) setCompany(data.extractedCompany);
      const bits = [
        image ? "read the screenshot" : null,
        data.tailored ? "tailored to the JD" : null,
        data.researched ? "read their website" : null,
      ].filter(Boolean);
      setStatus(
        `Draft ready${bits.length ? ` (${bits.join(", ")})` : ""}.${data.extractedEmail && !email ? ` Found email: ${data.extractedEmail}.` : ""} Review, then open in your mail.`,
      );
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

  const extractJob = async () => {
    if (!CONCIERGE_URL) return setStatus("Concierge URL not configured in this build.");
    if (!passcode) return setStatus("Enter the passcode first.");
    if (!image) return setStatus("Upload the application screenshot first.");
    setBusy(true);
    setSaved(null);
    setStatus("Reading the screenshot…");
    try {
      const res = await fetch(`${CONCIERGE_URL}/api/jobs/extract`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode, image }),
      });
      const data = (await res.json()) as { fields?: Partial<typeof EMPTY_JOB>; error?: string };
      if (!res.ok) return setStatus(data.error ?? `Error ${res.status}`);
      setJob((j) => ({ ...j, ...Object.fromEntries(Object.entries(data.fields ?? {}).filter(([, v]) => v)) }));
      setJobRead(true);
      setStatus("Check the fields, fix anything wrong, then save.");
    } catch {
      setStatus("Network error reading the screenshot.");
    } finally {
      setBusy(false);
    }
  };

  const saveJob = async () => {
    if (!CONCIERGE_URL) return setStatus("Concierge URL not configured in this build.");
    if (!passcode) return setStatus("Enter the passcode first.");
    if (!job.company && !job.role) return setStatus("Company or role is required.");
    setBusy(true);
    setStatus("Saving to the tracker…");
    try {
      const res = await fetch(`${CONCIERGE_URL}/api/jobs/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode, ...job, image }),
      });
      const data = (await res.json()) as { ok?: boolean; row?: number; screenshotUrl?: string; sheetUrl?: string; error?: string };
      if (!res.ok || !data.ok) return setStatus(data.error ?? `Error ${res.status}`);
      setSaved({ row: data.row, screenshotUrl: data.screenshotUrl, sheetUrl: data.sheetUrl });
      setStatus(`Saved as row ${data.row ?? "?"}.`);
      setJob(EMPTY_JOB);
      setJobRead(false);
      setImage("");
      setImageName("");
    } catch {
      setStatus("Network error reaching the tracker.");
    } finally {
      setBusy(false);
    }
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
        Upload a screenshot of the job post (or paste the JD) and ChatGPT reads
        the company, role, JD, and contact email, then writes the whole
        application email with your links. Then it opens in your mail, ready to
        review and send.
      </p>

      <div className="mt-8 space-y-3">
        <div className="flex gap-2" role="group" aria-label="Draft type">
          {(
            [
              ["role", "A specific role"],
              ["agency", "A staffing consultant"],
              ["jobs", "Log a job"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              aria-pressed={mode === value}
              className={`flex-1 rounded-lg border px-3 py-2.5 font-mono text-xs transition-colors ${
                mode === value
                  ? "border-cyan/60 bg-cyan/10 text-cyan"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="passcode"
          className={field}
          autoComplete="off"
        />
        {mode !== "jobs" && (
          <>
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
          </>
        )}

        {/* Upload a screenshot — in role mode it OCRs the job post (company,
            role, JD, email); in jobs mode it reads the submitted application.
            Meaningless when writing to a consultant with no vacancy. */}
        {mode !== "agency" && (
          <>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-zinc-700 px-3 py-2.5 font-mono text-xs text-zinc-400 transition-colors hover:border-cyan/50 hover:text-cyan">
          <span>📎</span>
          {imageName
            ? `Screenshot: ${imageName}`
            : mode === "jobs"
              ? "Upload the screenshot of the application you just submitted"
              : "Upload a job-post screenshot (it reads company, role, JD, email)"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setImageName(f.name);
              const reader = new FileReader();
              reader.onload = () => setImage(String(reader.result ?? ""));
              reader.readAsDataURL(f);
            }}
          />
        </label>
        {image && (
          <button
            type="button"
            onClick={() => {
              setImage("");
              setImageName("");
            }}
            className="font-mono text-[11px] text-zinc-600 hover:text-zinc-400"
          >
            × remove screenshot
          </button>
        )}

        {/* Optional JD tab (or let the screenshot fill it) */}
        {mode === "role" && (
          <>
        <button
          type="button"
          onClick={() => setShowJd((v) => !v)}
          className="flex items-center gap-2 font-mono text-xs text-zinc-400 transition-colors hover:text-cyan"
        >
          <span className={`inline-block transition-transform ${showJd ? "rotate-90" : ""}`}>▸</span>
          {jd.trim() ? "Job description added" : "Or paste a job description (optional)"}
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
          </>
        )}
          </>
        )}

        {mode !== "jobs" && (
        <button
          type="button"
          onClick={draft}
          disabled={busy}
          className="rounded-lg bg-cyan px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_0_18px_-4px_rgba(34,211,238,0.7)] transition-shadow hover:shadow-[0_0_24px_-2px_rgba(34,211,238,0.8)] disabled:opacity-50"
        >
          {busy ? "drafting…" : "Draft email with ChatGPT"}
        </button>
        )}

        {mode === "jobs" && (
          <>
            {!jobRead && (
              <button
                type="button"
                onClick={extractJob}
                disabled={busy || !image}
                className="rounded-lg bg-cyan px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_0_18px_-4px_rgba(34,211,238,0.7)] transition-shadow hover:shadow-[0_0_24px_-2px_rgba(34,211,238,0.8)] disabled:opacity-50"
              >
                {busy ? "reading…" : "Read screenshot"}
              </button>
            )}
            {(jobRead || job.company || job.role) && (
              <div className="space-y-3 rounded-lg border border-zinc-800 p-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input value={job.company} onChange={(e) => setJobField("company", e.target.value)} placeholder="company *" className={field} />
                  <input value={job.role} onChange={(e) => setJobField("role", e.target.value)} placeholder="role *" className={field} />
                  <input value={job.platform} onChange={(e) => setJobField("platform", e.target.value)} placeholder="platform (Cutshort, LinkedIn…)" className={field} />
                  <input value={job.location} onChange={(e) => setJobField("location", e.target.value)} placeholder="location / Remote" className={field} />
                  <input value={job.url} onChange={(e) => setJobField("url", e.target.value)} placeholder="job URL" className={field} />
                  <input value={job.applicants} onChange={(e) => setJobField("applicants", e.target.value)} placeholder="applicants (if shown)" className={field} inputMode="numeric" />
                  <input value={job.date} onChange={(e) => setJobField("date", e.target.value)} placeholder="date (YYYY-MM-DD, blank = today)" className={field} />
                  <input value={job.notes} onChange={(e) => setJobField("notes", e.target.value)} placeholder="notes" className={field} />
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={saveJob}
                    disabled={busy}
                    className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-ink disabled:opacity-50"
                  >
                    {busy ? "saving…" : "Save to tracker"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setJob(EMPTY_JOB); setJobRead(false); }}
                    className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:border-cyan/50 hover:text-cyan"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
            {saved && (
              <p className="font-mono text-xs text-zinc-400">
                {saved.sheetUrl && (
                  <a href={saved.sheetUrl} target="_blank" rel="noreferrer" className="text-cyan hover:underline">open the sheet ↗</a>
                )}
                {saved.screenshotUrl && saved.screenshotUrl.startsWith("http") && (
                  <>
                    {" · "}
                    <a href={saved.screenshotUrl} target="_blank" rel="noreferrer" className="text-cyan hover:underline">screenshot in Drive ↗</a>
                  </>
                )}
              </p>
            )}
          </>
        )}
      </div>

      {status && <p className="mt-4 font-mono text-xs text-zinc-500">{status}</p>}

      {mode !== "jobs" && (subject || emailBody) && (
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
