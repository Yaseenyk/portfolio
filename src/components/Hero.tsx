import { ArrowRightIcon, DownloadIcon } from "./Icons";
import { RESUME_URL } from "@/lib/site";
import { HeroShots } from "./home/Shots";

/**
 * First screen: the title, one paragraph and the two ways in on the left; four real product screenshots on the right
 * (a swipeable strip on a phone). No decoration.
 * The h1 is the LCP element and must be in the server HTML, visible, not faded in after hydration.
 */
export default function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-24">
      <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan">
        Yaseen Khatib · Hyderabad, India
      </p>

      <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-zinc-50 sm:text-5xl xl:text-6xl">
        Full stack AI developer.
        <br />
        MERN apps with <span className="text-cyan">real AI</span> inside.
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
        I have five years of building web products from database to screen, in
        React, Node.js, TypeScript and MongoDB. Since 2025 I have put AI inside
        them: chatbots that answer from your own documents, agents that do real
        work, and search over your data. I have shipped several products on my own,
        and every one runs live.
      </p>

      {/* Two ways in, as plain rows. Hiring comes first: it is the main reason people open this page. */}
      <div className="mt-10 max-w-2xl divide-y divide-white/10 border-y border-white/10">
        <a href="/hire/" className="group flex items-center justify-between gap-6 py-4">
          <span>
            <span className="block text-[15px] font-semibold text-zinc-50">Hiring? I am open to Full Stack AI Developer roles.</span>
            <span className="mt-0.5 block text-sm text-zinc-400">Remote, hybrid or Hyderabad. CV and interview brief inside.</span>
          </span>
          <ArrowRightIcon className="h-4 w-4 flex-none text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-cyan" />
        </a>
        <a href="/solutions/" className="group flex items-center justify-between gap-6 py-4">
          <span>
            <span className="block text-[15px] font-semibold text-zinc-50">Need something built? AI chatbots, agents and web apps.</span>
            <span className="mt-0.5 block text-sm text-zinc-400">
              Freelance, in Hyderabad or remote. Fixed price from <span className="rupee">₹</span>25,000 (about US$300).
            </span>
          </span>
          <ArrowRightIcon className="h-4 w-4 flex-none text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-cyan" />
        </a>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <a href={RESUME_URL} download="Yaseen-Khatib-Resume.pdf" className="inline-flex items-center gap-2 rounded-lg bg-cyan px-5 py-2.5 font-semibold text-ink">
          <DownloadIcon className="h-4 w-4" /> Download CV
        </a>
        <a href="#contact" className="font-medium text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-cyan">
          Contact me
        </a>
      </div>
      </div>

      <HeroShots />
    </section>
  );
}
