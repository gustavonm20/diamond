/**
 * WhatsApp message templates by origin. Each origin gets its own message so the
 * team knows where the lead came from before replying.
 */
export const WA_MESSAGES = {
  header: "Olá! Vim pelo site da Diamond e quero um orçamento.",
  mobileMenu: "Olá! Vim pelo site da Diamond e quero um orçamento.",
  hero: "Olá! Vim pelo site da Diamond e quero um orçamento em 24h.",
  process: "Olá! Vim pelo site da Diamond. Tenho uma data de inauguração e quero alinhar o prazo.",
  faq: "Olá! Vim pelo site da Diamond e tenho uma dúvida.",
  contact: "Olá! Vim pelo site da Diamond e quero um orçamento.",
  footer: "Olá! Vim pelo site da Diamond.",
  fab: "Olá! Vim pelo site da Diamond e quero um orçamento.",
  mobileBar: "Olá! Vim pelo site da Diamond e quero um orçamento.",
  case: "Olá! Vim pelo site da Diamond, vi os cases e quero um projeto parecido.",
} as const;

export type WaOrigin = keyof typeof WA_MESSAGES;
