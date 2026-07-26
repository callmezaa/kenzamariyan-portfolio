"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/app/utils/animations";
import { Check, Copy, Shield, AlertTriangle, Code } from "lucide-react";

interface TechnicalProps {
  endpoints: { method: string; path: string; auth: boolean; rate: string; purpose: string }[];
  codeSnippets: { title: string; language: string; code: string; reason: string }[];
  accent: { glow: string; color: string };
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border border-border bg-muted/50 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border">
        <span className="mono-sm text-muted-foreground">{language}</span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleCopy}
          className="h-6 w-6"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </Button>
      </div>
      <pre className="p-3 overflow-x-auto text-xs leading-relaxed">
        <code className="text-foreground">{code}</code>
      </pre>
    </div>
  );
}

export default function TechnicalSection({ endpoints, codeSnippets, accent }: TechnicalProps) {
  const t = useTranslations("projectDetail");

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="space-y-10"
    >
      {/* API Design */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("apiDesign")}</h3>
        <div className="rounded-xl border border-border overflow-hidden" style={{ boxShadow: `0 0 20px ${accent.glow}` }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2.5 text-left mono-sm text-muted-foreground font-medium">{t("method")}</th>
                  <th className="px-4 py-2.5 text-left mono-sm text-muted-foreground font-medium">{t("endpoint")}</th>
                  <th className="px-4 py-2.5 text-left mono-sm text-muted-foreground font-medium">{t("auth")}</th>
                  <th className="px-4 py-2.5 text-left mono-sm text-muted-foreground font-medium">{t("rateLimit")}</th>
                  <th className="px-4 py-2.5 text-left mono-sm text-muted-foreground font-medium">{t("purpose")}</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((ep, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-4 py-2.5">
                      <span className={cn("mono-sm px-1.5 py-0.5 rounded text-xs font-medium",
                        ep.method === "POST" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" :
                        ep.method === "GET" ? "bg-green-500/10 text-green-600 dark:text-green-400" :
                        "bg-muted text-foreground"
                      )}>
                        {ep.method}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 mono-sm text-foreground">{ep.path}</td>
                    <td className="px-4 py-2.5">
                      {ep.auth ? (
                        <Shield size={14} className="text-green-500" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 body-small text-muted-foreground">{ep.rate}</td>
                    <td className="px-4 py-2.5 body-small text-muted-foreground">{ep.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* Security & Auth */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("securityAuth")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { icon: <Shield size={16} />, title: "Firebase Auth", desc: "Email/Password + Google Popup — zero server-side session management" },
            { icon: <Shield size={16} />, title: "Token Verification", desc: "Firebase Admin verifyIdToken on every API request" },
            { icon: <Shield size={16} />, title: "Axios Interceptor", desc: "Auto-attaches Bearer token, handles 401/429/500 responses" },
            { icon: <Shield size={16} />, title: "Security Headers", desc: "Helmet + CORS + express-rate-limit protection" },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-border p-4 flex items-start gap-3">
              <span className="text-muted-foreground mt-0.5">{item.icon}</span>
              <div>
                <p className="body-base font-medium text-foreground">{item.title}</p>
                <p className="body-small text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Error Handling */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("errorHandling")}</h3>
        <div className="rounded-xl border border-border p-4 space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="text-muted-foreground mt-0.5" />
            <div>
              <p className="body-base font-medium text-foreground">{t("errorHandlingPatternTitle")}</p>
              <p className="body-small text-muted-foreground">{t("errorHandlingPatternDesc")}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Key Code Snippets */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("keyCodeSnippets")}</h3>
        <div className="space-y-4">
          {codeSnippets.map((snippet, i) => (
            <Accordion key={i}>
              <AccordionItem value={`snippet-${i}`} className="border border-border rounded-xl overflow-hidden px-4">
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-3">
                    <Code size={16} className="text-muted-foreground" />
                    <span className="body-base text-foreground text-left">{snippet.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-3 space-y-3">
                  <CodeBlock code={snippet.code} language={snippet.language} />
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="body-small text-muted-foreground">
                      <span className="font-medium text-foreground">{t("whyThisMatters")}:</span> {snippet.reason}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
