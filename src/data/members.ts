export type PlayerStat = {
  label: string;
  value: number; // 0-100
};

export type CompetitionRecord = {
  /** Full competition name (accessibility + photo matching context) */
  name: string;
  /**
   * Used to pull relevant archive photos from `public/competitions/photos`.
   * Matches against photo `src` and `alt` (case-insensitive).
   */
  photoMatch: readonly string[];
  /** Small-caps label in the card header (e.g. ROCA, BBU) */
  shortLabel?: string;
  /** Path under `public/` (e.g. `/competitions/roca.png`) */
  logoSrc?: string;
  /** Standout line (e.g. Finalist, Participated) */
  result?: string;
  location?: string;
  date?: string;
};

export type SignatureStrength = {
  title: string;
  description: string;
  tag?: string;
  marker?: string;
};

export type MemberProfile = {
  slug: string;
  name: string;
  archetype: string;
  primaryRole: string;
  course: string;
  summary: string;
  strengths: SignatureStrength[];
  competitions: CompetitionRecord[];
  /** Shown in Comp identity when both are set */
  compIdentityBestIn?: string;
  compIdentityTeamValue?: string;
  /** Highlight (e.g. ROCA finalist story) */
  bestResult?: string;
  /** Bullet lines (e.g. placements, roles) */
  relevantExperience?: readonly string[];
  whatCompsHaveDone?: string;
  whyJoined?: string;
  funFact: string;
  stats?: PlayerStat[];
  imageSrc: string;
  /** `object-*` classes for profile hero image (position/zoom); omit for default center crop */
  imageCoverClassName?: string;
  linkedinHref?: string;
};

