import type { Metadata } from "next";

import { NO_INDEX_METADATA } from "@/utils/seo-helper";
import AppSidebarLayout from "../dashboard/_components/layout/app-sidebar-layout";

export const metadata: Metadata = NO_INDEX_METADATA;

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppSidebarLayout>{children}</AppSidebarLayout>;
}
