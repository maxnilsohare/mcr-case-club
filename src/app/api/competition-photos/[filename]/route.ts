import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { findSourceFilenameForCanonical, publicCompetitionPhotosDir } from "@/lib/competitionPhotoSources";

const SAFE_FILENAME = /^[a-zA-Z0-9._-]+\.(jpe?g|png|webp|gif)$/i;

function mimeForFilename(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "image/jpeg";
}

/**
 * Serves a competition photo from `public/competitions/photos` or, failing that,
 * from `Files/Competitions/Competition Photos` (same canonical names as the gallery).
 */
export async function GET(
  _request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = decodeURIComponent(params.filename);
    if (!SAFE_FILENAME.test(filename)) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    const publicPath = path.join(publicCompetitionPhotosDir(), filename);
    if (fs.existsSync(publicPath)) {
      const buf = fs.readFileSync(publicPath);
      return new NextResponse(buf, {
        headers: {
          "Content-Type": mimeForFilename(filename),
          "Cache-Control": "public, max-age=3600"
        }
      });
    }

    const sourceName = findSourceFilenameForCanonical(filename);
    if (!sourceName) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const filesPath = path.join(
      process.cwd(),
      "Files",
      "Competitions",
      "Competition Photos",
      sourceName
    );
    if (!fs.existsSync(filesPath)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const buf = fs.readFileSync(filesPath);
    return new NextResponse(buf, {
      headers: {
        "Content-Type": mimeForFilename(sourceName),
        "Cache-Control": "public, max-age=3600"
      }
    });
  } catch (e) {
    console.error("[api/competition-photos]", e);
    return NextResponse.json({ error: "Failed to read photo" }, { status: 500 });
  }
}
