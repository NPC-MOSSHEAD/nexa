"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

type TransitionContextValue = {
  navigate: (href: string) => void;
  active: boolean;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(() => setActive(false), 520);
    return () => window.clearTimeout(id);
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || active) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      setActive(true);
      window.setTimeout(() => router.push(href), 430);
    },
    [active, pathname, router],
  );

  const value = useMemo(() => ({ navigate, active }), [navigate, active]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div className={`route-transition ${active ? "is-active" : ""}`} aria-hidden="true">
        <div className="route-transition__line" />
        <div className="route-transition__word">NEXA / SIGNAL</div>
      </div>
    </TransitionContext.Provider>
  );
}

export function useTransitionNav() {
  const value = useContext(TransitionContext);
  if (!value) throw new Error("useTransitionNav must be used inside TransitionProvider");
  return value;
}

export function TransitionLink({
  href,
  children,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { navigate } = useTransitionNav();

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          href.startsWith("#") ||
          href.startsWith("mailto:")
        ) {
          return;
        }
        event.preventDefault();
        navigate(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
