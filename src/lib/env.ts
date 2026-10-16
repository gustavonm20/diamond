export const env = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://diamondcvisual.com.br").replace(/\/$/, ""),
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511913553258",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
};

/** [confirmar] badges show in development and preview builds, never in production. */
export const showConfirmBadges =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
  process.env.NEXT_PUBLIC_SHOW_CONFIRM === "1";
