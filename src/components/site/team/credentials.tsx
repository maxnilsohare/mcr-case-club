import Image from "next/image";
import { cn } from "@/lib/cn";

export type CredentialItem = { name: string; logoSrc: string };

type PillSize = "md" | "sm";

const logoImgClassMd =
  "object-contain p-1.5 opacity-[0.86] saturate-[0.8] contrast-[0.98]";

const logoImgClassSm = "object-contain p-1 opacity-[0.86] saturate-[0.8] contrast-[0.98]";

export function CredentialLogoPill({
  item,
  variant,
  size = "md"
}: {
  item: CredentialItem;
  variant: "onDark" | "onLight";
  size?: PillSize;
}) {
  const isSm = size === "sm";

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden border",
        isSm
          ? "h-7 w-[3.375rem] rounded-md"
          : "h-8 w-[4.75rem] rounded-lg",
        variant === "onDark"
          ? isSm
            ? "border-white/12 bg-white/[0.91]"
            : "border-white/18 bg-white/[0.94] shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[2px]"
          : "border-ink-200/80 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]"
      )}
      title={item.name}
    >
      <Image
        src={item.logoSrc}
        alt={item.name}
        fill
        sizes={isSm ? "64px" : "80px"}
        className={isSm ? logoImgClassSm : logoImgClassMd}
      />
    </div>
  );
}

function CredentialLabel({
  children,
  variant,
  compact
}: {
  children: React.ReactNode;
  variant: "onDark" | "onLight";
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "font-medium uppercase",
        compact
          ? "text-[0.5rem] tracking-[0.14em]"
          : "text-[0.6rem] tracking-[0.2em]",
        variant === "onDark"
          ? compact
            ? "text-white/45"
            : "text-white/70"
          : "text-ink-500"
      )}
    >
      {children}
    </div>
  );
}

export function CredentialGroups({
  experience,
  competitions,
  variant,
  maxExperience = 2,
  maxCompetitions = 4,
  compact = false
}: {
  experience: CredentialItem[];
  competitions: CredentialItem[];
  variant: "onDark" | "onLight";
  maxExperience?: number;
  maxCompetitions?: number;
  /** Tighter strip for leadership image cards */
  compact?: boolean;
}) {
  const exp = experience.slice(0, maxExperience);
  const comp = competitions.slice(0, maxCompetitions);
  const pillSize: PillSize = compact ? "sm" : "md";

  if (exp.length === 0 && comp.length === 0) return null;

  const gapBetweenGroups = compact ? "gap-2" : "gap-3";
  const labelRowGap = compact ? "gap-1" : "gap-1.5";
  const pillGap = compact ? "gap-1" : "gap-1.5";

  return (
    <div className={cn("flex flex-col", gapBetweenGroups)}>
      {exp.length > 0 ? (
        <div className={cn("flex flex-col", labelRowGap)}>
          <CredentialLabel variant={variant} compact={compact}>
            Experience
          </CredentialLabel>
          <div className={cn("flex flex-wrap items-end", pillGap)}>
            {exp.map((item) => (
              <CredentialLogoPill
                key={`${item.name}-${item.logoSrc}`}
                item={item}
                variant={variant}
                size={pillSize}
              />
            ))}
          </div>
        </div>
      ) : null}
      {comp.length > 0 ? (
        <div className={cn("flex flex-col", labelRowGap)}>
          <CredentialLabel variant={variant} compact={compact}>
            Competitions
          </CredentialLabel>
          <div className={cn("flex flex-wrap items-end", pillGap)}>
            {comp.map((item) => (
              <CredentialLogoPill
                key={`${item.name}-${item.logoSrc}`}
                item={item}
                variant={variant}
                size={pillSize}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
