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
  /** Event location shown in cards */
  location?: string;
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
    location: "Ottawa, Canada",
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
    location: "Ottawa, Canada",
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
    result: "Silver Medal",
    location: "Toronto, Canada",
    date: "Feb. 2026",
    tier: "featured",
    featuredImageSrc: "/competitions/photos/nibs-2nd.jpeg",
    logoSrc: "/competitions/nibs.jpg",
    hoverPhotos: [
      {
        src: "/competitions/photos/nibs-2nd.jpeg",
        alt: "NIBS competition — Silver Medal",
        label: "NIBS"
      },
      {
        src: "/competitions/photos/team-nancy-jonny-max-2nd.jpeg",
        alt: "Team celebrating Silver Medal",
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
    id: "nibs-2025-spirited-team",
    competition: "NIBS 2025",
    result: "Most Spirited Team",
    location: "Nanchang, China",
    date: "Feb. 2025",
    tier: "featured",
    logoSrc: "/competitions/nibs.jpg",
    featuredImageSrc: "/competitions/photos/nibs-2025-china-team-photo-2.jpeg",
    hoverPhotos: [
      {
        src: "/competitions/photos/nibs-2025-china-team-photo-2.jpeg",
        alt: "NIBS 2025 in Nanchang — team photo",
        label: "NIBS 2025"
      },
      {
        src: "/competitions/photos/nibs-2025-china-team-photo-3.jpeg",
        alt: "NIBS 2025 in Nanchang — team photo",
        label: "NIBS 2025"
      },
      {
        src: "/competitions/photos/nibs-2025-nanchang-2.jpeg",
        alt: "NIBS 2025 in Nanchang — Most Spirited Team trophy",
        label: "NIBS 2025"
      }
    ]
  },
  {
    id: "international-marketing",
    competition: "IBM",
    result: "Gold Medal",
    location: "Kolding, Denmark",
    date: "April 2025",
    tier: "featured",
    logoSrc: "/competitions/marketing-week.png",
    featuredImageSrc: "/competitions/photos/international-marketing-week-winner.jpeg",
    hoverPhotos: [
      {
        src: "/competitions/photos/international-marketing-week-winner.jpeg",
        alt: "IBM — Gold Medal",
        label: "IBM"
      },
      {
        src: "/competitions/photos/international-marketing-week-winners.jpeg",
        alt: "IBM — team",
        label: "IBM"
      }
    ]
  },
  {
    id: "emcup-amsterdam-2026",
    competition: "EM Cup",
    result: "Bronze Medal",
    location: "Amsterdam, The Netherlands",
    date: "Feb. 2026",
    tier: "featured",
    logoAbbr: "EM",
    featuredImageSrc: "/competitions/photos/emcup-2026-amsterdam-1.png",
    hoverPhotos: [
      {
        src: "/competitions/photos/emcup-2026-amsterdam-1.png",
        alt: "EM Cup Amsterdam — team celebrating Bronze Medal",
        label: "EM Cup"
      },
      {
        src: "/competitions/photos/emcup-2026-amsterdam-2.png",
        alt: "EM Cup 2026 — team with Bronze Medal recognition",
        label: "EM Cup"
      },
      {
        src: "/competitions/photos/emcup-2026-amsterdam-3.png",
        alt: "EM Cup — awards stage, Amsterdam",
        label: "EM Cup"
      }
    ]
  },
  {
    id: "bbu",
    competition: "BBU",
    result: "Participated",
    location: "Cluj-Napoca, Romania",
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
    location: "Rotterdam, The Netherlands",
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
    location: "Amsterdam, The Netherlands",
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
  },
  {
    id: "tu-dublin-bootcamp",
    competition: "TU Dublin Bootcamp",
    result: "Participated",
    location: "Dublin, Ireland",
    date: "2025",
    tier: "participation",
    logoSrc: "/competitions/tu-dublin-logo.png",
    hoverPhotos: [
      {
        src: "/competitions/photos/tu-dublin-bootcamp-1.jpeg",
        alt: "TU Dublin Bootcamp team",
        label: "TU Dublin Bootcamp"
      },
      {
        src: "/competitions/photos/tu-dublin-bootcamp-3.jpeg",
        alt: "TU Dublin Bootcamp session",
        label: "TU Dublin Bootcamp"
      },
      {
        src: "/competitions/photos/tu-dublin-bootcamp-6.jpeg",
        alt: "TU Dublin Bootcamp competition moment",
        label: "TU Dublin Bootcamp"
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
