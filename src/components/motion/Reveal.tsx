"use client";

import { useEffect } from "react";

/**
 * `.rv` elements fade and rise into place (1s, ease token), staggered by `data-d` × 90ms.
 * One shared IntersectionObserver for the whole page.
 */
export function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv:not(.in)"));
    els.forEach((el) => {
      const d = el.dataset.d;
      if (d) el.style.setProperty("--d", d);
    });
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
