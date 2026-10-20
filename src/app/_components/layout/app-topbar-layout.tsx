"use client";

import { AppTopBar } from "@/app/_components/app-topbar";

export default function AppTopbarLayout({
  children,
  showLocaleSwitcher = false,
}: Readonly<{
  children: React.ReactNode;
  showLocaleSwitcher?: boolean;
}>) {
  return (
    <div className="w-full flex flex-col">
      <AppTopBar showLocaleSwitcher={showLocaleSwitcher} />
      {children}
    </div>
  );
}
