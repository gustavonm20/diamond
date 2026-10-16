import { env } from "./env";
import { WA_MESSAGES, type WaOrigin } from "@/content/whatsapp";

export function waUrl(message: string) {
  return `https://wa.me/${env.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function waOrigin(origin: WaOrigin) {
  return waUrl(WA_MESSAGES[origin]);
}

/** Props for any anchor that opens WhatsApp. Clicks are tracked by the delegated AnalyticsListener. */
export function waLinkProps(message: string, origin: string) {
  return {
    href: waUrl(message),
    target: "_blank",
    rel: "noopener",
    "data-wa-origin": origin,
  } as const;
}
