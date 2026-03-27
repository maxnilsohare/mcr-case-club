import type { FAQItem } from "@/components/site/FAQAccordion";
import type { TimelineItem } from "@/components/site/Timeline";

export const joinContent = {
  hero: {
    title: "Join",
    subtitle:
      "A structured practice environment for students who want to get sharper through reps, feedback, and teamwork."
  },
  intro: {
    title: "Intro",
    body:
      "Manchester Case Club is selective about standards, not status. If you’re coachable and consistent, you’ll do well here."
  },
  who: {
    title: "Who Should Apply",
    bullets: [
      "Students curious about consulting-style problem solving",
      "People who want a consistent weekly cadence",
      "Members who like team problem-solving under time pressure",
      "Anyone who wants to speak and write more clearly"
    ]
  },
  lookFor: {
    title: "What We Look For",
    intro:
      "We care more about how you practice than how polished you already are.",
    traits: [
      { title: "Curiosity", body: "You ask clean questions and don’t panic around ambiguity." },
      { title: "Consistency", body: "You show up and do the reps, even when it’s not glamorous." },
      { title: "Coachability", body: "You take feedback well and apply it quickly." },
      { title: "Ambition", body: "You set a high bar and take ownership of your progress." },
      { title: "Collaboration", body: "You help others improve—quietly and reliably." }
    ]
  },
  timeline: {
    title: "Recruitment Timeline",
    intro:
      "Dates are placeholders. Swap these once your semester plan is confirmed.",
    items: [
      {
        title: "Applications open",
        meta: "Week 1 (placeholder)",
        description:
          "Share your interest, availability, and what you want to improve. Keep it simple."
      },
      {
        title: "Training sessions",
        meta: "Weeks 2–3 (placeholder)",
        description:
          "Attend training so we can assess commitment and fit in practice—not just on paper."
      },
      {
        title: "Decisions",
        meta: "Week 4 (placeholder)",
        description:
          "Offers based on readiness and standards. We’ll share feedback where we can."
      }
    ] satisfies TimelineItem[]
  },
  process: {
    title: "Application Process",
    steps: [
      "Apply (or register interest) with basic details",
      "Attend training sessions and practice",
      "We confirm cohort and next steps"
    ]
  },
  faq: {
    title: "FAQ",
    items: [
      {
        q: "Do I need consulting experience?",
        a: "No. We’re looking for coachability and consistency. Experience helps, but it’s not required."
      },
      {
        q: "Can first-years apply?",
        a: "Yes. If you can commit to the cadence and show up prepared, year doesn’t matter."
      },
      {
        q: "How much time does it take?",
        a: "Plan for one session per week plus light prep. Competition teams require more time when active."
      },
      {
        q: "Do I need to compete?",
        a: "No. Competitions are optional. The core experience is weekly practice and skill training."
      },
      {
        q: "What happens after I apply?",
        a: "You’ll receive next steps by email. If selected, we’ll onboard you into the practice cadence and expectations."
      }
    ] satisfies FAQItem[]
  },
  apply: {
    title: "Apply",
    body:
      "This is a placeholder form area for the MVP. Replace it with a form link or embed when ready."
  }
} as const;

