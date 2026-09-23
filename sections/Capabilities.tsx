"use client";

import { useRef, useState } from "react";
import { useSignalSection } from "@/webgl/useSignalSection";

const groups = [
  { name: "BUILD", code: "01", services: ["Websites", "Web Applications", "Mobile / Android", "Software / SaaS"] },
  { name: "INTELLIGENCE", code: "02", services: ["AI / ML", "AI Automation", "Data Systems", "Applied Prototyping"] },
  { name: "GROW", code: "03", services: ["Digital Marketing", "SEO", "Campaign Systems", "Business Strategy"] },
  { name: "IDENTITY", code: "04", services: ["Branding", "UI / UX", "Graphic Design", "Photo + Video"] },
];

export function Capabilities() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useSignalSection(section, 1);

  return (
    <section ref={section} id="capabilities" className="capabilities section-grid" aria-labelledby="capabilities-title">
      <div className="capabilities__top">
        <p className="micro">004 / CAPABILITY NETWORK</p>
        <p className="capabilities__summary">Four disciplines. One connected system. Built to move from strategy to shipped product without losing the idea between teams.</p>
      </div>

      <h2 id="capabilities-title" className="sr-only">Capabilities</h2>
      <div className="capabilities__stage">
        <div className="capabilities__names" role="tablist" aria-label="Capability groups">
          {groups.map((group, index) => (
            <button
              key={group.name}
              type="button"
              className={`capability-name ${active === index ? "is-active" : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              role="tab"
              aria-selected={active === index}
              data-cursor="EXPLORE"
            >
              <span>{group.code}</span>
              <strong>{group.name}</strong>
            </button>
          ))}
        </div>
        <div className="capabilities__detail" role="tabpanel">
          <p className="micro">ACTIVE / {groups[active].code}</p>
          <ol>
            {groups[active].services.map((service, index) => (
              <li key={service}><span>0{index + 1}</span>{service}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
