"use client";

import { useTranslations } from "next-intl";
import { CommandPalette } from "@/components/motion/command-palette";

export function CommandMenu() {
  const tn = useTranslations("commandMenu");
  const cl = useTranslations("common");

  return (
    <CommandPalette
      items={[
        { id: "home", label: tn("home"), group: tn("groupNavigate"), onSelect: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "projects", label: tn("projects"), group: tn("groupNavigate"), onSelect: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "about", label: tn("about"), group: tn("groupNavigate"), onSelect: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "skills", label: tn("skills"), group: tn("groupNavigate"), onSelect: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "experience", label: tn("experience"), group: tn("groupNavigate"), onSelect: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "achievements", label: tn("achievements"), group: tn("groupNavigate"), onSelect: () => document.getElementById("achievements")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "contact", label: tn("contact"), group: tn("groupNavigate"), onSelect: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "github", label: cl("gitHub"), group: tn("groupLinks"), keywords: ["social"], onSelect: () => window.open("https://github.com/callmezaa", "_blank", "noopener,noreferrer") },
        { id: "linkedin", label: cl("linkedin"), group: tn("groupLinks"), keywords: ["social"], onSelect: () => window.open("https://www.linkedin.com/in/ken-zamariyan-10b140318/", "_blank", "noopener,noreferrer") },
        { id: "email", label: tn("email"), group: tn("groupLinks"), keywords: ["social", "contact"], onSelect: () => { window.location.href = "mailto:kenzamariyan32@gmail.com"; } },
      ]}
    />
  );
}
