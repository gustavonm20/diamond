"use client";

import { gsap } from "./gsap";
import { lerp } from "./motion";

export type ScrollState = {
  y: number;
  /** Raw delta since last frame. */
  dy: number;
  /** Smoothed velocity: lerp(vel, dy, 0.25) per frame (brief §9.1). */
  vel: number;
  vh: number;
  vw: number;
  /** Max scrollable distance. */
  max: number;
};

type Listener = (s: ScrollState) => void;

const state: ScrollState = { y: 0, dy: 0, vel: 0, vh: 0, vw: 0, max: 1 };
const listeners = new Set<Listener>();
let running = false;

function measure() {
  state.vh = window.innerHeight;
  state.vw = window.innerWidth;
  state.max = Math.max(1, document.documentElement.scrollHeight - state.vh);
}

function tick() {
  const y = window.scrollY;
  state.dy = y - state.y;
  state.y = y;
  state.vel = lerp(state.vel, state.dy, 0.25);
  if (Math.abs(state.vel) < 0.001) state.vel = 0;
  if (state.dy !== 0 || state.vel !== 0) listeners.forEach((l) => l(state));
}

function onResize() {
  measure();
  listeners.forEach((l) => l(state));
}

/** One shared rAF-driven scroll reader (synced with Lenis through gsap.ticker). */
export function subscribeScroll(listener: Listener): () => void {
  if (!running) {
    running = true;
    state.y = window.scrollY;
    measure();
    gsap.ticker.add(tick);
    window.addEventListener("resize", onResize, { passive: true });
  }
  listeners.add(listener);
  measure();
  listener(state);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", onResize);
      running = false;
    }
  };
}

export function getScroll() {
  return state;
}

/** Re-measures document height after layout changes (ScrollTrigger refresh, fonts, images). */
export function remeasureScroll() {
  if (typeof window !== "undefined") onResize();
}
