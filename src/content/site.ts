import type { Differentiator, ProcessStep, Rich } from "@/types/content";

export const SITE = {
  name: "Diamond Comunicação Visual",
  shortName: "Diamond",
  title: "Fachadas e Letreiros em Alphaville | Diamond Comunicação Visual",
  description:
    "Fachadas, letra caixa, backlight, totens e sinalização de alto padrão. Projeto, produção e instalação com orçamento em 24h. Alphaville e Grande SP.",
  ogTitle: "Diamond Comunicação Visual: presença que se vê de longe",
  ogDescription:
    "Fachadas, letreiros, backlights, sinalização e cenografia de alto padrão. Orçamento em até 24h.",
  phoneDisplay: "(11) 91355-3258",
  phoneIntl: "+55-11-91355-3258",
  email: "contato@diamondcvisual.com.br",
  instagram: { handle: "@diamond.cvisual", url: "https://instagram.com/diamond.cvisual" },
  address: {
    street: "Av. dos Parques, 45 – Centro de Apoio I",
    short: "Av. dos Parques, 45 · Alphaville, Santana de Parnaíba – SP",
    line1: "Av. dos Parques, 45 · Alphaville",
    line2: "Santana de Parnaíba – SP, 06544-300",
    locality: "Santana de Parnaíba",
    region: "SP",
    postalCode: "06544-300",
    country: "BR",
  },
  cnpjNote: "CNPJ da Diamond.",
} as const;

export const NAV = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#segmentos", label: "Segmentos" },
  { href: "#projetos", label: "Projetos" },
  { href: "#processo", label: "Processo" },
  { href: "#faq", label: "FAQ" },
] as const;

export const CLIENTS = [
  "Itaú",
  "Jovem Pan",
  "Neo Química",
  "TransPerfect",
  "Reserva",
  "Brasil Paralelo",
  "Asahi",
  "Ecorodovias",
  "Bio Ritmo",
  "Vivara",
  "Perdigão",
  "Dela Decor",
  "Lagoinha",
];

export const HEADER = {
  cta: "Orçamento em 24h",
  logoLabel: "Diamond Comunicação Visual, início",
  logoSub: "comunicação visual",
  openMenu: "Abrir menu",
  closeMenu: "Fechar menu",
  skip: "Pular para o conteúdo",
};

export const HERO = {
  eyebrow: "Comunicação visual de alto padrão · Alphaville e Grande SP",
  /** Each inner array is one headline line; accent words ignite in gold. */
  headline: [
    ["Presença", "que", "se", "vê"],
    [{ accent: "de" }, { accent: "longe." }],
  ] as (string | { accent: string })[][],
  lead: "Fachadas, letreiros, backlights, sinalização e cenografia de alto padrão. Do projeto à instalação, com orçamento em até 24h.",
  primaryCta: "Pedir orçamento em 24h",
  secondaryCta: "Ver projetos",
  trust: "Escolhida por marcas como Itaú, Jovem Pan, Neo Química e Reserva",
  cue: "Role para acender",
};

export const PROBLEM = {
  eyebrow: "O problema",
  title: ["Se ninguém vê, ", { accent: "ninguém lembra." }] as Rich,
  statements: [
    { at: 0.22, text: "Fachada sem presença é porta que ninguém abre." },
    { at: 0.48, text: "Acabamento amador comunica empresa amadora." },
    { at: 0.74, text: "Letreiro atrasado é inauguração adiada." },
  ],
  meter: "Iluminação",
  artLabel: "Fachada com letreiro que acende conforme a rolagem",
  sign: "SUA MARCA",
};

export const REVEAL = {
  cue: "Role para acender",
  eyebrow: "Com a Diamond",
  title: ["Agora todo", "mundo"],
  accent: "vê.",
  body: "Do escuro ao destaque: fachadas, letreiros e luminosos que tiram sua marca da sombra.",
};

export const STATS_NOTE = "* Números ilustrativos. Substituir pelos números reais da Diamond.";

