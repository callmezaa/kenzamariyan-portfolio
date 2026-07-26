import type { Locale } from "@/i18n/request";
import { skillsDataEn } from "./en";
import { skillsDataId } from "./id";

export type { SkillItem, SkillCategory } from "./en";

export const skillsData = skillsDataEn;

export function getSkills(locale: Locale) {
  return locale === "id" ? skillsDataId : skillsDataEn;
}
