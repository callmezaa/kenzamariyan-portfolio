import type { Locale } from "@/i18n/request";
import { projectsEn } from "./en";
import { projectsId } from "./id";

export type { Project, ProjectType } from "./en";

/**
 * Locale-selected project data for server components.
 * Never import this module from a client component — both locale
 * files would land in the JS bundle. Fetch here, pass as props.
 */
export function getProjects(locale: Locale) {
  return locale === "id" ? projectsId : projectsEn;
}
