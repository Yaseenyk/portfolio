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
                from. It is saved in my own database (a Cloudflare Worker and D1 database I run, at
                pulse.yaseenyk.workers.dev) together with where your visit came from, so no message is
                lost if an email fails; a notification is also sent by email using EmailJS. Only I can
                read these messages. They are kept for up to 24 months (spam for 30 days); ask at the
                address below and I will delete yours.
              </p>
              <h2>Analytics</h2>
              <p>
                Five measuring tools load on this site. None of them is used for advertising, and the
                site works the same if you block all of them with a browser extension.
              </p>
              <ul>
                <li>
                  <strong>Google Analytics</strong> (googletagmanager.com) shows which pages are read
                  and how visitors arrive. It sets first-party cookies (<code>_ga</code> and{" "}
                  <code>_ga_*</code>) and sends usage data, such as pages viewed, approximate location
                  and the source of the visit, to Google. The site also keeps your first source (for
                  example a search engine or a shared link) in your browser&apos;s local storage so a
                  later message can be tied to where you first came from. Google signals is on: for
                  visitors signed in to a Google account with ad personalisation on, Google may link this
                  site&apos;s visit data to that account to give me grouped reports on age, gender and
                  interests; no individual is identified to me. You can turn this off in your{" "}
                  <a href="https://myadcenter.google.com/">Google account (My Ad Center)</a>. Opt out of
                  Google Analytics entirely with Google&apos;s{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout">browser add-on</a>.
                </li>
                <li>
                  <strong>Microsoft Clarity</strong> (clarity.ms) records session replays and heatmaps:
                  mouse movement, clicks and scrolling, so I can see where visitors get stuck. Text
                  typed into forms is masked and never recorded. Clarity sets its own cookies (
                  <code>_clck</code>, <code>_clsk</code>) and Microsoft cookies on clarity.ms and
                  bing.com (such as <code>MUID</code>). Microsoft explains its use in the{" "}
                  <a href="https://privacy.microsoft.com/privacystatement">Microsoft privacy statement</a>.
                  It does not load on the private /leads and /outreach pages.
                </li>
                <li>
                  <strong>Pulse</strong>, my own visit counter (a script from
                  pulse.yaseenyk.workers.dev, a Cloudflare Worker I run). It records the page (without
                  the query string), the referring site and campaign tags, country, device type,
                  browser and system name, screen size, language, the name of your network provider,
                  scroll depth, time on the page, page speed, which links and buttons were clicked,
                  technical problems (up to three script error messages per page, whether your browser
                  translated the page and into which language, your connection type such as 4g, how
                  fast the page responded to a tap, and layout jumps), and the name of a form that was
                  sent or started but not sent, never what was typed in it. It sets no
                  cookies and stores no IP address or browser string. The IP address is used in memory
                  only, to limit abuse and to make a visitor code that changes every day (a one-way hash
                  with a random salt that is deleted the next day), so visits cannot be linked across
                  days. Rows are deleted after 90 days. It does nothing if your browser sends Do Not
                  Track or Global Privacy Control.
                </li>
                <li>
                  <strong>GoatCounter</strong> (gc.zgo.at) is a cookie-free page counter. It records
                  the page, referrer, browser, screen size and country, and does not store your IP
                  address.
                </li>
                <li>
                  <strong>Ahrefs Web Analytics</strong> (analytics.ahrefs.com) is a cookie-free page
                  counter that records page views, referrers, country and device type.
                </li>
              </ul>
              <h2>Cookies</h2>
              <p>
                Google Analytics and Microsoft Clarity set the cookies listed above to recognise a
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
                Analytics data is kept by Google for 14 months at most. Pulse rows are deleted after
                90 days. Clarity, GoatCounter and Ahrefs keep data under their own retention rules.
              </p>
              <h2>Your choices</h2>
              <p>
                To see, correct or delete what you sent, email{" "}
                <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>.
              </p>
              <p>
                Last updated 19 November 2026. See also the <Link href="/terms/">terms of use</Link>.
              </p>
            </Prose>
          </div>
        </div>
      </main>
    </>
  );
}
