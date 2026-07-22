"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "../data/projects";
import { techDescriptions } from "../data/projects";
import { easeOut } from "../utils/animations";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const projectImages: Record<string, string> = {
  "contract-chill": "/image/contract-chill/screenshot/homepage.png",
  interviewos: "/image/interviewOS/homesection.png",
  assetra: "/image/assetra/homesection.png",
  "gotani-pos": "/image/GotaniApp/mockup-v2.png",
  monetra: "/image/monetra/homesection.png",
  mercato: "/image/mercato/mockup.png",
  nextalk: "/image/nextalkApp/mockup-v2.png",
  "pallete-studio": "/image/PalleteStudio/mockup.png",
};

const screenshots: Record<string, { src: string; label: string }[]> = {
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
  nextalk: [
    { src: "/image/nextalkApp/homescreen.png", label: "Home" },
    { src: "/image/nextalkApp/roomchatscreen.png", label: "Room Chat" },
    { src: "/image/nextalkApp/explorescreen.png", label: "Explore" },
    { src: "/image/nextalkApp/splashscreen.png", label: "Splash" },
    { src: "/image/nextalkApp/onboarding1.png", label: "Onboarding 1" },
    { src: "/image/nextalkApp/onboarding2.png", label: "Onboarding 2" },
    { src: "/image/nextalkApp/onboarding3.png", label: "Onboarding 3" },
    { src: "/image/nextalkApp/loginscreen.png", label: "Login" },
    { src: "/image/nextalkApp/registerscreen.png", label: "Register" },
    { src: "/image/nextalkApp/grupscreen.png", label: "Group" },
    { src: "/image/nextalkApp/creategrupscreen.png", label: "Create Group" },
    { src: "/image/nextalkApp/nexbotscreen.png", label: "NexBot AI" },
    { src: "/image/nextalkApp/storyscreen.png", label: "Story" },
    { src: "/image/nextalkApp/unreadscreen.png", label: "Unread" },
    { src: "/image/nextalkApp/callscreen.png", label: "Call" },
    { src: "/image/nextalkApp/profilescreen.png", label: "Profile" },
  ],
  mercato: [
    { src: "/image/mercato/1.png", label: "Onboarding" },
    { src: "/image/mercato/2.png", label: "Products" },
    { src: "/image/mercato/3.png", label: "Wishlist" },
    { src: "/image/mercato/4.png", label: "E-Receipt" },
    { src: "/image/mercato/5.png", label: "Profile" },
  ],
};

const MOBILE_APPS = ["gotani-pos", "mercato", "nextalk"];

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const heroSrc = projectImages[project.slug] || projectImages[project.slug];
  const gallery = screenshots[project.slug];
  const isMobileApp = MOBILE_APPS.includes(project.slug);
  const heroScreenshots = isMobileApp && gallery ? gallery.slice(0, 3) : null;
  const galleryScreenshots = isMobileApp && gallery ? gallery.slice(3) : gallery;
  const allScreenshots = galleryScreenshots ?? [];

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
      <div className="mx-auto max-w-4xl px-6 md:px-8 pb-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 label text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="space-y-10"
        >
          {/* Hero Image */}
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
              <div className="relative w-full rounded-sm border border-border bg-canvas-card overflow-hidden">
                <Image
                  src={heroSrc}
                  alt={project.title}
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-auto block"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              {project.badge && (
                <span className="label px-2.5 py-1 rounded-sm border border-border text-muted-foreground">{project.badge}</span>
              )}
              <span className="body-small text-muted-foreground">{project.year}</span>
              <span className="body-small text-muted-foreground">·</span>
              <span className="body-small text-muted-foreground">{project.role}</span>
            </div>
            <h1 className="display-xl text-balance">{project.title}</h1>
            <p className="body-base text-muted-foreground">{project.summary}</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-center md:w-auto">
              <TabsTrigger value="overview" className="flex-1 md:flex-none px-5">Overview</TabsTrigger>
              <TabsTrigger value="screenshots" className="flex-1 md:flex-none px-5">Screenshots</TabsTrigger>
              <TabsTrigger value="tech-stack" className="flex-1 md:flex-none px-5">Tech Stack</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-6 space-y-10">
              <section className="space-y-3">
                <h2 className="button-cap text-foreground">Challenge</h2>
                <p className="body-base text-muted-foreground">{project.challenge}</p>
              </section>
              <section className="space-y-3">
                <h2 className="button-cap text-foreground">Solution</h2>
                <p className="body-base text-muted-foreground">{project.solution}</p>
              </section>
              <section className="space-y-3">
                <h2 className="button-cap text-foreground">Impact</h2>
                <p className="body-base text-muted-foreground">{project.impact}</p>
              </section>
              <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                <Button variant="outline" className="rounded-full" nativeButton={false} render={<a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" />}>
                  <Github size={16} />
                  Source Code
                </Button>
                {project.demoUrl && (
                  <Button className="rounded-full" nativeButton={false} render={<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" />}>
                    <ExternalLink size={16} />
                    Live Demo
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="screenshots" className="pt-6">
              {allScreenshots.length === 0 ? (
                <p className="body-base text-muted-foreground text-center py-12">No screenshots available.</p>
              ) : (
                <>
                  <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar
                               md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:gap-4"
                  >
                    {allScreenshots.map((ss, i) => (
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
                          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 400px"
                        />
                      </div>
                    ))}
                  </div>

                  {allScreenshots.length > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-5 md:hidden">
                      <Button
                        onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
                        disabled={activeIndex === 0}
                        variant="outline"
                        size="icon-sm"
                        className="rounded-full"
                      >
                        <ChevronLeft size={16} />
                      </Button>
                      <div className="flex gap-1.5">
                        {allScreenshots.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            aria-label={`Go to screenshot ${i + 1}`}
                            aria-current={i === activeIndex ? "true" : undefined}
                            className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                              i === activeIndex
                                ? "bg-foreground w-4"
                                : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                            }`}
                          />
                        ))}
                      </div>
                      <Button
                        onClick={() => scrollTo(Math.min(allScreenshots.length - 1, activeIndex + 1))}
                        disabled={activeIndex === allScreenshots.length - 1}
                        variant="outline"
                        size="icon-sm"
                        className="rounded-full"
                      >
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="tech-stack" className="pt-6">
              <div className="divide-y divide-border rounded-[14px] border border-border overflow-hidden">
                {project.stack.map((tech) => (
                  <div key={tech} className="px-4 py-3 md:px-5 md:py-3.5 flex items-baseline gap-3">
                    <span className="body-base font-bold text-foreground shrink-0">{tech}</span>
                    {techDescriptions[tech] && (
                      <span className="body-small text-muted-foreground">{techDescriptions[tech]}</span>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
