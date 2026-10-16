"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { SERVICES } from "@/content/services";
import { FORM, SITE } from "@/content/site";
import { composeLeadMessage, leadSchema, onlyDigits } from "@/lib/lead-schema";

export type LeadResult = { ok: true } | { ok: false; error: string };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
/** Best-effort, per-instance rate limit. Use a shared store (e.g. Upstash) if abuse shows up. */
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_HITS;
}

const TITLES = Object.fromEntries(SERVICES.map((s) => [s.id, s.title]));

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export async function submitLead(input: unknown): Promise<LeadResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success)
    return { ok: false, error: parsed.error.issues[0]?.message ?? FORM.errors.server };
  const lead = parsed.data;

  // Honeypot filled: pretend success, send nothing.
  if (lead.website) return { ok: true };

  const h = await headers();
  const ip =
    (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { ok: false, error: FORM.errors.rate };

  const services = lead.services.map((id) => TITLES[id] ?? id);
  const message = composeLeadMessage(lead, TITLES);
  const rows: [string, string][] = [
    ["Nome", lead.name],
    ["WhatsApp", lead.whatsapp],
    ["Serviços", services.join(", ")],
    ["Cidade", lead.city],
    ["Data desejada", lead.date || "—"],
    ["Arte", lead.art],
    ["Segmento (origem)", lead.segment || "—"],
    [
      "UTM",
      [lead.utm_source, lead.utm_medium, lead.utm_campaign, lead.utm_content, lead.utm_term]
        .filter(Boolean)
        .join(" / ") || "—",
    ],
  ];

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[lead] RESEND_API_KEY ausente: lead não enviado por e-mail.",
        Object.fromEntries(rows),
      );
      return { ok: true };
    }
    console.error("[lead] RESEND_API_KEY ausente em produção.");
    return { ok: false, error: FORM.errors.server };
  }

  try {
    const resend = new Resend(apiKey);
    const html = `<h2>Novo pedido de orçamento</h2><table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><b>${escapeHtml(k)}</b></td><td>${escapeHtml(v)}</td></tr>`)
      .join(
        "",
      )}</table><p><b>Mensagem:</b> ${escapeHtml(message)}</p><p><a href="https://wa.me/55${onlyDigits(lead.whatsapp)}">Responder no WhatsApp</a></p>`;
    const { error } = await resend.emails.send({
      from: process.env.LEAD_FROM_EMAIL || "Diamond Site <onboarding@resend.dev>",
      to: process.env.LEAD_TO_EMAIL || SITE.email,
      subject: `Orçamento: ${services.join(", ")} · ${lead.city}`,
      html,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`,
    });
    if (error) {
      console.error("[lead] Resend error", error);
      return { ok: false, error: FORM.errors.server };
    }
    return { ok: true };
  } catch (err) {
    console.error("[lead] send failed", err);
    return { ok: false, error: FORM.errors.server };
  }
}
