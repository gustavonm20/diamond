import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${env.siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${env.siteUrl}/politica-de-privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
