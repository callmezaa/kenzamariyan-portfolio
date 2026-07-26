"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { staggerContainer, staggerItem } from "@/app/utils/animations";

interface AIPipelineProps {
  aiPipeline: {
    personas: { name: string; tone: string; example: string; icon: string }[];
    riskFormula: { high: number; medium: number; cap: number };
    extractionFlow: { step: string; detail: string }[];
    outputSchema: { field: string; type: string; description: string }[];
  };
  accent: { glow: string; color: string };
}

export default function AIPipelineSection({ aiPipeline, accent }: AIPipelineProps) {
  const t = useTranslations("projectDetail");

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="space-y-10"
    >
      {/* The 4 Personas */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("the4Personas")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiPipeline.personas.map((persona) => (
            <Accordion key={persona.name}>
              <AccordionItem value={persona.name} className="border border-border rounded-xl overflow-hidden px-4">
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{persona.icon}</span>
                    <div className="text-left">
                      <p className="body-base font-medium text-foreground">{persona.name}</p>
                      <p className="body-small text-muted-foreground">{persona.tone}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="body-small text-muted-foreground italic">&ldquo;{persona.example}&rdquo;</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </motion.section>

      {/* Text Extraction Pipeline */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("textExtraction")}</h3>
        <div className="space-y-2">
          {aiPipeline.extractionFlow.map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center">
                <span className="mono-sm text-muted-foreground">{i + 1}</span>
              </div>
              <div>
                <p className="body-base font-medium text-foreground">{item.step}</p>
                <p className="body-small text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Risk Scoring Algorithm */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("riskScoring")}</h3>
        <div className="rounded-xl border border-border bg-canvas-card p-6 space-y-4" style={{ boxShadow: `0 0 20px ${accent.glow}` }}>
          <div className="text-center space-y-2">
            <p className="mono-sm text-foreground">
              Score = (High Risk × {aiPipeline.riskFormula.high}) + (Medium Risk × {aiPipeline.riskFormula.medium})
            </p>
            <p className="body-small text-muted-foreground">Capped at {aiPipeline.riskFormula.cap}%</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
              <p className="mono-sm text-green-600 dark:text-green-400">0-29%</p>
              <p className="body-small text-muted-foreground">{t("safe")}</p>
            </div>
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-center">
              <p className="mono-sm text-amber-600 dark:text-amber-400">30-59%</p>
              <p className="body-small text-muted-foreground">{t("mediumRisk")}</p>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-center">
              <p className="mono-sm text-red-600 dark:text-red-400">60-100%</p>
              <p className="body-small text-muted-foreground">{t("highRisk")}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Output Schema */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("outputSchema")}</h3>
        <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
          {aiPipeline.outputSchema.map((field) => (
            <div key={field.field} className="px-4 py-3 flex items-start gap-3">
              <code className="mono-sm text-foreground flex-shrink-0 bg-muted px-1.5 py-0.5 rounded">{field.field}</code>
              <div>
                <p className="body-small text-muted-foreground">{field.description}</p>
                <p className="mono-sm text-muted-foreground/60 mt-0.5">{field.type}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
