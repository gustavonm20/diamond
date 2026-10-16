# PROJECT BRIEF — Diamond Comunicação Visual · New landing page (Next.js + TypeScript + Tailwind)

## 0. How to use this brief
- You have two inputs:
  1. this brief;
  2. reference/diamond-lp-reference.html — a single-file vanilla HTML/CSS/JS reference implementation of the page.
- The reference file is the SOURCE OF TRUTH for: section order, all pt-BR copy (use it verbatim), layout, spacing, colors, typography, and every scroll/motion behavior, including the exact progress formulas in its JS.
- Your job: rebuild it as a production Next.js + TypeScript + Tailwind CSS v4 app with visual and behavioral parity, following the architecture in §8. Where the reference uses vanilla code (scroll engine, sticky math, FLIP filter, lightbox, form), port it to the specified stack with the same timings, easings, ranges and breakpoints.
- Before writing code:
  1. Open the reference in a browser at 1440×900 and at 390×844.
  2. Scroll through the whole page.
  3. Write down every effect you observe and map each one to the spec in §9. If the reference and this brief ever disagree, follow the reference and tell me.
- Placeholders must stay placeholders. Never invent data.
  - The procedural SVG scene() illustrations stand in for real project photos.
  - Numbers marked with * are illustrative.
  - Testimonials are empty slots.
  - Anything tagged [confirmar] needs client confirmation.

## 1. Your role
Senior creative developer and conversion-focused web designer. Awwwards-level craft, obsessed with performance, accessibility and lead generation. All user-facing copy is Brazilian Portuguese (pt-BR). Code, comments and identifiers are in English.

## 2. Company context
- Diamond Comunicação Visual: premium signage / visual communication company.
  - Address: Av. dos Parques, 45 – Centro de Apoio I, Alphaville, Santana de Parnaíba – SP, 06544-300.
  - Serves Greater São Paulo [confirmar area].
- Designs, produces and installs:
  - storefront facades (ACM) [confirmar]
  - 3D channel letters ("letra caixa")
  - backlit panels ("backlight")
  - totems [confirmar]
  - interior signage [confirmar]
  - large-format adhesives
  - event backdrops / scenography
  - billboards ("outdoor")
- Clients: Itaú, Jovem Pan, Neo Química, TransPerfect, Reserva / Reserva Beach Club, Brasil Paralelo, Asahi, Ecorodovias, Bio Ritmo, Vivara, Perdigão, Dela Decor, Lagoinha (Alphaville, Kids). Has delivered events with up to 20,000 people.
- Differentiators:
  - quote within 24h
  - average production of 8–15 business days
  - end-to-end process: briefing → art creation/adaptation → client approval → production → scheduled installation
  - experience at monumental scale
- Contacts: WhatsApp +55 11 91355-3258 · contato@diamondcvisual.com.br · Instagram @diamond.cvisual.
- Problems with the current WordPress site that this page fixes:
  - premium positioning without proof
  - hidden differentiators (24h quote only in the meta description)
  - untitled, context-free portfolio
  - identical generic WhatsApp CTAs
  - non-qualifying form
  - weak local SEO

## 3. Goals & KPIs
- Primary: qualified leads via WhatsApp and the 3-step form.
- Secondary: position Diamond as THE high-end signage partner in Alphaville / Greater SP (justifies premium pricing), and rank locally.
- Make measurable:
  - CTA clicks by section and service
  - WhatsApp clicks by origin
  - form funnel (start → step → submit)
  - portfolio engagement (filters, lightbox)

## 4. Audience
1. Corporate manager (30–45; marketing, facilities or expansion at mid-to-large companies). Needs reliability, deadlines and invoices (NF). Fears delays and poor finish in front of leadership.
2. Premium business owner (30–55; restaurants, beach clubs, jewelry, boutique gyms, clinics). Wants a facade that matches the investment. Decides fast; arrives from Instagram or referrals.
3. Church and event production lead (large churches, producers, media companies). Needs scale, tight deadlines and a flawless result on camera.
4. Secondary: architects and interior designers who specify suppliers.

Mobile-first: most visitors arrive on phones and convert through WhatsApp.

