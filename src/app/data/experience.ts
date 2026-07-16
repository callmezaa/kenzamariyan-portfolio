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

export const experiences: Experience[] = [
  {
    year: "2026",
    title: "Full-Stack Developer (Hackathon Project)",
    place: "ContractChill — #JuaraVibeCoding",
    location: "Remote",
    description:
      "Built an AI-powered legal document analyzer using Google Gemini AI, Node.js/Express backend, React frontend, Firebase Auth, and Docker deployment on Google Cloud Run. Analyzes PDF contracts in under 15 seconds with 4 AI personas.",
    tags: ["React", "TypeScript", "Node.js", "Express", "Gemini AI", "Firebase", "Docker", "GCP"],
    type: "work",
  },
  {
    year: "Jan 2024 - Present",
    title: "Freelance Web & Mobile Developer",
    place: "Independent",
    location: "Remote",
    description:
      "Developing end-to-end web and mobile applications across multiple domains — fintech, e-commerce, legal-tech, productivity, and agritech. From requirements and architecture to implementation and deployment.",
    tags: ["Next.js", "React Native", "Node.js", "Go", "Python", "PostgreSQL", "TypeScript"],
    type: "work",
  },
  {
    year: "2024",
    title: "Mobile & Backend Developer",
    place: "Gotani Agriculture Platform",
    location: "Project-based",
    description:
      "Built a mobile POS application for an agriculture platform, covering mobile UI, Firebase integration, and transaction-oriented workflows.",
    tags: ["React Native", "Firebase", "Firestore", "Mobile Dev"],
    type: "work",
  },
  {
    year: "2024",
    title: "Frontend Developer",
    place: "Gotani Admin Dashboard",
    location: "Project-based",
    description:
      "Developed web administration screens to manage products, users, and transaction data with a focus on clarity for non-technical operators.",
    tags: ["React", "Vite", "Tailwind CSS", "REST API"],
    type: "work",
  },
  {
    year: "2023",
    title: "Web Developer",
    place: "KPJMI - Koperasi Petani Jaya Makmur Indonesia",
    location: "Internship",
    description:
      "Designed and developed a company profile website with dynamic content management backed by MySQL.",
    tags: ["HTML", "CSS", "JavaScript", "MySQL", "PHP"],
    type: "work",
  },
  {
    year: "2020 - 2024",
    title: "S1 Teknik Informatika",
    place: "Informatics Engineering",
    location: "Indonesia",
    description:
      "Studied software development, database systems, object-oriented programming, and mobile computing through practical academic projects.",
    tags: ["Algorithms", "Database", "OOP", "Software Engineering"],
    type: "education",
  },
  {
    year: "2023 - Present",
    title: "Core Contributor",
    place: "Komunitas Developer Indonesia",
    location: "Remote",
    description:
      "Mentoring junior developers and sharing open-source projects on web and mobile engineering. Organized weekly code-review sessions and published reusable component libraries adopted by the community.",
    tags: ["Mentoring", "Open Source", "React", "Community"],
    type: "organization",
  },
];
