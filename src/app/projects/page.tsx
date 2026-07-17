import type { Metadata } from "next";
import AllProjects from "@/app/components/AllProjects";

export const metadata: Metadata = {
  title: "All Projects | Ken Zamariyan",
  description:
    "A curated collection of full-stack projects spanning web applications, mobile apps, and AI-powered tools.",
};

export default function ProjectsPage() {
  return (
    <main id="main-content">
      <AllProjects />
    </main>
  );
}
