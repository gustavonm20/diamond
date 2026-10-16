import { MANIFESTO } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WordScrub } from "@/components/motion/WordScrub";

export function Manifesto() {
  return (
    <section
      className="sec border-t border-line-2"
      data-theme="dark"
      aria-label={MANIFESTO.eyebrow}
    >
      <div className="wrap">
        <Eyebrow>{MANIFESTO.eyebrow}</Eyebrow>
        <WordScrub className="mf-t dx" text={MANIFESTO.text} accents={MANIFESTO.accents} />
      </div>
    </section>
  );
}
