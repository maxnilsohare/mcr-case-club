"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";
import { easePremium, viewportReveal } from "./presets";

export type RevealVariant = "fadeUp" | "fadeIn" | "scaleUp";

export function Reveal({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  hero = false,
  mode = "scroll",
  viewport
}: {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  /** Extra delay (seconds) before this block animates. */
  delay?: number;
  /** Softer, slightly faster motion (e.g. above-the-fold hero). */
  hero?: boolean;
  mode?: "scroll" | "mount";
  viewport?: typeof viewportReveal;
}) {
  const reduce = useReducedMotion();

  const yOffset = reduce ? 0 : hero ? 12 : 26;
  const duration = reduce ? 0 : hero ? 0.52 : 0.7;

  /* Opacity stays 1 so blocks are never invisible if whileInView/hydration fails. */
  const variants: Variants = {
    hidden: reduce
      ? { opacity: 1, y: 0, scale: 1 }
      : variant === "fadeIn"
        ? { opacity: 1, y: 10 }
        : variant === "scaleUp"
          ? { opacity: 1, y: 22, scale: 0.988 }
          : { opacity: 1, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: easePremium,
        delay: reduce ? 0 : delay
      }
    }
  };

  const props = {
    className: cn(className),
    variants,
    initial: "hidden" as const
  };

  if (mode === "mount") {
    return (
      <motion.div {...props} animate="visible">
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      {...props}
      whileInView="visible"
      viewport={viewport ?? viewportReveal}
    >
      {children}
    </motion.div>
  );
}
