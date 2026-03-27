"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { HeroAmbientBackground } from "@/components/site/HeroAmbientBackground";
import { HeroArchiveMarquee, type HeroMarqueeImage } from "@/components/site/HeroArchiveMarquee";
import {
  easePremium,
  heroStagger,
  heroVisualDelay,
  motionDuration
} from "@/components/motion/presets";

export type HomeHeroProofItem = { text: string };

export type HomeHeroMarqueeImage = HeroMarqueeImage;

export function HomeHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  proofItems,
  marqueeImages
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  proofItems: readonly HomeHeroProofItem[];
  marqueeImages: readonly HomeHeroMarqueeImage[];
}) {
  const reduce = useReducedMotion();
  const reduced = Boolean(reduce);

  const leftContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : heroStagger,
        delayChildren: 0
      }
    }
  };

  const heroLine: Variants = {
    hidden: reduced
      ? { opacity: 1, y: 0 }
      : { opacity: 1, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: motionDuration.hero, ease: easePremium }
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-ink-200/70 bg-paper-100">
      <HeroAmbientBackground reducedMotion={reduced} />

      <motion.div
        className="relative mx-auto grid w-full max-w-7xl gap-9 px-4 py-10 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:items-center xl:gap-14"
        initial={false}
        animate="visible"
      >
        <motion.div
          className="lg:col-span-5"
          variants={leftContainer}
          initial="hidden"
          animate="visible"
        >
          {eyebrow ? (
            <motion.div variants={heroLine} className="mb-5">
              <span className="eyebrow inline-block rounded-full border border-ink-200/90 bg-white/90 px-3.5 py-1.5 text-ink-700 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-[box-shadow,border-color] duration-300 ease-out hover:border-ink-300/90 hover:shadow-[0_4px_20px_rgba(20,26,34,0.06)]">
                {eyebrow}
              </span>
            </motion.div>
          ) : null}
          <motion.h1
            variants={heroLine}
            className="heading font-serif text-balance text-[2.05rem] font-semibold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={heroLine}
            className="mt-4 max-w-full pr-1 text-pretty text-[0.98rem] leading-relaxed text-ink-800 [overflow-wrap:anywhere] sm:mt-5 sm:max-w-xl sm:pr-0 sm:text-lg"
          >
            {subtitle}
          </motion.p>
          {primaryCta || secondaryCta ? (
            <motion.div
              variants={heroLine}
              className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3"
            >
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className="relative inline-flex h-10 min-w-[7.75rem] items-center justify-center rounded-full border border-accent-800 bg-accent-800 px-4 text-sm font-semibold leading-none tracking-tight text-white shadow-[0_1px_0_rgba(15,23,42,0.08)] transition-[color,background-color,border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-900 hover:bg-accent-900 hover:shadow-[0_6px_20px_rgba(21,74,65,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100 active:translate-y-0 active:scale-[0.99] motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 sm:h-11 sm:min-w-[8.5rem] sm:px-5"
                >
                  <span className="relative z-[1] inline-flex items-center justify-center">
                    {primaryCta.label}
                  </span>
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="relative inline-flex h-10 min-w-[7.75rem] items-center justify-center rounded-full border border-ink-300 bg-white px-4 text-sm font-semibold leading-none tracking-tight text-ink-950 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-[color,background-color,border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-ink-400 hover:bg-paper-200 hover:shadow-[0_4px_16px_rgba(20,26,34,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100 active:translate-y-0 active:scale-[0.99] motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 sm:h-11 sm:min-w-[8.5rem] sm:px-5"
                >
                  <span className="relative z-[1] inline-flex items-center justify-center">
                    {secondaryCta.label}
                  </span>
                </Link>
              ) : null}
            </motion.div>
          ) : null}
          {proofItems.length > 0 ? (
            <motion.div
              variants={heroLine}
              className="mt-7 border-t border-ink-200/80 pt-5 sm:mt-8 sm:pt-6"
            >
              <p className="mb-2.5 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-ink-500">
                Recent momentum
              </p>
              <p className="flex flex-wrap gap-y-1.5 text-sm leading-relaxed text-ink-800">
                {proofItems.map((p, i) => (
                  <span key={p.text}>
                    {i > 0 ? <span className="mx-2.5 text-ink-300">·</span> : null}
                    <span className="font-medium">{p.text}</span>
                  </span>
                ))}
              </p>
            </motion.div>
          ) : null}
        </motion.div>

        <motion.div
          className="relative min-h-0 lg:col-span-7"
          initial={
            reduced
              ? false
              : {
                  opacity: 1,
                  y: 22,
                  scale: 0.988
                }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: reduced ? 0 : motionDuration.hero,
            delay: reduced ? 0 : heroVisualDelay,
            ease: easePremium
          }}
        >
          <HeroArchiveMarquee images={marqueeImages} reducedMotion={reduced} />
        </motion.div>
      </motion.div>
    </section>
  );
}
