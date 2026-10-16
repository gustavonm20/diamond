"use client";

import { useRef, type HTMLAttributes } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { clamp, mixHex, MQ, range } from "@/lib/motion";

/**
 * Problem scene (sticky 260vh). p = clamp((pin − 0.08) / 0.72):
 * sign fill #2B2B30 → cream, halo → 0.45, light cone → 0.08, reflection → 0.2,
 * windows #17171A → #3A3122, statements light at 0.22 / 0.48 / 0.74, progress meter.
 */
export function LightsOnScene({
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
      const sign = root.querySelector<SVGTextElement>("[data-sign]");
      const halo = root.querySelector<SVGTextElement>("[data-halo]");
      const cone = root.querySelector<SVGPolygonElement>("[data-cone]");
      const refl = root.querySelector<SVGEllipseElement>("[data-refl]");
      const art = root.querySelector<SVGSVGElement>("[data-art]");
      const wins = Array.from(root.querySelectorAll<SVGRectElement>("[data-win]"));
      const sts = Array.from(root.querySelectorAll<HTMLElement>("[data-at]"));
      const bar = root.querySelector<HTMLElement>("[data-bar]");
      const pct = root.querySelector<HTMLElement>("[data-pct]");

      let lastPct = -1;
      const apply = (pin: number, tilt: boolean) => {
        const p = clamp((pin - 0.08) / 0.72);
        sign?.setAttribute("fill", mixHex("#2B2B30", "#F4EFE6", p));
        halo?.setAttribute("opacity", (p * 0.45).toFixed(3));
        cone?.setAttribute("opacity", (p * 0.08).toFixed(3));
        refl?.setAttribute("opacity", (p * 0.2).toFixed(3));
        const wf = mixHex("#17171A", "#3A3122", p);
        wins.forEach((w) => w.setAttribute("fill", wf));
        sts.forEach((s) => s.classList.toggle("on", p >= Number(s.dataset.at)));
        if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
        const v = Math.round(p * 100);
        if (pct && v !== lastPct) {
          pct.textContent = `${v}%`;
          lastPct = v;
        }
        if (art && tilt)
          art.style.transform = `rotateY(${(-12 + 9 * p).toFixed(2)}deg) rotateX(${(2 - 2 * p).toFixed(2)}deg)`;
      };

      const mm = gsap.matchMedia();
      // `reduce` is listed so the callback always runs (gsap only calls it when a condition matches).
      mm.add({ motion: MQ.motion, reduce: MQ.reduce, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) {
          apply(1, false);
          return;
        }
        const st = ScrollTrigger.create({
          trigger: root,
          ...range.pin,
          onUpdate: (s) => apply(s.progress, desktop),
          onRefresh: (s) => apply(s.progress, desktop),
        });
        apply(st.progress, desktop);
        return () => {
          if (art) art.style.transform = "";
        };
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
