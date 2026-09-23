"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type SignalContextValue = {
  mode: number;
  setMode: (mode: number) => void;
};

const SignalContext = createContext<SignalContextValue | null>(null);

export function SignalProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState(0);
  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return <SignalContext.Provider value={value}>{children}</SignalContext.Provider>;
}

export function useSignal() {
  const value = useContext(SignalContext);
  if (!value) throw new Error("useSignal must be used inside SignalProvider");
  return value;
}
