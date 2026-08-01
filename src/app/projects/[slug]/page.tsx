import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { projects } from "@/app/data/projects";
import { getLocalizedProjects } from "@/i18n/data";
import type { Locale } from "@/i18n/request";
import ProjectDetail from "@/app/components/ProjectDetail";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const project = getLocalizedProjects(locale as Locale).find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Ken Zamariyan`,
      description: project.summary,
      url: `/projects/${slug}`,
      siteName: "Ken Zamariyan Portfolio",
      images: [
        {
          url: `/projects/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${project.title} — Ken Zamariyan`,
        },
      ],
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Ken Zamariyan`,
      description: project.summary,
      images: [`/projects/${slug}/opengraph-image`],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const project = getLocalizedProjects(locale as Locale).find((p) => p.slug === slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
