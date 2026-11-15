import type { Metadata } from "next";
import Link from "next/link";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import Prose from "@/components/products/Prose";
import { SITE_URL, PERSON, SOCIALS } from "@/lib/site";

const DESCRIPTION =
  "How to contact Yaseen Khatib, a full-stack AI developer in Hyderabad: email, LinkedIn, GitHub, what to include for a hiring or project enquiry, and how fast to expect a reply.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/contact/` },
};

export default function ContactPage() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="pt-28">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">Contact</h1>
          <p className="mt-3 text-zinc-400">
            I am {PERSON.name}, an independent developer in {PERSON.locality}, {PERSON.country}. One
            person reads every message.
          </p>
          <div className="mt-8">
            <Prose>
              <h2>Email</h2>
              <p>
                <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a> is the best way to reach me.
                Replies usually take a few working days. If you have not heard back in a week, send
                it again; it may have been filtered.
              </p>
              <h2>Elsewhere</h2>
              <p>
                <a href={SOCIALS.linkedin}>LinkedIn</a> for hiring conversations and{" "}
                <a href={SOCIALS.github}>GitHub</a> for code. The home page also has an enquiry form
                in its contact section.
              </p>
              <h2>If you are hiring</h2>
              <p>
                Tell me the role, the stack, whether it is remote, hybrid or on-site, and the team
                size. The <Link href="/interview/">interview brief</Link> and the{" "}
                <Link href="/about/">about page</Link> answer most first-round questions, and the
                projects page links to running systems rather than screenshots.
              </p>
              <h2>If you have a project</h2>
              <p>
                Describe what you want built, who will use it, any deadline, and what exists today.
                The <Link href="/solutions/">solutions pages</Link> explain what I take on, such as
                RAG chatbots, AI automation, MERN applications and websites. I will reply with
                questions or a short proposal, and anything paid is agreed in writing.
              </p>
              <h2>If you found a mistake</h2>
              <p>
                Wrong fact in an article, broken link, a demo that does not work: email me with the
                page address and I will fix it.
              </p>
              <h2>Please do not</h2>
              <p>
                Send passwords, API keys or identity documents. Messages are handled as described in
                the <Link href="/privacy/">privacy notice</Link>, and use of the site is covered by
                the <Link href="/terms/">terms</Link>.
              </p>
            </Prose>
          </div>
        </div>
      </main>
    </>
  );
}
