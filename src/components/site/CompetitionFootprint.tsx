"use client";

import * as React from "react";
import Image from "next/image";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker as RsmMarker } from "react-simple-maps";
import { geoCentroid, geoEqualEarth } from "d3-geo";
import world from "world-atlas/countries-110m.json";
import { cn } from "@/lib/cn";

type LocationStatus = "home" | "past" | "upcoming" | "target" | "standout";
type LngLat = readonly [number, number];

type FootprintLocation = {
  id: string;
  city: string;
  country: string;
  competitionName?: string;
  logoSrc?: string;
  status: LocationStatus;
  note?: string;
  images?: readonly { src: string; alt: string }[];
  /** Longitude / latitude in degrees */
  coordinates: LngLat;
};

const LOCATIONS: readonly FootprintLocation[] = [
  {
    id: "manchester",
    city: "Manchester",
    country: "United Kingdom",
    competitionName: "Home base",
    status: "home",
    note: "Weekly practice, feedback loops, and a growing circuit beyond Manchester.",
    images: [
      { src: "/competitions/photos/training-stenders.jpeg", alt: "Case training session" },
      { src: "/competitions/photos/training-stenders-3.jpeg", alt: "Case training session" }
    ],
    coordinates: [-2.2426, 53.4808]
  },
  {
    id: "dublin",
    city: "Dublin",
    country: "Ireland",
    competitionName: "TU Dublin Bootcamp",
    logoSrc: "/competitions/tu-dublin-logo.png",
    status: "past",
    note: "Completed",
    images: [
      { src: "/competitions/photos/tu-dublin-bootcamp-1.jpeg", alt: "TU Dublin Bootcamp" },
      { src: "/competitions/photos/tu-dublin-bootcamp-3.jpeg", alt: "TU Dublin Bootcamp" },
      { src: "/competitions/photos/tu-dublin-bootcamp-6.jpeg", alt: "TU Dublin Bootcamp" }
    ],
    coordinates: [-6.2603, 53.3498]
  },
  {
    id: "amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    competitionName: "Amsterdam Case Competition",
    logoSrc: "/competitions/acc.png",
    status: "past",
    note: "Completed",
    images: [
      { src: "/competitions/photos/acc-team.jpeg", alt: "ACC team photo" },
      { src: "/competitions/photos/acc-presentation.jpeg", alt: "ACC presentation" },
      { src: "/competitions/photos/acc-moment.jpeg", alt: "ACC moment" }
    ],
    coordinates: [4.9041, 52.3676]
  },
  {
    id: "rotterdam",
    city: "Rotterdam",
    country: "The Netherlands",
    competitionName: "RICCB",
    logoSrc: "/competitions/riccb.webp",
    status: "past",
    note: "Completed — RICCB",
    images: [
      { src: "/competitions/photos/riccb-team.jpeg", alt: "RICCB team" },
      { src: "/competitions/photos/rotterdam-riccb-team.jpeg", alt: "RICCB in Rotterdam" }
    ],
    coordinates: [4.47917, 51.9225]
  },
  {
    id: "cluj-napoca",
    city: "Cluj-Napoca",
    country: "Romania",
    competitionName: "BBU",
    logoSrc: "/competitions/bbu.png",
    status: "past",
    note: "Completed — BBU",
    images: [
      { src: "/competitions/photos/bbu-team.jpeg", alt: "BBU team" },
      { src: "/competitions/photos/bbu-1.jpeg", alt: "BBU competition" },
      { src: "/competitions/photos/bbu-4.jpeg", alt: "BBU competition moment" }
    ],
    coordinates: [23.6236, 46.7712]
  },
  {
    id: "toronto",
    city: "Toronto",
    country: "Canada",
    competitionName: "NIBS 2026",
    logoSrc: "/competitions/nibs.jpg",
    status: "upcoming",
    note: "Upcoming — NIBS 2026",
    images: [
      { src: "/competitions/photos/nibs-team-photo.jpeg", alt: "NIBS team photo" },
      { src: "/competitions/photos/nibs-presentation-3.jpeg", alt: "NIBS presentation" }
    ],
    coordinates: [-79.3832, 43.6532]
  },
  {
    id: "ottawa",
    city: "Ottawa",
    country: "Canada",
    competitionName: "ROCA 2025",
    logoSrc: "/competitions/roca.png",
    status: "past",
    note: "Completed — ROCA 2025",
    images: [
      { src: "/competitions/photos/roca-team-photo.jpeg", alt: "ROCA team photo" },
      {
        src: "/competitions/photos/roca-finalist-picture-gala-dinner.jpeg",
        alt: "ROCA gala finalist picture"
      },
      { src: "/competitions/photos/roca-final.jpeg", alt: "ROCA final" }
    ],
    coordinates: [-75.6972, 45.4215]
  },
  {
    id: "nanchang",
    city: "Nanchang",
    country: "China",
    competitionName: "NIBS 2025",
    logoSrc: "/competitions/nibs.jpg",
    status: "past",
    note: "Most Spirited Team — NIBS 2025",
    images: [
      { src: "/competitions/photos/nibs-2025-nanchang-1.jpeg", alt: "NIBS 2025 in Nanchang" },
      { src: "/competitions/photos/nibs-2025-nanchang-2.jpeg", alt: "NIBS 2025 Most Spirited Team moment" }
    ],
    coordinates: [115.8582, 28.6829]
  },
  {
    id: "copenhagen",
    city: "Copenhagen",
    country: "Denmark",
    competitionName: "Upcoming stop",
    status: "upcoming",
    note: "Upcoming",
    coordinates: [12.5683, 55.6761]
  },
  {
    id: "vienna",
    city: "Vienna",
    country: "Austria",
    competitionName: "Target city",
    status: "target",
    note: "Target",
    coordinates: [16.3738, 48.2082]
  },
  {
    id: "auckland",
    city: "Auckland",
    country: "New Zealand",
    competitionName: "Target city",
    status: "target",
    note: "Target",
    coordinates: [174.7633, -36.8485]
  }
] as const;

