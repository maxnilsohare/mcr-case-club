"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { easePremium, viewportReveal } from "@/components/motion/presets";
import type { CompetitionHighlight, CompetitionHoverPhoto } from "@/content/competitionHighlights";
import { cn } from "@/lib/cn";

function extraHoverPhotos(item: CompetitionHighlight): readonly CompetitionHoverPhoto[] {
  const raw = item.hoverPhotos ?? [];
  if (!item.featuredImageSrc) return raw;
  return raw.filter((p) => p.src !== item.featuredImageSrc);
}

/** Primary + up to two secondary tiles — same layout for featured and participation. */
function collagePhotosFromItem(item: CompetitionHighlight): {
  primary: { src: string; alt: string } | null;
  secondary: readonly { src: string; alt: string }[];
} {
  const extras = extraHoverPhotos(item);
  if (item.featuredImageSrc) {
    const fromHover = (item.hoverPhotos ?? []).find((p) => p.src === item.featuredImageSrc);
    return {
      primary: {
        src: item.featuredImageSrc,
        alt: fromHover?.alt ?? `${item.competition} — ${item.result}`
      },
      secondary: extras.slice(0, 2)
    };
  }
  const raw = item.hoverPhotos ?? [];
  if (raw.length === 0) return { primary: null, secondary: [] };
  const [first, ...rest] = raw;
  return {
    primary: { src: first.src, alt: first.alt },
    secondary: rest.slice(0, 2)
  };
}

const IMG_EASE =
  "object-cover transition-transform duration-300 ease-out motion-reduce:transition-none group-hover/tile:scale-[1.08] motion-reduce:group-hover/tile:scale-100";

