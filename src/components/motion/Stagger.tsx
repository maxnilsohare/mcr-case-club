"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";
import { easePremium, viewportReveal } from "./presets";

export function StaggerContainer({
  children,
  className,
  stagger = 0.085,
  delayChildren = 0.05,
  viewport
}: {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child (seconds). */
  stagger?: number;
  delayChildren?: number;
  viewport?: typeof viewportReveal;
}) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delayChildren
      }
    }
  };

  return (
    <motion.div
      className={cn(className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? viewportReveal}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "default"
}: {
  children: React.ReactNode;
  className?: string;
  /** Slight scale for larger feature surfaces. */
  variant?: "default" | "scale";
}) {
  const reduce = useReducedMotion();

  const y = reduce ? 0 : 20;

  /* Keep opacity at 1 so content is never invisible if whileInView/hydration fails. */
  const item: Variants =
    variant === "scale" && !reduce
      ? {
          hidden: { opacity: 1, y: 22, scale: 0.988 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.68, ease: easePremium }
          }
        }
      : {
          hidden: { opacity: 1, y: reduce ? 0 : y },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: reduce ? 0 : 0.68, ease: easePremium }
          }
        };

  return (
    <motion.div variants={item} className={cn(className)}>
      {children}
    </motion.div>
  );
}
