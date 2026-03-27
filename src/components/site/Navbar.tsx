"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

function useIsScrolled(threshold = 6) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

export function Navbar() {
  const pathname = usePathname();
  const isScrolled = useIsScrolled();
  const [open, setOpen] = useState(false);

  const nav = useMemo(() => siteConfig.nav, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-ink-200/70 bg-paper-100/85 backdrop-blur",
        isScrolled ? "shadow-hairline" : ""
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={siteConfig.name}>
          <span className="relative h-8 w-8 sm:hidden">
            <Image
              src="/mcc-square-mark.png"
              alt={siteConfig.name}
              fill
              sizes="32px"
              className="object-contain"
              priority
            />
          </span>
          <span className="relative hidden h-9 w-[180px] sm:block">
            <Image
              src="/brand/logo.png"
              alt={siteConfig.name}
              fill
              sizes="180px"
              className="object-contain object-left"
              priority
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium tracking-tight transition-colors",
                  active
                    ? "bg-white text-ink-950 ring-1 ring-ink-200"
                    : "text-ink-800 hover:bg-paper-200 hover:text-ink-950"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="/join" variant="primary" size="sm">
            Apply
          </ButtonLink>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-9 items-center justify-center rounded-full border border-ink-200 bg-white px-3 text-sm font-medium tracking-tight text-ink-900 hover:bg-paper-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="md:hidden border-t border-ink-200/70 bg-paper-100">
          <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
            <nav className="grid gap-1" aria-label="Mobile">
              {nav.map((l) => {
                const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-sm font-medium transition-colors",
                      active
                        ? "border-ink-200 bg-white text-ink-950"
                        : "border-transparent bg-transparent text-ink-800 hover:border-ink-200 hover:bg-paper-200 hover:text-ink-950"
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <div className="pt-2">
                <ButtonLink href="/join" variant="primary" size="md" className="w-full">
                  Apply
                </ButtonLink>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}

