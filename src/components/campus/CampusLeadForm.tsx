"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { EMAILJS, OWNER_NAME } from "@/lib/emailjs";
import type { CampusTier, Degree } from "@/lib/campus";
import { formatInr, whatsappHref } from "@/lib/campus";
import { recordLead } from "@/lib/leads";
import { track } from "@/lib/analytics";

type Status = "idle" | "sending" | "sent" | "error";

interface FormState {
  name: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  year: string;
  tier: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  college: "",
  degree: "",
  year: "",
  tier: "",
  message: "",
};

const EMAILJS_SERVICE = EMAILJS.service;
const EMAILJS_TEMPLATE = EMAILJS.template;
const EMAILJS_PUBLIC_KEY = EMAILJS.publicKey;

const CONTACT_EMAIL = EMAILJS.contactEmail;

const DEGREES: Degree[] = ["BCA", "MCA", "B.Tech", "B.Sc IT", "M.Tech", "Diploma"];
const YEARS = ["Final year", "Pre-final year", "Other"];

const STATUS_MESSAGE: Record<Exclude<Status, "idle" | "sending">, string> = {
  sent: "Enquiry sent — I'll reply within a day with a plan and payment split.",
  error: "Something went wrong. WhatsApp me instead and I'll pick it up there.",
};

interface Props {
  /** Listing this enquiry is about; omit on the custom-build page. */
  projectTitle?: string;
  tiers?: CampusTier[];
  heading: string;
  intro: string;
  messageLabel: string;
  messagePlaceholder: string;
  /** Departments enquire as staff, not students — swap course/year for a role. */
  collegeSide?: boolean;
}

