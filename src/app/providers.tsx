"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ThemeEnum } from "@/common/enums/theme";
import { ThemeProvider } from "@/app/_components/theme-provider";
import { SidebarProvider } from "@/app/_components/ui/sidebar";
import { Toaster } from "@/app/_components/ui/sonner";
import { globalQueryClient } from "@/libs/react-query/global-query-client";
import { AuthProvider } from "@/app/_components/auth-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={globalQueryClient}>
      <NuqsAdapter>
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
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
