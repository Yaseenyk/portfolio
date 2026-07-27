import type { CampusProject } from "@/lib/campus";

export const aiCollegeAssistant: CampusProject = {
  slug: "ai-college-assistant",
  title: "AI College Assistant — Agentic RAG over your college documents",
  category: "Agentic RAG · Python",
  tagline:
    "A chatbot that answers from your college's own PDFs, and cites the page it answered from.",
  summary:
    "Most student chatbots are a wrapper around an LLM and fall apart the moment an examiner asks where the answer came from. This one ingests real college documents — syllabus, exam rules, fee circulars — chunks and embeds them into a vector store, retrieves the relevant passages, and answers only from what it retrieved, with a citation back to the source page. It is the project that survives the hardest viva question: how do you know it is not making it up?",
  degrees: ["MCA", "B.Tech", "M.Tech"],
  domain: "AI / Machine Learning",
  stack: [
    "Python",
    "FastAPI",
    "LangChain",
    "ChromaDB",
    "Sentence Transformers",
    "React",
    "PostgreSQL",
  ],
  features: [
    "Upload any PDF or DOCX and have it indexed into the knowledge base",
    "Ask a question in plain English and get an answer grounded in those documents",
    "Every answer shows the source document and page it came from",
    "Says it does not know instead of inventing an answer when retrieval finds nothing",
    "Admin panel to manage the document corpus and see what students asked",
    "Chat history per user, stored and replayable",
  ],
  modules: [
    "Architecture walkthrough — why RAG instead of fine-tuning, and what each box does",
    "Document ingestion: parsing PDFs, chunking strategy, and why chunk size matters",
    "Embeddings and the vector store — what a similarity search actually computes",
    "The retrieval pipeline: top-k, thresholds, and handling a no-match",
    "Prompt construction and grounding — forcing the model to cite",
    "FastAPI backend, streaming responses, and error boundaries",
    "React chat UI, state handling, and rendering citations",
    "Deployment, environment secrets, and full mock viva",
  ],
  difficulty: "Advanced",
  sessionCount: 8,
  prices: { source: 6000, academic: 11000, mentored: 18000 },
  seatsPerCollege: 1,
  publishedAt: "2026-07-27",
};