export default function CampusLeadForm({
  projectTitle,
  tiers,
  heading,
  intro,
  messageLabel,
  messagePlaceholder,
  collegeSide = false,
}: Props) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status === "error" || status === "sent") {
      setStatus("idle");
      setErrorDetail(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    // Durable record first, in parallel and unawaited — if EmailJS fails, the
    // enquiry still exists somewhere. Never blocks or fails the submit.
    void recordLead({
      source: "campus",
      name: form.name,
      email: form.email,
      phone: form.phone,
      org: form.college,
      interest: form.degree,
      context: projectTitle ?? (collegeSide ? "College enquiry" : "Custom build"),
      message: form.message,
    });

    try {
      // The shared EmailJS template only renders {name, email, message}, so the
      // campus-specific fields are folded into the message body rather than
      // added as template variables that would silently vanish.
      const body = [
        collegeSide
          ? "*** COLLEGE / DEPARTMENT ENQUIRY ***"
          : projectTitle
            ? `Project: ${projectTitle}`
            : "Project: CUSTOM BUILD",
        form.tier && `Tier: ${form.tier}`,
        `Phone: ${form.phone}`,
        `${collegeSide ? "Institution" : "College"}: ${form.college}`,
        collegeSide
          ? `Role: ${form.degree}`
          : `Course: ${form.degree}${form.year ? ` · ${form.year}` : ""}`,
        "",
        form.message,
      ]
        .filter(Boolean)
        .join("\n");

      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          name: form.name,
          from_name: form.name,
          to_name: OWNER_NAME,
          email: form.email,
          message: body,
          to_email: CONTACT_EMAIL,
          reply_to: form.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setForm(EMPTY_FORM);
      track(collegeSide ? "fyp-college-lead-submit" : "fyp-lead-submit");
    } catch (err) {
      const detail =
        err && typeof err === "object" && "text" in err
          ? `${(err as { status?: number }).status ?? ""} ${(err as { text?: string }).text ?? ""}`.trim()
          : String(err);
      console.error("EmailJS send failed:", err);
      setErrorDetail(detail || null);
      setStatus("error");
    }
  };

  const isSending = status === "sending";
  const whatsappLink = whatsappHref(
    collegeSide
      ? "Hi Yaseen, I'm from a college department and want to talk about final year project mentoring for our batch."
      : projectTitle
        ? `Hi Yaseen, I'm interested in the "${projectTitle}" final year project.`
        : "Hi Yaseen, I want a custom final year project built.",
  );

  return (
    <section
      id="enquire"
      className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-10"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        {heading}
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">{intro}</p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={isSending}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={isSending}
          />
          <Field
            label="WhatsApp number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            disabled={isSending}
          />
          <Field
            label={collegeSide ? "Institution" : "College"}
            name="college"
            value={form.college}
            onChange={handleChange}
            disabled={isSending}
          />
          {collegeSide ? (
            <Field
              label="Your role"
              name="degree"
              value={form.degree}
              onChange={handleChange}
              disabled={isSending}
            />
          ) : (
            <>
              <Select
                label="Course"
                name="degree"
                value={form.degree}
                onChange={handleChange}
                disabled={isSending}
                options={DEGREES}
              />
              <Select
                label="Year"
                name="year"
                value={form.year}
                onChange={handleChange}
                disabled={isSending}
                options={YEARS}
              />
            </>
          )}
          {tiers && (
            <div className="sm:col-span-2">
              <Select
                label="Tier you want"
                name="tier"
                value={form.tier}
                onChange={handleChange}
                disabled={isSending}
                options={tiers.map((t) => `${t.name} — ${formatInr(t.price)}`)}
              />
            </div>
          )}
        </div>

        <div className="mt-5">
          <label
            htmlFor="campus-message"
            className="mb-2.5 block text-xs uppercase tracking-[0.2em] text-zinc-500"
          >
            {messageLabel}
          </label>
          <textarea
            id="campus-message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            disabled={isSending}
            placeholder={messagePlaceholder}
            className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-zinc-50 outline-none transition-colors duration-200 placeholder:text-zinc-600 focus:border-cyan/60 focus:bg-white/[0.04] disabled:opacity-50"
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <motion.button
            type="submit"
            disabled={isSending}
            whileHover={isSending ? undefined : { scale: 1.03 }}
            whileTap={isSending ? undefined : { scale: 0.97 }}
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? "Sending…" : status === "sent" ? "Enquiry Sent" : "Send Enquiry"}
          </motion.button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("fyp-lead-whatsapp")}
            className="rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-[#04220F] transition-transform duration-200 hover:scale-[1.03]"
          >
            Or message on WhatsApp
          </a>

          {(status === "sent" || status === "error") && (
            <motion.p
              role="status"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-sm ${status === "error" ? "text-red-400" : "text-ice"}`}
            >
              {STATUS_MESSAGE[status]}
              {status === "error" && errorDetail && (
                <span className="mt-1 block text-xs text-red-400/70">{errorDetail}</span>
              )}
            </motion.p>
          )}
        </div>
      </form>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
}

function Field({ label, name, value, onChange, disabled, type = "text" }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={`campus-${name}`}
        className="mb-2.5 block text-xs uppercase tracking-[0.2em] text-zinc-500"
      >
        {label}
      </label>
      <input
        id={`campus-${name}`}
        name={name}
        type={type}
        required
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-zinc-50 outline-none transition-colors duration-200 placeholder:text-zinc-600 focus:border-cyan/60 focus:bg-white/[0.04] disabled:opacity-50"
      />
    </div>
  );
}

interface SelectProps {
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  options: string[];
}

function Select({ label, name, value, onChange, disabled, options }: SelectProps) {
  return (
    <div>
      <label
        htmlFor={`campus-${name}`}
        className="mb-2.5 block text-xs uppercase tracking-[0.2em] text-zinc-500"
      >
        {label}
      </label>
      <select
        id={`campus-${name}`}
        name={name}
        required
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-zinc-50 outline-none transition-colors duration-200 focus:border-cyan/60 focus:bg-white/[0.04] disabled:opacity-50"
      >
        <option value="" disabled className="bg-ink">
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
