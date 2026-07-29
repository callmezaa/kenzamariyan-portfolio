"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { staggerContainer, staggerItem } from "@/app/utils/animations";

interface SiteMapProps {
  siteMap: {
    userRoles: { role: string; description: string; needs: string; icon: string }[];
    userFlow: { step: string; detail: string }[];
    siteArchitecture: { section: string; type: string; description: string }[];
  };
  accent: { glow: string; color: string };
}

export default function SiteMapSection({ siteMap, accent }: SiteMapProps) {
  const t = useTranslations("projectDetail");

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="space-y-10"
    >
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("userRoles")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {siteMap.userRoles.map((role) => (
            <Accordion key={role.role}>
              <AccordionItem value={role.role} className="border border-border rounded-xl overflow-hidden px-4">
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{role.icon}</span>
                    <div className="text-left">
                      <p className="body-base font-medium text-foreground">{role.role}</p>
                      <p className="body-small text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="body-small text-muted-foreground">{role.needs}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </motion.section>

      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("userFlow")}</h3>
        <div className="space-y-2">
          {siteMap.userFlow.map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
              <div
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: accent.color, color: "#fff" }}
              >
                <span className="text-xs font-bold">{i + 1}</span>
              </div>
              <div>
                <p className="body-base font-medium text-foreground">{item.step}</p>
                <p className="body-small text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("siteArchitecture")}</h3>
        <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
          {siteMap.siteArchitecture.map((sec) => (
            <div key={sec.section} className="px-4 py-3 flex items-start gap-3">
              <code className="mono-sm text-foreground flex-shrink-0 bg-muted px-1.5 py-0.5 rounded">{sec.section}</code>
              <div>
                <p className="body-small text-muted-foreground">{sec.description}</p>
                <p className="mono-sm text-muted-foreground/60 mt-0.5">{sec.type}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
