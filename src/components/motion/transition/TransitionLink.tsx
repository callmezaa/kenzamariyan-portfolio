"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, type ComponentProps, type MouseEvent } from "react";

type TransitionLinkProps = ComponentProps<typeof Link>;

/**
 * next/link wrapper that runs navigation inside document.startViewTransition
 * when the browser supports it and the user has not requested reduced motion.
 * Falls back to plain Link behavior otherwise (no regression).
 */
export function TransitionLink({ href, onClick, children, ...rest }: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      const modifier = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
      if (modifier) return; // let new-tab / new-window open normally
      if (typeof document === "undefined" || !("startViewTransition" in document)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const target = typeof href === "string" ? href : href?.href;
      if (!target) return;
      e.preventDefault();
      document.startViewTransition(() => {
        router.push(target);
      });
    },
    [href, onClick, router],
  );

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
