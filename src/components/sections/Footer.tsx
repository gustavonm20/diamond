import { FOOTER, HEADER, NAV, SITE } from "@/content/site";
import { WA_MESSAGES } from "@/content/whatsapp";
import { showConfirmBadges } from "@/lib/env";
import { waLinkProps } from "@/lib/whatsapp";
import { ConfirmBadge } from "@/components/ui/ConfirmBadge";
import { Icon } from "@/components/ui/Icon";
import { Year } from "@/components/ui/Year";
import { FooterWordmark } from "@/components/motion/FooterWordmark";

export function Footer() {
  return (
    <FooterWordmark className="ft" id="ft" data-theme="dark">
      <div className="wrap">
        <div className="ft-top">
          <div>
            <a href="#top" className="logo" aria-label={HEADER.logoLabel}>
              <Icon name="diamond" />
              <span>
                <b className="dx">DIAMOND</b>
                <small>{HEADER.logoSub}</small>
              </span>
            </a>
            <p>{FOOTER.blurb}</p>
          </div>
          <nav aria-labelledby="ft-nav">
            <h2 id="ft-nav">{FOOTER.navTitle}</h2>
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div>
            <h2>{FOOTER.contactTitle}</h2>
            <a {...waLinkProps(WA_MESSAGES.footer, "footer")}>{SITE.phoneDisplay}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={SITE.instagram.url} target="_blank" rel="noopener">
              {SITE.instagram.handle}
            </a>
            <p>
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
            </p>
          </div>
        </div>
        <div className="fw dx" data-wordmark aria-hidden="true">
          {FOOTER.wordmark}
        </div>
        <div className="ft-bot">
          <span>
            © <Year /> {SITE.name}
            {showConfirmBadges && (
              <>
                {" · CNPJ "}
                <ConfirmBadge note={SITE.cnpjNote} />
              </>
            )}
          </span>
          <a href="/politica-de-privacidade">{FOOTER.privacy}</a>
        </div>
      </div>
    </FooterWordmark>
  );
}
