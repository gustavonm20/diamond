import { Fragment } from "react";
import { CLIENTS } from "@/content/site";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";

/** Client names in Archivo until real SVG logos arrive [confirmar]. */
export function ClientMarquee() {
  return (
    <VelocityMarquee label="Clientes">
      {CLIENTS.map((name) => (
        <Fragment key={name}>
          <span className="mq-item">{name}</span>
          <svg className="mq-sep" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
            <path d="M6 1 11 6 6 11 1 6z" fill="none" stroke="currentColor" />
          </svg>
        </Fragment>
      ))}
    </VelocityMarquee>
  );
}
