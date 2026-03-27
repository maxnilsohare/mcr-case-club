"use client";

import { motion, useReducedMotion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { ButtonLink } from "@/components/ui/Button";
import { easePremium, viewportReveal } from "@/components/motion/presets";

export function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
  children
}: {
  title: string;
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-ink-200/70 bg-paper-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-ink-200 bg-white px-6 py-10 sm:px-10"
          initial={
            reduce
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 1, y: 24, scale: 0.988 }
          }
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewportReveal}
          transition={{ duration: reduce ? 0 : 0.72, ease: easePremium }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.28]"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(46,154,134,0.10),transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(20,26,34,0.06),transparent_45%)]" />
          </div>

          <StaggerContainer
            className="relative"
            stagger={0.06}
            delayChildren={0.04}
            viewport={viewportReveal}
          >
            <StaggerItem>
              <div className="max-w-3xl">
                <h2 className="heading font-serif text-balance text-2xl font-semibold sm:text-3xl">
                  {title}
                </h2>
                <p className="mt-3 text-pretty text-base leading-relaxed text-ink-800 sm:text-lg">
                  {description}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={primaryCta.href} variant="primary" size="md">
                  {primaryCta.label}
                </ButtonLink>
                {secondaryCta ? (
                  <ButtonLink href={secondaryCta.href} variant="secondary" size="md">
                    {secondaryCta.label}
                  </ButtonLink>
                ) : null}
              </div>
            </StaggerItem>
            {children ? (
              <StaggerItem>
                <div className="mt-7">{children}</div>
              </StaggerItem>
            ) : null}
          </StaggerContainer>
        </motion.div>
      </div>
    </section>
  );
}
