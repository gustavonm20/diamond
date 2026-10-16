import { PROCESS } from "@/content/site";
import { WA_MESSAGES } from "@/content/whatsapp";
import { WaButton } from "@/components/ui/Button";
import { ConfirmBadge } from "@/components/ui/ConfirmBadge";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DrawLine } from "@/components/motion/DrawLine";

export function Process() {
  const c = PROCESS.card;
  return (
    <section className="sec" id="processo" data-theme="dark">
      <div className="wrap">
        <SectionHeading eyebrow={PROCESS.eyebrow} title={PROCESS.title} />
        <div className="proc">
          <DrawLine>
            <ol className="contents">
              {PROCESS.steps.map((s, i) => (
                <li key={s.title} className="step" data-step>
                  <span className="node" aria-hidden="true" />
                  <span className="n dx">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="dx">{s.title}</h3>
                  <p>
                    {s.body}
                    {!s.confirmed && <ConfirmBadge note={s.confirmNote} />}
                  </p>
                </li>
              ))}
            </ol>
          </DrawLine>
          <aside className="proc-card rv">
            <small>{c.quoteLabel}</small>
            <span className="k g dx">{c.quoteValue}</span>
            <small className="gap">{c.leadLabel}</small>
            <span className="k dx">{c.leadValue}</span>
            <small>{c.leadUnit}</small>
            <p className="tip">
              <Icon name="calendarEvent" />
              {c.tip}
            </p>
            <WaButton message={WA_MESSAGES.process} origin="process" magnetic icon="arrowRight">
              {c.cta}
            </WaButton>
          </aside>
        </div>
      </div>
    </section>
  );
}
