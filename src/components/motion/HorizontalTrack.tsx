"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";
import { useLenis } from "lenis/react";
import type Lenis from "lenis";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { clamp, easeOutCubic, isSoftMotion, MQ, range } from "@/lib/motion";
import { getScroll, subscribeScroll } from "@/lib/scroll";

type Card = {
  el: HTMLElement;
  dim: HTMLElement | null;
  hl: HTMLElement | null;
  art: HTMLElement | null;
  center: number;
};

/**
 * Solutions carousel.
 *
 * Desktop (≥1024px): sticky stage, section height = vh + (trackWidth − vw), x = −maxX·pin.
 * Mouse drag on the track scrubs the page scroll 1:1 (the cards follow the cursor), with a throw
 * that settles on the nearest card.
 * Below 1024px: native snap carousel; mouse drag scrolls it with momentum, touch stays native.
 *
 * Both modes render a coverflow in one shared perspective (set on the stage): with
 * d = (cardCenter − viewportCenter)/cardWidth and lit = 1 − clamp(|d|/1.2), each card gets
 * translateZ(−|d|·depth) rotateY(d·−angle + lean) scale(0.94 + 0.06·lit), the dim overlay fades
 * with lit, the gold top line grows with lit and the artwork counter-shifts. "lean" follows the
 * scroll/drag velocity and eases back to 0 when movement stops.
 */
