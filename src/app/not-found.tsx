import { getTranslations } from "next-intl/server";
import { NotFoundGlitch } from "@/components/motion/not-found/glitch";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main id="main-content">
      <NotFoundGlitch
        code="404"
        title={t("title")}
        description={t("description")}
        homeHref="/"
        homeLabel={t("goHome")}
      />
    </main>
  );
}
