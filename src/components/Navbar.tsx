"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PulseDot from "./PulseDot";
import { RESUME_URL } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

interface NavLeaf {
  href: string;
  label: string;
  /** One line shown under the label in the dropdown. */
  desc?: string;
  external?: boolean;
}

interface NavGroup {
  label: string;
  /** Landing page for the group itself; the label links here. */
  href: string;
  /** Rendered as a flat list, split by `divider: true` entries. */
  items: (NavLeaf | { divider: true })[];
}

/**
 * Five top-level entries, each opening a submenu. Keeping the island small
 * matters more than exposing every route — depth lives in the dropdowns, and
 * every page stays two clicks away.
 */
const GROUPS: NavGroup[] = [
  {
    label: "Solutions",
    href: "/solutions/",
    items: [
      {
        href: "/solutions/business/",
        label: "For businesses",
        desc: "Fixed prices, you own the code",
      },
      {
        href: "/solutions/small-business/",
        label: "For small businesses",
        desc: "Hosted tools from ₹800/month",
      },
      { divider: true },
      { href: "/solutions/business#architecture", label: "Architecture review" },
      { href: "/solutions/business#ai-integration", label: "AI integration" },
      { href: "/solutions/business#custom-build", label: "Custom systems" },
      { href: "/solutions/business#erp", label: "ERP replacement" },
    ],
  },
  {
    label: "Work",
    href: "/projects/",
    items: [
      {
        href: "/projects/",
        label: "All projects",
        desc: "Client and enterprise systems",
      },
      {
        href: "/products/",
        label: "Products",
        desc: "Shipped solo, with teardowns",
      },
      { divider: true },
      ...PRODUCTS.map((p) => ({
        href: `/products/${p.slug}`,
        label: p.name,
        desc: p.tagline,
      })),
      { divider: true },
      { href: "/sandbox/", label: "Resiliency lab", desc: "FinOps + chaos sim" },
    ],
  },
  {
    label: "Students",
    href: "/final-year-projects/",
    items: [
      {
        href: "/final-year-projects/",
        label: "Final year projects",
        desc: "Built for you, then explained",
      },
      {
        href: "/final-year-projects/custom/",
        label: "Get your idea built",
        desc: "Any stack, any domain",
      },
      { divider: true },
      { href: "/final-year-projects/guides/", label: "Free guides" },
      { href: "/final-year-projects/question-bank/", label: "Viva question bank" },
      { href: "/final-year-projects/planner/", label: "Timeline planner" },
      { divider: true },
      { href: "/final-year-projects/colleges/", label: "For colleges" },
    ],
  },
  {
    label: "Writing",
    href: "/blog/",
    items: [
      { href: "/blog/", label: "Blog", desc: "Architecture and AI systems" },
      { divider: true },
      { href: "/roadmap/", label: "Roadmap" },
      { href: "/anthropic-roadmap/", label: "Anthropic roadmap" },
      { href: "/uses/", label: "Stack" },
    ],
  },
  {
    label: "Hire",
    href: "/hire/",
    items: [
      { href: "/hire/", label: "Hire me", desc: "Open to senior / lead roles" },
      { href: "/about/", label: "About", desc: "Background and history" },
      { divider: true },
      { href: "/interview/", label: "Interview brief" },
      { href: RESUME_URL, label: "Download CV", external: true },
      { href: "/#contact", label: "Contact" },
    ],
  },
];

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

function MenuToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={open}
      className="flex h-6 w-6 items-center justify-center text-zinc-300 transition-colors hover:text-zinc-50 md:hidden"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <motion.path
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          animate={open ? { d: "M4 4 L16 16" } : { d: "M3 6 L17 6" }}
          transition={{ duration: 0.25 }}
        />
        <motion.path
          d="M3 10 L17 10"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.path
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          animate={open ? { d: "M4 16 L16 4" } : { d: "M3 14 L17 14" }}
          transition={{ duration: 0.25 }}
        />
      </svg>
    </button>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      aria-hidden
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M1 2.5 L4 5.5 L7 2.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LeafLink({
  leaf,
  onNavigate,
}: {
  leaf: NavLeaf;
  onNavigate: () => void;
}) {
  const body = (
    <>
      <span className="block text-sm text-zinc-200 transition-colors group-hover/leaf:text-zinc-50">
        {leaf.label}
      </span>
      {leaf.desc && (
        <span className="mt-0.5 block text-xs leading-snug text-zinc-500">
          {leaf.desc}
        </span>
      )}
    </>
  );
  const className =
    "group/leaf block rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-zinc-800/60";

  if (leaf.external) {
    return (
      <a
        href={leaf.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={className}
      >
        {body}
      </a>
    );
  }
  return (
    <Link href={leaf.href} onClick={onNavigate} className={className}>
      {body}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Escape closes whichever layer is showing, so a keyboard user is never
  // trapped inside an open submenu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(null);
      setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  /** Small grace period so moving the pointer into the panel does not close it. */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const activeGroup = GROUPS.find((g) => g.label === open);

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
        onMouseLeave={scheduleClose}
      >
        <div className="flex items-center gap-2 rounded-full border border-zinc-800/50 bg-zinc-950/60 px-5 py-3 shadow-2xl shadow-cyan-900/20 backdrop-blur-md">
          <Link href="/" className="flex items-center gap-2 pr-1">
            <span className="whitespace-nowrap text-sm font-bold tracking-tight text-zinc-50">
              Yaseen Khatib
            </span>
            <PulseDot />
          </Link>

          <span className="hidden h-4 w-px bg-zinc-800 md:block" />

          {/* Desktop groups — sliding glass highlight via layoutId */}
          <div className="hidden items-center gap-0.5 md:flex">
            {GROUPS.map((group) => (
              <div
                key={group.label}
                onMouseEnter={() => {
                  cancelClose();
                  setOpen(group.label);
                }}
              >
                <button
                  type="button"
                  aria-expanded={open === group.label}
                  aria-haspopup="true"
                  onClick={() => setOpen(open === group.label ? null : group.label)}
                  className="relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm"
                >
                  {open === group.label && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-zinc-800/50"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative transition-colors duration-200 ${
                      open === group.label ? "text-zinc-50" : "text-zinc-400"
                    }`}
                  >
                    {group.label}
                  </span>
                  <span
                    className={`relative transition-colors duration-200 ${
                      open === group.label ? "text-zinc-300" : "text-zinc-600"
                    }`}
                  >
                    <Chevron open={open === group.label} />
                  </span>
                </button>
              </div>
            ))}
          </div>

          <MenuToggle open={menuOpen} onClick={() => setMenuOpen((o) => !o)} />
        </div>

        {/* Desktop dropdown panel. Rendered inside the nav so the pointer can
            travel from trigger to panel without leaving the hover region. */}
        <AnimatePresence>
          {activeGroup && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: EASE }}
              onMouseEnter={cancelClose}
              className="absolute left-1/2 top-full hidden w-[min(90vw,22rem)] -translate-x-1/2 pt-3 md:block"
            >
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/95 p-2 shadow-2xl shadow-cyan-900/20 backdrop-blur-md">
                <Link
                  href={activeGroup.href}
                  onClick={() => setOpen(null)}
                  className="block px-3 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 transition-colors hover:text-cyan"
                >
                  {activeGroup.label} overview →
                </Link>
                {activeGroup.items.map((item, i) =>
                  "divider" in item ? (
                    <span
                      key={`d${i}`}
                      className="my-1.5 block h-px bg-zinc-800/70"
                    />
                  ) : (
                    <LeafLink
                      key={item.href}
                      leaf={item}
                      onNavigate={() => setOpen(null)}
                    />
                  ),
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile menu — a sibling of the nav (not a child) so its `fixed`
          positioning resolves against the viewport. The nav's -translate-x-1/2
          transform would otherwise become the containing block and clip it. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="fixed right-6 top-24 z-[60] max-h-[70vh] w-[min(85vw,20rem)] overflow-y-auto rounded-2xl border border-zinc-800/50 bg-zinc-950/95 p-3 shadow-2xl shadow-cyan-900/20 backdrop-blur-md md:hidden"
          >
            {GROUPS.map((group) => {
              const expanded = mobileGroup === group.label;
              return (
                <div key={group.label} className="border-b border-zinc-800/50 last:border-0">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setMobileGroup(expanded ? null : group.label)}
                    className="flex w-full items-center justify-between px-3 py-3 text-left text-sm text-zinc-200"
                  >
                    {group.label}
                    <span className="text-zinc-600">
                      <Chevron open={expanded} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: EASE }}
                        className="overflow-hidden pb-2"
                      >
                        <Link
                          href={group.href}
                          onClick={() => setMenuOpen(false)}
                          className="block rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600"
                        >
                          {group.label} overview →
                        </Link>
                        {group.items.map((item, i) =>
                          "divider" in item ? (
                            <span
                              key={`d${i}`}
                              className="my-1 block h-px bg-zinc-800/70"
                            />
                          ) : (
                            <LeafLink
                              key={item.href}
                              leaf={item}
                              onNavigate={() => setMenuOpen(false)}
                            />
                          ),
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