const ROUTES: readonly { fromId: string; toId: string; kind: "past" | "upcoming" | "target" }[] =
  LOCATIONS.filter((l) => l.id !== "manchester").map((l) => ({
    fromId: "manchester",
    toId: l.id,
    kind: l.status === "past" ? "past" : l.status === "upcoming" ? "upcoming" : "target"
  }));

function locationById(id: string) {
  return LOCATIONS.find((l) => l.id === id) ?? null;
}

function statusLabel(status: LocationStatus) {
  if (status === "home") return "Home";
  if (status === "past") return "Completed";
  if (status === "upcoming") return "Upcoming";
  if (status === "target") return "Target";
  return "Standout";
}

function statusTone(status: LocationStatus) {
  switch (status) {
    case "home":
      return {
        ring: "ring-ink-900/35",
        dot: "bg-ink-950",
        halo: "bg-ink-900/16",
        chip: "border-ink-300/80 bg-ink-950 text-white"
      };
    case "past":
      return {
        ring: "ring-accent-700/35",
        dot: "bg-accent-800",
        halo: "bg-accent-700/20",
        chip: "border-accent-300/70 bg-accent-100 text-accent-900"
      };
    case "upcoming":
      return {
        ring: "ring-[#1B8FA0]/40",
        dot: "bg-white",
        halo: "bg-[#1B8FA0]/18",
        chip: "border-[#8CCDD7]/80 bg-[#F4FBFC] text-[#0E5964]"
      };
    case "target":
      return {
        ring: "ring-[#93A3BE]/45",
        dot: "bg-[#EEF2F7]",
        halo: "bg-[#93A3BE]/16",
        chip: "border-[#C8D2E1] bg-[#F7FAFD] text-[#44556E]"
      };
    case "standout":
      return {
        ring: "ring-[#A67C2D]/30",
        dot: "bg-[#A67C2D]",
        halo: "bg-[#A67C2D]/14",
        chip: "border-[#E6D3AE] bg-[#FBF7EE] text-[#6B4C14]"
      };
  }
}

function markerAriaLabel(loc: FootprintLocation) {
  const comp = loc.competitionName ? ` — ${loc.competitionName}` : "";
  return `${loc.city}${comp} — ${statusLabel(loc.status)}`;
}

function locById(id: string | null) {
  if (!id) return null;
  return LOCATIONS.find((l) => l.id === id) ?? null;
}

function normalizeLngLat(coords: LngLat): LngLat {
  const [lng, lat] = coords;
  const wrappedLng = ((((lng + 180) % 360) + 360) % 360) - 180;
  const clampedLat = Math.max(-85, Math.min(85, lat));
  return [wrappedLng, clampedLat];
}

function geographyTone(geo: any) {
  const [lon, lat] = geoCentroid(geo as any) as [number, number];

  // Europe emphasis (club’s current core circuit)
  if (lon > -15 && lon < 45 && lat > 33 && lat < 72) {
    return {
      fill: "rgba(178, 199, 188, 0.28)", // pale sage-blue
      stroke: "rgba(69, 88, 104, 0.26)"
    };
  }
  // North America
  if (lon < -35 && lon > -170 && lat > 7) {
    return {
      fill: "rgba(220, 213, 199, 0.26)", // pale stone / sand
      stroke: "rgba(106, 96, 86, 0.20)"
    };
  }
  // Asia / Oceania
  if (lon > 45 && lon < 180) {
    return {
      fill: "rgba(194, 206, 221, 0.24)", // cool mist
      stroke: "rgba(74, 93, 116, 0.20)"
    };
  }
  // Africa + South America + fallback
  return {
    fill: "rgba(206, 211, 219, 0.22)",
    stroke: "rgba(82, 94, 112, 0.18)"
  };
}

