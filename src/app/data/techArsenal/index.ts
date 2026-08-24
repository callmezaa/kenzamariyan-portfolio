import type { Locale } from "@/i18n/request";
import { techArsenalEn } from "./en";
import { techArsenalId } from "./id";

export type { TechItem } from "./en";

/**
 * Locale-selected tech arsenal data for server components.
 * Never import this module from a client component — both locale
 * files would land in the JS bundle. Fetch here, pass as props.
 */
export function getTechArsenal(locale: Locale) {
  return locale === "id" ? techArsenalId : techArsenalEn;
}
