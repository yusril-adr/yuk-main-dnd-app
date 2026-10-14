"use client";

import AppSidebarLayout from "@/app/(authenticated)/dashboard/_components/layout/app-sidebar-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppSidebarLayout>{children}</AppSidebarLayout>;
}
