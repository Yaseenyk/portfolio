"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import SectionLabel from "./SectionLabel";

type Status = "idle" | "sending" | "sent" | "error";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", message: "" };

const EMAILJS_SERVICE = "service_560nh3i";
const EMAILJS_TEMPLATE = "template_dyb1k4x";
const EMAILJS_PUBLIC_KEY = "mB56akvK2qStLNadU";

// Where enquiries are delivered + shown on the page.
const CONTACT_EMAIL = "contact@streamerosai.com";
const CONTACT_PHONE = "8208335028";

const STATUS_MESSAGE: Record<Exclude<Status, "idle" | "sending">, string> = {
  sent: "Message sent — thanks, I'll be in touch shortly.",
  error: "Something went wrong. Please try again.",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status === "error" || status === "sent") setStatus("idle");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        { ...form, to_email: CONTACT_EMAIL, reply_to: form.email },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  };

  const isSending = status === "sending";
  const buttonLabel =
    status === "sending"
      ? "Sending…"
      : status === "sent"
      ? "Message Sent"
      : "Send Message";

  return (
    <section id="contact" className="border-t border-white/5 py-24">
      <div className="flex justify-center">
        <SectionLabel index="03" title="Contact" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="mx-auto mt-12 max-w-xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Have a product to build? <br className="hidden sm:block" />
          <span className="text-gradient animate-gradient">Let&apos;s ship it.</span>
        </h2>

        <div className="mx-auto mt-6 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 text-zinc-300 transition-colors duration-200 hover:text-ice"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ice shadow-[0_0_6px_1px_rgba(103,232,249,0.7)]" />
            {CONTACT_EMAIL}
          </a>
          <a
            href={`tel:+91${CONTACT_PHONE}`}
            className="inline-flex items-center gap-2 text-zinc-300 transition-colors duration-200 hover:text-ice"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ice shadow-[0_0_6px_1px_rgba(103,232,249,0.7)]" />
            +91 {CONTACT_PHONE}
          </a>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-2xl text-left">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
          </div>

          <div className="mt-6">
            <label
              htmlFor="message"
              className="mb-2.5 block text-xs uppercase tracking-[0.2em] text-zinc-500"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              disabled={isSending}
              placeholder="Tell me about the project…"
              className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-zinc-50 outline-none transition-colors duration-200 placeholder:text-zinc-600 focus:border-cyan/60 focus:bg-white/[0.04] disabled:opacity-50"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <motion.button
              type="submit"
              disabled={isSending}
              whileHover={isSending ? undefined : { scale: 1.03 }}
              whileTap={isSending ? undefined : { scale: 0.97 }}
              className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {buttonLabel}
            </motion.button>

            {(status === "sent" || status === "error") && (
              <motion.p
                role="status"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-sm ${
                  status === "error" ? "text-red-400" : "text-ice"
                }`}
              >
                {STATUS_MESSAGE[status]}
              </motion.p>
            )}
          </div>
        </form>
      </motion.div>
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

function Field({
  label,
  name,
  value,
  onChange,
  disabled,
  type = "text",
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2.5 block text-xs uppercase tracking-[0.2em] text-zinc-500"
      >
        {label}
      </label>
      <input
        id={name}
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
