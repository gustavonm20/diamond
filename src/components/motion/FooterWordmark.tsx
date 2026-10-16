"use client";

import { useRef, type HTMLAttributes } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { mixHex, MQ, range } from "@/lib/motion";

/**
 * Footer element with the giant "DIAMOND" wordmark rising into place:
 * translateY 40% → 0 and color #141417 → #2E271A, p = edge(1.05, 0.7) measured on the footer.
 */
export function FooterWordmark({ children, ...rest }: HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      const mark = root?.querySelector<HTMLElement>("[data-wordmark]");
      if (!root || !mark) return;
      const apply = (p: number) => {
        mark.style.transform = `translate3d(0,${(40 * (1 - p)).toFixed(2)}%,0)`;
        mark.style.color = mixHex("#141417", "#2E271A", p);
      };
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const st = ScrollTrigger.create({
          trigger: root,
          ...range.edge(1.05, 0.7),
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
    <footer ref={ref} {...rest}>
      {children}
    </footer>
  );
}
