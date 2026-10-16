"use client";

import { useSyncExternalStore } from "react";
import { motionMode, type MotionMode } from "@/lib/motion";

const subscribe = () => () => {};

/** The motion mode resolved by the boot script (fixed for the page's lifetime). */
export function useMotionMode(): MotionMode {
  return useSyncExternalStore(subscribe, motionMode, () => "full");
}
