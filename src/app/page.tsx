import { getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/request";
import {
  getLocalizedProjects,
  getLocalizedSkills,
  getLocalizedTechArsenal,
  getLocalizedExperience,
  getLocalizedExplorations,
} from "@/i18n/data";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Exploration from "./components/Exploration";
import Contact from "./components/Contact";

export default async function Home() {
  // Data is selected per-locale here, on the server, so only one locale's
  // content crosses the RSC boundary — client bundles stay lean.
  const locale = (await getLocale()) as Locale;
  // Home grid shows the 6 featured case studies; the full set lives on /projects.
  const projects = getLocalizedProjects(locale).filter((p) => p.featured);
  const skills = getLocalizedSkills(locale);
  const techArsenal = getLocalizedTechArsenal(locale);
  const experiences = getLocalizedExperience(locale);
  const explorations = getLocalizedExplorations(locale);

  return (
    <main id="main-content" className="min-h-dvh">
      <Hero />
      <Projects projects={projects} />
      <About projectCount={projects.length} techArsenal={techArsenal} />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Achievements />
      <Exploration items={explorations} />
      <Contact />
    </main>
  );
}
