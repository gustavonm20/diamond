import { CONTACT, SITE } from "@/content/site";
import { WA_MESSAGES } from "@/content/whatsapp";
import { WaButton } from "@/components/ui/Button";
import { DIAMOND_PATH } from "@/components/ui/DiamondMark";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DiamondDraw } from "@/components/motion/DiamondDraw";
import { LeadForm } from "@/components/forms/LeadForm";

export function ContactCta() {
  return (
    <DiamondDraw className="sec cta" id="contato" data-theme="dark" aria-labelledby="contato-title">
      <svg className="cta-d" viewBox="0 0 200 200" fill="none" aria-hidden="true" focusable="false">
        <path data-draw pathLength={1} d={DIAMOND_PATH} />
      </svg>
      <div className="wrap cta-grid">
        <div>
          <SectionHeading eyebrow={CONTACT.eyebrow} title={CONTACT.title} id="contato-title" />
          <p className="lead rv">{CONTACT.lead}</p>
          <WaButton
            variant="line"
            className="rv"
            message={WA_MESSAGES.contact}
            origin="contact_direct"
            icon="whatsapp"
            iconPosition="start"
          >
            {CONTACT.direct}
          </WaButton>
          <ul className="contact rv">
            <li>
              <Icon name="phone" />
              <a href="tel:+5511913553258">{SITE.phoneDisplay}</a>
            </li>
            <li>
              <Icon name="mail" />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <Icon name="pin" />
              <span>{SITE.address.short}</span>
            </li>
          </ul>
        </div>
        <div className="form">
          <LeadForm />
        </div>
      </div>
    </DiamondDraw>
  );
}
