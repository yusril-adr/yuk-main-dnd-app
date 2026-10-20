import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import AppTopbarLayout from "@/app/_components/layout/app-topbar-layout";

import PublicFooter from "@/app/[locale]/(public)/_components/public-footer";

export default async function PublicLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  // Static rendering: the footer reads translations on the server
  setRequestLocale((await params).locale as Locale);

  return (
    <AppTopbarLayout showLocaleSwitcher>
      {/* Fills the viewport below the top bar (4rem + 1px border) so the footer sits at the bottom.
          `group/public` lets PublicFooter restyle itself from the page content via :has() (see public-footer.tsx). */}
      <div className="group/public flex min-h-[calc(100svh-4rem-1px)] w-full min-w-0 flex-col">
        <div className="flex w-full min-w-0 flex-1 flex-col">{children}</div>
        <PublicFooter />
      </div>
    </AppTopbarLayout>
  );
}
