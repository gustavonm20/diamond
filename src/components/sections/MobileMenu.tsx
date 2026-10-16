"use client";

import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { HEADER, NAV } from "@/content/site";
import { WA_MESSAGES } from "@/content/whatsapp";
import { WaButton } from "@/components/ui/Button";

/** Full-screen menu (<1024px) with staggered links. Inert while closed. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (open) ref.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
  }, [open]);

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    if (lenis) {
      lenis.start();
      lenis.scrollTo(target);
    } else {
      target.scrollIntoView();
    }
  };

  return (
    <nav
      ref={ref}
      id="mnav"
      className={open ? "mnav open" : "mnav"}
      aria-label="Menu"
      inert={!open}
    >
      {NAV.map((item, i) => (
        <a
          key={item.href}
          className="dx"
          href={item.href}
          style={{ "--i": i + 1 } as CSSProperties}
          onClick={(e) => go(e, item.href)}
        >
          {item.label}
        </a>
      ))}
      <WaButton
        message={WA_MESSAGES.mobileMenu}
        origin="mobile_menu"
        icon="whatsapp"
        iconPosition="start"
        style={{ "--i": NAV.length + 1 } as CSSProperties}
      >
        {HEADER.cta}
      </WaButton>
    </nav>
  );
}
