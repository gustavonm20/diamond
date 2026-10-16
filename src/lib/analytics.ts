import type { AnalyticsEvent } from "@/types/analytics";

export function track(payload: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ...payload });
  if (process.env.NODE_ENV !== "production") console.debug("[dataLayer]", payload);
}
