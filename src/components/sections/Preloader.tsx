"use client";

import { useEffect, useRef } from "react";
import { ignite } from "@/lib/ignite";
import { DiamondMark } from "@/components/ui/DiamondMark";

/**
 * First visit only (sessionStorage "dm-pre"): the diamond outline strokes in over 1s,
 * fades at ~1.15s, then the hero ignites. Return visits and reduced motion skip straight
 * to ignition (the boot script in <head> marks them with data-pre="skip" before paint).
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.dataset.pre === "skip") {
      el.hidden = true;
      ignite();
      return;
    }
    try {
      sessionStorage.setItem("dm-pre", "1");
    } catch {
      /* storage blocked: preloader simply shows again next time */
    }
    const fade = window.setTimeout(() => {
      el.classList.add("done");
      ignite();
    }, 1150);
    const remove = window.setTimeout(() => {
      el.hidden = true;
    }, 1800);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(remove);
    };
  }, []);

  return (
    <div ref={ref} className="pre" aria-hidden="true">
      <DiamondMark pathLength={1} />
    </div>
  );
}
