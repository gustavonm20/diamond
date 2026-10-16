import { Fragment } from "react";
import type { Rich } from "@/types/content";

/** Renders copy where `{ accent }` parts become Instrument Serif italic gold words. */
export function RichText({ parts }: { parts: Rich }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <span key={i} className="it">
            {part.accent}
          </span>
        ),
      )}
    </>
  );
}
