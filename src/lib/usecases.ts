// Use-case landing pages under /solutions/<slug>/.
//
// Each page targets one search phrase people in India use when they want an app or website built (the research is
// in docs/seo-usecase-pages-2026-11-04.md). The rules that keep these from becoming thin, near-duplicate pages:
//   - every page has its own decisions, its own "when you do not need this" and its own FAQ;
//   - every price comes from lib/solutions.ts (SERVICES, HOSTED_TIERS), never a number made up for the page;
//   - every page says what has and has not been built, and links to the real work that is related;
//   - pages release on `releaseOn` (UTC) through the daily deploy, two or three at a time, never all at once.

export type OfferId = "hosted-starter" | "hosted-growth" | "custom-build" | "review";

export interface UseCase {
  slug: string;
  /** First day the page is built, listed and in the sitemap (UTC, YYYY-MM-DD). */
  releaseOn: string;
  /** The search phrase this page is for. */
  keyword: string;
  eyebrow: string;
  h1: string;
  /** Metadata title (without the site name). */
  title: string;
  description: string;
  /** A direct answer for the top of the page, written to be quoted. */
  answer: string;
  intro: string[];
  forYou: string[];
  notForYou: string[];
  v1Heading: string;
  v1: string[];
  later: string[];
  sections: { h2: string; body: string[]; bullets?: string[] }[];
  offers: OfferId[];
  offerNote: string;
  proof: { label: string; href: string; note: string }[];
  /** What has not been built, said plainly. */
  honest: string;
  faq: { question: string; answer: string }[];
  related: string[];
  interest: string;
  placeholder: string;
}