## 5. Positioning & tone (pt-BR)
- Premium but sober: confident, precise, concrete. Never flashy or "bling" — the same page serves banks and churches as well as luxury retail.
- Every emotional claim is followed by proof: a client, a number, a deadline or a photo.
- Short sentences; address the reader as "você"; no empty superlatives.
- Brand archetype: Ruler + Creator.

## 6. Creative concept — "Do escuro ao destaque" (from darkness to spotlight)
The page tells a story of light. It opens in near-darkness (the invisible brand) and progressively "turns on" as the user scrolls:
- the headline ignites like channel letters;
- a facade lights up;
- a diamond of light opens from the center and flips the page to light ("Agora todo mundo vê.") as a direct answer to the Problem headline ("Se ninguém vê, ninguém lembra.");
- the first case image expands to full-bleed and brings the page back to dark;
- the final CTA is the warmest, most luminous moment.

Every effect expresses LIGHT, SCALE or PRECISION. If an effect doesn't, cut it.

## 7. Design tokens (match the reference exactly)
- Colors:
  - ink #0A0A0B
  - graphite #141417, graphite-2 #1C1C21
  - line #2A2A30, line-2 #1D1D21
  - gold #C8A45D, gold-hi #E9CD8A, gold-lo #8E6B2E, gold-dk #6B5020 (small gold text on cream, AA)
  - cream #F4EFE6, cream-2 #E2DACB
  - muted #A39E94, muted-on-light #5A5449
  - error #F0997B
  - Replace gold with the exact value sampled from the client's logo [confirmar].
- Fonts (next/font/google):
  - Archivo — variable, wdth axis; display text uses font-stretch 125% and weight 600.
  - Instrument Serif — italic accent words in gold.
  - Manrope — body and UI, 400/500/600.
- Type scale:
  - h1: clamp(2.5rem, 5.8vw, 6rem), line-height 0.98
  - h2: clamp(2rem, 4.6vw, 4.25rem), line-height 1.02
  - eyebrow: 12px uppercase, tracking 0.18em, preceded by a 28px hairline
- Layout and motion:
  - max-width 1440px; side padding clamp(20px, 5vw, 72px); section padding clamp(96px, 14vh, 180px); header height 76px
  - ease cubic-bezier(0.16, 1, 0.3, 1)
  - radii: 4px buttons, 10–12px cards, 999px chips
- Texture: global film grain (SVG fractal noise, ~3.5% opacity, fixed, pointer-events none).
- Icons: Tabler Icons (outline) via @tabler/icons-react, same names as the reference.
- Buttons:
  - gold: gradient background, light sweep on hover, magnetic on fine pointers
  - line: 1px gold at 45%
  - ink: used on light sections

## 8. Tech stack & architecture
### 8.1 Stack (non-negotiable)
- Next.js (latest stable), App Router, React 19, TypeScript strict.
- Tailwind CSS v4 (CSS-first @theme in globals.css).
- gsap + @gsap/react (useGSAP) with ScrollTrigger and Flip; lenis (lenis/react) smooth scroll.
- react-hook-form + zod + @hookform/resolvers (Server Action); clsx + tailwind-merge; @next/third-parties (GTM); Resend for email [confirmar provider].
- ESLint + Prettier (prettier-plugin-tailwindcss). Deploy on Vercel [confirmar].
- No Framer Motion, jQuery, UI kits or CSS-in-JS.

Bootstrap:
npx create-next-app@latest diamond-lp --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm i gsap @gsap/react lenis clsx tailwind-merge react-hook-form zod @hookform/resolvers @next/third-parties resend @tabler/icons-react

