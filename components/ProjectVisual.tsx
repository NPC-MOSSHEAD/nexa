import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";

export function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === "neural") {
    return (
      <div className="project-visual project-visual--neural" aria-hidden="true">
        <div className="neural-core" />
        {Array.from({ length: 11 }).map((_, i) => (
          <i key={i} style={{ "--i": i } as CSSProperties} />
        ))}
        <span className="visual-tag visual-tag--a">LIVE MODEL / 8.17</span>
        <span className="visual-tag visual-tag--b">PATTERN / ACTIVE</span>
      </div>
    );
  }

  if (project.visual === "commerce") {
    return (
      <div className="project-visual project-visual--commerce" aria-hidden="true">
        <div className="commerce-plane commerce-plane--back" />
        <div className="commerce-plane commerce-plane--front">
          <span>ARC</span>
          <b>Objects worth keeping.</b>
          <i />
        </div>
        <div className="commerce-orbit" />
      </div>
    );
  }

  if (project.visual === "identity") {
    return (
      <div className="project-visual project-visual--identity" aria-hidden="true">
        <span className="identity-word identity-word--one">FORM</span>
        <span className="identity-word identity-word--two">FORM</span>
        <span className="identity-word identity-word--three">01</span>
        <div className="identity-axis" />
      </div>
    );
  }

  return (
    <div className="project-visual project-visual--mobile" aria-hidden="true">
      <div className="phone phone--left">
        <span>ORBIT</span>
        <i className="phone__planet" />
      </div>
      <div className="phone phone--right">
        <span>03:18</span>
        <div className="phone__wave" />
        <b>Focus<br />without noise.</b>
      </div>
    </div>
  );
}
