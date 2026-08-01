import "./globals.css";
import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { JetBrains_Mono, Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import LayoutClient from "./components/LayoutClient";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ken Zamariyan | Full-Stack Developer",
    template: "%s | Ken Zamariyan",
  },
  description:
    "Full-stack engineer shipping production-grade applications across web, mobile, and AI — from AI contract analyzers and offline-first POS systems to real-time interview platforms and e-commerce solutions. Proficient in TypeScript, Go, Python, PostgreSQL, and the MERN stack.",
  keywords: ["Ken Zamariyan", "Full-Stack Developer", "React Developer", "Go Developer", "Next.js Developer", "React Native Developer", "TypeScript", "PostgreSQL", "MERN Stack", "MongoDB", "Express"],
  authors: [{ name: "Ken Zamariyan" }],
  creator: "Ken Zamariyan",
  openGraph: {
    title: "Ken Zamariyan | Full-Stack Developer",
    description:
      "Full-stack engineer building production-grade apps across web, mobile, and AI — AI contract analyzers, offline-first POS, real-time interview platforms, and e-commerce. Proficient in TypeScript, Go, Python, PostgreSQL, and MERN stack.",
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
    description: "Full-stack engineer — TypeScript, Go, Python, PostgreSQL, MERN. AI apps, mobile POS, e-commerce, real-time platforms.",
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn("font-sans", geist.variable)}
      data-theme="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#f5f5f0" id="theme-color-meta" />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${jetbrainsMono.variable} bg-canvas font-sans text-ink-muted antialiased`}>
        <a
          href="#main-content"
          className="fixed -top-full left-4 z-[100] rounded-b-md bg-ink px-4 py-2.5 text-sm font-semibold text-canvas transition-[top,outline-offset] duration-200 focus:top-0 focus:outline-2 focus:outline-offset-0 focus:outline-ink"
        >
          {(await getTranslations("common"))("skipToContent")}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LayoutClient>{children}</LayoutClient>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
