import type { Locale } from "@/i18n/request";
import { experiencesEn } from "./en";
import { experiencesId } from "./id";

export type { Experience, ExperienceType } from "./en";

/**
 * Locale-selected experience data for server components.
 * Never import this module from a client component.
 */
export function getExperience(locale: Locale) {
  return locale === "id" ? experiencesId : experiencesEn;
}
