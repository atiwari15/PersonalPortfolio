"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";

export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();
  // Server-rendered content stays visible, including when JavaScript is disabled.
  return <div ref={ref} className={inView && !reduced ? "reveal-enter" : undefined}>{children}</div>;
}
