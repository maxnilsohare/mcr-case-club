import Image from "next/image";
import type { CompanyLogoFile } from "@/lib/companyLogos";
import { cn } from "@/lib/cn";

export function CompanyLogoStrip({
  logos,
  className
}: {
  logos: CompanyLogoFile[];
  className?: string;
}) {
  if (logos.length === 0) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-2 justify-items-center gap-2.5 sm:gap-3 md:gap-3.5",
        "sm:grid-cols-[repeat(auto-fit,minmax(6.25rem,1fr))]",
        className
      )}
      aria-label="Organisations members have connections with"
    >
      {logos.map((logo) => (
        <div
          key={logo.src}
          className="relative aspect-square w-full max-w-[18rem] overflow-hidden rounded-lg border border-ink-200/70 bg-white shadow-[0_2px_10px_rgba(20,26,34,0.06)] transition-[box-shadow,transform,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-ink-300/80 hover:shadow-[0_6px_22px_rgba(20,26,34,0.1)] motion-reduce:transition-shadow motion-reduce:hover:translate-y-0"
          title={logo.alt}
        >
          <div className="absolute inset-0 p-2 sm:p-2.5 md:p-3">
            <div className="relative h-full w-full min-h-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="(max-width: 640px) 45vw, 288px"
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
