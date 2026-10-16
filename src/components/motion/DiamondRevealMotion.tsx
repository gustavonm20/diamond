"use client";

import { useRef, type HTMLAttributes } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { clamp, MQ, range } from "@/lib/motion";

const diamond = (r: number) =>
  `polygon(50% calc(50% - ${r}px), calc(50% + ${r}px) 50%, 50% calc(50% + ${r}px), calc(50% - ${r}px) 50%)`;

/**
 * DiamondReveal (sticky 190vh, p = pin): a diamond of light opens from the center and flips the page
 * to cream. R = Rmax·clamp(p/0.6), Rmax = (vw + vh)/2; gold rim at R·1.035 + 4.
 * A faint brilliant-cut facet drawing scales with the opening and fades as the light fills the screen.
 */
export function DiamondRevealMotion({
  children,
  className,
  style,
  ...rest
}: HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = <T extends Element>(s: string) => root.querySelector<T>(s);
      const spark = q<HTMLElement>("[data-spark]");
      const cue = q<HTMLElement>("[data-cue]");
      const rim = q<HTMLElement>("[data-rim]");
      const lit = q<HTMLElement>("[data-lit]");
      const facets = q<SVGSVGElement>("[data-facets]");
      const facetsG = q<SVGGElement>("[data-facets-g]");
      const text = q<HTMLElement>("[data-text]");
      const line = q<HTMLElement>("[data-line]");

      let rMax = 1;
      let cx = 0;
      let cy = 0;
      const measure = () => {
        const w = window.innerWidth;
        const h = root.querySelector<HTMLElement>(".stage")?.offsetHeight || window.innerHeight;
        rMax = (w + h) / 2;
        cx = w / 2;
        cy = h / 2;
        // Pixel viewBox so the facet lines keep a true 1px stroke at any scale.
        facets?.setAttribute("viewBox", `0 0 ${w} ${h}`);
      };

      const apply = (p: number) => {
        const R = rMax * clamp(p / 0.6);
        if (spark) spark.style.opacity = (1 - clamp(p / 0.05)).toFixed(3);
        if (cue) cue.style.opacity = (1 - clamp(p / 0.08)).toFixed(3);
        if (lit) lit.style.clipPath = diamond(R);
        if (rim) rim.style.clipPath = diamond(R > 0 ? R * 1.035 + 4 : 0);
        if (facets && facetsG) {
          facetsG.setAttribute(
            "transform",
            `translate(${cx} ${cy}) scale(${(R / 100).toFixed(4)})`,
          );
          facets.style.opacity = (0.4 * (1 - clamp((p - 0.3) / 0.28))).toFixed(3);
        }
        if (text) {
          text.style.opacity = clamp((p - 0.35) / 0.25).toFixed(3);
          text.style.transform = `scale(${(0.85 + 0.15 * clamp((p - 0.35) / 0.4)).toFixed(4)})`;
        }
        if (line) line.style.transform = `scaleX(${clamp((p - 0.7) / 0.2).toFixed(4)})`;
      };

      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        measure();
        const st = ScrollTrigger.create({
          trigger: root,
          ...range.pin,
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
    <section ref={ref} className={className} style={style} {...rest}>
      {children}
    </section>
  );
}
