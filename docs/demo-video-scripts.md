# Demo video scripts — final year projects

One video per listing. The video is the proof asset the listing pages are
missing: it feeds the project page, YouTube, Reels/Shorts, the WhatsApp share
preview, and the OG image (grab a frame).

Target: **5–7 minutes**, screen recording with voiceover. No face cam needed.

## Rules that apply to every video

1. **First 5 seconds show the app running.** No logo, no "hi guys", no intro
   music. A student deciding whether to keep watching has already decided by
   second 6.
2. **Show failure, not just success.** Every video has one beat where something
   is deliberately done wrong and the app handles it. That single beat is what
   separates this from every other project demo on YouTube.
3. **Say the price and the session structure once**, near the end, plainly. Do
   not pitch through the whole video.
4. **Never claim marks, placement, or a guarantee.** Show the system; let it
   argue for itself.
5. **Record at 1920×1080**, browser zoom 110–125% so code is readable on a
   phone. Most of the audience is watching on a phone.
6. **Grab one clean frame per video** for `public/og/<slug>.jpg` and the
   listing hero.

### Per-video deliverables

- 1 long video (5–7 min) → YouTube, listing page
- 3 Shorts/Reels cutdowns (30–45s each) → the cutdowns are specified per script
- 1 still frame → OG image
- 4–6 screenshots → listing page gallery

### YouTube title / description pattern

```
Title:  <Course> Final Year Project | <What it does> using <Stack> | Full Demo
Desc:   First line = what it does + stack. Second line = link to the listing.
        Then timestamps. Then the session/installment line.
Tags:   final year project, <course> project, <stack>, <domain>
```

---

## 1. AI College Assistant — Agentic RAG

**Slug:** `ai-college-assistant` · **Target query:** "MCA final year project AI",
"RAG project with source code"

**Before recording:** corpus loaded with 3–4 real-looking college PDFs
(syllabus, exam rules, fee circular). One question prepared that the corpus
*cannot* answer.

| Beat | On screen | Say |
| --- | --- | --- |
| 0:00 | Chat UI, type a syllabus question, answer streams in with a citation chip | "This answers from my college's own PDFs. And it tells you which page it got that from." |
| 0:20 | Click the citation, source PDF opens at that page | "That's the difference between this and a ChatGPT wrapper. Every answer is traceable." |
| 0:45 | Architecture diagram | "Four pieces. Documents go in, get chunked and embedded, get stored in a vector database, and at query time we retrieve first and answer second." |
| 1:15 | Upload a new PDF, show it indexing | "Ingestion. It parses the PDF, splits it into chunks, and each chunk becomes a vector." |
| 2:00 | Code: chunking function | "Chunk size matters. Too small and you lose context, too large and retrieval gets noisy. This is the trade-off your examiner will ask about." |
| 3:00 | Code: retrieval + similarity threshold | "Top-k retrieval with a similarity floor. If nothing clears the floor, we don't answer." |
| 3:45 | **Failure beat** — ask the unanswerable question, app says it doesn't know | "This is the part that matters. It didn't invent an answer. Most student chatbots do." |
| 4:30 | Code: the grounding prompt | "That behaviour isn't luck. The prompt forces it to answer only from retrieved context." |
| 5:15 | Admin panel, question logs | "Admin side — manage the corpus, see what students actually asked." |
| 6:00 | Listing page | "Full source, report, and eight live sessions where we go through this line by line. Details and pricing on the page linked below." |

**Shorts cutdowns**
1. The citation click — "Your college chatbot should be able to prove it" (0:00–0:35)
2. The refusal — "Watch it say 'I don't know' instead of making something up" (3:45–4:15)
3. Chunking explained in 40 seconds with the diagram

---

## 2. Hospital Management System (MERN)

**Slug:** `hospital-management-mern` · **Target query:** "hospital management
system project MERN", "BCA final year project source code"

