import type { Metadata } from "next";
import AchievementsPage from "@/app/components/achievements-page/AchievementsPage";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Nine verifiable credentials — national professional certification, global tech programs, and competition wins — with full certificate galleries.",
  alternates: {
    canonical: "/achievements",
  },
};

export default function AchievementsRoute() {
  return <AchievementsPage />;
}
