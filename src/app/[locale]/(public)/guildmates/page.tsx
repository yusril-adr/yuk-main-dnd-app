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

import GuildMatesPageClient from "./page-client";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/guildmates">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "guildmates.meta" });
  const tSite = await getTranslations({ locale, namespace: "common.site" });

  return makePageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/guildmates",
    locale,
    localized: true,
    defaultImageAlt: tSite("ogAlt"),
  });
}

export default async function GuildMatesPage({
  params,
}: PageProps<"/[locale]/guildmates">) {
  setRequestLocale((await params).locale as Locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      messages={pickMessages(messages, ["guildmates", "common"])}
    >
      <Suspense>
        <GuildMatesPageClient />
      </Suspense>
    </NextIntlClientProvider>
  );
}
