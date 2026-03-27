import Image from "next/image";
import { cn } from "@/lib/cn";

export type CompetitionPhoto = { src: string; alt: string };

export function CompetitionPhotoGrid({
  photos,
  className
}: {
  photos: readonly CompetitionPhoto[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 md:grid-cols-4 md:gap-3",
        className
      )}
    >
      {photos.map((p) => (
        <figure
          key={p.src}
          className="group relative overflow-hidden rounded-xl border border-ink-200/55 bg-paper-200 shadow-[0_1px_0_rgba(15,23,42,0.04)]"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={p.src}
              alt={p.alt}
              fill
              unoptimized={p.src.startsWith("/api/")}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
