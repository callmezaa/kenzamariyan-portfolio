import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/request";
import { getLocalizedExperience } from "@/i18n/data";
import type { Experience } from "@/app/data/experience";
import type { Project } from "@/app/data/projects";
import { getProjects } from "@/app/data/projects";
import ExperiencePage from "@/app/components/experience-page/ExperiencePage";
import type { EraProject } from "@/app/components/experience-page/ExperienceDossier";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Four eras of shipping — hackathon wins, production internships, and the foundations underneath. Highlights, stacks, and shipped output.",
  alternates: {
    canonical: "/experience",
  },
};

/** Maps a place-name fragment to the case studies shipped during that era. */
const ERA_PROJECT_MATCHERS: [string, string[]][] = [
  ["ContractChill", ["contract-chill"]],
  ["BIT Indonesia", ["gotani-pos"]],
  ["KPJMI", ["koperasi-kpjmi"]],
];

export default async function ExperienceRoute() {
  const locale = (await getLocale()) as Locale;
  const experiences: Experience[] = getLocalizedExperience(locale);

  const eraProjects: Record<number, EraProject[]> = {};
  experiences.forEach((era, i) => {
    const slugs = ERA_PROJECT_MATCHERS.filter(([needle]) =>
      era.place.includes(needle)
    ).flatMap(([, slugs]) => slugs);
    if (slugs.length > 0) {
      eraProjects[i] = slugs
        .map((slug) => getProjects("en").find((p) => p.slug === slug))
        .filter((p): p is Project => Boolean(p))
        .map((p) => ({ slug: p.slug, title: p.title }));
    }
  });

  return <ExperiencePage experiences={experiences} eraProjects={eraProjects} />;
}
