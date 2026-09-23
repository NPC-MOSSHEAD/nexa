"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { SignalField } from "./SignalField";

export function SignalCanvas() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div className="signal-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7.2], fov: 42, near: 0.1, far: 100 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <SignalField reduced={reduced} />
      </Canvas>
    </div>
  );
}
