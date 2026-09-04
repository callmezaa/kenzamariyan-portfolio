"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import type { Project } from "../data/projects";
import { PROJECT_HERO_IMAGES } from "../data/projectImages";
import { easeOut } from "../utils/animations";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { FeatureZigzag } from "./project-detail/FeatureZigzag";
import { DocsModal } from "./project-detail/DocsModal";

const screenshots: Record<string, { src: string; label: string }[]> = {
  "koperasi-kpjmi": [
    { src: "/image/koperasi-kpjmi/homepage.png", label: "Homepage" },
    { src: "/image/koperasi-kpjmi/tentangkami.png", label: "Tentang Kami" },
    { src: "/image/koperasi-kpjmi/visidanmisi.png", label: "Visi & Misi" },
    { src: "/image/koperasi-kpjmi/produksi.png", label: "Produksi & Distribusi" },
    { src: "/image/koperasi-kpjmi/product.png", label: "Produk" },
    { src: "/image/koperasi-kpjmi/gallery.png", label: "Galeri" },
    { src: "/image/koperasi-kpjmi/contact.png", label: "Kontak" },
  ],
  "contract-chill": [
    { src: "/image/contract-chill/screenshot/homepage.png", label: "Homepage" },
    { src: "/image/contract-chill/screenshot/analysizpage.png", label: "Analysis" },
    { src: "/image/contract-chill/screenshot/howitsworkpage.png", label: "How It Works" },
    { src: "/image/contract-chill/screenshot/contractgeneratorpage.png", label: "Contract Generator" },
    { src: "/image/contract-chill/screenshot/CTApage.png", label: "CTA" },
    { src: "/image/contract-chill/screenshot/historypage.png", label: "History" },
    { src: "/image/contract-chill/screenshot/livedemopage.png", label: "Live Demo" },
    { src: "/image/contract-chill/screenshot/dashboardpage.png", label: "Dashboard" },
    { src: "/image/contract-chill/screenshot/loginpage.png", label: "Login" },
  ],
  interviewos: [
    { src: "/image/interviewOS/featuressection.png", label: "Features" },
    { src: "/image/interviewOS/interviewroom.png", label: "Interview Room" },
    { src: "/image/interviewOS/dashboardpage.png", label: "Dashboard" },
    { src: "/image/interviewOS/loginpage.png", label: "Login" },
  ],
  assetra: [
    { src: "/image/assetra/assetsection.png", label: "Asset" },
    { src: "/image/assetra/overviewpage.png", label: "Overview" },
    { src: "/image/assetra/marketplacepage.png", label: "Marketplace" },
    { src: "/image/assetra/librarypage.png", label: "Library" },
    { src: "/image/assetra/myproductpage.png", label: "My Product" },
    { src: "/image/assetra/addproductpage.png", label: "Add Product" },
    { src: "/image/assetra/walletpage.png", label: "Wallet" },
    { src: "/image/assetra/settingspage.png", label: "Settings" },
    { src: "/image/assetra/loginpage.png", label: "Login" },
  ],
  "gotani-pos": [
    { src: "/image/GotaniApp/beranda.png", label: "Beranda" },
    { src: "/image/GotaniApp/transaksi.png", label: "Transaksi" },
    { src: "/image/GotaniApp/laporan.png", label: "Laporan" },
    { src: "/image/GotaniApp/splashscreen.png", label: "Splash" },
    { src: "/image/GotaniApp/loginadmin.png", label: "Login Admin" },
    { src: "/image/GotaniApp/loginkaryawan.png", label: "Login Karyawan" },
    { src: "/image/GotaniApp/drawerberanda-portrait.png", label: "Drawer" },
    { src: "/image/GotaniApp/feedback-portrait.png", label: "Feedback" },
    { src: "/image/GotaniApp/pembayaran-portrait.png", label: "Pembayaran" },
    { src: "/image/GotaniApp/pembayarantunai-portrait.png", label: "Pembayaran Tunai" },
    { src: "/image/GotaniApp/transaksiberhasil-portrait.png", label: "Transaksi Berhasil" },
    { src: "/image/GotaniApp/detailtransaksi-portrait.png", label: "Detail Transaksi" },
    { src: "/image/GotaniApp/riwayattransaksi.png", label: "Riwayat Transaksi" },
    { src: "/image/GotaniApp/riwayattransaksikaryawan-portrait.png", label: "Riwayat Karyawan" },
    { src: "/image/GotaniApp/manajemenstok-portrait.png", label: "Manajemen Stok" },
    { src: "/image/GotaniApp/kelolastok-portrait.png", label: "Kelola Stok" },
    { src: "/image/GotaniApp/detailstok-portrait.png", label: "Detail Stok" },
    { src: "/image/GotaniApp/editstok-portrait.png", label: "Edit Stok" },
    { src: "/image/GotaniApp/stokprodukkaryawan-portrait.png", label: "Stok Produk Karyawan" },
    { src: "/image/GotaniApp/detailstokprodukkaryawan-portrait.png", label: "Detail Stok Karyawan" },
    { src: "/image/GotaniApp/stokkaryawan-portrait.png", label: "Stok Karyawan" },
    { src: "/image/GotaniApp/distribusistok-portrait.png", label: "Distribusi Stok" },
    { src: "/image/GotaniApp/modaldistribusistok-portrait.png", label: "Modal Distribusi" },
    { src: "/image/GotaniApp/kelolaproduk.png", label: "Kelola Produk" },
    { src: "/image/GotaniApp/tambahproduk-portrait.png", label: "Tambah Produk" },
    { src: "/image/GotaniApp/editproduk-portrait.png", label: "Edit Produk" },
    { src: "/image/GotaniApp/kategoriproduk-portrait.png", label: "Kategori Produk" },
    { src: "/image/GotaniApp/tambahkategori-portrait.png", label: "Tambah Kategori" },
    { src: "/image/GotaniApp/produkterjual-portrait.png", label: "Produk Terjual" },
    { src: "/image/GotaniApp/produkterlaris-portrait.png", label: "Produk Terlaris" },
    { src: "/image/GotaniApp/supplier-portrait.png", label: "Supplier" },
    { src: "/image/GotaniApp/kelolakaryawan-portrait.png", label: "Kelola Karyawan" },
    { src: "/image/GotaniApp/tambahkaryawan-portrait.png", label: "Tambah Karyawan" },
    { src: "/image/GotaniApp/editkaryawan-portrait.png", label: "Edit Karyawan" },
    { src: "/image/GotaniApp/laporanpenjualan-portrait.png", label: "Laporan Penjualan" },
    { src: "/image/GotaniApp/omsetperbulan-portrait.png", label: "Omset Per Bulan" },
    { src: "/image/GotaniApp/pengaturan-portrait.png", label: "Pengaturan" },
    { src: "/image/GotaniApp/pengaturanpfile-portrait.png", label: "Profil" },
    { src: "/image/GotaniApp/pengaturanubahkatasandi-portrait.png", label: "Ubah Kata Sandi" },
    { src: "/image/GotaniApp/pengaturanstruk-portrait.png", label: "Struk" },
  ],
  monetra: [
    { src: "/image/monetra/dashboard.png", label: "Dashboard" },
    { src: "/image/monetra/transactions.png", label: "Transactions" },
    { src: "/image/monetra/budgets.png", label: "Budgets" },
    { src: "/image/monetra/goals.png", label: "Goals" },
    { src: "/image/monetra/categories.png", label: "Categories" },
    { src: "/image/monetra/reports.png", label: "Reports" },
    { src: "/image/monetra/recurring.png", label: "Recurring" },
    { src: "/image/monetra/login.png", label: "Login" },
    { src: "/image/monetra/settings.png", label: "Settings" },
  ],
};

