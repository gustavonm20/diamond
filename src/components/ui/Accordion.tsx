"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type Item = { question: string; answer: ReactNode };

/** Accessible accordion (grid-template-rows 0fr → 1fr, 0.5s). First item open. */
export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={item.question} className={cn("fq", isOpen && "open")}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.question}</span>
                <Icon name="plus" />
              </button>
            </h3>
            <div className="fqa" id={panelId} role="region" aria-labelledby={btnId} inert={!isOpen}>
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
