import "server-only";

import fs from "fs";
import {
  IMAGE_EXT,
  filesCompetitionPhotosDir,
  publicCompetitionPhotosDir,
  sourceToCanonical
} from "@/lib/competitionPhotoSources";

/**
 * Hand-written alts keyed by filename stem (no extension).
 * Add a stem for polished captions; otherwise a title-cased name is generated.
 */
const ALT_BY_STEM: Record<string, string> = {
  "bbu-team": "Club members together at BBU case competition",
  "bbu-1": "BBU case weekend",
  "bbu-2": "BBU case competition",
  "bbu-3": "BBU case competition",
  "bbu-4": "BBU case competition",
  "bbu-5": "BBU case competition",
  "bbu-bootcamp": "BBU bootcamp session (training)",
  "bbu-bootcamp-2": "BBU training day (bootcamp)",
  "bbu-bootcamp-3": "BBU bootcamp session (training)",
  "bbu-bootcamp-4": "BBU bootcamp session (training)",
  "bbu-bootcamp-julu": "BBU bootcamp (training)",
  "nibs-2nd": "NIBS competition — Silver Medal",
  "nibs-final": "NIBS final",
  "max-nibs": "NIBS competition",
  "max-roca": "ROCA case competition",
  "roca": "ROCA competition",
  "roca-final": "ROCA final presentation",
  "roca-final-2": "ROCA final presentation",
  "roca-moment": "ROCA team moment",
  "roca-team-photo": "ROCA — team together",
  "roca-finalist-gala-dinner": "ROCA — gala evening",
  "roca-finalist-gala-dinner-2": "ROCA — gala evening",
  "roca-finalist-picture-gala-dinner": "ROCA — gala evening",
  "roca-finalist-standings": "ROCA — finalist standings",
  "roca-tea": "ROCA competition",
  "nibs-presentation-3": "NIBS presentation",
  "nibs-team-photo": "NIBS — team at the competition",
  "international-marketing-week-winner": "International Marketing Week — Gold Medal",
  "international-marketing-week-winners": "International Marketing Week — team",
  "roca-freya-lambert-best-speaker": "Freya Lambert — Best Speaker, ROCA",
  "roca-freya-and-dina": "Freya and Dina at ROCA",
  "disney-final": "Disney case final",
  "max-disney": "Disney case competition",
  "team-nancy-jonny-max-2nd": "Team celebrating Silver Medal",
  "emcup-2026-amsterdam-1": "EM Cup Amsterdam — team celebrating Bronze Medal",
  "emcup-2026-amsterdam-2": "EM Cup 2026 — team celebration",
  "emcup-2026-amsterdam-3": "EM Cup — awards stage, Amsterdam",
  "riccb-team": "RICCB team",
  "rotterdam-riccb-team": "RICCB team in Rotterdam",
  "acc-team": "ACC team photo",
  "acc-presentation": "ACC presentation",
  "acc-moment": "ACC competition",
  "training-stenders": "Case training session",
  "training-stenders-3": "Case training session",
  "training-stenders-4": "Case training session",
  "training-stenders-alt": "Case training session"
};

function stemToAlt(stem: string): string {
  const key = stem.toLowerCase();
  if (ALT_BY_STEM[key]) return ALT_BY_STEM[key];

  return stem
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export type CompetitionPhotoFile = { src: string; alt: string };

function teamPhotoRank(photo: CompetitionPhotoFile): number {
  const src = photo.src.toLowerCase();
  const alt = photo.alt.toLowerCase();
  const teamLike = /(team|cohort)/;
  return teamLike.test(src) || teamLike.test(alt) ? 0 : 1;
}

/**
 * Every competition photo in **either**:
 * - `public/competitions/photos/` (served as static `/competitions/photos/…`), or
 * - `Files/Competitions/Competition Photos/` (served via `/api/competition-photos/…` when not yet in public).
 *
 * If the same logical image exists in both, the public copy wins.
 */
export function getCompetitionPhotos(): CompetitionPhotoFile[] {
  try {
    const merged = new Map<string, CompetitionPhotoFile>();

    const publicDir = publicCompetitionPhotosDir();
    if (fs.existsSync(publicDir)) {
      for (const f of fs.readdirSync(publicDir)) {
        if (!IMAGE_EXT.test(f)) continue;
        const stem = f.replace(/\.[^.]+$/, "");
        merged.set(f, {
          alt: stemToAlt(stem),
          src: `/competitions/photos/${f}`
        });
      }
    }

    const filesDir = filesCompetitionPhotosDir();
    if (fs.existsSync(filesDir)) {
      for (const f of fs.readdirSync(filesDir)) {
        if (!IMAGE_EXT.test(f)) continue;
        const canonical = sourceToCanonical(f);
        if (merged.has(canonical)) continue;

        const stem = canonical.replace(/\.[^.]+$/, "");
        merged.set(canonical, {
          alt: stemToAlt(stem),
          src: `/api/competition-photos/${encodeURIComponent(canonical)}`
        });
      }
    }

    return [...merged.entries()]
      .sort((a, b) => {
        const pa = a[1];
        const pb = b[1];
        const rank = teamPhotoRank(pa) - teamPhotoRank(pb);
        if (rank !== 0) return rank;
        return a[0].localeCompare(b[0]);
      })
      .map(([, v]) => v);
  } catch (e) {
    console.error("[getCompetitionPhotos] Failed to read competition photo folders:", e);
    return [];
  }
}

/** @deprecated Use `getCompetitionPhotos` */
export function getCompetitionPhotosFromPublic(): CompetitionPhotoFile[] {
  return getCompetitionPhotos();
}
