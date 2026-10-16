import type { Rich } from "@/types/content";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { RichText } from "./RichText";

type Props = {
  eyebrow: string;
  title: Rich;
  id?: string;
  className?: string;
  reveal?: boolean;
};

export function SectionHeading({ eyebrow, title, id, className, reveal = true }: Props) {
  return (
    <>
      <Eyebrow reveal={reveal}>{eyebrow}</Eyebrow>
      <h2 id={id} className={cn("h2 dx", reveal && "rv", className)}>
        <RichText parts={title} />
      </h2>
    </>
  );
}
