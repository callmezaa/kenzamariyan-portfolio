import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/request";
import { getLocalizedTechArsenal, getLocalizedExperience } from "@/i18n/data";
import AboutPage from "@/app/components/about-page/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, principles, and journey of Ken Zamariyan — a Frontend & Mobile Product Engineer building production-grade digital platforms.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutRoute() {
  const locale = (await getLocale()) as Locale;

  return (
    <AboutPage
      techArsenal={getLocalizedTechArsenal(locale)}
      experiences={getLocalizedExperience(locale)}
    />
  );
}
