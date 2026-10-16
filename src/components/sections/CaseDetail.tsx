import { FEATURED_CASE, MORE_CASES } from "@/content/cases";
import { CASES } from "@/content/site";
import { WA_MESSAGES } from "@/content/whatsapp";
import { WaButton } from "@/components/ui/Button";
import { ConfirmBadge } from "@/components/ui/ConfirmBadge";
import { Scene } from "@/components/ui/Scene";
import { BeforeAfter } from "@/components/motion/BeforeAfter";

export function CaseDetail() {
  const c = FEATURED_CASE;
  return (
    <div className="sec" data-theme="dark">
      <div className="wrap">
        <div className="case-grid">
          <div className="case-info rv">
            <div className="tags">
              <span className="tag gold">{c.segment}</span>
              <span className="tag dash">{CASES.illustrative}</span>
              {!c.confirmed && <ConfirmBadge note={c.confirmNote} />}
            </div>
            <h3 className="dx">{c.client}</h3>
            <dl>
              <dt>{CASES.challenge}</dt>
              <dd>{c.challenge}</dd>
              <dt>{CASES.solution}</dt>
              <dd>{c.solution}</dd>
            </dl>
            <div className="tags">
              {c.deliverables.map((d) => (
                <span key={d} className="tag">
                  {d}
                </span>
              ))}
              <span className="tag">{CASES.deadline}</span>
            </div>
            <WaButton
              variant="line"
              message={WA_MESSAGES.case}
              origin="case_detail"
              icon="arrowRight"
            >
              {CASES.cta}
            </WaButton>
          </div>
          <BeforeAfter className="ba" role="img" aria-label={CASES.beforeAfterLabel}>
            <div>
              <Scene scene={{ kind: "fachada", label: "SUA MARCA" }} lit={false} />
            </div>
            <div className="ba-lit" data-ba-lit>
              <Scene scene={{ kind: "fachada", label: "SUA MARCA" }} />
            </div>
            <i className="ba-line" data-ba-line aria-hidden="true" />
            <span className="ba-lab d" aria-hidden="true">
              {CASES.after}
            </span>
            <span className="ba-lab a" aria-hidden="true">
              {CASES.before}
            </span>
          </BeforeAfter>
        </div>

        <div className="case-more">
          {MORE_CASES.map((m, i) => (
            <article key={m.client} className="cm rv" data-d={i}>
              <div className="media">
                <Scene scene={m.scene} />
              </div>
              <h4 className="dx">{m.client}</h4>
              <p>
                {m.segment} · {CASES.illustrative}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
