import "server-only";

import fs from "fs";
import path from "path";
import competitionPhotoRename from "./competition-photo-mapping.json";

export const IMAGE_EXT = /\.(png|jpe?g|webp|gif)$/i;

const RENAME = competitionPhotoRename as Record<string, string>;

export function slugifyFileName(filename: string): string {
  const normalized = filename.replaceAll("\\", "/");
  const ext = path.extname(normalized).toLowerCase();
  const base = normalized.slice(0, normalized.length - ext.length);
  const slug = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug}${ext}`;
}

/** Same canonical name used in `public/competitions/photos` and the sync script. */
export function sourceToCanonical(sourceFilename: string): string {
  const normalized = sourceFilename.replaceAll("\\", "/");
  const basename = path.basename(normalized);
  return RENAME[normalized] ?? RENAME[basename] ?? slugifyFileName(normalized);
}

function walkImages(dir: string, rootDir = dir): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkImages(full, rootDir));
      continue;
    }
    if (!entry.isFile() || !IMAGE_EXT.test(entry.name)) continue;
    out.push(path.relative(rootDir, full).replaceAll("\\", "/"));
  }
  return out;
}

/** Find the original filename in `Files/…/Competition Photos` for a canonical name. */
export function findSourceFilenameForCanonical(canonical: string): string | null {
  const dir = path.join(process.cwd(), "Files", "Competitions", "Competition Photos");
  if (!fs.existsSync(dir)) return null;
  for (const f of walkImages(dir)) {
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
