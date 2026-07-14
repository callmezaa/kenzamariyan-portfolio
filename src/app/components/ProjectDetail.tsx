"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import type { Project } from "../data/projects";
import { easeOut } from "../utils/animations";

const projectImages: Record<string, string> = {
  "contract-chill": "/image/contract-chill/screenshot/homesection.png",
  interviewos: "/image/interviewOS/homesection.png",
  assetra: "/image/assetra/homesection.png",
  "gotani-pos": "/image/GotaniApp/mockup.png",
  monetra: "/image/monetra/homesection.png",
  mercato: "/image/mercato/mockup.png",
  nextalk: "/image/nextalkApp/mockup.png",
};

const screenshots: Record<string, { src: string; label: string }[]> = {
  "contract-chill": [
    { src: "/image/contract-chill/screenshot/startsection.png", label: "Start" },
    { src: "/image/contract-chill/screenshot/featuressection.png", label: "Features" },
    { src: "/image/contract-chill/screenshot/analyzersection.png", label: "Analyzer" },
    { src: "/image/contract-chill/screenshot/generatepage.png", label: "Generate" },
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
};

const MOBILE_APPS = ["gotani-pos", "nextalk"];

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const heroSrc = projectImages[project.slug] || projectImages[project.slug];
  const gallery = screenshots[project.slug];
  const isMobileApp = MOBILE_APPS.includes(project.slug);
  const heroScreenshots = isMobileApp && gallery ? gallery.slice(0, 3) : null;
  const galleryScreenshots = isMobileApp && gallery ? gallery.slice(3) : gallery;

  return (
    <div className="min-h-screen bg-canvas pt-28 md:pt-36">
      <div className="mx-auto max-w-4xl px-6 md:px-8 pb-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 label text-ink-muted hover:text-ink transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="space-y-16"
        >
          <div className="space-y-6">
            {heroScreenshots ? (
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {heroScreenshots.map((ss) => (
                  <div key={ss.label} className="rounded-sm border border-white/10 bg-canvas-card overflow-hidden">
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
              <div className="relative w-full rounded-sm border border-white/10 bg-canvas-card overflow-hidden">
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

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                {project.badge && (
                  <span className="label px-2.5 py-1 rounded-sm border border-white/10 text-ink-muted">{project.badge}</span>
                )}
                <span className="body-small text-ink-muted">{project.year}</span>
                <span className="body-small text-ink-muted">·</span>
                <span className="body-small text-ink-muted">{project.role}</span>
              </div>
              <h1 className="display-xl">{project.title}</h1>
              <p className="body-base">{project.summary}</p>
            </div>
          </div>

          <div className="space-y-12">
            <section className="space-y-3">
              <h2 className="button-cap text-ink">Challenge</h2>
              <p className="body-base text-ink-muted">{project.challenge}</p>
            </section>

            <section className="space-y-3">
              <h2 className="button-cap text-ink">Solution</h2>
              <p className="body-base text-ink-muted">{project.solution}</p>
            </section>

            <section className="space-y-3">
              <h2 className="button-cap text-ink">Impact</h2>
              <p className="body-base text-ink-muted">{project.impact}</p>
            </section>
          </div>

          {galleryScreenshots && galleryScreenshots.length > 0 && (
            <section className="space-y-5">
              <h2 className="button-cap text-ink">Screenshots</h2>
              <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3">
                {galleryScreenshots.map((ss) => (
                  <motion.div
                    key={ss.label}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25, ease: easeOut }}
                    className="rounded-sm border border-white/10 bg-canvas-card overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <Image
                      src={ss.src}
                      alt={ss.label}
                      width={400}
                      height={711}
                      className="w-full h-auto block"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="label px-3 py-1.5 rounded-sm border border-white/10 text-ink-muted">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-pill border border-ink px-5 py-2.5 button-cap text-ink hover:bg-canvas-card transition-colors"
            >
              <Github size={16} />
              Source Code
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-pill border border-ink bg-ink px-5 py-2.5 button-cap text-canvas hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
