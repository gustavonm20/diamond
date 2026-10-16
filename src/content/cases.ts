import type { CaseStudy } from "@/types/content";

/** Featured case. Everything here is illustrative until the client sends real cases. */
export const FEATURED_CASE: CaseStudy = {
  client: "Reserva Beach Club",
  segment: "Varejo e lifestyle",
  challenge: "Uma fachada à altura de um beach club premium, visível de dia e marcante à noite.",
  solution: "Letra caixa iluminada, backlight de entrada e comunicação integrada ao ambiente.",
  deliverables: ["Fachada", "Letra caixa", "Backlight"],
  scene: { kind: "fachada", label: "RESERVA" },
  confirmed: false,
  confirmNote: "Substituir por case real: desafio, solução, prazo, m² e fotos.",
};

export const MORE_CASES: CaseStudy[] = [
  {
    client: "Itaú",
    segment: "Empresas e escritórios",
    challenge: "",
    solution: "",
    deliverables: ["Letra caixa"],
    scene: { kind: "letra", label: "Itaú" },
    confirmed: false,
    confirmNote: "Case ilustrativo.",
  },
  {
    client: "Lagoinha Alphaville",
    segment: "Igrejas e eventos",
    challenge: "",
    solution: "",
    deliverables: ["Backdrop"],
    scene: { kind: "backdrop", label: "LAGOINHA" },
    confirmed: false,
    confirmNote: "Case ilustrativo.",
  },
];
