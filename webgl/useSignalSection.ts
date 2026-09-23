"use client";

import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSignal } from "./SignalContext";

gsap.registerPlugin(ScrollTrigger);

export function useSignalSection(ref: RefObject<HTMLElement | null>, mode: number, start = "top 55%") {
  const { setMode } = useSignal();

  useLayoutEffect(() => {
    if (!ref.current) return;
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start,
      end: "bottom 45%",
      onEnter: () => setMode(mode),
      onEnterBack: () => setMode(mode),
    });
    return () => trigger.kill();
  }, [mode, ref, setMode, start]);
}
