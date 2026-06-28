import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-surface-black font-sans text-body-muted antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
