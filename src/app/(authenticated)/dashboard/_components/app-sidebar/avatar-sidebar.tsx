import Link from "next/link";
import {
  BookOpen,
  ChessKnight,
  Coins,
  EllipsisVertical,
  LogOut,
  User,
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

const DUMMY_STATS = {
  xp: 0,
  gp: 0,
};

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
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(auth?.display_name || "-")}`}
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
                {DUMMY_STATS.xp} XP - DM
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="items-center">
                <ChessKnight />
                {DUMMY_STATS.xp} XP - Player
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="items-center">
                <Coins />
                {DUMMY_STATS.gp} GP
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
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
