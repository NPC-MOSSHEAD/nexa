"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/content/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { TransitionLink } from "@/components/TransitionProvider";
import { useSignalSection } from "@/webgl/useSignalSection";

gsap.registerPlugin(ScrollTrigger);

export function SelectedWork() {
  const section = useRef<HTMLElement>(null);
  useSignalSection(section, 1);

  useLayoutEffect(() => {
    if (!section.current) return;
    const panels = gsap.utils.toArray<HTMLElement>(".project-panel", section.current);
    const cleanups = panels.map((panel) => {
      const visual = panel.querySelector(".project-visual");
      const content = panel.querySelector(".project-panel__content");
      const tween = gsap.fromTo(
        visual,
        { scale: 0.88, clipPath: "inset(14% 8% 14% 8%)" },
        {
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: panel, start: "top 90%", end: "center 48%", scrub: 1 },
        },
      );
      const copy = gsap.from(content, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: panel, start: "top 65%" },
      });
      return () => { tween.kill(); copy.kill(); };
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section ref={section} id="work" className="work" aria-labelledby="work-title">
      <header className="work__header section-grid">
        <p className="micro">003 / SELECTED SYSTEMS</p>
        <h2 id="work-title" className="display-serif">Real work.<br />No filler.</h2>
        <p>Four fictional launch cases hold the structure. Replace them with real projects without touching the interaction model.</p>
      </header>

      <div className="work__projects">
        {projects.map((project) => (
          <article key={project.slug} className="project-panel">
            <TransitionLink href={`/work/${project.slug}`} className="project-panel__link" data-cursor="VIEW">
              <ProjectVisual project={project} />
              <div className="project-panel__content section-grid">
                <div className="project-panel__index">{project.index}</div>
                <div>
                  <p className="micro">{project.category} / {project.year}</p>
                  <h3>{project.title}</h3>
                </div>
                <p>{project.descriptor}</p>
                <span className="project-panel__arrow">↗</span>
              </div>
            </TransitionLink>
          </article>
        ))}
      </div>
    </section>
  );
}
