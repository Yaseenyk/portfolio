"use client";

import { useEffect, useState, type FormEvent } from "react";

const CONCIERGE_URL = process.env.NEXT_PUBLIC_CONCIERGE_URL ?? "";

/** Row shape mirrors worker/schema.sql. */
interface Lead {
  id: string;
  created_at: string;
  source: string;
  name: string;
  email: string;
  phone?: string;
  org?: string;
  interest?: string;
  budget?: string;
  context?: string;
  message: string;
  page?: string;
}

type Filter = "all" | "campus" | "solutions";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "campus", label: "Students" },
  { id: "solutions", label: "Business" },
];

/** Same-session convenience only — the worker re-checks on every request. */
const PASS_KEY = "leads-passcode";

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

/** wa.me needs digits with country code; assume India when 10 digits. */
function waNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

export default function LeadsInbox() {
  const [passcode, setPasscode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async (code: string, source: Filter) => {
    if (!CONCIERGE_URL) {
      setStatus("Concierge URL not configured in this build.");
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`${CONCIERGE_URL}/api/leads/list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passcode: code,
          ...(source === "all" ? {} : { source }),
          limit: 200,
        }),
      });
      const data = (await res.json()) as {
        leads?: Lead[];
        error?: string;
        reason?: string;
      };
      if (!res.ok) {
        setStatus(data.error ?? `Request failed (${res.status}).`);
        if (res.status === 401) {
          setUnlocked(false);
          sessionStorage.removeItem(PASS_KEY);
        }
        return;
      }
      setLeads(data.leads ?? []);
      setUnlocked(true);
      sessionStorage.setItem(PASS_KEY, code);
      if (data.reason === "no database bound") {
        setStatus(
          "The worker responded, but no D1 database is bound yet — leads are not being stored. Run the activation steps in worker/wrangler.toml.",
        );
      } else if ((data.leads ?? []).length === 0) {
        setStatus("No enquiries stored yet.");
      }
    } catch {
      setStatus("Could not reach the worker.");
    } finally {
      setLoading(false);
    }
  };

  // Resume within the same tab without retyping.
  useEffect(() => {
    const saved = sessionStorage.getItem(PASS_KEY);
    if (saved) {
      setPasscode(saved);
      void load(saved, "all");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (passcode.trim()) void load(passcode.trim(), filter);
  };

  const pick = (f: Filter) => {
    setFilter(f);
    void load(passcode, f);
  };

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-md px-6 py-24">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Leads inbox
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Durable record of every enquiry — the copy that survives an EmailJS
          failure.
        </p>
        <form onSubmit={submit} className="mt-8">
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Passcode"
            autoFocus
            className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-zinc-50 outline-none transition-colors duration-200 placeholder:text-zinc-600 focus:border-cyan/60"
          />
          <button
            type="submit"
            disabled={loading || !passcode.trim()}
            className="mt-4 w-full rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Checking…" : "Open inbox"}
          </button>
          {status && <p className="mt-4 text-sm text-red-400">{status}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
            Leads inbox
          </h1>
          <p className="mt-1 font-mono text-xs text-zinc-600">
            {leads.length} enquir{leads.length === 1 ? "y" : "ies"} · newest first
          </p>
        </div>
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => pick(f.id)}
              className={`rounded-lg border px-4 py-2 text-xs transition-colors duration-200 ${
                filter === f.id
                  ? "border-cyan/60 bg-cyan/10 text-ice"
                  : "border-white/10 text-zinc-400 hover:border-cyan/40 hover:text-zinc-200"
              }`}
            >
              {f.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => void load(passcode, filter)}
            disabled={loading}
            className="rounded-lg border border-white/10 px-4 py-2 text-xs text-zinc-400 transition-colors duration-200 hover:border-cyan/40 hover:text-zinc-200 disabled:opacity-50"
          >
            {loading ? "…" : "Refresh"}
          </button>
        </div>
      </div>

      {status && <p className="mt-6 text-sm text-amber-400/90">{status}</p>}

      <ul className="mt-8 space-y-4">
        {leads.map((l) => (
          <li
            key={l.id}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-3">
                <span className="text-base font-medium text-zinc-50">{l.name}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${
                    l.source === "solutions"
                      ? "bg-purple/10 text-purple"
                      : "bg-cyan/10 text-cyan"
                  }`}
                >
                  {l.source === "solutions" ? "business" : "student"}
                </span>
              </div>
              <span className="font-mono text-xs text-zinc-600">
                {fmtDate(l.created_at)}
              </span>
            </div>

            <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
              {[
                ["Org / college", l.org],
                ["Interest", l.interest],
                ["Budget", l.budget],
                ["Context", l.context],
                ["From page", l.page],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k as string} className="flex gap-2">
                    <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] leading-6 text-zinc-600">
                      {k}
                    </dt>
                    <dd className="truncate text-zinc-400">{v}</dd>
                  </div>
                ))}
            </dl>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
              {l.message}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <a
                href={`mailto:${l.email}`}
                className="text-ice underline decoration-cyan/30 underline-offset-4 hover:decoration-cyan"
              >
                {l.email}
              </a>
              {l.phone && (
                <a
                  href={`https://wa.me/${waNumber(l.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] underline decoration-[#25D366]/30 underline-offset-4 hover:decoration-[#25D366]"
                >
                  WhatsApp {l.phone}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
