"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSignalSection } from "@/webgl/useSignalSection";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  ["01", "DISCOVER", "Find the constraint worth solving."],
  ["02", "DEFINE", "Turn noise into a sharp system brief."],
  ["03", "DESIGN", "Prototype the behavior, not just the surface."],
  ["04", "BUILD", "Engineer the experience for real conditions."],
  ["05", "LAUNCH", "Ship fast without shipping fragile."],
  ["06", "EVOLVE", "Measure, learn and sharpen the system."],
] as const;

export function Process() {
  const section = useRef<HTMLElement>(null);
  useSignalSection(section, 1);

  useLayoutEffect(() => {
    if (!section.current) return;
    const line = section.current.querySelector<HTMLElement>(".process__progress");
    const items = gsap.utils.toArray<HTMLElement>(".process-step", section.current);
    const ctx = gsap.context(() => {
      gsap.fromTo(line, { scaleX: 0 }, {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top 72%", end: "bottom 70%", scrub: 1 },
      });
      items.forEach((item) => {
        gsap.from(item, {
          opacity: 0.28,
          y: 24,
          scrollTrigger: { trigger: item, start: "top 78%", end: "top 58%", scrub: 1 },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="process section-grid" aria-labelledby="process-title">
      <header className="process__header">
        <p className="micro">006 / PROCESS</p>
        <h2 id="process-title" className="display-serif">A clear path<br />through complexity.</h2>
      </header>
      <div className="process__line"><i className="process__progress" /></div>
      <ol className="process__steps">
        {steps.map(([code, title, text]) => (
          <li key={title} className="process-step">
            <span>{code}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
