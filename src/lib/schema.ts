import { FAQ } from "@/content/faq";
import { SITE } from "@/content/site";
import { env } from "./env";

/** JSON-LD: LocalBusiness + FAQPage. Only confirmed answers go into structured data. */
export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${env.siteUrl}/#business`,
        name: SITE.name,
        url: `${env.siteUrl}/`,
        telephone: SITE.phoneIntl,
        email: SITE.email,
        image: `${env.siteUrl}/opengraph-image`,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          postalCode: SITE.address.postalCode,
          addressCountry: SITE.address.country,
        },
        areaServed: ["Alphaville", "Santana de Parnaíba", "Barueri", "Grande São Paulo"],
        sameAs: [SITE.instagram.url],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.filter((f) => f.confirmed).map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}
