"use client";

import { cn } from "@/lib/cn";

const NODE_STYLE = [
  { top: "12%", left: "8%" },
  { top: "22%", left: "72%" },
  { top: "38%", left: "18%" },
  { top: "55%", left: "88%" },
  { top: "68%", left: "42%" },
  { top: "78%", left: "12%" },
  { top: "18%", left: "52%" },
  { top: "48%", left: "62%" }
];

export function HeroAmbientBackground({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.17]"
        aria-hidden
      >
        <div
          className={cn(
            "absolute inset-0",
            "bg-[linear-gradient(to_right,rgba(20,26,34,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,26,34,0.05)_1px,transparent_1px)]",
            "bg-[size:56px_56px]"
          )}
        />
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-[0.45]",
          !reducedMotion && "animate-ambient-drift motion-reduce:animate-none"
        )}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_70%_15%,rgba(46,154,134,0.09),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_75%,rgba(20,26,34,0.05),transparent_55%)]" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-[8%] top-[28%] h-px bg-gradient-to-r from-transparent via-ink-300/25 to-transparent"
        aria-hidden
      />

      {NODE_STYLE.map((pos, i) => (
        <div
          key={i}
          className={cn(
            "pointer-events-none absolute h-[3px] w-[3px] rounded-full bg-ink-500/30 shadow-[0_0_0_1px_rgba(20,26,34,0.06)]",
            !reducedMotion && "animate-ambient-node motion-reduce:animate-none"
          )}
          style={{
            ...pos,
            animationDelay: reducedMotion ? undefined : `${i * 1.1}s`
          }}
          aria-hidden
        />
      ))}

      <div
        className="pointer-events-none absolute -right-20 top-0 h-[min(72vh,540px)] w-[min(100vw,520px)] bg-gradient-to-bl from-[rgba(46,154,134,0.065)] via-transparent to-transparent blur-3xl"
        aria-hidden
      />
    </>
  );
}
