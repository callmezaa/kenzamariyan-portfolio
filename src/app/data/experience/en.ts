export type ExperienceType = "work" | "education" | "organization";

export interface Experience {
  year: string;
  title: string;
  place: string;
  location: string;
  description: string;
  tags: string[];
  type: ExperienceType;
}

export const experiencesEn: Experience[] = [
  {
    year: "2026",
    title: "Full-Stack Developer (Hackathon Project)",
    place: "ContractChill — #JuaraVibeCoding",
    location: "Remote",
    description:
      "After graduating, I doubled down on self-learning and competitive building. Won the #JuaraVibeCoding hackathon by shipping an AI-powered legal document analyzer — Google Gemini AI, Node.js/Express backend, React frontend, Firebase Auth, and Docker deployment on Google Cloud Run. Analyzes PDF contracts in under 15 seconds with 4 AI personas.",
    tags: ["React", "TypeScript", "Node.js", "Express", "Gemini AI", "Firebase", "Docker", "GCP"],
    type: "work",
  },
  {
    year: "Jul 2025 - Dec 2025",
    title: "Full-Stack Mobile Developer (Internship)",
    place: "PT BIT Indonesia",
    location: "Internship",
    description:
      "Built the Gotani POS application end-to-end for an agriculture platform — mobile UI, transaction-oriented workflows, Firebase/Firestore data layer, and Midtrans payment integration.",
    tags: ["React Native", "Expo", "TypeScript", "Firebase", "Firestore", "Midtrans"],
    type: "work",
  },
  {
    year: "Aug 2024 - Jan 2026",
    title: "Full-Stack Web Developer (Internship)",
    place: "Koperasi Petani Jaya Makmur Indonesia (KPJMI)",
    location: "Internship",
    description:
      "Designed and developed KPJMI's company profile website plus its admin dashboard — from brand-aligned UI to dynamic content management, authentication, and data workflows for the cooperative.",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "REST API"],
    type: "work",
  },
  {
    year: "2021 - 2026",
    title: "S1 Teknik Informatika",
    place: "Informatics Engineering",
    location: "Indonesia",
    description:
      "Studied software development, database systems, object-oriented programming, and web engineering through practical academic projects — culminating in full-stack internships during the final years.",
    tags: ["Algorithms", "Database", "OOP", "Software Engineering"],
    type: "education",
  },
];