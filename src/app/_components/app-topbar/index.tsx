"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Kayak, Sword, Swords, Trophy } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { useAuthContext } from "@/app/_hooks/use-auth-context";

import { AvatarDropdown } from "./avatar-dropdown";
import { GuestActions } from "./guest-actions";

const NAV_ITEMS = [
  { title: "Guildmates", href: "/guildmates", icon: Kayak },
  { title: "Stories", href: "/stories", icon: Swords },
  { title: "Events", href: "/events", icon: CalendarDays },
  { title: "Rewards", href: "/rewards", icon: Trophy },
];

export function AppTopBar({ hasAccessToken }: { hasAccessToken: boolean }) {
  const pathname = usePathname();
  const { auth, authQuery } = useAuthContext();

  const isLoading = authQuery?.isLoading ?? false;
  const hasResolved = authQuery
    ? authQuery.isSuccess || authQuery.isError
    : false;
  const showLoading = isLoading || (hasAccessToken && !hasResolved);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-10 mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Sword className="size-6 text-primary" />
          <span className="font-heading text-xl">YukMainDnD</span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Button
                key={item.href}
                variant="ghost"
                disabled={isActive}
                render={<Link href={item.href} />}
              >
                <item.icon className="size-4" />
                {item.title}
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {showLoading && <Skeleton className="h-9 w-24 rounded-md" />}
          {!showLoading && (auth ? <AvatarDropdown /> : <GuestActions />)}
        </div>
      </div>
    </header>
  );
}
