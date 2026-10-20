import type { Metadata } from "next";

import { NO_INDEX_METADATA } from "@/utils/seo-helper";
import AppTopbarLayout from "@/app/_components/layout/app-topbar-layout";

export const metadata: Metadata = NO_INDEX_METADATA;

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppTopbarLayout>{children}</AppTopbarLayout>;
}
