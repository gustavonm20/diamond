import { SCALE } from "@/content/site";
import { LightFillText } from "@/components/motion/LightFillText";

export function ScaleStatement() {
  return (
    <section className="sec lf" id="escala" data-theme="dark">
      <LightFillText className="lf-t dx">
        {SCALE.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </LightFillText>
      <div className="wrap">
        <p className="lead">{SCALE.lead}</p>
      </div>
    </section>
  );
}
