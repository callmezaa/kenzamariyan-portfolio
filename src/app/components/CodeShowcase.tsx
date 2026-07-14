"use client";

import { useState, useMemo, useCallback } from "react";
import { codeSnippets } from "../data/codeSnippets";
import { Check, Copy, ChevronLeft, ChevronRight, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const DISPLAY_LANG: Record<string, string> = {
  typescript: "TypeScript",
  go: "Go",
};

export default function CodeShowcase() {
  const snippets = useMemo(
    () => Object.entries(codeSnippets).map(([project, s]) => ({ project, ...s })),
    [],
  );

  const languages = useMemo(
    () => ["All", ...new Set(snippets.map((s) => s.language))],
    [snippets],
  );

  const [activeLang, setActiveLang] = useState("All");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(
    () =>
      activeLang === "All"
        ? snippets
        : snippets.filter((s) => s.language === activeLang),
    [activeLang, snippets],
  );

  const current = filtered[index] || filtered[0];

  const handleTabChange = useCallback((value: string) => {
    setActiveLang(value);
    setIndex(0);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!current) return;
    try {
      await navigator.clipboard.writeText(current.code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = current.code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [current]);

  if (!current) return null;

  const codeLines = current.code.split("\n");
  const highlightLines = current.highlightLines || [];

  return (
    <section id="code" className="bg-canvas-alt py-24 md:py-28">
      <div className="mx-auto max-w-4xl px-6 md:px-8 space-y-8">
        <div className="space-y-2 text-center">
          <p className="label text-muted-foreground">Real Code</p>
          <h2 className="display-xl">Production Snippets</h2>
          <p className="body-base text-muted-foreground max-w-xl mx-auto">
            Key modules from projects I&rsquo;ve built — architectures, APIs, and system design.
          </p>
        </div>

        <Tabs value={activeLang} onValueChange={handleTabChange}>
          <TabsList className="w-full justify-center md:w-auto mx-auto">
            {languages.map((lang) => (
              <TabsTrigger key={lang} value={lang} className="flex-1 md:flex-none px-5">
                {lang === "All" ? "All" : DISPLAY_LANG[lang] || lang}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeLang} className="pt-6">
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/50">
                <div className="flex items-center gap-2 min-w-0">
                  <Code2 size={14} className="text-muted-foreground shrink-0" />
                  <span className="body-small text-muted-foreground truncate">
                    {current.project}
                  </span>
                  <span className="body-small text-muted-foreground/50 hidden sm:inline">
                    ·
                  </span>
                  <span className="body-small text-muted-foreground/70 hidden sm:inline font-mono">
                    {current.filename}
                  </span>
                </div>
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground"
                >
                  {copied ? (
                    <>
                      <Check size={12} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </Button>
              </div>

              {/* Code */}
              <ScrollArea className="h-[360px] w-full">
                <pre className="p-4 font-mono text-sm leading-relaxed text-foreground overflow-x-auto">
                  <code>
                    {codeLines.map((line, i) => (
                      <div
                        key={i}
                        className={`${
                          highlightLines.includes(i + 1)
                            ? "bg-muted/80 -mx-4 px-4 border-l-2 border-foreground/20"
                            : ""
                        }`}
                      >
                        {line || "\u00A0"}
                      </div>
                    ))}
                  </code>
                </pre>
              </ScrollArea>
            </div>

            {/* Navigation */}
            {filtered.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  disabled={index === 0}
                  variant="outline"
                  size="icon-sm"
                  className="rounded-full"
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="body-small text-muted-foreground tabular-nums">
                  {index + 1} / {filtered.length}
                </span>
                <Button
                  onClick={() => setIndex((i) => Math.min(filtered.length - 1, i + 1))}
                  disabled={index === filtered.length - 1}
                  variant="outline"
                  size="icon-sm"
                  className="rounded-full"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
