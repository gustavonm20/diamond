import type { TestimonialSlot } from "@/types/content";

/** Empty slots on purpose: never invent testimonials. Fill with real quotes (name, role, company). */
export const TESTIMONIAL_SLOTS: TestimonialSlot[] = [
  {
    segment: "Empresas e escritórios",
    confirmed: false,
    confirmNote: "Depoimento real de cliente corporativo.",
  },
  {
    segment: "Varejo e lifestyle",
    confirmed: false,
    confirmNote: "Depoimento real de cliente de varejo.",
  },
  {
    segment: "Igrejas e eventos",
    confirmed: false,
    confirmNote: "Depoimento real de igreja ou produtora.",
  },
];
