import type { CSSProperties } from "react";
import { HERO } from "@/content/site";
import { WA_MESSAGES } from "@/content/whatsapp";
import { ButtonLink, WaButton } from "@/components/ui/Button";
import { HeroMotion } from "@/components/motion/HeroMotion";
import { HeroDiamond } from "@/components/motion/HeroDiamond";
import { LightUpHeadline } from "@/components/motion/LightUpHeadline";
import { Skyline } from "@/components/motion/Skyline";

export function Hero() {
  return (
    <HeroMotion className="hero" id="top" data-theme="dark">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-horizon" />
        <div className="hero-diamond" data-hero-diamond>
          <HeroDiamond />
        </div>
        <div className="hero-sky" data-hero-sky>
          <Skyline />
        </div>
        <div className="hero-fade" />
      </div>

      <div className="wrap hero-in" data-hero-content>
        <div className="hero-copy">
          <span className="ey" data-enter>
            {HERO.eyebrow}
          </span>
          <LightUpHeadline className="h1 dx" lines={HERO.headline} />
          <p className="lead" data-enter style={{ "--d": 1 } as CSSProperties}>
            {HERO.lead}
          </p>
          <div className="ctas" data-enter style={{ "--d": 2 } as CSSProperties}>
            <WaButton message={WA_MESSAGES.hero} origin="hero" magnetic icon="arrowRight">
              {HERO.primaryCta}
            </WaButton>
            <ButtonLink
              variant="line"
              href="#projetos"
              data-cta="hero_projects"
              data-section="hero"
            >
              {HERO.secondaryCta}
            </ButtonLink>
          </div>
          <p className="trust" data-enter style={{ "--d": 3 } as CSSProperties}>
            {HERO.trust}
          </p>
        </div>
      </div>

      <div className="cue" data-hero-cue aria-hidden="true">
        <span>{HERO.cue}</span>
        <i />
      </div>
    </HeroMotion>
  );
}
