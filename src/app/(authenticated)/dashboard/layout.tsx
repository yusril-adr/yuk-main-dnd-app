"use client";

import AppSidebarLayout from "@/app/(authenticated)/_components/layout/app-sidebar-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppSidebarLayout>{children}</AppSidebarLayout>;
}
