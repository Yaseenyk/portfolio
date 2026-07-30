import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";

export const meta: GuideMeta = {
  slug: "how-to-deploy-your-final-year-project-free",
  title: "How To Deploy Your Final Year Project For Free (Live In The Viva)",
  h1: "How to deploy your final year project for free",
  description:
    "Get your final year project live on a real URL for free — frontend on Vercel or Netlify, backend on Render, MongoDB Atlas, secrets done right, and a localhost fallback if the wifi dies.",
  tldr: "You can deploy a final year project for free by putting the database on MongoDB Atlas, the backend on Render or Railway, and the frontend on Vercel, Netlify or GitHub Pages, wired together with environment variables and CORS. Free backends cold-start after inactivity, so open your link a few minutes before the viva and keep a localhost fallback.",
  category: "Deployment",
  publishedAt: "2026-07-27",
  readingMinutes: 10,
  ogImage: "/og/campus/cat-web.jpg",
  howTo: {
    totalTime: "PT2H",
    steps: [
      {
        name: "Put the database on MongoDB Atlas",
        text: "Create a free M0 shared cluster on MongoDB Atlas, add a database user, allow access from anywhere for the demo, and copy the connection string.",
      },
      {
        name: "Deploy the backend on Render or Railway",
        text: "Push your Node/Express or Python/FastAPI API to GitHub, create a free web service on Render, set the build and start commands, and add your secrets as environment variables.",
      },
      {
        name: "Deploy the frontend on Vercel, Netlify or GitHub Pages",
        text: "Import the repo into Vercel or Netlify, set the API base URL as an environment variable, and deploy — static-only sites can also go on GitHub Pages.",
      },
      {
        name: "Wire the frontend to the backend with CORS and env vars",
        text: "Point the frontend at the live backend URL through an environment variable, and enable CORS on the backend for your frontend origin so the browser stops blocking requests.",
      },
      {
        name: "Handle secrets and environment variables properly",
        text: "Keep keys in each platform's environment settings and a gitignored .env locally, never in the repo, and commit a .env.example listing the names only.",
      },
      {
        name: "Test the live URL like a stranger would",
        text: "Open the deployed link on your phone on mobile data, run the core flows, and check that a cold-started free backend has woken up before the viva.",
      },
      {
        name: "Prepare a localhost fallback for when the wifi fails",
        text: "Keep the project running locally, record a short screen capture of every flow, and have a seeded local database ready so a network failure never stops your demo.",
      },
    ],
  },
  faq: [
    {
      question: "Will a free Render backend stay online during my viva?",
      answer:
        "Free web services on Render spin down after about 15 minutes of inactivity and take roughly 30 to 60 seconds to wake on the next request. That cold start is the classic viva failure — the panel opens your link and it hangs. The fix is simple: open your own site a couple of minutes before you present so the service is already awake, and never rely on the very first request happening in front of the panel.",
    },
    {
      question: "Is the MongoDB Atlas free tier enough for a final year project?",
      answer:
        "Yes. The Atlas M0 shared cluster is free forever and gives you 512 MB of storage, which is far more than any demo project needs. It is a real, cloud-hosted database on a live URL — exactly what a panel expects to see. The only limits you might notice are shared performance and no automated backups, neither of which matters for a project demo.",
    },
    {
      question: "Do I still need to deploy if I can demo on localhost?",
      answer:
        "Deploy anyway. A live URL the panel can open on their own phone is far more convincing than localhost, and it proves you understand hosting, environment variables and CORS — all common viva questions. But always keep the localhost version working as a fallback: college wifi fails often enough that a recorded demo and a seeded local database are non-negotiable insurance.",
    },
  ],
};