**Before recording:** seeded with ~8 doctors, ~20 patients, a partly-booked
schedule. Have three browser profiles open — patient, doctor, admin.

| Beat | On screen | Say |
| --- | --- | --- |
| 0:00 | Book an appointment as patient, confirmation appears | "Three portals, one login, and appointments that actually check for conflicts." |
| 0:25 | Same slot, different patient — **failure beat**, rejected with a real message | "Most versions of this project overwrite the booking. This one refuses it. That's a five-mark question." |
| 1:00 | ER diagram next to the live Mongo collections | "Six collections. Let me show you why it's six and not one big document." |
| 1:45 | Code: the schema | "References, not embedded documents, because a patient's history grows unbounded." |
| 2:30 | Log in as doctor, write a prescription | "Doctor portal. Prescription is written against a visit, so history stays queryable." |
| 3:15 | Code: JWT issue + role middleware | "Auth. Password hashed, token issued, and every route behind a role guard. Try hitting the admin route as a patient." |
| 3:45 | **Failure beat 2** — patient token on admin route, 403 | "Blocked at the middleware, not in the UI. Hiding a button is not security." |
| 4:15 | Admin dashboard, billing, printable invoice | "Admin side and billing. Invoice is generated from the visit, not typed in." |
| 5:00 | Deployed URL on phone | "Running live, not just on localhost." |
| 5:30 | Listing page | "Source, report, diagrams, and seven sessions covering schema and auth. Link below." |

**Shorts cutdowns**
1. The double-booking rejection (0:25–1:00)
2. The 403 on the admin route — "Hiding the button isn't security"
3. ER diagram → live data in 40 seconds

---

## 3. Smart Expense Tracker — offline-first mobile

**Slug:** `expense-tracker-mobile` · **Target query:** "React Native final year
project", "mobile app project with source code"

**Before recording:** physical Android phone, screen mirrored. Two months of
seeded expenses. This one is recorded on a phone, not a browser — that is the
whole point.

| Beat | On screen | Say |
| --- | --- | --- |
| 0:00 | Phone, airplane mode ON, add an expense, it saves instantly | "Airplane mode. Watch it still work." |
| 0:30 | Charts update while still offline | "Everything is on-device SQLite. No network in the entire flow you just saw." |
| 1:00 | Slide showing the "wifi died during demo" problem | "Every mobile project that talks to an API dies when the campus wifi drops during your demo. This one can't." |
| 1:40 | Code: the SQLite layer | "Schema, migrations, typed queries. This is where the marks are." |
| 2:30 | Add an expense at a merchant, category auto-fills | "Categorisation runs on the merchant text. No API call." |
| 3:10 | Set a budget, cross the threshold, alert fires | "Budget engine. Alerts before the limit, not after." |
| 3:50 | Turn wifi back ON, queued writes sync | "Now the interesting part. Everything queued while offline syncs up." |
| 4:30 | Code: the sync queue and conflict resolution | "Two devices, same record. This is how it resolves — last-write-wins with a timestamp, and here's why that's acceptable for this app." |
| 5:15 | Building the APK, installing | "Ships as an APK. Your examiner can install it on their own phone." |
| 5:45 | Listing page | "Source, report, and seven sessions. Link below." |

**Shorts cutdowns**
1. Airplane mode → still works (0:00–0:40) — **this is the strongest short in the whole set**
2. Offline → online sync (3:50–4:30)
3. Budget alert firing in real time

---

## 4. AI Resume Screening & Job Match

**Slug:** `resume-screening-ml` · **Target query:** "NLP final year project",
"machine learning project with source code"

