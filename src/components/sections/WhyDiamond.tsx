import { WHY } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyDiamond() {
  return (
    <section className="sec border-t border-line-2" data-theme="dark" aria-labelledby="why-title">
      <div className="wrap">
        <SectionHeading eyebrow={WHY.eyebrow} title={WHY.title} id="why-title" />
        <div className="bento">
          {WHY.items.map((item, i) => (
            <div key={item.title} className={cn("bt-cell rv", item.size)} data-d={i}>
              <div className="bt" data-spotlight="tilt">
                <Icon name={item.icon} />
                {item.size === "full" ? (
                  <div>
                    <h3 className="dx">{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                ) : (
                  <>
                    {item.kicker && (
                      <span className="k dx" aria-hidden="true">
                        {item.kicker}
                      </span>
                    )}
                    <h3 className="dx">{item.title}</h3>
                    <p>{item.body}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
