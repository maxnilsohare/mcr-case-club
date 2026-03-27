"use client";

import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Remounts page content when the route changes so Framer Motion state
 * (viewport / intersection observers) cannot carry over and strand a blank view.
 */
export function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      <main key={pathname} className="pt-14 sm:pt-16">
        {children}
      </main>
    </MotionConfig>
  );
}
