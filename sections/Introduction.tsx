"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSignalSection } from "@/webgl/useSignalSection";

gsap.registerPlugin(ScrollTrigger);

export function Introduction() {
  const section = useRef<HTMLElement>(null);
  useSignalSection(section, 1);

  useLayoutEffect(() => {
    if (!section.current) return;
    const words = section.current.querySelectorAll("[data-word]");
    const ctx = gsap.context(() => {
      gsap.from(words, {
        opacity: 0.12,
        y: 20,
        stagger: 0.035,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top 68%",
          end: "center 45%",
          scrub: 1,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const sentence = "A small system of designers engineers and strategists built to move between disciplines.".split(" ");

  return (
    <section ref={section} className="intro section-grid" aria-labelledby="intro-title">
      <div className="intro__label micro">002 / WHAT WE ARE</div>
      <h2 id="intro-title" className="intro__statement">
        NOT AN AGENCY<br />WITH A LONGER<br />SERVICES LIST.
      </h2>
      <p className="intro__body">
        {sentence.map((word, index) => (
          <span key={`${word}-${index}`} data-word>{word} </span>
        ))}
      </p>
      <div className="intro__discipline micro">
        <span>DESIGN</span><span>ENGINEERING</span><span>STRATEGY</span><span>INTELLIGENCE</span>
      </div>
    </section>
  );
}
