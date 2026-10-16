"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { HEADER, NAV } from "@/content/site";
import { WA_MESSAGES } from "@/content/whatsapp";
import { ScrollTrigger } from "@/lib/gsap";
import { clamp } from "@/lib/motion";
import { remeasureScroll, subscribeScroll } from "@/lib/scroll";
import { Icon } from "@/components/ui/Icon";
import { WaButton } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

type ThemeBlock = { top: number; height: number; theme: string };

/** Sections that light up each nav link (scroll-spy). */
const SPY: Record<string, string[]> = {
  "#solucoes": ["solucoes"],
  "#segmentos": ["segmentos"],
  "#projetos": ["projetos", "escala", "portfolio"],
  "#processo": ["processo"],
  "#faq": ["faq"],
};

/**
 * Header: always fixed. Transparent at the top; past 40px it turns solid and compacts (76 → 60px)
 * with an eased transition. Switches to its light theme over light sections (ThemeWatcher), including
 * the special "reveal" (p ≥ 0.6) and "cx" (p < 0.5) scenes. Gold ScrollProgress hairline underneath.
 */
export function Header() {
  const hdrRef = useRef<HTMLElement>(null);
  const progRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const hdr = hdrRef.current;
    const prog = progRef.current;
    const nav = navRef.current;
    if (!hdr || !prog || !nav) return;

    let blocks: ThemeBlock[] = [];
    let spy: { link: HTMLAnchorElement; ranges: { top: number; bottom: number }[] }[] = [];

    const measure = () => {
      const y = window.scrollY;
      blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-theme]")).map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top + y, height: r.height, theme: el.dataset.theme || "dark" };
      });
      spy = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[href^='#']")).map((link) => ({
        link,
        ranges: (SPY[link.getAttribute("href") || ""] || [])
          .map((id) => document.getElementById(id))
          .filter((el): el is HTMLElement => !!el)
          .map((el) => {
            const r = el.getBoundingClientRect();
            return { top: r.top + y, bottom: r.bottom + y };
          }),
      }));
      remeasureScroll();
    };
    measure();
    ScrollTrigger.addEventListener("refresh", measure);

    let current = "";

    const unsub = subscribeScroll((s) => {
      const y = s.y;
      // Always visible: past 40px it turns solid and compacts (height, logo and CTA ease down).
      hdr.classList.toggle("scrolled", y > 40);

      prog.style.transform = `scaleX(${clamp(y / s.max).toFixed(4)})`;

      // ThemeWatcher: what sits under y = 40px? Deepest (last) match wins.
      const probe = y + 40;
      let match: ThemeBlock | null = null;
      for (const b of blocks) if (probe >= b.top && probe < b.top + b.height) match = b;
      let light = false;
      if (match) {
        const p = clamp((y - match.top) / Math.max(1, match.height - s.vh));
        if (match.theme === "light") light = true;
        else if (match.theme === "reveal") light = p >= 0.6;
        else if (match.theme === "cx") light = p < 0.5;
      }
      hdr.classList.toggle("onlight", light);

      // Scroll-spy
      const spyY = y + s.vh * 0.4;
      let active = "";
      for (const item of spy)
        if (item.ranges.some((r) => spyY >= r.top && spyY < r.bottom))
          active = item.link.getAttribute("href") || "";
      if (active !== current) {
        current = active;
        spy.forEach(({ link }) => {
          if (link.getAttribute("href") === active) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      }
    });

    return () => {
      unsub();
      ScrollTrigger.removeEventListener("refresh", measure);
    };
  }, []);

  // Menu side effects: freeze scroll, mark header, close on Escape.
  useEffect(() => {
    const hdr = hdrRef.current;
    hdr?.classList.toggle("menu", open);
    if (open) {
      if (lenis) lenis.stop();
      else document.documentElement.style.overflow = "hidden";
    } else {
      if (lenis) lenis.start();
      document.documentElement.style.overflow = "";
    }
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header ref={hdrRef} className="hdr">
        <div className="wrap hdr-in">
          <a href="#top" className="logo" aria-label={HEADER.logoLabel}>
            <Icon name="diamond" />
            <span>
              <b className="dx">DIAMOND</b>
              <small>{HEADER.logoSub}</small>
            </span>
          </a>
          <nav ref={navRef} className="nav" aria-label="Principal">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <WaButton
            className="hdr-cta"
            size="sm"
            magnetic
            message={WA_MESSAGES.header}
            origin="header"
          >
            {HEADER.cta}
          </WaButton>
          <button
            ref={burgerRef}
            type="button"
            className="burger"
            aria-label={open ? HEADER.closeMenu : HEADER.openMenu}
            aria-expanded={open}
            aria-controls="mnav"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
        <div className="hdr-prog" aria-hidden="true">
          <span ref={progRef} />
        </div>
      </header>
      <MobileMenu open={open} onClose={close} />
    </>
  );
}
