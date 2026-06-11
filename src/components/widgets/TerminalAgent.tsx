"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Role = "user" | "assistant" | "system";

interface TermMessage {
  id: number;
  role: Role;
  text: string;
}

const PROMPT = "guest@yaseen-os:~$";

const BOOT_LINES = [
  "Initializing streamerOS RAG Agent v2.4.1...",
  "Loading semantic cache... [OK]",
  "Type a question about Yaseen's experience to begin.",
];

/** Grounded mock corpus — swap this lookup for the Vercel AI SDK `useChat`
 *  transport later; the rest of the component only consumes message objects. */
const KNOWLEDGE: { match: RegExp; answer: string }[] = [
  {
    match: /stack|tech|tool|skill|language|framework/i,
    answer:
      "Yaseen is a Senior Full-Stack AI Engineer specializing in Next.js 14 (App Router), Node.js, and strict TypeScript, with an edge-native AI layer: Hono on Cloudflare Workers, LangGraph orchestration, and Upstash Vector for retrieval.",
  },
  {
    match: /experience|work|role|job|career|background/i,
    answer:
      "Yaseen architects production AI systems — Agentic RAG pipelines, LLM orchestration, and high-throughput backend scaling. Current focus: infrastructure economics (FinOps for LLM inference) and client-side resiliency. See /interview for the leadership briefing.",
  },
  {
    match: /project|built|portfolio|streameros|integratex|rag/i,
    answer:
      "Flagships: streamerOS (Rust desktop cockpit with live telemetry), IntegrateX (React Flow workflow automation — 94% payload reduction via a lossless schema-aware serialization adapter), and a strict context-grounded RAG tier-1 support assistant.",
  },
  {
    match: /contact|email|hire|reach|linkedin|github/i,
    answer:
      "Reach Yaseen at yaseenkhatib04@gmail.com, github.com/Yaseenyk, or linkedin.com/in/yaseen-yk. Machine-readable profile: /ai-briefing.json.",
  },
  {
    match: /resume|cv/i,
    answer:
      "Resume available at /Resume.pdf — or press Cmd+K anywhere on this site and select 'Download Resume'.",
  },
];

const FALLBACK_ANSWER =
  "Query is outside my grounded context — I only answer from indexed portfolio chunks. Try: \"What is Yaseen's tech stack?\", \"Tell me about his projects\", or \"How do I contact him?\"";

function getMockAnswer(query: string): string {
  return KNOWLEDGE.find((k) => k.match.test(query))?.answer ?? FALLBACK_ANSWER;
}

function traceLines(): string[] {
  return [
    `> [Vector Search: ${38 + Math.floor(Math.random() * 22)}ms]`,
    "> [Context Retrieved: 3 chunks]",
    "> [Guardrail Check: Passed]",
  ];
}

const CHAR_INTERVAL_MS = 14;
const TRACE_STEP_MS = 320;