### 8.2 Structure
src/
  app/
    layout.tsx — lang pt-BR, fonts, metadata, JSON-LD, GTM, <SmoothScroll>, grain
    page.tsx
    globals.css
    actions/lead.ts
    politica-de-privacidade/page.tsx
    sitemap.ts · robots.ts · opengraph-image (or public/og.jpg 1200×630)
  components/
    sections/ Preloader, Header, MobileMenu, Hero, ClientMarquee, Problem, DiamondReveal, Stats, Solutions, Segments, CasesIntro, CaseExpand, CaseDetail, ScaleStatement, Portfolio, Process, WhyDiamond, Testimonials, Manifesto, Faq, ContactCta, Footer
    motion/ SmoothScroll, LightUpHeadline, Skyline, VelocityMarquee, LightsOnScene, OdometerNumber, HorizontalTrack, StickyWipe, ExpandImage, BeforeAfter, LightFillText, ParallaxColumns, DrawLine, WordScrub, DiamondDraw, FooterWordmark, ScrollProgress, ThemeWatcher, Magnetic, Spotlight
    ui/ Button, Chip, Eyebrow, SectionHeading, Container, Accordion, Lightbox, WhatsAppFab, MobileCtaBar, ConfirmBadge, Scene (temporary placeholder illustration, ported from the reference scene())
    forms/ LeadForm, StepServices, StepProject, StepContact
  content/ site.ts, services.ts, segments.ts, cases.ts, portfolio.ts, stats.ts, faq.ts, testimonials.ts, whatsapp.ts
  lib/ env.ts, gsap.ts, motion.ts, whatsapp.ts, analytics.ts, schema.ts, seo.ts, utm.ts, cn.ts
  hooks/ useReducedMotion.ts, useIsDesktop.ts
  types/ content.ts, analytics.ts

### 8.3 Rules
- Sections are Server Components. Only animated or interactive leaves use "use client".
- lib/gsap.ts registers plugins once (useGSAP, ScrollTrigger, Flip). Every animation uses useGSAP({ scope }) for automatic cleanup.
- gsap.matchMedia() buckets:
  - "(min-width:1024px) and (prefers-reduced-motion:no-preference)" → full effects;
  - "(max-width:1023px) and (prefers-reduced-motion:no-preference)" → mobile variants per §14;
  - "(prefers-reduced-motion:reduce)" → final states, no Lenis, no sticky heights.
