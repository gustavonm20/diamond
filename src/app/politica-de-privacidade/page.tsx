import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/content/site";
import { ConfirmBadge } from "@/components/ui/ConfirmBadge";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: `Política de privacidade | ${SITE.name}`,
  description: "Como a Diamond Comunicação Visual trata os dados enviados pelo site.",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: true, follow: true },
};

/** Placeholder until the client sends the final text [confirmar]. */
export default function PrivacyPage() {
  return (
    <main id="main" className="legal">
      <div className="wrap">
        <Link href="/" className="logo" aria-label="Voltar ao início">
          <Icon name="diamond" />
          <span>
            <b className="dx">DIAMOND</b>
            <small>comunicação visual</small>
          </span>
        </Link>
        <h1 className="dx">
          Política de privacidade <ConfirmBadge note="Texto final da política de privacidade." />
        </h1>
        <p>
          Este texto é provisório. A versão final deve ser enviada pela Diamond e revisada por quem
          cuida do jurídico da empresa.
        </p>
        <h2 className="dx">Quais dados coletamos</h2>
        <ul>
          <li>Nome e WhatsApp informados no formulário de orçamento.</li>
          <li>
            Informações do projeto: serviços de interesse, cidade, data desejada e status da arte.
          </li>
          <li>Origem da visita (parâmetros UTM), para entender quais canais trazem pedidos.</li>
        </ul>
        <h2 className="dx">Para que usamos</h2>
        <p>Para responder ao seu pedido de orçamento e combinar os próximos passos do projeto.</p>
        <h2 className="dx">Contato</h2>
        <p>
          Dúvidas sobre seus dados: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <p style={{ marginTop: 40 }}>
          <Link className="btn btn-line" href="/">
            <Icon name="arrowLeft" />
            Voltar ao site
          </Link>
        </p>
      </div>
    </main>
  );
}
