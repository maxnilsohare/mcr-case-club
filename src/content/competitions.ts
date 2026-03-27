import type { TimelineItem } from "@/components/site/Timeline";

export const competitionsContent = {
  hero: {
    title: "Competitions",
    subtitle:
      "A structured pathway from fundamentals to team readiness—clear, fair, and serious about quality."
  },
  intro: {
    title: "Intro",
    body:
      "Competitions are one of the quickest ways to practice real consulting behaviours: aligning on the problem, building a clean story, and delivering under constraints. We’re building our first competition teams for the upcoming year."
  },
  gallery: {
    title: "From the room",
    intro:
      "Training days, finals, and travel—snapshots from BBU, NIBS, ROCA, RICCB, and case weekends."
  },
  why: {
    title: "Why Competitions Matter",
    bullets: [
      {
        title: "Time pressure, with standards",
        body:
          "They force clarity. You learn to prioritise, simplify, and communicate a recommendation without hiding behind complexity."
      },
      {
        title: "Team problem-solving",
        body:
          "Competitions reward clean collaboration: role clarity, tight alignment, and honest iteration."
      },
      {
        title: "A credible learning loop",
        body:
          "A real deadline creates cadence. The best teams build habits—not just slides."
      }
    ]
  },
  selection: {
    title: "How Selection Works",
    body:
      "Selection is designed to be transparent and fair. The goal is to match readiness and commitment to the demands of competition work.",
    steps: [
      "Apply or register interest",
      "Attend training sessions",
      "Team selection based on fit, commitment, and readiness"
    ]
  },
  process: {
    title: "Preparation Process",
    intro:
      "We train like a team: fundamentals first, then repetition, then polish. This timeline is a template you can adjust per competition.",
    timeline: [
      {
        title: "Fundamentals sprint",
        meta: "Weeks 1–2",
        description:
          "Core skills: structuring, quick maths, synthesis, and communication. Short cycles with specific feedback."
      },
      {
        title: "Case + story reps",
        meta: "Weeks 3–5",
        description:
          "End-to-end reps with strict debriefs. Focus on framing, alignment, and crisp executive summaries."
      },
      {
        title: "Slidecraft + delivery",
        meta: "Weeks 6–7",
        description:
          "Build a repeatable slide standard. Practice delivery with timers, Q&A drills, and a tighter narrative."
      },
      {
        title: "Competition readiness",
        meta: "Week 8",
        description:
          "Mock competition day: roles, handoffs, quality checks, and final presentation run-throughs."
      }
    ] satisfies TimelineItem[]
  },
  calendar: {
    title: "Competition Calendar",
    body:
      "Coming soon. We’ll publish target competitions, dates, and eligibility once the calendar is confirmed."
  },
  results: {
    title: "Future Goals / Past Results",
    body:
      "We’re building our first teams. The near-term focus is a repeatable preparation process and consistent standards. Results will be shared when there’s something real to report."
  },
  cta: {
    title: "Interested in competing?",
    body:
      "Apply to join, attend training, and we’ll assess readiness together. Competitions are optional—but the standards stay the same."
  }
} as const;

