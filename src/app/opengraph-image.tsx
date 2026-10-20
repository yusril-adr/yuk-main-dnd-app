import { routing } from "@/i18n/routing";
import { OG_IMAGE_ALT, OG_IMAGE_SIZE } from "@/utils/seo-helper";
import { renderOgCard } from "@/app/_utils/og-card";

// Site-wide default share card in English (other locales: og/[locale]).
// Static: no request data, so it is prerendered at build time. Pages that
// pass their own image keep it.
export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard(routing.defaultLocale);
}
