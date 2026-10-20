"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ChevronDown,
  ChevronUp,
  Coins,
  LogOut,
  User,
  BookOpen,
  ChessKnight,
  UserRoundKey,
  HandCoins,
  ShieldCogCorner,
  UserRoundCog,
} from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { logout } from "@/utils/logout";
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";

export function AvatarDropdown() {
  const { auth } = useAuthContext();
  const t = useTranslations("appTopbar.avatar");

  if (!auth) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost">
            <Avatar data-icon="inline-start">
              <AvatarImage
                src={
                  auth?.avatar_url ?? makeDefaultAvatarUrl(auth.display_name)
                }
                alt={auth.display_name}
              />
              <AvatarFallback>{getInitials(auth.display_name)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium sm:inline">
              {auth.display_name}
            </span>
            <ChevronUp className="lg:hidden" data-icon="inline-end" />
            <ChevronDown className="hidden lg:flex" data-icon="inline-end" />
          </Button>
        }
      />

      <DropdownMenuContent align="start" sideOffset={4}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("stats")}</DropdownMenuLabel>
          <DropdownMenuItem disabled className="items-center">
            <BookOpen />
            {t("dmXp", { xp: String(auth.dm_exp) })}
          </DropdownMenuItem>
          <DropdownMenuItem disabled className="items-center">
            <ChessKnight />
            {t("playerXp", { xp: String(auth.player_exp) })}
          </DropdownMenuItem>
          <DropdownMenuItem disabled className="items-center">
            <Coins />
            {t("gold", { gp: String(auth.points) })}
          </DropdownMenuItem>

          <DropdownMenuItem disabled className="items-center">
            <ShieldCogCorner />
            {auth.selected_role?.name ?? t("roleNotSet")}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("menu")}</DropdownMenuLabel>
          <DropdownMenuItem render={<Link href="/switch-role" />}>
            <UserRoundKey />
            {t("switchRole")}
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/profile" />}>
            <User />
            {t("profile")}
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/balances" />}>
            <HandCoins />
            {t("balances")}
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/settings" />}>
            <UserRoundCog />
            {t("settings")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>
            <LogOut />
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
