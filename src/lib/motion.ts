/** Motion math shared by every scroll effect. Mirrors the reference implementation. */

export const clamp = (v: number, min = 0, max = 1) => (v < min ? min : v > max ? max : v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const hex = (x: string) => [1, 3, 5].map((i) => parseInt(x.slice(i, i + 2), 16));

/** Mixes two #RRGGBB colors. */
export function mixHex(a: string, b: string, t: number) {
  const A = hex(a);
  const B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
}

/**
 * Full motion can be forced with `?motion=full` (kept for the session, `?motion=auto` resets).
 * Useful for demos on machines where the OS turns animations off. The default always respects
 * prefers-reduced-motion. The boot script in layout.tsx sets <html data-motion="full">.
 */
export const motionForced = () =>
  typeof document !== "undefined" && document.documentElement.dataset.motion === "full";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !motionForced() &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** gsap.matchMedia buckets (brief §8.3). Getters, so the motion override is read at call time. */
export const MQ = {
  get desktop() {
    return motionForced()
      ? "(min-width: 1024px)"
      : "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
  },
  get mobile() {
    return motionForced()
      ? "(max-width: 1023px)"
      : "(max-width: 1023px) and (prefers-reduced-motion: no-preference)";
  },
  get motion() {
    return motionForced() ? "all" : "(prefers-reduced-motion: no-preference)";
  },
  get reduce() {
    return motionForced() ? "not all" : "(prefers-reduced-motion: reduce)";
  },
};

/**
 * ScrollTrigger ranges equivalent to the reference progress helpers (vh = viewport height):
 * - pin:     clamp(-top / (height - vh))
 * - edge:    clamp((vh*s - top) / (vh*(s - e)))
 * - through: clamp((vh - top) / (vh + height))
 */
export const range = {
  pin: { start: "top top", end: "bottom bottom" },
  edge: (s: number, e: number) => ({ start: `top ${s * 100}%`, end: `top ${e * 100}%` }),
  through: { start: "top bottom", end: "bottom top" },
} as const;

/** Deterministic PRNG so server and client render identical procedural art. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
