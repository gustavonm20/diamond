"use client";

import { useRef } from "react";
import { DOCK } from "@/content/site";
import { WA_MESSAGES } from "@/content/whatsapp";
import { waLinkProps } from "@/lib/whatsapp";
import { useDockVisibility } from "@/hooks/useDockVisibility";
import { Icon } from "./Icon";

/** Floating WhatsApp button (≥768px). */
export function WhatsAppFab() {
  const ref = useRef<HTMLAnchorElement>(null);
  useDockVisibility(ref);
  return (
    <a
      ref={ref}
      className="fab"
      aria-label={DOCK.fabLabel}
      {...waLinkProps(WA_MESSAGES.fab, "fab")}
    >
      <Icon name="whatsapp" />
      <span>{DOCK.fab}</span>
    </a>
  );
}
