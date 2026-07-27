// Question bank for /final-year-projects/question-bank.
// Distinct from the viva guide: the guide explains how vivas work, this is the
// drilling surface. Every entry carries what the examiner is really testing,
// because the follow-up is always aimed at that rather than the literal question.

export type VivaCategory =
  | "Running it"
  | "Design decisions"
  | "Database"
  | "Security"
  | "Failure handling"
  | "Your code"
  | "Machine learning"
  | "Frontend"
  | "Testing"
  | "Closing";

export type ProjectKind = "Any" | "Web" | "ML" | "Mobile" | "Vision" | "Realtime";

export interface VivaQuestion {
  id: string;
  q: string;
  /** What the examiner is actually testing — this drives the follow-up. */
  why: string;
  category: VivaCategory;
  kind: ProjectKind;
}

export const VIVA_QUESTIONS: VivaQuestion[] = [
  // Running it
  { id: "r1", q: "Show me the project running — not the presentation.", why: "Whether it runs at all outside a screenshot.", category: "Running it", kind: "Any" },
  { id: "r2", q: "Can you set this up from scratch on this machine right now?", why: "Whether you have ever installed it yourself.", category: "Running it", kind: "Any" },
  { id: "r3", q: "What are your dependencies, and why those versions?", why: "Whether you chose them or copied a requirements file.", category: "Running it", kind: "Any" },
  { id: "r4", q: "Where is this deployed, and how did you deploy it?", why: "Whether the project has ever left your laptop.", category: "Running it", kind: "Any" },
  { id: "r5", q: "How long does a cold start take, and why?", why: "Whether you have observed your own system's behaviour.", category: "Running it", kind: "Any" },
  { id: "r6", q: "Open the database and show me a real record.", why: "Whether the data is real or hardcoded for the demo.", category: "Running it", kind: "Any" },

  // Design decisions
  { id: "d1", q: "Why this database, and not the other kind?", why: "Whether you can name the alternative you rejected.", category: "Design decisions", kind: "Any" },
  { id: "d2", q: "Why this framework? What would break with a different one?", why: "Whether the choice was reasoned or inherited from a tutorial.", category: "Design decisions", kind: "Any" },
  { id: "d3", q: "Where is your business logic — frontend or backend? Why there?", why: "Whether you understand trust boundaries.", category: "Design decisions", kind: "Web" },
  { id: "d4", q: "Why is this a separate module instead of one file?", why: "Whether the structure was designed or accreted.", category: "Design decisions", kind: "Any" },
  { id: "d5", q: "What is the time complexity of this operation? Does it matter here?", why: "Whether you can distinguish theoretical cost from practical cost.", category: "Design decisions", kind: "Any" },
  { id: "d6", q: "What happens to this design at a hundred thousand records?", why: "Whether you thought past your seed data.", category: "Design decisions", kind: "Any" },
  { id: "d7", q: "Which part of this would you rewrite first, and why?", why: "Whether you can critique your own work.", category: "Design decisions", kind: "Any" },
  { id: "d8", q: "Why did you build this instead of using an existing tool?", why: "Whether you surveyed the field before starting.", category: "Design decisions", kind: "Any" },
  { id: "d9", q: "What is the single point of failure in this system?", why: "Whether you can reason about your own architecture.", category: "Design decisions", kind: "Any" },

  // Database
  { id: "db1", q: "Walk me through your ER diagram against the actual tables.", why: "Whether the report matches the code. This is the most common mismatch.", category: "Database", kind: "Any" },
  { id: "db2", q: "Is this schema normalised? To what form, and why stop there?", why: "Whether you know normalisation as a decision, not a definition.", category: "Database", kind: "Any" },
  { id: "db3", q: "Where did you denormalise deliberately, and what did it buy you?", why: "Whether you understand the trade-off both ways.", category: "Database", kind: "Any" },
  { id: "db4", q: "Which columns are indexed, and why those?", why: "Whether indexes were considered or defaulted.", category: "Database", kind: "Any" },
  { id: "db5", q: "What happens to related rows when this record is deleted?", why: "Whether referential integrity was designed.", category: "Database", kind: "Any" },
  { id: "db6", q: "Why is this a separate table rather than a column?", why: "Whether you understand one-to-many modelling.", category: "Database", kind: "Any" },
  { id: "db7", q: "Show me a query that would be slow, and explain why.", why: "Whether you can predict your own system's weak points.", category: "Database", kind: "Any" },
  { id: "db8", q: "How would you handle a schema change after this goes live?", why: "Whether you have thought about migrations at all.", category: "Database", kind: "Any" },

  // Security
  { id: "s1", q: "Where are passwords stored, and in what form?", why: "Whether hashing is understood or just mentioned.", category: "Security", kind: "Web" },
  { id: "s2", q: "Can I open this page without logging in? Try it.", why: "Whether auth is enforced server-side or only by hiding buttons.", category: "Security", kind: "Web" },
  { id: "s3", q: "What stops a normal user from calling an admin endpoint?", why: "Whether authorisation exists separately from authentication.", category: "Security", kind: "Web" },
  { id: "s4", q: "How is this protected against SQL injection?", why: "Whether queries are parameterised.", category: "Security", kind: "Web" },
  { id: "s5", q: "What is in your token, and what happens when it expires?", why: "Whether JWT was understood or copied.", category: "Security", kind: "Web" },
  { id: "s6", q: "Are your API keys in the repository? Show me.", why: "Whether secrets management was considered.", category: "Security", kind: "Any" },
  { id: "s7", q: "Can one user read another user's data by changing the URL?", why: "Object-level authorisation — very commonly missing.", category: "Security", kind: "Web" },
  { id: "s8", q: "What happens if I paste a script tag into this input?", why: "Whether output is escaped.", category: "Security", kind: "Web" },

  // Failure handling
  { id: "f1", q: "What happens if two users do this at exactly the same time?", why: "Race conditions. Almost nobody prepares for this.", category: "Failure handling", kind: "Any" },
  { id: "f2", q: "Enter a negative number here. Show me what happens.", why: "Whether input is validated at the boundary.", category: "Failure handling", kind: "Any" },
  { id: "f3", q: "What if the network drops halfway through this operation?", why: "Whether partial writes were considered.", category: "Failure handling", kind: "Any" },
  { id: "f4", q: "What does your app do when the external API is down?", why: "Whether third-party failure is handled.", category: "Failure handling", kind: "Any" },
  { id: "f5", q: "Upload a file in the wrong format. What happens?", why: "Whether parsing failures degrade gracefully.", category: "Failure handling", kind: "Any" },
  { id: "f6", q: "Submit this form empty.", why: "The cheapest possible test, and it fails surprisingly often.", category: "Failure handling", kind: "Web" },
  { id: "f7", q: "What is the largest input this handles before becoming unusable?", why: "Whether you have found your own limits.", category: "Failure handling", kind: "Any" },
  { id: "f8", q: "Where does this log errors, and who would read those logs?", why: "Whether the system is operable by anyone but you.", category: "Failure handling", kind: "Any" },

  // Your code
  { id: "c1", q: "Explain this function. What does it return, and who calls it?", why: "Whether you wrote it.", category: "Your code", kind: "Any" },
  { id: "c2", q: "What does this line do? Why is it necessary?", why: "Usually asked about the one line you copied.", category: "Your code", kind: "Any" },
  { id: "c3", q: "If I delete this line, what breaks?", why: "Whether you understand the dependency, not just the syntax.", category: "Your code", kind: "Any" },
  { id: "c4", q: "Trace what happens between clicking this button and the database changing.", why: "End-to-end comprehension across layers.", category: "Your code", kind: "Web" },
  { id: "c5", q: "Which part did you find hardest, and how did you get past it?", why: "Not small talk. Builders have a specific story; buyers do not.", category: "Your code", kind: "Any" },
  { id: "c6", q: "Show me a bug you fixed and explain what was wrong.", why: "Debugging is the clearest evidence of authorship.", category: "Your code", kind: "Any" },
  { id: "c7", q: "Why is this variable named this?", why: "Trivial-sounding, but reveals whether the code is yours.", category: "Your code", kind: "Any" },
  { id: "c8", q: "Which library does the real work here, and what did you write?", why: "Whether you can separate your contribution from the dependency.", category: "Your code", kind: "Any" },

  // Machine learning
  { id: "m1", q: "Where did your dataset come from, and how large is it?", why: "Data provenance. Often the weakest part of a student ML project.", category: "Machine learning", kind: "ML" },
  { id: "m2", q: "How did you split train and test? Why that split?", why: "Whether leakage was avoided.", category: "Machine learning", kind: "ML" },
  { id: "m3", q: "Your accuracy is high. Why is accuracy the wrong metric here?", why: "Class imbalance. The single most common ML viva trap.", category: "Machine learning", kind: "ML" },
  { id: "m4", q: "What is overfitting, and how do you know your model is not?", why: "Whether validation was understood or skipped.", category: "Machine learning", kind: "ML" },
  { id: "m5", q: "Show me a case where your model is wrong.", why: "Whether you evaluated your work or only celebrated it.", category: "Machine learning", kind: "ML" },
  { id: "m6", q: "Could you have solved this without machine learning?", why: "Whether ML was necessary or decorative.", category: "Machine learning", kind: "ML" },
  { id: "m7", q: "Explain your confusion matrix. Which error is worse here?", why: "Whether you understand cost asymmetry in your domain.", category: "Machine learning", kind: "ML" },
  { id: "m8", q: "What features did you engineer, and why those?", why: "Whether the pipeline was designed.", category: "Machine learning", kind: "ML" },
  { id: "m9", q: "How would you retrain this as new data arrives?", why: "Whether the model is a one-off artefact or a system.", category: "Machine learning", kind: "ML" },
  { id: "m10", q: "For an LLM project: how do you stop it inventing answers?", why: "Grounding. The defining question for any RAG project.", category: "Machine learning", kind: "ML" },
  { id: "m11", q: "What bias could exist in this dataset?", why: "Whether ethics was considered rather than recited.", category: "Machine learning", kind: "ML" },

  // Frontend
  { id: "fe1", q: "Does this work on a phone? Show me.", why: "Responsiveness is checked more often than students expect.", category: "Frontend", kind: "Web" },
  { id: "fe2", q: "What happens while data is loading?", why: "Whether loading and empty states exist.", category: "Frontend", kind: "Web" },
  { id: "fe3", q: "Can this be used with a keyboard alone?", why: "Basic accessibility.", category: "Frontend", kind: "Web" },
  { id: "fe4", q: "Where is this state stored, and why there?", why: "Whether state management was a decision.", category: "Frontend", kind: "Web" },
  { id: "fe5", q: "What does the user see when the request fails?", why: "Error surfacing, not just error catching.", category: "Frontend", kind: "Web" },

  // Realtime and mobile
  { id: "rt1", q: "Two users edit the same record at once. What happens?", why: "Conflict resolution.", category: "Failure handling", kind: "Realtime" },
  { id: "rt2", q: "What happens to a message sent to an offline user?", why: "Delivery guarantees.", category: "Failure handling", kind: "Realtime" },
  { id: "rt3", q: "How do you stop the same request being processed twice?", why: "Idempotency.", category: "Failure handling", kind: "Realtime" },
  { id: "mo1", q: "What happens with no network at all?", why: "Whether offline behaviour was designed.", category: "Failure handling", kind: "Mobile" },
  { id: "mo2", q: "Where is data stored on the device, and is it secure?", why: "Local storage security on mobile.", category: "Security", kind: "Mobile" },
  { id: "mo3", q: "What happens to a scheduled notification if the phone restarts?", why: "Platform behaviour beyond the happy path.", category: "Failure handling", kind: "Mobile" },
  { id: "vi1", q: "What is your detection threshold, and how did you choose it?", why: "Whether the number was tuned or copied.", category: "Design decisions", kind: "Vision" },
  { id: "vi2", q: "Show me it failing in poor lighting.", why: "Whether real-world limits were tested.", category: "Failure handling", kind: "Vision" },
  { id: "vi3", q: "Do you process every frame? What happens to the frame rate?", why: "Performance reasoning in a video pipeline.", category: "Design decisions", kind: "Vision" },
  { id: "vi4", q: "What does it do with a face it has never seen?", why: "Rejection versus nearest-match guessing.", category: "Failure handling", kind: "Vision" },

  // Testing
  { id: "t1", q: "How did you test this? Show me.", why: "Whether testing happened or was written up afterwards.", category: "Testing", kind: "Any" },
  { id: "t2", q: "Show me a test case that fails, and why that is correct.", why: "Whether negative cases were considered.", category: "Testing", kind: "Any" },
  { id: "t3", q: "Which part of this is least tested, and what worries you about it?", why: "Honest self-assessment. Answering well scores heavily.", category: "Testing", kind: "Any" },
  { id: "t4", q: "Did anyone other than you use this? What did they struggle with?", why: "Whether feedback was ever collected.", category: "Testing", kind: "Any" },

  // Closing
  { id: "z1", q: "What would you do differently if you started again?", why: "Reflective capacity. Have a specific answer ready.", category: "Closing", kind: "Any" },
  { id: "z2", q: "What would you add with another three months?", why: "Whether you can scope realistically.", category: "Closing", kind: "Any" },
  { id: "z3", q: "What did you learn that you did not expect to?", why: "Whether the process changed you.", category: "Closing", kind: "Any" },
  { id: "z4", q: "Who would actually use this, and would they pay for it?", why: "Whether the problem is real.", category: "Closing", kind: "Any" },
  { id: "z5", q: "What are the limitations of this system?", why: "Claiming none invites the panel to find them for you.", category: "Closing", kind: "Any" },
  { id: "z6", q: "How much of this did you write yourself?", why: "Asked directly more often than students expect. Prepare an honest answer.", category: "Closing", kind: "Any" },
];

export const VIVA_CATEGORIES: VivaCategory[] = [
  "Running it",
  "Design decisions",
  "Database",
  "Security",
  "Failure handling",
  "Your code",
  "Machine learning",
  "Frontend",
  "Testing",
  "Closing",
];

export const PROJECT_KINDS: ProjectKind[] = [
  "Any",
  "Web",
  "ML",
  "Mobile",
  "Vision",
  "Realtime",
];
