/**
 * Lists every piece of content still waiting for the client's confirmation (`confirmed: false`).
 * Run: npm run check:content
 */
import { SERVICES } from "../src/content/services";
import { FEATURED_CASE, MORE_CASES } from "../src/content/cases";
import { PORTFOLIO } from "../src/content/portfolio";
import { STATS } from "../src/content/stats";
import { FAQ } from "../src/content/faq";
import { TESTIMONIAL_SLOTS } from "../src/content/testimonials";
import { PROCESS } from "../src/content/site";
import type { Confirmable } from "../src/types/content";

type Row = { file: string; item: string; note: string };

const rows: Row[] = [];
const collect = <T extends Confirmable>(file: string, items: T[], label: (t: T) => string) =>
  items
    .filter((i) => !i.confirmed)
    .forEach((i) => rows.push({ file, item: label(i), note: i.confirmNote ?? "" }));

collect("services.ts", SERVICES, (s) => s.title);
collect("cases.ts", [FEATURED_CASE, ...MORE_CASES], (c) => c.client);
collect("portfolio.ts", PORTFOLIO, (p) => `${p.client} (${p.category})`);
collect("stats.ts", STATS, (s) => `${s.prefix ?? ""}${s.value}${s.suffix ?? ""} ${s.label}`);
collect("faq.ts", FAQ, (f) => f.question);
collect("testimonials.ts", TESTIMONIAL_SLOTS, (t) => `Depoimento: ${t.segment}`);
collect("site.ts › PROCESS", PROCESS.steps, (s) => s.title);

const GLOBAL = [
  "Cor dourada exata do logo (globals.css › --color-gold)",
  "Logo vetorial e logos dos clientes em SVG (marquee)",
  "CNPJ (rodapé)",
  "Ano de fundação e números reais",
  "Vídeo noturno do hero, fotos de equipe e produção",
  "Nota no Google",
  "Texto da política de privacidade",
  "Provedor de e-mail do formulário (Resend?)",
  "Deploy na Vercel",
];

const pad = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s.padEnd(n));
console.log(`\n[confirmar] ${rows.length} itens de conteúdo + ${GLOBAL.length} itens gerais\n`);
console.log(`${pad("Arquivo", 22)} ${pad("Item", 44)} Nota`);
console.log("-".repeat(110));
rows.forEach((r) => console.log(`${pad(r.file, 22)} ${pad(r.item, 44)} ${r.note}`));
console.log("\nGerais:");
GLOBAL.forEach((g) => console.log(`  • ${g}`));
console.log("");
