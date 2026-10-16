"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { useLenis } from "lenis/react";
import { PORTFOLIO_COPY } from "@/content/site";
import { CATEGORY_LABEL } from "@/content/services";
import type { PortfolioItem } from "@/types/content";
import { Icon } from "./Icon";
import { Scene } from "./Scene";

type Props = {
  items: PortfolioItem[];
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
};

/** Native <dialog> lightbox: prev/next, arrow keys, Esc, swipe and backdrop click. */
export function Lightbox({ items, index, onIndex, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const startX = useRef<number | null>(null);
  const lenis = useLenis();
  const open = index !== null;
  const item = index !== null ? items[index] : null;
  const n = items.length;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      lenis?.stop();
    } else if (!open && d.open) {
      d.close();
    }
  }, [open, lenis]);

  const step = (dir: 1 | -1) => {
    if (index === null || !n) return;
    onIndex((index + dir + n) % n);
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: ReactPointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  return (
    <dialog
      ref={ref}
      className="lb"
      aria-label={PORTFOLIO_COPY.dialogLabel}
      onClose={() => {
        lenis?.start();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <button
        type="button"
        className="lb-btn lb-x"
        aria-label={PORTFOLIO_COPY.close}
        onClick={() => ref.current?.close()}
      >
        <Icon name="close" />
      </button>
      <button
        type="button"
        className="lb-btn lb-p"
        aria-label={PORTFOLIO_COPY.prev}
        onClick={() => step(-1)}
      >
        <Icon name="arrowLeft" />
      </button>
      {item && (
        <figure>
          <div className="lb-media">
            <Scene scene={item.scene} />
          </div>
          <figcaption aria-live="polite">
            <b className="dx">{item.client}</b>
            <span>
              {CATEGORY_LABEL[item.category]} · {(index ?? 0) + 1}/{n}
            </span>
          </figcaption>
        </figure>
      )}
      <button
        type="button"
        className="lb-btn lb-n"
        aria-label={PORTFOLIO_COPY.next}
        onClick={() => step(1)}
      >
        <Icon name="arrowRight" />
      </button>
    </dialog>
  );
}