function useProjection(selectedId: string | null) {
  return React.useMemo(() => {
    /**
     * Auto-fit the projection to the current marker set.
     * This keeps the map dense + intentional (Europe-forward today),
     * while automatically widening when new far-away markers are added.
     */
    const projection = geoEqualEarth();

    /**
     * “Active markers” for framing:
     * - Always include: home + completed + upcoming
     * - Include: target ONLY when it’s selected (so the view expands naturally when needed)
     */
    const fitLocations = LOCATIONS.filter(
      (l) => l.status !== "target" || (selectedId !== null && l.id === selectedId)
    );

    // Geographic spread (rough, but good enough for “premium” padding/zoom feel).
    const lngs = fitLocations.map((l) => l.coordinates[0]);
    const lats = fitLocations.map((l) => l.coordinates[1]);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const spanLng = Math.max(0.0001, maxLng - minLng);
    const spanLat = Math.max(0.0001, maxLat - minLat);

    // When clustered (Europe), add more breathing room; when wide, use the canvas.
    const clustered = spanLng < 28 && spanLat < 14;
    const veryWide = spanLng > 90 || spanLat > 45;

    const featureCollection = {
      type: "FeatureCollection",
      features: fitLocations.map((l) => ({
        type: "Feature",
        properties: { id: l.id },
        geometry: { type: "Point", coordinates: l.coordinates }
      }))
    } as const;

    // Padding inside our 1000×520 map viewBox. Slight asymmetry to keep the composition balanced.
    // (We tend to want a touch more “lead room” on the right and top so it feels editorial, not cramped.)
    const padLeft = clustered ? 84 : veryWide ? 72 : 82;
    const padRight = clustered ? 96 : veryWide ? 82 : 92;
    const padTop = clustered ? 74 : veryWide ? 62 : 70;
    const padBottom = clustered ? 84 : veryWide ? 68 : 78;

    projection.fitExtent(
      [
        [padLeft, padTop],
        [1000 - padRight, 520 - padBottom]
      ],
      featureCollection as any
    );

    // Prevent over-zooming when markers are very clustered.
    // (We never clamp the low end; wide footprints must be allowed to zoom out.)
    // Clamp only the “too zoomed in” case; clustered sets should still feel tight, not far-out.
    const maxScale = clustered ? 320 : 360;
    if (typeof (projection as any).scale === "function") {
      const s = (projection as any).scale();
      if (typeof s === "number" && s > maxScale) (projection as any).scale(maxScale);
    }

    // Gentle recenter: nudge toward Manchester so the footprint “reads” from home base.
    // Keep it subtle so it never looks like a hacked translate.
    try {
      const man = LOCATIONS.find((l) => l.id === "manchester");
      if (man && typeof (projection as any).translate === "function") {
        const p = projection(man.coordinates as [number, number]);
        const tr = (projection as any).translate();
        if (p && Array.isArray(tr) && tr.length === 2) {
          const [mx] = p;
          // If Manchester drifts too close to the edge after fit, gently pull it toward center-left.
          const desired = 470; // slightly left of center
          const dx = Math.max(-34, Math.min(34, desired - mx));
          (projection as any).translate([tr[0] + dx, tr[1]]);
        }
      }
    } catch {
      // no-op
    }

    return projection;
  }, [selectedId]);
}

function projectToPercent(
  projection: ReturnType<typeof geoEqualEarth>,
  coordinates: readonly [number, number]
) {
  const p = projection(coordinates as [number, number]);
  if (!p) return null;
  const [x, y] = p;
  return { left: `${(x / 1000) * 100}%`, top: `${(y / 520) * 100}%`, x, y };
}

function computeMarkerOffsets(
  projection: ReturnType<typeof geoEqualEarth>,
  locations: readonly FootprintLocation[]
): Record<string, readonly [number, number]> {
  type P = { id: string; x: number; y: number; ox: number; oy: number };
  const pts: P[] = locations
    .map((l) => {
      const p = projection(l.coordinates as [number, number]);
      if (!p) return null;
      return { id: l.id, x: p[0], y: p[1], ox: 0, oy: 0 };
    })
    .filter(Boolean) as P[];

  const minDist = 17; // separation threshold in map px
  const maxOffset = 11; // keep displacement subtle

  // Lightweight force-separation pass for close-by cities (e.g. Amsterdam/Rotterdam).
  for (let pass = 0; pass < 8; pass += 1) {
    for (let i = 0; i < pts.length; i += 1) {
      for (let j = i + 1; j < pts.length; j += 1) {
        const a = pts[i];
        const b = pts[j];
        const dx = a.x + a.ox - (b.x + b.ox);
        const dy = a.y + a.oy - (b.y + b.oy);
        const d = Math.hypot(dx, dy);
        if (d >= minDist) continue;

        const overlap = (minDist - Math.max(0.0001, d)) * 0.5;
        const ux = d > 0.001 ? dx / d : 1;
        const uy = d > 0.001 ? dy / d : 0;

        a.ox += ux * overlap;
        a.oy += uy * overlap;
        b.ox -= ux * overlap;
        b.oy -= uy * overlap;

        a.ox = Math.max(-maxOffset, Math.min(maxOffset, a.ox));
        a.oy = Math.max(-maxOffset, Math.min(maxOffset, a.oy));
        b.ox = Math.max(-maxOffset, Math.min(maxOffset, b.ox));
        b.oy = Math.max(-maxOffset, Math.min(maxOffset, b.oy));
      }
    }
  }

  const out: Record<string, readonly [number, number]> = {};
  for (const p of pts) out[p.id] = [p.ox, p.oy];
  return out;
}

