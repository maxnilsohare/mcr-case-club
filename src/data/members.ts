export type PlayerStat = {
  label: string;
  value: number; // 0-100
};

export type CompetitionRecord = {
  name: string;
  /**
   * Used to pull relevant archive photos from `public/competitions/photos`.
   * Matches against photo `src` and `alt` (case-insensitive).
   */
  photoMatch: readonly string[];
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
  compIdentityBestIn: string;
  compIdentityTeamValue: string;
  funFact: string;
  stats?: PlayerStat[];
  imageSrc: string;
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
      { name: "TU Dublin Bootcamp", photoMatch: ["tu-dublin-bootcamp"] },
      { name: "Amsterdam Case Competition", photoMatch: ["acc-", "acc "] }
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
  }
] as const;

export function getMemberProfile(slug: string): MemberProfile | null {
  return memberProfiles.find((m) => m.slug === slug) ?? null;
}

export function getMemberSlugByName(name: string): string | null {
  return memberProfiles.find((m) => m.name === name)?.slug ?? null;
}

