import { FAQ } from "@/content/faq";
import { FAQ_COPY } from "@/content/site";
import { WA_MESSAGES } from "@/content/whatsapp";
import { Accordion } from "@/components/ui/Accordion";
import { WaButton } from "@/components/ui/Button";
import { ConfirmBadge } from "@/components/ui/ConfirmBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  return (
    <section className="light sec" id="faq" data-theme="light">
      <div className="wrap faq">
        <div>
          <SectionHeading eyebrow={FAQ_COPY.eyebrow} title={FAQ_COPY.title} />
          <p className="muted rv">{FAQ_COPY.lead}</p>
          <WaButton
            variant="ink"
            className="rv"
            message={WA_MESSAGES.faq}
            origin="faq"
            icon="whatsapp"
          >
            {FAQ_COPY.cta}
          </WaButton>
        </div>
        <Accordion
          items={FAQ.map((f) => ({
            question: f.question,
            answer: (
              <>
                {f.answer}
                {!f.confirmed && <ConfirmBadge note={f.confirmNote} />}
              </>
            ),
          }))}
        />
      </div>
    </section>
  );
}
