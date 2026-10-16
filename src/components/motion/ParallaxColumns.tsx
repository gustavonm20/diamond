"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MQ, range } from "@/lib/motion";

/**
 * Portfolio wall: 72vh window, masked top and bottom, columns drift at different speeds:
 * translateY = speed[i]·(through − 0.5)·2. The plane itself sits slightly tilted in 3D.
 */
export function ParallaxColumns({
  children,
  speeds = [-140, 90, -180, 110],
}: {
  children: ReactNode;
  speeds?: number[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const cols = Array.from(root.querySelectorAll<HTMLElement>("[data-col]"));
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const apply = (t: number) =>
          cols.forEach((c, i) => {
            c.style.transform = `translate3d(0,${((speeds[i] ?? 0) * (t - 0.5) * 2).toFixed(1)}px,0)`;
          });
        const st = ScrollTrigger.create({
          trigger: root,
          ...range.through,
          onUpdate: (s) => apply(s.progress),
          onRefresh: (s) => apply(s.progress),
        });
        apply(st.progress);
        return () => cols.forEach((c) => (c.style.transform = ""));
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="wall" aria-hidden="true">
      <div className="wall-plane">
        <div className="wall-cols">{children}</div>
      </div>
    </div>
  );
}
