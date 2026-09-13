"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Kayak, Swords, Trophy } from "lucide-react";

import { cn } from "@/utils/cn";
import { Button } from "@/app/_components/ui/button";

const NAV_ITEMS = [
  { title: "Guildmates", href: "/guildmates", icon: Kayak },
  { title: "Stories", href: "/stories", icon: Swords },
  { title: "Events", href: "/events", icon: CalendarDays },
  { title: "Rewards", href: "/rewards", icon: Trophy },
];

export function TopBarNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <>
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Button
            key={item.href}
            variant="ghost"
            disabled={isActive}
            render={<Link href={item.href} />}
            className={cn("justify-start", className)}
          >
            <item.icon className="size-4" />
            {item.title}
          </Button>
        );
      })}
    </>
  );
}
