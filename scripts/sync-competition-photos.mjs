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

function slugifyFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  const base = path.basename(filename, path.extname(filename));
  const slug = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug}${ext}`;
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

  const files = fs.readdirSync(SOURCE).filter((f) => IMAGE_EXT.test(f));
  let n = 0;

  for (const file of files) {
    const destName = RENAME[file] ?? slugifyFile(file);
    const from = path.join(SOURCE, file);
    const to = path.join(DEST, destName);
    fs.copyFileSync(from, to);
    n++;
    if (destName !== file) {
      console.log(`  ${file} → ${destName}`);
    } else {
      console.log(`  ${file}`);
    }
  }

  console.log(`[sync-competition-photos] Copied ${n} image(s) → public/competitions/photos/`);
}

main();
