"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MQ, range } from "@/lib/motion";

/**
 * Outline headline (1px gold-lo stroke) that fills with a gold gradient as you scroll:
 * background-position x = 100 − 100p% with p = edge(0.9, 0.3); horizontal drift (1 − through)·6vw − 3vw.
 */
export function LightFillText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const fill = (p: number) =>
          (el.style.backgroundPosition = `${(100 - 100 * p).toFixed(2)}% 0`);
        const drift = (t: number) =>
          (el.style.transform = `translate3d(${((1 - t) * 6 - 3).toFixed(3)}vw,0,0)`);
        const a = ScrollTrigger.create({
          trigger: el,
          ...range.edge(0.9, 0.3),
          onUpdate: (s) => fill(s.progress),
          onRefresh: (s) => fill(s.progress),
        });
        const b = ScrollTrigger.create({
          trigger: el,
          ...range.through,
          onUpdate: (s) => drift(s.progress),
          onRefresh: (s) => drift(s.progress),
        });
        fill(a.progress);
        drift(b.progress);
        return () => {
          el.style.backgroundPosition = "";
          el.style.transform = "";
        };
      });
      mm.add(MQ.reduce, () => {
        el.style.backgroundPosition = "0% 0";
      });
    },
    { scope: ref },
  );

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
}
