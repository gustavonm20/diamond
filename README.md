# Diamond Comunicação Visual · Landing page

Landing page da **Diamond Comunicação Visual** (fachadas, letra caixa, backlight, totens, sinalização e cenografia de alto padrão em Alphaville e Grande SP).

Conceito: **"Do escuro ao destaque"**. A página começa no escuro e vai "acendendo" com a rolagem: o título acende como letra caixa, a fachada liga, um diamante de luz vira a página para o claro ("Agora todo mundo vê."), o primeiro case se expande em tela cheia e o CTA final é o momento mais quente e luminoso.

> Brief completo: [`ambient.md`](./ambient.md) · Referência original em HTML: [`reference/diamond-lp-reference.html`](./reference/diamond-lp-reference.html) (o JS do arquivo de referência veio cortado; os trechos que faltavam foram reconstruídos aqui).

## Stack

- Next.js 16 (App Router, Cache Components) + React 19 + TypeScript strict
- Tailwind CSS v4 (tokens em `@theme` no `globals.css`)
- GSAP 3 (ScrollTrigger, Flip, CustomEase) + `@gsap/react` (`useGSAP`)
- Lenis (smooth scroll) dirigido pelo `gsap.ticker`
- WebGL puro (sem biblioteca 3D) para o diamante do hero
- react-hook-form + zod + Server Action, Resend para e-mail
- `@tabler/icons-react`, `@next/third-parties` (GTM)

## Começando

```bash
npm i
cp .env.example .env.local   # opcional em desenvolvimento
npm run dev                  # http://localhost:3000
```

| Script                        | O que faz                                                  |
| ----------------------------- | ---------------------------------------------------------- |
| `npm run dev`                 | Servidor de desenvolvimento (selos `[confirmar]` visíveis) |
| `npm run build` / `npm start` | Build de produção e servidor                               |
| `npm run lint`                | ESLint                                                     |
| `npm run typecheck`           | TypeScript sem emitir arquivos                             |
| `npm run format`              | Prettier (com ordenação de classes Tailwind)               |
| `npm run check:content`       | Lista tudo que ainda precisa de confirmação do cliente     |

### Variáveis de ambiente (`.env.example`)

| Variável                      | Uso                                                         |
| ----------------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | URL pública (canonical, sitemap, Open Graph)                |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número do WhatsApp, só dígitos (ex.: `5511913553258`)       |
| `NEXT_PUBLIC_GTM_ID`          | Container único do GTM (vazio = desativado)                 |
| `RESEND_API_KEY`              | Chave do Resend para enviar o formulário por e-mail         |
| `LEAD_TO_EMAIL`               | Destino dos pedidos (padrão: contato@diamondcvisual.com.br) |
| `LEAD_FROM_EMAIL`             | Remetente verificado no Resend                              |
| `NEXT_PUBLIC_SHOW_CONFIRM`    | `1` força os selos `[confirmar]` em produção                |

Sem `RESEND_API_KEY`, em desenvolvimento o pedido é apenas registrado no terminal; em produção o formulário mostra erro e sugere o WhatsApp.

## Movimento e acessibilidade

O site tem três modos de movimento, definidos antes da primeira pintura (`<html data-motion>`):

| Modo     | Quando                                                                                | O que muda                                                                                                                                        |
| -------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `full`   | Padrão                                                                                | Todos os efeitos, smooth scroll (Lenis), preloader                                                                                                |
| `soft`   | O sistema pede "reduzir movimento" (ex.: Windows com _Efeitos de animação_ desligado) | Efeitos e 3D continuam, mais calmos: rolagem nativa (sem inércia), sem piscadas na ignição, loops mais lentos, diamante a 30 fps, sem preloader   |
| `static` | O visitante clica em **"Reduzir animações"** no rodapé, ou usa `?motion=static`       | Nada anima: tudo no estado final e as cenas fixas viram fluxo normal. A escolha fica salva; `?motion=auto` ou o botão "Ativar animações" desfazem |

Interações:

- **Diamante do hero:** gira, flutua e recebe uma faixa de luz a cada ~5 s. Acelera com o scroll, brilha ao passar o mouse e pode ser **arrastado para girar**, com inércia. No toque, o arraste horizontal gira e o vertical continua rolando a página.
- **Carrossel de Soluções:** coverflow 3D (profundidade real e inclinação conforme a velocidade). No desktop o trilho anda com a rolagem e também com **clique e arraste do mouse**, encaixando no card mais próximo. Em telas menores é um carrossel nativo com arraste do mouse, inércia e encaixe.
- **Header:** sempre fixo. Ao rolar, fica sólido e compacta (76 → 60 px).

Outros cuidados: foco dourado visível, skip link, accordion/menus/lightbox/formulário navegáveis por teclado, chips com `aria-pressed`, textos alternativos e `sr-only` nos números animados.

## Estrutura

