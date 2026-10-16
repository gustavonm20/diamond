import type { PortfolioItem } from "@/types/content";

const NOTE = "Categoria ilustrativa: confirmar com a Diamond e trocar pela foto real.";

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "reserva",
    client: "Reserva Beach Club",
    category: "fachada",
    scene: { kind: "fachada", label: "RESERVA" },
    confirmed: false,
    confirmNote: NOTE,
  },
  {
    id: "itau",
    client: "Itaú",
    category: "letra",
    scene: { kind: "letra", label: "Itaú" },
    confirmed: false,
    confirmNote: NOTE,
  },
  {
    id: "lagoinha",
    client: "Lagoinha Alphaville",
    category: "backdrop",
    scene: { kind: "backdrop", label: "LAGOINHA" },
    confirmed: false,
    confirmNote: NOTE,
  },
  {
    id: "vivara",
    client: "Vivara",
    category: "backlight",
    scene: { kind: "backlight", label: "VIVARA" },
    confirmed: false,
    confirmNote: NOTE,
  },
  {
    id: "jovem-pan",
    client: "Jovem Pan",
    category: "backdrop",
    scene: { kind: "backdrop", label: "JOVEM PAN" },
    confirmed: false,
    confirmNote: NOTE,
  },
  {
    id: "neo-quimica",
    client: "Neo Química",
    category: "sinalizacao",
    scene: { kind: "sinalizacao", label: "NEO QUÍMICA" },
    confirmed: false,
    confirmNote: NOTE,
  },
  {
    id: "bio-ritmo",
    client: "Bio Ritmo",
    category: "adesivo",
    scene: { kind: "adesivo", label: "BIO RITMO" },
    confirmed: false,
    confirmNote: NOTE,
  },
  {
    id: "asahi",
    client: "Asahi",
    category: "totem",
    scene: { kind: "totem", label: "ASAHI" },
    confirmed: false,
    confirmNote: NOTE,
  },
  {
    id: "ecorodovias",
    client: "Ecorodovias",
    category: "outdoor",
    scene: { kind: "outdoor", label: "ECORODOVIAS" },
    confirmed: false,
    confirmNote: NOTE,
  },
  {
    id: "transperfect",
    client: "TransPerfect",
    category: "letra",
    scene: { kind: "letra", label: "TransPerfect" },
    confirmed: false,
    confirmNote: NOTE,
  },
  {
    id: "dela-decor",
    client: "Dela Decor",
    category: "fachada",
    scene: { kind: "fachada", label: "DELA DECOR" },
    confirmed: false,
    confirmNote: NOTE,
  },
  {
    id: "lagoinha-kids",
    client: "Lagoinha Kids",
    category: "adesivo",
    scene: { kind: "adesivo", label: "KIDS" },
    confirmed: false,
    confirmNote: NOTE,
  },
];

/** Columns for the parallax wall at the top of the portfolio. */
export const WALL_COLUMNS: PortfolioItem[][] = [
  [PORTFOLIO[0], PORTFOLIO[5], PORTFOLIO[8], PORTFOLIO[1]],
  [PORTFOLIO[2], PORTFOLIO[9], PORTFOLIO[3], PORTFOLIO[6]],
  [PORTFOLIO[4], PORTFOLIO[7], PORTFOLIO[10], PORTFOLIO[0]],
  [PORTFOLIO[11], PORTFOLIO[3], PORTFOLIO[1], PORTFOLIO[5]],
];
