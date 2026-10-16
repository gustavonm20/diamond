import type { CSSProperties } from "react";
import { FEATURED_CASE } from "@/content/cases";
import { Scene } from "@/components/ui/Scene";
import { ExpandImage } from "@/components/motion/ExpandImage";

export function CaseExpand() {
  const c = FEATURED_CASE;
  return (
    <ExpandImage
      className="pin"
      id="cxp"
      data-theme="cx"
      style={{ "--h": "230vh" } as CSSProperties}
    >
      <div className="stage cx-stage">
        <div className="cx" data-cx>
          <div className="cx-media" data-cx-media>
            <Scene scene={c.scene} />
          </div>
          <div className="cx-shade" aria-hidden="true" />
          <div className="cx-name dx" data-cx-name aria-hidden="true">
            {c.client}
          </div>
          <div className="cx-cap" data-cx-cap>
            <b>{c.client}</b>
            <span>{c.deliverables.join(" · ")}</span>
          </div>
        </div>
      </div>
    </ExpandImage>
  );
}