```
src/
  app/            layout, página, Server Action (actions/lead.ts), política, sitemap, robots, OG image
  components/
    sections/     uma seção por arquivo (Server Components)
    motion/       efeitos client-side (HeroMotion, DiamondGL, HorizontalTrack, StickyWipe, …)
    ui/           Button, Chip, Scene, Lightbox, Accordion, ConfirmBadge, …
    forms/        LeadForm em 3 etapas
  content/        TODA a copy e os dados (services, segments, cases, portfolio, stats, faq, …)
  lib/            gsap, motion (fórmulas de progresso), scroll, whatsapp, analytics, schema, seo, utm
  hooks/          useMotionMode, useIsDesktop, useDockVisibility
  styles/         base.css, ui.css, sections.css
```

## Como editar o conteúdo

Toda a copy fica em `src/content/*.ts`. Componentes não têm texto fixo.

- **Serviços** (`services.ts`), **segmentos** (`segments.ts`), **cases** (`cases.ts`), **portfólio** (`portfolio.ts`), **números** (`stats.ts`), **FAQ** (`faq.ts`), **depoimentos** (`testimonials.ts`), textos das seções (`site.ts`), mensagens de WhatsApp por origem (`whatsapp.ts`).
- Item ainda não confirmado: `confirmed: false` + `confirmNote`. Ele mostra um selo `[confirmar]` em dev/preview e aparece em `npm run check:content`.

### Trocar as ilustrações por fotos reais

As cenas desenhadas (`<Scene />`) são placeholders. Coloque as fotos em `public/projetos/` e troque o componente por `next/image`:

```tsx
import Image from "next/image";

<Image
  src="/projetos/reserva-beach-club.jpg"
  alt="Fachada do Reserva Beach Club com letra caixa iluminada à noite"
  fill
  sizes="(min-width: 1024px) 33vw, 100vw"
/>;
```

Use `priority` apenas na imagem do LCP. Para o Open Graph, substitua `src/app/opengraph-image.tsx` por `src/app/opengraph-image.jpg` (1200×630).

## Eventos (dataLayer / GTM)

| Evento               | Parâmetros            | Quando                                                                                                                                                |
| -------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `whatsapp_click`     | `origin`              | Qualquer link de WhatsApp (header, hero, cada serviço, cada segmento, case, processo, FAQ, contato, FAB, barra mobile, rodapé, sucesso do formulário) |
| `cta_click`          | `cta_id`, `section`   | CTAs que não são WhatsApp (ex.: "Ver projetos", "Orçamento" da barra mobile)                                                                          |
| `form_start`         | —                     | Primeira interação com o formulário                                                                                                                   |
| `form_step_complete` | `step`                | Cada etapa concluída (1, 2, 3)                                                                                                                        |
| `form_submit`        | `services`, `segment` | Envio com sucesso (`segment` = último segmento clicado)                                                                                               |
| `portfolio_filter`   | `category`            | Filtro do portfólio                                                                                                                                   |
| `portfolio_open`     | `client`              | Abertura do lightbox                                                                                                                                  |

UTMs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) ficam na sessão e vão junto com o formulário.

## O que confirmar com o cliente `[confirmar]`

Rode `npm run check:content` para a lista atualizada. Resumo:

- Números reais e ano de fundação (só "20 mil pessoas em um único evento" e "24h" estão confirmados).
- Lista de serviços (fachadas em ACM, totens, sinalização interna) e materiais.
- Visita técnica? Equipe própria de instalação? Trabalho em altura (NR-35)? Garantia?
- Área de atendimento, CNPJ, dourado exato do logo e logo vetorial, logos dos clientes em SVG.
- 3–4 cases reais (desafio, solução, prazo, m², fotos) e par de fotos antes/depois.
- Vídeo noturno para o hero, fotos de equipe/produção, depoimentos e nota no Google.
- Texto da política de privacidade e provedor de e-mail do formulário.

## Performance

- O diamante 3D é WebGL puro (~80 triângulos, 1 buffer, 2 passes), pausado fora da tela e com a aba oculta. A qualidade se adapta: se os frames ficam lentos, ele reduz a resolução e depois o fps. Sem WebGL, cai para o desenho em linha.
- Efeitos escrevem estilos direto nos elementos (sem estado React por frame). O preenchimento dourado da frase de escala e a troca de imagens dos segmentos usam só `transform`, sem repintura do conteúdo.
- `will-change` só nos elementos que se movem a cada frame. O header e a barra mobile usam fundo sólido em vez de blur, e a textura de grão fica desligada no celular.
- Para medir desempenho use o build de produção (`npm run build && npm start`): o `npm run dev` é bem mais pesado.
- Cenas fixas usam `position: sticky` + progresso do ScrollTrigger (sem pin-spacers).
- Página pré-renderizada estática.

## Deploy

Pensado para a Vercel [confirmar]: importe o repositório, configure as variáveis de ambiente e publique.

## Skills do Claude Code

O projeto inclui as skills `frontend-design`, `find-skills` e `copywriting` em `.claude/skills/` (registradas em `skills-lock.json`).
