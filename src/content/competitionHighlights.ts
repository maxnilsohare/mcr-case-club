export type CompetitionHoverPhoto = {
  src: string;
  alt: string;
  /** Competition name shown as caption under the image */
  label: string;
};

export type CompetitionHighlightTier = "featured" | "participation";

export type CompetitionHighlight = {
  id: string;
  competition: string;
  result: string;
  date: string;
  /** Featured = podium / standout; participation = steady presence */
  tier: CompetitionHighlightTier;
  /** Primary collage tile when set; otherwise first `hoverPhotos` entry is used */
  featuredImageSrc?: string;
  /** Path under `public/` when a logo asset exists */
  logoSrc?: string;
  /** Short text for the logo pill when there is no image (long competition names) */
  logoAbbr?: string;
  /** Archive photos for collage: featured uses `featuredImageSrc` as primary + extras; participation uses first + next two */
  hoverPhotos?: readonly CompetitionHoverPhoto[];
};

/**
 * Competition outcomes for the homepage; logos in `public/competitions/`.
 * `tier`: featured = podium / standout (showcase); participation = presence.
 *
 * Hover archive: each `hoverPhotos[].src` must be unique across this list — no image
 * reused on multiple cards (e.g. ROCA Finalist vs Best Speaker use disjoint sets).
 */
export const competitionHighlights: readonly CompetitionHighlight[] = [
  {
    id: "roca-finalist",
    competition: "ROCA",
    result: "Finalist",
    date: "Oct. 2025",
    tier: "featured",
    featuredImageSrc: "/competitions/photos/roca-final.jpeg",
    logoSrc: "/competitions/roca.png",
    hoverPhotos: [
      {
        src: "/competitions/photos/roca-final.jpeg",
        alt: "ROCA final presentation",
        label: "ROCA"
      },
      {
        src: "/competitions/photos/roca-moment.jpeg",
        alt: "ROCA team moment",
        label: "ROCA"
      },
      {
        src: "/competitions/photos/max-roca.jpeg",
        alt: "ROCA case competition",
        label: "ROCA"
      }
    ]
  },
  {
    id: "roca-best-speaker",
    competition: "ROCA",
    result: "Best Speaker — Freya Lambert",
    date: "Oct. 2025",
    tier: "featured",
    featuredImageSrc: "/competitions/photos/roca-freya-lambert-best-speaker.jpeg",
    logoSrc: "/competitions/roca.png",
    hoverPhotos: [
      {
        src: "/competitions/photos/roca-freya-lambert-best-speaker.jpeg",
        alt: "Freya Lambert — Best Speaker, ROCA",
        label: "Freya"
      }
    ]
  },
  {
    id: "nibs",
    competition: "NIBS",
    result: "2nd Place",
    date: "Feb. 2026",
    tier: "featured",
    featuredImageSrc: "/competitions/photos/nibs-2nd.jpeg",
    logoSrc: "/competitions/nibs.jpg",
    hoverPhotos: [
      {
        src: "/competitions/photos/nibs-2nd.jpeg",
        alt: "NIBS competition — 2nd place",
        label: "NIBS"
      },
      {
        src: "/competitions/photos/team-nancy-jonny-max-2nd.jpeg",
        alt: "Team celebrating second place",
        label: "NIBS"
      },
      {
        src: "/competitions/photos/nibs-final.jpeg",
        alt: "NIBS final round",
        label: "NIBS"
      },
      {
        src: "/competitions/photos/nibs-presentation-3.jpeg",
        alt: "NIBS presentation",
        label: "NIBS"
      },
      {
        src: "/competitions/photos/nibs-team-photo.jpeg",
        alt: "NIBS team photo",
        label: "NIBS"
      },
      {
        src: "/competitions/photos/max-nibs.jpeg",
        alt: "NIBS competition moment",
        label: "NIBS"
      }
    ]
  },
  {
    id: "international-marketing",
    competition: "International Business Week",
    result: "1st Place",
    date: "Nov. 2025",
    tier: "featured",
    logoSrc: "/competitions/marketing-week.png",
    featuredImageSrc: "/competitions/photos/international-marketing-week-winner.jpeg",
    hoverPhotos: [
      {
        src: "/competitions/photos/international-marketing-week-winner.jpeg",
        alt: "International Business Week — winner",
        label: "International Business Week"
      },
      {
        src: "/competitions/photos/international-marketing-week-winners.jpeg",
        alt: "International Business Week — team",
        label: "International Business Week"
      }
    ]
  },
  {
    id: "bbu",
    competition: "BBU",
    result: "Participated",
    date: "Sep. 2025",
    tier: "participation",
    logoSrc: "/competitions/bbu.png",
    hoverPhotos: [
      {
        src: "/competitions/photos/bbu-team.jpeg",
        alt: "Club members together at BBU case competition",
        label: "BBU"
      },
      {
        src: "/competitions/photos/bbu-1.jpeg",
        alt: "BBU case weekend",
        label: "BBU"
      },
      {
        src: "/competitions/photos/bbu-2.jpeg",
        alt: "BBU case competition",
        label: "BBU"
      },
      {
        src: "/competitions/photos/bbu-3.jpeg",
        alt: "BBU case competition",
        label: "BBU"
      }
    ]
  },
  {
    id: "riccb",
    competition: "RICCB",
    result: "Participated",
    date: "Oct. 2025",
    tier: "participation",
    logoSrc: "/competitions/riccb.webp",
    hoverPhotos: [
      {
        src: "/competitions/photos/riccb-team.jpeg",
        alt: "RICCB team",
        label: "RICCB"
      },
      {
        src: "/competitions/photos/rotterdam-riccb-team.jpeg",
        alt: "RICCB team in Rotterdam",
        label: "RICCB"
      }
    ]
  },
  {
    id: "acc",
    competition: "ACC",
    result: "Participated",
    date: "Mar. 2026",
    tier: "participation",
    logoSrc: "/competitions/acc.png",
    hoverPhotos: [
      {
        src: "/competitions/photos/acc-team.jpeg",
        alt: "ACC team photo",
        label: "ACC"
      },
      {
        src: "/competitions/photos/acc-presentation.jpeg",
        alt: "ACC presentation",
        label: "ACC"
      },
      {
        src: "/competitions/photos/acc-moment.jpeg",
        alt: "ACC competition",
        label: "ACC"
      }
    ]
  }
] as const;

(function assertUniqueHoverPhotoSrcs() {
  const seen = new Set<string>();
  for (const item of competitionHighlights) {
    for (const p of item.hoverPhotos ?? []) {
      if (seen.has(p.src)) {
        throw new Error(`Duplicate hover photo src (use each archive image once): ${p.src}`);
      }
      seen.add(p.src);
    }
  }
})();
