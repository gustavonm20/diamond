"use client";

import { useRef, type HTMLAttributes } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { clamp, easeInOutCubic, lerp, MQ, range } from "@/lib/motion";

/**
 * CaseExpand (sticky 230vh, cream stage). q = 1 − easeInOutCubic(clamp(pin/0.65));
 * clip-path inset(14q% 22q% round 24q px) brings the first case to full bleed and the page back to dark.
 * Giant outlined client name travels from 0.45vw to −(nameWidth − 0.55vw); caption fades in at 0.55–0.75.
 * The artwork settles from 1.18× to 1× as the frame opens.
 */
export function ExpandImage({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const frame = root.querySelector<HTMLElement>("[data-cx]");
      const media = root.querySelector<HTMLElement>("[data-cx-media]");
      const name = root.querySelector<HTMLElement>("[data-cx-name]");
      const cap = root.querySelector<HTMLElement>("[data-cx-cap]");

      const mm = gsap.matchMedia();
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile, reduce: MQ.reduce }, (ctx) => {
        const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
        const [iy, ix, rr] = desktop ? [14, 22, 24] : [10, 8, 16];
        let vw = window.innerWidth;
        let nameW = name?.offsetWidth ?? 0;
        const measure = () => {
          vw = window.innerWidth;
          nameW = name?.offsetWidth ?? 0;
        };

        const apply = (p: number) => {
          const q = 1 - easeInOutCubic(clamp(p / 0.65));
          if (frame)
            frame.style.clipPath = `inset(${(iy * q).toFixed(3)}% ${(ix * q).toFixed(3)}% round ${(rr * q).toFixed(2)}px)`;
          if (media) media.style.transform = `scale(${(1 + 0.18 * q).toFixed(4)})`;
          if (name) {
            const x = lerp(0.45 * vw, -(nameW - 0.55 * vw), p);
            name.style.transform = `translate3d(${x.toFixed(1)}px,-50%,0)`;
          }
          if (cap) cap.style.opacity = clamp((p - 0.55) / 0.2).toFixed(3);
        };

        if (reduce) {
          measure();
          apply(1);
          return;
        }
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
        return () => {
          [frame, media, name].forEach((el) => {
            if (!el) return;
            el.style.clipPath = "";
            el.style.transform = "";
          });
          if (cap) cap.style.opacity = "";
        };
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}
