"use client";

import type { ReactNode } from "react";
import { SignalProvider } from "@/webgl/SignalContext";
import { TransitionProvider } from "./TransitionProvider";
import { SmoothScroll } from "./SmoothScroll";
import { CustomCursor } from "./CustomCursor";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TransitionProvider>
      <SignalProvider>
        <SmoothScroll />
        <CustomCursor />
        {children}
      </SignalProvider>
    </TransitionProvider>
  );
}
