"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Magnetic buttons on fine pointers: `[data-magnetic]` elements follow the cursor by
 * 22% (x) / 30% (y) of its offset from their center, and spring back on leave.
 */
export function Magnetic() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches || prefersReducedMotion()) return;

    let active: HTMLElement | null = null;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (active && active !== target) {
        active.style.transform = "";
        active = null;
      }
      if (!target) return;
      active = target;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = target.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
        target.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
    };
    const onLeaveWindow = () => {
      if (active) active.style.transform = "";
      active = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, []);
  return null;
}
