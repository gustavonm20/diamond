"use client";

import { useRef, type HTMLAttributes } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { clamp, MQ, range } from "@/lib/motion";

/**
 * Segments: sticky media column; image i ≥ 1 wipes in with clip-path inset((1 − r)·100% 0 0 0),
 * r = clamp((0.85vh − blockTop)/(0.4vh)). Active block = last one with top < 0.55vh (others at 0.3).
 * Reduced motion: images switch instantly instead of wiping.
 */
export function StickyWipe({ children, ...rest }: HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const blocks = Array.from(root.querySelectorAll<HTMLElement>("[data-seg]"));
      const imgs = Array.from(root.querySelectorAll<HTMLElement>("[data-seg-img]"));
      const counter = root.querySelector<HTMLElement>("[data-seg-count]");
      const total = String(blocks.length).padStart(2, "0");
      let current = -1;

      const make = (instant: boolean) => () => {
        const vh = window.innerHeight;
        let active = 0;
        blocks.forEach((b, i) => {
          const top = b.getBoundingClientRect().top;
          if (i >= 1 && imgs[i]) {
            let r = clamp((0.85 * vh - top) / (0.4 * vh));
            if (instant) r = r >= 0.5 ? 1 : 0;
            imgs[i].style.clipPath = `inset(${((1 - r) * 100).toFixed(2)}% 0 0 0)`;
          }
          if (top < 0.55 * vh) active = i;
        });
        if (active !== current) {
          current = active;
          blocks.forEach((b, i) => b.classList.toggle("on", i === active));
          if (counter) counter.textContent = `${String(active + 1).padStart(2, "0")} / ${total}`;
        }
      };

      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, reduce: MQ.reduce }, (ctx) => {
        const apply = make(!(ctx.conditions as { motion: boolean }).motion);
        ScrollTrigger.create({
          trigger: root,
          ...range.through,
          onUpdate: apply,
          onRefresh: apply,
        });
        apply();
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} {...rest}>
      {children}
    </section>
  );
}
