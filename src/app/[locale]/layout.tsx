import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import "../globals.css";
import { cn } from "@/utils/cn";
import { FONT_VARIABLES } from "@/app/_constants/fonts";
import { OG_LOCALE, routing } from "@/i18n/routing";
import { pickMessages } from "@/i18n/pick-messages";
import { getDefaultOgImage, SITE_NAME, SITE_URL } from "@/utils/seo-helper";
import { Providers } from "../providers";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "common.site" });
  const description = t("description");
  const ogImage = getDefaultOgImage(locale, t("ogAlt"));

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
    description,
    applicationName: SITE_NAME,
    authors: [{ name: "Yonaka", url: "https://yusril-adr.github.io" }],
    creator: "Yonaka",
    icons: { icon: "/favicon.ico" },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      url: "/",
      title: SITE_NAME,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description,
      images: [ogImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // Enables static rendering for every page below
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn("h-full", "antialiased", ...FONT_VARIABLES)}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Shared UI only (top bar, not-found); pages add their own namespaces */}
        <NextIntlClientProvider
          messages={pickMessages(messages, ["common", "appTopbar"])}
        >
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
