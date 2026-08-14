"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { AGREEMENT_VERSION, CONSENTS } from "@/lib/agreement";
import { track } from "@/lib/analytics";
import { recordLead } from "@/lib/leads";
import { EMAILJS } from "@/lib/emailjs";

type Status = "idle" | "sending" | "signed" | "error";

interface FormState {
  name: string;
  phone: string;
  email: string;
  college: string;
  project: string;
  tier: string;
}

const EMPTY: FormState = {
  name: "",
  phone: "",
  email: "",
  college: "",
  project: "",
  tier: "",
};

const TIERS = ["Source", "Academic", "Mentored", "Custom build"];

export default function ConsentForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [ticked, setTicked] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [signedAt, setSignedAt] = useState<string>("");
  const [copySent, setCopySent] = useState(false);

  const allTicked = CONSENTS.every((c) => ticked.has(c.id));

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorDetail(null);
    }
  };

  const toggle = (id: string) =>
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending" || !allTicked) return;

    setStatus("sending");
    const stamp = new Date().toISOString();

    // Record every clause that was ticked, and the version of the wording that
    // was on screen — a consent that cannot be tied to specific text is not
    // much of a record.
    const body = [
      "*** STUDENT AGREEMENT — CONSENT GIVEN ***",
      `Agreement version: ${AGREEMENT_VERSION}`,
      `Consented at: ${stamp}`,
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `College: ${form.college}`,
      `Project: ${form.project}`,
      `Tier: ${form.tier}`,
      "",
      "Clauses consented to:",
      ...CONSENTS.map((c) => `  [x] ${c.label}`),
      "",
      `User agent: ${typeof navigator === "undefined" ? "" : navigator.userAgent}`,
    ].join("\n");

    void recordLead({
      source: "agreement",
      name: form.name,
      email: form.email,
      phone: form.phone,
      org: form.college,
      interest: form.tier,
      context: `${form.project} · agreement v${AGREEMENT_VERSION}`,
      message: body,
    });

    try {
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        {
          name: form.name,
          email: form.email,
          message: body,
          to_email: EMAILJS.contactEmail,
          reply_to: form.email,
        },
        EMAILJS.publicKey,
      );

      // Second copy to the student. Best-effort and deliberately after the
      // one that matters: an agreement only one party holds is a weak record,
      // but failing to deliver their copy must not invalidate consent that has
      // already been captured.
      try {
        await emailjs.send(
          EMAILJS.service,
          EMAILJS.template,
          {
            name: form.name,
            email: EMAILJS.contactEmail,
            message: `${body}\n\n---\nThis is your copy of the agreement you consented to. Keep it. Questions about any clause are welcome at ${EMAILJS.contactEmail}.`,
            to_email: form.email,
            reply_to: EMAILJS.contactEmail,
          },
          EMAILJS.publicKey,
        );
        setCopySent(true);
      } catch (copyErr) {
        console.error("Student copy failed:", copyErr);
        track("agreement-copy-failed");
      }

      setSignedAt(stamp);
      setStatus("signed");
      track("agreement-signed");
    } catch (err) {
      const detail =
        err && typeof err === "object" && "text" in err
          ? `${(err as { status?: number }).status ?? ""} ${(err as { text?: string }).text ?? ""}`.trim()
          : String(err);
      console.error("Agreement send failed:", err);
      track("agreement-failed");
      setErrorDetail(detail || null);
      setStatus("error");
    }
  };

  if (status === "signed") {
    return (
      <section
        id="signed"
        className="rounded-2xl border border-cyan/40 bg-cyan/[0.04] p-6 sm:p-10 print:border-zinc-300 print:bg-white"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ice print:text-zinc-600">
          Agreement recorded
        </span>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 print:text-black">
          Consent given. A copy has been sent.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300 print:text-zinc-700">
          {copySent
            ? `A copy has been emailed to ${form.email}. Keep it — it is the record of exactly what was agreed, and it is what you point at if anything is ever unclear.`
            : "Save your own copy below and keep it — it is the record of exactly what was agreed. Your emailed copy did not go through, so please save the PDF."}
        </p>

        <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {[
            ["Name", form.name],
            ["Phone", form.phone],
            ["Email", form.email],
            ["College", form.college],
            ["Project", form.project],
            ["Tier", form.tier],
            ["Agreement version", AGREEMENT_VERSION],
            ["Consented at", new Date(signedAt).toLocaleString("en-IN")],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                {k}
              </dt>
              <dd className="mt-1 text-sm text-zinc-100 print:text-black">
                {v || "—"}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-8 space-y-2">
          {CONSENTS.map((c) => (
            <li
              key={c.id}
              className="flex gap-3 text-sm leading-relaxed text-zinc-300 print:text-zinc-700"
            >
              <span className="text-ice print:text-black">✓</span>
              {c.label}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => window.print()}
          className="mt-8 rounded-xl bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink print:hidden"
        >
          Save as PDF
        </button>
        <p className="mt-3 text-xs text-zinc-500 print:hidden">
          Opens your print dialog — choose &ldquo;Save as PDF&rdquo; as the
          destination.
        </p>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="consent"
      className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-10"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
        Your details
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" value={form.name} onChange={handleChange} />
        <Field
          label="Mobile number"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <Field
          label="College"
          name="college"
          value={form.college}
          onChange={handleChange}
        />
        <Field
          label="Project"
          name="project"
          value={form.project}
          onChange={handleChange}
        />
        <div>
          <label
            htmlFor="agr-tier"
            className="mb-2.5 block text-xs uppercase tracking-[0.2em] text-zinc-500"
          >
            Tier
          </label>
          <select
            id="agr-tier"
            name="tier"
            required
            value={form.tier}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-zinc-50 outline-none transition-colors duration-200 focus:border-cyan/60"
          >
            <option value="" disabled className="bg-ink">
              Select…
            </option>
            {TIERS.map((t) => (
              <option key={t} value={t} className="bg-ink">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight text-zinc-50">
        Consent
      </h2>
      <p className="mt-2 text-sm text-zinc-500">
        Tick each one. All six are required.
      </p>

      <ul className="mt-6 space-y-3">
        {CONSENTS.map((c) => {
          const on = ticked.has(c.id);
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => toggle(c.id)}
                aria-pressed={on}
                className="flex w-full gap-3.5 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left transition-colors duration-200 hover:border-white/20"
              >
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[11px] transition-colors duration-200 ${
                    on
                      ? "border-cyan/60 bg-cyan/20 text-ice"
                      : "border-white/20 text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span className="text-sm leading-relaxed text-zinc-300">
                  {c.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <motion.button
          type="submit"
          disabled={!allTicked || status === "sending"}
          whileHover={allTicked && status !== "sending" ? { scale: 1.02 } : undefined}
          whileTap={allTicked && status !== "sending" ? { scale: 0.98 } : undefined}
          className="rounded-xl bg-gradient-to-r from-cyan to-purple px-7 py-3.5 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          {status === "sending" ? "Recording…" : "I consent to this agreement"}
        </motion.button>

        {!allTicked && (
          <span className="text-sm text-zinc-500">
            {CONSENTS.length - ticked.size} left to tick
          </span>
        )}

        {status === "error" && (
          <p role="status" className="text-sm text-red-400">
            Could not record it. Try again, or send me a screenshot on WhatsApp.
            {errorDetail && (
              <span className="mt-1 block text-xs text-red-400/70">
                {errorDetail}
              </span>
            )}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={`agr-${name}`}
        className="mb-2.5 block text-xs uppercase tracking-[0.2em] text-zinc-500"
      >
        {label}
      </label>
      <input
        id={`agr-${name}`}
        name={name}
        type={type}
        required
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-zinc-50 outline-none transition-colors duration-200 focus:border-cyan/60"
      />
    </div>
  );
}
