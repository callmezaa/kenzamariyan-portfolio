import { NotFoundGlitch } from "@/components/motion/not-found/glitch";

export default function NotFound() {
  return (
    <main id="main-content">
      <NotFoundGlitch
        code="404"
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        homeHref="/"
        homeLabel="Go home"
      />
    </main>
  );
}
