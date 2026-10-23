import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        <strong>
          Short answer: rent a WhatsApp chatbot platform if what you need is
          broadcasts, a shared team inbox and menu-style flows. Own the bot if
          it has to answer questions from your own documents or act on your
          own systems.
        </strong>{" "}
        Either way you pay Meta for messages. The decision is about what you
        pay on top of that, every month, for as long as the bot runs.
      </p>
      <p>
        Every page that ranks for &ldquo;WhatsApp chatbot&rdquo; in India is
        written by a company selling a subscription to one, so none of them
        works through the comparison below. I build these, so I have a bias
        too. I have tried to make it visible by saying where renting is the
        better call. All prices were checked on the vendors&apos; own pricing
        pages on 23 October 2026, and they change, so check them again before
        you sign anything.
      </p>

      <h2>The cost nobody avoids: Meta&apos;s per-message fees</h2>
      <p>
        A real WhatsApp chatbot runs on the WhatsApp Business Platform (the
        API), not the free WhatsApp Business app. Since 1 July 2025 Meta
        charges per delivered message, priced by category and by the
        recipient&apos;s country. Indian businesses can now be billed in rupees,
        and Meta requires accounts billed in India to move to INR by
        31 December 2026.
      </p>
      <ul>
        <li>
          <strong>Marketing</strong> templates (offers, broadcasts) are the
          expensive category, a little under a rupee each on Meta&apos;s INR
          rate card.
        </li>
        <li>
          <strong>Utility</strong> (order updates) and{" "}
          <strong>authentication</strong> (OTPs) cost a fraction of that.
        </li>
        <li>
          <strong>Service</strong> messages, your replies when a customer
          writes to you first, are what a support chatbot mostly sends. From
          1 October 2026 each business number gets 1,000 free service messages
          a month, and the 1,001st is charged.
        </li>
        <li>
          Conversations that start from a Click-to-WhatsApp ad open a free
          window of up to seven days.
        </li>
      </ul>
      <p>
        A bot that mainly answers incoming questions sits largely inside the
        cheap or free categories. A bot that mainly sends promotions does not,
        and no platform choice changes that.
      </p>

      <h2>What the subscription platforms add</h2>
      <p>
        Platforms such as WATI and Interakt are Business Solution Providers:
        they connect you to the API and give you a dashboard. You pay a plan
        fee, and on top of Meta&apos;s rate, often a per-message markup.
      </p>
      <table>
        <thead>
          <tr>
            <th>Platform and plan</th>
            <th>Plan fee (INR, + GST)</th>
            <th>AI that answers questions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>WATI Growth</td>
            <td>₹2,699 / month, billed quarterly</td>
            <td>1 AI agent, 2,000 AI credits</td>
          </tr>
          <tr>
            <td>WATI Pro</td>
            <td>₹5,799 / month, billed quarterly</td>
            <td>2 AI agents, 5,000 AI credits</td>
          </tr>
          <tr>
            <td>WATI Business</td>
            <td>₹16,799 / month, billed quarterly</td>
            <td>Unlimited agents, 20,000 AI credits</td>
          </tr>
          <tr>
            <td>Interakt Growth</td>
            <td>₹2,799 / month</td>
            <td>Add-on: WhatsApp AI Agents, ₹2,499 / month for 100 AI messages, then ₹0.50 each</td>
          </tr>
          <tr>
            <td>Interakt Advanced</td>
            <td>₹3,799 / month</td>
            <td>Same add-on</td>
          </tr>
        </tbody>
      </table>
      <p>
        The markup is easiest to see on Interakt, which publishes its
        per-message rates: a service message is ₹0.128 on Growth, against
        ₹0.115, the utility and authentication rate on Meta&apos;s INR rate
        card for India. Only
        Interakt&apos;s Enterprise plan says it has no markup. WATI&apos;s page
        says per-message charges vary by category and links its rate card
        separately.
      </p>
      <p>
        None of this is a scandal. A team inbox, a broadcast scheduler,
        template management and a Shopify connector are real software, and
        building them yourself would cost far more than the subscription.
      </p>

      <h2>Three years of each, worked through</h2>
      <p>
        An illustration, not a client: a business that wants an AI assistant
        answering customer questions on WhatsApp, with a couple of staff
        handing over to a person when the bot cannot help. Plan fees only,
        before GST and before Meta&apos;s charges, which are the same in every
        column.
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Interakt Growth + AI Agents</th>
            <th>WATI Pro</th>
            <th>Owned build</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Per month</td>
            <td>₹5,298, plus ₹0.50 per AI message after 100</td>
            <td>₹5,799</td>
            <td>Hosting and model usage only</td>
          </tr>
          <tr>
            <td>36 months of plan fees</td>
            <td>₹1,90,728</td>
            <td>₹2,08,764</td>
            <td>none</td>
          </tr>
          <tr>
            <td>Up front</td>
            <td>none</td>
            <td>none</td>
            <td>the build, from $800 at my published price</td>
          </tr>
        </tbody>
      </table>
      <p>
        At current exchange rates the build costs about what one year of
        either plan does, so the owned bot breaks even around the end of the
        first year and is ahead from then on. The Interakt column is also the optimistic one:
        100 AI messages a month is a few a day, so any real volume adds the
        per-message AI charge on top. An owned bot&apos;s model usage depends
        on your volume and the model you choose; for short answers grounded in
        a few documents it is small, and it can be estimated before you
        commit.
      </p>

      <h2>When renting is the right answer</h2>
      <p>
        If the job is broadcasts to a customer list, abandoned-cart reminders
        from Shopify, catalogues and a shared inbox for five people, rent a
        platform. That is exactly what they are built for, it works on day
        one, and building it yourself would be paying to recreate a product
        that already exists. The same goes for a menu bot (press 1 for
        timings, 2 for location) with no AI in it.
      </p>
      <p>
        Renting also wins if nobody in the business will own a piece of
        software. An owned bot needs someone, in-house or hired, to keep the
        WhatsApp app credentials valid, update the documents it answers from,
        and fix it when Meta changes something.
      </p>

      <h2>When owning it is the right answer</h2>
      <ul>
        <li>
          <strong>It must answer from your documents.</strong> Policies,
          product manuals, fee structures, a price list that changes monthly.
          This is retrieval-augmented generation (RAG): the bot looks up the
          relevant passages and answers only from them.
        </li>
        <li>
          <strong>It must refuse rather than guess.</strong> When nothing
          relevant is found above a similarity threshold, a well-built bot
          says it does not know and hands over to a person. A generic AI agent
          tuned for engagement will often improvise.
        </li>
        <li>
          <strong>It must touch your systems.</strong> Look up an order in
          your own database, book a slot in your own calendar, write a lead
          into your own CRM.
        </li>
        <li>
          <strong>You want the data.</strong> The conversations and the
          customer records live in a database you own, not in a vendor&apos;s
          dashboard you export from.
        </li>
      </ul>

      <h2>What an owned WhatsApp chatbot actually is</h2>
      <p>
        Less than people expect. Meta&apos;s Cloud API sends every incoming
        message to a webhook you host. Your code verifies it, retrieves the
        relevant passages, asks a model for an answer grounded in them, and
        posts the reply back to the Graph API. A minimal handler:
      </p>
      <Terminal title="webhook.ts">
        {`// 1. Meta verifies the webhook once with a GET request.
if (req.method === "GET") {
  const ok = url.searchParams.get("hub.verify_token") === env.VERIFY_TOKEN;
  return new Response(ok ? url.searchParams.get("hub.challenge") : "forbidden",
                      { status: ok ? 200 : 403 });
}

// 2. Every customer message arrives as a POST.
const msg = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
if (msg?.type === "text") {
  const passages = await retrieve(msg.text.body);        // vector search
  const answer = passages.length
    ? await answerFrom(passages, msg.text.body)          // grounded reply
    : "I don't have that in our documents. A person will reply shortly.";

  await fetch(GRAPH_URL + "/" + env.PHONE_NUMBER_ID + "/messages", {
    method: "POST",
    headers: { Authorization: "Bearer " + env.WA_TOKEN,
               "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to: msg.from,
                           type: "text", text: { body: answer } }),
  });
}`}
      </Terminal>
      <p>
        The reply goes out inside the 24-hour window the customer opened, so
        it is a service message. The real work sits in <code>retrieve</code>{" "}
        and <code>answerFrom</code>: splitting documents sensibly, choosing
        the threshold, and checking that answers cite what they used. That is
        also where most cheap chatbots cut corners.
      </p>
      <p>
        Two things this does not remove. Outbound messages outside that
        window still need templates approved by Meta, owned bot or not. And
        your number still needs a verified Meta Business account, which takes
        paperwork rather than code.
      </p>

      <h2>A quick way to decide</h2>
      <ol>
        <li>
          Write down the ten questions customers ask most. If a menu answers
          them, rent a platform or use the free app&apos;s quick replies.
        </li>
        <li>
          If the answers live in documents that change, or need a lookup in
          your systems, you need RAG and probably an owned bot.
        </li>
        <li>
          Multiply the platform&apos;s plan plus its AI add-on by 36 and set
          that next to a one-time build plus its running cost.
        </li>
        <li>
          Decide who maintains it. If the answer is nobody, rent.
        </li>
      </ol>
      <p>
        If the answer points to owning it, the{" "}
        <a href="/solutions/ai-chatbot/">AI chatbot page</a> has my fixed
        prices and a live assistant on this site built the same way, which you
        can try before deciding anything.
      </p>
    </>
  );
}

