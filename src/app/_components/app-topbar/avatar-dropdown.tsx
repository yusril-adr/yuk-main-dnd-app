"use client";

import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Coins,
  LogOut,
  User,
  BookOpen,
  ChessKnight,
  UserRoundKey,
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
          <DropdownMenuLabel>Stats</DropdownMenuLabel>
          <DropdownMenuItem disabled className="items-center">
            <BookOpen />
            {auth.dm_exp} XP - DM
          </DropdownMenuItem>
          <DropdownMenuItem disabled className="items-center">
            <ChessKnight />
            {auth.player_exp} XP - Player
          </DropdownMenuItem>
          <DropdownMenuItem disabled className="items-center">
            <Coins />
            {auth.points} GP
          </DropdownMenuItem>

          <DropdownMenuItem disabled className="items-center">
            <ShieldCogCorner />
            {auth.selected_role?.name ?? "Not set"}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuItem render={<Link href="/switch-role" />}>
            <UserRoundKey />
            Switch Role
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/profile" />}>
            <User />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/settings" />}>
            <UserRoundCog />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
