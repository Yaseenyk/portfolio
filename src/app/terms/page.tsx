import type { Metadata } from "next";
import Link from "next/link";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import Prose from "@/components/products/Prose";
import { SITE_URL, PERSON } from "@/lib/site";

const DESCRIPTION =
  "Terms of use for yk.streamerosai.com: what the site is, how its writing and code samples may be used, no warranty, and how to reach the owner.";

export const metadata: Metadata = {
  title: "Terms of use",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/terms/` },
};

export default function TermsPage() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="pt-28">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">Terms of use</h1>
          <p className="mt-3 text-zinc-400">
            By using yk.streamerosai.com you agree to the plain terms below. They were written by the
            site owner, not a law firm.
          </p>
          <div className="mt-8">
            <Prose>
              <h2>Who runs this site</h2>
              <p>
                This is the personal portfolio and engineering notebook of {PERSON.name}, an
                independent full-stack AI developer based in {PERSON.locality}, {PERSON.country}. It
                is run by one person, not a company.
              </p>
              <h2>What the site is</h2>
              <p>
                It shows projects, case studies, articles and demos, and explains the services I
                offer. The articles describe what I built and measured; they are general information
                and not professional advice for your specific situation. Check anything critical
                against official documentation before relying on it.
              </p>
              <h2>Using the content</h2>
              <p>
                The articles, text and images are mine unless marked otherwise. You may quote short
                passages with a link back to the page. Please do not republish whole articles or
                present them as your own. Code snippets in articles may be reused in your own
                projects; the source repositories linked from project pages carry their own
                licences.
              </p>
              <h2>No warranty</h2>
              <p>
                The site and its demos are provided as they are. I try to keep facts accurate and
                correct mistakes I am told about, but I do not guarantee that everything is complete,
                current or error free, and I am not liable for loss arising from using the site. The
                AI concierge can be wrong; treat its answers as a starting point.
              </p>
              <h2>Enquiries and engagements</h2>
              <p>
                Sending a message does not create a contract. Any paid work is agreed separately in
                writing, with scope, price and timeline.
              </p>
              <h2>Links and third parties</h2>
              <p>
                The site links to other websites and services I do not control. I am not responsible
                for their content or practices.
              </p>
              <h2>Changes and contact</h2>
              <p>
                I may update these terms; the date below shows the latest version. Questions go to{" "}
                <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a> or the{" "}
                <Link href="/contact/">contact page</Link>. How data is handled is described in the{" "}
                <Link href="/privacy/">privacy notice</Link>.
              </p>
              <p>Last updated 16 November 2026.</p>
            </Prose>
          </div>
        </div>
      </main>
    </>
  );
}
