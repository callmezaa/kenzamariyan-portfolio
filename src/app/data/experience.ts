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
    year: "2024 - Present",
    title: "Freelance Web & Mobile Developer",
    place: "Independent",
    location: "Remote",
    description:
      "Developing end-to-end web and mobile applications, from requirements and interface planning to implementation and deployment handoff.",
    tags: ["Next.js", "React Native", "Firebase", "TypeScript"],
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
];
