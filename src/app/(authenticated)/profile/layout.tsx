"use client";

import AppTopbarLayout from "@/app/_components/layout/app-topbar-layout";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppTopbarLayout>{children}</AppTopbarLayout>;
}
