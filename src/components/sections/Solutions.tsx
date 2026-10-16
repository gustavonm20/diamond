import { SERVICES } from "@/content/services";
import { SOLUTIONS } from "@/content/site";
import { waLinkProps } from "@/lib/whatsapp";
import { ConfirmBadge } from "@/components/ui/ConfirmBadge";
import { Icon } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";
import { Scene } from "@/components/ui/Scene";
import { HorizontalTrack } from "@/components/motion/HorizontalTrack";

export function Solutions() {
  return (
    <HorizontalTrack
      className="light hp"
      id="solucoes"
      data-theme="light"
      aria-labelledby="solucoes-title"
    >
      <div className="stage hs">
        <div className="wrap">
          <span className="ey">{SOLUTIONS.eyebrow}</span>
          <h2 id="solucoes-title" className="h2 dx">
            <RichText parts={SOLUTIONS.title} />
          </h2>
        </div>
        <div className="track" data-track>
          {SERVICES.map((s) => (
            <article key={s.id} className="card" data-card>
              <div className="media">
                <Scene scene={s.scene} />
                <div className="dim" data-dim />
                <span className="hl" data-hl />
              </div>
              <div className="body">
                <h3 className="dx">
                  {s.title}
                  {!s.confirmed && <ConfirmBadge note={s.confirmNote} />}
                </h3>
                <p>{s.tagline}</p>
                <p className="ideal">
                  {SOLUTIONS.idealFor}: {s.idealFor}
                </p>
                <a
                  className="go"
                  {...waLinkProps(s.waMessage, `service_${s.id}`)}
                  data-cta={`service_${s.id}`}
                  data-section="solucoes"
                  aria-label={`${SOLUTIONS.cta}: ${s.title}`}
                >
                  {SOLUTIONS.cta}
                  <Icon name="arrowRight" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="wrap">
          <div className="tbar" aria-hidden="true">
            <span data-tbar />
          </div>
          <p className="swipe-hint" aria-hidden="true">
            <i />
            {SOLUTIONS.hint}
          </p>
        </div>
      </div>
    </HorizontalTrack>
  );
}
