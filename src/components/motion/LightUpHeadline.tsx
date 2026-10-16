"use client";

import { Fragment, useEffect, useRef } from "react";
import { onIgnite } from "@/lib/ignite";

type Word = string | { accent: string };

/**
 * Channel-letter headline: words start unlit (#26262B), then ignite one by one (160ms stagger)
 * with 2–3 flicker flashes and a warm glow, like letra caixa being switched on.
 */
export function LightUpHeadline({ lines, className }: { lines: Word[][]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h1 = ref.current;
    if (!h1) return;
    const timers: number[] = [];
    const off = onIgnite(() => {
      const words = Array.from(h1.querySelectorAll<HTMLElement>(".w"));
      words.forEach((w, i) => {
        timers.push(
          window.setTimeout(() => {
            w.classList.add("ign", "lit");
            timers.push(window.setTimeout(() => w.classList.remove("ign"), 650));
          }, i * 160),
        );
      });
    });
    return () => {
      off();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <h1 ref={ref} className={className}>
      {lines.map((line, li) => (
        <span key={li} className="l" data-hero-line={li + 1}>
          {line.map((word, wi) => (
            <Fragment key={wi}>
              {wi > 0 && " "}
              {typeof word === "string" ? (
                <span className="w">{word}</span>
              ) : (
                <span className="w it">{word.accent}</span>
              )}
            </Fragment>
          ))}
        </span>
      ))}
    </h1>
  );
}
