import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import StickyActionBar from "@/components/campus/StickyActionBar";
import NextWordDemo from "./NextWordDemo";
import { TrainingPipelineDiagram } from "./Diagrams";

const DESCRIPTION =
  "What a large language model actually is and how one gets built, from scratch in plain words: next-word prediction, tokens, parameters, pretraining, fine-tuning, RLHF, and the people behind each stage.";

export const metadata: Metadata = {
  title: "Chapter 5 — What an LLM Is, and How One Is Built",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/final-year-projects/journey/llm/`,
  },
  openGraph: {
    type: "article",
    title: "Chapter 5 — What an LLM Is, and How One Is Built",
    description: DESCRIPTION,
    url: `${SITE_URL}/final-year-projects/journey/llm/`,
    siteName: "Yaseen Khatib",
    images: [`${SITE_URL}/og/campus/journey-llm.jpg`],
  },
};

/* Same reading typography as the earlier chapters — self-contained. */
function H2({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <h2 className="mt-14 flex items-baseline gap-3 text-2xl font-semibold tracking-tight text-zinc-50">
      <span className="font-mono text-sm text-purple">{n}</span>
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-relaxed text-zinc-300">{children}</p>;
}

function Term({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-zinc-50">{children}</strong>;
}

export default function LlmChapterPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Final Year Projects", path: "/final-year-projects" },
          { name: "AI Engineering Journey", path: "/final-year-projects/journey" },
          { name: "Chapter 5 — What an LLM Is", path: "/final-year-projects/journey/llm" },
        ])}
      />

      <Link
        href="/final-year-projects/journey/"
        className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-cyan"
      >
        ← The 16-day journey
      </Link>

      <header className="mt-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          Chapter 05 · The LLM, from scratch
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl">
          What an LLM actually is, and how one gets built
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          You have used ChatGPT. You have probably submitted an assignment it
          wrote. Now find out what the thing on the other side actually is —
          not the marketing version, the real one. By the end of this chapter
          you will know what is inside the box, how it was made, and who made
          it. The next chapter teaches you to use it like an engineer.
        </p>
      </header>

      <figure className="mt-10 overflow-hidden rounded-2xl border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/og/campus/journey-llm.jpg"
          alt="A wide field of scattered text fragments funnelling through three stage gates and emerging as one compact ordered core."
          className="w-full"
        />
        <figcaption className="border-t border-white/10 bg-white/[0.02] px-5 py-3 text-center font-mono text-[11px] text-zinc-500">
          A huge slice of the internet, pressed in stages into one file of numbers. That file is the model.
        </figcaption>
      </figure>

      <article className="mt-4">
        {/* ------------------------------------------------------------ */}
        <H2 n="01">It is not a search engine, and it is not a database</H2>
        <P>
          Start by throwing away two wrong pictures. An LLM is not Google —
          it does not go and look things up when you ask (by itself, it has
          no internet at all). And it is not a database — there is no table
          inside it with facts in rows. If you opened up the file that
          <em> is</em> the model, you would find neither documents nor
          sentences. You would find numbers. Billions of them. Nothing else.
        </P>
        <P>
          So what is it? Here is the honest one-line answer, and everything
          in two chapters unfolds from it: <Term>an LLM is a machine that
          predicts the next word</Term>. Given some text, it answers one
          question, over and over: &ldquo;what word most likely comes
          next?&rdquo; It writes essays one word at a time, each word chosen
          by that same single trick, thousands of times in a row.
        </P>
        <P>
          Your phone&rsquo;s keyboard autocomplete does a tiny version of
          this. The difference is scale — and scale, it turns out, changes
          everything. Predict the next word well enough, across enough of
          human writing, and the machine has to absorb grammar, facts,
          styles, code, even something that behaves like reasoning — because
          all of those are needed to guess the next word well. That is the
          strange, genuine surprise the whole AI era is built on.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="02">Watch it choose a word</H2>
        <P>
          The model never picks one word with certainty. For every position
          it produces a <Term>probability list</Term> — every word it knows,
          each with a score for &ldquo;how likely is this to come
          next&rdquo;. Then one word is drawn from the top of that list, the
          sentence grows by one word, and the whole thing repeats. Feel it
          yourself:
        </P>
        <NextWordDemo />
        <P>
          Two things to take from playing with that. First, the model{" "}
          <em>samples</em> — it does not always take the top word, which is
          why the same question gives different answers on different days.
          Second, there is no plan for the sentence in advance. The essay
          that looks planned was improvised one word at a time. Keep both
          facts; the next chapter gives you the dials that control them.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="03">Tokens — the model&rsquo;s syllables</H2>
        <P>
          One correction to everything above: the model does not actually
          predict <em>words</em>. It predicts <Term>tokens</Term> — chunks
          of text, usually a short word or a piece of a longer one.
          &ldquo;cat&rdquo; is one token; &ldquo;unbelievable&rdquo; might be
          &ldquo;un&rdquo; + &ldquo;believ&rdquo; + &ldquo;able&rdquo;. A
          rough rule for English: <Term>one token ≈ three-quarters of a
          word</Term>.
        </P>
        <P>
          Why should you care? Three reasons that will follow you through
          every AI system you ever build. Models are <Term>priced</Term> per
          token — you literally pay per syllable, in and out. Models are{" "}
          <Term>limited</Term> in tokens — the context window from Chapter 2
          is measured in them. And some famous failures — like a model
          miscounting the r&rsquo;s in &ldquo;strawberry&rdquo; — happen
          because the model sees tokens, not letters. It never saw the
          individual r&rsquo;s; it saw chunks.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="04">Where the knowledge lives — parameters</H2>
        <P>
          If there is no database inside, where do the facts live? In the{" "}
          <Term>parameters</Term> — the billions of numbers I mentioned.
          Think of them as tiny adjustable dials. During training, every
          dial gets nudged millions of times until the machine&rsquo;s
          next-word guesses become excellent. Whatever the model
          &ldquo;knows&rdquo; — Delhi is the capital of India, code needs
          matching brackets, essays have introductions — is smeared across
          those dials as patterns. No single dial holds a fact, the way no
          single neuron in your brain holds your mother&rsquo;s name.
        </P>
        <P>
          Two consequences, both interview favourites.{" "}
          <Term>The model is frozen</Term>: after training ends, the dials
          stop moving. It learned nothing from your chat yesterday, and it
          knows nothing after its <Term>knowledge cutoff</Term> — the date
          its training data ends. Ask about last week&rsquo;s news and it
          either admits ignorance or — worse — guesses fluently.{" "}
          <Term>The model is a file</Term>: those parameters can be written
          to disk, copied, downloaded. A &ldquo;7B model&rdquo; is a file of
          seven billion numbers — small enough to run on a good laptop.
          Frontier models have far more and need racks of specialised
          machines. Same idea, different sizes.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="05">The trick inside: attention</H2>
        <P>
          One piece of machinery deserves plain-words treatment, because
          every AI job description mentions it: the{" "}
          <Term>transformer</Term>, the architecture (Chapter 1 word!)
          almost every modern model is built on. Its key idea is called{" "}
          <Term>attention</Term>, and you can understand it with one
          sentence: <em>&ldquo;The trophy didn&rsquo;t fit in the suitcase
          because it was too big.&rdquo;</em> What does &ldquo;it&rdquo;
          refer to? You instantly knew: the trophy. To know that, you
          weighed every earlier word and decided which ones matter for the
          word you are processing now.
        </P>
        <P>
          Attention is that skill, made mathematical. For every token it
          processes, the model computes how much each earlier token should
          influence it — a spotlight sweeping back over the text, brighter
          on relevant words, dim on filler. Older systems read left to right
          and forgot; transformers let every word look at every other word
          at once. That is the invention (from a famous 2017 paper titled,
          genuinely, &ldquo;Attention Is All You Need&rdquo;) that made
          today&rsquo;s models possible. You now know what a transformer is
          at the depth an interviewer actually expects from a fresher: the
          architecture that lets models weigh all context at once.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="06">How one is built — the full pipeline</H2>
        <P>
          Now the part almost nobody explains properly: where does a model
          come from? It is built in stages, like a person being educated,
          and different people run each stage.
        </P>
        <TrainingPipelineDiagram />
        <P>
          <Term>Stage one: the data.</Term> Teams collect a colossal slice
          of human text — websites, books, code repositories, articles —
          measured in <em>trillions</em> of tokens. Data engineers spend
          months cleaning it: stripping junk, removing duplicates, filtering
          out the worst of the internet. Unglamorous, decisive work — a
          model can only learn patterns that exist in its food.
        </P>
        <P>
          <Term>Stage two: pretraining.</Term> The expensive one. The model
          starts as billions of dials set to random noise, and the training
          system feeds it text with one endless exercise: here is a passage
          with the next token hidden — guess it. Wrong? Nudge the dials.
          Repeat trillions of times. This runs on thousands of specialised
          processors (<Term>GPUs</Term>) for months, burning electricity at
          industrial scale — which is why frontier-model training costs more
          than most companies will ever raise, and why only a handful of
          labs (OpenAI, Anthropic, Google, Meta, and a few others) do it at
          the top end. What comes out is a <Term>base model</Term>: a
          machine with astonishing knowledge of language and the world — and
          zero manners. Ask it a question and it might continue with three
          more questions, because on the internet, questions are often
          followed by more questions. It completes text. It does not yet{" "}
          <em>help</em>.
        </P>
        <P>
          <Term>Stage three: fine-tuning.</Term> Teaching the wild
          autocomplete to behave like an assistant. Humans write thousands
          of examples of ideal behaviour — a question, then the answer a
          good assistant would give — and the model trains on these until it
          learns the <em>shape</em> of being helpful: answer the question,
          be clear, stop. This is a real, global workforce — data annotators
          and labellers, many of them in India — writing and grading
          examples all day. Fine-tuning is also how models get specialised:
          take a general model, tune it further on medical text or legal
          documents or your company&rsquo;s style. (Remember this — it
          returns near the end of the journey.)
        </P>
        <P>
          <Term>Stage four: preference training.</Term> One more polish. The
          model writes several answers to the same prompt; human reviewers
          rank them — this one is clearer, that one is subtly wrong, this
          one is rude — and the model is nudged toward the kind of answer
          people prefer. The umbrella term you will hear is{" "}
          <Term>RLHF</Term> (reinforcement learning from human feedback).
          Safety work lives here too: red teams deliberately try to make the
          model behave badly, and what they find gets trained against. The
          result of all four stages is the polite, helpful thing you meet in
          a chat window — an autocomplete that has been to finishing school.
        </P>
        <P>
          So when someone asks &ldquo;who builds these models?&rdquo; you
          have a real answer: research scientists design the training,
          infrastructure engineers keep thousands of GPUs alive for months,
          data teams curate the food, annotators teach it manners,
          safety teams try to break it. It is one of the largest engineering
          efforts in the world right now — and every stage is a job that
          exists today.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="07">Open weights vs closed — and why Ollama works</H2>
        <P>
          Remember: a trained model is a file. Some labs publish that file
          for anyone to download — those are <Term>open-weight
          models</Term>, like Meta&rsquo;s Llama family or Mistral&rsquo;s.
          Others keep the file private and sell access through an API — the
          way you use GPT or Claude, request in, response out, exactly like
          the backends you built in Chapter 3. That is the entire mystery
          behind a tool you will meet next chapter called{" "}
          <Term>Ollama</Term>: it simply downloads open-weight model files
          and runs them on your own laptop. Same machinery, your hardware,
          no API bill, full privacy — just smaller dials than the frontier.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="08">The model has no memory of you</H2>
        <P>
          One last mind-bender that most users never learn.{" "}
          <Term>The model is stateless</Term> — Chapter 3 word. It holds no
          conversation in its head between messages. When you send your
          tenth message in a chat, the app silently re-sends{" "}
          <em>the entire conversation so far</em>, and the model reads it all
          again, from scratch, to predict what comes next. The
          &ldquo;memory&rdquo; of your chat lives in the app&rsquo;s
          database (Chapter 4!), not in the model. This is also why long
          conversations get expensive — you are re-paying, in tokens, for
          the whole history on every turn — and why the context window
          eventually fills. Almost everything clever in the later chapters —
          giving models memory, documents, tools — is engineering built
          around this one limitation.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="09">Why it lies with confidence</H2>
        <P>
          Now you can understand AI&rsquo;s most famous flaw from the
          inside. Ask the model for a citation, a court case, a paper — and
          it may produce one that <em>does not exist</em>, formatted
          perfectly, delivered confidently. This is called{" "}
          <Term>hallucination</Term>, and knowing the mechanism, you can see
          it is not a bug in the code. The machine predicts{" "}
          <em>plausible next tokens</em>. Truth was never the target —
          plausibility was. Usually the most plausible continuation is also
          true (that is what training on the world&rsquo;s text buys you);
          sometimes it is just something that <em>sounds</em> true.
        </P>
        <P>
          Hold this thought firmly, because it becomes a design principle
          later in the journey: <Term>never treat model output as fact —
          treat it the way Chapter 3 taught you to treat user input:
          validate it at the door</Term>. Entire architectures exist to pin
          models to real documents so they stop inventing — that is the RAG
          part of this journey, and now you know exactly why it must exist.
        </P>

        {/* ------------------------------------------------------------ */}
        <H2 n="10">Do this today</H2>
        <P>
          Go talk to a model with your new eyes. Give it half a sentence and
          ask it to continue — watch the autocomplete nature show itself.
          Ask the same question three times and compare the answers —
          sampling, live. Ask it something after its knowledge cutoff and
          watch how it handles not knowing. Ask how many r&rsquo;s are in
          &ldquo;strawberry&rdquo; — and now, unlike everyone else sharing
          that screenshot, you know <em>why</em> it struggles. Then explain
          to a friend, in your own words, the four stages that built the
          thing you were just talking to. That explanation is this
          chapter&rsquo;s exam.
        </P>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <Link
            href="/final-year-projects/journey/database/"
            className="rounded-lg border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-colors duration-200 hover:border-cyan/60 hover:text-zinc-50"
          >
            ← Chapter 04 · Database
          </Link>
          <Link
            href="/final-year-projects/journey/using-llms/"
            className="rounded-lg bg-gradient-to-r from-cyan to-purple px-6 py-3 text-sm font-medium text-ink shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] transition-shadow duration-300 hover:shadow-[0_0_32px_0_rgba(168,85,247,0.5)]"
          >
            Next → Chapter 06 · Using LLMs
          </Link>
        </div>
      </article>

      <StickyActionBar context="16-Day AI Engineering Journey" />
    </div>
  );
}
