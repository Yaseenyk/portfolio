import { seoDescription } from "@/lib/seoText";
import type { Metadata } from "next";
import { getProduct, productUrl } from "@/lib/products";
import { personRef, breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ProductHero from "@/components/products/ProductHero";
import Section from "@/components/products/Section";
import Prose from "@/components/products/Prose";
import FlowDiagram, { type FlowStep } from "@/components/products/FlowDiagram";
import FitRankArt from "@/components/products/art/FitRankArt";

const product = getProduct("fitrank")!;

export const metadata: Metadata = {
  title: `${product.name} — Typed AI Decisions for Staffing`,
  description: seoDescription(product.summary),
  keywords: [
    "decision model",
    "typed decisions",
    "logprobs",
    "knowledge distillation",
    "ModernBERT",
    "calibration",
    "human-in-the-loop",
    "resource matching",
    "FastAPI",
    "pgvector",
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
  { label: "Task Intake", detail: "A manager describes the task in plain English; an LLM only interprets it into fixed fields (skills, level, dates). It never ranks people." },
  { label: "Hard Rules", detail: "Code filters on availability, leave, location, timezone, cost band and clearance. Every exclusion stores a reason code." },
  { label: "Retrieval", detail: "pgvector similarity blended with must-have skill coverage keeps the top candidates. Nobody with zero must-haves is ever retrieved." },
  { label: "Typed Decisions", detail: "The student model answers five bounded questions per candidate in one batch — a probability for every option, never free text." },
  { label: "Policy Bands", detail: "A combiner over code facts + model answers gives P(manager accepts). Thresholds band it: shortlist, review or hidden. Flags cap at review." },
  { label: "Human Call", detail: "The manager accepts or rejects with a reason. Nothing is auto-assigned; every decision becomes training data for the next model." },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: seoDescription(product.summary),
    keywords: product.tech.join(", "),
    author: personRef,
  },
  breadcrumbJsonLd([
    { name: "Products", path: "/products" },
    { name: product.name, path: `/products/${product.slug}` },
  ]),
];

const RESULTS: [string, string, string][] = [
  ["hit@5 — best person in the top five", "94%", "91%"],
  ["Pairwise ordering", "0.88", "0.86"],
  ["NDCG@10", "0.89", "0.89"],
  ["hit@1 — best person ranked first", "54%", "74%"],
];

export default function FitRankPage() {
  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd data={jsonLd} />

      <ProductHero product={product} art={<FitRankArt />} />

      <Section label="01 · Executive Summary">
        <div className="max-w-3xl">
          <Prose>
            <p>
              Staffing a task is a judgement call made dozens of times a week:
              who has the skills, the right seniority, the domain history, and
              the room in their calendar. Most &quot;AI matching&quot; answers it
              by asking a chatbot for a ranked list — free text you cannot audit,
              calibrate, or improve.
            </p>
            <p>
              <strong>FitRank</strong> treats the same problem as a set of{" "}
              <strong>typed decisions</strong>. Anything code can compute is
              computed in code. The semantic questions — is this skill match
              strong, is the level right, is the domain relevant, is delivery
              risky, is this an overall fit — each have a fixed option list and
              come back as a <strong>probability for every option</strong>.
              Thresholds, not the model, decide what happens next, and a{" "}
              <strong>manager makes every final call</strong>.
            </p>
            <p>
              Those questions are answered by a model I trained myself: a{" "}
              <strong>149M-parameter ModernBERT student</strong> distilled from
              an open-weight teacher, served on CPU. Every accept or reject a
              manager makes flows back as training data, so the system learns
              what the people using it actually choose.
            </p>
          </Prose>
        </div>
      </Section>

      <Section label="02 · The Stack">
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            ["Backend", "Python 3.12 + FastAPI — router → service → repository, a Postgres job queue and a background worker for match runs."],
            ["Data", "Postgres + pgvector, SQLAlchemy models and Alembic migrations. Synthetic people and tasks only — no real employee data."],
            ["Decision model", "ModernBERT-base + five linear heads, trained on Kaggle GPUs with a KL loss against the teacher's full distributions."],
            ["Teacher", "Qwen3.5-9B in 4-bit, scored through the same prompts, option shuffles and logprob normalisation as the LLM engine."],
            ["Frontend", "React + TypeScript + Vite, API types generated from the backend's OpenAPI, role-aware screens and an admin area."],
            ["Delivery", "JWT + refresh-cookie auth with roles, rate limits, a budget guard, Docker images, GitHub Actions CI, 93.5% backend test coverage."],
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
            <h4>A decision is a letter, scored by logprobs</h4>
            <p>
              The first engine asked an LLM each question with the options
              mapped to single letters and a one-token answer limit. The answer
              is not the letter it writes — it is the{" "}
              <strong>probability mass on every allowed letter</strong>, read
              from <code>top_logprobs</code> and renormalised. If too much mass
              lands outside the allowed letters, the result is flagged and can
              never reach the shortlist. Options are shuffled per candidate and
              each question is asked under two orderings to cancel position bias.
            </p>
            <pre>
              <code>{`# One decision → a distribution over a fixed option list.
mass = {letter: 0.0 for letter in letter_to_option}
for t in first_token.top_logprobs:
    letter = t.token.strip().upper()
    if letter in mass:
        mass[letter] += math.exp(t.logprob)

unmapped = 1 - sum(mass.values())
total = sum(mass.values())
probs = {letter_to_option[k]: v / total for k, v in mass.items()}
flags = {"low_confidence_format"} if unmapped > 0.2 else set()`}</code>
            </pre>

            <h4>Distilling the judgement into a model I own</h4>
            <p>
              Paying an API per candidate does not scale, and a hosted model can
              change under you. So an open-weight <strong>teacher</strong>{" "}
              labelled 3,010 task–person pairs on Kaggle using the exact same
              decision definitions, and a <strong>ModernBERT student</strong>{" "}
              learned from them. The loss is KL divergence against the
              teacher&apos;s whole distribution, so the student learns how
              confident to be, not just the top answer. Pairs are split by task
              and generated from a different random world than the evaluation
              set, so nothing leaks.
            </p>
            <pre>
              <code>{`# Five heads on one encoder; learn the teacher's confidence.
h = encoder(pair_text).last_hidden_state[:, 0]
loss = sum(
    kl_div(log_softmax(head(h)), teacher_probs[key], reduction="batchmean")
    for key, head in heads.items()   # skill, level, domain, risk, overall
)`}</code>
            </pre>

            <h4>Code checks the model, not the other way round</h4>
            <p>
              A schema-valid answer can still be wrong. Deterministic
              cross-checks compare each decision with the facts — a strong
              skill-match score for someone with zero must-have skills, or
              &quot;right level&quot; two grades off, is flagged as a
              contradiction and capped at review. Thin or inconsistent profiles,
              and a student that is unsure (40–60% on overall fit), are capped
              the same way. Explanations are built from numbered facts and are
              rejected if they cite a fact that does not exist.
            </p>

            <h4>Learning from the people who decide</h4>
            <p>
              The final score is a small logistic combiner over eight code facts
              and the model&apos;s five answers, trained on accept/reject
              feedback — so the ranking follows what managers actually choose.
              Each candidate stores the exact text the model scored, rejections
              carry a reason (skill gap, level, domain), and that becomes partial
              training targets for the next student. One task in five is always
              held out to keep the measurement honest.
            </p>
          </Prose>
        </div>
      </Section>

      <Section label="05 · Results, Honestly">
        <div className="max-w-3xl">
          <Prose>
            <p>
              Every evaluation runs the model side by side with a code-only
              baseline. If the model cannot beat simple rules, it has not earned
              its place. Latest run: 35 held-out tasks on synthetic data with a
              hidden ground truth.
            </p>
          </Prose>
          <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-950/60 backdrop-blur-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800/60 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  <th className="px-5 py-3 font-normal">Metric</th>
                  <th className="px-5 py-3 font-normal text-cyan">FitRank</th>
                  <th className="px-5 py-3 font-normal">Code baseline</th>
                </tr>
              </thead>
              <tbody>
                {RESULTS.map(([metric, ours, base]) => (
                  <tr key={metric} className="border-b border-zinc-800/40 last:border-0">
                    <td className="px-5 py-3 text-zinc-400">{metric}</td>
                    <td className="px-5 py-3 font-mono text-zinc-100">{ours}</td>
                    <td className="px-5 py-3 font-mono text-zinc-400">{base}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Prose>
            <p>
              FitRank now puts the right person in the top five more often and
              orders pairs better than the baseline, but it still picks the
              single best person first less often. That is the open problem, and
              the reason the system shortlists rather than assigns. The real test
              comes next: managers&apos; own labels, which will replace the
              synthetic ground truth for evaluation, calibration and retraining.
            </p>
          </Prose>
        </div>
      </Section>
    </article>
  );
}
