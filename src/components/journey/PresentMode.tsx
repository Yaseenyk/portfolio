"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Turns a journey chapter into a full-screen slide deck without changing the
 * page itself: the article stays in the DOM exactly as written, so readers and
 * crawlers get the prose, and this only builds slides when someone presses
 * Present.
 *
 * Slides are split on the chapter's <h2> boundaries — every chapter is a flat
 * run of headings and content inside one container, so a heading plus the
 * siblings up to the next heading is exactly one section.
 *
 * Slide bodies are CLONES. Interactive demos are React-owned, and moving their
 * nodes out of the tree they were mounted into breaks the next render — so in
 * present mode a demo shows its current state rather than staying clickable.
 */

interface Slide {
  kicker: string;
  title: string;
  bodyHtml: string;
  /** A continuation slide dims its heading — the idea already landed. */
  continued?: boolean;
}

/** A chapter is any journey route with a slug; the index has nothing to present. */
function isChapterRoute(): boolean {
  return /\/journey\/[^/]+\/?$/.test(window.location.pathname);
}

function contentRoot(): HTMLElement | null {
  return (
    document.querySelector<HTMLElement>("main article") ??
    document.querySelector<HTMLElement>("main div.mx-auto")
  );
}

function buildSlides(): Slide[] {
  const root = contentRoot();
  if (!root) return [];

  const slides: Slide[] = [];

  const h1 = root.querySelector("h1");
  const header = root.querySelector("header");
  const eyebrow = header?.querySelector("span");
  if (h1 && header) {
    // The opening slide is the header's prose plus whatever sits between it
    // and the first heading — which is where each chapter's hero illustration
    // lives. Taking only the paragraphs left the title slide empty.
    const intro: string[] = [];
    for (const el of Array.from(header.children)) {
      if (el.tagName === "P") intro.push(el.outerHTML);
    }
    // Stop at the first element that CONTAINS a heading, not just one that is
    // a heading — the sections live inside an <article>, so checking tagName
    // alone swallowed the entire chapter onto the title slide.
    let after: Element | null = header.nextElementSibling;
    while (after && after.tagName !== "H2" && !after.querySelector("h2")) {
      intro.push(after.outerHTML);
      after = after.nextElementSibling;
    }
    slides.push({
      kicker: eyebrow?.textContent?.trim() ?? "",
      title: h1.textContent?.trim() ?? "",
      bodyHtml: intro.join(""),
      continued: false,
    });
  }

  for (const h2 of Array.from(root.querySelectorAll("h2"))) {
    const numberEl = h2.querySelector("span");
    const kicker = numberEl?.textContent?.trim() ?? "";
    const clone = h2.cloneNode(true) as HTMLElement;
    clone.querySelector("span")?.remove();
    const title = clone.textContent?.trim() ?? "";

    // A section of prose is far more than a slide holds. Chunk it: anything
    // visual (diagram, code, image, table) earns a slide of its own, and prose
    // runs two blocks at a time. Continuations keep the heading so the room
    // never loses the thread.
    const blocks: { html: string; visual: boolean; list: boolean; weight: number }[] = [];
    let node: Element | null = h2.nextElementSibling;
    while (node && node.tagName !== "H2") {
      const isNav = node.tagName === "DIV" && !!node.querySelector("a[href*='/journey/']");
      if (!isNav) {
        const visual = !!node.querySelector("svg, pre, img, table") ||
          ["FIGURE", "PRE", "TABLE", "IMG"].includes(node.tagName);
        const list = !visual && ["OL", "UL"].includes(node.tagName) &&
          node.children.length > 3;
        blocks.push({
          html: node.outerHTML,
          visual,
          list,
          weight: node.textContent?.trim().length ?? 0,
        });
      }
      node = node.nextElementSibling;
    }

    const chunks: string[][] = [];
    // Budget by characters, not block count. Two short paragraphs and two long
    // ones are very different slides, and letting autofit absorb the
    // difference is what made the type size jump between slides.
    const BUDGET = 430;

    // Pack a run of prose with a lookahead rather than greedily. Greedy
    // filling capped the number of slides up front, so whatever was left
    // over piled onto the last one — that is how a slide ended up at 691
    // characters while its neighbours held 300.
    let group: { html: string; weight: number }[] = [];
    const flushGroup = () => {
      if (!group.length) return;
      const rest: number[] = new Array(group.length + 1).fill(0);
      for (let i = group.length - 1; i >= 0; i--) rest[i] = rest[i + 1] + group[i].weight;

      let run: string[] = [];
      let weight = 0;
      group.forEach((b, i) => {
        run.push(b.html);
        weight += b.weight;
        const next = group[i + 1];
        if (!next) return;
        if (weight + next.weight <= BUDGET) return;
        // A tail too small to be its own slide rides along instead.
        if (rest[i + 1] < BUDGET * 0.4 && weight + rest[i + 1] <= BUDGET * 1.15) return;
        chunks.push(run);
        run = [];
        weight = 0;
      });
      if (run.length) chunks.push(run);
      group = [];
    };

    for (const b of blocks) {
      if (b.visual) {
        flushGroup();
        chunks.push([b.html]);
        continue;
      }
      // A six-item list is six ideas, not one block. Split it so each slide
      // carries a readable few, keeping <ol> numbering continuous.
      if (b.list) {
        flushGroup();
        const holder = document.createElement("div");
        holder.innerHTML = b.html;
        const listEl = holder.firstElementChild as HTMLElement | null;
        const items = listEl ? Array.from(listEl.children) : [];
        // Split by weight, not by a fixed count: three one-line items and
        // three paragraph-long ones are not the same slide.
        const totalWeight = items.reduce((sum, li) => sum + (li.textContent?.length ?? 0), 0);
        const groups = Math.max(1, Math.ceil(totalWeight / BUDGET));
        const targetWeight = totalWeight / groups;
        let taken: Element[] = [];
        let takenWeight = 0;
        let start = 1;
        const emit = () => {
          if (!taken.length) return;
          const part = listEl!.cloneNode(false) as HTMLElement;
          if (part.tagName === "OL") part.setAttribute("start", String(start));
          taken.forEach((li) => part.appendChild(li.cloneNode(true)));
          chunks.push([part.outerHTML]);
          start += taken.length;
          taken = [];
          takenWeight = 0;
        };
        items.forEach((li, i) => {
          taken.push(li);
          takenWeight += li.textContent?.length ?? 0;
          const left = items.length - i - 1;
          const madeSoFar = start - 1;
          if (takenWeight >= targetWeight && left > 0 && madeSoFar + taken.length < items.length) emit();
        });
        emit();
        continue;
      }
      // A single paragraph can outweigh the whole budget on its own, and a
      // block is the smallest thing the packer can move — so an 800-character
      // one used to land alone and get scaled down, which is the type-size
      // jump between slides. Break it at sentence ends instead.
      const parts = b.weight > BUDGET ? splitProse(b.html, BUDGET) : [b.html];
      for (const html of parts) {
        group.push({
          html,
          weight: parts.length > 1 ? Math.ceil(b.weight / parts.length) : b.weight,
        });
      }
    }
    flushGroup();
    if (!chunks.length) chunks.push([]);

    chunks.forEach((c, i) => {
      slides.push({
        kicker: chunks.length > 1 ? `${kicker} · ${i + 1}/${chunks.length}` : kicker,
        title,
        bodyHtml: c.join(""),
        continued: i > 0,
      });
    });
  }

  return slides;
}

