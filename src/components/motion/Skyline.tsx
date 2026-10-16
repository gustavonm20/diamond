"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { onIgnite } from "@/lib/ignite";
import { mulberry32, prefersReducedMotion } from "@/lib/motion";

type Building = { x: number; w: number; h: number };
type Win = { x: number; y: number };

/** Seeded, so the server render and the client render are identical. */
function buildSkyline(seed = 11) {
  const rand = mulberry32(seed);
  const back: Building[] = [];
  const front: Building[] = [];
  for (let x = -20; x < 1460;) {
    const w = 60 + rand() * 120;
    back.push({ x, w, h: 120 + rand() * 170 });
    x += w + rand() * 8;
  }
  for (let x = -10; x < 1450;) {
    const w = 46 + rand() * 96;
    const edge = Math.abs(x + w / 2 - 720) / 720; // taller toward the edges, lower behind the copy
    front.push({ x, w, h: 64 + rand() * 150 + edge * 70 });
    x += w + (rand() < 0.35 ? 4 + rand() * 12 : 1);
  }

  const dark: Win[] = [];
  const lightable: Win[] = [];
  for (const b of front) {
    if (rand() < 0.2) continue;
    const cols = Math.max(1, Math.floor((b.w - 14) / 16));
    const rows = Math.max(1, Math.floor((b.h - 26) / 22));
    const offX = b.x + (b.w - (cols - 1) * 16 - 5) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (rand() < 0.18) continue;
        const win = { x: +(offX + c * 16).toFixed(1), y: +(300 - b.h + 16 + r * 22).toFixed(1) };
        if (rand() < 0.3) lightable.push(win);
        else dark.push(win);
      }
    }
  }
  const darkPath = dark.map((w) => `M${w.x} ${w.y}h5v8h-5z`).join("");
  return { back, front, darkPath, lightable };
}

/**
 * Hero skyline: seeded random buildings; ~30% of the windows switch on at random
 * over 1.8s once the page ignites.
 */
export function Skyline() {
  const ref = useRef<SVGGElement>(null);
  const sky = useMemo(() => buildSkyline(), []);

  useEffect(() => {
    const g = ref.current;
    if (!g) return;
    let tl: gsap.core.Timeline | null = null;
    const off = onIgnite(() => {
      const wins = Array.from(g.querySelectorAll<SVGRectElement>(".hw"));
      const reduce = prefersReducedMotion();
      tl = gsap.timeline({ delay: reduce ? 0 : 0.4 });
      wins.forEach((w) => {
        const cls = Math.random() < 0.7 ? "on" : "on2";
        tl!.call(() => w.classList.add(cls), [], reduce ? 0 : Math.random() * 1.8);
      });
    });
    return () => {
      off();
      tl?.kill();
    };
  }, []);

  return (
    <svg
      viewBox="0 0 1440 300"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <g className="sky-b2">
        {sky.back.map((b, i) => (
          <rect
            key={i}
            x={b.x.toFixed(1)}
            y={(300 - b.h).toFixed(1)}
            width={b.w.toFixed(1)}
            height={b.h.toFixed(1)}
          />
        ))}
      </g>
      <g className="sky-b">
        {sky.front.map((b, i) => (
          <rect
            key={i}
            x={b.x.toFixed(1)}
            y={(300 - b.h).toFixed(1)}
            width={b.w.toFixed(1)}
            height={b.h.toFixed(1)}
          />
        ))}
      </g>
      <path className="sky-w" d={sky.darkPath} />
      <g ref={ref}>
        {sky.lightable.map((w, i) => (
          <rect key={i} className="hw" x={w.x} y={w.y} width="5" height="8" />
        ))}
      </g>
    </svg>
  );
}
