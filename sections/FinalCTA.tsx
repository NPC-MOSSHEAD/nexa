"use client";

import { useRef } from "react";
import { useSignalSection } from "@/webgl/useSignalSection";

export function FinalCTA() {
  const section = useRef<HTMLElement>(null);
  useSignalSection(section, 3, "top 62%");

  return (
    <section ref={section} id="contact" className="final-cta section-grid" aria-labelledby="cta-title">
      <p className="micro">008 / OPEN CHANNEL</p>
      <h2 id="cta-title">BRING US<br />SOMETHING<br /><span>DIFFICULT.</span></h2>
      <a className="final-cta__action" href="mailto:hello@nexa.studio" data-cursor="START">
        <span>Start a project</span><span>↗</span>
      </a>
      <footer className="site-footer micro">
        <div><strong>NEXA®</strong><span>CREATIVE TECHNOLOGY STUDIO</span></div>
        <div><a href="#top">BACK TO TOP ↑</a><span>© 2026</span></div>
      </footer>
    </section>
  );
}
