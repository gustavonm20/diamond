"use client";

import { useEffect, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { subscribeScroll } from "@/lib/scroll";

/**
 * FAB / mobile CTA bar visibility: shown after 0.8vh of scroll,
 * hidden once the contact section's top passes 60% of the viewport.
 */
export function useDockVisibility(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let contactTop = Infinity;
    const measure = () => {
      const c = document.getElementById("contato");
      contactTop = c ? c.getBoundingClientRect().top + window.scrollY : Infinity;
    };
    measure();
    ScrollTrigger.addEventListener("refresh", measure);
    const unsub = subscribeScroll((s) => {
      const show = s.y > s.vh * 0.8 && contactTop - s.y > s.vh * 0.6;
      el.classList.toggle("show", show);
    });
    return () => {
      unsub();
      ScrollTrigger.removeEventListener("refresh", measure);
    };
  }, [ref]);
}
