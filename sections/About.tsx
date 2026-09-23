"use client";

import { useRef } from "react";
import { useSignalSection } from "@/webgl/useSignalSection";

export function About() {
  const section = useRef<HTMLElement>(null);
  useSignalSection(section, 1);

  return (
    <section ref={section} id="about" className="about section-grid" aria-labelledby="about-title">
      <p className="micro">007 / ABOUT</p>
      <h2 id="about-title" className="display-serif">
        Small enough to care<br />about every pixel.<br /><em>Technical enough to care<br />about everything underneath it.</em>
      </h2>
      <div className="about__body">
        <p>NEXA is a multidisciplinary digital technology studio working across products, intelligent systems, growth and identity.</p>
        <p>We assemble the team around the problem, not the org chart. Strategy, design and engineering stay in the same room until the thing works.</p>
      </div>
      <div className="about__marks micro">
        <span>INDEPENDENT</span><span>DIGITAL-FIRST</span><span>REMOTE / WORLDWIDE</span>
      </div>
    </section>
  );
}
