// Onboarding agreement for a student who has committed to a project.
//
// Not a marketing page — this is the record created at the point of
// enrolment. Wording is deliberately consistent with /final-year-projects/terms:
// a document that contradicts a page you already publish is weaker than either
// one alone.

/** Bump when clause text changes, so a stored consent is traceable to what was
 *  actually on screen when it was given. Never edit a clause without bumping. */
export const AGREEMENT_VERSION = "1.0";

export interface Clause {
  n: string;
  title: string;
  body: string[];
}

export const CLAUSES: Clause[] = [
  {
    n: "01",
    title: "What is being delivered",
    body: [
      "The project named below is built for you end to end — source code, database, project report, diagrams, presentation deck and deployment. You are not asked to write code, fix bugs, or finish anything off.",
      "The tier you selected determines exactly what is included. What is written on the project page at the time of enrolment is the agreement; anything not written there is not included.",
    ],
  },
  {
    n: "02",
    title: "Both sides commit to finishing",
    body: [
      "This is not a one-off sale. I commit to building the project, running every session listed for your tier, and preparing you for your viva through to your submission date.",
      "You commit to attending the sessions, paying each installment on the agreed date, and seeing the engagement through. A project you abandon halfway helps neither of us — and the sessions only work if you turn up to them.",
    ],
  },
  {
    n: "03",
    title: "If you stop partway",
    body: [
      "You may stop between installments. Installments already paid cover work already done and sessions already held, so they are not refunded, and any remaining sessions are forfeited.",
      "You keep everything delivered up to that point and owe nothing further. Nothing is held back to force you to continue.",
    ],
  },
  {
    n: "04",
    title: "If I fail to deliver",
    body: [
      "If I fail to deliver what the project page promised, your remaining installments are cancelled, you keep everything already delivered, and the last installment you paid is returned.",
      "If I need to reschedule a session, it does not count against your total and is rearranged at no cost to you.",
    ],
  },
  {
    n: "05",
    title: "You may not resell or share the project",
    body: [
      "On full payment you receive a perpetual licence to use, modify and submit the delivered code as your own academic project, and to show it in your portfolio or to an employer afterwards.",
      "You may not resell it, redistribute it, publish the source publicly, or pass it to other students. This is the single clause that protects every other student who buys the same listing — duplicate submissions surfacing at one college is what ends this for everyone.",
      "Breach of this clause ends the arrangement immediately, with no refund of anything paid.",
    ],
  },
  {
    n: "06",
    title: "Sessions and attendance",
    body: [
      "Sessions run live on Google Meet, daily, after 8:00 PM IST, for about 60 minutes each. The number included is set by your tier.",
      "If you cannot attend, tell me in advance and the session is rescheduled at no cost. Sessions missed without notice are counted as used.",
    ],
  },
  {
    n: "07",
    title: "Your college's rules are yours to follow",
    body: [
      "It is your responsibility to comply with your institution's rules on external assistance, and to disclose it wherever your institution requires disclosure.",
      "I do not sit your viva, write your exam, or contact your college on your behalf. The sessions exist so that the work you submit is work you can genuinely explain.",
    ],
  },
  {
    n: "08",
    title: "Your details",
    body: [
      "Your name, phone number and email are used only to run this engagement and to keep a record of this agreement. They are not sold, shared, or added to any marketing list.",
      "A copy of this agreement, with your details and the date, is sent to me when you consent. You can save your own copy from the confirmation screen.",
    ],
  },
];

/** Each is consented to separately — several specific ticks are stronger
 *  evidence of informed agreement than one blanket "I accept everything". */
export const CONSENTS = [
  {
    id: "deliver",
    label:
      "I understand what is being delivered, and that the project page for my tier defines what is included.",
  },
  {
    id: "commit",
    label:
      "I commit to attending the sessions and paying each installment on the agreed date, through to my submission.",
  },
  {
    id: "stop",
    label:
      "I understand that if I stop partway, installments already paid are not refunded and remaining sessions are forfeited.",
  },
  {
    id: "resell",
    label:
      "I will not resell, redistribute, publish or share the source code with any other student.",
  },
  {
    id: "college",
    label:
      "I understand that following my college's rules on external assistance, including any disclosure it requires, is my responsibility.",
  },
  {
    id: "accurate",
    label:
      "The name and phone number I have entered are my own and are accurate.",
  },
] as const;
