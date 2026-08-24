import type { Locale } from "@/i18n/request";
import { skillsDataEn } from "./en";
import { skillsDataId } from "./id";

export type { SkillItem, SkillCategory } from "./en";

/**
 * Locale-selected skills data for server components.
 * Never import this module from a client component.
 */
export function getSkills(locale: Locale) {
  return locale === "id" ? skillsDataId : skillsDataEn;
}