export function Body() {
  return (
    <>
      <p>
        &ldquo;It works on my laptop&rdquo; is not a demo. A project on a live URL
        that the panel can open on their own phone reads as finished and
        professional; a project that only runs from your terminal reads as a
        prototype. Deploying also answers a whole category of viva questions —
        hosting, environment variables, CORS — before they are even asked.
      </p>
      <p>
        All of this is genuinely free. The tiers below exist and cost nothing for a
        project of demo size. Follow the steps in order — database first, then
        backend, then frontend — because each one needs the URL of the one before
        it.
      </p>

      <h2>1. Put the database on MongoDB Atlas</h2>
      <p>
        Your database has to live in the cloud too, or the deployed backend has
        nothing to talk to. The Atlas free tier is the standard answer.
      </p>
      <ul>
        <li>
          Create a free <strong>M0 shared cluster</strong> — free forever, 512 MB,
          more than enough for a demo.
        </li>
        <li>
          Add a database user with a password, and note both — this becomes part of
          your connection string.
        </li>
        <li>
          Under Network Access, allow <code>0.0.0.0/0</code> for the demo so your
          hosted backend can reach it from any IP.
        </li>
        <li>Copy the connection string; it goes into the backend as a secret next.</li>
      </ul>
      <p>
        For SQL projects the equivalents are the free tiers of{" "}
        <strong>Neon</strong> or <strong>Supabase</strong> (Postgres) — same idea,
        a cloud database on a URL.
      </p>

      <h2>2. Deploy the backend on Render or Railway</h2>
      <p>
        Your Node/Express or Python/FastAPI API needs a home. Render&rsquo;s free
        web service is the most common choice; Railway is a fine alternative.
      </p>
      <ul>
        <li>Push the backend to GitHub — the platform deploys straight from the repo.</li>
        <li>
          Create a new <strong>Web Service</strong>, connect the repo, and set the
          build command (<code>npm install</code> or <code>pip install -r
          requirements.txt</code>) and start command (<code>node server.js</code>,{" "}
          <code>npm start</code>, or <code>uvicorn main:app --host 0.0.0.0 --port
          $PORT</code>).
        </li>
        <li>
          Read the port from the platform&rsquo;s <code>PORT</code> environment
          variable, not a hardcoded 5000 — this is the most common reason a deploy
          builds but never responds.
        </li>
        <li>
          Add your Atlas connection string and any keys as environment variables in
          the service settings.
        </li>
      </ul>
      <p>
        Know the trade-off: free Render services sleep after about 15 minutes idle
        and take 30 to 60 seconds to wake. Plan around it — step six covers this.
      </p>

      <h2>3. Deploy the frontend on Vercel, Netlify or GitHub Pages</h2>
      <p>
        The user-facing app goes on a static/frontend host. All three below have
        real free tiers.
      </p>
      <ul>
        <li>
          <strong>Vercel</strong> — best for Next.js and React. Import the repo, it
          detects the framework, and deploys on every push.
        </li>
        <li>
          <strong>Netlify</strong> — great for React, Vue and plain static sites;
          set the build command and publish directory.
        </li>
        <li>
          <strong>GitHub Pages</strong> — free and simple for a purely static
          frontend with no server-rendered pages.
        </li>
      </ul>
      <p>
        Set your live backend URL as an environment variable here (for example{" "}
        <code>VITE_API_URL</code> or <code>NEXT_PUBLIC_API_URL</code>) rather than
        hardcoding <code>localhost</code> anywhere in the frontend.
      </p>

      <h2>4. Wire the frontend to the backend with CORS and env vars</h2>
      <p>
        This is where most first deploys break: the site loads, but every request
        fails. Two fixes, always both.
      </p>
      <ul>
        <li>
          Point the frontend at the deployed backend URL through the environment
          variable from step three — not <code>http://localhost:5000</code>.
        </li>
        <li>
          Enable <strong>CORS</strong> on the backend for your frontend&rsquo;s
          origin, or the browser blocks the response even though the API worked.
        </li>
        <li>
          Test in an incognito window; a cached old build hides whether the fix
          actually took.
        </li>
      </ul>

      <h2>5. Handle secrets and environment variables properly</h2>
      <p>
        Panels do ask where your keys live, and a repo with a database password in
        it is a real mark loss.
      </p>
      <ul>
        <li>
          Keep secrets in each platform&rsquo;s <strong>environment variables</strong>{" "}
          settings — Atlas string, API keys, JWT secret.
        </li>
        <li>
          Locally, keep a <code>.env</code> file that is in <code>.gitignore</code>{" "}
          — never committed.
        </li>
        <li>
          Commit a <code>.env.example</code> listing the variable{" "}
          <em>names</em> only, so anyone (including the panel) can see what is
          needed without seeing the values.
        </li>
      </ul>

      <h2>6. Test the live URL like a stranger would</h2>
      <p>
        You know the happy path; the panel does not. Test the way they will.
      </p>
      <ul>
        <li>
          Open the deployed link on your <strong>phone, on mobile data</strong> —
          not your laptop on college wifi with everything cached.
        </li>
        <li>Run every core flow: sign up, log in, create, read, update, delete.</li>
        <li>
          If the backend is on a free tier, hit it a couple of minutes early so the
          cold start happens before the panel is watching, not during.
        </li>
      </ul>

      <h2>7. Prepare a localhost fallback for when the wifi fails</h2>
      <p>
        College wifi fails often enough that you must assume it will. A live deploy
        is the goal, not the only plan.
      </p>
      <ul>
        <li>
          Keep the project <strong>running locally</strong> with a seeded database,
          ready to launch offline.
        </li>
        <li>
          Record a <strong>short screen capture</strong> of every flow working, so
          a dead network never means a dead demo.
        </li>
        <li>
          Have the deployed URL, the local build, and the video — three layers, so
          no single failure sinks the viva.
        </li>
      </ul>

      <hr />

      <p>
        Every project on this site ships deployed on a real URL, with secrets done
        properly and the localhost fallback ready — because getting it live is
        exactly the step students run out of time for. See a{" "}
        <Link href="/final-year-projects/ecommerce-mern">MERN e-commerce build</Link>{" "}
        or a{" "}
        <Link href="/final-year-projects/realtime-chat-mern">real-time chat app</Link>
        , or if you want it done for you — built, documented, deployed, and walked
        through in live sessions — start on the{" "}
        <Link href="/final-year-projects/custom">custom build</Link> page. Deploying
        first? Read{" "}
        <Link href="/final-year-projects/guides/final-year-project-report-format">
          the report format guide
        </Link>{" "}
        so the document matches what you shipped.
      </p>
    </>
  );
}
