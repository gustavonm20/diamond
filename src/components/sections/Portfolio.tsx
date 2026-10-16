import { PORTFOLIO, WALL_COLUMNS } from "@/content/portfolio";
import { PORTFOLIO_COPY } from "@/content/site";
import { Scene } from "@/components/ui/Scene";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParallaxColumns } from "@/components/motion/ParallaxColumns";
import { PortfolioGallery } from "./PortfolioGallery";

export function Portfolio() {
  return (
    <section className="sec" id="portfolio" data-theme="dark">
      <div className="wrap">
        <SectionHeading eyebrow={PORTFOLIO_COPY.eyebrow} title={PORTFOLIO_COPY.title} />
        <ParallaxColumns>
          {WALL_COLUMNS.map((col, ci) => (
            <div key={ci} data-col>
              {col.map((item, i) => (
                <div key={`${item.id}-${i}`} className="wt">
                  <Scene scene={item.scene} />
                </div>
              ))}
            </div>
          ))}
        </ParallaxColumns>
        <PortfolioGallery items={PORTFOLIO} />
      </div>
    </section>
  );
}