**Before recording:** 15–20 sample resumes (use anonymised or generated ones,
never real people's resumes), one job description ready to paste.

| Beat | On screen | Say |
| --- | --- | --- |
| 0:00 | Paste a JD, upload 15 resumes, ranked shortlist appears | "Fifteen resumes, one job description, ranked in about four seconds." |
| 0:30 | Open the top candidate's breakdown | "And it shows why. Skills matched, skills missing, experience gap. Not just a score." |
| 1:00 | Code: PDF text extraction | "The hard half of this project isn't the model, it's parsing. PDFs are a mess." |
| 1:45 | **Failure beat** — a scanned/image PDF, app flags it as unparseable | "Scanned resume, no text layer. It says so instead of scoring it zero and pretending." |
| 2:20 | spaCy pipeline, entities highlighted | "Entity extraction pulls skills and experience out of free text." |
| 3:00 | Whiteboard/slide: TF-IDF and cosine similarity | "TF-IDF in one minute, because this is the question you will be asked. Term frequency, inverse document frequency, then the angle between two vectors." |
| 4:00 | Code: the weighted score | "Similarity alone isn't defensible. The score breaks into weighted components so every number is explainable." |
| 4:45 | Recruiter dashboard, saved jobs | "Recruiter side. Saved posts, past shortlists." |
| 5:15 | Slide: limits and bias | "Where this model is wrong — and say this in your viva before the examiner does. It rewards keyword matching, so it can be gamed." |
| 6:00 | Listing page | "Source, report, six sessions. Link below." |

**Shorts cutdowns**
1. 15 resumes → ranked in 4 seconds (0:00–0:35)
2. TF-IDF explained in 45 seconds
3. The bias/limits beat — "Say this before your examiner does"

---

## 5. Face Recognition Attendance

**Slug:** `face-recognition-attendance` · **Target query:** "face recognition
attendance system project", "OpenCV final year project"

**Before recording:** 3–4 enrolled faces (yourself plus consenting people, or
printed photos you have rights to). One face deliberately NOT enrolled.

| Beat | On screen | Say |
| --- | --- | --- |
| 0:00 | Live camera, face detected, name labelled, attendance row appears | "Camera on, face recognised, attendance marked. Two seconds." |
| 0:30 | **Failure beat** — unenrolled face appears, labelled Unknown | "Not enrolled, so it says Unknown. It does not guess the closest match. That's the question every examiner asks." |
| 1:10 | Enrollment flow with 5 photos | "Enrollment. Five photos, and what gets stored isn't the photo — it's a 128-number encoding." |
| 2:00 | Slide: detection → encoding → distance | "How it actually works, in three steps. Find the face, turn it into numbers, measure the distance to known faces." |
| 3:00 | Code: the distance threshold | "This number is the whole system. Too loose and it matches strangers, too tight and it fails on your own students." |
| 3:40 | Same person twice — duplicate guard blocks it | "Same student, second time in one session. Blocked. Otherwise attendance inflates." |
| 4:10 | Code: frame skipping | "You don't process every frame. Here's what happens to the frame rate if you do." |
| 4:45 | Attendance dashboard, filters, CSV export | "Dashboard, percentages per subject, CSV export for the department." |
| 5:15 | Bad lighting, recognition degrades | "Where it fails — poor light, extreme angles. Know this before your viva." |
| 5:45 | Listing page | "Source, report, six sessions. Link below." |

**Shorts cutdowns**
1. Unknown face rejection (0:30–1:05)
2. "A face is 128 numbers" — the encoding explanation
3. The lighting failure beat — honest, and it performs well

---

## Recording order

Record in this order — strongest short first, so the channel has something to
push while the rest are in progress:

1. **Expense Tracker** (airplane-mode short is the best hook you have)
2. **Hospital Management** (biggest search volume)
3. **Face Recognition** (biggest search volume, easiest to shoot)
4. **AI College Assistant** (highest ticket, most credibility)
5. **Resume Screening**

## Open items before publishing any of these

- Confirm each listing is a project you will actually build and deliver
- Set `demoUrl` in `src/content/campus/<slug>.ts` once a video is live
- Generate `public/og/<slug>.jpg` from a frame of each video
- Decide the Mentored-tier seat cap and price before volume arrives
