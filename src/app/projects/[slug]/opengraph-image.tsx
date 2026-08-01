import { ImageResponse } from "next/og";
import { getLocale } from "next-intl/server";
import { getLocalizedProjects } from "@/i18n/data";
import { SITE_HOSTNAME } from "@/lib/site";
import type { Locale } from "@/i18n/request";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const project = getLocalizedProjects(locale as Locale).find((p) => p.slug === slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#09090b",
            color: "#f4f4f5",
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          Project not found
        </div>
      ),
      size
    );
  }

  const accentColor = project.accent.color;
  const techStack = project.stack.slice(0, 5);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          color: "#f4f4f5",
          background: `linear-gradient(135deg, #09090b 0%, #0f172a 52%, ${accentColor}22 100%)`,
          fontFamily: "Arial",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, color: accentColor, fontWeight: 700 }}>kenzamariyan.</div>
          <div style={{ fontSize: 20, color: "#a1a1aa" }}>{project.role}</div>
        </div>

        {/* Center content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 56, lineHeight: 1.1, fontWeight: 800, maxWidth: 900 }}>
              {project.title}
            </div>
            {project.badge && (
              <div
                style={{
                  border: `1px solid ${accentColor}44`,
                  borderRadius: 999,
                  padding: "8px 18px",
                  color: accentColor,
                  background: `${accentColor}15`,
                  fontSize: 18,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {project.badge}
              </div>
            )}
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.4, color: "#94a3b8", maxWidth: 900 }}>
            {project.summary.length > 160 ? project.summary.slice(0, 160) + "..." : project.summary}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {techStack.map((tech) => (
              <div
                key={tech}
                style={{
                  border: `1px solid ${accentColor}33`,
                  borderRadius: 999,
                  padding: "10px 18px",
                  color: "#e2e8f0",
                  background: `${accentColor}10`,
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 18, color: "#64748b" }}>{SITE_HOSTNAME}</div>
        </div>
      </div>
    ),
    size
  );
}
