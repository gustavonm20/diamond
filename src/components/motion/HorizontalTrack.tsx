"use client";

import { useRef, type HTMLAttributes } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { clamp, MQ, range } from "@/lib/motion";

/**
 * Desktop horizontal track: section height = vh + (trackWidth − vw), sticky stage, x = −maxX·pin.
 * Per-card spotlight, with d = (cardCenter − vw/2)/cardWidth and lit = 1 − clamp(|d|/1.2):
 * dim = 0.6·(1 − lit), gold top line scaleX = lit,
 * transform = perspective(1400px) rotateY(clamp(d, ±1.6)·−10°) scale(0.92 + 0.08·lit).
 * The artwork inside each card counter-shifts with d for a little depth.
 * Below 1024px the track is a native snap carousel (CSS only).
 */
export function HorizontalTrack({ children, ...rest }: HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const track = root.querySelector<HTMLElement>("[data-track]");
      const bar = root.querySelector<HTMLElement>("[data-tbar]");
      if (!track) return;
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]")).map((el) => ({
        el,
        dim: el.querySelector<HTMLElement>("[data-dim]"),
        hl: el.querySelector<HTMLElement>("[data-hl]"),
        art: el.querySelector<HTMLElement>(".scene"),
        center: 0,
      }));

      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        let maxX = 0;
        let vw = window.innerWidth;
        let cw = 1;

        const measure = () => {
          vw = window.innerWidth;
          track.style.transform = "";
          maxX = Math.max(0, track.scrollWidth - vw);
          root.style.height = `${window.innerHeight + maxX}px`;
          cards.forEach((c) => (c.center = c.el.offsetLeft + c.el.offsetWidth / 2));
          cw = cards[0]?.el.offsetWidth || 1;
        };

        const apply = (p: number) => {
          const x = -maxX * p;
          track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
          for (const c of cards) {
            const d = (c.center + x - vw / 2) / cw;
            const lit = 1 - clamp(Math.abs(d) / 1.2);
            c.el.style.transform = `perspective(1400px) rotateY(${(clamp(d, -1.6, 1.6) * -10).toFixed(2)}deg) scale(${(0.92 + 0.08 * lit).toFixed(4)})`;
            if (c.dim) c.dim.style.opacity = (0.6 * (1 - lit)).toFixed(3);
            if (c.hl) c.hl.style.transform = `scaleX(${lit.toFixed(3)})`;
            if (c.art)
              c.art.style.transform = `scale(1.12) translate3d(${(clamp(d, -1.6, 1.6) * -3).toFixed(2)}%,0,0)`;
          }
          if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
        };

        measure();
        const st = ScrollTrigger.create({
          trigger: root,
          ...range.pin,
          onRefreshInit: measure,
          onUpdate: (s) => apply(s.progress),
          onRefresh: (s) => apply(s.progress),
        });
        apply(st.progress);

        return () => {
          root.style.height = "";
          track.style.transform = "";
          if (bar) bar.style.transform = "";
          for (const c of cards) {
            c.el.style.transform = "";
            if (c.dim) c.dim.style.opacity = "";
            if (c.hl) c.hl.style.transform = "";
            if (c.art) c.art.style.transform = "";
          }
        };
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