/**
 * Split one long paragraph into near-equal parts at sentence boundaries.
 * Inline children (<strong>, <code>, <a>) are atomic — they move whole, so
 * markup never breaks even though the text does.
 */
function splitProse(html: string, budget: number): string[] {
  const holder = document.createElement("div");
  holder.innerHTML = html;
  const source = holder.firstElementChild as HTMLElement | null;
  if (!source) return [html];

  const total = source.textContent?.trim().length ?? 0;
  const target = Math.ceil(total / Math.ceil(total / budget));
  const parts: HTMLElement[] = [];
  let current = source.cloneNode(false) as HTMLElement;
  let filled = 0;

  const start = () => {
    if (current.childNodes.length) parts.push(current);
    current = source.cloneNode(false) as HTMLElement;
    filled = 0;
  };

  for (const child of Array.from(source.childNodes)) {
    if (child.nodeType !== Node.TEXT_NODE) {
      current.appendChild(child.cloneNode(true));
      filled += child.textContent?.length ?? 0;
      continue;
    }
    for (const sentence of (child.textContent ?? "").split(/(?<=[.!?:;])\s+/)) {
      if (!sentence) continue;
      if (filled >= target) start();
      current.appendChild(document.createTextNode(filled ? " " + sentence : sentence));
      filled += sentence.length;
    }
  }
  start();
  // A remainder of one clause is not a slide. Rather than fold it back — which
  // just makes the part above oversized — walk sentences backwards from the
  // part above until the tail carries its share.
  if (parts.length > 1) {
    const tail = parts[parts.length - 1];
    const prev = parts[parts.length - 2];
    while (
      (tail.textContent?.length ?? 0) < target * 0.55 &&
      prev.childNodes.length > 1
    ) {
      const moved = prev.lastChild!;
      prev.removeChild(moved);
      tail.insertBefore(moved, tail.firstChild);
    }
  }
  return parts.length ? parts.map((el) => el.outerHTML) : [html];
}

