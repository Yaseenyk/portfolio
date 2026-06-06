import SectionLabel from "./SectionLabel";
import TextLink from "./TextLink";

// Wire these to the real destinations when available.
const LIVE_DEMO_URL = "#";
const SOURCE_CODE_URL = "#";

export default function FeaturedProject() {
  return (
    <section id="work" className="border-t border-zinc-800 py-24">
      <SectionLabel index="01" title="Featured Project" />

      <div className="mt-12">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Streamer OS
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-zinc-400">
          An end-to-end streaming operations platform — taken from raw concept
          to production deployment.
        </p>

        <p className="mt-8 max-w-2xl leading-relaxed text-zinc-400">
          Streamer OS was architected and built entirely through an
          AI-accelerated workflow. Orchestrating Claude and modern AI tooling
          across every stage — system design, implementation, refactoring, and
          deployment — compressed what would traditionally be months of work
          into a focused, production-grade build. The result is a scalable,
          fully-typed product where AI handled the heavy lifting and human
          architecture set the direction.
        </p>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm">
          <TextLink href={LIVE_DEMO_URL} arrow="right">
            Live Demo
          </TextLink>
          <TextLink
            href={SOURCE_CODE_URL}
            arrow="diagonal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
          </TextLink>
        </div>
      </div>
    </section>
  );
}