function logoOffsetForLocation(loc: FootprintLocation): readonly [number, number] {
  // Tuned offsets to keep chips readable and avoid collisions in dense regions.
  const byId: Record<string, readonly [number, number]> = {
    amsterdam: [20, -20],
    rotterdam: [20, 20],
    dublin: [-22, -20],
    manchester: [22, -22],
    "cluj-napoca": [22, -18],
    vienna: [22, 18],
    copenhagen: [22, -18],
    toronto: [22, -20],
    ottawa: [22, 20],
    nanchang: [22, -18],
    auckland: [-22, -18]
  };
  return byId[loc.id] ?? [20, -20];
}

function logoConnectorPath(offset: readonly [number, number]): string {
  const [dx, dy] = offset;
  const tx = -dx;
  const ty = -dy;
  const len = Math.hypot(tx, ty) || 1;
  const nx = -ty / len;
  const ny = tx / len;
  // Slightly stronger editorial curve for clearer marker↔logo linkage.
  const bend = 5.5 * (dy >= 0 ? 1 : -1);
  const cx = tx * 0.55 + nx * bend;
  const cy = ty * 0.55 + ny * bend;
  return `M 0 0 Q ${cx} ${cy} ${tx} ${ty}`;
}

function DetailPanel({
  loc,
  onClose,
  onOpenImage
}: {
  loc: FootprintLocation;
  onClose: () => void;
  onOpenImage: (src: string, alt: string) => void;
}) {
  const t = statusTone(loc.status);
  const title = loc.competitionName ?? "Footprint";
  const photos = loc.images?.slice(0, 3) ?? [];
  const leadPhoto = photos[0] ?? null;
  const supporting = photos.slice(1);

  return (
    <div className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_14px_45px_rgba(11,15,20,0.10)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-ink-500">
            Selected stop
          </p>
          <div className="mt-2 flex items-center gap-2.5">
            {loc.logoSrc ? (
              <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-ink-200/80 bg-white shadow-[0_1px_0_rgba(15,23,42,0.03)]">
                <Image
                  src={loc.logoSrc}
                  alt={`${loc.competitionName ?? loc.city} logo`}
                  fill
                  sizes="32px"
                  className="object-contain p-1"
                />
              </span>
            ) : null}
            <h3 className="text-[1.15rem] font-semibold tracking-tight text-ink-950">{title}</h3>
          </div>
          <p className="mt-1 text-sm text-ink-700">
            {loc.city}, {loc.country}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em]",
              t.chip
            )}
          >
            {statusLabel(loc.status)}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-colors hover:bg-paper-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100"
            aria-label="Close details"
          >
            <span aria-hidden className="text-lg leading-none">
              ×
            </span>
          </button>
        </div>
      </div>

      {loc.note ? <p className="mt-4 text-sm leading-relaxed text-ink-800">{loc.note}</p> : null}

      <div className="mt-4">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ink-500">Photos</p>
        {photos.length > 0 ? (
          <div className="mt-3">
            {leadPhoto ? (
              <button
                type="button"
                className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-ink-200/70 bg-paper-100 shadow-[0_1px_0_rgba(15,23,42,0.03)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100"
                onClick={() => onOpenImage(leadPhoto.src, leadPhoto.alt)}
                aria-label={`Open featured photo: ${leadPhoto.alt}`}
              >
                <Image
                  src={leadPhoto.src}
                  alt={leadPhoto.alt}
                  fill
                  sizes="(max-width: 768px) 80vw, 340px"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </button>
            ) : null}
            {supporting.length > 0 ? (
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {supporting.map((img) => (
                  <button
                    key={img.src}
                    type="button"
                    className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-ink-200/70 bg-paper-100 shadow-[0_1px_0_rgba(15,23,42,0.03)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100"
                    onClick={() => onOpenImage(img.src, img.alt)}
                    aria-label={`Open photo: ${img.alt}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 35vw, 150px"
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-3 rounded-xl border border-ink-200/70 bg-paper-100 px-4 py-3">
            <p className="text-sm text-ink-700">Images coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Lightbox({
  open,
  src,
  alt,
  onClose
}: {
  open: boolean;
  src: string | null;
  alt: string | null;
  onClose: () => void;
}) {
  if (!open || !src) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-[0_30px_90px_rgba(0,0,0,0.50)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={src}
            alt={alt ?? "Competition photo"}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
          aria-label="Close photo viewer"
        >
          <span aria-hidden className="text-xl leading-none">
            ×
          </span>
        </button>
      </div>
    </div>
  );
}

function StatsStrip() {
  const citiesReached = new Set(
    LOCATIONS.filter((l) => l.status !== "target").map((l) => l.city)
  ).size;
  const countriesReached = new Set(
    LOCATIONS.filter((l) => l.status !== "target").map((l) => l.country ?? l.city)
  ).size;
  const upcomingStops = LOCATIONS.filter((l) => l.status === "upcoming").length;

  const items = [
    { label: "Cities reached", value: citiesReached },
    { label: "Countries reached", value: countriesReached },
    { label: "Upcoming stops", value: upcomingStops }
  ];

  return (
    <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-2xl border border-ink-200/80 bg-white px-4 py-3 shadow-[0_1px_0_rgba(15,23,42,0.04)]"
        >
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink-500">
            {it.label}
          </p>
          <p className="mt-1 text-lg font-semibold tabular-nums tracking-tight text-ink-950">
            {it.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function Legend() {
  const items: readonly { label: string; status: LocationStatus }[] = [
    { label: "Past", status: "past" },
    { label: "Upcoming", status: "upcoming" },
    { label: "Target", status: "target" }
  ];

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2.5">
      <span className="text-xs font-medium text-ink-600">Legend</span>
      <div className="h-px w-5 bg-ink-200/80" />
      {items.map((it) => {
        const t = statusTone(it.status);
        return (
          <span
            key={it.label}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-tight shadow-[0_1px_0_rgba(15,23,42,0.03)]",
              t.chip
            )}
          >
            <span className={cn("relative inline-flex h-2.5 w-2.5 items-center justify-center")}>
              <span className={cn("absolute inset-[-6px] rounded-full", t.halo)} aria-hidden />
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full ring-1 ring-inset",
                  it.status === "upcoming" ? "bg-white" : t.dot,
                  t.ring
                )}
                aria-hidden
              />
            </span>
            {it.label}
          </span>
        );
      })}
    </div>
  );
}

function Tooltip({
  loc,
  open,
  projection
}: {
  loc: FootprintLocation;
  open: boolean;
  projection: ReturnType<typeof geoEqualEarth>;
}) {
  const t = statusTone(loc.status);
  const pos = projectToPercent(projection, loc.coordinates);
  if (!pos) return null;
  const comp = loc.competitionName ? ` — ${loc.competitionName}` : "";
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-10 w-[15.5rem] max-w-[72vw] -translate-x-1/2 -translate-y-[calc(100%+14px)]",
        "transition-[opacity,transform] duration-200 ease-out",
        open ? "opacity-100 translate-y-[calc(-100%-14px)]" : "opacity-0 translate-y-[calc(-100%-10px)]"
      )}
      style={{ left: pos.left, top: pos.top }}
      aria-hidden={!open}
    >
      <div className="rounded-2xl border border-ink-200/80 bg-white/95 p-3 shadow-[0_18px_50px_rgba(11,15,20,0.18)] backdrop-blur">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-tight text-ink-950">
              {loc.city}
              <span className="font-normal text-ink-700">{comp}</span>
            </p>
            {loc.note ? (
              <p className="mt-1 text-xs leading-relaxed text-ink-700">{loc.note}</p>
            ) : null}
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full border px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em]",
              t.chip
            )}
          >
            {statusLabel(loc.status)}
          </span>
        </div>
      </div>
      <div
        className="mx-auto mt-2 h-2.5 w-2.5 rotate-45 border border-ink-200/80 bg-white/95"
        aria-hidden
      />
    </div>
  );
}

function RealWorldMap({
  projection,
  zoom,
  onZoomChange,
  selectedId,
  setSelectedId,
  hoveredId,
  setHoveredId,
  center,
  onCenterChange,
  onCenterTo
}: {
  projection: ReturnType<typeof geoEqualEarth>;
  zoom: number;
  onZoomChange: (next: number) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  center: LngLat;
  onCenterChange: (next: LngLat) => void;
  onCenterTo: (next: LngLat, nextZoom?: number) => void;
}) {
  const markerOffsets = React.useMemo(
    () => computeMarkerOffsets(projection, LOCATIONS),
    [projection]
  );
  const selected = selectedId ? locationById(selectedId) : null;
  const selectedPoint = selected ? projection(selected.coordinates as [number, number]) : null;

  return (
    <ComposableMap
      width={1000}
      height={520}
      projection={projection}
      style={{ width: "100%", height: "100%" }}
      role="presentation"
      aria-hidden
    >
      <ZoomableGroup
        zoom={zoom}
        center={center as [number, number]}
        onMoveEnd={(p: any) => {
          if (typeof p?.zoom === "number") onZoomChange(p.zoom);
          if (Array.isArray(p?.coordinates) && p.coordinates.length === 2) {
            onCenterChange([p.coordinates[0], p.coordinates[1]]);
          }
        }}
        minZoom={1}
        maxZoom={2.75}
        transitionDuration={420}
        transitionEasing="cubic-bezier(0.22, 1, 0.36, 1)"
        // Allow wheel + pinch; keep it subtle and predictable.
        filterZoomEvent={() => true}
      >
        <defs>
          <linearGradient id="mcc-ocean" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(243,245,248,0.92)" />
            <stop offset="100%" stopColor="rgba(250,248,245,0.93)" />
          </linearGradient>
          <linearGradient id="mcc-route-selected" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(11,15,20,0.42)" />
            <stop offset="38%" stopColor="rgba(13,148,136,0.95)" />
            <stop offset="72%" stopColor="rgba(16,185,129,0.94)" />
            <stop offset="100%" stopColor="rgba(14,89,100,0.70)" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1000" height="520" rx="28" fill="url(#mcc-ocean)" />

        {/* Subtle editorial graticule-ish grid (kept very light) */}
        <g opacity="0.36">
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={55 + i * 38}
              x2="1000"
              y2={55 + i * 38}
              stroke="rgba(183,194,211,0.22)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={55 + i * 62}
              y1="0"
              x2={55 + i * 62}
              y2="520"
              stroke="rgba(183,194,211,0.18)"
              strokeWidth="1"
            />
          ))}
        </g>

        <Geographies geography={world as unknown as object}>
          {({ geographies }: { geographies: any[] }) =>
            geographies
              // Remove Antarctica to keep the map clean/editorial.
              .filter((g) => String(g.id) !== "010")
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={geographyTone(geo).fill}
                  stroke={geographyTone(geo).stroke}
                  strokeWidth={0.65}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "rgba(166, 183, 204, 0.22)" },
                    pressed: { outline: "none" }
                  }}
                />
              ))
          }
        </Geographies>

        {/* Routes + markers live INSIDE the zoomable group so they pan/zoom correctly */}
        <g aria-hidden>
          <defs>
            <linearGradient id="mcc-route" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(21,74,65,0.00)" />
              <stop offset="35%" stopColor="rgba(21,74,65,0.22)" />
              <stop offset="70%" stopColor="rgba(21,74,65,0.18)" />
              <stop offset="100%" stopColor="rgba(21,74,65,0.00)" />
            </linearGradient>
          </defs>
          {(selectedId ? ROUTES.filter((r) => r.toId === selectedId) : []).map((r) => {
            const a = locationById(r.fromId);
            const b = locationById(r.toId);
            if (!a || !b) return null;
            const ap = projection(a.coordinates as [number, number]);
            const bp = projection(b.coordinates as [number, number]);
            if (!ap || !bp) return null;
            const [ax, ay] = ap;
            const [bx, by] = bp;
            const midX = (ax + bx) / 2;
            const lift = r.kind === "past" ? -22 : r.kind === "upcoming" ? -30 : -26;
            const midY = (ay + by) / 2 + lift;
            const d = `M ${ax} ${ay} Q ${midX} ${midY} ${bx} ${by}`;
            const selectedRoute = true;
            const routeOpacity = selectedRoute
              ? 0.95
              : r.kind === "past"
                ? 0.72
                : r.kind === "upcoming"
                  ? 0.62
                  : 0.26;
            const routeDash = r.kind === "upcoming" ? "4 6" : r.kind === "target" ? "2 8" : undefined;
            const routeColor = selectedRoute
              ? "rgba(13, 148, 136, 0.95)"
              : r.kind === "past"
                ? "rgba(21, 122, 106, 0.70)"
                : r.kind === "upcoming"
                  ? "rgba(27, 143, 160, 0.72)"
                  : "rgba(116, 133, 160, 0.42)";
            return (
              <g key={`${r.fromId}-${r.toId}`}>
                {selectedRoute ? (
                  <>
                    <path
                      d={d}
                      fill="none"
                      stroke="rgba(13, 148, 136, 0.22)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      opacity={0.9}
                    />
                    <path
                      d={d}
                      fill="none"
                      stroke="rgba(255,255,255,0.16)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      opacity={0.9}
                    />
                  </>
                ) : null}
                <path
                  d={d}
                  fill="none"
                  stroke={selectedRoute ? "url(#mcc-route-selected)" : routeColor}
                  strokeWidth={selectedRoute ? 2.45 : 1.6}
                  strokeLinecap="round"
                  strokeDasharray={routeDash}
                  opacity={routeOpacity}
                />
                {selectedRoute ? (
                  <circle
                    cx={bx}
                    cy={by}
                    r="2.1"
                    fill="rgba(16,185,129,0.95)"
                    stroke="rgba(11,15,20,0.20)"
                    strokeWidth="0.9"
                  />
                ) : null}
              </g>
            );
          })}
        </g>

        <g>
          {LOCATIONS.map((loc) => {
            const active = selectedId === loc.id;
            const dimmed = selectedId !== null && !active;
            const isUpcoming = loc.status === "upcoming";
            const logoOffset = logoOffsetForLocation(loc);

            return (
              <RsmMarker
                key={loc.id}
                coordinates={loc.coordinates as [number, number]}
                role="button"
                tabIndex={0}
                aria-label={markerAriaLabel(loc)}
                onMouseEnter={() => setHoveredId(loc.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(loc.id)}
                onBlur={() => setHoveredId(null)}
                onMouseDown={(e: any) => {
                  // Prevent the browser’s default SVG focus-rectangle on click/tap.
                  // Keyboard users still get focus via tab.
                  e.preventDefault();
                }}
                onClick={(e: any) => {
                  e.stopPropagation();
                  const nextId = active ? null : loc.id;
                  setSelectedId(nextId);
                }}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const nextId = active ? null : loc.id;
                    setSelectedId(nextId);
                  }
                }}
                style={{
                  cursor: "pointer",
                  opacity: dimmed ? 0.5 : 1,
                  outline: "none"
                }}
              >
                <g
                  transform={`translate(${markerOffsets[loc.id]?.[0] ?? 0}, ${markerOffsets[loc.id]?.[1] ?? 0})`}
                >
                  {loc.logoSrc ? (
                    <g
                      transform={`translate(${logoOffset[0]}, ${logoOffset[1]})`}
                      opacity={dimmed ? 0.72 : 0.98}
                    >
                      <path
                        d={logoConnectorPath(logoOffset)}
                        stroke={active ? "rgba(13,148,136,0.38)" : "rgba(125,141,161,0.30)"}
                        strokeWidth={1.2}
                        strokeLinecap="round"
                        fill="none"
                      />
                      <rect
                        x={-24}
                        y={-24}
                        width={48}
                        height={48}
                        rx={10}
                        fill="rgba(255,255,255,0.98)"
                        stroke={active ? "rgba(13,148,136,0.52)" : "rgba(172,184,200,0.9)"}
                        strokeWidth={active ? 1.2 : 0.95}
                      />
                      <image
                        href={loc.logoSrc}
                        x={-18}
                        y={-18}
                        width={36}
                        height={36}
                        preserveAspectRatio="xMidYMid meet"
                      />
                    </g>
                  ) : null}
                  {/* bigger hit target for dense city clusters */}
                  <circle r={14} fill="transparent" />
                  {loc.status === "home" ? (
                    <circle r={12.5} fill="none" stroke="rgba(11,15,20,0.14)" strokeWidth="1" />
                  ) : null}
                  {/* halo */}
                  <circle
                    r={10}
                    className={cn((isUpcoming || active) && "animate-pulse motion-reduce:animate-none")}
                    fill={
                      loc.status === "home"
                        ? "rgba(11,15,20,0.16)"
                        : loc.status === "past"
                          ? "rgba(21,122,106,0.20)"
                          : loc.status === "upcoming"
                            ? "rgba(27,143,160,0.22)"
                            : "rgba(116,133,160,0.18)"
                    }
                    opacity={active ? 0.95 : 0.78}
                  />
                  {/* main dot */}
                  <circle
                    r={loc.status === "home" ? (active ? 7.6 : 7) : active ? 6.1 : 5.5}
                    fill={
                      loc.status === "home"
                        ? "rgb(11,15,20)"
                        : loc.status === "past"
                          ? "rgb(17,105,92)"
                          : loc.status === "upcoming"
                            ? "rgb(240,252,255)"
                            : "rgb(234,241,249)"
                    }
                    stroke={
                      loc.status === "upcoming"
                        ? "rgba(14,89,100,0.58)"
                        : loc.status === "target"
                          ? "rgba(88,106,130,0.42)"
                          : "rgba(20,26,34,0.28)"
                    }
                    strokeWidth={active ? 1.35 : 1}
                    transform={active ? "scale(1.08)" : undefined}
                  />
                  {active ? (
                    <circle r={11.8} fill="none" stroke="rgba(13,148,136,0.45)" strokeWidth="1.05" />
                  ) : null}
                  {loc.status === "upcoming" ? (
                    <circle r={2.2} fill="rgb(14,89,100)" opacity={0.95} />
                  ) : null}

                  {/* tiny label hint on desktop hover */}
                  {hoveredId === loc.id ? (
                    <g transform="translate(0, 15)" opacity={0.95}>
                      <rect
                        x={-40}
                        y={0}
                        width={80}
                        height={18}
                        rx={9}
                        fill="rgba(255,255,255,0.9)"
                        stroke="rgba(214,220,230,0.9)"
                      />
                      <text
                        x={0}
                        y={13}
                        textAnchor="middle"
                        fontSize={10}
                        fontFamily="ui-sans-serif, system-ui"
                        fill="rgba(20,26,34,0.85)"
                      >
                        {loc.city}
                      </text>
                    </g>
                  ) : null}
                </g>
              </RsmMarker>
            );
          })}
        </g>
      </ZoomableGroup>
    </ComposableMap>
  );
}

export function CompetitionFootprint({ className }: { className?: string }) {
  const [selectedId, setSelectedId] = React.useState<string | null>("dublin");
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const selectedLoc = selectedId ? LOCATIONS.find((l) => l.id === selectedId) ?? null : null;
  // Keep the base projection stable; use the camera (center + zoom) for movement.
  // Re-projecting on selection causes visible “jumping” of pins.
  const projection = useProjection(null);
  const [lightbox, setLightbox] = React.useState<{ src: string; alt: string } | null>(null);
  const initialCenter = normalizeLngLat(
    (locById(selectedId) ?? locById("manchester"))?.coordinates ?? ([-2.2426, 53.4808] as const)
  );
  const [center, setCenter] = React.useState<LngLat>(initialCenter);
  const [zoom, setZoom] = React.useState(1);
  const [hasUserMoved, setHasUserMoved] = React.useState(false);
  const canZoomOut = zoom > 1.01;
  const canZoomIn = zoom < 2.74;

  // Default camera on spawn (and when projection refits), until the user manually pans/zooms.
  React.useEffect(() => {
    if (hasUserMoved) return;

    const includeSelectedTarget = selectedLoc?.status === "target" ? selectedId : null;
    const fitLocations = LOCATIONS.filter(
      (l) => l.status !== "target" || (includeSelectedTarget !== null && l.id === includeSelectedTarget)
    );
    const lngs = fitLocations.map((l) => l.coordinates[0]);
    const lats = fitLocations.map((l) => l.coordinates[1]);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const spanLng = Math.max(0.0001, maxLng - minLng);
    const spanLat = Math.max(0.0001, maxLat - minLat);

    const clustered = spanLng < 28 && spanLat < 14;
    const veryWide = spanLng > 90 || spanLat > 45;

    // Center on the footprint (slightly biased toward Manchester so it “reads” from home).
    const man = locById("manchester")?.coordinates ?? ([-2.2426, 53.4808] as const);
    const avg: LngLat = [
      (minLng + maxLng) / 2,
      (minLat + maxLat) / 2
    ];
    const bias = clustered ? 0.22 : 0.12;
    const nextCenter: LngLat = [
      avg[0] * (1 - bias) + man[0] * bias,
      avg[1] * (1 - bias) + man[1] * bias
    ];

    // Zoom: clustered → tighter; wide footprints → calmer.
    const nextZoom = clustered ? 1.28 : veryWide ? 1.02 : 1.12;

    setCenter(normalizeLngLat(nextCenter));
    setZoom(nextZoom);
  }, [hasUserMoved, selectedId, selectedLoc?.status, projection]);

  const hoveredCenter = hoveredId ? locById(hoveredId)?.coordinates ?? null : null;
  const centerTo = React.useCallback((next: LngLat, nextZoom?: number) => {
    setHasUserMoved(true);
    setCenter(normalizeLngLat(next));
    if (typeof nextZoom === "number") setZoom(nextZoom);
  }, []);

  return (
    <div className={cn(className)}>
      <Lightbox
        open={lightbox !== null}
        src={lightbox?.src ?? null}
        alt={lightbox?.alt ?? null}
        onClose={() => setLightbox(null)}
      />
      <div className="rounded-3xl border border-ink-200/80 bg-paper-50 p-3 shadow-[0_2px_24px_rgba(20,26,34,0.06)] sm:p-4">
        <div className="grid gap-4 md:grid-cols-[1.35fr_0.65fr] md:items-start">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-ink-200/70 bg-paper-100 sm:aspect-[21/10]">
            <div className="absolute inset-0">
              <RealWorldMap
                projection={projection}
                zoom={zoom}
                onZoomChange={(z) => {
                  setHasUserMoved(true);
                  setZoom(z);
                }}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                center={center}
                onCenterChange={(c) => {
                  setHasUserMoved(true);
                  setCenter(normalizeLngLat(c));
                }}
                onCenterTo={centerTo}
              />
            </div>

            {/* Corner label */}
            <div className="absolute left-3 top-3 rounded-full border border-ink-200/80 bg-white/85 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink-600 shadow-[0_1px_0_rgba(15,23,42,0.03)] backdrop-blur sm:left-4 sm:top-4">
              Club footprint
            </div>

            {/* Zoom controls (subtle, non-product UI) */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-ink-200/70 bg-white/72 px-2 py-2 shadow-[0_6px_20px_rgba(11,15,20,0.08)] backdrop-blur sm:bottom-4 sm:right-4 md:opacity-60 md:transition-opacity md:hover:opacity-100">
              <button
                type="button"
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-800 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-colors hover:bg-paper-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100",
                  !canZoomOut && "opacity-50 pointer-events-none"
                )}
                onClick={() => {
                  const focus = hoveredCenter ?? center;
                  centerTo(focus, Math.max(1, Math.round((zoom - 0.25) * 100) / 100));
                }}
                aria-label="Zoom out"
              >
                <span aria-hidden className="text-lg leading-none">
                  −
                </span>
              </button>
              <button
                type="button"
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-800 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-colors hover:bg-paper-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100",
                  !canZoomIn && "opacity-50 pointer-events-none"
                )}
                onClick={() => {
                  const focus = hoveredCenter ?? center;
                  centerTo(focus, Math.min(2.75, Math.round((zoom + 0.25) * 100) / 100));
                }}
                aria-label="Zoom in"
              >
                <span aria-hidden className="text-lg leading-none">
                  +
                </span>
              </button>
              <button
                type="button"
                className={cn(
                  "hidden sm:inline-flex h-9 items-center justify-center rounded-full border border-ink-200 bg-white px-3 text-xs font-medium tracking-tight text-ink-800 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-colors hover:bg-paper-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100",
                  !canZoomOut && "opacity-50"
                )}
                onClick={() => {
                  const base = (locById(selectedId) ?? locById("manchester"))?.coordinates ?? center;
                  centerTo(base, 1);
                }}
                aria-label="Reset zoom"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="md:sticky md:top-24">
            {selectedLoc ? (
              <DetailPanel
                loc={selectedLoc}
                onClose={() => setSelectedId(null)}
                onOpenImage={(src, alt) => setLightbox({ src, alt })}
              />
            ) : (
              <div className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-[0_14px_45px_rgba(11,15,20,0.08)]">
                <p className="text-sm text-ink-800">Tap a marker to see event details and photos.</p>
              </div>
            )}
          </div>
        </div>

        <Legend />
        <StatsStrip />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-700">
        Manchester is our base. The rest is momentum — competitions completed, upcoming stops, and the
        wider circuit we’re building toward.
      </p>
    </div>
  );
}