export default function TerminalAgent() {
  const [messages, setMessages] = useState<TermMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(true);
  const [streaming, setStreaming] = useState(false);

  const idRef = useRef(0);
  const timersRef = useRef<Set<number>>(new Set());
  const intervalRef = useRef<number | null>(null);
  const historyRef = useRef<string[]>([]);
  const historyIdxRef = useRef(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = useCallback((role: Role, text: string) => {
    idRef.current += 1;
    const id = idRef.current;
    setMessages((m) => [...m, { id, role, text }]);
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(() => {
      timersRef.current.delete(id);
      fn();
    }, delay);
    timersRef.current.add(id);
  }, []);

  // Clear every pending timer/interval on unmount.
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  // Boot sequence.
  useEffect(() => {
    BOOT_LINES.forEach((line, i) =>
      schedule(() => {
        push("system", line);
        if (i === BOOT_LINES.length - 1) setBusy(false);
      }, 350 * (i + 1)),
    );
  }, [push, schedule]);

  // Pin scroll to bottom as content streams in.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Return focus to the prompt when a run finishes.
  useEffect(() => {
    if (!busy) inputRef.current?.focus();
  }, [busy]);

  const streamAnswer = useCallback((full: string) => {
    idRef.current += 1;
    const msgId = idRef.current;
    setMessages((m) => [...m, { id: msgId, role: "assistant", text: "" }]);
    setStreaming(true);

    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setMessages((m) =>
        m.map((msg) =>
          msg.id === msgId ? { ...msg, text: full.slice(0, i) } : msg,
        ),
      );
      if (i >= full.length) {
        clearInterval(interval);
        intervalRef.current = null;
        setStreaming(false);
        setBusy(false);
      }
    }, CHAR_INTERVAL_MS);
    intervalRef.current = interval;
  }, []);

  const handleSubmit = useCallback(() => {
    const query = input.trim();
    if (!query || busy) return;

    historyRef.current.push(query);
    historyIdxRef.current = -1;
    setInput("");
    setBusy(true);
    push("user", query);

    const trace = traceLines();
    trace.forEach((line, i) =>
      schedule(() => push("system", line), TRACE_STEP_MS * (i + 1)),
    );
    schedule(
      () => streamAnswer(getMockAnswer(query)),
      TRACE_STEP_MS * (trace.length + 1),
    );
  }, [input, busy, push, schedule, streamAnswer]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const history = historyRef.current;
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      historyIdxRef.current = Math.min(
        historyIdxRef.current + 1,
        history.length - 1,
      );
      setInput(history[history.length - 1 - historyIdxRef.current] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdxRef.current <= 0) {
        historyIdxRef.current = -1;
        setInput("");
        return;
      }
      historyIdxRef.current -= 1;
      setInput(history[history.length - 1 - historyIdxRef.current] ?? "");
    }
  };

  const lastMessage = messages[messages.length - 1];

  return (
    <div
      className="overflow-hidden rounded-xl border border-zinc-800 bg-ink font-mono text-xs leading-relaxed"
      onClick={() => inputRef.current?.focus()}
    >
      {/* macOS window chrome */}
      <div className="relative flex items-center border-b border-zinc-800 bg-white/[0.02] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="absolute left-1/2 -translate-x-1/2 text-[11px] text-zinc-500">
          rag-concierge — zsh
        </span>
        <span className="ml-auto text-[10px] uppercase tracking-wider text-zinc-600">
          {busy ? "running" : "idle"}
        </span>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="RAG agent terminal output"
        className="h-72 overflow-y-auto px-4 py-3"
      >
        {messages.map((msg) => {
          if (msg.role === "user") {
            return (
              <p key={msg.id} className="mt-2 text-zinc-100">
                <span className="text-cyan [text-shadow:0_0_8px_rgba(34,211,238,0.45)]">
                  {PROMPT}
                </span>{" "}
                {msg.text}
              </p>
            );
          }
          if (msg.role === "system") {
            return (
              <p key={msg.id} className="text-zinc-500">
                {msg.text}
              </p>
            );
          }
          const isStreamingThis = streaming && msg.id === lastMessage?.id;
          return (
            <p key={msg.id} className="mt-1 whitespace-pre-wrap text-zinc-300">
              {msg.text}
              {isStreamingThis && (
                <span className="ml-0.5 inline-block h-3.5 w-2 animate-pulse bg-cyan align-text-bottom" />
              )}
            </p>
          );
        })}

        {/* Input prompt — hidden while a command runs, like a real shell */}
        {!busy && (
          <div className="mt-2 flex items-center gap-2">
            <span className="shrink-0 text-cyan [text-shadow:0_0_8px_rgba(34,211,238,0.45)]">
              {PROMPT}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Ask the RAG agent about Yaseen's experience"
              className="w-full bg-transparent text-zinc-100 caret-cyan outline-none placeholder:text-zinc-700"
              placeholder="ask about stack, projects, experience…"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
