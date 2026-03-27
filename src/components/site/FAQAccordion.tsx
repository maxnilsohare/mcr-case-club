"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { easePremium, viewportReveal } from "@/components/motion/presets";

export type FAQItem = {
  q: string;
  a: string;
};

export function FAQAccordion({
  items,
  className
}: {
  items: FAQItem[];
  className?: string;
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.02
      }
    }
  };

  const row: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: easePremium }
    }
  };

  return (
    <motion.div
      className={cn("grid gap-3", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
    >
      {items.map((it, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `${baseId}-btn-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;

        return (
          <motion.div
            key={`${it.q}-${idx}`}
            variants={row}
            className="rounded-2xl border border-ink-200 bg-white"
          >
            <button
              id={buttonId}
              type="button"
              className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left sm:px-6"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex((v) => (v === idx ? null : idx))}
            >
              <span className="text-sm font-semibold text-ink-950 sm:text-base">
                {it.q}
              </span>
              <span
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full border border-ink-200 text-ink-900 transition-colors",
                  isOpen ? "bg-paper-200" : "bg-white"
                )}
                aria-hidden="true"
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn("px-5 pb-4 sm:px-6", isOpen ? "block" : "hidden")}
            >
              <p className="text-sm leading-relaxed text-ink-800 sm:text-base">
                {it.a}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
