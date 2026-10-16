/** The faceted diamond line drawing used by the preloader, the hero fallback and the contact section. */
export const DIAMOND_PATH =
  "M40 60h120l30 40-90 90-90-90z M10 100h180 M70 60l30 130 M130 60l-30 130 M40 60l30 40 M160 60l-30 40 M100 60l-30 40 M100 60l30 40";

export function DiamondMark({
  className,
  pathLength,
}: {
  className?: string;
  pathLength?: number;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={DIAMOND_PATH} pathLength={pathLength} />
    </svg>
  );
}
