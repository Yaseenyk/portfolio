import type { BlogPost } from "@/lib/blog";
import Terminal from "@/components/blog/Terminal";

function Body() {
  return (
    <>
      <p>
        On a clinical workflow API, an aggregation pipeline that had always felt
        instant started to crawl — same query, same result, just more data
        flowing through it before anything got filtered out. That is the whole
        game with MongoDB aggregation: identical logical output can vary by orders
        of magnitude depending on stage order and index usage, and tightening
        these pipelines is where the real speedup lives — no bigger instance required.
      </p>

      <h2>Filter early, filter on indexes</h2>
      <p>
        The single most important rule: put <code>$match</code> first, and match
        on indexed fields. Every document you eliminate at stage one is a document
        the rest of the pipeline never touches. A pipeline that sorts or joins
        before filtering is doing expensive work on rows it is about to throw
        away — the database equivalent of cleaning a house before deciding to
        demolish it.
      </p>

      <Terminal title="pipeline.ts">
        <span className="tok-com">{"// $match first, on an indexed field — shrink the set early"}</span>
        {`
const rows = await Visits.aggregate([
  { $match: { clinicId, status: "active" } },   // indexed, runs first
  { $sort: { scheduledAt: -1 } },               // on the small set
  { $lookup: { from: "patients", localField: "patientId",
               foreignField: "_id", as: "patient" } },
  { $limit: 50 },
]);`}
      </Terminal>

      <h2>$lookup is a join — treat it like one</h2>
      <p>
        <code>$lookup</code> is the most expensive stage in most pipelines because
        it is a join, and joins multiply work. Run it as late as possible — after
        matching and limiting — so you join against dozens of documents, not
        thousands. And ensure the foreign field is indexed, or each lookup
        degrades into a collection scan repeated once per input document.
      </p>

      <h2>Profile with explain</h2>
      <p>
        Guesswork has no place here. Run the pipeline through{" "}
        <code>explain(&quot;executionStats&quot;)</code> and read what actually
        happened: which stages used an index, how many documents each examined
        versus returned, and where the time went. The speedup came from reading
        those numbers and reordering stages — not from intuition about what
        &quot;should&quot; be fast.
      </p>

      <blockquote>
        An aggregation pipeline is read top to bottom but should be designed
        bottom-up: decide the smallest set you can get away with, then make sure
        every stage operates only on it.
      </blockquote>

      <p>
        The production system is the{" "}
        <a href="/#projects">Hospital-API</a>; for the vector side of querying,
        see{" "}
        
          Vector Embeddings in Production
        
        . Pipelines like these are the unglamorous backend work behind the five
        products I shipped solo this year — the judgment I bring is knowing the
        fastest query is usually a reordering problem, not a bigger box.
      </p>
    </>
  );
}

export const optimizingMongoAggregation: BlogPost = {
  slug: "optimizing-mongodb-aggregation",
  title: "MongoDB Aggregation Pipelines: Stage Order Is the Win",
  description:
    "Profiling a clinical API taught me MongoDB aggregation pipeline optimization lives or dies on stage order: $match first on indexes, $lookup join performance, then explain.",
  keywords: [
    "MongoDB aggregation",
    "MongoDB aggregation pipeline optimization",
    "MongoDB join performance",
    "query optimization",
    "$lookup",
    "explain",
    "database performance",
    "MongoDB performance engineer",
    "MERN developer for hire",
    "Yaseen Khatib",
  ],
  publishedAt: "2026-06-11",
  updatedAt: "2026-07-30",
  readingMinutes: 7,
  author: { name: "Yaseen Khatib", role: "MERN + AI Architect" },
  tags: ["MongoDB", "Performance", "Backend"],
  takeaways: [
    "Put $match first and on indexed fields — every document eliminated early is one the rest of the pipeline never touches.",
    "$lookup is a join: run it late (after match/limit) and index the foreign field, or it degrades to repeated scans.",
    "Profile with explain('executionStats') and reorder by the real numbers, not intuition.",
    "Design pipelines bottom-up: find the smallest set, then ensure every stage operates only on it.",
  ],
  Body,
};
