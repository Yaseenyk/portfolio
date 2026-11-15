import type { Metadata } from "next";
import Link from "next/link";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import Prose from "@/components/products/Prose";
import { SITE_URL, PERSON } from "@/lib/site";

const DESCRIPTION =
  "What this portfolio collects when you browse it or send a message: analytics, the contact form, and how to ask for your data to be deleted.";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/privacy/` },
};

export default function PrivacyPage() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main className="pt-28">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">Privacy notice</h1>
          <p className="mt-3 text-zinc-400">This notice covers this website only.</p>
          <div className="mt-8">
            <Prose>
              <h2>What the contact and enquiry forms collect</h2>
              <p>
                When you send a message through a form, I receive what you type: your name, email,
                and optionally a company, phone number, budget and message, plus the page you sent it
                from. The form sends it by email using EmailJS, and a second copy is stored by a
                Cloudflare Worker so an enquiry is not lost if the email fails.
              </p>
              <h2>Analytics</h2>
              <p>
                The site uses Google Analytics and GoatCounter to see which pages are read and how
                visitors arrive. Google Analytics sets first-party cookies and sends usage data, such
                as pages viewed, approximate location and the source of the visit, to Google. It also
                keeps your first source (for example a search engine or a shared link) in your
                browser so a later message can be tied to where you first came from. The site also uses Microsoft Clarity, a free tool that records anonymised heatmaps and session replays so I can see where visitors get stuck. Text typed into forms is masked and is not recorded. None of it is used
                for advertising. You can block it with a browser extension or by disabling
                cookies.
              </p>
              <p>
                There is also a small first-party visit counter that runs on a Cloudflare Worker I
                operate. It counts page views and tells people apart from bots by simple signals such
                as screen size and whether the page was interacted with. It sets no cookie, does not
                store your IP address, and respects Do Not Track and Global Privacy Control.
                GoatCounter is a similar cookie-free counter.
              </p>
              <h2>Cookies</h2>
              <p>
                Google Analytics and Microsoft Clarity set cookies in your browser to recognise a
                returning visit. The site sets no other cookies for logins or tracking. You can
                delete or block cookies in your browser settings and the site keeps working.
              </p>
              <h2>The AI concierge</h2>
              <p>
                The chat box on the home page sends your question to a Cloudflare Worker, which looks
                up passages from this site and asks a language model to answer from them. Do not type
                anything private into it.
              </p>
              <h2>Advertising</h2>
              <p>
                This site shows no ads today and loads no advertising code. I may apply for Google
                AdSense in future. If ads are switched on, Google and its partners may use cookies to
                serve and measure ads, and this notice will be updated first. You can opt out of
                personalised ads at <a href="https://adssettings.google.com">adssettings.google.com</a>{" "}
                or <a href="https://www.aboutads.info">aboutads.info</a>, and read how Google uses
                data at{" "}
                <a href="https://policies.google.com/technologies/partner-sites">
                  policies.google.com/technologies/partner-sites
                </a>
                .
              </p>
              <h2>Other sites linked from here</h2>
              <p>
                The footer links to my other sites on streamerosai.com subdomains, LinkedIn and
                GitHub. Each has its own privacy notice; this one covers only this website.
              </p>
              <h2>What I use it for</h2>
              <p>
                Only to reply to you and to understand which pages are useful. I do not sell or share
                your details.
              </p>
              <h2>How long I keep it</h2>
              <p>
                Enquiries are kept as long as needed to reply and follow up, and deleted when you ask.
                Analytics data is kept by Google for 14 months at most.
              </p>
              <h2>Your choices</h2>
              <p>
                To see, correct or delete what you sent, email{" "}
                <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>.
              </p>
              <p>
                Last updated 16 November 2026. See also the <Link href="/terms/">terms of use</Link>.
              </p>
            </Prose>
          </div>
        </div>
      </main>
    </>
  );
}
