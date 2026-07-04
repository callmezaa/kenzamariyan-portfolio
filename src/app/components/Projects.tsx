"use client";

import Image from "next/image";
import { ExternalLink, Sparkle, FileText, AlertTriangle, Award, Lock, Github, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects, type Project, type ProjectType } from "../data/projects";
import { codeSnippets } from "../data/codeSnippets";
import GlowCard from "./ui/GlowCard";
import CodeBlock from "./ui/CodeBlock";
import Button from "./ui/Button";
import { useState, useEffect } from "react";
import { seqHeader, seqLabel, seqTitle, seqDesc, fadeUp, staggerContainer, staggerItem, clipRevealUp, easeOut } from "../utils/animations";

function ScreenshotShowcase({
  mockupSrc,
  mockupWidth,
  mockupHeight,
  tabs,
  alt,
}: {
  mockupSrc: string;
  mockupWidth: number;
  mockupHeight: number;
  tabs: { label: string; src: string; width: number; height: number }[];
  alt: string;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 product-shadow transition-all duration-300 hover:scale-[1.03] select-none">
      {/* Hero Mockup Render */}
      <div className="relative w-full bg-zinc-900">
        <Image
          src={mockupSrc}
          alt={alt}
          width={mockupWidth}
          height={mockupHeight}
          className="w-full h-auto"
          sizes="520px"
          priority
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-zinc-900/80 px-3 py-2.5 border-t border-zinc-800">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(i)}
            className={`btn-press rounded-md px-2.5 py-1 text-[9px] font-medium transition-all duration-200 ${
              i === activeTab
                ? "bg-indigo-500/15 text-indigo-400"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Screenshot Area */}
      <div className="flex items-center justify-center bg-zinc-950 py-2 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Image
              src={tabs[activeTab].src}
              alt={`${alt} — ${tabs[activeTab].label}`}
              width={tabs[activeTab].width}
              height={tabs[activeTab].height}
              className="w-full h-auto rounded-[2px] shadow-lg"
              sizes="520px"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PhoneShowcase({
  mockupSrc,
  categories,
  alt,
}: {
  mockupSrc: string;
  categories: {
    label: string;
    screenshots: { label: string; src: string }[];
  }[];
  alt: string;
}) {
  const [activeCat, setActiveCat] = useState(0);
  const [activeShot, setActiveShot] = useState(0);

  useEffect(() => {
    const cat = categories[activeCat];
    if (cat.screenshots.length <= 1) return;
    const timer = setInterval(() => {
      setActiveShot((i) => (i + 1) % cat.screenshots.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeCat, categories]);

  const current = categories[activeCat].screenshots[activeShot];

  return (
    <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 product-shadow transition-all duration-300 hover:scale-[1.03] select-none">
      {/* Hero Mockup Render */}
      <div className="relative w-full bg-zinc-900">
        <Image
          src={mockupSrc}
          alt={alt}
          width={1024}
          height={1024}
          className="w-full h-auto"
          sizes="520px"
          priority
        />
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 bg-zinc-900/80 px-2 py-2.5 border-t border-zinc-800 overflow-x-auto">
        {categories.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => { setActiveCat(i); setActiveShot(0); }}
            className={`btn-press shrink-0 rounded-md px-2.5 py-1 text-[9px] font-medium transition-all duration-200 ${
              i === activeCat
                ? "bg-indigo-500/15 text-indigo-400"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Phone Frame + Screenshot */}
      <div className="flex items-center justify-center bg-zinc-950 py-8 px-4">
        <div className="relative w-[200px]">
          {/* Phone Bezel */}
          <div className="rounded-[36px] border-[3px] border-zinc-700 bg-zinc-800 p-2 shadow-2xl">
            {/* Notch */}
            <div className="mx-auto h-3.5 w-16 rounded-b-xl bg-zinc-900" />
            {/* Screen */}
            <div className="mt-0.5 overflow-hidden rounded-[20px] bg-zinc-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCat}-${activeShot}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={current.src}
                    alt={`${alt} — ${categories[activeCat].label}: ${current.label}`}
                    width={1480}
                    height={2800}
                    className="w-full h-auto"
                    sizes="200px"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Home Indicator */}
            <div className="mx-auto mt-1.5 h-1 w-20 rounded-full bg-zinc-600" />
          </div>
        </div>
      </div>

      {/* Page Dots */}
      {categories[activeCat].screenshots.length > 1 && (
        <div className="flex items-center justify-center gap-1 pb-4 bg-zinc-950">
          {categories[activeCat].screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveShot(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeShot
                  ? "w-4 bg-indigo-400"
                  : "w-1.5 bg-zinc-700 hover:bg-zinc-600"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectPreview({ type }: { type: ProjectType }) {
  const reduced = useReducedMotion();
  const [salesCount, setSalesCount] = useState(1280);
  const [orderPulse, setOrderPulse] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Auto-update stats to simulate real-time POS transaction intake
  useEffect(() => {
    if (type !== "mobile" && type !== "dashboard" && type !== "messaging" || reduced) return;
    const interval = setInterval(() => {
      setSalesCount((prev) => prev + 1);
      setOrderPulse(true);
      setTimeout(() => setOrderPulse(false), 800);
    }, 4500);
    return () => clearInterval(interval);
  }, [type, reduced]);

  // Marketplace showcase — mockup + interactive screenshot carousel
  if (type === "marketplace") {
    const tabs = [
      { label: "Home", src: "/image/assetra/homesection.png", width: 1891, height: 858 },
      { label: "Marketplace", src: "/image/assetra/marketplacepage.png", width: 1881, height: 858 },
      { label: "Assets", src: "/image/assetra/assetsection.png", width: 1879, height: 855 },
      { label: "Wallet", src: "/image/assetra/walletpage.png", width: 1882, height: 856 },
      { label: "Overview", src: "/image/assetra/overviewpage.png", width: 1888, height: 859 },
    ];

    return (
      <ScreenshotShowcase
        mockupSrc="/image/assetra/mockup.png"
        mockupWidth={1024}
        mockupHeight={1024}
        tabs={tabs}
        alt="Assetra — Digital Asset Marketplace"
      />
    );
  }

  // Finance showcase — mockup + interactive screenshot carousel
  if (type === "finance") {
    const tabs = [
      { label: "Dashboard", src: "/image/monetra/dashboard.png", width: 1876, height: 802 },
      { label: "Transactions", src: "/image/monetra/transactions.png", width: 1869, height: 796 },
      { label: "Budgets", src: "/image/monetra/budgets.png", width: 1897, height: 808 },
      { label: "Reports", src: "/image/monetra/reports.png", width: 1879, height: 805 },
      { label: "Goals", src: "/image/monetra/goals.png", width: 1894, height: 817 },
    ];

    return (
      <ScreenshotShowcase
        mockupSrc="/image/monetra/mockup.png"
        mockupWidth={1024}
        mockupHeight={1024}
        tabs={tabs}
        alt="Monetra — Personal Finance Tracker"
      />
    );
  }

  // AI showcase — mockup + interactive screenshot carousel
  if (type === "ai") {
    const tabs = [
      { label: "Home", src: "/image/contract-chill/screenshot/homesection.png", width: 1636, height: 799 },
      { label: "Login", src: "/image/contract-chill/screenshot/loginpage.png", width: 1920, height: 1080 },
      { label: "Analyze", src: "/image/contract-chill/screenshot/analyzersection.png", width: 1566, height: 805 },
      { label: "Dashboard", src: "/image/contract-chill/screenshot/dashboardpage.png", width: 1872, height: 807 },
      { label: "Generate", src: "/image/contract-chill/screenshot/generatepage.png", width: 1881, height: 813 },
    ];

    return (
      <ScreenshotShowcase
        mockupSrc="/image/contract-chill/screenshot/mockup.png"
        mockupWidth={1920}
        mockupHeight={1080}
        tabs={tabs}
        alt="ContractChill — AI Contract Analyzer"
      />
    );
  }

  // POS mobile showcase — phone frame + feature categories
  if (type === "pos") {
    const categories = [
      {
        label: "Dashboard",
        screenshots: [
          { label: "Beranda", src: "/image/GotaniApp/beranda.png" },
          { label: "Drawer", src: "/image/GotaniApp/drawerberanda-portrait.png" },
        ],
      },
      {
        label: "Products",
        screenshots: [
          { label: "Product List", src: "/image/GotaniApp/kelolaproduk.png" },
          { label: "Add Product", src: "/image/GotaniApp/tambahproduk-portrait.png" },
          { label: "Edit Product", src: "/image/GotaniApp/editproduk-portrait.png" },
        ],
      },
      {
        label: "Stock",
        screenshots: [
          { label: "Stock List", src: "/image/GotaniApp/kelolastok-portrait.png" },
          { label: "Distribution", src: "/image/GotaniApp/distribusistok-portrait.png" },
          { label: "Management", src: "/image/GotaniApp/manajemenstok-portrait.png" },
        ],
      },
      {
        label: "POS",
        screenshots: [
          { label: "Transaction", src: "/image/GotaniApp/transaksi.png" },
          { label: "Payment", src: "/image/GotaniApp/pembayaran-portrait.png" },
          { label: "Details", src: "/image/GotaniApp/detailtransaksi-portrait.png" },
        ],
      },
      {
        label: "Reports",
        screenshots: [
          { label: "Reports", src: "/image/GotaniApp/laporan.png" },
          { label: "Sales Report", src: "/image/GotaniApp/laporanpenjualan-portrait.png" },
          { label: "Monthly Revenue", src: "/image/GotaniApp/omsetperbulan-portrait.png" },
        ],
      },
    ];

    return (
      <PhoneShowcase
        mockupSrc="/image/GotaniApp/mockup.png"
        categories={categories}
        alt="GotaniApp — Mobile POS Application"
      />
    );
  }

  // Chat mobile showcase — phone frame + feature categories
  if (type === "chat") {
    const categories = [
      {
        label: "Onboarding",
        screenshots: [
          { label: "Splash", src: "/image/nextalkApp/splashscreen.png" },
          { label: "Onboarding 1", src: "/image/nextalkApp/onboarding1.png" },
          { label: "Onboarding 2", src: "/image/nextalkApp/onboarding2.png" },
        ],
      },
      {
        label: "Home",
        screenshots: [
          { label: "Home", src: "/image/nextalkApp/homescreen.png" },
          { label: "Explore", src: "/image/nextalkApp/explorescreen.png" },
          { label: "Unread", src: "/image/nextalkApp/unreadscreen.png" },
        ],
      },
      {
        label: "Chat",
        screenshots: [
          { label: "Room Chat", src: "/image/nextalkApp/roomchatscreen.png" },
          { label: "Group", src: "/image/nextalkApp/grupscreen.png" },
          { label: "Create Group", src: "/image/nextalkApp/creategrupscreen.png" },
        ],
      },
      {
        label: "Features",
        screenshots: [
          { label: "NexBot AI", src: "/image/nextalkApp/nexbotscreen.png" },
          { label: "Stories", src: "/image/nextalkApp/storyscreen.png" },
          { label: "Calls", src: "/image/nextalkApp/callscreen.png" },
        ],
      },
      {
        label: "Profile",
        screenshots: [
          { label: "Login", src: "/image/nextalkApp/loginscreen.png" },
          { label: "Register", src: "/image/nextalkApp/registerscreen.png" },
          { label: "Profile", src: "/image/nextalkApp/profilescreen.png" },
        ],
      },
    ];

    return (
      <PhoneShowcase
        mockupSrc="/image/nextalkApp/mockup.png"
        categories={categories}
        alt="NexTalk — Real-Time Messaging App"
      />
    );
  }

  // InterviewOS showcase — mockup + interactive screenshot carousel
  if (type === "interviewos") {
    const tabs = [
      { label: "Home", src: "/image/interviewOS/homesection.png", width: 1911, height: 849 },
      { label: "Features", src: "/image/interviewOS/featuressection.png", width: 1894, height: 859 },
      { label: "Login", src: "/image/interviewOS/loginpage.png", width: 1918, height: 853 },
      { label: "Dashboard", src: "/image/interviewOS/dashboardpage.png", width: 1906, height: 861 },
      { label: "Room", src: "/image/interviewOS/interviewroom.png", width: 1917, height: 858 },
    ];

    return (
      <ScreenshotShowcase
        mockupSrc="/image/interviewOS/mockup.png"
        mockupWidth={1024}
        mockupHeight={1024}
        tabs={tabs}
        alt="InterviewOS — AI-Powered Interview Platform"
      />
    );
  }

  // Fullstack mockup (browser + AI badge)
  if (type === "fullstack") {
    return (
      <div className="relative mx-auto w-full max-w-[520px] aspect-[3/2] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 product-shadow transition-all duration-300 hover:scale-105 select-none">
        <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900 px-3.5 py-2">
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
          </div>
          <div className="flex h-3.5 flex-1 items-center rounded border border-zinc-850 bg-zinc-950 px-2 font-mono text-[4.5px] text-zinc-500">
            assetra.marketplace
          </div>
        </div>
        <div className="flex h-[calc(100%-22px)] gap-2 bg-zinc-900 p-2.5 text-[5px]">
          {/* Left: Document viewer */}
          <div className="flex-1 space-y-1.5 rounded border border-zinc-800 bg-zinc-950 p-2">
            <div className="flex items-center gap-1 border-b border-zinc-800 pb-1 text-[4px] text-zinc-500">
              <FileText size={8} /> asset-details.md
            </div>
            {[60, 90, 75, 85, 50, 70].map((w, i) => (
              <div key={i} className={`h-1 rounded-full bg-zinc-800`} style={{ width: `${w}%` }} />
            ))}
          </div>
          {/* Right: details panel */}
          <div className="w-24 space-y-1.5">
            <div className="rounded border border-purple-500/20 bg-purple-500/5 p-1.5">
              <div className="text-[4px] font-bold text-purple-400 mb-0.5">Asset Pricing</div>
              <div className="h-1 rounded-full bg-purple-500/30 w-full" />
              <div className="h-1 rounded-full bg-purple-500/30 w-3/4 mt-0.5" />
            </div>
            <div className="rounded border border-emerald-500/20 bg-emerald-500/5 p-1.5">
              <div className="text-[4px] font-bold text-emerald-400 mb-0.5">Seller Dashboard</div>
              <div className="h-1 rounded-full bg-emerald-500/30 w-full" />
              <div className="h-1 rounded-full bg-emerald-500/30 w-2/3 mt-0.5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile phone mockup (mobile + messaging types)
  if (type === "mobile" || type === "messaging") {
    const isMessaging = type === "messaging";
    return (
      <div className="relative mx-auto w-[150px] md:w-[200px] aspect-[130/250] rounded-[32px] border-4 border-zinc-800 bg-zinc-950 p-2 product-shadow transition-all duration-300 hover:scale-105 select-none">
        <div className="absolute left-1/2 top-2 h-2.5 w-12 -translate-x-1/2 rounded-full bg-zinc-800" />
        
        <div className="flex h-full flex-col justify-between overflow-hidden rounded-[24px] bg-zinc-900 p-2.5 text-[6px] text-zinc-300">
          {isMessaging ? (
            <>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 pt-1">
                <span className="text-[7.5px] font-semibold tracking-tight text-white font-display">NexTalk</span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              </div>
              <div className="my-auto space-y-2">
                {["Alex: Hey! Check this out", "You: Looks great!", "Sarah: Meeting at 3?"].map((msg, i) => (
                  <div key={i} className={`flex ${i === 1 ? "justify-end" : "justify-start"}`}>
                    <div className={`rounded-lg px-2 py-1 ${i === 1 ? "bg-blue-500/20" : "bg-zinc-800"}`}>
                      <span className="text-[5px]">{msg}</span>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[4px] text-blue-400">
                  <Sparkle size={7} /> NexBot AI online
                </div>
              </div>
              <div className="flex justify-around border-t border-zinc-800 pt-1.5 text-[5px] text-zinc-500">
                <span className="text-blue-400">Chat</span>
                <span>Groups</span>
                <span>Story</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 pt-1">
                <span className="text-[7.5px] font-semibold tracking-tight text-white font-display">
                  {type === "mobile" ? "gotani.pos" : "app"}
                </span>
                <span className={`h-1.5 w-1.5 rounded-full bg-emerald-500 ${orderPulse ? "scale-150 animate-ping" : "scale-100"}`} />
              </div>
              
              <div className="my-auto space-y-2.5">
                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-1.5">
                  <div className="mb-1 flex justify-between text-[5px] font-medium text-zinc-500">
                    <span>TX Ledger</span>
                    <span className="font-bold text-emerald-400">+{salesCount - 1270}</span>
                  </div>
                  <div className="flex h-12 items-end gap-[2px]">
                    {[30, 48, 88, 64, 82].map((height, i) => (
                      <motion.span 
                        key={i} 
                        className="w-full rounded-t-[1px] bg-emerald-500/60" 
                        animate={{ height: `${height}%` }}
                        transition={{ type: "spring", stiffness: 100, delay: i * 0.05 }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-1">
                  {["Fresh Produce", "Transaction Sync"].map((label, idx) => (
                    <div key={label} className="rounded-md border border-zinc-800 bg-zinc-950/60 p-1.5 flex justify-between items-center">
                      <div className="space-y-0.5">
                        <div className="h-1 w-10 rounded-xs bg-zinc-700" />
                        <div className="h-0.5 w-6 rounded-xs bg-zinc-800" />
                      </div>
                      <span className={`h-1 w-1 rounded-full ${idx === 0 ? "bg-indigo-400" : "bg-emerald-400"}`} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-around border-t border-zinc-800 pt-1.5 text-[5px] font-mono text-zinc-500">
                <span className="text-emerald-400">POS Grid</span>
                <span>Ledger</span>
                <span>Profile</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  const isDashboard = type === "dashboard";

  // Browser Mockup
  return (
    <div className="relative mx-auto w-full max-w-[520px] aspect-[3/2] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 product-shadow transition-all duration-300 hover:scale-105 select-none">
      {/* Window Controls Header */}
      <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900 px-3.5 py-2">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
        </div>
        <div className="flex h-3.5 flex-1 items-center rounded border border-zinc-850 bg-zinc-950 px-2 font-mono text-[4.5px] text-zinc-500">
          {isDashboard ? "admin.gotani.com/dashboard" : "kpjmi.or.id/portal"}
        </div>
      </div>

      {isDashboard ? (
        // Dashboard Content
        <div className="flex h-[calc(100%-22px)] gap-2 bg-zinc-900 p-2.5 text-[5px] text-zinc-400">
          <div className="w-12 space-y-1.5 border-r border-zinc-800 pr-1.5 text-zinc-500">
            <div className="rounded bg-zinc-800 px-1 py-0.5 font-semibold text-white">Hub</div>
            <div className="px-1 py-0.5">Transactions</div>
            <div className="px-1 py-0.5">Inventory</div>
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="grid grid-cols-2 gap-1.5">
              <div className="rounded border border-zinc-800 bg-zinc-950 p-1 flex items-center justify-between">
                <div>
                  <span className="text-[3px] text-zinc-500">POS Sales</span>
                  <div className="mt-0.5 text-[5.5px] font-bold text-indigo-400">{salesCount}</div>
                </div>
                <span className="h-1 w-1 rounded-full bg-indigo-500" />
              </div>
              <div className="rounded border border-zinc-800 bg-zinc-950 p-1 flex items-center justify-between">
                <div>
                  <span className="text-[3px] text-zinc-500">Billing Sync</span>
                  <div className="mt-0.5 text-[5.5px] font-bold text-white">$12.4k</div>
                </div>
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
              </div>
            </div>
            <div className="flex-1 rounded border border-zinc-800 bg-zinc-950 p-1.5 relative overflow-hidden">
              <svg viewBox="0 0 100 40" className="h-full w-full text-indigo-500/10">
                <path d="M0,40 Q15,18 30,30 T60,12 T85,28 T100,10 L100,40 L0,40 Z" fill="currentColor" />
                <motion.path 
                  d="M0,40 Q15,18 30,30 T60,12 T85,28 T100,10" 
                  fill="none" 
                  stroke="rgb(99, 102, 241)" 
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        // Company Profile Content
        <div className="flex h-[calc(100%-22px)] flex-col justify-between bg-zinc-950 p-2.5 text-[5px] text-zinc-400">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5">
            <span className="font-semibold tracking-tight text-white font-display">KPJMI</span>
            <div className="flex gap-2 text-[4px] font-normal text-zinc-500">
              <span>Overview</span>
              <span>Announcements</span>
              <span>Inquiries</span>
            </div>
          </div>
          <div className="mx-auto max-w-[180px] space-y-1.5 text-center">
            <h4 className="text-[7.5px] font-semibold leading-tight tracking-tight text-white font-display">Agricultural Cooperatives Network</h4>
            <p className="text-[4px] leading-relaxed text-zinc-500">Direct member reports, pricing indexes, and dynamic announcement boards.</p>
            <div className="mx-auto flex h-3 w-14 items-center justify-center rounded-full bg-cyan-600 text-[3.5px] font-medium text-white hover:bg-cyan-500 cursor-pointer">Explore Portal</div>
          </div>
          <div className="flex justify-between border-t border-zinc-900 pt-1 text-[3.5px] text-zinc-500">
            <span>© KPJMI Indonesia</span>
            <span>Ledger Active</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);

  return (
    <GlowCard
      glowColor={project.accent.glow}
      radialSize={400}
      className="p-6 md:p-10 bg-surface-tile-1 border-white/10 hover:border-white/20"
    >
      <div className="relative grid items-center gap-10 lg:grid-cols-12">
        {/* Project copy */}
        <div className={`space-y-6 lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight font-display">{project.title}</h3>
              <span
                className="rounded-full border px-3 py-1 text-[11px] font-medium"
                style={{
                  backgroundColor: `${project.accent.color}14`,
                  borderColor: `${project.accent.color}25`,
                  color: project.accent.color,
                }}
              >
                {project.year}
              </span>
              {project.badge === "Hackathon" && (
                <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/15 bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-medium text-indigo-400">
                  <Award size={12} /> Hackathon
                </span>
              )}
              {project.badge === "Enterprise App" && (
              <span className="rounded-full border border-yellow-500/10 bg-yellow-500/5 px-2.5 py-0.5 text-[10px] font-medium text-yellow-500/80">
                Enterprise App
              </span>
            )}
          </div>

          <p className="max-w-2xl body-base">{project.summary}</p>

          {/* Metrics highlights */}
          <div className="flex flex-wrap gap-4 py-1.5">
            {project.metrics.map((metric) => (
              <div key={metric} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent.color }} />
                <span className="text-xs font-semibold text-white font-mono">{metric}</span>
              </div>
            ))}
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-zinc-400">
                {tech}
              </span>
            ))}
          </div>

          {/* Accordion toggle — Case Details */}
          <div className="border-t border-white/5 pt-4">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="btn-press inline-flex items-center gap-2 text-[11px] font-semibold transition-colors cursor-pointer"
              style={{ color: project.accent.color }}
            >
              <motion.span
                animate={{ rotate: detailsOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex"
              >
                <ChevronDown size={14} />
              </motion.span>
              {detailsOpen ? "Hide Details" : "Show Case Details"}
            </button>

            <AnimatePresence initial={false}>
              {detailsOpen && (
                <motion.div
                  key="case-details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 grid gap-4 md:grid-cols-3">
                    {[
                      ["Challenge", project.challenge],
                      ["Solution", project.solution],
                      ["Impact", project.impact],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-lg border p-4 space-y-1" style={{ backgroundColor: `${project.accent.color}08`, borderColor: `${project.accent.color}15` }}>
                        <p className="text-[9px] font-bold uppercase tracking-wider font-display" style={{ color: project.accent.color }}>{label}</p>
                        <p className="body-small">{value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Code snippet section */}
          {codeSnippets[project.title] && (
            <div className="border-t border-white/5 pt-4">
              <button
                onClick={() => setCodeOpen(!codeOpen)}
                className="btn-press inline-flex items-center gap-2 text-[11px] font-semibold transition-colors cursor-pointer"
                style={{ color: project.accent.color }}
              >
                <motion.span
                  animate={{ rotate: codeOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex"
                >
                  <ChevronDown size={14} />
                </motion.span>
                {codeOpen ? "Hide Code" : "Show Code"}
              </button>

              <AnimatePresence initial={false}>
                {codeOpen && (
                  <motion.div
                    key="code-snippet"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4">
                      <CodeBlock
                        code={codeSnippets[project.title].code}
                        filename={codeSnippets[project.title].filename}
                        language={codeSnippets[project.title].language}
                        highlightLines={codeSnippets[project.title].highlightLines}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Details & CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-white/5">
            <p className="text-xs text-zinc-500 font-normal">
              <span className="font-semibold" style={{ color: project.accent.color }}>Role:</span> {project.role}
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button
                variant="ghost"
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
                <ExternalLink size={14} />
              </Button>
              {project.demoUrl ? (
                <Button
                  variant="primary"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                  <ExternalLink size={14} />
                </Button>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/2 px-4 py-2 text-xs font-semibold text-zinc-500 cursor-default select-none">
                  <Lock size={12} /> Private Production
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Visual Mockup Showcase */}
        <div className={`relative flex select-none items-center justify-center py-6 lg:py-10 lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-emerald-500/5 blur-xl pointer-events-none" />
          <ProjectPreview type={project.type} />
        </div>
      </div>
    </GlowCard>
  );
}

const typeIcon: Record<string, typeof Sparkle> = {
  mobile: Sparkle,
  dashboard: FileText,
  ai: Sparkle,
  fullstack: FileText,
  marketplace: Sparkle,
  pos: Sparkle,
  finance: Sparkle,
  chat: Sparkle,
  company: FileText,
  interviewos: Sparkle,
};

function ProjectMiniCard({ project }: { project: Project }) {
  const Icon = typeIcon[project.type] || Sparkle;

  return (
    <GlowCard
      glowColor={project.accent.glow}
      radialSize={250}
      className="p-5 bg-surface-tile-1 border-white/10 hover:border-white/20 h-full"
    >
      <div className="flex flex-col h-full gap-3">
          {/* Accent header bar */}
          <div
            className="flex items-center gap-2.5 rounded-lg px-3 py-2"
            style={{ backgroundColor: `${project.accent.color}10` }}
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
              style={{ backgroundColor: `${project.accent.color}18` }}
            >
              <Icon size={13} style={{ color: project.accent.color }} />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-white font-display leading-snug truncate">{project.title}</h3>
              <div className="flex items-center gap-2 text-[10px] mt-0.5">
                <span className="font-medium" style={{ color: project.accent.color }}>{project.year}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-500 capitalize">{project.type}</span>
              </div>
            </div>
          </div>

          {/* Short description */}
          <p className="body-base line-clamp-2">
            {project.summary}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="rounded border border-white/5 bg-white/[0.03] px-1.5 py-0.5 text-[9px] font-medium text-zinc-500">
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="rounded border border-white/5 bg-white/[0.03] px-1.5 py-0.5 text-[9px] font-medium text-zinc-600">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 pt-1 mt-auto border-t border-white/5">
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-400 hover:text-white transition-colors"
            >
              <Github size={11} /> Source
            </a>
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-400 hover:text-white transition-colors"
              >
                <ExternalLink size={11} /> Live
              </a>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-600">
                <Lock size={11} /> Private
              </span>
            )}
          </div>
        </div>
      </GlowCard>
  );
}

type FilterCategory = "all" | "ai" | "mobile" | "fullstack";

const filterTabs: { key: FilterCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI" },
  { key: "mobile", label: "Mobile" },
  { key: "fullstack", label: "Full-Stack" },
];

const filterMap: Record<FilterCategory, ProjectType[]> = {
  all: [],
  ai: ["ai", "interviewos"],
  mobile: ["mobile", "pos", "chat"],
  fullstack: ["fullstack", "marketplace", "dashboard", "finance", "company"],
};

function matchesFilter(project: Project, filter: FilterCategory): boolean {
  if (filter === "all") return true;
  return filterMap[filter].includes(project.type);
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filteredFeatured = projects.filter((p) => p.featured && matchesFilter(p, activeFilter));
  const filteredMore = projects.filter((p) => !p.featured && matchesFilter(p, activeFilter));

  return (
    <section id="projects" className="relative bg-canvas py-24 md:py-28 border-b border-white/5">
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        
        {/* Section Header */}
        <motion.div
          variants={seqHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 max-w-2xl space-y-3"
        >
          <motion.p variants={seqLabel} className="text-xs font-semibold uppercase tracking-widest text-primary">Selected Work</motion.p>
          <motion.h2 variants={seqTitle} className="display-lg tracking-tight text-white">
            Signature Case Studies
          </motion.h2>
          <motion.p variants={seqDesc} className="body-base">
            A detailed breakdown of product applications designed and built to optimize operational efficiency and workflow delivery.
          </motion.p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: easeOut }}
          className="mb-12 flex items-center gap-1 rounded-lg border border-white/5 bg-white/[0.02] p-1 w-fit"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`relative rounded-md px-4 py-2 text-xs font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === tab.key
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {activeFilter === tab.key && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-md bg-white/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Featured Project Cards */}
        <div className="space-y-10 md:space-y-12">
          <AnimatePresence mode="wait">
            {filteredFeatured.length > 0 ? (
              <motion.div
                key={activeFilter + "-featured"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="space-y-10 md:space-y-12"
              >
                {filteredFeatured.map((project, index) => (
                  <motion.div
                    key={project.title}
                    variants={clipRevealUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    layout
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-featured"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center"
              >
                <p className="body-small text-zinc-600">No featured projects in this category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* More Projects Section */}
        {filteredMore.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="mt-20 pt-14 border-t border-white/5"
          >
            <div className="mb-8 max-w-2xl space-y-2">
              <h3 className="display-md tracking-tight text-white">
                More Projects
              </h3>
              <p className="body-base">
                Additional work across mobile apps, dashboards, and web portals.
              </p>
            </div>

            <motion.div
              key={activeFilter + "-more"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="grid gap-4 md:grid-cols-2"
            >
              {filteredMore.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  <ProjectMiniCard project={project} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 text-center"
            >
              <Button
                variant="ghost"
                href="https://github.com/callmezaa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={14} />
                <span>View All on GitHub</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
