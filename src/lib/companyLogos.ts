import fs from "fs";
import path from "path";

const IMAGE_EXT = /\.(png|jpe?g|svg|webp|gif)$/i;

/** Prefer these over title-casing the filename stem (e.g. PwC). */
const ALT_OVERRIDES: Record<string, string> = {
  pwc: "PwC",
  bny: "BNY"
};

function fileNameToAlt(file: string): string {
  const stem = file.replace(/\.[^.]+$/, "");
  const key = stem.toLowerCase();
  if (ALT_OVERRIDES[key]) return ALT_OVERRIDES[key];

  const base = stem;
  return base
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export type CompanyLogoFile = { src: string; alt: string };

/**
 * All image files in /public/companies (build-time, Node only).
 */
export function getCompanyLogosFromPublic(): CompanyLogoFile[] {
  const dir = path.join(process.cwd(), "public", "companies");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      src: `/companies/${file}`,
      alt: fileNameToAlt(file)
    }));
}
