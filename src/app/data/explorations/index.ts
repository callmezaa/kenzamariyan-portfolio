import type { Locale } from "@/i18n/request";
import { explorationsEn } from "./en";
import { explorationsId } from "./id";

export type { Exploration } from "./en";

export const explorations = explorationsEn;

export function getExplorations(locale: Locale) {
  return locale === "id" ? explorationsId : explorationsEn;
}
