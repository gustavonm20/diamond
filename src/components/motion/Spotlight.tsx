"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Cursor spotlight + subtle 3D tilt for `[data-spotlight]` tiles (bento).
 * Writes CSS variables only (--x, --y, --rx, --ry); no React state per frame.
 */
export function Spotlight() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const reduce = prefersReducedMotion();

    let frame = 0;
    let last: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      const tile = (e.target as Element | null)?.closest<HTMLElement>("[data-spotlight]") ?? null;
      if (last && last !== tile) {
        last.style.setProperty("--rx", "0deg");
        last.style.setProperty("--ry", "0deg");
      }
      last = tile;
      if (!tile) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = tile.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        tile.style.setProperty("--x", `${x}px`);
        tile.style.setProperty("--y", `${y}px`);
        if (!reduce && tile.dataset.spotlight === "tilt") {
          const nx = x / r.width - 0.5;
          const ny = y / r.height - 0.5;
          tile.style.setProperty("--ry", `${(nx * 5).toFixed(2)}deg`);
          tile.style.setProperty("--rx", `${(-ny * 5).toFixed(2)}deg`);
        }
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);
  return null;
}
