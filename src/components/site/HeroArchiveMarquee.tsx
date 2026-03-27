"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

export type HeroMarqueeImage = { src: string; alt: string };

/** Must match `animate-hero-marquee` duration in tailwind.config.ts. */
const MARQUEE_DURATION_S = 120;

function partitionIntoThreeRows<T>(items: readonly T[]): [T[], T[], T[]] {
  const a: T[] = [];
  const b: T[] = [];
  const c: T[] = [];
  items.forEach((item, i) => {
    if (i % 3 === 0) a.push(item);
    else if (i % 3 === 1) b.push(item);
    else c.push(item);
  });
  return [a, b, c];
}

/** Need ≥2 cards per row for seamless loop; duplicate singles. */
function ensureMarqueeSet(items: HeroMarqueeImage[]): HeroMarqueeImage[] {
  if (items.length === 0) return [];
  if (items.length === 1) return [items[0]!, items[0]!];
  return [...items];
}

function MarqueeRow({
  images,
  rowIndex,
  priorityOnFirstCard
}: {
  images: readonly HeroMarqueeImage[];
  rowIndex: number;
  priorityOnFirstCard: boolean;
}) {
  const set = ensureMarqueeSet([...images]);
  if (set.length === 0) return null;

  const cardClass =
    "group/card relative z-0 h-[8.25rem] w-[14rem] shrink-0 cursor-default overflow-hidden rounded-xl border border-ink-200/65 bg-paper-200 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-[box-shadow,border-color,transform,z-index] duration-300 ease-out will-change-transform hover:z-20 hover:scale-[1.04] hover:border-ink-300/85 hover:shadow-[0_12px_32px_rgba(20,26,34,0.14)] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:h-[8.5rem] sm:w-[14rem] lg:h-[9rem] lg:w-[15rem]";

  const phaseDelay = -(MARQUEE_DURATION_S / 3) * rowIndex;

  return (
    <div className="overflow-hidden px-1 py-1.5 sm:py-2" aria-hidden>
      <div
        className={cn(
          "flex w-max gap-3 will-change-transform sm:gap-3.5",
          "animate-hero-marquee motion-reduce:animate-none"
        )}
        style={{ animationDelay: `${phaseDelay}s` }}
      >
        {[0, 1].map((dup) =>
          set.map((img, i) => (
            <div key={`${dup}-${img.src}-${i}`} className={cardClass}>
              <Image
                src={img.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 45vw, 260px"
                className="object-cover transition-transform duration-300 ease-out motion-reduce:transition-none group-hover/card:scale-[1.08] motion-reduce:group-hover/card:scale-100"
                priority={priorityOnFirstCard && dup === 0 && i === 0}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function HeroArchiveMarquee({
  images,
  reducedMotion
}: {
  images: readonly HeroMarqueeImage[];
  reducedMotion: boolean;
}) {
  if (images.length === 0) return null;

  const [row0, row1, row2] = partitionIntoThreeRows(images);
  const mobileBase = ensureMarqueeSet([...images.slice(0, Math.min(images.length, 10))]);

  const cardClassStatic =
    "group/card relative z-0 h-[7.75rem] w-full shrink-0 cursor-default overflow-hidden rounded-xl border border-ink-200/65 bg-paper-200 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-[box-shadow,border-color,transform,z-index] duration-300 ease-out hover:z-20 hover:scale-[1.04] hover:border-ink-300/85 hover:shadow-[0_12px_32px_rgba(20,26,34,0.14)] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:h-[8.5rem] lg:h-[9rem]";

  if (reducedMotion) {
    return (
      <div
        role="region"
        aria-label="Archive photographs from competitions and training"
        className="relative overflow-hidden rounded-2xl border border-ink-200/70 bg-white p-3 shadow-[0_2px_40px_rgba(20,26,34,0.08)]"
      >
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {images.slice(0, 3).map((img) => (
            <div key={img.src} className={cardClassStatic}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover transition-transform duration-300 ease-out motion-reduce:transition-none group-hover/card:scale-[1.08] motion-reduce:group-hover/card:scale-100"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const rows = [
    { list: row0, key: "r0" },
    { list: row1, key: "r1" },
    { list: row2, key: "r2" }
  ];

  return (
    <>
      <div
        role="region"
        aria-label="Archive photographs from competitions and training"
        className="relative overflow-hidden rounded-2xl border border-ink-200/70 bg-paper-100/80 p-2.5 shadow-[0_2px_24px_rgba(20,26,34,0.07)] sm:hidden"
      >
        <div
          className={cn(
            "flex w-max gap-2.5 px-1 pb-0.5",
            !reducedMotion && "animate-hero-marquee motion-reduce:animate-none"
          )}
        >
          {[0, 1].map((dup) =>
            mobileBase.map((img, i) => (
              <div
                key={`${dup}-${img.src}-${i}`}
                className="group/card relative h-[8.5rem] w-[72vw] max-w-[17rem] shrink-0 overflow-hidden rounded-xl border border-ink-200/65 bg-paper-200 shadow-[0_1px_0_rgba(15,23,42,0.04)]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 72vw, 272px"
                  className="object-cover transition-transform duration-300 ease-out group-hover/card:scale-[1.04]"
                  priority={dup === 0 && i < 2}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div
        role="region"
        aria-label="Archive photographs from competitions and training"
        className="relative hidden overflow-hidden rounded-2xl border border-ink-200/70 bg-paper-100/80 py-3 shadow-[0_2px_30px_rgba(20,26,34,0.07)] sm:block sm:py-4 lg:py-5"
      >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-paper-100 via-paper-100/90 to-transparent sm:w-14"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-paper-100 via-paper-100/90 to-transparent sm:w-14"
        aria-hidden
      />

      <div className="flex flex-col gap-2.5 sm:gap-3">
        {rows.map(({ list, key }, idx) => (
          <div key={key} className={cn(idx > 0 ? "hidden sm:block" : "block")}>
            <MarqueeRow images={list} rowIndex={idx} priorityOnFirstCard={idx === 0} />
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