export const whatsappChatbotSaasVsOwning: BlogPost = {
  slug: "whatsapp-chatbot-saas-vs-owning-it",
  title: "WhatsApp Chatbot for Business: Monthly SaaS vs Owning It",
  description:
    "What a WhatsApp chatbot really costs in India: Meta's per-message fees, WATI and Interakt plans over three years, and when an owned AI bot is cheaper.",
  keywords: [
    "whatsapp chatbot",
    "whatsapp chatbot for business",
    "whatsapp ai chatbot",
    "whatsapp chatbot price india",
    "wati pricing",
    "interakt pricing",
    "whatsapp business api pricing india",
  ],
  publishedAt: "2026-10-23",
  readingMinutes: 8,
  author: { name: "Yaseen Khatib", role: "Full-Stack AI Engineer" },
  tags: ["AI", "RAG", "WhatsApp"],
  takeaways: [
    "Every WhatsApp chatbot pays Meta per delivered message; service replies to customers who wrote first include 1,000 free a month per number from 1 October 2026.",
    "Subscription platforms add a plan fee and often a per-message markup; an AI add-on can roughly double the plan fee.",
    "Over three years, plan fees for an AI-answering setup run to around ₹1.9–2.1 lakh before GST on the plans compared here; a one-time build costs about one year of that.",
    "Rent for broadcasts, team inbox and menu bots; own the bot when it must answer from your documents, refuse rather than guess, or act on your systems.",
  ],
  Body,
};
