"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { remeasureScroll } from "@/lib/scroll";
import { useMotionMode } from "@/hooks/useMotionMode";

/** Keeps ScrollTrigger in sync with Lenis. */
function LenisBridge() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

/** Refreshes ScrollTrigger once fonts and images have settled (brief §8.3). */
function useRefreshOnLoad() {
  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      if (cancelled) return;
      ScrollTrigger.refresh();
      remeasureScroll();
    };
    document.fonts?.ready.then(refresh);
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
    };
  }, []);
}

/**
 * Lenis smooth scroll driven by gsap.ticker (lerp 0.1, autoRaf off, lagSmoothing 0).
 * Only in "full" motion mode; "soft" and "static" keep native scrolling.
 */
export function SmoothScroll() {
  const reduce = useMotionMode() !== "full";
  const ref = useRef<LenisRef>(null);
  useRefreshOnLoad();

  useEffect(() => {
    if (reduce) return;
    const update = (time: number) => ref.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, [reduce]);

  if (reduce) return null;

  return (
    <ReactLenis root ref={ref} options={{ lerp: 0.1, autoRaf: false, anchors: true }}>
      <LenisBridge />
    </ReactLenis>
  );
}
