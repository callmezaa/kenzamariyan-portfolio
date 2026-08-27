import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/request";
import { getLocalizedProjects } from "@/i18n/data";
import Image from "next/image";
import AllProjects from "@/app/components/AllProjects";
import { PageHero } from "@/app/components/page-hero/PageHero";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "All Projects",
  description:
    "A curated collection of full-stack projects spanning web applications, mobile apps, and AI-powered tools.",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("projects");
  const projects = getLocalizedProjects(locale);

  return (
    <main id="main-content">
      <PageHero
        variant="grid"
        compact
        centered
        kicker={t("label")}
        lines={[t("heading")]}
        tagline={t("tagline")}
      />
      <AllProjects projects={projects} />

      {/* CTA — premium ambient chrome */}
      <section className="px-6 md:px-8 pb-24 md:pb-32">
        <Reveal variant="rise">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/[0.08] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6),0_8px_32px_rgba(0,0,0,0.4)] isolate">
            {/* Background image */}
            <Image
              src="/ambient_bg.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover object-center"
              priority={false}
            />
            {/* Legibility overlays — subtle, keep chrome detail visible */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/5"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"
            />
            {/* Soft vignette for depth */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(255,255,255,0.06), transparent 60%)",
              }}
            />

            {/* Content */}
            <div className="relative flex flex-col items-center gap-5 px-8 py-16 text-center md:px-16 md:py-20">
              <h2 className="display-lg max-w-2xl text-balance text-white [text-wrap:balance]">
                {t("ctaHeading")}
              </h2>
              <p className="body-base max-w-md text-balance text-white/70">
                {t("ctaSub")}
              </p>
              <div className="pt-3">
                <TransitionLink href="/contact">
                  <Button
                    size="lg"
                    className="rounded-full bg-white px-8 text-sm font-medium tracking-wide text-black shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all hover:bg-zinc-100 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
                  >
                    {t("ctaButton")} <ArrowRight size={14} data-icon="inline-end" />
                  </Button>
                </TransitionLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