export const USE_CASES: UseCase[] = [
  {
    slug: "hire-app-developer-india",
    releaseOn: "2026-11-03",
    keyword: "hire app developer india",
    eyebrow: "Mobile app developer · India · remote",
    h1: "Hire an app developer in India: one engineer, a fixed price",
    title: "Hire an App Developer in India (Fixed Price)",
    description:
      "Hire a mobile app developer in India: one senior engineer, a written scope, a fixed price and the source code in your repository from day one.",
    answer:
      "You can hire an app developer in India through a marketplace, an agency or a single senior engineer. One engineer suits the first version of one app: you talk to the person writing the code, the scope is written down, the price is fixed before work starts, and the code sits in your repository from the first commit.",
    intro: [
      "Most people who search for an app developer have already been quoted once and are not sure the number is real. This page sets out what hiring one engineer looks like, what it is wrong for, and what to ask any developer before you pay.",
      "I am Yaseen Khatib, a full-stack engineer working from Hyderabad. I build mobile apps, the web backends behind them and the admin screens you need to run them, and I work remotely with clients across India and abroad.",
    ],
    forYou: [
      "You have one app to launch and want the person designing it to also be the person writing it.",
      "You want a fixed price against a written scope, not an hourly meter.",
      "You want the code in your own repository so you can hire anyone else later.",
    ],
    notForYou: [
      "You need ten developers working in parallel from the first week.",
      "You need a 24/7 support desk with a phone line. One engineer cannot honestly offer that.",
      "You want a copy of a large consumer app with its own delivery fleet or its own payments network.",
    ],
    v1Heading: "What a first engagement delivers",
    v1: [
      "A written scope: users, screens, what connects to what, and what is left out.",
      "A working app on real phones every week, not a status report.",
      "A backend and an admin screen, because an app nobody can manage is not finished.",
      "Deployment on infrastructure you control, plus documentation and a handover session.",
    ],
    later: [
      "A second platform once the first has real users.",
      "Push notifications and reminders beyond the basics.",
      "Anything that needs a team: a growth plan, a design system, a support rota.",
    ],
    sections: [
      {
        h2: "Marketplace, agency or one engineer: which fits",
        body: [
          "A marketplace gives you the widest choice and the least protection. You do the vetting, you write the brief, and you find out about quality when the work arrives. It works well for small, well-defined jobs.",
          "An agency gives you a team and a process, and a layer between you and the people writing the code. That layer is useful when the project is large. It is a cost when the project is one app and the main risk is that requirements get lost on the way down.",
          "One engineer gives you a single person who holds the whole design in their head. The trade is capacity: it is the wrong choice when you need a large team, and I say so on the first call rather than after the deposit.",
        ],
      },
      {
        h2: "Android, iPhone or a web app first",
        body: [
          "Many first apps do not need to be native on both stores on day one. A web app that installs to the home screen reaches both platforms with one codebase. A wrapper such as Capacitor puts the same code in a store-ready Android app. I used that route for SpotAI: a Vue 3 and Capacitor app with a NestJS backend, shipped as an Android build and an iPhone web app.",
          "Going native on both stores is the right call when you need deep device features or the store listing is part of how customers find you. Publishing to either store needs your own developer account, which is a step you control.",
        ],
      },
      {
        h2: "Questions to ask any developer before you pay",
        body: ["These are worth asking me as well:"],
        bullets: [
          "Can I see something you built alone, running, that I can open on my own phone?",
          "Who owns the code, and where does it live while it is being written?",
          "What is in the price, and what is quoted separately if I change my mind?",
          "What happens if you are unavailable halfway through?",
          "Who pays for hosting, store accounts and third-party services, and in whose name are they?",
        ],
      },
    ],
    offers: ["custom-build", "hosted-growth", "review"],
    offerNote:
      "A first app is usually either a fixed-scope build or a hosted tool with a customer-facing side. If you hold a quote you are unsure about, the architecture review costs less than the mistake it prevents.",
    proof: [
      { label: "SpotAI: a two-sided mobile app", href: "/products/spotai/", note: "Built and shipped solo: member app, owner console, backend and Android and iPhone builds you can install." },
      { label: "IntegrateX case study", href: "/blog/94-percent-payload-reduction-react-flow/", note: "A product decision and the engineering behind it, written up with the numbers." },
      { label: "All shipped products", href: "/products/", note: "Each links to source or a live demo." },
    ],
    honest:
      "I work on a limited number of builds at once. If I cannot start when you need me to, you hear that on the first call, not after a deposit.",
    faq: [
      {
        question: "How much does it cost to hire an app developer in India?",
        answer:
          "It depends on the scope and on who you hire. My own fixed-scope custom builds are quoted between ₹2,00,000 and ₹10,00,000 over 4 to 12 weeks, and a single-purpose hosted tool starts at ₹15,000 setup plus ₹800 a month. Those are my prices, and other developers price differently. The call is free, and you leave with a written scope and a fixed number.",
      },
      {
        question: "Do I own the app and the source code?",
        answer:
          "Yes on every fixed-scope build. The code lives in your repository from the first commit, with no licence to renew. On the hosted subscription I run the app for you, and the source can be handed over for a one-time fee.",
      },
      {
        question: "Can you build for Android and iPhone?",
        answer:
          "Yes. For a first version I usually build one codebase that runs as an Android app and as an installable web app on iPhone, and move to native on both stores when the product justifies it. Store listings need your own Apple and Google developer accounts.",
      },
      {
        question: "I want an app developer near me. Does location matter?",
        answer:
          "For most apps, no. I am in Hyderabad and work remotely with weekly demos on a real phone. If you want to meet in person in Hyderabad for the first conversation, that is easy to arrange.",
      },
    ],
    related: ["app-development-cost-india", "freelance-website-developer", "grocery-app-development"],
    interest: "Custom app build",
    placeholder: "What the app should do, who will use it on day one, and whether you need Android, iPhone or both…",
  },

  {
    slug: "freelance-website-developer",
    releaseOn: "2026-11-03",
    keyword: "website developer freelancer",
    eyebrow: "Freelance website developer · India",
    h1: "A freelance website developer who builds for search and for enquiries",
    title: "Freelance Website Developer in India",
    description:
      "A freelance website developer in India: fast mobile sites built to get found on Google and turn visits into enquiries, at a fixed price.",
    answer:
      "A freelance website developer builds your site directly, without an agency in between. A good small-business site loads fast on a phone, says what you do in the first screen, gives people one clear way to enquire, and is set up so Google can find and index every page. I build to a written scope at a fixed price.",
    intro: [
      "Most small-business websites fail in the same two places: they are slow on a phone, and visitors cannot tell what to do next. Both are fixable, and neither needs a large budget.",
      "I build websites with Next.js and Astro, the same tools behind this portfolio and the DefendIt, streamerOS and SpotAI sites. Each of those is built to be crawled, fast on mobile and measurable.",
    ],
    forYou: [
      "You are a local or online business that needs a site that brings in enquiries, not a brochure.",
      "You want one person responsible for the design, the code and the search setup.",
      "You want to know what is measured: where visitors come from and which button they pressed.",
    ],
    notForYou: [
      "You only need a single page with your phone number. A free page builder is enough, and I will say so.",
      "You want a site that you will redesign every month with no developer. A hosted builder suits that better.",
      "You want thousands of auto-generated pages. Search engines are right to ignore those.",
    ],
    v1Heading: "What a first website includes",
    v1: [
      "A first screen that says what you do, where, and what to do next.",
      "One enquiry path that works: a form, WhatsApp, a phone link, or all three.",
      "Pages for each service or location you actually offer, each written for that page.",
      "Fast loading on a mid-range phone, a sitemap, and Google Search Console set up.",
      "Analytics that counts enquiries, so you can see which pages bring them.",
    ],
    later: [
      "A blog, once you have something to say that a customer searches for.",
      "Online payments or a booking system.",
      "More languages, if your customers read them.",
    ],
    sections: [
      {
        h2: "Website, web app or online store: pick the smallest thing that works",
        body: [
          "A website tells people about you. A web app lets them do something: book, order, pay, log in. A store is a web app with a catalogue and a checkout. Starting with the smallest of the three that fits keeps the price down and the launch date close.",
          "If the real need is bookings or invoicing, a hosted tool is often a better answer than a site with a form, and the small-business page covers that route.",
        ],
      },
      {
        h2: "What a business site needs before it needs a designer",
        body: ["The order matters. Get these right first, and a better design adds to them instead of hiding their absence."],
        bullets: [
          "An offer a stranger understands in five seconds.",
          "Proof: real work, real names where you have permission, real photos.",
          "One enquiry path above the fold on a phone.",
          "A page per service, with the phrase customers search in its title and heading.",
          "A site Google can read: clean titles, descriptions, a sitemap and no pages blocked by mistake.",
        ],
      },
      {
        h2: "Fixed price, not an hourly meter",
        body: [
          "A website is scoped on pages, sections and integrations, so it can be priced up front. The scope is written down, and a change you ask for is quoted before it is built. You see a working version every week.",
        ],
      },
    ],
    offers: ["hosted-starter", "hosted-growth", "custom-build"],
    offerNote:
      "A simple business site fits the hosted plans: I build it, host it and keep it running. A site with a custom workflow behind it is a fixed-scope build.",
    proof: [
      { label: "This portfolio", href: "/", note: "Next.js static export with structured data, sitemaps and an AI-readable corpus." },
      { label: "DefendIt", href: "https://campus.streamerosai.com/", note: "A content site with guides, tools and lead forms, tracked end to end." },
      { label: "SpotAI website", href: "https://spotai.streamerosai.com/", note: "A multi-language marketing site with calculators, built with Astro." },
      { label: "Analytics dashboard", href: "/products/analytics-dashboard/", note: "How the numbers behind these sites are read." },
    ],
    honest:
      "I am an engineer first. I design clean, fast pages, but if you want brand identity work, illustration or photography, I will tell you to hire a designer for that part and build around their output.",
    faq: [
      {
        question: "How much does a freelance website developer charge in India?",
        answer:
          "It varies widely. For my work, a simple business site fits the hosted plans: setup from ₹15,000 and ₹800 a month, which includes hosting and small changes. A site with custom workflows is quoted as a fixed-scope build, which starts at ₹2,00,000. The quote is fixed after a free call.",
      },
      {
        question: "Will my website show up on Google?",
        answer:
          "I set the site up so Google can find and index it: clean page titles, descriptions, a sitemap and Search Console. Rankings depend on competition and time, and nobody can promise a position. A new site with real, specific pages usually needs weeks to start appearing.",
      },
      {
        question: "Can I update the site myself?",
        answer:
          "On the hosted plans, small changes each month are included and I make them. If you want to edit content yourself, I can add a simple editor or hand over the source so another developer can.",
      },
      {
        question: "Do you build in WordPress?",
        answer:
          "My work is in Next.js and Astro. For most small-business sites they load faster than a typical WordPress setup and need less maintenance. If you already have a WordPress site you love, I will say whether it is worth keeping.",
      },
    ],
    related: ["ecommerce-website-development-india", "app-development-cost-india", "ngo-website-development"],
    interest: "Website build",
    placeholder: "What your business does, where, and what you want a visitor to do on the site…",
  },

  {
    slug: "app-development-cost-india",
    releaseOn: "2026-11-03",
    keyword: "mobile app development cost india",
    eyebrow: "Pricing guide · India",
    h1: "What a mobile app costs in India, and what changes the price",
    title: "Mobile App Development Cost in India: What Drives It",
    description:
      "What a mobile app costs in India and what changes the price: user roles, integrations, admin panel and hosting. Plus how to size your own app.",
    answer:
      "The price of a mobile app comes from how many kinds of users it has, how many screens each needs, what it connects to (payments, WhatsApp, maps) and who runs it afterwards. A one-purpose app costs far less than a marketplace with two sides and an admin panel. I quote fixed prices against a written scope, and a custom build from me starts at ₹2,00,000.",
    intro: [
      "A search for app costs gives you ranges so wide they are useless. That happens because the word app covers everything from a booking form to a ride network. This page explains what actually moves the number, so you can size yours before you ask anyone for a quote.",
      "The prices on this page are my own. I do not publish what other developers or agencies charge, because I cannot verify it.",
    ],
    forYou: [
      "You are comparing quotes and want to know whether one is padded or missing something.",
      "You are planning a budget before you talk to anyone.",
      "You want to cut scope intelligently rather than buy a smaller version of everything.",
    ],
    notForYou: [
      "You want a single number without describing the app. No honest developer can give one.",
      "You are comparing against a cheaper quote that has no written scope. The scopes are not comparable.",
    ],
    v1Heading: "What goes into a quote, line by line",
    v1: [
      "Users: each kind of user (customer, staff, admin, driver) is its own set of screens and permissions.",
      "Screens and flows: sign-up, the main task, payment or confirmation, history, settings.",
      "Integrations: UPI or card payments, WhatsApp messages, maps, SMS, email, accounting exports.",
      "The backend and database: where data lives, who can read it, how it is backed up.",
      "The admin side: how you add products, see orders and fix mistakes.",
      "Running costs afterwards: hosting, store accounts, messaging and monitoring.",
    ],
    later: [
      "A second platform.",
      "Advanced analytics and reporting.",
      "Features you cannot yet justify with real users.",
    ],
    sections: [
      {
        h2: "How to size your own app in ten minutes",
        body: [
          "Write down each kind of person who will log in. For each, list the three things they must be able to do on day one. Then list what the app must talk to outside itself. That list is the scope.",
          "Two or three roles with three tasks each and one or two integrations is a small build. Every extra role roughly multiplies the screens and the testing, which is why a two-sided marketplace costs much more than a one-sided tool.",
        ],
      },
      {
        h2: "Three ways to pay, and when each fits",
        body: ["The structure of the engagement changes the risk as much as the price."],
        bullets: [
          "Architecture review (₹25,000 to ₹75,000, 1 to 2 weeks): you get a written design and an honest cost and timeline range. It is yours whoever builds it.",
          "Fixed-scope build (₹2,00,000 to ₹10,00,000, 4 to 12 weeks): a written specification, a fixed price and staged payments tied to delivered milestones.",
          "Hosted subscription (setup from ₹15,000, from ₹800 a month): for one tool doing one job. I build it, run it and keep it backed up.",
        ],
      },
      {
        h2: "Where quotes go wrong",
        body: [
          "A quote with no admin panel, because the owner has to be able to change things. A quote with no hosting or monitoring, because a live app needs both. A quote that treats store accounts and messaging fees as someone else's problem. A quote with no written scope, so every question later becomes an extra charge.",
          "Store fees are real but small beside the build: Apple charges an annual developer fee and Google a one-time one, at rates that change, so check the current figures when you plan.",
        ],
      },
      {
        h2: "And a website?",
        body: [
          "A website without logins or payments is a much smaller job than an app. For a business site, the hosted plans cover it: setup from ₹15,000 and from ₹800 a month. A store or a site with a custom workflow behind it moves into the build range.",
        ],
      },
    ],
    offers: ["review", "custom-build", "hosted-starter", "hosted-growth"],
    offerNote:
      "These are the figures on the rest of this site, not an estimate made up for this page. Your number is fixed after the free call and a written scope.",
    proof: [
      { label: "SpotAI", href: "/products/spotai/", note: "A two-sided app (members and owners) with payments, to show what two roles involve." },
      { label: "The solutions overview", href: "/solutions/", note: "The same prices, with what each includes." },
    ],
    honest:
      "I cannot tell you what a specific app costs without a short conversation. Anyone who does is guessing, and the guess is usually missing the admin side.",
    faq: [
      {
        question: "What is the minimum cost to build a mobile app in India?",
        answer:
          "For me, the smallest engagement is a hosted single-purpose tool: setup from ₹15,000 and ₹800 a month. A custom app with its own backend and admin panel is a fixed-scope build, which starts at ₹2,00,000. The figure for your app depends on its users and integrations.",
      },
      {
        question: "Why do two quotes for the same app differ so much?",
        answer:
          "Usually because the scopes differ. One may include an admin panel, hosting, testing on real devices and handover; the other may not. Ask both to list users, screens, integrations and what is excluded, then compare those lists.",
      },
      {
        question: "How long does it take to build an app?",
        answer:
          "My fixed-scope builds run 4 to 12 weeks depending on scope, with a working version on a real phone each week. A small hosted tool can be live much sooner.",
      },
      {
        question: "What does an app cost after launch?",
        answer:
          "Hosting, backups, any messaging or maps charges, store developer accounts and small fixes. On the hosted plan these are bundled into the monthly fee. On a fixed build you pay hosting separately, or I run it for you on a monthly plan.",
      },
      {
        question: "How much does a website cost in India?",
        answer:
          "A simple business website fits my hosted plans from ₹15,000 setup and ₹800 a month. A store, a booking system or a custom workflow is a fixed-scope build. The quote follows a written scope.",
      },
    ],
    related: ["hire-app-developer-india", "freelance-website-developer", "billing-software-for-small-business"],
    interest: "Architecture review / advisory",
    placeholder: "Describe the app in a few lines: who uses it, what they do in it, and what it needs to connect to…",
  },

  {
    slug: "grocery-app-development",
    releaseOn: "2026-11-03",
    keyword: "grocery delivery app development",
    eyebrow: "Grocery · kirana · supermarket",
    h1: "A grocery ordering app for one store, built to run, not to demo",
    title: "Grocery Delivery App Development for a Local Store",
    description:
      "Grocery delivery app development for a local store: catalogue, stock, delivery slots and UPI orders. What version one needs, and what it does not.",
    answer:
      "A local grocery app needs five things to work: a catalogue that matches your real stock, delivery slots, a clear way to handle items priced by weight, UPI payment confirmation, and an owner screen to pack and dispatch orders. Start with one store and one delivery area, and add features only once orders are flowing.",
    intro: [
      "The big grocery apps run dark stores and rider fleets, and that network is the product. A neighbourhood store competes differently: it knows its customers, it already takes orders on WhatsApp, and what it lacks is a clean way to turn those orders into packed, paid, delivered baskets.",
      "This page is about building that for one store or a small group of stores. It is not about building a quick-commerce network, and it says where that line is.",
    ],
    forYou: [
      "You run one or a few stores and take orders on calls and WhatsApp today.",
      "You deliver within a few kilometres with your own staff or a local rider.",
      "You want orders, stock and payments in one place instead of three notebooks.",
    ],
    notForYou: [
      "You are planning a ten-minute delivery network with dark stores. That is a logistics business, not an app project.",
      "You have fewer than a few dozen repeat customers. A WhatsApp catalogue and a payment link may be all you need for now.",
    ],
    v1Heading: "Version one: one store, one delivery area",
    v1: [
      "A catalogue with photos, units and prices that you can edit from your phone.",
      "Stock counts that reduce when an order is packed, so the app stops selling what is gone.",
      "Delivery slots and a minimum order, set by you.",
      "Items sold by weight: the customer orders about a kilo, and the final price is set after packing.",
      "UPI payment with a clear paid, pending and failed status.",
      "An order screen for packing and dispatching, with a repeat-order button for regulars.",
    ],
    later: [
      "Multiple stores or branches.",
      "Rider tracking on a map.",
      "Loyalty points and coupons.",
      "A native Android and iPhone app, after the web version has users.",
    ],
    sections: [
      {
        h2: "Do you need an app, or a catalogue and a payment link",
        body: [
          "If you have a small customer base, start with a WhatsApp catalogue and UPI payment links. It costs almost nothing and teaches you what customers actually order.",
          "An app starts to pay for itself when orders are frequent enough that handling them by hand causes mistakes: wrong items, missed payments, stock you sold twice. That is the moment to build, and the first version is often a web app customers open from a link, not a store download.",
        ],
      },
      {
        h2: "What a grocery app has to get right",
        body: ["These problems are specific to groceries, and they are where generic app templates fall over."],
        bullets: [
          "Stock accuracy: if the app sells the last packet twice, a person has to phone the customer.",
          "Weight and price: loose items are weighed at packing, so the charge changes after the order is placed. Decide how the customer is told and charged.",
          "Substitutions: when an item is out, does the customer get a call, an automatic swap or a refund?",
          "Slots that match your capacity: ten slots at six in the evening that you can only serve three of is a promise you break.",
          "Payment confirmation: an order should not be packed on a payment that has not cleared.",
        ],
      },
      {
        h2: "How I would build it",
        body: [
          "One web app for customers, installable to the home screen, and one screen for the store. A single database holds stock, orders and payments, so the numbers cannot disagree. The code lives in your repository from the first commit, and a native app can be wrapped around the same code later.",
        ],
      },
    ],
    offers: ["hosted-growth", "custom-build"],
    offerNote:
      "One store with a customer ordering page and payments fits the Growth plan, which includes a customer-facing portal and payment and WhatsApp integrations. Several branches or custom delivery rules move it into a fixed-scope build.",
    proof: [
      { label: "SpotAI", href: "/products/spotai/", note: "A mobile app with UPI payments and an owner console, built and shipped by one engineer." },
      { label: "Hosted small-business tools", href: "/solutions/small-business/", note: "Stock tracking and enquiries as a hosted tool, with prices." },
    ],
    honest:
      "I have not shipped a grocery app. The parts it needs, a catalogue, stock, payments and an owner screen, are things I have built in other products, and I would not pretend this is an app I have already run in a real store.",
    faq: [
      {
        question: "How much does grocery app development cost?",
        answer:
          "For one store with a customer ordering page, payments and an owner screen, the Growth plan applies: setup from ₹40,000 and ₹2,500 a month. Several branches, rider tracking or custom delivery rules are a fixed-scope build from ₹2,00,000. Your figure is fixed after a free call.",
      },
      {
        question: "Can customers pay by UPI?",
        answer:
          "Yes. Orders show a paid, pending or failed status, and the store packs only paid orders unless you choose cash on delivery.",
      },
      {
        question: "Can it handle items sold by weight?",
        answer:
          "Yes. The customer orders an approximate quantity, the store weighs at packing, and the final amount is set then. The app records the difference so the customer sees why the price changed.",
      },
      {
        question: "Do I need to be on Google Play?",
        answer:
          "Not at first. A web app that installs to the home screen reaches Android and iPhone from one link. A store listing can come later, once you have customers asking for it.",
      },
    ],
    related: ["food-delivery-app-development", "ecommerce-website-development-india", "billing-software-for-small-business"],
    interest: "Custom app build",
    placeholder: "How many stores, roughly how many orders a day, and how you take orders today…",
  },

  {
    slug: "ecommerce-website-development-india",
    releaseOn: "2026-11-09",
    keyword: "ecommerce website development india",
    eyebrow: "Online store · India",
    h1: "An ecommerce website for India: when to use a platform and when to build",
    title: "Ecommerce Website Development in India",
    description:
      "Ecommerce website development in India: when a hosted store is enough, when to build custom, and what UPI, COD, pincodes and GST invoices need.",
    answer:
      "Most small online stores should start on a hosted store platform. Build custom only when your selling process is unusual: made-to-order items, business-only pricing, bundles or invoices a platform cannot produce. Either way, an Indian store needs UPI and cash on delivery, pincode checks and GST-ready invoices.",
    intro: [
      "A search for ecommerce development turns up agencies selling large builds. For many sellers that is the wrong first move. This page sets out how to decide, and what I build when the answer is custom.",
    ],
    forYou: [
      "You sell products online or want to start, and want an honest view of platform versus custom.",
      "Your process does not fit a standard checkout: custom orders, wholesale prices, subscriptions.",
      "You care about speed on mobile and being found on Google.",
    ],
    notForYou: [
      "You have a normal catalogue and standard checkout. A hosted platform will be cheaper and quicker, and I will tell you that.",
      "You want a marketplace with many sellers. That is a different, larger product.",
    ],
    v1Heading: "What a first custom store includes",
    v1: [
      "Product pages that load fast and describe each product for search and for people.",
      "Checkout with UPI, cards and cash on delivery, and a pincode check before payment.",
      "GST invoices numbered and formatted the way your accountant needs.",
      "An admin screen to add products, change prices and see orders.",
      "Order emails and WhatsApp messages at each stage.",
    ],
    later: [
      "Product reviews and ratings.",
      "Multiple warehouses or sellers.",
      "A native app, once repeat customers justify it.",
    ],
    sections: [
      {
        h2: "Platform or custom: how to decide",
        body: [
          "Use a platform when your catalogue is a list of products with options, your checkout is standard and your team can manage it from a dashboard. You pay a monthly fee and gain years of work for free.",
          "Build custom when the platform fights your process: items made to order from a customer's specification, prices that depend on who is buying, bundles priced by rules, or an order flow that has to feed a system you already run.",
        ],
      },
      {
        h2: "What an Indian store has to handle",
        body: ["These are the details that decide whether orders complete."],
        bullets: [
          "UPI first, with cards and cash on delivery where your margins allow it.",
          "A pincode serviceability check before checkout, not after.",
          "Return and refund rules shown before payment.",
          "Invoices in the format your accountant has signed off. GST rules change, so I build to the format you give me.",
        ],
      },
      {
        h2: "Speed and being found",
        body: [
          "Product pages should be fast on a mid-range phone and written so a search engine understands each one: a real title, a real description, structured data for price and availability, and a sitemap. I build the pages that way and set up Search Console and analytics so you can see which products bring visits.",
        ],
      },
    ],
    offers: ["hosted-growth", "custom-build"],
    offerNote:
      "A small store with a custom order flow fits the Growth plan. A larger catalogue or integrations with your stock system are a fixed-scope build.",
    proof: [
      { label: "Analytics dashboard", href: "/products/analytics-dashboard/", note: "How visits, sources and enquiries are measured across five sites." },
      { label: "DefendIt", href: "https://campus.streamerosai.com/", note: "A content-heavy Next.js site with a catalogue of projects and a lead flow." },
    ],
    honest:
      "I have not run an online store of my own. I have built catalogue sites and order and payment flows, and I would start your project with a short scope review, not a promise.",
    faq: [
      {
        question: "How much does ecommerce website development cost in India?",
        answer:
          "A standard store is often cheapest on a hosted platform. For a custom store, a small one fits my Growth plan (setup from ₹40,000, ₹2,500 a month) and a larger one is a fixed-scope build from ₹2,00,000. The figure follows a written scope.",
      },
      {
        question: "Should I use Shopify or build a custom store?",
        answer:
          "If your catalogue and checkout are standard, use a platform. Build custom only when your process cannot be modelled in one. I will tell you which you are during the free call.",
      },
      {
        question: "Can the store take UPI and cash on delivery?",
        answer:
          "Yes. UPI, cards and cash on delivery can all be offered, with a pincode check and clear order statuses.",
      },
      {
        question: "Will the store be fast on mobile?",
        answer:
          "That is a design goal from the first page. Product pages are built to load quickly on mid-range phones, and I measure it before launch.",
      },
    ],
    related: ["freelance-website-developer", "grocery-app-development", "billing-software-for-small-business"],
    interest: "Website build",
    placeholder: "What you sell, roughly how many products, and what makes your orders different from a standard checkout…",
  },

  {
    slug: "food-delivery-app-development",
    releaseOn: "2026-11-09",
    keyword: "food delivery app development",
    eyebrow: "Restaurants · cloud kitchens",
    h1: "Your own food ordering app, so orders stop going through someone else's",
    title: "Food Delivery App Development for Restaurants",
    description:
      "Food delivery app development for restaurants and cloud kitchens: direct ordering, a kitchen screen and delivery status, built for one outlet first.",
    answer:
      "A restaurant ordering app has three screens for three people: the customer who orders, the kitchen that prepares, and whoever delivers. Build those three for one outlet first, with payment confirmation and clear order statuses, and you own the customer relationship instead of renting it from an aggregator.",
    intro: [
      "Aggregator apps bring orders, and they also own the customer and take a cut of each order. A direct ordering app will not replace them overnight, but it gives your regular customers a way to order from you without that middle step.",
      "This page is for one restaurant or a small group. Building a marketplace of many restaurants is a different product and a much larger one.",
    ],
    forYou: [
      "You run a restaurant or cloud kitchen with regular customers.",
      "You already take orders by phone and WhatsApp and want them in one tidy flow.",
      "You deliver with your own staff or a local rider.",
    ],
    notForYou: [
      "You want a Zomato-style marketplace of many restaurants.",
      "You have no repeat customers yet. Win orders first, then build the channel.",
    ],
    v1Heading: "Version one for a single outlet",
    v1: [
      "A menu you can change in minutes: items, prices, sold-out toggles and timings.",
      "Customer ordering by link or QR code, no app download needed.",
      "A kitchen screen that shows new orders and lets staff move them through preparing, ready and out for delivery.",
      "Payment by UPI with confirmation before the kitchen starts.",
      "Order messages by WhatsApp or SMS at each stage.",
    ],
    later: [
      "A native app with push notifications.",
      "Table ordering by QR inside the restaurant.",
      "Multiple outlets.",
      "Rider tracking on a map.",
    ],
    sections: [
      {
        h2: "Three screens, three people",
        body: [
          "The customer wants to order in under a minute. The kitchen wants a loud, simple list of what to make next. The delivery person wants an address and a phone number. Most failures come from trying to make one screen serve all three.",
        ],
      },
      {
        h2: "What breaks in real kitchens",
        body: ["These are the failures to design for, not to discover after launch."],
        bullets: [
          "The same order submitted twice because the payment page was slow.",
          "An item that is sold out but still orderable.",
          "A payment that went through while the order did not, or the reverse.",
          "Orders arriving during a rush with no sound or alert in the kitchen.",
          "A customer who cannot tell whether the order was accepted.",
        ],
      },
      {
        h2: "Real-time updates",
        body: [
          "Order status has to reach the kitchen and the customer as it changes, not on a refresh. That calls for pushing updates from the server rather than polling. I wrote up that pattern for a high-traffic portal, and the same idea applies here at a much smaller scale.",
        ],
      },
    ],
    offers: ["hosted-growth", "custom-build"],
    offerNote:
      "One outlet with customer ordering, a kitchen screen and payments fits the Growth plan. Several outlets or custom rider logic are a fixed-scope build.",
    proof: [
      { label: "Real-time architecture write-up", href: "/blog/real-time-telemetry-websockets-react/", note: "Pushing state to every screen at once instead of polling." },
      { label: "SpotAI", href: "/products/spotai/", note: "Two-sided app with UPI payments and an owner console." },
    ],
    honest:
      "I have not built a restaurant app that is live in a kitchen. The real-time updates, payments and admin screens are things I have built elsewhere, and I would start with a pilot at one outlet.",
    faq: [
      {
        question: "How much does food delivery app development cost?",
        answer:
          "A single outlet with direct ordering, a kitchen screen and payments fits the Growth plan: setup from ₹40,000 and ₹2,500 a month. Multiple outlets or a custom rider system are a fixed-scope build from ₹2,00,000.",
      },
      {
        question: "Can I avoid aggregator commissions?",
        answer:
          "A direct ordering channel means orders that come through it do not pay an aggregator's cut. It will not replace the aggregators' reach, so most restaurants run both and move regulars to the direct channel.",
      },
      {
        question: "Do customers need to download an app?",
        answer:
          "Not for the first version. Customers open a link or scan a QR code, and the page installs to their home screen if they like. A store app can come later.",
      },
      {
        question: "Can it show live order status?",
        answer:
          "Yes. Status changes reach the kitchen screen and the customer without a refresh.",
      },
    ],
    related: ["grocery-app-development", "taxi-booking-app-development", "hire-app-developer-india"],
    interest: "Custom app build",
    placeholder: "Restaurant or cloud kitchen, how many orders a day, how you take orders now, and how you deliver…",
  },

  {
    slug: "billing-software-for-small-business",
    releaseOn: "2026-11-09",
    keyword: "billing software for small business",
    eyebrow: "Billing · invoicing · India",
    h1: "Billing software for a small business: when to buy it and when to build it",
    title: "Billing Software for Small Business: Buy or Build",
    description:
      "Billing software for a small business in India: when ready-made GST billing is the right call, and when a small custom tool is worth building.",
    answer:
      "Most small shops should buy ready-made GST billing software, because it already handles invoice numbering, tax splits and reports. Build custom billing only when your pricing or workflow does not fit a standard product: price by slab or weight, subscriptions, several branches, or invoices that must feed your own app.",
    intro: [
      "Billing is a place where building your own is usually a mistake. This page says so first, then covers the cases where a small custom tool earns its cost.",
    ],
    forYou: [
      "Your pricing or invoicing does not fit the standard shop or service template.",
      "You want billing connected to your own app, bookings or stock, with no double entry.",
      "You are currently copying figures between a billing app and a spreadsheet.",
    ],
    notForYou: [
      "You run a standard shop with a standard invoice. Buy a ready-made product and spend the money elsewhere.",
      "You want a full accounting system with ledgers and audits. That belongs to an accountant's software.",
    ],
    v1Heading: "What a small custom billing tool contains",
    v1: [
      "Customers and items, with the pricing rules that your business actually uses.",
      "Invoices numbered in a continuous series, in the layout your accountant gave you.",
      "Payment tracking: paid, part-paid and overdue, with reminders.",
      "An export your accountant can use at month end and year end.",
      "Roles: who can create, edit and cancel an invoice, with a record of changes.",
    ],
    later: [
      "Multiple branches with consolidated reports.",
      "A customer portal where people see their own invoices.",
      "Integration with an accounting package.",
    ],
    sections: [
      {
        h2: "When to just buy it",
        body: [
          "Ready-made billing products for Indian small businesses are mature and cheap. If your invoices are standard line items with standard tax, one of them will do it and keep up with rule changes that a custom tool would have to follow by hand. I will say so on the first call.",
        ],
      },
      {
        h2: "When a custom tool is worth it",
        body: ["The reasons to build are specific, and most of them are about connecting billing to something else."],
        bullets: [
          "Price depends on weight, slabs, time or a customer's agreement.",
          "Billing must happen automatically from bookings, subscriptions or deliveries.",
          "You need a workflow with approvals before an invoice is issued.",
          "You want invoices, stock and customers in one place that you control.",
        ],
      },
      {
        h2: "Taxes and invoice format",
        body: [
          "GST rules and invoice requirements change. I build to the invoice format and tax treatment that your accountant gives me, and ask them to sign off the sample before it is used. I do not give tax advice.",
        ],
      },
      {
        h2: "Money data deserves care",
        body: [
          "Invoices and payments are the records you are required to keep. The tool should never delete one silently, should log who changed what, and should back up daily. Those are the defaults in my hosted plans.",
        ],
      },
    ],
    offers: ["hosted-starter", "hosted-growth"],
    offerNote:
      "Invoicing for one business is the standard example of a Starter plan tool. If it feeds a customer portal or WhatsApp, the Growth plan applies.",
    proof: [
      { label: "Small-business tools", href: "/solutions/small-business/", note: "Invoicing and payment tracking as a hosted tool, with the prices." },
      { label: "Sable", href: "/products/sable/", note: "A local-first AI financial agent that runs against a local database with no backend." },
    ],
    honest:
      "I have not built a full GST billing product, and I will not claim to compete with the established ones. I build the small tool that sits around your particular pricing or workflow.",
    faq: [
      {
        question: "Which is the best billing software for a small business in India?",
        answer:
          "For a standard shop with a standard invoice, a ready-made GST billing product is the right choice, and several are mature and inexpensive. I only build custom billing where your pricing or workflow does not fit one, or where billing must connect to your own app.",
      },
      {
        question: "How much does a custom billing tool cost?",
        answer:
          "A single tool for one business fits the Starter plan: setup from ₹15,000 and ₹800 a month, including hosting, backups and small changes. If it connects to a customer portal or payments, the Growth plan applies.",
      },
      {
        question: "Can it produce GST invoices?",
        answer:
          "I build to the format your accountant approves, with a continuous invoice series and the tax split they specify. Rules change, so the format is reviewed with your accountant before it goes live.",
      },
      {
        question: "What if I want to leave?",
        answer:
          "You can cancel any month, and your data is exported in a standard format within seven days at no charge.",
      },
    ],
    related: ["app-development-cost-india", "ecommerce-website-development-india", "clinic-management-software"],
    interest: "Hosted tool subscription (small business)",
    placeholder: "How you price and invoice today, how many invoices a month, and what you copy by hand…",
  },

  {
    slug: "clinic-management-software",
    releaseOn: "2026-11-13",
    keyword: "clinic management software",
    eyebrow: "Clinics · appointments · records",
    h1: "Clinic appointment and records software, built around how your clinic works",
    title: "Clinic Management Software and Appointment Booking",
    description:
      "Clinic management software and appointment booking for small clinics in India: bookings without double-booking, patient records and billing.",
    answer:
      "A small clinic needs four things from software: appointments that cannot be double-booked, a patient record that only the right staff can see, simple billing, and reminders that reduce no-shows. Ready-made clinic products cover this well for many clinics. A custom tool makes sense when your workflow differs from the standard one.",
    intro: [
      "Several ready-made clinic management products exist, and for many clinics one of them is the right answer. This page is for clinics whose workflow does not fit one: unusual scheduling, several practitioners with different rules, or a need to connect to an app or system they already use.",
    ],
    forYou: [
      "You run a clinic or small group practice with its own scheduling rules.",
      "You want bookings, records and billing connected, without paying for modules you will not use.",
      "You want patient reminders by WhatsApp or SMS.",
    ],
    notForYou: [
      "You need a hospital-scale system with pharmacy, lab and insurance claims. That is a different category.",
      "You want clinical decision support or anything that advises on treatment. I do not build that.",
    ],
    v1Heading: "What a first version contains",
    v1: [
      "A booking page where patients pick a doctor and a free slot, and a calendar the front desk can edit.",
      "Slots that block when taken, with rules for visit length and breaks per practitioner.",
      "A patient record with visit notes, visible only to the roles you set.",
      "Simple billing for consultations and procedures, with a receipt.",
      "Reminders before the appointment, and a way to reschedule from the message.",
    ],
    later: [
      "Prescription templates.",
      "A patient portal.",
      "Integration with a lab or pharmacy.",
    ],
    sections: [
      {
        h2: "Appointments without double-booking",
        body: [
          "The core of a booking system is a rule the database enforces: one practitioner, one slot, one patient. Doing that check in the screen alone fails when two people click at once. It has to be a constraint in the data itself, with a clear message to the second person.",
          "I wrote up a clinical workflow API where the problem was query speed as data grew, and the fix came from reordering the work against measured numbers, not from buying a bigger server.",
        ],
      },
      {
        h2: "Patient records: who sees what",
        body: ["Health information is sensitive, so the defaults should be strict."],
        bullets: [
          "Role-based access: reception sees the schedule and billing, doctors see records.",
          "A log of who opened or changed a record.",
          "Daily backups and an export you can take with you.",
          "No patient data in screenshots, logs or test environments.",
        ],
      },
      {
        h2: "Buy or build",
        body: [
          "If a ready-made product covers your clinic, use it. If you find yourself working around it every day, a small custom tool built on your own rules can be cheaper over a year than the modules you do not need. The architecture review exists to answer that before anyone builds.",
        ],
      },
    ],
    offers: ["hosted-growth", "review", "custom-build"],
    offerNote:
      "A booking page with records and billing for one clinic fits the Growth plan. A multi-location setup is a fixed-scope build, and the architecture review is a good first step.",
    proof: [
      { label: "Hospital-API case study", href: "/blog/optimizing-mongodb-aggregation/", note: "A clinical workflow API where the slow query was fixed by reordering, not by more hardware." },
      { label: "Small-business bookings", href: "/solutions/small-business/", note: "Booking pages with slots that cannot double-book." },
    ],
    honest:
      "I have built the API behind a hospital workflow, not a complete clinic product used by a clinic every day. I am not a medical-software vendor and do not build clinical decision support.",
    faq: [
      {
        question: "How much does clinic software cost?",
        answer:
          "For one clinic, the Growth plan covers a booking page, records and billing: setup from ₹40,000 and ₹2,500 a month. Several locations or custom workflows are a fixed-scope build from ₹2,00,000, and an architecture review (₹25,000 to ₹75,000) is a sensible first step.",
      },
      {
        question: "Can patients book appointments online?",
        answer:
          "Yes. Patients pick a doctor and a free slot, and the slot is blocked as soon as it is taken, so two people cannot book the same time.",
      },
      {
        question: "Is patient data safe?",
        answer:
          "Access is by role, changes are logged, backups run daily and you can export your data at any time. No software removes every risk, so choose what you store and who can see it.",
      },
      {
        question: "Can it send appointment reminders?",
        answer:
          "Yes, by WhatsApp or SMS, with a way for the patient to reschedule from the message.",
      },
    ],
    related: ["billing-software-for-small-business", "hire-app-developer-india", "app-development-cost-india"],
    interest: "Hosted tool subscription (small business)",
    placeholder: "Number of doctors, how appointments are booked now, and what is hardest about your current setup…",
  },

  {
    slug: "ngo-website-development",
    releaseOn: "2026-11-13",
    keyword: "ngo website development",
    eyebrow: "NGOs · trusts · non-profits",
    h1: "A website for your NGO that earns trust, takes donations and is easy to update",
    title: "NGO Website Development in India",
    description:
      "NGO website development in India: a clear story, transparent reporting, donations with proper receipts and volunteer sign-ups, easy for staff to update.",
    answer:
      "An NGO website has to answer four questions fast: who you are, what you have done, how donations are used, and how to help. Add a donation flow that issues receipts, a volunteer sign-up and a page staff can update without a developer, and make the site fast on a phone.",
    intro: [
      "Visitors to an NGO site are deciding whether to trust it. Funders, donors, volunteers and government officers each look for different proof. A site that makes the proof easy to find does more than one that looks impressive.",
    ],
    forYou: [
      "You run a registered NGO, trust or society that needs a credible online home.",
      "You want to collect donations and sign up volunteers online.",
      "Your staff are not technical and need to post updates themselves.",
    ],
    notForYou: [
      "You need a complex portal for beneficiaries with case management. That is a larger project, and I will scope it separately.",
      "You want to promise donors figures the organisation cannot back with records.",
    ],
    v1Heading: "What a first NGO website includes",
    v1: [
      "A first screen that says what you do, for whom and where.",
      "Registration details and contact information where a funder can find them.",
      "Programme pages with real photos and the outcomes you can document.",
      "A donation page with a receipt that includes the details your accountant needs.",
      "Volunteer and event sign-up forms that email the right person.",
      "An updates page that staff can add to without a developer.",
    ],
    later: [
      "Annual reports as searchable pages.",
      "Recurring donations.",
      "Multiple languages for the communities you serve.",
    ],
    sections: [
      {
        h2: "What donors and officials look for",
        body: ["Whoever is visiting, the same things build trust."],
        bullets: [
          "Who runs the organisation, with names and roles.",
          "Registration numbers and any tax-exemption status you hold, stated accurately.",
          "What was done last year, with numbers you can prove.",
          "How donations are used, in plain words.",
          "A real address and phone number that someone answers.",
        ],
      },
      {
        h2: "Donations and receipts",
        body: [
          "A payment link is the quickest start. An integrated donation page lets you collect donor details, send a receipt automatically and keep a record your accountant can use. If your NGO has tax-exemption registration, the receipt should carry what that registration requires. I build to the format your accountant gives me.",
        ],
      },
      {
        h2: "Updates without a developer",
        body: [
          "Staff should be able to post news, photos and event details from a phone. I add a simple editor for that, so the site stays current, which donors notice.",
        ],
      },
    ],
    offers: ["hosted-starter", "hosted-growth"],
    offerNote:
      "A clear NGO site with a donation page and sign-up forms fits the Starter or Growth plan, depending on whether you need donor accounts or integrations.",
    proof: [
      { label: "DefendIt", href: "https://campus.streamerosai.com/", note: "A content site with forms, downloads and tracked leads." },
      { label: "Hosted plans", href: "/solutions/small-business/", note: "What is included, and how to cancel any month." },
    ],
    honest:
      "I have not built a site for a registered NGO. The pieces it needs, clear pages, forms, payments and an editor, are ones I have built, and I will not claim past clients I do not have.",
    faq: [
      {
        question: "How much does an NGO website cost?",
        answer:
          "A clear site with a donation page and sign-up forms fits my hosted plans: setup from ₹15,000 and ₹800 a month for Starter, or setup from ₹40,000 and ₹2,500 a month for Growth. Larger portals are quoted as fixed-scope builds.",
      },
      {
        question: "Can we collect online donations?",
        answer:
          "Yes. I can set up a payment link or an integrated donation page that sends receipts. The receipt format follows your accountant's guidance and your registration.",
      },
      {
        question: "Can our staff update the site?",
        answer:
          "Yes. I add a simple editor for news, photos and events so non-technical staff can post from a phone.",
      },
      {
        question: "Will the site appear on Google?",
        answer:
          "It is built so Google can find and index it, with a sitemap and Search Console. Rankings depend on competition and time, and nobody can promise a position.",
      },
    ],
    related: ["freelance-website-developer", "app-development-cost-india", "billing-software-for-small-business"],
    interest: "Website build",
    placeholder: "What your NGO does, where, and what you most want the website to do: donations, volunteers, reporting…",
  },

  {
    slug: "taxi-booking-app-development",
    releaseOn: "2026-11-13",
    keyword: "taxi booking app development",
    eyebrow: "Cab · taxi · fleet apps",
    h1: "A taxi or cab booking app for a fleet or a city, scoped to launch",
    title: "Taxi Booking App Development: Scope a Launch",
    description:
      "Taxi booking app development: rider app, driver app and dispatch panel scoped for one fleet or one city. What an MVP includes and what it cannot do.",
    answer:
      "A taxi booking app is three products: a rider app, a driver app and a dispatch panel for you. A launch version for one fleet or one city covers booking, driver assignment, fare calculation, live status and payment. It does not cover a city-scale marketplace, and a first step is a written design before any building.",
    intro: [
      "People who search for taxi app development are usually a fleet owner, a travel operator or a founder. They want to know what is realistic for a first version. This page answers that, including what is not.",
    ],
    forYou: [
      "You own or manage a fleet and want your own booking channel.",
      "You run outstation or corporate cabs and need dispatch, not just a booking page.",
      "You are a founder testing one city before raising money for more.",
    ],
    notForYou: [
      "You expect to match the scale of the large ride apps with a first version. That scale takes a team and years.",
      "You have no drivers or vehicles lined up. An app does not create supply.",
    ],
    v1Heading: "What a launch version includes",
    v1: [
      "A rider app or web app: pickup, drop, fare estimate, book, track.",
      "A driver app: accept or decline, navigate, mark picked up and dropped.",
      "A dispatch panel for you: see all trips, assign manually when needed, handle cancellations.",
      "Fare rules that you define: base, per kilometre, waiting, night rates.",
      "Payment by UPI or cash, with a trip receipt.",
    ],
    later: [
      "Automatic driver matching at scale.",
      "Surge pricing.",
      "Driver payouts and wallets.",
      "Multiple cities.",
    ],
    sections: [
      {
        h2: "Three products, not one",
        body: [
          "The rider wants a fast booking and a reliable ETA. The driver wants clear trips and fair pay. The operator wants to see everything and fix problems. Each needs its own screens, which is why this is one of the larger app types and why scoping it first matters.",
        ],
      },
      {
        h2: "The hard parts",
        body: ["These are where the effort goes, and why a quote that skips them is wrong."],
        bullets: [
          "Live location from the driver's phone, battery and network included.",
          "Matching a rider to a nearby driver and handling the decline.",
          "Fare calculation that is predictable and explainable.",
          "Payments, cancellations and refunds in every combination.",
          "What happens when a phone loses signal mid-trip.",
        ],
      },
      {
        h2: "Start with a design, not a build",
        body: [
          "For an app this size I recommend the architecture review first: a written design, a cost and timeline range, and a plan for the launch scope. It is yours whoever builds the app. If the plan says to start with manual dispatch and a simple booking page, you will have spent little to find that out.",
        ],
      },
    ],
    offers: ["review", "custom-build"],
    offerNote:
      "The architecture review comes first for this type of app. A launch build is then a fixed-scope project, and a smaller dispatch-only tool can start as a hosted plan.",
    proof: [
      { label: "Real-time architecture write-up", href: "/blog/real-time-telemetry-websockets-react/", note: "Pushing live state to every screen at once." },
      { label: "SpotAI", href: "/products/spotai/", note: "A two-sided mobile app shipped by one engineer." },
    ],
    honest:
      "I have not built a taxi or ride-hailing product. The real-time updates and two-sided app structure are things I have built elsewhere, and I would not promise a ride network, only a launch version you can test on real trips.",
    faq: [
      {
        question: "How much does a taxi app cost?",
        answer:
          "It is one of the larger app types. I recommend a written design first (architecture review, ₹25,000 to ₹75,000, 1 to 2 weeks), then a fixed-scope build, which runs from ₹2,00,000 depending on scope. The review tells you where in that range your launch version sits.",
      },
      {
        question: "Can I build a taxi app like the big ride apps?",
        answer:
          "Not at their scale with a first version. A launch version for one fleet or one city is realistic. Scale comes from supply, operations and years of work, not only from software.",
      },
      {
        question: "Do I need separate apps for riders and drivers?",
        answer:
          "Usually yes: the driver needs background location and trip controls the rider does not. The rider side can start as a web app. A dispatch panel for you sits alongside both.",
      },
      {
        question: "How long does it take?",
        answer:
          "The design takes 1 to 2 weeks. A launch build runs 4 to 12 weeks depending on scope, with a working version on real phones each week.",
      },
    ],
    related: ["food-delivery-app-development", "hire-app-developer-india", "app-development-cost-india"],
    interest: "Architecture review / advisory",
    placeholder: "Fleet size or city, whether you already have drivers, and what you want riders and drivers to be able to do…",
  },
];

/* ---- release gating, the same rule the blog uses ---------------------------------- */
function liveCutoff(): string {
  return process.env.POSTS_NOW?.slice(0, 10) || new Date().toISOString().slice(0, 10);
}

export function isUseCaseLive(u: UseCase): boolean {
  return u.releaseOn <= liveCutoff();
}

/** Only pages whose release day has come. Unreleased pages are not built, listed or in the sitemap. */
export function getLiveUseCases(): UseCase[] {
  return USE_CASES.filter(isUseCaseLive);
}

export function getUseCase(slug: string): UseCase | undefined {
  return getLiveUseCases().find((u) => u.slug === slug);
}

export function caseUrl(slug: string): string {
  return `/solutions/${slug}/`;
}
