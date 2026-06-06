"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PulseDot from "./PulseDot";

const LINKS = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/uses", label: "Stack" },
  { href: "/#contact", label: "Contact" },
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

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
      >
        <div className="flex items-center gap-2 rounded-full border border-zinc-800/50 bg-zinc-950/60 px-6 py-3 shadow-2xl shadow-cyan-900/20 backdrop-blur-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 pr-1">
            <span className="text-sm font-bold tracking-tight text-zinc-50">
              Yaseen Khatib
            </span>
            <PulseDot />
          </Link>

          {/* Divider */}
          <span className="hidden h-4 w-px bg-zinc-800 md:block" />

          {/* Desktop links — sliding glass highlight via layoutId */}
          <div
            className="hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className="relative rounded-full px-4 py-1.5 text-sm"
              >
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-zinc-800/50"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative transition-colors duration-200 ${
                    hovered === link.href ? "text-zinc-50" : "text-zinc-400"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <MenuToggle open={menuOpen} onClick={() => setMenuOpen((o) => !o)} />
        </div>
      </motion.nav>

      {/* Mobile menu — rendered as a sibling of the nav (not a child) so its `fixed`
          positioning resolves against the viewport. The nav's -translate-x-1/2
          transform would otherwise become the containing block and clip/misalign it. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="fixed right-6 top-24 z-[60] flex w-[min(80vw,18rem)] flex-col gap-y-4 rounded-2xl border border-zinc-800/50 bg-zinc-950/90 px-4 py-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-md md:hidden"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800/50 hover:text-zinc-50"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
