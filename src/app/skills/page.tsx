import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/request";
import { getLocalizedSkills, getLocalizedProjects } from "@/i18n/data";
import type { SkillCategory } from "@/app/data/skillsData";
import type { Project } from "@/app/data/projects";
import SkillsPage from "@/app/components/skills-page/SkillsPage";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Twenty-four technologies across frontend, APIs, systems, and AI tooling — with real case studies where each one shipped.",
  alternates: {
    canonical: "/skills",
  },
};

/** Project stack names that refer to a skill under a different spelling. */
const SKILL_ALIASES: Record<string, string[]> = {
  "Next.js": ["Next.js 16"],
  "Go (Gin & Fiber)": ["Go", "Gin", "Fiber"],
  "Gemini / OpenAI API": ["Google Gemini AI"],
};

function relatedProjects(skillName: string, projects: Project[]): { slug: string; title: string }[] {
  const needles = [skillName, ...(SKILL_ALIASES[skillName] ?? [])].map((s) =>
    s.toLowerCase()
  );
  return projects
    .filter((p) => p.stack.some((tech) => needles.includes(tech.toLowerCase())))
    .map((p) => ({ slug: p.slug, title: p.title }));
}

export default async function SkillsRoute() {
  const locale = (await getLocale()) as Locale;
  const skills: SkillCategory[] = getLocalizedSkills(locale);
  const projects: Project[] = getLocalizedProjects(locale);

  const related: Record<string, { slug: string; title: string }[]> = {};
  for (const cat of skills) {
    for (const skill of cat.skills) {
      related[skill.name] = relatedProjects(skill.name, projects);
    }
  }

  return <SkillsPage skills={skills} related={related} />;
}
