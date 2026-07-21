/**
 * Retired blog slugs → their strongest surviving equivalent. Pruned generic
 * posts redirect here (meta-refresh + rel=canonical stub written into the
 * static export by scripts/generate-redirects.mjs) so link equity consolidates
 * instead of 404-ing. Keys and values are bare slugs under /blog/.
 */
export const BLOG_REDIRECTS: Record<string, string> = {
  "building-your-first-rag-system": "rag-grounding-the-agent",
  "vector-databases-for-mern-developers": "vector-foundations-semantic-search",
  "embeddings-semantic-search-mongodb": "vector-foundations-semantic-search",
  "fine-tuning-vs-rag": "hybrid-rag-bm25-vector-reranking",
  "function-calling-tool-use-patterns": "tool-use-function-calling-mechanics",
  "prompt-engineering-fundamentals": "xml-tag-structural-prompting-deterministic-shell",
  "streaming-llm-responses-to-react": "streaming-ai-edge-hono-ai-sdk-nextjs",
  "token-economics-cost-optimizing-llm-apps": "finops-for-ai-cost-governance",
  "evaluating-llm-outputs": "evaluation-driven-development-golden-dataset",
};
