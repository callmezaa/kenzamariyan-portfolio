# Portfolio Codebase Audit

## Scope
- Audited the current Next.js portfolio codebase without source changes.
- Reviewed routing, layout shell, main sections, project data flow, API routes, theme/motion system, assets, config, and validation output.
- Validation attempted: `npm run lint` and `npm run build`.

## Current Architecture
- Framework: Next.js 16.1.1 App Router, React 19.2.3, TypeScript strict mode, Tailwind CSS v4.
- App routes:
  - `/` renders `Hero`, `Projects`, `About`, `Skills`, `Experience`, `Achievements`, `Exploration`, `Contact` from `src/app/page.tsx`.
  - `/projects` renders `AllProjects`.
  - `/projects/[slug]` statically generates detail pages from `src/app/data/projects.ts`.
  - API routes: `/api/contact`, `/api/visitor`, `/api/github-contributions`.
- Client shell: `src/app/components/LayoutClient.tsx` wraps all pages with `ThemeProvider`, `KeyboardNav`, `Navbar`, dynamic `SmoothScroll`, `Footer`, `ScrollProgress`, and `CommandMenu`.
- UI split:
  - Page sections live in `src/app/components`.
  - Reusable shadcn/base/motion primitives live in `src/components/ui` and `src/components/motion`.
  - Older app-local UI helpers still exist in `src/app/components/ui`.
- Data split:
  - Projects: `src/app/data/projects.ts`.
  - Skills and tech arsenal: `src/app/data/skillsData.ts`, `src/app/data/techArsenal.ts`.
  - Experience/exploration content: matching files in `src/app/data`.
- Assets: project screenshots, profile image, brand logo, favicons, and CV PDF live under `public`.

## Important Findings
- `npm run lint` fails. Main blockers are React Compiler/React Hooks rules in motion primitives: `action-swap.tsx`, `animated-toast-stack.tsx`, `button/stateful.tsx`, `not-found/glitch.tsx`, `number-ticker.tsx`, `smooth-scroll.tsx`, `text-reveal.tsx`, `theme-toggle.tsx`, and `tooltip.tsx`.
- `npm run build` failed in this environment before app-level validation because Turbopack/SWC crashed on Windows with `The paging file is too small for this operation to complete` and `TurbopackInternalError: failed to receive message`.
- README architecture is stale. It references components/features that are missing or renamed, such as `FloatingDock`, `ScrollToTop`, `Playground`, and visitor counter in footer. Current code has `CommandMenu`, `ScrollProgress`, `GitHubSection`, and `TechArsenal`.
- SEO canonical domain is inconsistent across files:
  - `layout.tsx` uses `https://portfolio-amber-ten-22.vercel.app`.
  - `sitemap.ts` and `robots.ts` use `https://kenzamariyan-portfolio.vercel.app`.
  - README points to `https://kenzamariyan.vercel.app`.
- Contact API has duplicated client/server validation, honeypot protection, basic HTML escaping, and an in-memory rate limiter. The rate limiter resets per serverless instance and is not durable.
- `src/lib/visitor.ts` manually calls Upstash REST via `fetch` even though `@upstash/redis` is installed. It also accepts multiple env var names, includes unused `redisSet`, and fallback counts are process-local.
- `/api/visitor` is declared `runtime = "edge"` while using module-level mutable cache/fallback state. This is acceptable only as a soft fallback, not a reliable counter.
- `/api/github-contributions` uses a module cache and GitHub GraphQL token. Missing `GITHUB_TOKEN` intentionally returns empty data, but `.env.local.example` does not document Upstash variables used by visitor counting.
- Project images are duplicated in `Projects.tsx`, `AllProjects.tsx`, and `ProjectDetail.tsx` instead of being part of the project data model. This raises drift risk when adding projects.
- `Projects.tsx` has a dead fallback expression: `projectImages[project.slug] || projectImages[project.slug]`.
- `ProjectDetail.tsx` contains an unused `mercato` image mapping and large hard-coded screenshot maps. This is workable for a small portfolio but is the biggest content-maintenance hotspot.
- Accessibility warning: `aria-pressed` is used on elements with `role="tab"` in `Projects.tsx` and `Skills.tsx`; tabs should use `aria-selected`, not `aria-pressed`.
- Theme behavior is split between `layout.tsx` hardcoded `data-theme="light"` and `ThemeProvider` defaulting to `dark`, with `suppressHydrationWarning`. This likely avoids visible crashes but increases no-flash/theme consistency risk.
- `Footer.tsx` no longer renders `VisitorCounter`, despite README claiming live visitor analytics in footer. Visitor counter component exists but appears unused.
- Several dependencies look feature-specific and should be kept only if actually used: `@base-ui/react`, `shadcn`, `lenis`, `motion`, `next-themes`, `@paper-design/shaders-react`, `@upstash/redis`. Do not remove without usage audit.

## Recommended Next Work
1. Fix lint blockers first, because React Compiler is enabled in `next.config.ts` and these errors point to real compatibility constraints.
2. Decide canonical production domain, then update `metadataBase`, sitemap, robots, README links, OpenGraph copy, and any hardcoded URLs consistently.
3. Consolidate project media into `projects.ts` with optional `coverImage`, `heroImage`, and `screenshots` fields. Remove duplicated image maps from section/detail components.
4. Either wire `VisitorCounter` back into `Footer`/another visible section or delete the visitor feature and `/api/visitor` code. Do not keep half-used analytics.
5. Align `.env.local.example` and README environment variables with actual APIs: `RESEND_API_KEY`, `GITHUB_TOKEN`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, plus any optional public booking URL if still used.
6. Simplify visitor persistence by using either the installed `@upstash/redis` package or plain REST fetch, not both. Current code imports the package only as unused dependency weight.
7. Replace tab `aria-pressed` with correct tab semantics in `Projects.tsx` and `Skills.tsx`.
8. Re-run `npm run lint` after fixes, then rerun build on a machine/environment where SWC/Turbopack can load successfully.

## Validation Plan
- `npm run lint` must pass with zero errors. Warnings can remain only if deliberate and tracked.
- `npm run build` must complete successfully after the local SWC/Turbopack environment issue is resolved.
- Manually verify routes: `/`, `/projects`, each `/projects/[slug]`, `/not-found`, `/api/contact`, `/api/visitor`, `/api/github-contributions`.
- Manually verify responsive behavior on mobile and desktop for navbar drawer, project tabs, project detail screenshot carousel, contact form, theme toggle, and command menu.
- Verify reduced-motion behavior for marquee, text reveal, smooth scroll, and motion primitives.

## Out Of Scope For This Audit
- No source-code changes were made.
- No visual redesign decisions were made.
- No dependency removal was performed.
- No production secrets were inspected.
