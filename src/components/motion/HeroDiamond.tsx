"use client";

import { useCallback, useRef } from "react";
import { DiamondMark } from "@/components/ui/DiamondMark";
import { DiamondGL } from "./DiamondGL";

/** WebGL stone with the reference's wireframe diamond as a no-WebGL fallback. */
export function HeroDiamond() {
  const ref = useRef<HTMLDivElement>(null);
  const onReady = useCallback((ok: boolean) => {
    ref.current?.classList.toggle("gl-ok", ok);
  }, []);
  return (
    <div ref={ref} className="hero-diamond-inner" data-hero-parallax>
      <DiamondMark className="facet" />
      <DiamondGL onReady={onReady} />
    </div>
  );
}
