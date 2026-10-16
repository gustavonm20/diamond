"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MQ } from "@/lib/motion";

/**
 * Process timeline: rail fill = clamp((0.6vh − top)/height) (ScrollTrigger "top 60%" → "bottom 60%").
 * A step lights up (node glow + title to cream) once fill ≥ step.offsetTop/height and fill > 0.01.
 */
export function DrawLine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const fill = root.querySelector<HTMLElement>("[data-rail]");
      const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
      let marks: number[] = [];
      const measure = () => {
        const h = root.offsetHeight || 1;
        marks = steps.map((s) => s.offsetTop / h);
      };

      const apply = (p: number) => {
        if (fill) fill.style.transform = `scaleY(${p.toFixed(4)})`;
        steps.forEach((s, i) => s.classList.toggle("on", p > 0.01 && p >= marks[i]));
      };

      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        measure();
        const st = ScrollTrigger.create({
          trigger: root,
          start: "top 60%",
          end: "bottom 60%",
          onUpdate: (s) => apply(s.progress),
          onRefresh: (s) => {
            measure();
            apply(s.progress);
          },
        });
        apply(st.progress);
      });
      mm.add(MQ.reduce, () => {
        measure();
        apply(1);
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="tl">
      <div className="rail" aria-hidden="true">
        <i data-rail />
      </div>
      {children}
    </div>
  );
}
