import type { SceneKind } from "@/types/content";

/**
 * Procedural placeholder illustrations ported from the reference `scene()`.
 * They stand in for real project photos: replace <Scene> with next/image when photos arrive.
 */

const FONT = "font-family:var(--font-archivo),Archivo,sans-serif;font-stretch:125%";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const T = (s: string, x: number, y: number, f: number, c: string, ex = "") =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-weight="600" font-size="${f}" fill="${c}" style="${FONT}" ${ex}>${esc(s)}</text>`;

const fz = (s: string, max: number, w: number) => Math.min(max, Math.round(w / (s.length * 0.72)));

export function sceneSvg(kind: SceneKind, label: string, lit = true): string {
  const L = lit ? "#F4EFE6" : "#2B2B30";
  const Wn = lit ? "#3A3122" : "#17171A";
  const o = lit ? 1 : 0;
  let b = "";
  let f: number;
  let y: number;

  if (kind === "fachada") {
    f = fz(label, 20, 190);
    y = 64 + f * 0.36;
    b = `<rect width="320" height="220" fill="#0E0E10"/><rect x="30" y="20" width="260" height="170" fill="#141417" stroke="#232328"/><rect x="30" y="20" width="260" height="8" fill="#1B1B1F"/><rect x="50" y="104" width="80" height="76" fill="${Wn}" stroke="#26262B"/><rect x="190" y="104" width="80" height="76" fill="${Wn}" stroke="#26262B"/><rect x="146" y="112" width="28" height="68" fill="${Wn}" stroke="#26262B"/><path d="M90 104v76M230 104v76" stroke="#26262B"/><rect y="190" width="320" height="30" fill="#0B0B0C"/><polygon points="60,84 260,84 320,220 0,220" fill="#E9CD8A" opacity="${0.07 * o}"/><rect x="50" y="44" width="220" height="40" fill="#0B0B0C" stroke="#232328"/>${lit ? T(label, 160, y, f, "none", 'stroke="#E9CD8A" stroke-width="5" stroke-linejoin="round" opacity=".4"') : ""}${T(label, 160, y, f, L)}`;
  } else if (kind === "letra") {
    f = fz(label, 30, 240);
    y = 88 + f * 0.36;
    b = `<rect width="320" height="220" fill="#18181B"/><rect y="168" width="320" height="52" fill="#111113"/>${[
      60, 160, 260,
    ]
      .map(
        (x) =>
          `<circle cx="${x}" cy="10" r="3" fill="${lit ? "#E9CD8A" : "#2A2A30"}"/><polygon points="${x - 3},12 ${x + 3},12 ${x + 26},70 ${x - 26},70" fill="#E9CD8A" opacity="${0.05 * o}"/>`,
      )
      .join(
        "",
      )}${lit ? T(label, 160, y, f, "none", 'stroke="#E9CD8A" stroke-width="6" stroke-linejoin="round" opacity=".22"') : ""}${T(label, 162.5, y + 2.5, f, "#0B0B0C")}${T(label, 160, y, f, lit ? "#E9CD8A" : "#2B2B30")}<rect x="96" y="128" width="128" height="42" fill="#0F0F11" stroke="#2A2A30"/><path d="M96 136h128" stroke="#C8A45D" opacity="${lit ? 0.6 : 0.15}"/>`;
  } else if (kind === "backlight") {
    f = fz(label, 22, 180);
    y = 80 + f * 0.36;
    b = `<rect width="320" height="220" fill="#101012"/><rect y="190" width="320" height="30" fill="#0B0B0C"/><rect x="40" y="24" width="240" height="152" fill="#E9CD8A" opacity="${0.12 * o}"/><rect x="52" y="34" width="216" height="132" fill="${lit ? "#F4EFE6" : "#1E1E22"}" stroke="#2A2A30" stroke-width="4"/><rect x="54" y="124" width="212" height="40" fill="${lit ? "#C8A45D" : "#232328"}"/>${T(label, 160, y, f, lit ? "#0A0A0B" : "#2B2B30")}<path d="M70 144h60" stroke="${lit ? "#0A0A0B" : "#2B2B30"}" stroke-width="3"/>`;
  } else if (kind === "totem") {
    f = fz(label, 15, 130);
    b = `<rect width="320" height="220" fill="#0E0E10"/><path d="M0 220V120h40V84h50v52h40v-26h60v34h50V70h80v150z" fill="#141417"/><rect y="190" width="320" height="30" fill="#0B0B0C"/><ellipse cx="160" cy="192" rx="62" ry="5" fill="#E9CD8A" opacity="${0.2 * o}"/><rect x="134" y="36" width="52" height="154" fill="#16161A" stroke="#2A2A30"/><rect x="134" y="36" width="52" height="10" fill="${lit ? "#C8A45D" : "#2A2A30"}"/>${T(label, 0, 0, f, L, `transform="translate(${(160 + f * 0.36).toFixed(1)} 118) rotate(-90)"`)}`;
  } else if (kind === "backdrop") {
    f = fz(label, 24, 190);
    y = 92 + f * 0.36;
    let crowd = "";
    for (let i = 0; i < 17; i++)
      crowd += `<circle cx="${8 + i * 19}" cy="${204 + (i % 2) * 7}" r="9" fill="#18181B"/>`;
    b = `<rect width="320" height="220" fill="#0B0B0C"/><path d="M28 18h264M28 18v160M292 18v160" stroke="#2A2A30" stroke-width="3" fill="none"/><polygon points="78,20 84,20 140,180 20,180" fill="#E9CD8A" opacity="${0.06 * o}"/><polygon points="236,20 242,20 300,180 180,180" fill="#E9CD8A" opacity="${0.06 * o}"/><rect x="50" y="38" width="220" height="112" fill="${lit ? "#1A1814" : "#141417"}" stroke="#2A2A30"/>${T(label, 160, y, f, lit ? "#E9CD8A" : "#2B2B30")}<rect x="50" y="140" width="220" height="10" fill="#C8A45D" opacity="${lit ? 1 : 0.2}"/><rect x="40" y="150" width="240" height="24" fill="#121214"/>${crowd}`;
  } else if (kind === "outdoor") {
    f = fz(label, 18, 130);
    y = 100 + f * 0.36;
    b = `<rect width="320" height="220" fill="#0E0E10"/><rect y="182" width="320" height="38" fill="#0B0B0C"/><path d="M120 150v34M200 150v34" stroke="#2A2A30" stroke-width="6"/><rect x="40" y="50" width="240" height="100" fill="${lit ? "#1A1814" : "#141417"}" stroke="#2A2A30" stroke-width="3"/><rect x="42" y="52" width="88" height="96" fill="#C8A45D" opacity="${lit ? 0.85 : 0.15}"/>${T(label, 205, y, f, L)}${[
      85, 160, 235,
    ]
      .map(
        (x) =>
          `<path d="M${x} 50v-12h8" stroke="#2A2A30" stroke-width="2" fill="none"/><polygon points="${x + 6},40 ${x + 10},40 ${x + 26},62 ${x - 10},62" fill="#E9CD8A" opacity="${0.18 * o}"/>`,
      )
      .join("")}`;
  } else if (kind === "adesivo") {
    f = fz(label, 18, 120);
    y = 70 + f * 0.36;
    b = `<rect width="320" height="220" fill="#16161A"/><polygon points="0,0 190,0 110,168 0,168" fill="#C8A45D" opacity="${lit ? 0.85 : 0.18}"/><polygon points="190,0 230,0 150,168 110,168" fill="#8E6B2E" opacity="${lit ? 0.7 : 0.12}"/>${T(label, 250, y, f, L)}<path d="M200 96h100" stroke="#C8A45D" opacity="${lit ? 0.7 : 0.2}"/><rect y="168" width="320" height="52" fill="#0F0F11"/><rect x="30" y="140" width="120" height="8" fill="#2A2A30"/><path d="M50 148v24M130 148v24" stroke="#2A2A30" stroke-width="3"/>`;
  } else {
    f = fz(label, 12, 96);
    y = 43 + f * 0.36;
    b = `<rect width="320" height="220" fill="#121214"/><path d="M0 0L120 70H200L320 0M0 220L120 150H200L320 220M120 70V150M200 70V150" stroke="#232328" fill="none"/><rect x="120" y="70" width="80" height="80" fill="#0E0E10"/><path d="M160 14v14" stroke="#2A2A30"/><rect x="96" y="28" width="128" height="30" fill="${lit ? "#F4EFE6" : "#1E1E22"}"/>${T(label, 150, y, f, lit ? "#0A0A0B" : "#2B2B30")}<path d="M200 43h12m-5-5 5 5-5 5" stroke="#C8A45D" stroke-width="2" fill="none"/><rect x="40" y="96" width="34" height="50" fill="${Wn}"/><rect x="246" y="96" width="34" height="50" fill="${Wn}"/>`;
  }

  return `<svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true" focusable="false">${b}</svg>`;
}
