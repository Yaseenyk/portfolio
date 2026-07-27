import type { CampusProject } from "@/lib/campus";

export const plantDiseaseDetection: CampusProject = {
  slug: "plant-disease-detection",
  title: "Plant Disease Detection — a CNN that works on real leaf photos",
  category: "AI / Machine Learning · Computer Vision",
  tagline:
    "Point a phone at a leaf, get the disease, the confidence, and what to do about it.",
  summary:
    "Most computer-vision projects demo on an image straight from the training set and fall apart on a photo taken in the exam hall. This one trains a CNN with transfer learning on a leaf-disease dataset, runs on a picture snapped in class, returns the diagnosis with a confidence score and the top three possibilities, and maps that to a plain treatment note. It handles the awkward case honestly — a blurry photo or a leaf it has never seen returns low confidence, not a confident wrong answer.",
  degrees: ["B.Tech", "M.Tech", "MCA"],
  domain: "AI / Machine Learning",
  stack: [
    "Python",
    "TensorFlow / Keras",
    "CNN (transfer learning)",
    "FastAPI",
    "React",
  ],
  features: [
    "Upload or capture a leaf image and get the disease with a confidence score",
    "Top-three predictions, so a close call is shown as a close call",
    "A treatment / advice note mapped to each diagnosis",
    "Low-confidence and 'not a leaf' inputs handled gracefully",
    "The training notebook with honest validation metrics",
    "A FastAPI model service behind a React capture-and-upload UI",
  ],
  modules: [
    "Why CNNs for images, and why transfer learning beats training from scratch",
    "The dataset, augmentation, and avoiding data leakage",
    "Training, and validating on data the model never saw",
    "Confidence, thresholds, and designing the unknown case",
    "Serving the trained model with FastAPI",
    "The React capture / upload interface",
    "Deployment, model size, and load time",
    "Full mock viva on the generalisation question",
  ],
  difficulty: "Advanced",
  sessionCount: 8,
  prices: { source: 6000, academic: 11000, mentored: 18000 },
  seatsPerCollege: 1,
  publishedAt: "2026-07-27",
};
