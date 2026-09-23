"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("nexa-loaded");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      setHidden(true);
      return;
    }

    const state = { value: 0 };
    const tween = gsap.to(state, {
      value: 100,
      duration: 0.78,
      ease: "power2.inOut",
      onUpdate: () => setValue(Math.round(state.value)),
      onComplete: () => {
        sessionStorage.setItem("nexa-loaded", "1");
        gsap.to(root.current, {
          yPercent: -105,
          duration: 0.72,
          ease: "power4.inOut",
          onComplete: () => setHidden(true),
        });
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  if (hidden) return null;

  return (
    <div ref={root} className="preloader" aria-live="polite">
      <div className="preloader__top">
        <span>NEXA / SYSTEM</span>
        <span>INITIALIZING</span>
      </div>
      <div className="preloader__count">{String(value).padStart(3, "0")}</div>
      <div className="preloader__track">
        <div className="preloader__fill" style={{ transform: `scaleX(${value / 100})` }} />
      </div>
    </div>
  );
}
