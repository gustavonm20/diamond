"use client";

import { motionForced } from "@/lib/motion";
import { useMediaQuery } from "./useMediaQuery";

/** prefers-reduced-motion, unless full motion was forced with `?motion=full`. */
export function useReducedMotion() {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  return reduce && !motionForced();
}
