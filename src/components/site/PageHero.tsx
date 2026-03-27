"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { easePremium } from "@/components/motion/presets";
import { cn } from "@/lib/cn";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
}) {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.045,
        delayChildren: reduce ? 0 : 0.02
      }
    }
  };

  const item = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.52, ease: easePremium }
    }
  };

  return (
    <section className="relative border-b border-ink-200/70 bg-paper-100">
      <div className="pointer-events-none absolute inset-0 opacity-[0.22]">
        <div
          className={cn(
            "absolute inset-0",
            "bg-[linear-gradient(to_right,rgba(20,26,34,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,26,34,0.06)_1px,transparent_1px)]",
            "bg-[size:56px_56px]"
          )}
        />
      </div>
      <motion.div
        className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-18"
        variants={container}
        initial={false}
        animate="visible"
      >
        {eyebrow ? (
          <motion.div variants={item} className="mb-4">
            <div className="inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1">
              <span className="eyebrow">{eyebrow}</span>
            </div>
          </motion.div>
        ) : null}
        <motion.h1
          variants={item}
          className="heading font-serif text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl"
        >
          <span className="block max-w-[18ch]">{title}</span>
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-800 sm:text-lg"
        >
          {subtitle}
        </motion.p>
        {primaryCta || secondaryCta ? (
          <motion.div
            variants={item}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            {primaryCta ? (
              <ButtonLink href={primaryCta.href} variant="primary" size="md">
                {primaryCta.label}
              </ButtonLink>
            ) : null}
            {secondaryCta ? (
              <ButtonLink href={secondaryCta.href} variant="secondary" size="md">
                {secondaryCta.label}
              </ButtonLink>
            ) : null}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
