import type { Segment } from "@/types/content";

export const SEGMENTS: Segment[] = [
  {
    id: "empresas",
    title: "Empresas e escritórios",
    headline: "Sua sede falando a língua da sua marca.",
    body: "Letra caixa de recepção, adesivação de vidros e paredes, sinalização interna e fachadas.",
    proof: ["Itaú", "TransPerfect", "Neo Química", "Asahi", "Ecorodovias"],
    cta: "Falar sobre minha sede",
    waMessage: "Olá! Vim pelo site da Diamond e quero um orçamento para a sede da minha empresa.",
    track: "segment_empresas",
    scene: { kind: "letra", label: "SUA SEDE" },
  },
  {
    id: "varejo",
    title: "Varejo, gastronomia e lifestyle",
    headline: "A fachada que faz o cliente atravessar a rua.",
    body: "Fachada em ACM, backlight, letra caixa iluminada e totem.",
    proof: ["Reserva Beach Club", "Vivara", "Bio Ritmo", "Prainha", "Open Joias"],
    cta: "Falar sobre meu negócio",
    waMessage: "Olá! Vim pelo site da Diamond e quero um orçamento para a fachada do meu negócio.",
    track: "segment_varejo",
    scene: { kind: "fachada", label: "SUA LOJA" },
  },
  {
    id: "eventos",
    title: "Igrejas, eventos e grandes palcos",
    headline: "Cenários à altura de milhares de pessoas.",
    body: "Backdrops, adesivos em alto formato, cenografia e sinalização de eventos.",
    proof: ["Lagoinha Alphaville", "Lagoinha Kids", "Brasil Paralelo", "Jovem Pan"],
    cta: "Falar sobre meu evento",
    waMessage: "Olá! Vim pelo site da Diamond e quero um orçamento para um evento.",
    track: "segment_eventos",
    scene: { kind: "backdrop", label: "SEU EVENTO" },
  },
];
