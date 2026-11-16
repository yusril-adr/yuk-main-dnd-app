"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "cn";
import { buttonVariants } from "@/app/_components/ui/button";
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
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: isActive ? "outline" : "ghost" }),
              "justify-start text-base",
              className,
            )}
          >
            <item.icon className="size-4" />
            {item.title}
          </Link>
        );
      })}
    </>
  );
}
