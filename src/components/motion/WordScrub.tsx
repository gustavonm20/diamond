"use client";

import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MQ } from "@/lib/motion";

/**
 * Manifesto: lit words = round(p·N), p = clamp((0.85vh − top)/(height + 0.35vh))
 * (ScrollTrigger "top 85%" → "bottom 50%"). Words go from #2B2B30 to cream; accent words
 * (Instrument Serif) ignite in gold with the same flicker as the hero headline.
 */
export function WordScrub({
  text,
  accents,
  className,
}: {
  text: string;
  accents: string[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(/\s+/);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const spans = Array.from(root.querySelectorAll<HTMLElement>(".wd"));
      let lit = -1;
      const apply = (p: number) => {
        const n = Math.round(p * spans.length);
        if (n === lit) return;
        const prev = lit;
        lit = n;
        spans.forEach((s, i) => {
          const on = i < n;
          if (on && i >= prev && prev >= 0 && s.classList.contains("ac")) {
            s.classList.remove("ign");
            void s.offsetWidth;
            s.classList.add("ign");
          }
          s.classList.toggle("on", on);
        });
      };
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const st = ScrollTrigger.create({
          trigger: root,
          start: "top 85%",
          end: "bottom 50%",
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
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className={accents.includes(w) ? "wd ac" : "wd"}>{w}</span>
        </Fragment>
      ))}
    </p>
  );
}
