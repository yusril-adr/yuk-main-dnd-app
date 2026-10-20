import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";
import { renderOgCard } from "@/app/_utils/og-card";

// Share card for the non-default locales (e.g. /og/id); the default locale
// keeps the root /opengraph-image. Prerendered at build time.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales
    .filter((locale) => locale !== routing.defaultLocale)
    .map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/og/[locale]">,
) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return renderOgCard(locale);
}
