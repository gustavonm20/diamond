"use client";

import { FORM } from "@/content/site";
import type { LeadFormApi } from "./types";

/** Step 2: city (required), date (optional), art status (required). */
export function StepProject({ form }: { form: LeadFormApi }) {
  const { register, formState } = form;
  const e = formState.errors;
  return (
    <div className="fgrid">
      <label className="f">
        {FORM.city.label}
        <input
          {...register("city")}
          autoComplete="address-level2"
          placeholder={FORM.city.placeholder}
          aria-invalid={!!e.city || undefined}
          required
        />
      </label>
      <label className="f">
        {FORM.date.label}
        <input {...register("date")} type="date" />
      </label>
      <label className="f full">
        {FORM.art.label}
        <select {...register("art")} aria-invalid={!!e.art || undefined} required>
          <option value="">{FORM.art.placeholder}</option>
          {FORM.art.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
