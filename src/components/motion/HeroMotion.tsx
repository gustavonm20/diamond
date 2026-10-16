"use client";

import { useRef, type HTMLAttributes } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { heroState } from "@/lib/hero-state";
import { clamp, lerp, MQ } from "@/lib/motion";

/**
 * Hero scroll-out (p = clamp(-top / (height·0.8))):
 * line 1 x → −8%, line 2 x → +8%, content opacity 1 − 1.2p, skyline scale → 1.15,
 * diamond rotate → 12° / scale → 1.1, scroll cue fades first.
 * Plus cursor spotlight and a light pointer parallax on the stone.
 */
export function HeroMotion({ children, className, ...rest }: HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = <T extends HTMLElement>(s: string) => root.querySelector<T>(s);
      const l1 = q("[data-hero-line='1']");
      const l2 = q("[data-hero-line='2']");
      const content = q("[data-hero-content]");
      const sky = q("[data-hero-sky]");
      const diamond = q("[data-hero-diamond]");
      const cue = q("[data-hero-cue]");
      const parallax = q("[data-hero-parallax]");

      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const apply = (p: number) => {
          heroState.scroll = p;
          if (l1) l1.style.transform = `translate3d(${(-8 * p).toFixed(3)}%,0,0)`;
          if (l2) l2.style.transform = `translate3d(${(8 * p).toFixed(3)}%,0,0)`;
          if (content) content.style.opacity = clamp(1 - 1.2 * p).toFixed(3);
          if (sky) sky.style.transform = `scale(${(1 + 0.15 * p).toFixed(4)})`;
          if (diamond)
            diamond.style.transform = `rotate(${(12 * p).toFixed(2)}deg) scale(${(1 + 0.1 * p).toFixed(4)})`;
          if (cue) cue.style.opacity = clamp(1 - p * 4).toFixed(3);
        };
        const st = ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: () => `+=${root.offsetHeight * 0.8}`,
          onUpdate: (s) => apply(s.progress),
          onRefresh: (s) => apply(s.progress),
        });
        apply(st.progress);

        // Spotlight + parallax (fine pointers only)
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        let tx = 0;
        let ty = 0;
        let cx = 0;
        let cy = 0;
        const onMove = (e: PointerEvent) => {
          const r = root.getBoundingClientRect();
          root.style.setProperty("--mx", `${e.clientX - r.left}px`);
          root.style.setProperty("--my", `${e.clientY - r.top}px`);
          tx = (e.clientX / window.innerWidth - 0.5) * -28;
          ty = (e.clientY / window.innerHeight - 0.5) * -20;
        };
        const onEnter = () => root.classList.add("spot");
        const onLeave = () => {
          root.classList.remove("spot");
          tx = ty = 0;
        };
        const tick = () => {
          cx = lerp(cx, tx, 0.06);
          cy = lerp(cy, ty, 0.06);
          if (parallax && (Math.abs(cx - tx) > 0.01 || Math.abs(cy - ty) > 0.01))
            parallax.style.transform = `translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0)`;
        };
        if (fine) {
          root.addEventListener("pointermove", onMove);
          root.addEventListener("pointerenter", onEnter);
          root.addEventListener("pointerleave", onLeave);
          gsap.ticker.add(tick);
        }

        return () => {
          heroState.scroll = 0;
          [l1, l2, sky, diamond, parallax].forEach((el) => el && (el.style.transform = ""));
          [content, cue].forEach((el) => el && (el.style.opacity = ""));
          root.removeEventListener("pointermove", onMove);
          root.removeEventListener("pointerenter", onEnter);
          root.removeEventListener("pointerleave", onLeave);
          gsap.ticker.remove(tick);
        };
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} {...rest}>
      {children}
    </section>
  );
}
