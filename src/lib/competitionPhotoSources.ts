import "server-only";

import fs from "fs";
import path from "path";
import competitionPhotoRename from "./competition-photo-mapping.json";

export const IMAGE_EXT = /\.(png|jpe?g|webp|gif)$/i;

const RENAME = competitionPhotoRename as Record<string, string>;

export function slugifyFileName(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const base = path.basename(filename, path.extname(filename));
  const slug = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug}${ext}`;
}

/** Same canonical name used in `public/competitions/photos` and the sync script. */
export function sourceToCanonical(sourceFilename: string): string {
  return RENAME[sourceFilename] ?? slugifyFileName(sourceFilename);
}

/** Find the original filename in `Files/…/Competition Photos` for a canonical name. */
export function findSourceFilenameForCanonical(canonical: string): string | null {
  const dir = path.join(process.cwd(), "Files", "Competitions", "Competition Photos");
  if (!fs.existsSync(dir)) return null;
  for (const f of fs.readdirSync(dir)) {
    if (!IMAGE_EXT.test(f)) continue;
    if (sourceToCanonical(f) === canonical) return f;
  }
  return null;
}

export function filesCompetitionPhotosDir(): string {
  return path.join(process.cwd(), "Files", "Competitions", "Competition Photos");
}

export function publicCompetitionPhotosDir(): string {
  return path.join(process.cwd(), "public", "competitions", "photos");
}
