/** Premium, non-bouncy easing — calm deceleration. */
export const easePremium = [0.22, 1, 0.36, 1] as const;

/** Shared durations (seconds) for one motion language across the site. */
export const motionDuration = {
  hero: 0.58,
  section: 0.68,
  card: 0.45,
  micro: 0.22
} as const;

/** Stagger between hero text lines (seconds). */
export const heroStagger = 0.075;

/** Delay before right-side hero module (after left column begins). */
export const heroVisualDelay = 0.44;

/** Default in-view threshold (~15–25% visible). */
export const viewportReveal = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px"
} as const;

export const viewportTight = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -8% 0px"
} as const;
