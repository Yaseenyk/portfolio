import type { CampusProject } from "@/lib/campus";

export const realtimeChatMern: CampusProject = {
  slug: "realtime-chat-mern",
  title: "Real-Time Chat App — MERN + Socket.IO with presence",
  category: "Web Development · Real-Time",
  tagline:
    "Actual websockets — typing indicators, online presence, and messages that arrive in order.",
  summary:
    "Most chat projects poll an API on a timer and call it real-time; they lag, they duplicate messages, and they fall apart the moment two people type at once. This one uses Socket.IO for a genuine push connection — one-to-one and group chats, typing indicators, online and last-seen presence, delivery and read receipts, and history that persists and paginates. It survives the question every panel asks: how do you know a message actually arrived, and in the right order?",
  degrees: ["BCA", "MCA", "B.Tech", "B.Sc IT"],
  domain: "Web Development",
  stack: [
    "React",
    "Node.js",
    "Express",
    "Socket.IO",
    "MongoDB",
    "JWT",
    "Zustand",
  ],
  features: [
    "One-to-one and group chats over a real websocket connection",
    "Typing indicators and online / last-seen presence",
    "Delivery and read receipts per message",
    "Message history persisted in MongoDB and paginated on scroll",
    "Authentication carried into the socket layer, not just the REST API",
    "A chat list that reorders as new messages arrive",
  ],
  modules: [
    "Why websockets, not polling — and what Socket.IO gives you",
    "Rooms, events, and the connection lifecycle",
    "Presence and typing indicators without hammering the server",
    "Message ordering, delivery, and persisting history",
    "Authenticating a socket and mapping users to connections",
    "The React chat UI and keeping state in sync with events",
    "Scaling notes: the Redis adapter and horizontal sockets",
    "Deployment and a full mock viva on the real-time design",
  ],
  difficulty: "Intermediate",
  sessionCount: 8,
  prices: { source: 5500, academic: 10000, mentored: 16000 },
  seatsPerCollege: 2,
  publishedAt: "2026-07-27",
};
