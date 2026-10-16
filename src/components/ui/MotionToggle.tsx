"use client";

import { FOOTER } from "@/content/site";
import { useMotionMode } from "@/hooks/useMotionMode";

/**
 * Explicit motion opt-out. "Static" is remembered (localStorage) and the page reloads so every
 * effect is set up in its final state from the start.
 */
export function MotionToggle() {
  const isStatic = useMotionMode() === "static";
  return (
    <button
      type="button"
      className="motion-toggle"
      aria-pressed={isStatic}
      onClick={() => {
        try {
          if (isStatic) localStorage.removeItem("dm-motion");
          else localStorage.setItem("dm-motion", "static");
        } catch {
          /* storage blocked: nothing to persist */
        }
        window.location.reload();
      }}
    >
      {isStatic ? FOOTER.motionOn : FOOTER.motionOff}
    </button>
  );
}
