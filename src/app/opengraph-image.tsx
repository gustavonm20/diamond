import { ImageResponse } from "next/og";

export const alt = "Diamond Comunicação Visual: presença que se vê de longe";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated placeholder. Replace with a real 1200×630 project photo (public/og.jpg) when available. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "radial-gradient(circle at 78% 40%, #2a2414 0%, #0A0A0B 55%)",
        color: "#F4EFE6",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: "#C8A45D",
          fontSize: 26,
          letterSpacing: 6,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 200 200" fill="none">
          <path
            d="M40 60h120l30 40-90 90-90-90z M10 100h180 M70 60l30 130 M130 60l-30 130 M40 60l30 40 M160 60l-30 40 M100 60l-30 40 M100 60l30 40"
            stroke="#C8A45D"
            strokeWidth="6"
          />
        </svg>
        DIAMOND COMUNICAÇÃO VISUAL
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 84,
          lineHeight: 1.02,
          fontWeight: 700,
        }}
      >
        <span>Presença que se vê</span>
        <span style={{ color: "#E9CD8A" }}>de longe.</span>
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#A39E94" }}>
        Fachadas, letreiros e cenografia de alto padrão · Orçamento em até 24h · Alphaville e Grande
        SP
      </div>
    </div>,
    size,
  );
}
