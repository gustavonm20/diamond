"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitLead } from "@/app/actions/lead";
import { SERVICES } from "@/content/services";
import { FORM } from "@/content/site";
import { track } from "@/lib/analytics";
import {
  composeLeadMessage,
  leadSchema,
  STEP_FIELDS,
  type Lead,
  type LeadInput,
} from "@/lib/lead-schema";
import { readSegment, readUtm, type Utm } from "@/lib/utm";
import { waLinkProps } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { StepServices } from "./StepServices";
import { StepProject } from "./StepProject";
import { StepContact } from "./StepContact";

const TITLES = Object.fromEntries(SERVICES.map((s) => [s.id, s.title]));
const TOTAL = 3;

/** First error message among a step's fields, in field order. */
function stepError(errors: FieldErrors<LeadInput>, step: number) {
  for (const f of STEP_FIELDS[step]) {
    const e = errors[f];
    if (e?.message) return String(e.message);
  }
  return "";
}

/**
 * 3-step qualifying form: services → project → contact. Per-step validation with inline pt-BR errors,
 * a live preview of the WhatsApp message, UTM + segment in the payload, honeypot, Server Action submit.
 */
export function LeadForm() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState<string | null>(null);
  const [serverError, setServerError] = useState("");
  const [pending, startTransition] = useTransition();
  const started = useRef(false);
  const utm = useRef<Utm>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const form = useForm<LeadInput, unknown, Lead>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      services: [],
      city: "",
      date: "",
      art: "",
      name: "",
      whatsapp: "",
      consent: false,
      website: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const { trigger, handleSubmit, formState, reset, control } = form;
  const values = useWatch({ control });
  const message = composeLeadMessage(values, TITLES);

  useEffect(() => {
    utm.current = readUtm();
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step, sent]);

  const markStart = () => {
    if (started.current) return;
    started.current = true;
    track({ event: "form_start" });
  };

  const next = async () => {
    const ok = await trigger(STEP_FIELDS[step] as unknown as (keyof LeadInput)[], {
      shouldFocus: true,
    });
    if (!ok) return;
    track({ event: "form_step_complete", step: step + 1 });
    setStep((s) => Math.min(TOTAL - 1, s + 1));
  };

  const onValid = (data: Lead) => {
    setServerError("");
    startTransition(async () => {
      const segment = readSegment();
      const res = await submitLead({ ...data, ...utm.current, segment });
      if (res.ok) {
        track({ event: "form_step_complete", step: TOTAL });
        track({ event: "form_submit", services: data.services.join(","), segment });
        setSent(message);
      } else {
        setServerError(res.error);
      }
    });
  };

  if (sent) {
    return (
      <div className="ok" aria-live="polite">
        <Icon name="check" />
        <h3 ref={headingRef} tabIndex={-1} className="dx">
          {FORM.success.title}
        </h3>
        <p className="muted">{FORM.success.body}</p>
        <div className="okm">{sent}</div>
        <div className="row">
          <a className="btn btn-gold" {...waLinkProps(sent, "form_success")}>
            {FORM.success.whatsapp}
            <Icon name="whatsapp" />
          </a>
          <Button
            variant="line"
            onClick={() => {
              reset();
              setSent(null);
              setStep(0);
            }}
          >
            {FORM.success.reset}
          </Button>
        </div>
      </div>
    );
  }

  const error = serverError || stepError(formState.errors, step);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step < TOTAL - 1) void next();
        else void handleSubmit(onValid)(e);
      }}
      onFocusCapture={markStart}
      onPointerDownCapture={markStart}
      aria-describedby="form-msg"
    >
      <div className="steps" aria-hidden="true">
        {Array.from({ length: TOTAL }, (_, i) => (
          <i key={i} className={i <= step ? "on" : undefined} />
        ))}
      </div>
      <span className="step-of" aria-live="polite">
        {FORM.stepOf(step + 1, TOTAL)}
      </span>

      <div className="stp">
        <h3 ref={headingRef} tabIndex={-1} className="dx outline-none">
          {step + 1}. {FORM.steps[step]}
        </h3>
        {step === 0 && <StepServices form={form} />}
        {step === 1 && <StepProject form={form} />}
        {step === 2 && <StepContact form={form} />}
        <p className="er" role="alert">
          {error}
        </p>
        {serverError && (
          <a className="btn btn-line btn-sm mt-3" {...waLinkProps(message, "form_error")}>
            <Icon name="whatsapp" />
            {FORM.errorWhatsapp}
          </a>
        )}
      </div>

      <div className="fmsg" id="form-msg">
        <Icon name="whatsapp" />
        <span>
          <span className="sr-only">{FORM.previewLabel}: </span>
          {message}
        </span>
      </div>

      <div className="fnav">
        <Button
          variant="line"
          style={{ visibility: step === 0 ? "hidden" : "visible" }}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          tabIndex={step === 0 ? -1 : undefined}
        >
          {FORM.back}
        </Button>
        <Button
          type="submit"
          disabled={pending}
          icon={step < TOTAL - 1 ? "arrowRight" : "whatsapp"}
        >
          {step < TOTAL - 1 ? FORM.next : pending ? FORM.sending : FORM.submit}
        </Button>
      </div>
    </form>
  );
}
