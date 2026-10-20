import { Suspense } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider, type Locale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { pickMessages } from "@/i18n/pick-messages";
import { makePageMetadata } from "@/utils/seo-helper";

import StoriesPageClient from "./page-client";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/stories">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "stories.meta" });
  const tSite = await getTranslations({ locale, namespace: "common.site" });

  return makePageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/stories",
    locale,
    localized: true,
    defaultImageAlt: tSite("ogAlt"),
  });
}

export default async function StoriesPage({
  params,
}: PageProps<"/[locale]/stories">) {
  setRequestLocale((await params).locale as Locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      messages={pickMessages(messages, ["stories", "common"])}
    >
      <Suspense>
        <StoriesPageClient />
      </Suspense>
    </NextIntlClientProvider>
  );
}
