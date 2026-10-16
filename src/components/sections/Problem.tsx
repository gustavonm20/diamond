import type { CSSProperties } from "react";
import { PROBLEM } from "@/content/site";
import { RichText } from "@/components/ui/RichText";
import { LightsOnScene } from "@/components/motion/LightsOnScene";

const SIGN_STYLE = { fontFamily: "var(--font-archivo), Archivo, sans-serif", fontStretch: "125%" };

export function Problem() {
  return (
    <LightsOnScene
      className="pin"
      id="problema"
      data-theme="dark"
      style={{ "--h": "260vh" } as CSSProperties}
    >
      <div className="stage prob-stage">
        <div className="wrap prob">
          <div>
            <span className="ey">{PROBLEM.eyebrow}</span>
            <h2 className="h2 dx">
              <RichText parts={PROBLEM.title} />
            </h2>
            <ol className="sts">
              {PROBLEM.statements.map((s, i) => (
                <li key={s.text} className="st" data-at={s.at}>
                  <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
                  {s.text}
                </li>
              ))}
            </ol>
            <div className="pbar" aria-hidden="true">
              <span>{PROBLEM.meter}</span>
              <i>
                <b data-bar />
              </i>
              <em data-pct>0%</em>
            </div>
          </div>
          <div className="prob-art">
            <svg viewBox="0 0 300 250" role="img" aria-label={PROBLEM.artLabel} data-art>
              <rect width="300" height="250" fill="#0E0E10" />
              <rect x="40" y="28" width="220" height="182" fill="#141417" stroke="#232328" />
              <rect x="40" y="28" width="220" height="10" fill="#1B1B1F" />
              <rect
                data-win
                x="60"
                y="110"
                width="68"
                height="80"
                fill="#17171A"
                stroke="#26262B"
              />
              <rect
                data-win
                x="172"
                y="110"
                width="68"
                height="80"
                fill="#17171A"
                stroke="#26262B"
              />
              <rect
                data-win
                x="138"
                y="118"
                width="24"
                height="72"
                fill="#17171A"
                stroke="#26262B"
              />
              <path d="M94 110v80M206 110v80" stroke="#26262B" />
              <rect y="210" width="300" height="40" fill="#0B0B0C" />
              <path d="M0 210h300" stroke="#232328" />
              <polygon data-cone points="62,92 238,92 300,250 0,250" fill="#E9CD8A" opacity="0" />
              <rect x="60" y="54" width="180" height="38" fill="#0B0B0C" stroke="#232328" />
              <text
                data-halo
                x="150"
                y="80"
                textAnchor="middle"
                fontWeight="600"
                fontSize="18"
                letterSpacing="2"
                fill="none"
                stroke="#E9CD8A"
                strokeWidth="5"
                strokeLinejoin="round"
                opacity="0"
                style={SIGN_STYLE}
              >
                {PROBLEM.sign}
              </text>
              <text
                data-sign
                x="150"
                y="80"
                textAnchor="middle"
                fontWeight="600"
                fontSize="18"
                letterSpacing="2"
                fill="#2B2B30"
                style={SIGN_STYLE}
              >
                {PROBLEM.sign}
              </text>
              <ellipse data-refl cx="150" cy="228" rx="110" ry="7" fill="#E9CD8A" opacity="0" />
            </svg>
          </div>
        </div>
      </div>
    </LightsOnScene>
  );
}
