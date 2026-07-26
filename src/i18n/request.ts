import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { hasLocale } from "next-intl";
import { locales, defaultLocale, type Locale } from "./locales";

export type { Locale } from "./locales";
export { defaultLocale } from "./locales";

export function getLocaleFromCookie(cookieValue: string | undefined): Locale {
  if (cookieValue && hasLocale(locales, cookieValue)) {
    return cookieValue as Locale;
  }
  return defaultLocale;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore.get("NEXT_LOCALE")?.value);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
