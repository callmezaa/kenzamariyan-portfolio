"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { CommandPalette } from "@/components/motion/command-palette";

export function CommandMenu() {
  const tn = useTranslations("commandMenu");
  const cl = useTranslations("common");
  const router = useRouter();

  return (
    <CommandPalette
      items={[
        { id: "home", label: tn("home"), group: tn("groupNavigate"), onSelect: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) },
        { id: "projects", label: tn("projects"), group: tn("groupNavigate"), onSelect: () => router.push("/projects") },
        { id: "about", label: tn("about"), group: tn("groupNavigate"), onSelect: () => router.push("/about") },
        { id: "skills", label: tn("skills"), group: tn("groupNavigate"), onSelect: () => router.push("/skills") },
        { id: "experience", label: tn("experience"), group: tn("groupNavigate"), onSelect: () => router.push("/experience") },
        { id: "achievements", label: tn("achievements"), group: tn("groupNavigate"), onSelect: () => router.push("/achievements") },
        { id: "contact", label: tn("contact"), group: tn("groupNavigate"), onSelect: () => router.push("/contact") },
        { id: "github", label: cl("gitHub"), group: tn("groupLinks"), keywords: ["social"], onSelect: () => window.open("https://github.com/callmezaa", "_blank", "noopener,noreferrer") },
        { id: "linkedin", label: cl("linkedin"), group: tn("groupLinks"), keywords: ["social"], onSelect: () => window.open("https://www.linkedin.com/in/ken-zamariyan-10b140318/", "_blank", "noopener,noreferrer") },
        { id: "email", label: tn("email"), group: tn("groupLinks"), keywords: ["social", "contact"], onSelect: () => { window.location.href = "mailto:kenzamariyan32@gmail.com"; } },
      ]}
    />
  );
}
