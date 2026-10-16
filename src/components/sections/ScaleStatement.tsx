import { SCALE } from "@/content/site";
import { LightFillText } from "@/components/motion/LightFillText";

export function ScaleStatement() {
  return (
    <section className="sec lf" id="escala" data-theme="dark">
      <LightFillText className="lf-t dx" lines={SCALE.lines} />
      <div className="wrap">
        <p className="lead">{SCALE.lead}</p>
      </div>
    </section>
  );
}