export function HorizontalTrack({ children, ...rest }: HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | undefined>(undefined);
  const lenis = useLenis();
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const track = root.querySelector<HTMLElement>("[data-track]");
      const bar = root.querySelector<HTMLElement>("[data-tbar]");
      if (!track) return;
      const cards: Card[] = Array.from(track.querySelectorAll<HTMLElement>("[data-card]")).map(
        (el) => ({
          el,
          dim: el.querySelector<HTMLElement>("[data-dim]"),
          hl: el.querySelector<HTMLElement>("[data-hl]"),
          art: el.querySelector<HTMLElement>(".scene"),
          center: 0,
        }),
      );
      const soft = isSoftMotion();

      const paint = (c: Card, d: number, lean: number, angle: number, depth: number) => {
        const cd = clamp(d, -2.2, 2.2);
        const lit = 1 - clamp(Math.abs(d) / 1.2);
        c.el.style.transform = `translate3d(0,0,${(-Math.abs(cd) * depth).toFixed(1)}px) rotateY(${(cd * -angle + lean).toFixed(2)}deg) scale(${(0.94 + 0.06 * lit).toFixed(4)})`;
        if (c.dim) c.dim.style.opacity = (0.55 * (1 - lit)).toFixed(3);
        if (c.hl) c.hl.style.transform = `scaleX(${lit.toFixed(3)})`;
        if (c.art) c.art.style.transform = `scale(1.14) translate3d(${(cd * -4).toFixed(2)}%,0,0)`;
      };
      const unpaint = () => {
        for (const c of cards) {
          c.el.style.transform = "";
          if (c.dim) c.dim.style.opacity = "";
          if (c.hl) c.hl.style.transform = "";
          if (c.art) c.art.style.transform = "";
        }
      };

      /** Click guard: a drag must never trigger the card's WhatsApp link. */
      let moved = 0;
      const onClickCapture = (e: MouseEvent) => {
        if (moved > 6) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      const onDragStart = (e: DragEvent) => e.preventDefault();
      track.addEventListener("click", onClickCapture, true);
      track.addEventListener("dragstart", onDragStart);

      const mm = gsap.matchMedia();

      // ---------- Desktop: pinned track scrubbed by scroll (and by dragging) ----------
      mm.add(MQ.desktop, () => {
        let maxX = 0;
        let vw = window.innerWidth;
        let cw = 1;
        let top = 0;
        let p = 0;
        let lean = 0;
        let dragLean = 0;
        const angle = soft ? 12 : 18;
        const depth = soft ? 80 : 130;

        const measure = () => {
          vw = window.innerWidth;
          track.style.transform = "";
          maxX = Math.max(0, track.scrollWidth - vw);
          root.style.height = `${window.innerHeight + maxX}px`;
          cards.forEach((c) => (c.center = c.el.offsetLeft + c.el.offsetWidth / 2));
          cw = cards[0]?.el.offsetWidth || 1;
          top = root.getBoundingClientRect().top + window.scrollY;
        };

        const render = () => {
          const x = -maxX * p;
          track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
          for (const c of cards) paint(c, (c.center + x - vw / 2) / cw, lean, angle, depth);
          if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
        };

        // Velocity lean: cards tilt with scroll speed and ease back when it stops.
        const offScroll = subscribeScroll(() => {});
        let ticking = false;
        const tick = () => {
          const target = clamp(-getScroll().vel * (soft ? 0.25 : 0.5) + dragLean, -14, 14);
          const next = lean + (target - lean) * 0.12;
          if (Math.abs(next - lean) > 0.005) {
            lean = next;
            render();
          }
          dragLean *= 0.9;
        };
        const startTick = () => {
          if (ticking) return;
          ticking = true;
          gsap.ticker.add(tick);
        };
        const settle = () => {
          ticking = false;
          gsap.ticker.remove(tick);
          lean = dragLean = 0;
          render();
        };

        measure();
        const st = ScrollTrigger.create({
          trigger: root,
          ...range.pin,
          onRefreshInit: measure,
          onUpdate: (s) => {
            p = s.progress;
            render();
          },
          onRefresh: (s) => {
            top = root.getBoundingClientRect().top + window.scrollY;
            p = s.progress;
            render();
          },
          onToggle: (s) => (s.isActive ? startTick() : settle()),
        });
        p = st.progress;
        render();
        if (st.isActive) startTick();

        // Drag (mouse / pen): 1px of horizontal drag = 1px of page scroll = 1px of track travel.
        let dragging = false;
        let startX = 0;
        let startScroll = 0;
        let lastX = 0;
        let lastT = 0;
        let velX = 0;
        const scrollTo = (y: number, immediate: boolean) => {
          const l = lenisRef.current;
          if (l)
            l.scrollTo(
              y,
              immediate
                ? { immediate: true, force: true }
                : { duration: 0.9, easing: easeOutCubic, force: true },
            );
          else window.scrollTo({ top: y, behavior: immediate ? "instant" : "smooth" });
        };
        const onDown = (e: PointerEvent) => {
          if (e.pointerType === "touch" || e.button !== 0) return;
          dragging = true;
          moved = 0;
          velX = 0;
          startX = lastX = e.clientX;
          lastT = performance.now();
          startScroll = window.scrollY;
          track.setPointerCapture(e.pointerId);
          track.classList.add("is-dragging");
        };
        const onMove = (e: PointerEvent) => {
          if (!dragging) return;
          const now = performance.now();
          const dx = e.clientX - startX;
          moved = Math.max(moved, Math.abs(dx));
          velX = (e.clientX - lastX) / Math.max(8, now - lastT);
          dragLean = clamp(velX * 6, -10, 10);
          lastX = e.clientX;
          lastT = now;
          scrollTo(clamp(startScroll - dx, top, top + maxX), true);
        };
        const onUp = (e: PointerEvent) => {
          if (!dragging) return;
          dragging = false;
          track.classList.remove("is-dragging");
          if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
          if (moved < 6 || !maxX) return;
          if (performance.now() - lastT > 90) velX = 0;
          // Throw, then settle on the card closest to where the throw would land.
          const projected = clamp((window.scrollY - velX * 380 - top) / maxX);
          let best = projected;
          let bestDist = Infinity;
          for (const c of cards) {
            const pc = clamp((c.center - vw / 2) / maxX);
            const dist = Math.abs(pc - projected);
            if (dist < bestDist) {
              bestDist = dist;
              best = pc;
            }
          }
          scrollTo(top + best * maxX, false);
        };
        track.addEventListener("pointerdown", onDown);
        track.addEventListener("pointermove", onMove);
        track.addEventListener("pointerup", onUp);
        track.addEventListener("pointercancel", onUp);

        return () => {
          ticking = false;
          gsap.ticker.remove(tick);
          offScroll();
          track.removeEventListener("pointerdown", onDown);
          track.removeEventListener("pointermove", onMove);
          track.removeEventListener("pointerup", onUp);
          track.removeEventListener("pointercancel", onUp);
          root.style.height = "";
          track.style.transform = "";
          if (bar) bar.style.transform = "";
          unpaint();
        };
      });

      // ---------- Below 1024px (and static mode): native carousel + mouse drag ----------
      const freeCarousel = (with3d: boolean) => {
        let raf = 0;
        let lean = 0;
        let lastLeft = track.scrollLeft;
        let cw = 1;
        const measure = () => {
          cards.forEach((c) => (c.center = c.el.offsetLeft + c.el.offsetWidth / 2));
          cw = cards[0]?.el.offsetWidth || 1;
        };
        const render = () => {
          raf = 0;
          const left = track.scrollLeft;
          const mid = left + track.clientWidth / 2;
          lean += (clamp((left - lastLeft) * -0.35, -10, 10) - lean) * 0.25;
          lastLeft = left;
          for (const c of cards) paint(c, (c.center - mid) / cw, lean, 14, 70);
          if (Math.abs(lean) > 0.05) raf = requestAnimationFrame(render);
        };
        const onScroll = () => {
          if (!raf) raf = requestAnimationFrame(render);
        };
        if (with3d) {
          measure();
          render();
          track.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", measure);
        }

        // Mouse drag with momentum; touch keeps native scrolling.
        let dragging = false;
        let startX = 0;
        let startLeft = 0;
        let lastX = 0;
        let lastT = 0;
        let vel = 0;
        let glide = 0;
        const snapToNearest = () => {
          const mid = track.scrollLeft + track.clientWidth / 2;
          let target = track.scrollLeft;
          let best = Infinity;
          for (const c of cards) {
            const dist = Math.abs(c.center - mid);
            if (dist < best) {
              best = dist;
              target = c.center - track.clientWidth / 2;
            }
          }
          track.scrollTo({ left: target, behavior: with3d ? "smooth" : "auto" });
          window.setTimeout(() => (track.style.scrollSnapType = ""), with3d ? 450 : 0);
        };
        const onDown = (e: PointerEvent) => {
          if (e.pointerType !== "mouse" || e.button !== 0) return;
          cancelAnimationFrame(glide);
          dragging = true;
          moved = 0;
          vel = 0;
          startX = lastX = e.clientX;
          lastT = performance.now();
          startLeft = track.scrollLeft;
          measure();
          track.style.scrollSnapType = "none";
          track.setPointerCapture(e.pointerId);
          track.classList.add("is-dragging");
        };
        const onMove = (e: PointerEvent) => {
          if (!dragging) return;
          const now = performance.now();
          const dx = e.clientX - startX;
          moved = Math.max(moved, Math.abs(dx));
          vel = (e.clientX - lastX) / Math.max(8, now - lastT);
          lastX = e.clientX;
          lastT = now;
          track.scrollLeft = startLeft - dx;
        };
        const onUp = (e: PointerEvent) => {
          if (!dragging) return;
          dragging = false;
          track.classList.remove("is-dragging");
          if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
          if (performance.now() - lastT > 90 || !with3d) vel = 0;
          let v = vel * 16;
          const step = () => {
            if (Math.abs(v) < 0.6) return snapToNearest();
            track.scrollLeft -= v;
            v *= 0.92;
            glide = requestAnimationFrame(step);
          };
          step();
        };
        track.addEventListener("pointerdown", onDown);
        track.addEventListener("pointermove", onMove);
        track.addEventListener("pointerup", onUp);
        track.addEventListener("pointercancel", onUp);

        return () => {
          cancelAnimationFrame(raf);
          cancelAnimationFrame(glide);
          track.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", measure);
          track.removeEventListener("pointerdown", onDown);
          track.removeEventListener("pointermove", onMove);
          track.removeEventListener("pointerup", onUp);
          track.removeEventListener("pointercancel", onUp);
          track.style.scrollSnapType = "";
          unpaint();
        };
      };
      mm.add(MQ.mobile, () => freeCarousel(true));
      mm.add(MQ.reduce, () => freeCarousel(false));

      return () => {
        track.removeEventListener("click", onClickCapture, true);
        track.removeEventListener("dragstart", onDragStart);
      };
    },
    { scope: ref },
  );

  return (
    <section ref={ref} {...rest}>
      {children}
    </section>
  );
}
