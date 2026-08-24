import type { Locale } from "@/i18n/request";
import { explorationsEn } from "./en";
import { explorationsId } from "./id";

export type { Exploration } from "./en";

/**
 * Locale-selected exploration data for server components.
 * Never import this module from a client component.
 */
export function getExplorations(locale: Locale) {
  return locale === "id" ? explorationsId : explorationsEn;
}
