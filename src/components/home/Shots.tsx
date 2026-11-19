import Image from "next/image";

/**
 * Real screenshots of the live products (captured 14 Nov 2026 with scripts outside the repo; files in public/shots/).
 * Desktop shots are 1280x800 with a 720x450 "-sm" copy; phone shots are 520x1125. Every image has its size set, so nothing
 * jumps while loading, and everything below the first screen is lazy-loaded.
 * To refresh one, replace the .webp files with the same names and sizes.
 */

export interface Shot { id: string; title: string; caption: string; href: string }

/** Desktop screenshots, in the order they are shown in the gallery. */
export const SHOTS: Shot[] = [
  { id: "fitrank", title: "FitRank", caption: "AI staff scheduling. A model I trained scores every option and a manager decides.", href: "https://fitrank.streamerosai.com" },
  { id: "spotai", title: "SpotAI", caption: "AI gym app for Indian gyms. Form check runs on the phone.", href: "https://spotai.streamerosai.com" },
  { id: "streameros", title: "streamerOS", caption: "Rust desktop app for streamers that switches OBS scenes by itself.", href: "https://streamerosai.com" },
  { id: "integratex", title: "IntegrateX sandbox", caption: "A workflow engine you can drag around in the browser. Payloads cut by 94%.", href: "/sandbox/" },
  { id: "esports", title: "Esports Hub", caption: "Free tournament tools for organisers: sign-ups, brackets, ID cards, live screens.", href: "https://esports.streamerosai.com" },
  { id: "esports-tool", title: "Points table maker", caption: "One of the Esports Hub tools: standings for BGMI and Free Fire, no account.", href: "https://esports.streamerosai.com/tools/points-table/" },
  { id: "analytics", title: "Analytics dashboard", caption: "Google Analytics and Search Console for all my sites on one page.", href: "https://analytics.streamerosai.com" },
  { id: "defendit", title: "DefendIt", caption: "Final-year project classes for students in India, built together in live classes.", href: "https://campus.streamerosai.com" },
  { id: "solar", title: "Solar subsidy guide", caption: "A subsidy calculator and guide in 13 languages, every figure sourced.", href: "https://solar.streamerosai.com" },
  { id: "exams", title: "Exam dates India", caption: "Dates and fees read from official bulletins. The build fails on an unsourced fact.", href: "https://exams.streamerosai.com" },
  { id: "aisa", title: "AISA", caption: "A student association site rebuilt from one 4,019-line file into Next.js and Spring Boot.", href: "https://yaseenyk.github.io/SIT-FE/" },
  { id: "pathsaathi", title: "Path Saathi LMS", caption: "Client project. A working learning platform, live one day after the brief.", href: "https://devlms.pathsaathi.in/login" },
];

/** Phone screenshots. */
export const PHONE_SHOTS: { id: string; title: string }[] = [
  { id: "spotai-app-m", title: "SpotAI app" },
  { id: "fitrank-m", title: "FitRank" },
  { id: "esports-m", title: "Esports Hub" },
  { id: "streameros-m", title: "streamerOS" },
  { id: "analytics-m", title: "Analytics" },
  { id: "solar-m", title: "Solar guide" },
  { id: "spotai-m", title: "SpotAI site" },
];

const frame = "block overflow-hidden rounded-lg border border-white/10 bg-black";
const isExternal = (h: string) => h.startsWith("http");
const byId = (id: string) => SHOTS.find((s) => s.id === id)!;

/** One desktop screenshot in a thin frame. `eager` only for the first screen. */
export function ShotImage({ id, alt, eager = false, small = true, className = "" }: { id: string; alt: string; eager?: boolean; small?: boolean; className?: string }) {
  return (
    <span className={`${frame} ${className}`}>
      <Image
        src={`/shots/${id}${small ? "-sm" : ""}.webp`}
        alt={alt}
        width={small ? 720 : 1280}
        height={small ? 450 : 800}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="h-auto w-full"
      />
    </span>
  );
}

/** Hero, right side on desktop: four live products at a glance. On a phone it becomes a strip you can swipe. */
export function HeroShots() {
  const four = ["fitrank", "spotai", "streameros", "esports"].map(byId);
  return (
    <div aria-label="Screenshots of four live products">
      <ul className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
        {four.map((s, i) => (
          <li key={s.id} className="w-[78%] flex-none snap-start sm:w-[46%] lg:w-auto">
            <a href={s.href} target={isExternal(s.href) ? "_blank" : undefined} rel={isExternal(s.href) ? "noopener noreferrer" : undefined} className="group block">
              <ShotImage id={s.id} alt={`${s.title}, live screenshot`} eager={i < 2} className="transition-colors group-hover:border-cyan/50" />
              <span className="mt-2 flex items-baseline justify-between gap-3 text-[13px]">
                <span className="font-semibold text-zinc-100">{s.title}</span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-zinc-500">Live</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12.5px] text-zinc-500">Real screenshots of products I built. Each one opens.</p>
    </div>
  );
}

/** Every product as it looks today. All lazy-loaded. */
export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-h" className="scroll-mt-24 py-14 sm:py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan">See it, do not imagine it</p>
      <h2 id="gallery-h" className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">Everything I have built, as it looks today</h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
        Twelve live products and sites. These are screenshots, not mock-ups, and every one links to the real thing.
      </p>

      <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {SHOTS.map((s) => (
          <li key={s.id}>
            <a href={s.href} target={isExternal(s.href) ? "_blank" : undefined} rel={isExternal(s.href) ? "noopener noreferrer" : undefined} className="group block">
              <ShotImage id={s.id} alt={`${s.title}, live screenshot`} className="transition-colors group-hover:border-cyan/50" />
              <span className="mt-3 block text-[15px] font-semibold text-zinc-100 group-hover:text-cyan">{s.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-zinc-400">{s.caption}</span>
            </a>
          </li>
        ))}
      </ul>

      <h3 className="mt-14 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-400">On a phone</h3>
      <p className="mt-1 text-[12.5px] text-zinc-500 lg:hidden">Swipe to see more.</p>
      <ul className="-mx-6 mt-5 flex snap-x gap-4 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-7 lg:gap-4 lg:overflow-visible lg:px-0">
        {PHONE_SHOTS.map((s) => (
          <li key={s.id} className="w-[46%] flex-none snap-start sm:w-[30%] lg:w-auto">
            <span className={frame}>
              <Image src={`/shots/${s.id}.webp`} alt={`${s.title} on a phone, live screenshot`} width={520} height={1125} loading="lazy" decoding="async" sizes="(min-width: 1024px) 14vw, 46vw" className="h-auto w-full" />
            </span>
            <span className="mt-2 block text-[12.5px] text-zinc-400">{s.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
