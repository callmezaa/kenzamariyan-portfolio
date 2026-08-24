/**
 * Static certificate metadata. Titles and descriptions live in the
 * `certificates.*` i18n namespace keyed by CERTIFICATE_KEYS order;
 * everything visual (files, issuer, year, verification URL) lives here.
 */

export type CertificateKind = "certification" | "competition" | "course";

export const CERTIFICATE_KEYS = [
  "bnsp",
  "googleAi",
  "hubspot",
  "micro1",
  "juaraVibeCoding",
  "programmingFundamental",
  "intermediateWeb",
  "fundamentalWeb",
  "fullstackNasional",
] as const;

export type CertificateKey = (typeof CERTIFICATE_KEYS)[number];

export interface CertificateMeta {
  issuer: string;
  year: string;
  kind: CertificateKind;
  files: string[];
  url?: string;
}

export const certificatesMeta: Record<CertificateKey, CertificateMeta> = {
  bnsp: {
    issuer: "BNSP (Badan Nasional Sertifikasi Profesi)",
    year: "2026",
    kind: "certification",
    files: ["/image/Achievement/BNSP Certified Programmer - Software Development-1.png"],
    url: "https://lisensi.bnsp.go.id/",
  },
  googleAi: {
    issuer: "Google",
    year: "2026",
    kind: "certification",
    files: ["/image/Achievement/Google AI Professional Certificate-1.png"],
    url: "https://www.credly.com/",
  },
  hubspot: {
    issuer: "HubSpot Academy",
    year: "2026",
    kind: "certification",
    files: ["/image/Achievement/HubSpot CMS For Developer II.png"],
    url: "https://academy.hubspot.com/certification-results",
  },
  micro1: {
    issuer: "micro1",
    year: "2026",
    kind: "certification",
    files: ["/image/Achievement/micro1 Certified Full-Stack Developer.jpg"],
    url: "https://micro1.ai/",
  },
  juaraVibeCoding: {
    issuer: "JuaraVibeCoding",
    year: "2026",
    kind: "competition",
    files: ["/image/Achievement/Top 100 JuaraVibeCoding Certificate of Achievement-1.png"],
    url: "https://juaravibecoding.com/",
  },
  programmingFundamental: {
    issuer: "Kementerian Pendidikan dan Kebudayaan (Nasional)",
    year: "2026",
    kind: "course",
    files: [
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Programming Fundamental Nasional-1.png",
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Programming Fundamental Nasional-2.png",
    ],
  },
  intermediateWeb: {
    issuer: "Kementerian Pendidikan dan Kebudayaan (Nasional)",
    year: "2026",
    kind: "course",
    files: [
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Intermediate Assistant Web Developer Nasional-1.png",
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Intermediate Assistant Web Developer Nasional-2.png",
    ],
  },
  fundamentalWeb: {
    issuer: "Kementerian Pendidikan dan Kebudayaan (Nasional)",
    year: "2026",
    kind: "course",
    files: [
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Fundamental of Assistant Web Developer Nasional-1.png",
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Fundamental of Assistant Web Developer Nasional-2.png",
    ],
  },
  fullstackNasional: {
    issuer: "Kementerian Pendidikan dan Kebudayaan (Nasional)",
    year: "2026",
    kind: "certification",
    files: [
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Front-End  Back-End Development - Nasional-1.png",
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Front-End  Back-End Development - Nasional-2.png",
    ],
  },
};
