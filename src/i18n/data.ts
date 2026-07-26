import type { Locale } from "./request";
import { getProjects } from "@/app/data/projects";
import { getExperience } from "@/app/data/experience";
import { getSkills } from "@/app/data/skillsData";
import { getTechArsenal } from "@/app/data/techArsenal";
import { getExplorations } from "@/app/data/explorations";

export function getLocalizedProjects(locale: Locale) {
  return getProjects(locale);
}
export function getLocalizedExperience(locale: Locale) {
  return getExperience(locale);
}
export function getLocalizedSkills(locale: Locale) {
  return getSkills(locale);
}
export function getLocalizedTechArsenal(locale: Locale) {
  return getTechArsenal(locale);
}
export function getLocalizedExplorations(locale: Locale) {
  return getExplorations(locale);
}
