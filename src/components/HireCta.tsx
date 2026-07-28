import Link from "next/link";

/**
 * Recruiter/client conversion block. Product case studies impress but used to
 * dead-end at a GitHub link; this turns an impressed reader into a conversation.
 * Uses the professional contact channels (hire page + email), not the FYP
 * WhatsApp line.
 */
export default function HireCta() {
  return (
    <section className="mx-auto mt-16 max-w-5xl px-6">
      <div className="overflow-hidden rounded-2xl border border-cyan/30 bg-gradient-to-br from-cyan/10 to-purple/10 p-8 backdrop-blur-md sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          Want a system like this built?
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-300">
          I&apos;m Yaseen Khatib — a Senior Full-Stack AI Engineer (MERN +
          TypeScript) who ships production AI systems solo: RAG pipelines, agent
          orchestration, real-time and edge architectures. Open to senior / lead
          roles and contract work, remote or on-site.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href="/hire"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan px-6 py-3 text-sm font-semibold text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)] transition-shadow duration-300 hover:shadow-[0_0_30px_-2px_rgba(34,211,238,0.7)]"
          >
            How I work →
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors duration-300 hover:border-ice/60 hover:text-ice"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
