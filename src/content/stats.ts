import type { Stat } from "@/types/content";

/** Only confirmed numbers can ship without the asterisk. */
export const STATS: Stat[] = [
  {
    prefix: "+",
    value: "500",
    suffix: "*",
    label: "projetos entregues",
    srText: "Mais de 500 projetos entregues (número ilustrativo)",
    confirmed: false,
    confirmNote: "Número ilustrativo: pedir o total real de projetos.",
  },
  {
    value: "20",
    suffix: " mil",
    label: "pessoas em um único evento",
    srText: "20 mil pessoas em um único evento",
    confirmed: true,
  },
  {
    prefix: "+",
    value: "10",
    suffix: "*",
    label: "anos de mercado",
    srText: "Mais de 10 anos de mercado (número ilustrativo)",
    confirmed: false,
    confirmNote: "Número ilustrativo: confirmar o ano de fundação.",
  },
  {
    value: "24",
    suffix: "h",
    label: "para receber seu orçamento",
    srText: "Orçamento em até 24 horas",
    confirmed: true,
  },
];
