import { SEGMENTS } from "@/content/segments";
import { SEGMENTS_COPY } from "@/content/site";
import { cn } from "@/lib/cn";
import { WaButton } from "@/components/ui/Button";
import { Scene } from "@/components/ui/Scene";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StickyWipe } from "@/components/motion/StickyWipe";

export function Segments() {
  const total = String(SEGMENTS.length).padStart(2, "0");
  return (
    <StickyWipe className="light sec" id="segmentos" data-theme="light">
      <div className="wrap">
        <SectionHeading eyebrow={SEGMENTS_COPY.eyebrow} title={SEGMENTS_COPY.title} />
        <div className="seg">
          <div className="seg-media">
            <div className="seg-sticky">
              <div className="seg-imgs" aria-hidden="true">
                {SEGMENTS.map((s, i) => (
                  <div
                    key={s.id}
                    data-seg-img
                    style={i > 0 ? { clipPath: "inset(100% 0 0 0)" } : undefined}
                  >
                    <Scene scene={s.scene} />
                  </div>
                ))}
              </div>
              <div className="seg-cnt">
                <span>{SEGMENTS_COPY.counterLabel}</span>
                <b className="dx" data-seg-count aria-hidden="true">
                  01 / {total}
                </b>
              </div>
            </div>
          </div>
          <div className="seg-list">
            {SEGMENTS.map((s, i) => (
              <article key={s.id} className={cn("seg-it", i === 0 && "on")} data-seg>
                <span className="seg-n dx" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="dx">{s.title}</h3>
                <p className="seg-hl">{s.headline}</p>
                <p className="muted">{s.body}</p>
                <p className="seg-proof">{s.proof.join(" · ")}</p>
                <WaButton
                  variant="ink"
                  message={s.waMessage}
                  origin={s.track}
                  data-segment={s.id}
                  icon="arrowRight"
                >
                  {s.cta}
                </WaButton>
              </article>
            ))}
          </div>
        </div>
      </div>
    </StickyWipe>
  );
}
