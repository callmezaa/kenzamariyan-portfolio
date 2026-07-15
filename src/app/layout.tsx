import "./globals.css";
import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { JetBrains_Mono, Geist } from "next/font/google";
import Navbar from "./components/Navbar";
import KeyboardNav from "./components/KeyboardNav";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { CommandMenu } from "./components/CommandMenu";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-amber-ten-22.vercel.app"),
  title: {
    default: "Ken Zamariyan | Full-Stack Developer",
    template: "%s | Ken Zamariyan",
  },
  description:
    "Full-stack developer building with React, Next.js, Go, Python, and PostgreSQL. Shipping production apps across web, mobile, and AI — from contract analyzers to mobile POS systems.",
  keywords: ["Ken Zamariyan", "Full-Stack Developer", "React Developer", "Go Developer", "Next.js Developer", "React Native Developer", "TypeScript", "PostgreSQL"],
  authors: [{ name: "Ken Zamariyan" }],
  creator: "Ken Zamariyan",
  openGraph: {
    title: "Ken Zamariyan | Full-Stack Developer",
    description:
      "Full-stack development across React, Go, Python, PostgreSQL, and cloud infrastructure. AI-powered apps, mobile POS, e-commerce, and more.",
    url: "/",
    siteName: "Ken Zamariyan Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ken Zamariyan portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ken Zamariyan | Full-Stack Developer",
    description: "React, Go, Python, PostgreSQL, AI, and cloud-native apps.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable)}
      data-theme="light"
      style={{ colorScheme: "light" }}
    >
      <head>
        <meta name="theme-color" content="#f5f5f0" id="theme-color-meta" />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${jetbrainsMono.variable} bg-canvas font-sans text-ink-muted antialiased`}>
        <a
          href="#main-content"
          className="fixed -top-full left-4 z-[100] rounded-b-md bg-ink px-4 py-2.5 text-sm font-semibold text-canvas transition-all duration-200 focus:top-0 focus:outline-2 focus:outline-offset-0 focus:outline-ink"
        >
          Skip to main content
        </a>
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
      </body>
    </html>
  );
}
