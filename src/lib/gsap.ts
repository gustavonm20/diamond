"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(useGSAP, ScrollTrigger, Flip, CustomEase);
  /** The brief's ease token: cubic-bezier(0.16, 1, 0.3, 1). */
  CustomEase.create("diamond", "0.16,1,0.3,1");
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export { gsap, ScrollTrigger, Flip, useGSAP };
