export type AnalyticsEvent =
  | { event: "whatsapp_click"; origin: string }
  | { event: "cta_click"; cta_id: string; section: string }
  | { event: "form_start" }
  | { event: "form_step_complete"; step: number }
  | { event: "form_submit"; services: string; segment: string }
  | { event: "portfolio_filter"; category: string }
  | { event: "portfolio_open"; client: string };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    __dmIgnited?: boolean;
  }
}
