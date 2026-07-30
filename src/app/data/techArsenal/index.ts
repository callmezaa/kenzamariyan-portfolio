import type { Locale } from "@/i18n/request";
import { techArsenalEn } from "./en";
import { techArsenalId } from "./id";

export type { TechItem } from "./en";
export type Category = (typeof categories)[number];

export const techArsenal = techArsenalEn;

export const categories = [
  "Frontend",
  "Backend",
  "Mobile",
  "Database & Infrastructure",
] as const;

export function getTechArsenal(locale: Locale) {
  return locale === "id" ? techArsenalId : techArsenalEn;
}