export const SOLUTIONS = {
  eyebrow: "Soluções",
  title: ["Tudo o que sua marca precisa para ", { accent: "ocupar espaço." }] as Rich,
  idealFor: "Ideal para",
  cta: "Pedir orçamento",
  hint: "Arraste para o lado",
};

export const SEGMENTS_COPY = {
  eyebrow: "Para quem fazemos",
  title: ["Cada segmento, ", { accent: "um palco diferente." }] as Rich,
  counterLabel: "Segmento",
};

export const CASES = {
  eyebrow: "Cases em destaque",
  title: ["Projetos que viraram ", { accent: "referência." }] as Rich,
  challenge: "Desafio",
  solution: "Solução",
  illustrative: "conteúdo ilustrativo",
  deadline: "Prazo a confirmar",
  before: "Antes",
  after: "Depois",
  beforeAfterLabel: "Comparação entre a fachada apagada e a fachada iluminada",
  cta: "Quero um projeto assim",
};

export const SCALE = {
  lines: ["20 mil pessoas.", "Um só cenário."],
  lead: "Da recepção corporativa ao templo lotado, a escala muda. O padrão, não.",
};

export const PORTFOLIO_COPY = {
  eyebrow: "Portfólio",
  title: ["Um portfólio que fala ", { accent: "por si." }] as Rich,
  all: "Todos",
  filtersLabel: "Filtrar projetos",
  note: "Ilustrações temporárias: substituir pelas fotos reais.",
  open: "Ampliar projeto",
  dialogLabel: "Projeto ampliado",
  close: "Fechar",
  prev: "Projeto anterior",
  next: "Próximo projeto",
};

export const PROCESS = {
  eyebrow: "Processo",
  title: ["Do briefing à inauguração, ", { accent: "sem surpresas." }] as Rich,
  steps: [
    {
      title: "Briefing e medição",
      body: "Entendemos objetivo, espaço, medidas e prazo.",
      confirmed: false,
      confirmNote: "Confirmar se há visita técnica.",
    },
    {
      title: "Criação ou adaptação da arte",
      body: "Criamos a peça do zero ou adaptamos sua identidade ao formato ideal.",
      confirmed: true,
    },
    {
      title: "Aprovação",
      body: "Você aprova tudo antes de qualquer produção começar.",
      confirmed: true,
    },
    {
      title: "Produção",
      body: "Fabricação com controle de acabamento em cada detalhe.",
      confirmed: true,
    },
    {
      title: "Instalação agendada",
      body: "Instalação no dia combinado com você.",
      confirmed: false,
      confirmNote: "Confirmar equipe própria de instalação.",
    },
  ] as ProcessStep[],
  card: {
    quoteLabel: "Orçamento em até",
    quoteValue: "24h",
    leadLabel: "Prazo médio de produção",
    leadValue: "8–15",
    leadUnit: "dias úteis",
    tip: "Tem data de inauguração ou evento? Conte no primeiro contato e montamos o cronograma de trás para frente.",
    cta: "Alinhar meu prazo",
  },
};

export const WHY = {
  eyebrow: "Por que a Diamond",
  title: ["O que faz diferença ", { accent: "na hora H." }] as Rich,
  items: [
    {
      icon: "clock",
      kicker: "24h",
      title: "Orçamento em até 24h",
      body: "Você não espera dias para saber quanto custa.",
      size: "big",
    },
    {
      icon: "calendar",
      title: "Prazo transparente",
      body: "Média de 8 a 15 dias úteis, combinada antes de começar.",
    },
    {
      icon: "diamond",
      title: "Acabamento de alto padrão",
      body: "Detalhe tratado como parte do projeto, não como acaso.",
    },
    {
      icon: "scale",
      title: "Experiência em grande escala",
      body: "De recepções corporativas a eventos para 20 mil pessoas.",
    },
    {
      icon: "chat",
      title: "Atendimento direto",
      body: "Você conversa com quem entende do seu projeto.",
    },
    {
      icon: "route",
      title: "Do projeto à instalação, um só parceiro",
      body: "Arte, produção e instalação sob a mesma responsabilidade. Você fala com uma empresa só.",
      size: "full",
    },
  ] as Differentiator[],
};

