"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

type Status = "idle" | "sending" | "sent" | "error";

interface FormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: string;
  budget: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  interest: "",
  budget: "",
  message: "",
};

const EMAILJS_SERVICE = "service_560nh3i";
const EMAILJS_TEMPLATE = "template_dyb1k4x";
const EMAILJS_PUBLIC_KEY = "mB56akvK2qStLNadU";
const CONTACT_EMAIL = "contact@streamerosai.com";

const INTERESTS = [
  "Architecture review / advisory",
  "AI integration into existing systems",
  "Fixed-scope custom build",
  "ERP or business system replacement",
  "Hosted tool subscription (small business)",
  "Not sure yet",
];

/** Budget bands qualify the lead without demanding a number they may not have. */
const BUDGETS = [
  "Under ₹1L",
  "₹1L – ₹5L",
  "₹5L – ₹15L",
  "₹15L+",
  "Monthly subscription",
  "Need guidance on this",
];

const STATUS_MESSAGE: Record<Exclude<Status, "idle" | "sending">, string> = {
  sent: "Sent. You'll get a reply within one working day, with an honest view on whether this is worth building.",
  error: "Something went wrong. Email contact@streamerosai.com directly and I'll pick it up there.",
};

interface Props {
  heading: string;
  intro: string;
  messageLabel: string;
  messagePlaceholder: string;
  /** Pre-selects the interest dropdown when a page is about one service. */
  defaultInterest?: string;
}

export default function SolutionsLeadForm({
  heading,
  intro,
  messageLabel,
  messagePlaceholder,
  defaultInterest = "",
}: Props) {
  const [form, setForm] = useState<FormState>({
    ...EMPTY_FORM,
    interest: defaultInterest,
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
    try {
      // The shared EmailJS template renders only {name, email, message}, so the
      // qualifying fields are folded into the body rather than added as
      // template variables that would silently vanish.
      const body = [
        "*** BUSINESS ENQUIRY ***",
        `Interest: ${form.interest}`,
        `Budget: ${form.budget}`,
        `Company: ${form.company}`,
        `Phone: ${form.phone}`,
        "",
        form.message,
      ].join("\n");

      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          name: form.name,
          email: form.email,
          message: body,
          to_email: CONTACT_EMAIL,
          reply_to: form.email,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
      setForm({ ...EMPTY_FORM, interest: defaultInterest });
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

  return (
    <section
      id="enquire"
      className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-10"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        {heading}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">{intro}</p>

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
            label="Work email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={isSending}
          />
          <Field
            label="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
            disabled={isSending}
          />
          <Field
            label="Phone"
            name="phone"
            type="tel"
            required={false}
            value={form.phone}
            onChange={handleChange}
            disabled={isSending}
          />
          <Select
            label="What you need"
            name="interest"
            value={form.interest}
            onChange={handleChange}
            disabled={isSending}
            options={INTERESTS}
          />
          <Select
            label="Budget range"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            disabled={isSending}
            options={BUDGETS}
          />
        </div>

        <div className="mt-5">
          <label
            htmlFor="solutions-message"
            className="mb-2.5 block text-xs uppercase tracking-[0.2em] text-zinc-500"
          >
            {messageLabel}
          </label>
          <textarea
            id="solutions-message"
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
            className="rounded-xl bg-gradient-to-r from-cyan to-purple px-6 py-3.5 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? "Sending…" : status === "sent" ? "Sent" : "Book the free call"}
          </motion.button>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-zinc-400 underline-offset-4 transition-colors hover:text-ice hover:underline"
          >
            or email {CONTACT_EMAIL}
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
  required?: boolean;
}

function Field({
  label,
  name,
  value,
  onChange,
  disabled,
  type = "text",
  required = true,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={`solutions-${name}`}
        className="mb-2.5 block text-xs uppercase tracking-[0.2em] text-zinc-500"
      >
        {label}
        {!required && <span className="ml-2 normal-case text-zinc-600">optional</span>}
      </label>
      <input
        id={`solutions-${name}`}
        name={name}
        type={type}
        required={required}
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
        htmlFor={`solutions-${name}`}
        className="mb-2.5 block text-xs uppercase tracking-[0.2em] text-zinc-500"
      >
        {label}
      </label>
      <select
        id={`solutions-${name}`}
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