export default function PresentMode() {
  const [slides, setSlides] = useState<Slide[] | null>(null);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [available, setAvailable] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // A chapter opens as a deck. The journey index has no sections worth
  // presenting, so it stays a normal page.
  //
  // Availability is decided by the route, not by counting headings in the
  // DOM: the button has to be there every time, and a markup change or a
  // slow-hydrating section must never be able to take it away.
  useEffect(() => {
    const isChapter = isChapterRoute();
    setAvailable(isChapter);
    if (!isChapter) return;
    const built = buildSlides();
    if (!built.length) return;
    setSlides(built);
    document.documentElement.style.overflow = "hidden";
  }, []);

  const open = useCallback(() => {
    const built = buildSlides();
    if (!built.length) return;
    setSlides(built);
    setIndex(0);
    setDir(1);
    document.documentElement.style.overflow = "hidden";
  }, []);

  /** Browsers refuse requestFullscreen outside a user gesture, so the deck
   *  opens windowed and goes full-screen on the presenter's first input. */
  const goFullscreen = useCallback(() => {
    if (document.fullscreenElement) return;
    void document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  const close = useCallback(() => {
    setSlides(null);
    document.documentElement.style.overflow = "";
    if (document.fullscreenElement) void document.exitFullscreen?.().catch(() => {});
  }, []);

  const go = useCallback(
    (delta: number) => {
      setSlides((current) => {
        if (!current) return current;
        setIndex((i) => {
          const next = Math.min(current.length - 1, Math.max(0, i + delta));
          if (next !== i) setDir(delta > 0 ? 1 : -1);
          return next;
        });
        return current;
      });
    },
    [],
  );

  useEffect(() => {
    if (!slides) return;
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          goFullscreen();
          go(1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          go(-1);
          break;
        case "Home":
          e.preventDefault();
          setIndex(0);
          break;
        case "End":
          e.preventDefault();
          setIndex(slides.length - 1);
          break;
        case "Escape":
          close();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides, go, close, goFullscreen]);

  // Leaving fullscreen with F11 or the browser chrome should leave the deck too.
  useEffect(() => {
    if (!slides) return;
    const onFs = () => {
      if (!document.fullscreenElement) {
        setSlides(null);
        document.documentElement.style.overflow = "";
      }
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, [slides]);

  const bodyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  /** Sections vary wildly in length; anything that would clip is scaled down
   *  to fit instead. A slide that cuts off mid-sentence looks broken in a way
   *  a slightly smaller one never does. */
  useLayoutEffect(() => {
    const body = bodyRef.current;
    const stage = stageRef.current;
    if (!body || !stage) return;

    const fit = () => {
      body.style.transform = "scale(1)";
      body.style.width = "100%";
      const available = window.innerHeight * 0.72;
      const needed = body.scrollHeight;
      // Prose holds a floor so type size stays even from slide to slide, but a
      // diagram or a code block has no type to compare against — it may shrink
      // as far as it needs to rather than be cut off.
      const fixed = !body.querySelector("svg, img, pre, table, figure");
      const scale = needed > available
        ? Math.max(fixed ? 0.82 : 0.45, available / needed)
        : 1;
      body.style.transform = `scale(${scale})`;
      body.style.transformOrigin = "top left";
      body.style.width = scale < 1 ? `${100 / scale}%` : "100%";
    };

    fit();
    // A figure that finishes laying out after the first pass — an SVG sizing
    // itself, a late font — left the slide fitted to the wrong height and
    // clipped at the bottom. Re-fit once the frame has settled.
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(fit);
    });
    // The interactive figures keep growing past the second frame, so take one
    // more pass once they have settled.
    const settled = window.setTimeout(fit, 400);
    window.addEventListener("resize", fit);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settled);
      window.removeEventListener("resize", fit);
    };
  }, [index, slides]);

  if (!available) return null;

  const slide = slides?.[index];

  return (
    <>
      <button
        type="button"
        onClick={open}
        data-print="hide"
        className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full border border-purple/60 bg-purple/15 px-4 py-2.5 text-xs font-semibold text-zinc-50 shadow-[0_10px_30px_-10px_rgba(168,85,247,0.7)] backdrop-blur transition-colors hover:border-purple hover:bg-purple/25 md:bottom-6 md:left-6 md:px-5 md:py-3 md:text-sm"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
          <rect x="3" y="4" width="18" height="12" rx="2" stroke="#A855F7" strokeWidth="1.8" />
          <path d="M12 16v4M8 20h8" stroke="#A855F7" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        Present
      </button>

      {slides && slide && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex flex-col bg-ink"
          role="dialog"
          aria-modal="true"
          aria-label="Presentation"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(900px 500px at 85% -10%, rgba(34,211,238,0.10), transparent 60%), radial-gradient(900px 500px at 10% 110%, rgba(168,85,247,0.10), transparent 60%)",
            }}
          />

          <div className="relative flex items-center justify-between px-10 pt-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-600">
              {slide.kicker || " "}
            </span>
            <div className="flex items-center gap-5">
              <span className="font-mono text-[11px] tabular-nums text-zinc-600">
                {index + 1} / {slides.length}
              </span>
              <button
                type="button"
                onClick={goFullscreen}
                className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500 transition-colors hover:border-white/25 hover:text-zinc-300"
              >
                Fullscreen
              </button>
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500 transition-colors hover:border-white/25 hover:text-zinc-300"
              >
                Read as article
              </button>
            </div>
          </div>

          <div className="relative flex flex-1 items-center overflow-hidden px-[7vw]">
            <div
              key={index}
              className={`present-slide w-full${index === 0 ? " present-slide--title" : ""}`}
              style={{ ["--enter" as string]: dir > 0 ? "36px" : "-36px" }}
            >
              <h2 className={`present-title${slide.continued ? " present-title--cont" : ""}`}>{slide.title}</h2>
              <div ref={stageRef} className="present-stage">
                <div
                  ref={bodyRef}
                  className="present-body"
                  dangerouslySetInnerHTML={{ __html: slide.bodyHtml }}
                />
              </div>
            </div>
          </div>

          <div className="relative px-10 pb-7">
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan to-purple transition-[width] duration-500"
                style={{ width: `${((index + 1) / slides.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Click zones — a presenter clicks forward far more than back. */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="absolute inset-y-0 left-0 w-[18%] cursor-w-resize opacity-0"
          />
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute inset-y-0 right-0 w-[60%] cursor-e-resize opacity-0"
          />
        </div>
      )}
    </>
  );
}
