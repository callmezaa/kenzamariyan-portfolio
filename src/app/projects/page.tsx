import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/request";
import { getLocalizedProjects } from "@/i18n/data";
import AllProjects from "@/app/components/AllProjects";

export const metadata: Metadata = {
  title: "All Projects",
  description:
    "A curated collection of full-stack projects spanning web applications, mobile apps, and AI-powered tools.",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const locale = (await getLocale()) as Locale;
  const projects = getLocalizedProjects(locale);

  return (
    <main id="main-content">
      <AllProjects projects={projects} />
    </main>
  );
}
