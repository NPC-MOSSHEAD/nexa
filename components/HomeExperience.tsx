"use client";

import { Navigation } from "./Navigation";
import { Preloader } from "./Preloader";
import { SignalCanvas } from "@/webgl/SignalCanvas";
import { Hero } from "@/sections/Hero";
import { Introduction } from "@/sections/Introduction";
import { SelectedWork } from "@/sections/SelectedWork";
import { Capabilities } from "@/sections/Capabilities";
import { Lab } from "@/sections/Lab";
import { Process } from "@/sections/Process";
import { About } from "@/sections/About";
import { FinalCTA } from "@/sections/FinalCTA";

export function HomeExperience() {
  return (
    <main id="top" className="relative overflow-clip bg-[#070707] text-[#f1f0eb]">
      <Preloader />
      <SignalCanvas />
      <Navigation />
      <div className="relative z-10">
        <Hero />
        <Introduction />
        <SelectedWork />
        <Capabilities />
        <Lab />
        <Process />
        <About />
        <FinalCTA />
      </div>
    </main>
  );
}
