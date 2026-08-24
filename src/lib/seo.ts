import { SITE_URL } from "@/lib/site";
import type { Project } from "@/app/data/projects";

/** Canonical identity — single source of truth for structured data. */
export const IDENTITY = {
  name: "Ken Zamariyan",
  jobTitle: "Frontend & Mobile Product Engineer",
  email: "kenzamariyan32@gmail.com",
  url: SITE_URL,
  sameAs: [
    "https://github.com/callmezaa",
    "https://www.linkedin.com/in/ken-zamariyan",
    "https://wa.me/6285878221758",
  ],
} as const;

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: IDENTITY.name,
    jobTitle: IDENTITY.jobTitle,
    url: IDENTITY.url,
    email: `mailto:${IDENTITY.email}`,
    sameAs: [...IDENTITY.sameAs],
  };
}

/** Person + WebSite graph mounted once from the root layout. */
export function siteGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${IDENTITY.name} — Portfolio`,
        description:
          "Portfolio and case studies of a frontend & mobile product engineer.",
        inLanguage: ["en", "id"],
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

/** CreativeWork + BreadcrumbList for a case-study page. */
export function projectSchemas(project: Project, locale: string) {
  const pageUrl = absoluteUrl(`/projects/${project.slug}`);
  const ogImage = absoluteUrl(`/projects/${project.slug}/opengraph-image`);

  return [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      headline: project.title,
      description: project.summary,
      url: pageUrl,
      image: ogImage,
      datePublished: project.year,
      inLanguage: locale,
      keywords: project.stack.join(", "),
      author: { "@id": `${SITE_URL}/#person` },
      creator: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: absoluteUrl("/projects"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title,
          item: pageUrl,
        },
      ],
    },
  ];
}
