import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClientOnlyCursorGlow from "./components/ui/ClientOnlyCursorGlow";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-amber-ten-22.vercel.app"),
  title: {
    default: "Ken Zamariyan | Frontend & Mobile Developer",
    template: "%s | Ken Zamariyan",
  },
  description:
    "Frontend and mobile developer building React, Next.js, React Native, and Firebase-backed product workflows.",
  keywords: ["Ken Zamariyan", "Frontend Developer", "React Developer", "Next.js Developer", "React Native Developer", "Firebase"],
  authors: [{ name: "Ken Zamariyan" }],
  creator: "Ken Zamariyan",
  openGraph: {
    title: "Ken Zamariyan | Frontend & Mobile Developer",
    description:
      "Selected work across React, Next.js, React Native, Firebase, dashboards, and mobile product workflows.",
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
    title: "Ken Zamariyan | Frontend & Mobile Developer",
    description: "React, Next.js, React Native, and Firebase portfolio.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 font-sans text-zinc-100 antialiased">
        <ClientOnlyCursorGlow />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
