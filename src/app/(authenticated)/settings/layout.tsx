"use client";

import AppSidebarLayout from "../dashboard/_components/layout/app-sidebar-layout";

export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppSidebarLayout>{children}</AppSidebarLayout>;
}
