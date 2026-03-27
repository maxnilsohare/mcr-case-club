import "server-only";

import { getCompetitionPhotos } from "@/lib/competitionPhotosFromPublic";

function stableHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

/**
 * Hero marquee: every image synced to `public/competitions/photos/` (from
 * `Files/Competitions/Competition Photos/` via the prebuild sync). Order is
 * stable but visually mixed (not strict A–Z).
 */
export function getHeroMarqueeArchiveImages() {
  const items = getCompetitionPhotos().filter((p) =>
    p.src.startsWith("/competitions/photos/")
  );
  return [...items].sort((a, b) => stableHash(a.src) - stableHash(b.src));
}
