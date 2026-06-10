"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface CommandItem {
  id: string;
  label: string;
  category: string;
  /** Extra matchable text beyond the label. */
  keywords: string;
  icon: ReactNode;
  run: (router: ReturnType<typeof useRouter>) => void;
}

const iconProps = {
  className: "h-4 w-4 shrink-0",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const ITEMS: CommandItem[] = [
  {
    id: "resume",
    label: "Download Resume",
    category: "Document",
    keywords: "cv pdf hire download resume",
    icon: (
      <svg {...iconProps}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M12 18v-6" />
        <path d="m9 15 3 3 3-3" />
      </svg>
    ),
    run: () => window.open(`${BASE_PATH}/Resume.pdf`, "_blank", "noopener"),
  },
  {
    id: "lab",
    label: "Enter AI Infrastructure Lab",
    category: "Sandbox",
    keywords: "sandbox chaos finops simulator resiliency lab widgets",
    icon: (
      <svg {...iconProps}>
        <path d="M10 2v7.31L4.34 19.03A2 2 0 0 0 6.07 22h11.86a2 2 0 0 0 1.73-2.97L14 9.31V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    ),
    run: (router) => router.push("/sandbox"),
  },
  {
    id: "masterclass",
    label: "Read AI Masterclass: 94% Payload Compression",
    category: "Field Notes",
    keywords: "blog article serialization adapter react flow payload",
    icon: (
      <svg {...iconProps}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    run: (router) => router.push("/blog/94-percent-payload-reduction-react-flow"),
  },
  {
    id: "streameros",
    label: "Run streamerOS RAG Agent",
    category: "Product",
    keywords: "project rust desktop cockpit streaming telemetry",
    icon: (
      <svg {...iconProps}>
        <path d="m4 17 6-6-6-6" />
        <path d="M12 19h8" />
      </svg>
    ),
    run: (router) => router.push("/products/streameros"),
  },
];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter((item) =>
      `${item.label} ${item.category} ${item.keywords}`.toLowerCase().includes(q),
    );
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    restoreFocusRef.current?.focus();
    restoreFocusRef.current = null;
  }, []);

  // Global Cmd+K / Ctrl+K toggle.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) {
          close();
        } else {
          restoreFocusRef.current = document.activeElement as HTMLElement | null;
          setQuery("");
          setActiveIndex(0);
          setOpen(true);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Scroll lock + autofocus while open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(raf);
    };
  }, [open]);

  // Keep the active row visible while arrowing through a scrolled list.
  useEffect(() => {
    listRef.current
      ?.querySelector(`#cmdk-option-${activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const select = useCallback(
    (item: CommandItem) => {
      close();
      item.run(router);
    },
    [close, router],
  );

  const onDialogKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) =>
          filtered.length ? (i - 1 + filtered.length) % filtered.length : 0,
        );
        break;
      case "Enter": {
        e.preventDefault();
        const item = filtered[activeIndex];
        if (item) select(item);
        break;
      }
      // Single focusable control (the input) — trap focus by swallowing Tab.
      case "Tab":
        e.preventDefault();
        break;
    }
  };

  const activeId = filtered.length ? `cmdk-option-${activeIndex}` : undefined;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-zinc-950/80 px-4 pt-[18vh] backdrop-blur-sm"
          onMouseDown={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-ink shadow-[0_0_60px_-12px_rgba(34,211,238,0.35)]"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onDialogKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-zinc-800 px-4">
              <svg {...iconProps} className="h-4 w-4 shrink-0 text-zinc-500">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-activedescendant={activeId}
                aria-autocomplete="list"
                aria-label="Search commands"
                placeholder="Type a command or search…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                className="w-full bg-transparent py-4 text-base text-zinc-100 outline-none placeholder:text-zinc-600"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 sm:block">
                esc
              </kbd>
            </div>

            <ul
              ref={listRef}
              id="cmdk-list"
              role="listbox"
              aria-label="Quick actions"
              className="max-h-80 overflow-y-auto py-2"
            >
              {filtered.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-zinc-600">
                  No results for{" "}
                  <span className="font-mono text-zinc-400">
                    &ldquo;{query}&rdquo;
                  </span>
                </li>
              )}
              {filtered.map((item, i) => {
                const active = i === activeIndex;
                return (
                  <li
                    key={item.id}
                    id={`cmdk-option-${i}`}
                    role="option"
                    aria-selected={active}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => select(item)}
                    className={`flex cursor-pointer items-center gap-3 border-l-2 px-4 py-3 transition-colors duration-150 ${
                      active
                        ? "border-cyan bg-cyan-900/30 text-zinc-50"
                        : "border-transparent text-zinc-400"
                    }`}
                  >
                    <span className={active ? "text-cyan" : "text-zinc-500"}>
                      {item.icon}
                    </span>
                    <span className="flex-1 text-sm">{item.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                      {item.category}
                    </span>
                    {active && (
                      <span className="font-mono text-[10px] text-cyan">↵</span>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-zinc-800 px-4 py-2.5 font-mono text-[11px] text-zinc-500">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[10px]">
                  ↑↓
                </kbd>
                navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[10px]">
                  ↵
                </kbd>
                select
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[10px]">
                  esc
                </kbd>
                close
              </span>
              <span className="ml-auto hidden items-center gap-1.5 sm:flex">
                <kbd className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[10px]">
                  ⌘K
                </kbd>
                toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
