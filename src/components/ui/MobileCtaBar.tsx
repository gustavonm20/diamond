"use client";

import { useRef } from "react";
import { DOCK } from "@/content/site";
import { WA_MESSAGES } from "@/content/whatsapp";
import { waLinkProps } from "@/lib/whatsapp";
import { useDockVisibility } from "@/hooks/useDockVisibility";
import { Icon } from "./Icon";

/** Bottom CTA bar (<768px), safe-area aware. */
export function MobileCtaBar() {
  const ref = useRef<HTMLDivElement>(null);
  useDockVisibility(ref);
  return (
    <div ref={ref} className="mbar">
      <a className="btn btn-line" {...waLinkProps(WA_MESSAGES.mobileBar, "mobile_bar")}>
        <Icon name="whatsapp" />
        {DOCK.barWhatsapp}
      </a>
      <a
        className="btn btn-gold"
        href="#contato"
        data-cta="mobile_bar_form"
        data-section="mobile_bar"
      >
        {DOCK.barQuote}
      </a>
    </div>
  );
}
