"use client";

import Link from "next/link";
import { Menu, Sword } from "lucide-react";

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

import { AvatarDropdown } from "./avatar-dropdown";
import { GuestActions } from "./guest-actions";
import { TopBarNav } from "./top-bar-nav";

export function AppTopBar({ hasAccessToken }: { hasAccessToken: boolean }) {
  const { auth, authQuery } = useAuthContext();

  const isLoading = authQuery?.isLoading ?? false;
  const hasResolved = authQuery
    ? authQuery.isSuccess || authQuery.isError
    : false;
  const showLoading = isLoading || (hasAccessToken && !hasResolved);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-10 mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Sword className="size-6 text-primary" />
          <span className="font-heading text-xl">YukMainDnD</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <TopBarNav />
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {showLoading && <Skeleton className="h-9 w-24 rounded-md" />}
          {!showLoading && (auth ? <AvatarDropdown /> : <GuestActions />)}
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon-sm" className="lg:hidden">
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
              {!showLoading && (auth ? <AvatarDropdown /> : <GuestActions />)}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
