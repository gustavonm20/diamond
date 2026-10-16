import { CASES } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CasesIntro() {
  return (
    <div className="light cases-head" data-theme="light">
      <div className="wrap">
        <SectionHeading eyebrow={CASES.eyebrow} title={CASES.title} id="projetos-title" />
      </div>
    </div>
  );
}
