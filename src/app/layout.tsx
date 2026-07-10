import "./globals.css";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "./components/Navbar";
import KeyboardNav from "./components/KeyboardNav";
import ScrollToTop from "./components/ScrollToTop";
import FloatingDock from "./components/FloatingDock";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
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
      className={`${inter.variable} ${plusJakartaSans.variable} scroll-smooth`}
      data-theme="dark"
      style={{ colorScheme: "dark" }}
    >
      <head>
        <meta name="theme-color" content="#030303" id="theme-color-meta" />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var t = localStorage.getItem("theme");
              if (t === "light" || t === "dark") {
                document.documentElement.setAttribute("data-theme", t);
              } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
                document.documentElement.setAttribute("data-theme", "light");
              }
              var meta = document.getElementById("theme-color-meta");
              if (meta) {
                meta.setAttribute("content", document.documentElement.getAttribute("data-theme") === "dark" ? "#030303" : "#f5f5f5");
              }
            })();
          `,
        }} />
      </head>
      <body className="bg-surface-black font-sans text-body-muted antialiased">
        <a
          href="#main-content"
          className="fixed -top-full left-4 z-[100] rounded-b-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 focus:top-0 focus:outline-2 focus:outline-offset-0 focus:outline-primary-focus"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <KeyboardNav />
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
          <FloatingDock />
        </ThemeProvider>
      </body>
    </html>
  );
}