export const TESTIMONIALS_COPY = {
  eyebrow: "Depoimentos",
  title: ["Quem já está ", { accent: "em destaque." }] as Rich,
  slot: "Espaço reservado para um depoimento real",
};

export const MANIFESTO = {
  eyebrow: "Manifesto",
  text: "Presença se constrói nos detalhes. Em cada acabamento, cada ponto de luz, cada milímetro de alinhamento. Com ousadia para criar e disciplina para entregar, transformamos marcas em lugares que ninguém esquece.",
  /** Words (exact tokens) that ignite in gold Instrument Serif. */
  accents: ["detalhes.", "luz,", "ousadia", "disciplina", "esquece."],
};

export const FAQ_COPY = {
  eyebrow: "Perguntas frequentes",
  title: ["Antes de pedir seu ", { accent: "orçamento." }] as Rich,
  lead: "Não encontrou sua dúvida? Fale direto com a equipe.",
  cta: "Tirar dúvida no WhatsApp",
};

export const CONTACT = {
  eyebrow: "Contato",
  title: ["Pronto para colocar sua marca ", { accent: "em destaque?" }] as Rich,
  lead: "Conte o que você precisa e receba seu orçamento em até 24h. Se preferir, fale direto pelo WhatsApp.",
  direct: "Falar agora no WhatsApp",
};

export const FORM = {
  steps: ["O que você precisa?", "Sobre o projeto", "Seus dados"],
  servicesLabel: "Serviços",
  city: { label: "Cidade", placeholder: "Santana de Parnaíba" },
  date: { label: "Data desejada ou inauguração" },
  art: {
    label: "Você já tem a arte?",
    placeholder: "Selecione",
    options: ["Tenho a arte pronta", "Preciso adaptar", "Preciso criar"],
  },
  name: { label: "Nome", placeholder: "Mariana Souza" },
  whatsapp: { label: "WhatsApp", placeholder: "(11) 91234-5678" },
  consentBefore: "Aceito a ",
  consentLink: "política de privacidade",
  back: "Voltar",
  next: "Continuar",
  submit: "Enviar pedido",
  sending: "Enviando…",
  previewLabel: "Mensagem que chega para a equipe",
  stepOf: (n: number, total: number) => `Etapa ${n} de ${total}`,
  baseMessage: "Olá! Vim pelo site da Diamond e quero um orçamento.",
  success: {
    title: "Pedido recebido",
    body: "Retornamos em até 24h. Se preferir, continue pelo WhatsApp com esta mensagem:",
    whatsapp: "Continuar no WhatsApp",
    reset: "Recomeçar",
  },
  errors: {
    services: "Escolha pelo menos um serviço.",
    city: "Informe a cidade do projeto.",
    art: "Diga se você já tem a arte.",
    name: "Informe seu nome.",
    whatsapp: "Informe um WhatsApp com DDD.",
    consent: "Aceite a política de privacidade para enviar.",
    server: "Não foi possível enviar agora. Tente de novo ou fale pelo WhatsApp.",
    rate: "Recebemos vários envios seguidos. Aguarde alguns minutos ou fale pelo WhatsApp.",
  },
  errorWhatsapp: "Enviar esta mensagem pelo WhatsApp",
};

export const FOOTER = {
  blurb: "Comunicação visual de alto padrão para marcas que não aceitam passar despercebidas.",
  navTitle: "Navegação",
  contactTitle: "Contato",
  privacy: "Política de privacidade",
  wordmark: "DIAMOND",
};

export const DOCK = {
  fab: "Orçamento em 24h",
  fabLabel: "Pedir orçamento pelo WhatsApp",
  barWhatsapp: "WhatsApp",
  barQuote: "Orçamento",
};
