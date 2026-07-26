import type { Locale } from "@/i18n/request";
import { experiencesEn } from "./en";
import { experiencesId } from "./id";

export type { Experience, ExperienceType } from "./en";

export const experiences = experiencesEn;

export function getExperience(locale: Locale) {
  return locale === "id" ? experiencesId : experiencesEn;
}
