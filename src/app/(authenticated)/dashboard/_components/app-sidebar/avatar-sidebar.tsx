import Link from "next/link";
import {
  BookOpen,
  ChessKnight,
  Coins,
  EllipsisVertical,
  LogOut,
  ShieldCogCorner,
  User,
  UserRoundCog,
  UserRoundKey,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/app/_components/ui/sidebar";
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
import { Skeleton } from "@/app/_components/ui/skeleton";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { logout } from "@/utils/logout";
import { makeDefaultAvatarUrl } from "@/utils/user-helper";

export function AvatarSidebar() {
  const { auth, authQuery } = useAuthContext();
  const { isMobile } = useSidebar();

  const isLoading = authQuery?.isLoading;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              render={<div />}
            >
              {isLoading && <Skeleton className="h-8 w-8 rounded-full" />}

              {!isLoading && (
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={
                      auth?.avatar_url ??
                      makeDefaultAvatarUrl(auth?.display_name)
                    }
                    alt={auth?.display_name || "-"}
                  />
                  <AvatarFallback className="rounded-lg">NA</AvatarFallback>
                </Avatar>
              )}

              <div className="grid flex-1 text-left text-sm leading-tight">
                {isLoading && (
                  <>
                    <Skeleton className="h-4 w-32.5 mb-1" />
                    <Skeleton className="h-2 w-32.5" />
                  </>
                )}

                {!isLoading && (
                  <>
                    <span className="truncate font-heading font-medium">
                      {auth?.display_name || "-"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {auth?.email || "-"}
                    </span>
                  </>
                )}
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>Stats</DropdownMenuLabel>
              <DropdownMenuItem disabled className="items-center">
                <BookOpen />
                {auth?.dm_exp} XP - DM
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="items-center">
                <ChessKnight />
                {auth?.player_exp} XP - Player
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="items-center">
                <Coins />
                {auth?.points} GP
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="items-center">
                <ShieldCogCorner />
                {auth?.selected_role?.name ?? "Not set"}
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
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
