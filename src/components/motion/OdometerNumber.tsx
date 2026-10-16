"use client";

import { useRef, type HTMLAttributes } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { clamp, easeOutCubic, MQ, range } from "@/lib/motion";

/** Server-renderable digit strip: 0–9 twice, so every digit (even 0) rolls a full turn. */
export function OdometerDigits({ value }: { value: string }) {
  return (
    <>
      {value.split("").map((d, i) => (
        <span key={i} className="odo">
          <span data-digit={d} data-i={i}>
            {Array.from({ length: 20 }, (_, n) => (
              <i key={n}>{n % 10}</i>
            ))}
          </span>
        </span>
      ))}
    </>
  );
}

/**
 * Rolls every `[data-digit]` strip inside: translateY = −(10 + digit)·1.1em·easeOutCubic(clamp((p − i·0.06)/0.7)),
 * with p = edge(0.92, 0.42) measured on this group.
 */
export function OdometerGroup({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const strips = Array.from(root.querySelectorAll<HTMLElement>("[data-digit]")).map((el) => ({
        el,
        target: 10 + Number(el.dataset.digit),
        i: Number(el.dataset.i),
      }));
      const apply = (p: number) => {
        strips.forEach(({ el, target, i }) => {
          const e = easeOutCubic(clamp((p - i * 0.06) / 0.7));
          el.style.transform = `translate3d(0,${(-target * 1.1 * e).toFixed(4)}em,0)`;
        });
      };
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const st = ScrollTrigger.create({
          trigger: root,
          ...range.edge(0.92, 0.42),
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
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}