- Lenis: <ReactLenis root options={{ lerp: 0.1, autoRaf: false }}>, driven by gsap.ticker; lagSmoothing(0); ScrollTrigger.update on Lenis scroll.
- ScrollTrigger.refresh() after document.fonts.ready and after images load.
- Pinning strategy: CSS position: sticky + ScrollTrigger progress (onUpdate), exactly like the reference. Do NOT use ScrollTrigger pin (no pin-spacers).
- Exception: the horizontal track may use the reference approach — section height = 100vh + (trackWidth − viewportWidth) — with a sticky stage.
- All copy lives in content/*.ts; components never hardcode copy.
- Write per-frame styles directly to elements (refs). Never use React state per frame.
- Animate only transform, opacity, clip-path, stroke-dashoffset and background-position.
- Zero hydration warnings.

## 9. Motion system & scroll choreography
### 9.1 Progress helpers (from the reference; vh = viewport height, rect = element rect)
- pin(rect) = clamp(−rect.top / (rect.height − vh)) → ScrollTrigger start "top top", end "bottom bottom"
- edge(rect, s, e) = clamp((vh·s − rect.top) / (vh·(s − e))) → start top ${s*100}%, end top ${e*100}%
- through(rect) = clamp((vh − rect.top) / (vh + rect.height)) → start "top bottom", end "bottom top"
- Eases: easeOutCubic, easeInOutCubic.
- Scroll velocity: lerp(vel, Δy, 0.25) per frame.

### 9.2 Global
- Preloader:
  - first visit only (sessionStorage key "dm-pre");
  - diamond outline strokes in over 1s, fades at ~1.15s;
  - then the hero ignites.
- Header:
  - transparent at top;
  - after 20px: blurred ink background + gold hairline;
  - hides on scroll down (after 0.6vh), shows on scroll up;
  - switches to light theme when a data-theme="light" section is under y=40px;
  - special themes: "reveal" = light when DiamondReveal p ≥ 0.6; "cx" = light while CaseExpand p < 0.5.
- ScrollProgress: 1px gold line under the header, scaleX = page progress.
- Floating WhatsApp FAB (desktop) and bottom CTA bar (<768px): visible after 0.8vh of scroll, hidden once the contact section top passes 60% of the viewport.
- Reveal: .rv elements fade and rise (opacity 0 → 1, y 24px → 0, 1s), with optional stagger data-d × 90ms.
- Magnetic buttons on fine pointers: translate by 22% / 30% of the cursor offset.
- Spotlight: radial gold glow following the cursor on the hero and on bento tiles.

### 9.3 Sections (id · theme · mechanism · mapping)
1. *Hero* (#top, dark).
   - LightUpHeadline: words start unlit (#26262B), ignite with a 160ms stagger, 2–3 flicker flashes (opacity keyframes over 0.6s), then a warm text-shadow glow.
   - Skyline SVG: seeded random buildings; ~30% of the windows light up randomly over 1.8s after the ignition.
   - Scroll-out (p = clamp(−top / (height·0.8))):
     - line 1 x 0 → −8%, line 2 x 0 → +8%
     - content opacity 1 − 1.2p
     - skyline scale 1 → 1.15
     - faceted diamond rotate 0 → 12° and scale 1 → 1.1
     - scroll cue fades out first
2. *Client marquee* (dark). VelocityMarquee:
   - base 0.6px/frame plus |velocity|·0.35;
   - direction follows scroll direction;
   - skewX clamped to ±8°, lerped at 0.1;
   - client names in Archivo (real SVG logos later [confirmar]).
3. *Problem* (#problema, dark). Sticky, height 260vh.
   - p = clamp((pin − 0.08) / 0.72).
   - The facade sign fill goes from #2B2B30 to cream.
   - Halo opacity rises to 0.45; light cone to 0.08; ground reflection to 0.2.
   - Windows go from #17171A to #3A3122.
   - Statements light at 0.22, 0.48 and 0.74.
   - A progress bar shows the percentage.
4. *DiamondReveal* (#virada, theme "reveal"). Sticky, height 190vh. p = pin.
   - Elements:
     - spark: 12px gold diamond, pulsing; opacity = 1 − clamp(p/0.05)
     - cue: opacity = 1 − clamp(p/0.08)
     - light layer (cream): R = Rmax · clamp(p/0.6), with Rmax = (vw + vh)/2
     - rim layer (gold): R·1.035 + 4
     - clip-path for both: polygon(50% calc(50% − R), calc(50% + R) 50%, 50% calc(50% + R), calc(50% − R) 50%)
   - Text: opacity clamp((p − 0.35)/0.25); scale 0.85 + 0.15·clamp((p − 0.35)/0.4).
   - Gold hairline: scaleX clamp((p − 0.7)/0.2).
   - Must flow seamlessly into the cream Stats section.
5. *Stats* (#numeros, light). OdometerNumber.
   - Each digit is a 0–9 vertical strip; translateY = −digit · 1.1em · easeOutCubic(clamp((p − i·0.06)/0.7)).
   - p = edge(0.92, 0.42).
   - Real values also live in sr-only text.
6. *Solutions* (#solucoes, light). HorizontalTrack on desktop.
   - Section height = vh + (trackWidth − vw); sticky stage; x = −maxX·pin.
   - Spotlight per card, with d = (cardCenter − vw/2)/cardWidth and lit = 1 − clamp(|d|/1.2):
     - dim overlay = 0.6·(1 − lit)
     - top gold line scaleX = lit
     - transform: perspective(1400px) rotateY(clamp(d, ±1.6)·−10°) scale(0.92 + 0.08·lit)
   - Gold progress bar.
   - Each card's CTA opens WhatsApp with a service-specific message.
7. *Segments* (#segmentos, light). StickyWipe.
   - Sticky media column (top = header + 6vh).
   - Each text block has min-height 70vh.
   - Image i ≥ 1 wipes in with clip-path inset((1 − r)·100% 0 0 0), where r = clamp((0.85vh − blockTop)/(0.4vh)).
   - The active block is the last one with top < 0.55vh: opacity 1; the others 0.3.
   - Counter "0X / 03".
8. *Cases intro* (light) followed by *CaseExpand* (#cxp, theme "cx"). Sticky, height 230vh, cream stage.
   - q = 1 − easeInOutCubic(clamp(pin/0.65)); clip-path inset(14q% 22q% round 24q px).
   - Giant outlined client name (Archivo, clamp(5rem, 18vw, 18rem), 1px cream stroke at 55%): x goes from 0.45vw to −(nameWidth − 0.55vw).
   - Caption opacity = clamp((p − 0.55)/0.2).
9. *CaseDetail* (dark).
   - Info column: tags, challenge / solution, chips; all content marked "conteúdo ilustrativo".
   - BeforeAfter: lit layer clip inset(0 (1 − p)·100% 0 0) plus a moving gold line; p = edge(0.85, 0.35).
   - Two more case cards with a slow hover zoom.
10. *ScaleStatement* (dark). LightFillText.
    - Outline text (1px gold-lo stroke).
    - Gold gradient background-clip:text, background-size 200%; background-position x = 100 − 100p%; p = edge(0.9, 0.3).
    - Horizontal drift: (1 − through)·6vw − 3vw.
11. *Portfolio* (#portfolio, dark).
    - ParallaxColumns wall: 72vh tall, masked top and bottom, 4 columns (2 on mobile). translateY = speed[i]·(through − 0.5)·2, with speeds [−140, 90, −180, 110] px.
    - Filter chips with a FLIP re-layout (GSAP Flip): 650ms on the ease token; newly shown items fade/scale from 0.92.
    - Grid: 3 / 2 / 1 columns. Hover zoom 1.06 plus a caption slide-up.
    - Lightbox: native <dialog> with prev/next, arrow keys, Esc, swipe and backdrop click.
12. *Process* (#processo, dark). DrawLine.
    - Rail fill height = clamp((0.6vh − top)/height).
    - Each step lights up (node glow + title to cream) when fill ≥ step.offsetTop/height (and fill > 0.01).
    - Steps have min-height 26vh.
    - Sticky info card on desktop.
13. *Why Diamond* (dark). Bento 3 columns: tile 1 spans 2, the last spans 3. Cursor spotlight; reveal stagger.
14. *Testimonials* (dark). 3 dashed placeholder cards. Do not invent testimonials.
15. *Manifesto* (dark). WordScrub.
    - lit word count = round(p·N), with p = clamp((0.85vh − top)/(height + 0.35vh)).
    - Words go from #2B2B30 to cream; accent words (Instrument Serif) ignite in gold with the flicker.
16. *FAQ* (#faq, light). Accessible accordion (grid-template-rows 0fr → 1fr, 0.5s); first item open.
17. *Contact* (#contato, dark → warm).
    - Giant diamond outline: stroke-dashoffset 1 → 0 with p = edge(0.95, 0.2); a radial warm glow fades in with p.
    - Left column: copy, direct WhatsApp button, contact list.
    - Right column: 3-step form (see §11).
18. *Footer* (dark).
    - 3 columns.
    - Giant "DIAMOND" wordmark: translateY 40% → 0 and color #141417 → #2E271A, with p = edge(1.05, 0.7) measured on the footer element.
    - Dynamic year.

## 10. Content
Use the reference's copy verbatim. Content files mirror the reference arrays:
- SERVICES (8): id, title, tagline, idealFor
- SEGMENTS (3)
- PORTFOLIO (12): client + category — categories are illustrative [confirmar]
- STATS (4) — only "20 mil pessoas em um único evento" is confirmed
- FAQ (6)
- CLIENTS (marquee)
- WHATSAPP templates

Every unconfirmed item has confirmed:false and renders a <ConfirmBadge> in development and preview builds. npm run check:content lists all of them.

## 11. Conversion & tracking
- WhatsApp: https://wa.me/5511913553258?text=… The message varies by origin: header, hero, each service card, each segment, FAB, mobile bar, final CTA, and the form summary.
- dataLayer events:
  - whatsapp_click {origin}
  - cta_click {cta_id, section}
  - form_start
  - form_step_complete {step}
  - form_submit {services, segment}
  - portfolio_filter {category}
  - portfolio_open {client}
- One GTM container (the current site loads two, one of them duplicated).
- UTM params persisted into hidden form fields.
- Form: 3 steps with per-step validation and inline pt-BR errors (same messages as the reference).
  - Step 1: services chips (≥1).
  - Step 2: city (required), date (optional), art status (required).
  - Step 3: name, WhatsApp with BR mask (≥10 digits), LGPD checkbox.
  - Honeypot field.
  - Server Action re-validates with zod, rate-limits per IP and sends via Resend to contato@.
  - Success state shows the summary message and a "Continuar no WhatsApp" link.

## 12. SEO
- Title: "Fachadas e Letreiros em Alphaville | Diamond Comunicação Visual". Use the meta description from the reference.
- metadataBase, canonical, OpenGraph pt_BR with a 1200×630 project photo, Twitter summary_large_image.
- JSON-LD: LocalBusiness + FAQPage (confirmed answers only).
- sitemap.ts, robots.ts, one h1, semantic landmarks, descriptive alt text.

## 13. Performance & accessibility
- Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 95, SEO 100, Best Practices ≥ 95. LCP < 2.5s, CLS < 0.1, INP < 200ms.
- next/image (AVIF/WebP, sizes, priority only on the LCP image). Hero video (when supplied) loads after idle on desktop only.
- WCAG AA contrast; visible gold focus rings; skip link.
- Keyboard support for menu, accordion, chips (aria-pressed), lightbox and form.
- Reduced motion: final states everywhere and sticky sections collapse to normal flow.

## 14. Responsive
- Breakpoints: 375 / 768 / 1024 / 1440 / 1920.
- Below 1024px:
  - burger + full-screen menu with staggered links;
  - Solutions becomes a native horizontal snap carousel (no sticky height, all cards lit);
  - Segments media stays sticky at 34vh height;
  - grids collapse to one column.
- Below 768px: FAB replaced by the bottom CTA bar (safe-area aware).
- No horizontal overflow at any width.

## 15. Confirm with the client (render as placeholders)
- Real stats and year founded; services list (facades, totems, signage) and materials.
- Technical visit? Own installation team? Work at height (NR-35)? Warranty?
- Service area; CNPJ; exact logo gold and vector logo; client logos in SVG.
- 3–4 real cases (challenge, solution, deadline, m², photos); before/after photo pair.
- Hero night video; team/production photos; testimonials; Google rating.
- Privacy policy text; form email provider.

## 16. Don'ts
- No bling clipart, sparkle GIFs, lens flares or neon/cyberpunk palettes.
- No stock photos; no invented numbers, cases or testimonials.
- No autoplay audio; no extra pinned sections beyond the reference; no animation delaying content by more than 1.5s.
- Gold covers ≤ 10% of any screen.

## 17. Deliverables & acceptance criteria
- npm i && npm run dev runs.
- npm run build passes with zero TypeScript, ESLint or hydration errors and no console errors.
- Side-by-side parity with reference/diamond-lp-reference.html at 1440×900 and 390×844: same copy, order, colors, type, spacing (±4px) and the same scroll behavior at the same scroll positions.
- README in pt-BR covering:
  - setup and env vars (.env.example: NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_WHATSAPP_NUMBER, NEXT_PUBLIC_GTM_ID, RESEND_API_KEY, LEAD_TO_EMAIL)
  - how to edit content and replace Scene placeholders with real photos
  - the GTM events list
  - all [confirmar] items
- Lighthouse report meeting §13. Reduced-motion and keyboard-only passes verified.

## 18. v2 enhancements (implemented in this repo)
These build on the brief without breaking any rule above. Each one still expresses LIGHT, SCALE or PRECISION.
- **3D hero stone (signature element).** A procedural round-brilliant diamond rendered with raw WebGL (no 3D library, ~80 triangles, two blended passes). It starts unlit, ignites in sync with the headline (same flicker curve), catches light from a procedural "light tent" in the brand golds, tilts toward the cursor, spins faster with scroll and receives the spec'd scroll-out (rotate 12°, scale 1.1). Paused off screen and in hidden tabs; DPR capped; falls back to the reference wireframe when WebGL is unavailable; one static lit frame under reduced motion.
- **Precision layer on the DiamondReveal.** A 1px top-view facet drawing (table, star and kite facets) scales with the opening diamond and fades as the light fills the screen.
- **Depth without bling.** The Problem facade sits in slight 3D perspective and straightens as it lights up; the portfolio wall is a gently tilted plane; Solutions artwork counter-shifts inside each card; bento tiles tilt a few degrees under the cursor; gold buttons get a bevel highlight.
- **Odometer.** Strips hold 0–9 twice so every digit, including 0, rolls a full turn.
- **Navigation.** Scroll-spy underlines the active section in the header.
- **Conversion.** Extra WhatsApp CTA on the featured case ("Quero um projeto assim", origin `case_detail`); phone and e-mail in the contact list are tappable; the form shows "Etapa X de 3".
- **Motion override.** `?motion=full` forces full motion for the session (demos on machines whose OS turns animations off); `?motion=auto` restores the default, which always respects `prefers-reduced-motion`.
