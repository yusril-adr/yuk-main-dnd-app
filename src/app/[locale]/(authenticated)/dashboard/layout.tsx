import type { Metadata } from "next";

import { NO_INDEX_METADATA } from "@/utils/seo-helper";
import AppSidebarLayout from "@/app/[locale]/(authenticated)/dashboard/_components/layout/app-sidebar-layout";

export const metadata: Metadata = NO_INDEX_METADATA;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppSidebarLayout>{children}</AppSidebarLayout>;
}