function CollageFrames({
  primary,
  secondary,
  wideLayout,
  sizesPrimary,
  sizesSecondary,
  sizesSecondarySingle
}: {
  primary: { src: string; alt: string };
  secondary: readonly { src: string; alt: string }[];
  /** Full-row card: use horizontal space without growing image block height like a 3× wider stacked collage */
  wideLayout?: boolean;
  sizesPrimary: string;
  sizesSecondary: string;
  sizesSecondarySingle: string;
}) {
  const sec = secondary.slice(0, 2);

  /** When there is no bottom row, match total height of the 1+2 collage: 16/10 top + two 5/4 half-width tiles → W:H = 40:41 */
  const primaryAspectNarrow = sec.length === 0 ? "aspect-[40/41]" : "aspect-[16/10]";

  /* —— Wide row: lg+ only differs; below lg matches narrow layout —— */
  if (wideLayout && sec.length === 0) {
    return (
      <div className="group/tile relative aspect-[21/9] w-full overflow-hidden bg-paper-200">
        <Image src={primary.src} alt={primary.alt} fill sizes={sizesPrimary} className={IMG_EASE} />
      </div>
    );
  }

  if (wideLayout && sec.length === 1) {
    return (
      <div className="grid grid-cols-1 gap-px bg-ink-200/50 lg:grid-cols-2">
        <div className="group/tile relative aspect-[16/10] w-full overflow-hidden bg-paper-200">
          <Image src={primary.src} alt={primary.alt} fill sizes={sizesPrimary} className={IMG_EASE} />
        </div>
        <div className="group/tile relative aspect-[16/10] w-full overflow-hidden bg-paper-100">
          <Image src={sec[0].src} alt={sec[0].alt} fill sizes={sizesSecondarySingle} className={IMG_EASE} />
        </div>
      </div>
    );
  }

  if (wideLayout && sec.length === 2) {
    return (
      <>
        <div className="max-lg:block lg:hidden">
          <CollageFrames
            primary={primary}
            secondary={secondary}
            wideLayout={false}
            sizesPrimary={sizesPrimary}
            sizesSecondary={sizesSecondary}
            sizesSecondarySingle={sizesSecondarySingle}
          />
        </div>
        <div className="hidden gap-px bg-ink-200/50 lg:grid lg:grid-cols-3">
          {[primary, sec[0], sec[1]].map((p) => (
            <div
              key={p.src}
              className="group/tile relative aspect-[5/4] w-full overflow-hidden bg-paper-100 first:bg-paper-200"
            >
              <Image src={p.src} alt={p.alt} fill sizes={sizesSecondary} className={IMG_EASE} />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={cn(
          "group/tile relative w-full overflow-hidden bg-paper-200",
          primaryAspectNarrow
        )}
      >
        <Image src={primary.src} alt={primary.alt} fill sizes={sizesPrimary} className={IMG_EASE} />
      </div>
      {sec.length > 0 ? (
        <div
          className={cn(
            "grid gap-px bg-ink-200/50",
            sec.length === 1 ? "grid-cols-1" : "grid-cols-2"
          )}
        >
          {sec.map((p) => (
            <div
              key={p.src}
              className={cn(
                "group/tile relative overflow-hidden bg-paper-100",
                sec.length === 1 ? "aspect-[16/9] sm:aspect-[2/1]" : "aspect-[5/4]"
              )}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={sec.length === 1 ? sizesSecondarySingle : sizesSecondary}
                className={IMG_EASE}
              />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

function LogoMark({ item, size = "sm" }: { item: CompetitionHighlight; size?: "sm" | "md" }) {
  const label = item.logoAbbr ?? item.competition;
  const box =
    size === "sm"
      ? "h-11 w-11 sm:h-12 sm:w-12"
      : "h-[3.25rem] w-[3.25rem] sm:h-14 sm:w-14";
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-ink-200/70 bg-white",
        box,
        "shadow-[0_1px_0_rgba(15,23,42,0.04)]"
      )}
    >
      {item.logoSrc ? (
        <div className="absolute inset-0 p-2">
          <div className="relative h-full w-full min-h-0">
            <Image
              src={item.logoSrc}
              alt=""
              fill
              sizes="56px"
              className="object-contain object-center"
            />
          </div>
        </div>
      ) : (
        <span className="select-none px-1 text-center font-serif text-[0.58rem] font-semibold leading-tight tracking-tight text-ink-800 sm:text-[0.65rem]">
          {label}
        </span>
      )}
    </div>
  );
}

/** Standout results only — orphan last row fills the row (Participation never spans; three cards stay one row at lg) */
function featuredGridSpanClass(index: number, total: number) {
  if (index !== total - 1) return "";
  return cn(
    total % 2 === 1 && "sm:col-span-2",
    total % 3 === 1 && "lg:col-span-3"
  );
}

/** Last item is alone on its row in the lg 3-column grid — span full width and use a wide collage */
function itemUsesWideCollage(index: number, total: number) {
  return index === total - 1 && total % 3 === 1;
}

function HighlightCollageCard({
  item,
  wideLayout
}: {
  item: CompetitionHighlight;
  wideLayout?: boolean;
}) {
  const reduce = useReducedMotion();
  const { primary, secondary } = collagePhotosFromItem(item);

  const reveal = reduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: easePremium }
        }
      };

  return (
    <article className="group/part relative z-0 flex h-fit cursor-default flex-col overflow-hidden rounded-xl border border-ink-200/60 bg-white shadow-[0_1px_0_rgba(15,23,42,0.03)] transition-[box-shadow,border-color,transform,z-index] duration-300 ease-out hover:z-20 hover:scale-[1.01] hover:border-ink-300/85 hover:shadow-[0_10px_28px_rgba(20,26,34,0.09)] motion-reduce:transition-none motion-reduce:hover:scale-100">
      <div className="flex items-center gap-2.5 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3.5">
        <LogoMark item={item} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-ink-600">
              {item.competition}
            </p>
            <p className="shrink-0 text-[0.65rem] font-medium tabular-nums text-ink-500">
              {item.date}
            </p>
          </div>
          <p className="mt-0.5 text-[0.93rem] font-medium leading-snug text-ink-950 sm:text-sm">
            {item.result}
          </p>
        </div>
      </div>

      {primary ? (
        <motion.div
          className="border-t border-ink-200/55 bg-paper-100"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportReveal}
        >
          <CollageFrames
            primary={primary}
            secondary={secondary}
            wideLayout={wideLayout}
            sizesPrimary={
              wideLayout
                ? "(max-width: 1024px) 100vw, 90vw"
                : "(max-width: 1024px) 100vw, 33vw"
            }
            sizesSecondary={
              wideLayout ? "(max-width: 1024px) 50vw, 30vw" : "(max-width: 1024px) 50vw, 16vw"
            }
            sizesSecondarySingle={
              wideLayout
                ? "(max-width: 1024px) 100vw, 45vw"
                : "(max-width: 1024px) 100vw, 33vw"
            }
          />
        </motion.div>
      ) : null}
    </article>
  );
}

export function CompetitionHighlights({ items }: { items: readonly CompetitionHighlight[] }) {
  const featured = items.filter((i) => i.tier === "featured");
  const participation = items.filter((i) => i.tier === "participation");

  return (
    <div className="space-y-8 sm:space-y-12">
      {featured.length > 0 ? (
        <Reveal variant="fadeUp" className="block">
          <p className="mb-3 text-[0.63rem] font-medium uppercase tracking-[0.16em] text-ink-500 sm:mb-4">
            Standout results
          </p>
          <StaggerContainer
            className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3"
            stagger={0.06}
            delayChildren={0.02}
          >
            {featured.map((item, index) => (
              <StaggerItem
                key={item.id}
                className={cn("min-w-0 self-start", featuredGridSpanClass(index, featured.length))}
              >
                <HighlightCollageCard
                  item={item}
                  wideLayout={itemUsesWideCollage(index, featured.length)}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Reveal>
      ) : null}

      {participation.length > 0 ? (
        <Reveal variant="fadeUp" className="block" delay={0.04}>
          <div className="border-t border-ink-200/70 pt-7 sm:pt-10">
            <p className="mb-3 text-[0.63rem] font-medium uppercase tracking-[0.16em] text-ink-500 sm:mb-4">
              Participation
            </p>
            <StaggerContainer
              className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3"
              stagger={0.06}
              delayChildren={0.02}
            >
              {participation.map((item) => (
                <StaggerItem key={item.id} className="min-w-0 self-start">
                  <HighlightCollageCard item={item} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
