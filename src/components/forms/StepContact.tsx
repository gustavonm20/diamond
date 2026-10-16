"use client";

import { FORM } from "@/content/site";
import { maskPhone } from "@/lib/lead-schema";
import type { LeadFormApi } from "./types";

/** Step 3: name, WhatsApp (BR mask), LGPD consent, honeypot. */
export function StepContact({ form }: { form: LeadFormApi }) {
  const { register, formState } = form;
  const e = formState.errors;
  const phone = register("whatsapp");
  return (
    <>
      <div className="fgrid">
        <label className="f">
          {FORM.name.label}
          <input
            {...register("name")}
            autoComplete="name"
            placeholder={FORM.name.placeholder}
            aria-invalid={!!e.name || undefined}
            required
          />
        </label>
        <label className="f">
          {FORM.whatsapp.label}
          <input
            {...phone}
            onChange={(ev) => {
              ev.target.value = maskPhone(ev.target.value);
              return phone.onChange(ev);
            }}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder={FORM.whatsapp.placeholder}
            aria-invalid={!!e.whatsapp || undefined}
            required
          />
        </label>
      </div>
      <label className="chk">
        <input
          type="checkbox"
          {...register("consent")}
          aria-invalid={!!e.consent || undefined}
          required
        />
        <span>
          {FORM.consentBefore}
          <a href="/politica-de-privacidade" target="_blank" rel="noopener">
            {FORM.consentLink}
          </a>
        </span>
      </label>
      <input
        className="hpf"
        {...register("website")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
    </>
  );
}
