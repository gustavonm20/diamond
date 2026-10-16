import type { Metadata, Viewport } from "next";
import { SITE } from "@/content/site";
import { env } from "./env";

export const baseMetadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: SITE.title,
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: SITE.name,
    title: SITE.ogTitle,
    description: SITE.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.ogTitle,
    description: SITE.ogDescription,
  },
  formatDetection: { telephone: false },
};

export const baseViewport: Viewport = {
  themeColor: "#0A0A0B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
