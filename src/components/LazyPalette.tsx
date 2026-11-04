"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

let replay = false;

const CommandPalette = dynamic(
  () =>
    import("./CommandPalette").then((mod) => {
      // Once the chunk has mounted and attached its own listener, replay the
      // Cmd/Ctrl+K that triggered the load so the palette opens.
      if (replay) {
        replay = false;
        setTimeout(() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true })), 120);
      }
      return mod;
    }),
  { ssr: false },
);

/** The palette renders nothing until Cmd/Ctrl+K, so its code is fetched on the
 *  first such keypress instead of on every page load. */
export default function LazyPalette() {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (load) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        replay = true;
        setLoad(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [load]);
  return load ? <CommandPalette /> : null;
}
