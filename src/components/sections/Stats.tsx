import { STATS } from "@/content/stats";
import { STATS_NOTE } from "@/content/site";
import { ConfirmBadge } from "@/components/ui/ConfirmBadge";
import { OdometerDigits, OdometerGroup } from "@/components/motion/OdometerNumber";

const nbsp = (s: string) => s.replace(/^ /, " ");

export function Stats() {
  return (
    <section className="light stats-sec" id="numeros" data-theme="light" aria-label="Números">
      <div className="wrap">
        <OdometerGroup className="stats">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat">
              <div className="num dx" aria-hidden="true">
                {stat.prefix && <em>{stat.prefix}</em>}
                <OdometerDigits value={stat.value} />
                {stat.suffix && <em>{nbsp(stat.suffix)}</em>}
              </div>
              <span className="sr-only">{stat.srText}</span>
              <p>
                <span aria-hidden="true">{stat.label}</span>
                {!stat.confirmed && <ConfirmBadge note={stat.confirmNote} />}
              </p>
            </div>
          ))}
        </OdometerGroup>
        <p className="note">{STATS_NOTE}</p>
      </div>
    </section>
  );
}
