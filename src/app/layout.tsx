import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, Manrope } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { HEADER } from "@/content/site";
import { env } from "@/lib/env";
import { buildJsonLd } from "@/lib/schema";
import { baseMetadata, baseViewport } from "@/lib/seo";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Magnetic } from "@/components/motion/Magnetic";
import { Spotlight } from "@/components/motion/Spotlight";
import { AnalyticsListener } from "@/components/motion/AnalyticsListener";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = baseViewport;

/**
 * Runs before first paint: enables JS-only styles, applies the `?motion=full|auto` override
 * (session-scoped) and skips the preloader on return visits or reduced motion.
 */
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{var q=new URLSearchParams(location.search).get('motion');if(q==='full')sessionStorage.setItem('dm-motion','full');if(q==='auto')sessionStorage.removeItem('dm-motion');var full=sessionStorage.getItem('dm-motion')==='full';if(full)d.setAttribute('data-motion','full');if(sessionStorage.getItem('dm-pre')||(!full&&matchMedia('(prefers-reduced-motion: reduce)').matches))d.setAttribute('data-pre','skip')}catch(e){}})();`;

const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${instrument.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="dm-boot" strategy="beforeInteractive">
          {BOOT}
        </Script>
        <noscript>
          <style>{`.pre{display:none!important}.w{color:#F4EFE6!important}.w.it{color:#E9CD8A!important}`}</style>
        </noscript>
      </head>
      {env.gtmId ? <GoogleTagManager gtmId={env.gtmId} /> : null}
      <body>
        <a className="skip" href="#main">
          {HEADER.skip}
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        <SmoothScroll />
        <Magnetic />
        <Spotlight />
        <AnalyticsListener />
      </body>
    </html>
  );
}
