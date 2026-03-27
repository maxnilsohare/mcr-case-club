/**
 * Copies every image from `Files/Competitions/Competition Photos/` into
 * `public/competitions/photos/` with stable, URL-safe names.
 *
 * Canonical names are defined in `src/lib/competition-photo-mapping.json`
 * (shared with the app’s merge + API route).
 *
 * Run: `node scripts/sync-competition-photos.mjs`
 * Or: `npm run sync:competition-photos` (also runs automatically before `npm run build`).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const SOURCE = path.join(root, "Files", "Competitions", "Competition Photos");
const DEST = path.join(root, "public", "competitions", "photos");
const MAPPING_PATH = path.join(root, "src", "lib", "competition-photo-mapping.json");

const IMAGE_EXT = /\.(png|jpe?g|webp|gif)$/i;

function slugifyFile(relativePath) {
  const normalized = relativePath.replaceAll("\\", "/");
  const ext = path.extname(normalized).toLowerCase();
  const base = normalized.slice(0, normalized.length - ext.length);
  const slug = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug}${ext}`;
}

function walkImages(dir, rootDir = dir) {
  const out = [];
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

function loadRename() {
  if (!fs.existsSync(MAPPING_PATH)) {
    console.warn("[sync-competition-photos] Missing competition-photo-mapping.json");
    return {};
  }
  return JSON.parse(fs.readFileSync(MAPPING_PATH, "utf8"));
}

function main() {
  const RENAME = loadRename();

  if (!fs.existsSync(SOURCE)) {
    console.warn(
      "[sync-competition-photos] Source folder missing — skip (add Files/Competitions/Competition Photos or copy images into public/competitions/photos)."
    );
    return;
  }

  fs.mkdirSync(DEST, { recursive: true });

  const files = walkImages(SOURCE);
  let n = 0;

  for (const relativeFile of files) {
    const base = path.basename(relativeFile);
    const destName = RENAME[relativeFile] ?? RENAME[base] ?? slugifyFile(relativeFile);
    const from = path.join(SOURCE, relativeFile);
    const to = path.join(DEST, destName);
    fs.copyFileSync(from, to);
    n++;
    if (destName !== relativeFile) {
      console.log(`  ${relativeFile} → ${destName}`);
    } else {
      console.log(`  ${relativeFile}`);
    }
  }

  console.log(`[sync-competition-photos] Copied ${n} image(s) → public/competitions/photos/`);
}

main();
