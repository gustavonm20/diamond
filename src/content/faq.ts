import type { FaqItem } from "@/types/content";

export const FAQ: FaqItem[] = [
  {
    question: "Qual o prazo de produção e instalação?",
    answer:
      "O prazo médio é de 8 a 15 dias úteis, conforme o tipo de peça, os materiais e a complexidade da instalação. Se você tem data de inauguração, conte no primeiro contato.",
    confirmed: true,
  },
  {
    question: "Em quanto tempo recebo o orçamento?",
    answer: "Em até 24 horas depois de recebermos as informações do projeto.",
    confirmed: true,
  },
  {
    question: "Vocês criam a arte ou preciso enviar pronta?",
    answer:
      "As duas coisas: criamos do zero ou adaptamos a sua identidade ao formato da peça. Nada vai para produção sem a sua aprovação.",
    confirmed: true,
  },
  {
    question: "Quais regiões vocês atendem?",
    answer:
      "Sede em Alphaville, com atendimento em Santana de Parnaíba, Barueri e Grande São Paulo.",
    confirmed: false,
    confirmNote: "Confirmar área de atendimento com a Diamond.",
  },
  {
    question: "A instalação está inclusa?",
    answer: "Sim, a instalação faz parte do processo e é agendada com você.",
    confirmed: false,
    confirmNote: "Confirmar equipe própria e trabalho em altura (NR-35).",
  },
  {
    question: "Minha fachada precisa seguir alguma regra?",
    answer:
      "Pode precisar: legislação municipal (como a Lei Cidade Limpa, na capital), regras de condomínio ou de shopping.",
    confirmed: false,
    confirmNote: "Confirmar como a Diamond orienta o cliente.",
  },
];
