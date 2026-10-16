"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { clamp, isSoftMotion, lerp, prefersReducedMotion } from "@/lib/motion";
import { getScroll, subscribeScroll } from "@/lib/scroll";

/**
 * Infinite marquee: 0.6px/frame + |velocity|·0.35, direction follows the scroll direction,
 * skewX follows velocity (clamped ±8°, lerped at 0.1). Paused while off screen.
 * Soft motion: slower, no skew, a gentler velocity boost.
 */
export function VelocityMarquee({ children, label }: { children: ReactNode; label: string }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      const section = root.current;
      if (!el || !section) return;
      if (prefersReducedMotion()) return;

      const soft = isSoftMotion();
      const base = soft ? 0.35 : 0.6;
      const boost = soft ? 0.1 : 0.35;
      let x = 0;
      let dir = -1;
      let skew = 0;
      // Loop period: one copy of the content plus one gap = (scrollWidth + gap) / 2.
      const period = () => (el.scrollWidth + (parseFloat(getComputedStyle(el).columnGap) || 0)) / 2;
      let half = period();
      let visible = false;

      const unsub = subscribeScroll(() => {});
      const ro = new ResizeObserver(() => (half = period()));
      ro.observe(el);
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(section);

      const tick = (_t: number, deltaMs: number) => {
        if (!visible || !half) return;
        const frames = Math.min(3, deltaMs / 16.667);
        const vel = getScroll().vel;
        if (Math.abs(vel) > 0.05) dir = vel > 0 ? -1 : 1;
        x += dir * (base + Math.abs(vel) * boost) * frames;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        skew = soft ? 0 : lerp(skew, clamp(-vel * 0.25, -8, 8), 0.1);
        el.style.transform = `translate3d(${x.toFixed(2)}px,0,0) skewX(${skew.toFixed(2)}deg)`;
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        unsub();
        ro.disconnect();
        io.disconnect();
        el.style.transform = "";
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="mq" aria-label={label} data-theme="dark">
      <div ref={track} className="mq-track">
        {children}
        <div aria-hidden="true" className="contents">
          {children}
        </div>
      </div>
    </section>
  );
}
