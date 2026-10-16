"use client";

import { useWatch } from "react-hook-form";
import { SERVICES } from "@/content/services";
import { FORM } from "@/content/site";
import { Chip } from "@/components/ui/Chip";
import type { LeadFormApi } from "./types";

/** Step 1: service chips (at least one). */
export function StepServices({ form }: { form: LeadFormApi }) {
  const selected = useWatch({ control: form.control, name: "services" }) ?? [];
  const invalid = !!form.formState.errors.services;

  const toggle = (id: string) => {
    const next = selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id];
    form.setValue("services", next, {
      shouldValidate: form.formState.isSubmitted || invalid,
      shouldDirty: true,
    });
  };

  return (
    <div className="chips" role="group" aria-label={FORM.servicesLabel}>
      {SERVICES.map((s) => (
        <Chip key={s.id} pressed={selected.includes(s.id)} onClick={() => toggle(s.id)}>
          {s.title}
        </Chip>
      ))}
    </div>
  );
}