export const memberProfiles: readonly MemberProfile[] = [
  {
    slug: "isobel-jeffrie",
    name: "Isobel Jeffrie",
    archetype: "The Catalyst",
    primaryRole: "Analysis · Strategy",
    course: "BA (Hons) Business Management",
    summary:
      "Isobel brings energy, ideas, and momentum to a team. She is strongest in the early stages of a case, where direction, creativity, and sharp strategic thinking matter most. She helps teams unlock stronger ideas quickly, shape them into a clearer story, and build confidence as the room starts moving.",
    strengths: [
      {
        title: "Brainstorm Driver",
        description:
          "Opens up new directions early and gives the team more angles to work with.",
        tag: "High-impact",
        marker: "BD"
      },
      {
        title: "Strategic Aligner",
        description: "Helps the room move from ideas to a clear recommendation.",
        tag: "Core strength",
        marker: "SA"
      },
      {
        title: "Story Builder",
        description: "Strong on slides, structure, and turning thinking into presentation flow.",
        tag: "Execution",
        marker: "SB"
      },
      {
        title: "Momentum Creator",
        description: "Adds confidence and helps the team move with more energy and clarity.",
        tag: "Team dynamic",
        marker: "MC"
      }
    ],
    competitions: [
      {
        name: "Amsterdam Case Competition",
        shortLabel: "ACC",
        logoSrc: "/competitions/acc.png",
        result: "Participated",
        location: "Amsterdam, The Netherlands",
        date: "Mar. 2026",
        photoMatch: ["acc-", "acc "]
      },
      {
        name: "TU Dublin Bootcamp",
        shortLabel: "TU Dublin",
        logoSrc: "/competitions/tu-dublin-logo.png",
        result: "Completed",
        location: "Dublin, Ireland",
        date: "2025",
        photoMatch: ["tu-dublin-bootcamp"]
      }
    ],
    compIdentityBestIn: "Brainstorms, strategic direction, team momentum",
    compIdentityTeamValue: "Helps the team get moving quickly and think bigger early.",
    funFact: "Lived in Paris for five years",
    stats: [
      { label: "Idea generation", value: 93 },
      { label: "Strategy", value: 89 },
      { label: "Slides", value: 86 },
      { label: "Q&A", value: 88 },
      { label: "Team energy", value: 91 },
      { label: "Presentation flow", value: 85 }
    ],
    imageSrc: "/team/isobel-jeffrie@2x.jpeg"
  },
  {
    slug: "veron-charles",
    name: "Veron Charles",
    archetype: "The Stabiliser",
    primaryRole: "Analysis · Strategy",
    course: "BA (Hons) Business Management",
    summary:
      "Veron is the kind of competitor who brings control to the room. Strong under pressure, clear in his thinking, and reliable when a team needs structure fast. He helps shape a case into something focused, logical, and presentation-ready.",
    strengths: [
      {
        title: "Rapid Planner",
        description: "Builds a plan quickly when time is tight.",
        tag: "High-impact",
        marker: "RP"
      },
      {
        title: "Alignment Anchor",
        description: "Keeps the team aligned and moving.",
        tag: "Core strength",
        marker: "AA"
      },
      {
        title: "Recommendation Architect",
        description: "Strong on introductions, conclusions, and recommendation logic.",
        tag: "Execution",
        marker: "RA"
      },
      {
        title: "Pressure Calm",
        description: "Brings calm and clarity when pressure rises.",
        tag: "Team dynamic",
        marker: "PC"
      }
    ],
    competitions: [
      {
        name: "International Business Week",
        shortLabel: "IB Week",
        logoSrc: "/competitions/marketing-week.png",
        result: "Participated",
        location: "Manchester, United Kingdom",
        date: "2025",
        photoMatch: ["international-marketing", "marketing-week"]
      },
      {
        name: "TU Dublin Bootcamp",
        shortLabel: "TU Dublin",
        logoSrc: "/competitions/tu-dublin-logo.png",
        result: "Completed",
        location: "Dublin, Ireland",
        date: "2025",
        photoMatch: ["tu-dublin-bootcamp"]
      }
    ],
    compIdentityBestIn: "Structure, pacing, strategic clarity",
    compIdentityTeamValue: "Raises the team’s floor and sharpens the final output.",
    funFact: "First ever word: \"car\"",
    stats: [
      { label: "Structure", value: 92 },
      { label: "Composure under pressure", value: 90 },
      { label: "Strategy", value: 87 },
      { label: "Team coordination", value: 88 },
      { label: "Communication", value: 84 },
      { label: "Execution logic", value: 89 }
    ],
    imageSrc: "/team/veron-charles@2x.jpeg"
  },
  {
    slug: "max-ohare",
    name: "Max O'Hare",
    archetype: "The Architect",
    primaryRole: "Finance · Strategy · Analysis",
    course: "BSc Banking & Finance",
    summary:
      "Max is at his best when a case needs structure early and conviction late. He reads problems quickly, finds the shape of the answer, and gives the team a clear blueprint to work from. Strong in problem solving, sharp in presentation settings, and comfortable under pressure, he brings a mix of analytical clarity and competitive edge to the room.",
    strengths: [
      {
        title: "Early blueprint",
        description: "Builds a clear solution path early in the case.",
        tag: "Core strength",
        marker: "EB"
      },
      {
        title: "Slides & final answer",
        description: "Strong on slide decks and shaping the final answer.",
        tag: "Execution",
        marker: "SA"
      },
      {
        title: "Presentation & Q&A",
        description: "Enjoys presenting and handling Q&A with judges.",
        tag: "High-impact",
        marker: "PQ"
      },
      {
        title: "Direction under pressure",
        description: "Brings composure and direction when the team needs structure.",
        tag: "Team dynamic",
        marker: "DP"
      }
    ],
    competitions: [
      {
        name: "BBU",
        shortLabel: "BBU",
        logoSrc: "/competitions/bbu.png",
        result: "Participated",
        location: "Cluj-Napoca, Romania",
        date: "Sep. 2025",
        photoMatch: ["bbu"]
      },
      {
        name: "ROCA",
        shortLabel: "ROCA",
        logoSrc: "/competitions/roca.png",
        result: "Finalist",
        location: "Ottawa, Canada",
        date: "Oct. 2025",
        photoMatch: ["roca"]
      },
      {
        name: "RICCB",
        shortLabel: "RICCB",
        logoSrc: "/competitions/riccb.webp",
        result: "Participated",
        location: "Rotterdam, The Netherlands",
        date: "Oct. 2025",
        photoMatch: ["riccb"]
      },
      {
        name: "NIBS",
        shortLabel: "NIBS",
        logoSrc: "/competitions/nibs.jpg",
        result: "Participated",
        location: "Toronto, Canada",
        date: "Feb. 2026",
        photoMatch: ["nibs"]
      }
    ],
    bestResult:
      "ROCA Finalist — after losing 2 of 3 group games, the team turned it around on the final day and made the finals.",
    compIdentityBestIn: "Problem solving, blueprinting the solution, presenting with conviction",
    compIdentityTeamValue:
      "Gives the team structure, sharpens the answer, and helps turn thinking into a compelling final output.",
    relevantExperience: [
      "Incoming Investment Banking Summer Analyst, Houlihan Lokey",
      "Co-Founder, Alpha Investments Society",
      "President, Manchester Case Club"
    ],
    whatCompsHaveDone: "Improved problem solving, public speaking, and working in a team.",
    whyJoined: "To get practical experience outside of just university studies.",
    funFact: "Produced and sold a beat to Universal Music",
    stats: [
      { label: "Problem solving", value: 92 },
      { label: "Structure", value: 91 },
      { label: "Slides", value: 90 },
      { label: "Presentation", value: 88 },
      { label: "Q&A", value: 89 },
      { label: "Competitive edge", value: 90 }
    ],
    imageSrc: "/team/max-ohare@2x.png",
    linkedinHref: "https://www.linkedin.com/in/max-o-hare-8675"
  },
  {
    slug: "jonathan-miller",
    name: "Jonathan Miller",
    archetype: "The Storyteller",
    primaryRole: "Strategy",
    course: "Business Management, Year 2",
    summary:
      "Jonathan brings a strategic lens to the room and is especially strong at turning analysis into a clear story. He helps teams connect the numbers to the customer perspective, sharpen the narrative, and present ideas in a way that lands with judges and audiences.",
    strengths: [
      {
        title: "Data-to-story",
        description: "Turns data into a clear story.",
        tag: "Core strength",
        marker: "DS"
      },
      {
        title: "Customer lens",
        description: "Brings strong customer-perspective thinking.",
        tag: "High-impact",
        marker: "CL"
      },
      {
        title: "Narrative architect",
        description: "Helps shape the overall solution narrative.",
        tag: "Execution",
        marker: "NA"
      },
      {
        title: "Audience-ready",
        description: "Comfortable presenting to judges and an audience.",
        tag: "Team dynamic",
        marker: "AR"
      }
    ],
    competitions: [
      {
        name: "International Business Week (Kolding)",
        shortLabel: "IBM Kolding",
        logoSrc: "/competitions/marketing-week.png",
        result: "Participated",
        location: "Kolding, Denmark",
        date: "2025",
        photoMatch: ["international-marketing", "marketing-week", "kolding"]
      },
      {
        name: "BBU ICC",
        shortLabel: "BBU",
        logoSrc: "/competitions/bbu.png",
        result: "Participated",
        location: "Cluj-Napoca, Romania",
        date: "Sep. 2025",
        photoMatch: ["bbu"]
      },
      {
        name: "ROCA",
        shortLabel: "ROCA",
        logoSrc: "/competitions/roca.png",
        result: "Finalist",
        location: "Ottawa, Canada",
        date: "Oct. 2025",
        photoMatch: ["roca"]
      },
      {
        name: "NIBS",
        shortLabel: "NIBS",
        logoSrc: "/competitions/nibs.jpg",
        result: "Silver Medal",
        location: "Toronto, Canada",
        date: "Feb. 2026",
        photoMatch: ["nibs"]
      },
      {
        name: "EM Cup",
        shortLabel: "EM Cup",
        result: "Bronze Medal",
        location: "Amsterdam, The Netherlands",
        date: "Feb. 2026",
        photoMatch: ["emcup", "em-cup"]
      }
    ],
    bestResult: "Silver Medal at NIBS 2026 and Bronze Medal at EM Cup (Amsterdam)",
    compIdentityBestIn: "Storytelling, customer logic, strategic framing",
    compIdentityTeamValue:
      "Helps the team connect analysis to a persuasive recommendation.",
    relevantExperience: [
      "Oracle — Business Operations Analyst Intern (Jun 2026–Jun 2027)",
      "Head of Operations, Manchester Case Club"
    ],
    whatCompsHaveDone:
      "Grown his presentation skills, enhanced his ability to solve problems, and strengthened teamwork skills.",
    whyJoined:
      "An opportunity to travel the world to compete in competitions alongside gaining valuable consulting experience.",
    funFact: "Lived in Australia for a year",
    stats: [
      { label: "Storytelling", value: 92 },
      { label: "Strategy", value: 89 },
      { label: "Customer perspective", value: 90 },
      { label: "Presentation", value: 90 },
      { label: "Problem solving", value: 86 },
      { label: "Teamwork", value: 88 }
    ],
    imageSrc: "/team/jonathan-miller@2x.png"
  },
  {
    slug: "rachel-jordan",
    name: "Rachel Jordan",
    archetype: "The Implementer",
    primaryRole: "Strategy",
    course: "BA (Hons) Business Management · Year 2",
    summary:
      "Rachel brings realism and execution thinking to a case team. She is strongest when strategy needs to be turned into something practical, especially around implementation, change management, and making sure recommendations feel believable rather than abstract.",
    strengths: [
      {
        title: "Grounded strategy",
        description: "Keeps strategy realistic and grounded.",
        tag: "Core strength",
        marker: "GS"
      },
      {
        title: "Implementation lens",
        description: "Strong on implementation thinking.",
        tag: "High-impact",
        marker: "IL"
      },
      {
        title: "Change-aware",
        description: "Adds change-management perspective.",
        tag: "Execution",
        marker: "CA"
      },
      {
        title: "Delivery shape",
        description: "Helps structure how recommendations can actually be delivered.",
        tag: "Team dynamic",
        marker: "DS"
      }
    ],
    competitions: [
      {
        name: "BBU",
        shortLabel: "BBU",
        logoSrc: "/competitions/bbu.png",
        result: "Participated",
        location: "Cluj-Napoca, Romania",
        date: "Sep. 2025",
        photoMatch: ["bbu"]
      },
      {
        name: "ROCA",
        shortLabel: "ROCA",
        logoSrc: "/competitions/roca.png",
        result: "Finalist",
        location: "Ottawa, Canada",
        date: "Oct. 2025",
        photoMatch: ["roca"]
      },
      {
        name: "International Business Week",
        shortLabel: "IB Week",
        logoSrc: "/competitions/marketing-week.png",
        result: "Gold Medal",
        location: "Manchester, United Kingdom",
        date: "Nov. 2025",
        photoMatch: ["international-marketing", "marketing-week"]
      }
    ],
    bestResult:
      "Getting through to the finals at ROCA and seeing Freya win best female presenter.",
    compIdentityBestIn: "Implementation, change management, realistic strategy",
    compIdentityTeamValue:
      "Helps make recommendations executable and commercially believable.",
    relevantExperience: [
      "Sales Assistant, One Stop Stores Ltd — Aug 2023–Aug 2025",
      "Member, MMU Dance street competition team — Sept 2024–present"
    ],
    whatCompsHaveDone:
      "Built sharper presentation habits, stronger problem-solving instincts, and more reliable teamwork under pressure.",
    whyJoined:
      "To combine travel and high-level competition with consulting-style practice alongside serious teammates.",
    funFact: "Obsessed with Gü cheesecakes",
    stats: [
      { label: "Implementation", value: 91 },
      { label: "Strategy realism", value: 90 },
      { label: "Change management", value: 92 },
      { label: "Structure", value: 86 },
      { label: "Team coordination", value: 84 },
      { label: "Delivery logic", value: 89 }
    ],
    imageSrc: "/team/rachel-jordan@2x.png"
  },
  {
    slug: "nancy-foxall",
    name: "Nancy Foxall",
    archetype: "The Organiser",
    primaryRole: "Strategy",
    course: "BA Marketing · Year 2",
    summary:
      "Nancy adds structure and order to the final stages of a case. She helps teams bring ideas together cleanly, keeps the final deck organised, and adds consistency when the output needs to feel polished and submission-ready.",
    strengths: [
      {
        title: "Strategy support",
        description: "Strong on strategy support.",
        tag: "Core strength",
        marker: "SS"
      },
      {
        title: "Deck discipline",
        description: "Organises the final slide deck.",
        tag: "Execution",
        marker: "DD"
      },
      {
        title: "Final polish",
        description: "Helps bring order to the final output.",
        tag: "High-impact",
        marker: "FP"
      },
      {
        title: "Steady process",
        description: "Adds structure and steadiness to the team process.",
        tag: "Team dynamic",
        marker: "SP"
      }
    ],
    competitions: [
      {
        name: "RICCB",
        shortLabel: "RICCB",
        logoSrc: "/competitions/riccb.webp",
        result: "Participated",
        location: "Rotterdam, The Netherlands",
        date: "Oct. 2025",
        photoMatch: ["riccb"]
      },
      {
        name: "International Business Week",
        shortLabel: "IB Week",
        logoSrc: "/competitions/marketing-week.png",
        result: "Gold Medal",
        location: "Kolding, Denmark",
        date: "Nov. 2025",
        photoMatch: ["international-marketing", "marketing-week"]
      },
      {
        name: "NIBS",
        shortLabel: "NIBS",
        logoSrc: "/competitions/nibs.jpg",
        result: "Silver Medal",
        location: "Toronto, Canada",
        date: "Feb. 2026",
        photoMatch: ["nibs"]
      }
    ],
    bestResult: "Silver Medal at NIBS",
    compIdentityBestIn: "Organisation, deck structure, strategic support",
    compIdentityTeamValue:
      "Helps the team turn scattered work into a cleaner final product.",
    relevantExperience: [
      "Case Strategist, Manchester Case Club",
      "Course representative, Manchester Metropolitan University"
    ],
    whatCompsHaveDone:
      "Sharpened how she structures arguments, presents under pressure, and collaborates when the stakes are high.",
    whyJoined:
      "To train with a disciplined club culture and translate classroom thinking into competition-ready delivery.",
    funFact: "Nancy is a course rep",
    stats: [
      { label: "Organisation", value: 91 },
      { label: "Deck building", value: 88 },
      { label: "Strategy support", value: 85 },
      { label: "Consistency", value: 89 },
      { label: "Team reliability", value: 87 },
      { label: "Final output quality", value: 90 }
    ],
    imageSrc: "/team/nancy-foxall@2x.png"
  }
] as const;

export function getMemberProfile(slug: string): MemberProfile | null {
  return memberProfiles.find((m) => m.slug === slug) ?? null;
}

export function getMemberSlugByName(name: string): string | null {
  return memberProfiles.find((m) => m.name === name)?.slug ?? null;
}

