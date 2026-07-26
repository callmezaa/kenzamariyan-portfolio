"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { staggerContainer, staggerItem } from "@/app/utils/animations";
import { Server, Monitor, Package } from "lucide-react";

interface ArchitectureProps {
  architecture: {
    monorepo: { name: string; tech: string; description: string }[];
    decisions: { decision: string; reason: string }[];
    endpoints: { method: string; path: string; auth: boolean; rate: string; purpose: string }[];
    dataFlow: string[];
    deployment: string[];
  };
  accent: { glow: string; color: string };
}

const ICONS: Record<string, React.ReactNode> = {
  "client/": <Monitor size={16} />,
  "server/": <Server size={16} />,
  "shared/": <Package size={16} />,
};

export default function ArchitectureSection({ architecture, accent }: ArchitectureProps) {
  const t = useTranslations("projectDetail");

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="space-y-10"
    >
      {/* Monorepo Structure */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("monorepoStructure")}</h3>
        <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
          {architecture.monorepo.map((item) => (
            <Accordion key={item.name}>
              <AccordionItem value={item.name} className="border-none">
                <AccordionTrigger className="px-4 py-3 hover:no-underline w-full">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{ICONS[item.name] || <Package size={16} />}</span>
                    <span className="mono-sm text-foreground">{item.name}</span>
                    <span className="body-small text-muted-foreground ml-auto">{item.tech}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <p className="body-small text-muted-foreground pl-7">{item.description}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </motion.section>

      {/* System Architecture Diagram */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("systemArchitecture")}</h3>
        <div className="rounded-xl border border-border bg-canvas-card p-6 space-y-4">
          {/* Frontend Layer */}
          <div className="rounded-lg border border-border p-4 text-center" style={{ boxShadow: `0 0 20px ${accent.glow}` }}>
            <p className="button-cap text-foreground mb-1">FRONTEND (React SPA)</p>
            <p className="body-small text-muted-foreground">React 19 · Vite 8 · TanStack Query · Firebase Web SDK · i18next · PWA</p>
          </div>
          {/* Arrow */}
          <div className="flex justify-center">
            <div className="text-muted-foreground body-small flex flex-col items-center gap-1">
              <span>↓</span>
              <span className="mono-sm">axios + Firebase ID Token</span>
              <span>↓</span>
            </div>
          </div>
          {/* Backend Layer */}
          <div className="rounded-lg border border-border p-4 text-center" style={{ boxShadow: `0 0 20px ${accent.glow}` }}>
            <p className="button-cap text-foreground mb-1">BACKEND (Express 5 API)</p>
            <p className="body-small text-muted-foreground">Multer · Rate Limiting · Helmet/CORS · Firebase Admin · Zod Validation</p>
          </div>
          {/* Arrow */}
          <div className="flex justify-center">
            <div className="text-muted-foreground body-small flex flex-col items-center gap-1">
              <span>↓</span>
            </div>
          </div>
          {/* External Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="button-cap text-foreground mb-1">Gemini AI API</p>
              <p className="body-small text-muted-foreground">gemini-2.5-flash · Structured JSON · Persona prompts</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="button-cap text-foreground mb-1">Firestore</p>
              <p className="body-small text-muted-foreground">analyses/{'{docId}'} · userId, fileName, persona, result, fileUrl</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Data Flow */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("dataFlow")}</h3>
        <div className="space-y-2">
          {architecture.dataFlow.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center">
                <span className="mono-sm text-muted-foreground">{i + 1}</span>
              </div>
              <p className="body-small text-muted-foreground pt-0.5">{step}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Deployment */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("deployment")}</h3>
        <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
          {architecture.deployment.map((stage, i) => (
            <div key={i} className="px-4 py-3 flex items-start gap-3">
              <span className="mono-sm text-muted-foreground flex-shrink-0 w-16">Stage {i + 1}</span>
              <span className="body-small text-foreground">{stage}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Architecture Decisions */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("architectureDecisions")}</h3>
        <div className="space-y-2">
          {architecture.decisions.map((item, i) => (
            <Accordion key={i}>
              <AccordionItem value={`decision-${i}`} className="border border-border rounded-xl overflow-hidden px-4">
                <AccordionTrigger className="hover:no-underline py-3">
                  <span className="body-base text-foreground text-left">{item.decision}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <p className="body-small text-muted-foreground">{item.reason}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
