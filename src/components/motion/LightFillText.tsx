"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MQ, range } from "@/lib/motion";

/**
 * Outline headline (1px gold-lo stroke) that fills with gold as you scroll, p = edge(0.9, 0.3),
 * with a horizontal drift of (1 − through)·6vw − 3vw.
 * The fill is a gold copy inside a clipping wrapper that slides in while its content slides back
 * (two opposing translates): same look as animating background-position, but compositor-only,
 * so the giant text is never repainted. A thin light line rides the leading edge.
 */
export function LightFillText({ lines, className }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const fill = el?.querySelector<HTMLElement>("[data-fill]");
      const inner = el?.querySelector<HTMLElement>("[data-fill-in]");
      if (!el || !fill || !inner) return;

      const setFill = (p: number) => {
        const o = ((1 - p) * 100).toFixed(3);
        fill.style.transform = `translate3d(-${o}%,0,0)`;
        inner.style.transform = `translate3d(${o}%,0,0)`;
        fill.style.setProperty("--edge", p > 0.002 && p < 0.998 ? "1" : "0");
      };

      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const drift = (t: number) =>
          (el.style.transform = `translate3d(${((1 - t) * 6 - 3).toFixed(3)}vw,0,0)`);
        const a = ScrollTrigger.create({
          trigger: el,
          ...range.edge(0.9, 0.3),
          onUpdate: (s) => setFill(s.progress),
          onRefresh: (s) => setFill(s.progress),
        });
        const b = ScrollTrigger.create({
          trigger: el,
          ...range.through,
          onUpdate: (s) => drift(s.progress),
          onRefresh: (s) => drift(s.progress),
        });
        setFill(a.progress);
        drift(b.progress);
        return () => {
          el.style.transform = "";
        };
      });
      mm.add(MQ.reduce, () => setFill(1));
    },
    { scope: ref },
  );

  return (
    <h2 ref={ref} className={className}>
      {lines.map((line) => (
        <span key={line} className="lf-line">
          {line}
        </span>
      ))}
      <span className="lf-fill" data-fill aria-hidden="true">
        <span className="lf-fill-in" data-fill-in>
          {lines.map((line) => (
            <span key={line} className="lf-line">
              {line}
            </span>
          ))}
        </span>
      </span>
    </h2>
  );
}