const MOBILE_APPS = ["gotani-pos"];

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const t = useTranslations("projectDetail");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const heroSrc = PROJECT_HERO_IMAGES[project.slug];
  const gallery = screenshots[project.slug];
  const isMobileApp = MOBILE_APPS.includes(project.slug);
  const heroScreenshots = isMobileApp && gallery ? gallery.slice(0, 3) : null;
  const galleryScreenshots = isMobileApp && gallery ? gallery.slice(3) : gallery;
  const allScreenshots = galleryScreenshots ?? [];

  // Screenshots already showcased inside feature rows are not repeated.
  const featureShots = new Set((project.features ?? []).map((f) => f.screenshot));
  const showcaseShots = allScreenshots.filter(
    (ss) => ss.src !== heroSrc && !featureShots.has(ss.src)
  );

  const meta: { label: string; value: string }[] = [];
  if (project.client) meta.push({ label: t("client"), value: project.client });
  meta.push({ label: t("roleLabel"), value: project.role });
  if (project.category) meta.push({ label: t("category"), value: project.category });
  if (project.timeline) meta.push({ label: t("timeline"), value: project.timeline });

  const scrollTo = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement;
    if (child) {
      child.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      setActiveIndex(index);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const idx = Math.round(container.scrollLeft / container.clientWidth);
    if (idx !== activeIndex) setActiveIndex(idx);
  }, [activeIndex]);

  return (
    <div className="min-h-dvh bg-canvas pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-6 md:px-8 pb-24">
        <TransitionLink
          href="/#projects"
          className="inline-flex items-center gap-2 label text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          {t('backToProjects')}
        </TransitionLink>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="space-y-14 md:space-y-20"
        >
          {/* Hero: title, summary, meta, actions */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="display-xl text-balance">{project.title}</h1>
              <p className="body-base text-muted-foreground max-w-prose">{project.summary}</p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label} className="space-y-1 min-w-0">
                  <dt className="label text-muted-foreground">{item.label}</dt>
                  <dd className="body-base font-semibold text-foreground text-balance">{item.value}</dd>
                </div>
              ))}
            </dl>

          </div>

          {/* Showcase */}
          <div className="space-y-3">
            {heroScreenshots ? (
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {heroScreenshots.map((ss) => (
                  <div key={ss.label} className="rounded-sm border border-border bg-canvas-card overflow-hidden">
                    <Image
                      src={ss.src}
                      alt={ss.label}
                      width={400}
                      height={711}
                      className="w-full h-auto block"
                      priority
                      sizes="(max-width: 768px) 33vw, 280px"
                    />
                  </div>
                ))}
              </div>
            ) : (
              heroSrc && (
                <div className="relative w-full rounded-[14px] border border-border bg-canvas-card overflow-hidden">
                  <Image
                    src={heroSrc}
                    alt={project.title}
                    width={1200}
                    height={675}
                    priority
                    className="w-full h-auto block"
                    style={{ viewTransitionName: `vt-${project.slug}` }}
                    sizes="(max-width: 768px) 100vw, 1152px"
                  />
                </div>
              )
            )}
          </div>

          {/* Narrative */}
          <div className="space-y-8 md:space-y-10 max-w-prose">
            <Reveal variant="rise" className="space-y-3">
              <h2 className="button-cap text-foreground">{t('challenge')}</h2>
              <p className="body-base text-muted-foreground">{project.challenge}</p>
            </Reveal>
            <Reveal variant="rise" className="space-y-3">
              <h2 className="button-cap text-foreground">{t('solution')}</h2>
              <p className="body-base text-muted-foreground">{project.solution}</p>
            </Reveal>
            <Reveal variant="rise" className="space-y-3">
              <h2 className="button-cap text-foreground">{t('impact')}</h2>
              <p className="body-base text-muted-foreground">{project.impact}</p>
            </Reveal>
          </div>

          {/* Features zigzag */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-8 md:space-y-10">
              <Reveal variant="mask" className="space-y-3">
                <p className="label text-muted-foreground">{t('features')}</p>
                <h2 className="display-lg text-balance">{t('features')}</h2>
              </Reveal>
              <FeatureZigzag features={project.features} />
            </div>
          )}

          {/* Gallery showcase */}
          {showcaseShots.length > 0 && (
            <div className="space-y-6">
              <div
                ref={containerRef}
                onScroll={handleScroll}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar
                           md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:gap-4"
              >
                {showcaseShots.map((ss, i) => (
                  <div
                    key={ss.label}
                    className="snap-start shrink-0 w-[85vw] md:w-auto
                               rounded-[14px] overflow-hidden border border-border
                               bg-canvas-card hover:shadow-md transition-shadow duration-300"
                  >
                    <Image
                      src={ss.src}
                      alt={ss.label}
                      width={400}
                      height={isMobileApp ? 711 : 280}
                      className="w-full h-auto block"
                      loading={i < 2 ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 560px"
                    />
                  </div>
                ))}
              </div>

              {showcaseShots.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-5 md:hidden">
                  <Button
                    onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
                    disabled={activeIndex === 0}
                    variant="outline"
                    size="icon-sm"
                    className="rounded-full"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <div className="flex gap-1.5">
                    {showcaseShots.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => scrollTo(i)}
                        aria-label={`Go to screenshot ${i + 1}`}
                        aria-current={i === activeIndex ? "true" : undefined}
                        className={`h-2 rounded-full transition-colors cursor-pointer ${
                          i === activeIndex
                            ? "bg-foreground w-4"
                            : "bg-muted-foreground/30 hover:bg-muted-foreground/60 w-2"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    onClick={() => scrollTo(Math.min(showcaseShots.length - 1, activeIndex + 1))}
                    disabled={activeIndex === showcaseShots.length - 1}
                    variant="outline"
                    size="icon-sm"
                    className="rounded-full"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Bottom actions */}
          <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-border">
            {project.demoUrl && (
              <Button className="btn-3d rounded-full" nativeButton={false} render={<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" />}>
                <ExternalLink size={16} />
                {t('liveDemo')}
              </Button>
            )}
            <Button variant="outline" className="btn-3d-outline rounded-full" nativeButton={false} render={<a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" />}>
              <Github size={16} />
              {t('sourceCode')}
            </Button>
            <DocsModal
              project={project}
              trigger={
                <Button variant="outline" className="rounded-full">
                  <FileText size={16} />
                  {t('docs')}
                </Button>
              }
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
