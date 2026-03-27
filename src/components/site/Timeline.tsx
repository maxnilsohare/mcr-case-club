"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";
import { easePremium, viewportReveal } from "@/components/motion/presets";

export type TimelineItem = {
  title: string;
  description: string;
  meta?: string;
};

export function Timeline({
  items,
  className
}: {
  items: TimelineItem[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.09,
        delayChildren: reduce ? 0 : 0.03
      }
    }
  };

  const row: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.65, ease: easePremium }
    }
  };

  return (
    <motion.ol
      className={cn("relative grid gap-3", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
    >
      <div
        className="pointer-events-none absolute bottom-4 left-[22px] top-4 hidden w-px bg-gradient-to-b from-transparent via-ink-200 to-transparent sm:block"
        aria-hidden="true"
      />
      {items.map((it, idx) => (
        <motion.li
          key={`${it.title}-${idx}`}
          variants={row}
          className="relative"
        >
          <div className="rounded-2xl border border-ink-200 bg-white px-5 py-5 transition-colors hover:border-ink-300 sm:px-6">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-ink-200 bg-paper-100 text-sm font-semibold text-ink-950">
                  {idx + 1}
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <div className="heading text-base font-semibold">{it.title}</div>
                  {it.meta ? (
                    <div className="text-xs font-medium tracking-[0.14em] uppercase text-ink-700">
                      {it.meta}
                    </div>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-800 sm:text-base">
                  {it.description}
                </p>
              </div>
            </div>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}
