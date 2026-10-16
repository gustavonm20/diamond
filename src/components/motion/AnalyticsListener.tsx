"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { rememberSegment } from "@/lib/utm";

/**
 * Delegated click tracking so sections stay Server Components:
 * - `[data-wa-origin]` → whatsapp_click {origin}
 * - `[data-cta]`       → cta_click {cta_id, section}
 * - `[data-segment]`   → remembered for form_submit {segment}
 */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-wa-origin],[data-cta]");
      if (!el) return;
      const { waOrigin, cta, section, segment } = el.dataset;
      if (segment) rememberSegment(segment);
      if (waOrigin) track({ event: "whatsapp_click", origin: waOrigin });
      if (cta) track({ event: "cta_click", cta_id: cta, section: section || "unknown" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
