"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSignalSection } from "@/webgl/useSignalSection";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const section = useRef<HTMLElement>(null);
  useSignalSection(section, 0, "top 80%");

  useLayoutEffect(() => {
    if (!section.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-line]", {
        yPercent: 115,
        rotate: 1.5,
        duration: 1.15,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.42,
      });
      gsap.from("[data-hero-meta]", {
        opacity: 0,
        y: 14,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.9,
      });
      gsap.to(".hero__word--exist", {
        xPercent: -9,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="hero section-grid" aria-labelledby="hero-title">
      <div className="hero__micro micro" data-hero-meta>
        <span>INDEPENDENT CREATIVE<br />TECHNOLOGY STUDIO</span>
        <span>001 / SIGNAL MATTER</span>
      </div>

      <h1 id="hero-title" className="hero__title" aria-label="We build what doesn't exist yet.">
        <span className="hero__clip"><span data-hero-line>WE BUILD</span></span>
        <span className="hero__clip hero__line--offset"><span data-hero-line>WHAT</span></span>
        <span className="hero__clip"><span data-hero-line>DOESN&apos;T</span></span>
        <span className="hero__clip hero__word--exist"><span data-hero-line>EXIST YET.</span></span>
      </h1>

      <div className="hero__services micro" data-hero-meta>
        <span>DIGITAL PRODUCTS</span>
        <span>INTELLIGENT SYSTEMS</span>
        <span>BRAND EXPERIENCES</span>
      </div>

      <div className="hero__enter" data-hero-meta>
        <span>ENTER SIGNAL</span>
        <span className="hero__enter-line" />
        <span>↓</span>
      </div>
    </section>
  );
}
