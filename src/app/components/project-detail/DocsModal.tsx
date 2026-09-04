"use client";

import type { ReactElement } from "react";
import { useTranslations } from "next-intl";
import type { Project } from "../../data/projects";
import {
  CenterMorphModal,
  CenterMorphModalTrigger,
  CenterMorphModalContent,
} from "@/components/motion/center-morph-modal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/motion/tabs";
import ArchitectureSection from "./ArchitectureSection";
import AIPipelineSection from "./AIPipelineSection";
import SiteMapSection from "./SiteMapSection";
import TechnicalSection from "./TechnicalSection";

interface DocsModalProps {
  project: Project;
  /** Single interactive element that opens the modal. */
  trigger: ReactElement;
  /** Accessible name for the dialog. Defaults to "<title> — docs". */
  ariaLabel?: string;
}

/**
 * Technical documentation in a structured modal (no page navigation):
 * architecture, AI pipeline / site map, and code — whichever data exists.
 */
export function DocsModal({ project, trigger, ariaLabel }: DocsModalProps) {
  const t = useTranslations("projectDetail");
  const pipelineLabel = project.aiPipeline ? t("aiPipeline") : t("siteMap");

  const tabs: { value: string; label: string }[] = [];
  if (project.architecture && project.diagram) {
    tabs.push({ value: "architecture", label: t("architecture") });
  }
  if (project.aiPipeline || project.siteMap) {
    tabs.push({ value: "aiPipeline", label: pipelineLabel });
  }
  if (project.codeSnippets && project.architecture) {
    tabs.push({ value: "technical", label: t("technical") });
  }
  if (tabs.length === 0) return null;

  return (
    <CenterMorphModal>
      <CenterMorphModalTrigger>{trigger}</CenterMorphModalTrigger>
      <CenterMorphModalContent
        ariaLabel={ariaLabel ?? `${project.title} — ${t("docs")}`}
        className="w-[calc(100vw-2rem)] max-w-3xl"
      >
        <div className="max-h-[80dvh] overflow-y-auto p-6 pt-12 md:p-8 md:pt-12">
          <p className="label text-muted-foreground">{t("docs")}</p>
          <h2 className="mt-1 text-balance text-xl font-semibold tracking-[-0.01em] text-foreground md:text-2xl">
            {project.title}
          </h2>

          <Tabs defaultValue={tabs[0].value} variant="pill" className="mt-5">
            <div className="overflow-x-auto pb-1">
              <TabsList className="w-max max-w-none">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {project.architecture && project.diagram && (
              <TabsContent value="architecture">
                <ArchitectureSection
                  architecture={project.architecture}
                  diagram={project.diagram}
                  accent={project.accent}
                />
              </TabsContent>
            )}
            {project.aiPipeline && (
              <TabsContent value="aiPipeline">
                <AIPipelineSection
                  aiPipeline={project.aiPipeline}
                  accent={project.accent}
                />
              </TabsContent>
            )}
            {project.siteMap && (
              <TabsContent value="aiPipeline">
                <SiteMapSection
                  siteMap={project.siteMap}
                  accent={project.accent}
                />
              </TabsContent>
            )}
            {project.codeSnippets && project.architecture && (
              <TabsContent value="technical">
                <TechnicalSection
                  endpoints={project.architecture.endpoints}
                  codeSnippets={project.codeSnippets}
                  accent={project.accent}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </CenterMorphModalContent>
    </CenterMorphModal>
  );
}
