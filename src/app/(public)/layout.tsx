"use client";

import { Suspense } from "react";
import AppTopbarLayout from "@/app/_components/layout/app-topbar-layout";
import GlobalLoader from "@/app/_components/global-loader";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppTopbarLayout>
      <Suspense fallback={<GlobalLoader />}>{children}</Suspense>
    </AppTopbarLayout>
  );
}
