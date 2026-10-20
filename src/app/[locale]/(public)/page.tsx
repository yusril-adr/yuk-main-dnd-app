import type { Metadata } from "next";
import { NextIntlClientProvider, type Locale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { pickMessages } from "@/i18n/pick-messages";
import { makePageMetadata } from "@/utils/seo-helper";

import HomePageClient from "./page-client";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  const tSite = await getTranslations({ locale, namespace: "common.site" });

  return makePageMetadata({
    description: t("description"),
    path: "/",
    locale,
    localized: true,
    defaultImageAlt: tSite("ogAlt"),
  });
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  setRequestLocale((await params).locale as Locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pickMessages(messages, ["home", "common"])}>
      <HomePageClient />
    </NextIntlClientProvider>
  );
}
