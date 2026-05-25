export type ProjectType = "mobile" | "dashboard" | "company";

export interface Project {
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: string;
  stack: string[];
  role: string;
  year: string;
  sourceUrl: string;
  demoUrl?: string;
  type: ProjectType;
  metrics: string[];
  accent: {
    glow: string;
    text: string;
    border: string;
    shadow: string;
    button: string;
    badge: string;
  };
}

export const projects: Project[] = [
  {
    title: "Gotani Mobile Application",
    summary:
      "A React Native point-of-sale and agriculture workflow app for product, transaction, and inventory operations.",
    challenge:
      "Farmers and operators needed a mobile-first workflow to record products and transactions without relying on a desktop admin panel.",
    solution:
      "Built the mobile UI, Firebase integration, Firestore data flows, and transaction screens with a focus on simple daily operations.",
    impact:
      "Turned a manual operational process into a structured mobile workflow that can scale into reporting, inventory, and admin review.",
    stack: ["React Native", "Firebase", "Firestore"],
    role: "Mobile & Backend Developer",
    year: "2024",
    sourceUrl: "https://github.com/callmezaa/pointofsales-gotani.git",
    type: "mobile",
    metrics: ["Mobile POS workflow", "Firebase-backed data", "Inventory-oriented UX"],
    accent: {
      glow: "rgba(16, 185, 129, 0.14)",
      text: "group-hover:text-emerald-400",
      border: "hover:border-emerald-500/30",
      shadow: "hover:shadow-emerald-500/5",
      button: "hover:border-emerald-500/50 hover:text-emerald-300",
      badge: "rgba(16, 185, 129, 0.08)",
    },
  },
  {
    title: "Gotani Admin Dashboard",
    summary:
      "A web dashboard for managing agriculture products, users, and transaction data with operational clarity.",
    challenge:
      "Admin users needed a clearer interface to inspect platform data and manage daily agriculture operations from the web.",
    solution:
      "Developed dashboard screens with React and Vite, organizing management flows around scannable tables and action-focused views.",
    impact:
      "Created a centralized admin surface that makes non-technical operational tasks easier to navigate and maintain.",
    stack: ["React", "Vite", "Tailwind CSS"],
    role: "Frontend Developer",
    year: "2024",
    sourceUrl: "https://github.com/callmezaa/web-admin-gotani",
    type: "dashboard",
    metrics: ["Admin operations", "Data management", "Responsive web UI"],
    accent: {
      glow: "rgba(6, 182, 212, 0.14)",
      text: "group-hover:text-cyan-400",
      border: "hover:border-cyan-500/30",
      shadow: "hover:shadow-cyan-500/5",
      button: "hover:border-cyan-500/50 hover:text-cyan-300",
      badge: "rgba(6, 182, 212, 0.08)",
    },
  },
  {
    title: "KPJMI Company Profile Website",
    summary:
      "A cooperative company profile website with dynamic content management for public-facing information.",
    challenge:
      "The cooperative needed a stronger digital presence and a practical way to publish information for members and external visitors.",
    solution:
      "Designed and implemented a company profile experience backed by a MySQL-powered content workflow.",
    impact:
      "Improved public trust and information access by giving the organization a maintainable web presence.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    role: "Web Developer",
    year: "2023",
    sourceUrl: "https://github.com/callmezaa/koperasi-merdekaa",
    type: "company",
    metrics: ["Public profile", "Dynamic content", "MySQL-backed CMS"],
    accent: {
      glow: "rgba(245, 158, 11, 0.14)",
      text: "group-hover:text-amber-400",
      border: "hover:border-amber-500/30",
      shadow: "hover:shadow-amber-500/5",
      button: "hover:border-amber-500/50 hover:text-amber-300",
      badge: "rgba(245, 158, 11, 0.08)",
    },
  },
];
