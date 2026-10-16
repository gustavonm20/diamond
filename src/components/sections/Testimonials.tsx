import { TESTIMONIAL_SLOTS } from "@/content/testimonials";
import { TESTIMONIALS_COPY } from "@/content/site";
import { ConfirmBadge } from "@/components/ui/ConfirmBadge";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Dashed placeholder cards. Never invent testimonials: fill content/testimonials.ts with real quotes. */
export function Testimonials() {
  return (
    <section className="sec border-t border-line-2" data-theme="dark" aria-labelledby="tst-title">
      <div className="wrap">
        <SectionHeading
          eyebrow={TESTIMONIALS_COPY.eyebrow}
          title={TESTIMONIALS_COPY.title}
          id="tst-title"
        />
        <div className="tst">
          {TESTIMONIAL_SLOTS.map((slot, i) => (
            <figure key={slot.segment} className="tc rv" data-d={i}>
              <Icon name="quote" />
              <span className="sr-only">{TESTIMONIALS_COPY.slot}</span>
              <div aria-hidden="true">
                <div className="bar" style={{ width: "92%" }} />
                <div className="bar" style={{ width: "84%" }} />
                <div className="bar" style={{ width: "60%" }} />
              </div>
              <figcaption className="who">
                <i aria-hidden="true" />
                <span>
                  {slot.segment}
                  <ConfirmBadge note={slot.confirmNote} />
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
