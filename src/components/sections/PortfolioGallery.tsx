"use client";

import { useMemo, useRef, useState } from "react";
import { CATEGORY_LABEL } from "@/content/services";
import { PORTFOLIO_COPY } from "@/content/site";
import type { PortfolioItem, SceneKind } from "@/types/content";
import { track } from "@/lib/analytics";
import { Flip, gsap, ScrollTrigger } from "@/lib/gsap";
import { Chip } from "@/components/ui/Chip";
import { Lightbox } from "@/components/ui/Lightbox";
import { Scene } from "@/components/ui/Scene";
import { prefersReducedMotion } from "@/lib/motion";

type Filter = "all" | SceneKind;

/** Filter chips with a GSAP Flip re-layout (650ms, ease token) + grid + lightbox. */
export function PortfolioGallery({ items }: { items: PortfolioItem[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState<number | null>(null);

  const categories = useMemo(
    () =>
      (Object.keys(CATEGORY_LABEL) as SceneKind[]).filter((k) =>
        items.some((i) => i.category === k),
      ),
    [items],
  );
  const visible = useMemo(
    () => items.filter((i) => filter === "all" || i.category === filter),
    [items, filter],
  );

  const applyFilter = (next: Filter) => {
    if (next === filter) return;
    const grid = gridRef.current;
    setFilter(next);
    track({ event: "portfolio_filter", category: next === "all" ? "todos" : next });
    if (!grid) return;

    const els = Array.from(grid.querySelectorAll<HTMLElement>("[data-pf]"));
    const reduce = prefersReducedMotion();
    const state = Flip.getState(els);
    els.forEach((el) => {
      el.style.display = next === "all" || el.dataset.cat === next ? "" : "none";
    });

    if (reduce) {
      ScrollTrigger.refresh();
      return;
    }
    // Hold the final height while items fly, so the page below doesn't jump mid-animation.
    grid.style.height = `${grid.offsetHeight}px`;
    Flip.from(state, {
      duration: 0.65,
      ease: "diamond",
      absolute: true,
      onEnter: (entering) =>
        gsap.fromTo(
          entering,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.65, ease: "diamond" },
        ),
      onLeave: (leaving) =>
        gsap.to(leaving, { opacity: 0, scale: 0.92, duration: 0.4, ease: "diamond" }),
      onComplete: () => {
        grid.style.height = "";
        ScrollTrigger.refresh();
      },
    });
  };

  const openItem = (id: string, el: HTMLElement) => {
    const i = visible.findIndex((v) => v.id === id);
    if (i < 0) return;
    lastTrigger.current = el;
    setIndex(i);
    track({ event: "portfolio_open", client: visible[i].client });
  };

  return (
    <>
      <div className="pf-bar">
        <div className="filters" role="toolbar" aria-label={PORTFOLIO_COPY.filtersLabel}>
          <Chip pressed={filter === "all"} onClick={() => applyFilter("all")}>
            {PORTFOLIO_COPY.all}
          </Chip>
          {categories.map((c) => (
            <Chip key={c} pressed={filter === c} onClick={() => applyFilter(c)}>
              {CATEGORY_LABEL[c]}
            </Chip>
          ))}
        </div>
        <span className="muted pf-note">{PORTFOLIO_COPY.note}</span>
      </div>

      <div ref={gridRef} className="pf-grid">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="pt"
            data-pf
            data-cat={item.category}
            aria-label={`${PORTFOLIO_COPY.open}: ${item.client}, ${CATEGORY_LABEL[item.category]}`}
            onClick={(e) => openItem(item.id, e.currentTarget)}
          >
            <div className="media">
              <Scene scene={item.scene} />
            </div>
            <span className="cap" aria-hidden="true">
              <b>{item.client}</b>
              <span>{CATEGORY_LABEL[item.category]}</span>
            </span>
          </button>
        ))}
      </div>

      <Lightbox
        items={visible}
        index={index}
        onIndex={setIndex}
        onClose={() => {
          setIndex(null);
          lastTrigger.current?.focus({ preventScroll: true });
        }}
      />
    </>
  );
}
