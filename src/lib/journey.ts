/**
 * The 16-day AI Engineering Journey — live cohort program for students.
 * Single source of truth for /final-year-projects/journey/.
 *
 * Structure only for now: per-day deep content and diagrams land later as a
 * `body`/`svg` field on JourneyDay without touching the page. Facts stated
 * anywhere must stay honest: 16 days × 4 hours/day live sessions is the
 * format; no outcomes, placements, or student counts are claimable yet.
 */

export interface JourneyDay {
  day: number;
  title: string;
  topics: string[];
}

export interface JourneyPhase {
  phase: number;
  title: string;
  days: JourneyDay[];
}

export const JOURNEY = {
  name: "AI Engineering Journey",
  days: 16,
  hoursPerDay: 4,
  totalHours: 64,
  format: "Live online sessions",
} as const;

export const JOURNEY_PHASES: JourneyPhase[] = [
  {
    phase: 1,
    title: "AI Foundations & The LLM Ecosystem",
    days: [
      {
        day: 1,
        title: "Demystifying Modern AI",
        topics: [
          "Traditional ML vs. Generative AI",
          "How Large Language Models (LLMs) actually work",
          "Understanding Tokens, Context Windows, and Transformers",
        ],
      },
      {
        day: 2,
        title: "API-Driven AI Development",
        topics: [
          "Hosted Models (OpenAI, Anthropic) vs. Local Models (Ollama)",
          "Understanding API Parameters: Temperature, Top-P, and Max Tokens",
          "Synchronous requests vs. Streaming responses",
        ],
      },
      {
        day: 3,
        title: "Advanced Prompt Engineering",
        topics: [
          "Moving beyond basic chat: System prompts vs. User prompts",
          "Zero-shot, Few-shot, and Chain of Thought (CoT) reasoning",
          "Forcing models to output structured data (Strict JSON)",
        ],
      },
      {
        day: 4,
        title: "Mitigating AI Limitations",
        topics: [
          "What are Hallucinations and how to prevent them",
          "Understanding and blocking Prompt Injection attacks",
          "Handling the memory limits of context windows",
        ],
      },
    ],
  },
  {
    phase: 2,
    title: "Data Processing & Vector Mathematics",
    days: [
      {
        day: 5,
        title: "The Magic of Embeddings",
        topics: [
          "What is a Vector Embedding?",
          "Understanding high-dimensional vector space (without heavy math)",
          "Measuring distance: Cosine Similarity and Dot Product",
        ],
      },
      {
        day: 6,
        title: "Data Ingestion & Chunking Strategies",
        topics: [
          "Extracting raw text from PDFs, CSVs, and Web pages",
          "Why we chunk data (Fixed-size vs. Sentence-level)",
          "Semantic chunking and the importance of chunk overlap",
        ],
      },
      {
        day: 7,
        title: "Vector Databases (Architecture)",
        topics: [
          "Why traditional SQL/NoSQL databases fail at AI search",
          "How Vector Databases work (Pinecone, Qdrant, pgvector)",
          "Indexing strategies for high-speed retrieval",
        ],
      },
      {
        day: 8,
        title: "Building Semantic Search",
        topics: [
          "Keyword Search vs. Semantic (Meaning-based) Search",
          "System design: Converting a user query into a vector",
          "Retrieving and ranking the top matching results",
        ],
      },
    ],
  },
  {
    phase: 3,
    title: "Architecting RAG (Retrieval-Augmented Generation)",
    days: [
      {
        day: 9,
        title: "The Core RAG Blueprint",
        topics: [
          "The end-to-end architecture of a RAG pipeline",
          "Combining Vector Search with LLM Generation",
          "Injecting retrieved context into the LLM prompt securely",
        ],
      },
      {
        day: 10,
        title: "Advanced RAG Techniques",
        topics: [
          "Query Expansion (Rewriting user queries for better search)",
          "Hybrid Search (Combining Semantic + Keyword search)",
          "Re-ranking results to prioritize the most relevant data",
        ],
      },
      {
        day: 11,
        title: "Handling Long-Running AI Tasks",
        topics: [
          "The timeout problem: When LLMs take 10+ seconds to reply",
          "System design: Asynchronous architectures and Message Queues",
          "Updating the user interface: WebSockets vs. Polling",
        ],
      },
      {
        day: 12,
        title: "Evaluating and Testing AI Systems",
        topics: [
          "Deterministic code vs. Non-deterministic AI outputs",
          "How to test an application when the answer changes every time",
          "Setting up automated evaluation metrics for RAG",
        ],
      },
    ],
  },
  {
    phase: 4,
    title: "Agentic Workflows & Production",
    days: [
      {
        day: 13,
        title: "Introduction to AI Agents",
        topics: [
          "What makes an AI \"Agentic\"?",
          "Tool Calling: Giving the LLM access to external functions",
          "Connecting AI to web search, calculators, and database queries",
        ],
      },
      {
        day: 14,
        title: "Multi-Agent Systems",
        topics: [
          "Designing workflows where multiple AI agents collaborate",
          "Routing tasks to specialized models",
          "Step-by-step reasoning and automated review loops",
        ],
      },
      {
        day: 15,
        title: "AI Security & Production Guardrails",
        topics: [
          "Implementing safety nets and content moderation",
          "PII (Personally Identifiable Information) redaction",
          "Rate limiting and cost-control tracking for API usage",
        ],
      },
      {
        day: 16,
        title: "System Design Capstone & Career Roadmap",
        topics: [
          "Whiteboarding a full-scale, enterprise AI application from scratch",
          "Bridging the gap between this course and landing a job",
          "Open Q&A and final project reviews",
        ],
      },
    ],
  },
];
