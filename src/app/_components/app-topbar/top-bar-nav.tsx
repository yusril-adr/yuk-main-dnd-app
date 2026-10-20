"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";
import { Button } from "@/app/_components/ui/button";
import NAV_ROUTES from "@/app/_constants/navigation-routes";
import { Link, usePathname } from "@/i18n/navigation";

export function TopBarNav({ className }: { className?: string }) {
  const t = useTranslations("appTopbar.nav");
  // Without the locale prefix, so "/id/guildmates" still marks Guildmates
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
            variant={isActive ? "outline" : "ghost"}
            render={<Link href={item.href} />}
            className={cn("justify-start", className)}
          >
            <item.icon className="size-4" />
            {t(item.key)}
          </Button>
        );
      })}
    </>
  );
}
