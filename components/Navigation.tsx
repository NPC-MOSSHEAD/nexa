"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const links = [
  ["01", "Work", "#work"],
  ["02", "Capabilities", "#capabilities"],
  ["03", "Lab", "#lab"],
  ["04", "About", "#about"],
  ["05", "Start", "#contact"],
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="site-nav">
        <a href="#top" className="site-nav__brand" data-cursor="TOP" aria-label="NEXA home">
          NEXA<span>®</span>
        </a>
        <div className="site-nav__meta">CREATIVE TECHNOLOGY / 2026</div>
        <button
          className="site-nav__menu"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="nav-environment"
          data-cursor={open ? "CLOSE" : "OPEN"}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="site-nav__menu-index">05</span>
        </button>
      </header>

      <div id="nav-environment" className={`nav-environment ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="nav-environment__fibers" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => (
            <i key={index} style={{ "--i": index } as CSSProperties} />
          ))}
        </div>
        <nav className="nav-environment__links" aria-label="Primary navigation">
          {links.map(([index, label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="nav-environment__link"
              data-cursor="GO"
              tabIndex={open ? 0 : -1}
            >
              <span>{index}</span>
              <strong>{label}</strong>
              <em>↘</em>
            </a>
          ))}
        </nav>
        <div className="nav-environment__footer">
          <span>AVAILABLE FOR SELECT PARTNERSHIPS</span>
          <span>INDIA / WORLDWIDE</span>
        </div>
      </div>
    </>
  );
}
