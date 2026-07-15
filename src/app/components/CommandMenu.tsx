"use client";

import { CommandPalette } from "@/components/motion/command-palette";

export function CommandMenu() {
  return (
    <CommandPalette
      items={[
        { id: "home", label: "Home", group: "Navigate", onSelect: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "projects", label: "Projects", group: "Navigate", onSelect: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "about", label: "About", group: "Navigate", onSelect: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "skills", label: "Skills", group: "Navigate", onSelect: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "experience", label: "Experience", group: "Navigate", onSelect: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "achievements", label: "Achievements", group: "Navigate", onSelect: () => document.getElementById("achievements")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "contact", label: "Contact", group: "Navigate", onSelect: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "github", label: "GitHub", group: "Links", keywords: ["social"], onSelect: () => window.open("https://github.com/callmezaa", "_blank", "noopener,noreferrer") },
        { id: "linkedin", label: "LinkedIn", group: "Links", keywords: ["social"], onSelect: () => window.open("https://www.linkedin.com/in/ken-zamariyan-10b140318/", "_blank", "noopener,noreferrer") },
        { id: "email", label: "Email", group: "Links", keywords: ["social", "contact"], onSelect: () => { window.location.href = "mailto:kenzamariyan32@gmail.com"; } },
      ]}
    />
  );
}
