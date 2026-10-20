"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

import YmdndLogo from "@/assets/logo/YMDND1.svg";

import { Button } from "@/app/_components/ui/button";
import { Skeleton } from "@/app/_components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { Link } from "@/i18n/navigation";

import { AvatarDropdown } from "./avatar-dropdown";
import { DashboardButton } from "./dashboard-button";
import { GuestActions } from "./guest-actions";
import { LocaleSwitcher } from "./locale-switcher";
import { TopBarNav } from "./top-bar-nav";

export function AppTopBar({
  showLocaleSwitcher = false,
}: {
  // Public pages only; the signed-in area is not translated yet
  showLocaleSwitcher?: boolean;
}) {
  const { auth, authQuery } = useAuthContext();
  const t = useTranslations("appTopbar");

  const isLoading = authQuery?.isLoading ?? false;
  const showLoading = isLoading;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-10 mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <YmdndLogo aria-hidden className="size-8 shrink-0 text-primary" />
          <span className="font-heading text-xl">YukMainDnD</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <TopBarNav />
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {showLocaleSwitcher && <LocaleSwitcher />}
          {showLoading && <Skeleton className="h-9 w-24 rounded-md" />}
          {!showLoading &&
            (auth ? (
              <>
                <DashboardButton />
                <AvatarDropdown />
              </>
            ) : (
              <GuestActions />
            ))}
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          {showLocaleSwitcher && <LocaleSwitcher />}
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon-sm" className="lg:hidden">
                  <Menu />
                  <span className="sr-only">{t("openMenu")}</span>
                </Button>
              }
            />

            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>{t("menu")}</SheetTitle>
                <SheetDescription className="sr-only">
                  {t("navigationMenu")}
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-4">
                <TopBarNav className="w-full" />
              </nav>

              <SheetFooter>
                {showLoading && <Skeleton className="h-9 w-full rounded-md" />}
                {!showLoading &&
                  (auth ? (
                    <>
                      <DashboardButton />
                      <AvatarDropdown />
                    </>
                  ) : (
                    <GuestActions />
                  ))}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
