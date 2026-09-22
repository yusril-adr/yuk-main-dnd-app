"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/cn";
import { Button } from "@/app/_components/ui/button";
import NAV_ROUTES from "@/app/_constants/navigation-routes";

export function TopBarNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const navItems = NAV_ROUTES;

  return (
    <>
      {navItems.map((item) => {
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
