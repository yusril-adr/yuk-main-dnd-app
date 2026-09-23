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
} from "lucide-react";

import { TUserMeResponse } from "@/api/main/modules/auth/me/types/user-me-response";
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

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getDefaultAvatarUrl(auth: TUserMeResponse) {
  return `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(auth.display_name)}`;
}

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
                src={auth.avatarUrl ?? getDefaultAvatarUrl(auth)}
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
            {auth.dmExp} XP - DM
          </DropdownMenuItem>
          <DropdownMenuItem disabled className="items-center">
            <ChessKnight />
            {auth.playerExp} XP - Player
          </DropdownMenuItem>
          <DropdownMenuItem disabled className="items-center">
            <Coins />
            {auth.points} GP
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuItem render={<Link href="/profile" />}>
            <User />
            Profile
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
