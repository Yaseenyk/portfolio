import { seoDescription } from "@/lib/seoText";
import type { Metadata } from "next";
import { getProduct, productUrl } from "@/lib/products";
import { personRef, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ProductHero from "@/components/products/ProductHero";
import Section from "@/components/products/Section";
import Prose from "@/components/products/Prose";
import FlowDiagram, { type FlowStep } from "@/components/products/FlowDiagram";
import SpotAiArt from "@/components/products/art/SpotAiArt";

const product = getProduct("spotai")!;

export const metadata: Metadata = {
  title: `${product.name} — AI Gym Buddy for Indian Gyms`,
  description: seoDescription(product.summary),
  keywords: [
    "gym app",
    "AI form check",
    "MediaPipe pose",
    "on-device AI",
    "NestJS",
    "PostgreSQL row-level security",
    "Vue 3",
    "Capacitor",
    "DPDP consent",
    "gym management India",
  ],
  alternates: { canonical: productUrl(product.slug) },
  openGraph: {
    type: "website",
    title: `${product.name} | Yaseen Khatib`,
    description: seoDescription(product.summary),
    url: productUrl(product.slug),
    siteName: "Yaseen Khatib",
  },
};

const FLOW: FlowStep[] = [
  { label: "Check-in", detail: "A QR from the app, the front desk, or an optional face device at the door. The visit starts a session." },
  { label: "Pick a session", detail: "A rule over the last 7 days suggests strength, cardio, cycling or mobility, then which muscle group is most rested." },
  { label: "Pose on device", detail: "MediaPipe tracks the squat at 30 fps in the phone's WebView. Frames never leave the device." },
  { label: "Flags, not video", detail: "Rep counts and per-rep flags (knee valgus, depth, lean) post to the API; a cue is picked from trainer-approved templates." },
  { label: "Trainer review", detail: "Every cue template sits in a review queue with its wrong-rate, so trainers retire the ones members mark wrong." },
  { label: "Gym-wide signals", detail: "Logs roll up into gains, an opt-in leaderboard, buddy suggestions, and the owner's arrivals, dues and busy hours." },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "HealthApplication",
    operatingSystem: "Android, iOS, Web",
    description: seoDescription(product.summary),
    keywords: product.tech.join(", "),
    author: personRef,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  breadcrumbJsonLd([
    { name: "Products", path: "/products" },
    { name: product.name, path: `/products/${product.slug}` },
  ]),
];

export default function SpotAiPage() {
  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd data={jsonLd} />

      <ProductHero product={product} art={<SpotAiArt />} />

      <Section label="01 · Executive Summary">
        <div className="max-w-3xl">
          <Prose>
            <p>
              Most gym software in India is a register with a login: it knows who
              paid and when, and nothing about what happens on the floor. Members
              get nothing from it. The apps members do use are generic workout
              trackers that have never heard of their gym.
            </p>
            <p>
              <strong>SpotAI</strong> is one product with two sides. Members get a
              coach that watches their squat through the phone camera and gives
              one tip per set, a workout log, an opt-in gym leaderboard and buddies
              to train with. Owners get live arrivals with dues flagged, UPI
              payments inside the member app, busy hours, a front-desk console
              and a trainer console that reviews what the AI says before members
              see it.
            </p>
            <p>
              <strong>What makes it different:</strong> the camera never uploads a
              frame, every purpose (camera, clips, face, matching, chat) is a
              separate consent with its notice version recorded, and a member can
              export or delete everything from the app. Built to the shape of the
              DPDP Act rather than retrofitted to it.
            </p>
          </Prose>
        </div>
      </Section>

      <Section label="02 · The Stack">
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            ["Member app", "Vue 3 + Vite, packaged with Capacitor 8 for Android and iOS; TanStack Query cache persisted to storage so screens paint before the network answers."],
            ["Owner and staff", "Two Vue 3 web consoles: owner dashboard, and a staff console for the front desk and trainers."],
            ["API", "NestJS on PostgreSQL with row-level security per gym, NATS events with an outbox, S3-compatible clip storage."],
            ["Pose", "MediaPipe in the WebView: landmarks, rep counting and per-rep flags on device at 30 fps."],
            ["Language models", "Only through a gateway (Ollama, Groq, OpenRouter or Gemini) behind identity redaction, a consent check and an output guard, with template fallback."],
            ["Offline demo", "The same app with the API answered on the phone from SQLite, so partner gyms can trial it for a week with no server."],
          ].map(([term, desc]) => (
            <div key={term} className="rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-5 backdrop-blur-md">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
                {term}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section label="03 · System Architecture Flow">
        <FlowDiagram steps={FLOW} />
      </Section>

      <Section label="04 · Deep Technical Breakdown">
        <div className="max-w-3xl">
          <Prose>
            <h4>Frames never leave the phone</h4>
            <p>
              The coach is a MediaPipe pose model running inside the Capacitor
              WebView. The API only ever receives a set: a rep count and, per
              rep, a map of flag type to severity. The cue is chosen from
              trainer-approved templates on the server, so the text a member
              reads has been read by a human first. Clip saving is a separate
              consent, off by default.
            </p>

            <h4>One database, many gyms, no leaks</h4>
            <p>
              Every table carries a tenant id and PostgreSQL row-level security
              enforces it. The API opens each request inside a transaction that
              sets the gym, so a query that forgets a <code>WHERE</code> clause
              still cannot see another gym&apos;s members. The test suite runs
              two gyms side by side and asserts the boundary on every endpoint.
            </p>

            <h4>Consent as data, not a checkbox</h4>
            <p>
              Each purpose is a row: status, notice version, method and time.
              Features read the row before they run (the leaderboard checks age,
              the camera checks the camera consent, reminders check the reminder
              consent), and the privacy centre lets a member flip any of them,
              export a JSON of everything, delete the account, or file a
              complaint that gets a reference number the gym must answer.
            </p>

            <h4>A demo that behaves over real days</h4>
            <p>
              The offline build answers the API from on-phone SQLite. The seed is
              a snapshot from one day, so anything date-dependent (today&apos;s
              plan day, check-in state, streak, this week&apos;s kilograms, days
              left on the membership) is derived from the saved logs and visits
              on every read, the same rules as the server. A week-long soak with
              the clock moved forward day by day showed check-in resetting each
              morning, streaks rising and breaking, and Monday starting a new week.
            </p>

            <h4>Evidence</h4>
            <ul>
              <li>179 API tests across auth, tenancy, training, consent, clips, connect, owner and load.</li>
              <li>Browser tests across member, staff and owner apps with WCAG AA checks on every main screen.</li>
              <li>~40k lines of TypeScript, Vue and Python across three apps, the API, a model gateway and an edge agent.</li>
              <li>Marketing site with JSON-LD, sitemap, <code>llms.txt</code> and real app screenshots, built in Astro + GSAP.</li>
            </ul>
          </Prose>
        </div>
      </Section>
    </article>
  );
}
