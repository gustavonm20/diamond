import { z } from "zod";
import { FORM } from "@/content/site";

const E = FORM.errors;

export const onlyDigits = (v: string) => v.replace(/\D/g, "");

/** Shared by the client form (per-step validation) and the Server Action (re-validation). */
export const leadSchema = z.object({
  services: z.array(z.string()).min(1, E.services),
  city: z.string().trim().min(2, E.city).max(80),
  date: z.string().max(20).optional().or(z.literal("")),
  art: z.string().refine((v) => (FORM.art.options as readonly string[]).includes(v), E.art),
  name: z.string().trim().min(2, E.name).max(80),
  whatsapp: z
    .string()
    .max(20)
    .refine((v) => {
      const n = onlyDigits(v).length;
      return n >= 10 && n <= 11;
    }, E.whatsapp),
  consent: z.boolean().refine((v) => v === true, E.consent),
  /** Honeypot: humans never see this field. */
  website: z.string().max(200).optional(),
  segment: z.string().max(40).optional(),
  utm_source: z.string().max(120).optional(),
  utm_medium: z.string().max(120).optional(),
  utm_campaign: z.string().max(120).optional(),
  utm_content: z.string().max(120).optional(),
  utm_term: z.string().max(120).optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

export const STEP_FIELDS = [
  ["services"],
  ["city", "date", "art"],
  ["name", "whatsapp", "consent"],
] as const satisfies readonly (readonly (keyof LeadInput)[])[];

/** BR phone mask: (11) 91234-5678 or (11) 1234-5678. */
export function maskPhone(value: string) {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function formatDate(iso?: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : iso;
}

function joinPt(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

/** The WhatsApp message the form composes live as the visitor fills it in. */
export function composeLeadMessage(
  data: Partial<Pick<LeadInput, "services" | "city" | "date" | "art" | "name">>,
  serviceTitles: Record<string, string>,
) {
  const services = (data.services ?? []).map((id) => serviceTitles[id] ?? id);
  if (!services.length) return FORM.baseMessage;
  let msg = `Olá! Vim pelo site da Diamond e quero um orçamento de ${joinPt(services)}`;
  msg += data.city?.trim() ? ` em ${data.city.trim()}.` : ".";
  if (data.date) msg += ` Data desejada: ${formatDate(data.date)}.`;
  if (data.art) msg += ` Arte: ${data.art.toLowerCase()}.`;
  if (data.name?.trim()) msg += ` Sou ${data.name.trim()}.`;
  return msg;
}
