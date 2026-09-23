"use client";

import { useRef } from "react";
import { useSignalSection } from "@/webgl/useSignalSection";

export function Lab() {
  const section = useRef<HTMLElement>(null);
  useSignalSection(section, 2, "top 62%");

  return (
    <section ref={section} id="lab" className="lab section-grid" aria-labelledby="lab-title">
      <div className="lab__frame" aria-hidden="true">
        <span className="lab__corner lab__corner--tl" />
        <span className="lab__corner lab__corner--tr" />
        <span className="lab__corner lab__corner--bl" />
        <span className="lab__corner lab__corner--br" />
      </div>
      <p className="micro lab__index">005 / EXPERIMENTAL LAB</p>
      <div className="lab__copy">
        <p className="micro">CURRENT EXPERIMENT / 017<br />REAL-TIME SIGNAL FIELD</p>
        <h2 id="lab-title">WE DON&apos;T WAIT<br />FOR THE FUTURE<br />TO SHIP.</h2>
        <p>Move through the field. Pointer proximity bends the structure. Scroll velocity introduces stress. The same system has been changing state since the first screen.</p>
      </div>
      <div className="lab__readout micro">
        <span>INPUT / POINTER</span>
        <span>STATE / REACTIVE</span>
        <span>GPU / ADAPTIVE</span>
      </div>
    </section>
  );
}
