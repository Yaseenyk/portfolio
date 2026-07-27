import type { CampusProject } from "@/lib/campus";

export const faceRecognitionAttendance: CampusProject = {
  slug: "face-recognition-attendance",
  title: "Face Recognition Attendance System",
  category: "Computer Vision · Python",
  tagline:
    "Marks attendance from a live camera feed — and can explain what an embedding is when asked.",
  summary:
    "A camera-based attendance system that enrolls students from a few photos, recognises faces in a live feed, and writes attendance to a database with a timestamp. It handles the two things a demo version never does: rejecting an unknown face instead of guessing the closest match, and refusing to mark the same student twice in one session. Examiners always ask how the recognition works — the sessions make sure you can draw it on the board.",
  degrees: ["BCA", "B.Tech", "MCA", "Diploma"],
  domain: "Computer Vision",
  stack: ["Python", "OpenCV", "face-recognition (dlib)", "Flask", "SQLite", "NumPy"],
  features: [
    "Enroll a student from a handful of photos and build their face encoding",
    "Live webcam feed detecting and labelling multiple faces at once",
    "Unknown faces are rejected, not matched to the nearest student",
    "Duplicate-entry guard — one mark per student per session",
    "Attendance dashboard with date filters and per-subject percentage",
    "CSV export for submission to the department",
  ],
  modules: [
    "How face recognition actually works — detection, encoding, distance threshold",
    "The enrollment pipeline and where encodings are stored",
    "Live video capture, frame handling, and why you do not process every frame",
    "Matching logic, the unknown-face threshold, and the duplicate guard",
    "Flask app, database schema, and the attendance dashboard",
    "Accuracy limits, lighting failure cases, and mock viva",
  ],
  difficulty: "Intermediate",
  sessionCount: 6,
  prices: { source: 4000, academic: 7500, mentored: 13000 },
  seatsPerCollege: 2,
  publishedAt: "2026-07-27",
};
