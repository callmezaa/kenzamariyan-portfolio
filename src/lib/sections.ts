/**
 * Home-page section ids in visual render order (src/app/page.tsx).
 *
 * Single source of truth for every navigation surface — keyboard hotkeys,
 * the floating dock, active-section tracking — so they can never drift
 * apart when sections are added or removed.
 */
export const SECTION_IDS = [
  "home",
  "projects",
  "about",
  "skills",
  "experience",
  "achievements",
  "exploration",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
