"use client";

import { useRef, type HTMLAttributes } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MQ, range } from "@/lib/motion";

/**
 * Before/after wipe tied to scroll: lit layer clip inset(0 (1 − p)·100% 0 0) plus a moving gold line,
 * p = edge(0.85, 0.35).
 */
export function BeforeAfter({ children, ...rest }: HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const lit = root.querySelector<HTMLElement>("[data-ba-lit]");
      const line = root.querySelector<HTMLElement>("[data-ba-line]");
      let w = root.offsetWidth;

      const apply = (p: number) => {
        if (lit) lit.style.clipPath = `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0)`;
        if (line) {
          line.style.transform = `translate3d(${(p * w).toFixed(1)}px,0,0)`;
          line.style.opacity = p <= 0.001 || p >= 0.999 ? "0" : "1";
        }
      };

      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const st = ScrollTrigger.create({
          trigger: root,
          ...range.edge(0.85, 0.35),
          onUpdate: (s) => apply(s.progress),
          onRefresh: (s) => {
            w = root.offsetWidth;
            apply(s.progress);
          },
        });
        apply(st.progress);
      });
      mm.add(MQ.reduce, () => apply(1));
    },
    { scope: ref },
  );

  return (
    <figure ref={ref} {...rest}>
      {children}
    </figure>
  );
}
