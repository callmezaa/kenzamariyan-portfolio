"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import KeyboardNav from "./KeyboardNav";
import Footer from "./Footer";
import { ThemeProvider } from "./ThemeProvider";

const SmoothScroll = dynamic(
  () => import("@/components/motion/smooth-scroll").then((m) => m.SmoothScroll),
  { ssr: false },
);
const ScrollProgress = dynamic(
  () => import("@/components/motion/scroll-progress").then((m) => m.ScrollProgress),
  { ssr: false },
);
const CommandMenu = dynamic(
  () => import("./CommandMenu").then((m) => m.CommandMenu),
  { ssr: false },
);

export default function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <KeyboardNav />
      <Navbar />
      <SmoothScroll>
        {children}
        <Footer />
      </SmoothScroll>
      <ScrollProgress variant="bar" position="bottom" height={3} />
      <CommandMenu />
    </ThemeProvider>
  );
}
