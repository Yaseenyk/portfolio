# Sable — Local-First AI Financial Agent

> A privacy-first personal finance agent that keeps 100% of a user's financial
> data on-device, and layers an OpenAI function-calling agent on top of a local
> SQLite store — with hard UI safety boundaries around every database mutation.

**Platform:** React Native (Expo) · iOS & Android
**Role:** Solo engineer — architecture, implementation, AI integration
**Status:** _[Add: shipped / beta / in progress]_

---

## The Problem

Personal-finance apps demand the most sensitive data a person has — every
transaction, balance, and counterparty — and almost universally ship it to a
cloud backend to do anything intelligent with it. That trade (send us
everything, get insights back) is the reason most people never connect their
real accounts.

The goal for Sable was to invert that trade: deliver an **AI agent that reasons
over your finances** — categorization, debt tracking, proactive briefings —
**without a single row of financial data leaving the device.** No backend
database, no server-side account. The intelligence has to run against a local
store, and the AI layer has to be constrained so that a probabilistic model can
never silently mutate a user's ledger.

## The Solution

Sable is a **local-first** application. The system of record is an on-device
**SQLite** database; application state is coordinated through **Zustand**; and
the UI is built with **NativeWind** (Tailwind for React Native) and **React
Native Reanimated** for fluid, native-thread animation.

On top of that local store sits an **OpenAI function-calling agent**. The model
can read local financial context and _propose_ actions (log a debt, settle a
balance, categorize a transaction) — but every proposed mutation is routed
through a **Review & Confirm** boundary in the UI before it ever touches SQLite.
The agent suggests; the user commits.

Three capabilities define the product:

1. **Automated SMS ingestion** — bank transaction SMS are parsed on-device into
   structured records, with no manual entry.
2. **AI debt management with dry-run safety** — peer-to-peer debts are managed
   through natural-language chat, gated by an explicit confirmation card.
3. **Proactive RAG briefings** — a daily background job assembles local context
   and delivers an AI-generated Morning Briefing to the lock screen.

---

## Technical Architecture

### Local-first data layer
The entire domain model lives in **SQLite** on the device. There is no cloud
database and no sync server. This is a deliberate architectural constraint, not
an MVP shortcut — it shapes every downstream decision, from how ingestion
handles concurrency to how the AI layer builds its context window (it queries
local tables, never a remote API).

### Ingestion pipeline (SMS → structured ledger)
Incoming bank SMS are noisy, bank-specific, and adversarially inconsistent. The
ingestion path is built as a pipeline:

- **Adapter Pattern for parsing & sanitization.** Each bank/message format is
  handled by an adapter that normalizes a raw, untrusted SMS string into a
  clean, typed transaction record. New formats are added by writing a new
  adapter — the core pipeline never changes. This isolates the fragile,
  regex-heavy parsing logic behind a stable interface.
- **Serialized writes via `p-queue`.** SMS can arrive in bursts, and concurrent
  writes to a single SQLite connection cause write-lock contention. All writes
  are funneled through a `p-queue` with a controlled concurrency, turning a
  race-prone burst into a deterministic, serialized stream of transactions.

### AI agent layer (function calling with hard boundaries)
The chat agent uses **OpenAI Chat Completions + Function Calling**. Exposed
functions cover reading context and proposing ledger changes (e.g. record a
debt, settle a balance). The critical design rule:

> **The model never writes to the database directly.**

A function call is treated as an _intent_, not an action. That intent is
rendered as a **Review & Confirm card** — a UI boundary that shows exactly what
will change and requires explicit user confirmation before the corresponding
SQLite transaction executes. This "dry-run → confirm → commit" flow makes a
non-deterministic model safe to point at a user's financial ledger.

### Proactive RAG (Morning Briefing)
A daily background job implements a small **local RAG loop**:

1. Query SQLite for the relevant window (yesterday's spend, month-to-date
   pacing, upcoming obligations).
2. Assemble that data into a compact context window.
3. Generate a natural-language **Morning Briefing** via the AI layer.
4. Push it to the lock screen as a notification.

The retrieval corpus is the user's own local data — the "R" in RAG is a SQLite
query, which keeps the entire loop private and grounded in real numbers.

---

## Key Challenges Overcome

### 1. SQLite write-lock contention under bursty ingestion
**Problem.** SQLite permits a single writer. When several bank SMS arrived in
quick succession, concurrent write attempts collided, surfacing as
`database is locked` errors and dropped or partially-written transactions —
unacceptable for a financial ledger where correctness is non-negotiable.

**Solution.** All database writes were routed through a **`p-queue`** with
bounded concurrency, serializing them into a single ordered stream. Bursty,
concurrent write intents became a predictable queue, eliminating lock
contention while preserving arrival order. The queue also gives a natural choke
point for backpressure and retry logic.

**Signal for reviewers.** This is a concurrency-control problem solved at the
architecture level rather than papered over with ad-hoc retries — recognizing
that the single-writer constraint of SQLite demands serialized access, and
building that guarantee into the ingestion pipeline.

### 2. Regex fragility across heterogeneous bank SMS formats
**Problem.** Bank SMS have no standard. Formats differ by bank, by transaction
type, and change without notice. A single monolithic parser would be brittle,
untestable, and would fail silently on unseen formats — quietly corrupting the
ledger.

**Solution.** The **Adapter Pattern** isolates each format behind its own
adapter with a shared interface. Raw strings are sanitized and validated at the
adapter boundary before ever becoming a typed record; an unrecognized message
is rejected cleanly rather than mis-parsed. Adding support for a new bank is an
additive change (a new adapter + tests), not a modification to shared,
already-working code — an application of the open/closed principle to an
inherently messy input domain.

**Signal for reviewers.** Treating untrusted external input as a boundary
concern, containing fragility behind a stable interface, and making the system
extensible without destabilizing existing parsers.

---

## The Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | React Native (Expo) |
| **Language** | TypeScript |
| **Local database** | SQLite |
| **State management** | Zustand |
| **Styling** | NativeWind (Tailwind for React Native) |
| **Animation** | React Native Reanimated |
| **AI** | OpenAI — Chat Completions + Function Calling |
| **Retrieval** | Local RAG pipeline (SQLite-backed context) |
| **Concurrency** | `p-queue` (serialized SQLite writes) |
| **Ingestion** | Regex parsing via the Adapter Pattern |

---

## Architectural Themes (the through-line)

- **Privacy as an architectural constraint**, not a feature — local-first by
  design, with no cloud data path to compromise.
- **Safety boundaries around non-deterministic AI** — function calls are
  intents; a human-in-the-loop confirmation gates every mutation.
- **Containing fragility at the edges** — untrusted input (SMS) and concurrency
  hazards (SQLite writes) are handled at well-defined boundaries (adapters, a
  write queue) rather than leaking into the core domain.

_Metrics & outcomes: [add real figures — e.g. transactions parsed, parsing
accuracy, active users, App Store rating — once available]._
