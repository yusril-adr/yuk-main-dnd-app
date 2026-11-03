"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

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
import { LanguageSwitcher } from "@/app/_components/language-switcher";
import { ThemeToggler } from "@/app/_components/theme-toggler";
import { useAuthContext } from "@/app/_hooks/use-auth-context";

import { AvatarDropdown } from "./avatar-dropdown";
import { DashboardButton } from "./dashboard-button";
import { GuestActions } from "./guest-actions";
import { TopBarNav } from "./top-bar-nav";

export function AppTopBar() {
  const { auth, authQuery } = useAuthContext();

  const isLoading = authQuery?.isLoading ?? false;
  const showLoading = isLoading;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-10">
        <Link href="/" className="flex items-center gap-2">
          <YmdndLogo aria-hidden className="size-8 shrink-0 text-primary" />
          <span className="font-heading text-xl">YukMainDnD</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <TopBarNav />
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
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

        {/* Mobile: language (+ theme) sit left of the hamburger; desktop unchanged above */}
        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher size="icon-sm" />
          <ThemeToggler size="icon-sm" />
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon-sm">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              }
            />

            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu
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
