"use client";

import { motion } from "framer-motion";

/**
 * AISA — a bearer token arriving at the gate and being routed to one of three lanes.
 *
 * The subject is the actual interesting decision in that codebase: a signature that
 * verifies is not the same as permission to act, so one valid token can land as
 * unverified, as a student, or as an admin. Three lanes rather than a pass/fail door is
 * the whole point of the picture.
 */

const LANES = [
  { y: 62, label: "UNVERIFIED", colour: "#71717a", delay: 0 },
  { y: 120, label: "STUDENT", colour: "#67E8F9", delay: 1.6 },
  { y: 178, label: "ADMIN", colour: "#A78BFA", delay: 3.2 },
];

const GATE_X = 138;
const CYCLE = 4.8;

export default function RoleGate() {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full">
      {/* The lanes, drawn first so everything else sits above them. */}
      {LANES.map((lane) => (
        <g key={lane.label}>
          <line
            x1={GATE_X + 14}
            y1={lane.y}
            x2={276}
            y2={lane.y}
            stroke="#3f3f46"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <rect
            x={214}
            y={lane.y - 11}
            width="62"
            height="22"
            rx="5"
            fill="#0b1018"
            stroke={lane.colour}
            strokeWidth="1"
            strokeOpacity="0.45"
          />
          <text
            x={245}
            y={lane.y + 4}
            textAnchor="middle"
            fill={lane.colour}
            style={{ fontSize: "7px", fontFamily: "var(--font-mono)" }}
          >
            {lane.label}
          </text>
        </g>
      ))}

      {/* The gate itself. */}
      <rect
        x={GATE_X - 14}
        y={78}
        width="28"
        height="84"
        rx="6"
        fill="#0b1018"
        stroke="#52525b"
        strokeWidth="1.5"
      />
      <text
        x={GATE_X}
        y={124}
        textAnchor="middle"
        fill="#a1a1aa"
        style={{ fontSize: "7px", fontFamily: "var(--font-mono)" }}
        transform={`rotate(-90 ${GATE_X} 124)`}
      >
        VERIFY
      </text>

      {/* The inbound track. */}
      <line
        x1={30}
        y1={120}
        x2={GATE_X - 14}
        y2={120}
        stroke="#3f3f46"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <rect
        x={22}
        y={109}
        width="46"
        height="22"
        rx="5"
        fill="#0b1018"
        stroke="#52525b"
        strokeWidth="1"
      />
      <text
        x={45}
        y={124}
        textAnchor="middle"
        fill="#a1a1aa"
        style={{ fontSize: "7px", fontFamily: "var(--font-mono)" }}
      >
        TOKEN
      </text>

      {/*
        One token per lane, staggered so only one is in flight at a time. Each runs the
        full cycle: in to the gate, then out along its own lane.
      */}
      {LANES.map((lane) => (
        <motion.circle
          key={`t-${lane.label}`}
          r="3.4"
          fill={lane.colour}
          initial={{ cx: 68, cy: 120, opacity: 0 }}
          animate={{
            cx: [68, GATE_X, GATE_X, 212],
            cy: [120, 120, lane.y, lane.y],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.4,
            times: [0, 0.42, 0.58, 1],
            repeat: Infinity,
            repeatDelay: CYCLE - 2.4,
            ease: "easeInOut",
            delay: lane.delay,
          }}
        />
      ))}

      {/* A pulse on the gate as each token is checked. */}
      {LANES.map((lane) => (
        <motion.rect
          key={`g-${lane.label}`}
          x={GATE_X - 14}
          y={78}
          width="28"
          height="84"
          rx="6"
          fill="none"
          stroke={lane.colour}
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            repeatDelay: CYCLE - 0.7,
            ease: "easeOut",
            delay: lane.delay + 0.9,
          }}
        />
      ))}
    </svg>
  );
}
