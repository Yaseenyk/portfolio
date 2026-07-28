# [PROJECT TITLE]

**Final Year Project Report**
[Your Name] · [Roll No] · [Course — BCA / MCA / B.Tech / …]
[College Name] · [University] · [Month Year]

> How to use this template: replace every [bracketed] prompt, then delete the
> guidance quotes (lines starting with `>`). Your department's format document
> overrides everything here on margins, font, spacing and binding — follow it
> exactly, because those are the easiest marks to lose.

---

## Front matter

- Title page — your college's exact format
- Certificate from your guide — signed
- Declaration that the work is your own
- Acknowledgement
- **Abstract** — 200–300 words, written LAST: the problem, what you built, the
  technologies, and the outcome, in that order, without adjectives
- Table of contents · List of figures · List of tables

## Chapter 1 — Introduction

- **1.1 Problem statement** — [state it concretely, not in generalities]
- **1.2 Why it matters and who it affects** — [ … ]
- **1.3 Objectives** — [a numbered list you can be held to: O1, O2, O3 …]
- **1.4 Scope** — [what it does] · **Out of scope** — [what it deliberately does not do]
- **1.5 Organisation of the report**

> The out-of-scope list is your cheapest viva defence: "why doesn't it do X" is
> answered by pointing at a scope you declared here.

## Chapter 2 — Literature survey / existing system

- **2.1** Existing systems — [real named systems, not vague statements]
- **2.2** What each one does badly — [specifics]
- **2.3** How your project addresses that gap
- **2.4** Comparison table (existing systems vs yours)

## Chapter 3 — System analysis

- **3.1** Feasibility — technical, economic, operational
- **3.2** Functional requirements — [numbered: FR1, FR2 … so you can map each to a test case]
- **3.3** Non-functional requirements — performance, security, usability
- **3.4** Hardware and software requirements
- **3.5** Use case diagram + use case descriptions

## Chapter 4 — System design   *(carries the most marks)*

- **4.1** Architecture diagram — the boxes and what flows between them
- **4.2** ER diagram — must match your actual database
- **4.3** Data flow diagrams — Level 0 and Level 1
- **4.4** Class or sequence diagram for the core flow
- **4.5** Database schema — every table, column, type and constraint
- **4.6** Interface design — screen layouts and navigation

> Add a two-sentence justification under each major decision (why this database,
> why this table is separate, why this flow is async). Those sentences are your
> viva answers, written down while you still remember the reasoning.

## Chapter 5 — Implementation

- **5.1** Technologies used and why each was chosen
- **5.2** Module-by-module description of what was built
- **5.3** Key algorithms in pseudocode
- **5.4** Selected code snippets — the interesting parts only (never the whole codebase)
- **5.5** Screenshots of the working application — seed realistic data first

## Chapter 6 — Testing

- **6.1** Testing strategy — unit, integration, system, user acceptance
- **6.2** Test case table — input · expected output · actual output · pass/fail
- **6.3** Evidence of validation being triggered (invalid input, unauthorised access)
- **6.4** Known bugs and limitations

## Chapter 7 — Results and discussion

- **7.1** What the system achieves against each objective from Chapter 1
- **7.2** Performance figures / ML metrics (confusion matrix, error analysis) if relevant
- **7.3** An honest discussion of limitations

## Chapter 8 — Conclusion and future scope

- **8.1** What was built and what was learned
- **8.2** Three or four *concrete* future extensions (not "the system can be enhanced")

## Back matter

- References — your department's citation style
- Appendices — full schema, extended code, questionnaires

---

**The one rule that matters:** the report must describe the code you are
submitting. Every diagram must match the database and modules on your laptop —
panels check, and a mismatch reads as evidence neither was made by you.

*Template by Yaseen Khatib · yaseenkhatib.streamerosai.com/final-year-projects*
