"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ThemeEnum } from "@/common/enums/theme";
import { ThemeProvider } from "@/app/_components/theme-provider";
import { SidebarProvider } from "@/app/_components/ui/sidebar";
import { Toaster } from "@/app/_components/ui/sonner";
import { globalQueryClient } from "@/libs/react-query/global-query-client";
import { AuthProvider } from "@/app/_components/auth-provider";
import { I18nProvider } from "@/app/_components/i18n-provider";
import type { Locale } from "@/libs/i18n/locales";

export function Providers({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  return (
    <QueryClientProvider client={globalQueryClient}>
      <NuqsAdapter>
        <I18nProvider initialLocale={initialLocale}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme={ThemeEnum.LIGHT}
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider>
                {children}
                <Toaster />
              </SidebarProvider>
            </ThemeProvider>
          </AuthProvider>
        </I18nProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
