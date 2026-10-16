"use client";

import { useRef, type HTMLAttributes } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MQ, range } from "@/lib/motion";

/**
 * Final CTA, the warmest moment: the giant diamond outline draws itself (stroke-dashoffset 1 → 0)
 * and a warm radial glow fades in, both on p = edge(0.95, 0.2).
 */
export function DiamondDraw({ children, ...rest }: HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const path = root.querySelector<SVGPathElement>("[data-draw]");
      const apply = (p: number) => {
        if (path) path.style.strokeDashoffset = (1 - p).toFixed(4);
        root.style.setProperty("--warm", p.toFixed(3));
      };
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const st = ScrollTrigger.create({
          trigger: root,
          ...range.edge(0.95, 0.2),
          onUpdate: (s) => apply(s.progress),
          onRefresh: (s) => apply(s.progress),
        });
        apply(st.progress);
      });
      mm.add(MQ.reduce, () => apply(1));
    },
    { scope: ref },
  );

  return (
    <section ref={ref} {...rest}>
      {children}
    </section>
  );
}
