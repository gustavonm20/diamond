import { showConfirmBadges } from "@/lib/env";

/** Marks content that still needs the client's confirmation. Hidden in production builds. */
export function ConfirmBadge({ note, label = "confirmar" }: { note?: string; label?: string }) {
  if (!showConfirmBadges) return null;
  return (
    <span className="cbadge" title={note} data-confirm>
      [{label}]{note ? <span className="sr-only">: {note}</span> : null}
    </span>
  );
}
