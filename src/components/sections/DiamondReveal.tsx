import type { CSSProperties } from "react";
import { REVEAL } from "@/content/site";
import { DiamondRevealMotion } from "@/components/motion/DiamondRevealMotion";

/** Top view of a brilliant cut in a ±100 box: square table, star and kite facets (the outline is the gold rim). */
const FACETS =
  "M-40-40H40V40H-40Z M40-40 0-100M40-40 100 0M40 40 100 0M40 40 0 100M-40 40 0 100M-40 40-100 0M-40-40-100 0M-40-40 0-100 M0-40 0-100M40 0 100 0M0 40 0 100M-40 0-100 0";

export function DiamondReveal() {
  return (
    <DiamondRevealMotion
      className="pin"
      id="virada"
      data-theme="reveal"
      style={{ "--h": "190vh" } as CSSProperties}
    >
      <div className="stage dr">
        <div className="spark" data-spark aria-hidden="true" />
        <div className="dr-cue" data-cue aria-hidden="true">
          {REVEAL.cue}
        </div>
        <div className="dr-l dr-rim" data-rim aria-hidden="true" />
        <div className="dr-l dr-lit" data-lit aria-hidden="true" />
        <svg className="dr-facets" data-facets aria-hidden="true" focusable="false">
          <g data-facets-g>
            <path d={FACETS} />
          </g>
        </svg>
        <div className="dr-t" data-text>
          <span className="dr-ey">{REVEAL.eyebrow}</span>
          <h2 className="dx dr-h">
            {REVEAL.title[0]}
            <br />
            {REVEAL.title[1]} <span className="it">{REVEAL.accent}</span>
          </h2>
          <i className="dr-line" data-line aria-hidden="true" />
          <p>{REVEAL.body}</p>
        </div>
      </div>
    </DiamondRevealMotion>
  );
}
