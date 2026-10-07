"use client";

import AppTopbarLayout from "@/app/_components/layout/app-topbar-layout";
import AppSidebarLayout from "../_components/layout/app-sidebar-layout";

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // return <AppTopbarLayout>{children}</AppTopbarLayout>;
  return <AppSidebarLayout>{children}</AppSidebarLayout>;
}
