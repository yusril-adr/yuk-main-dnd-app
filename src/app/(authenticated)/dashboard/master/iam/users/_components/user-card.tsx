"use client";

import { Ellipsis, EllipsisVertical, Eye, Pencil } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useAuthContext } from "@/app/_hooks/use-auth-context";
import { PermissionEnum } from "@/common/enums/permission";
import { getInitials } from "@/utils/user-helper";

import type { TUserCardProps } from "@/app/(authenticated)/dashboard/master/iam/users/_types/user-card-props";

export default function UserCard({ user }: TUserCardProps) {
  const { auth } = useAuthContext();
  const canUpdateUsers = auth?.permissions.includes(
    PermissionEnum.USERS_UPDATE,
  );

  return (
    <Card>
      <CardHeader className="relative">
        <div className="absolute right-0 top-0">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button size="icon-sm" variant="ghost">
                  <EllipsisVertical />
                </Button>
              }
            />
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  render={
                    <Link href={`/dashboard/master/iam/users/${user.id}`} />
                  }
                >
                  <Eye />
                  View
                </DropdownMenuItem>
                {canUpdateUsers && (
                  <DropdownMenuItem
                    render={
                      <Link
                        href={`/dashboard/master/iam/users/${user.id}/edit`}
                      />
                    }
                  >
                    <Pencil />
                    Edit
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src={user.avatar_url} alt={user.display_name} />
            <AvatarFallback>{getInitials(user.display_name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate">
              <Button
                variant="link"
                className="p-0 h-auto text-base"
                render={
                  <Link href={`/dashboard/master/iam/users/${user.id}`} />
                }
                nativeButton={false}
              >
                {user.display_name}
              </Button>
            </CardTitle>
            <CardDescription className="truncate">
              {user.username && <span>@{user.username}</span>}
              {user.username && user.email && <span> &middot; </span>}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <p className="text-muted-foreground">Player</p>
            <p className="font-medium">Lv.{user.player_level}</p>
          </div>
          <div>
            <p className="text-muted-foreground">DM</p>
            <p className="font-medium">Lv.{user.dm_level}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Gold Pieces</p>
            <p className="font-medium">{user.points}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-3">
        {user.roles && user.roles.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {user.roles.map((role) => (
              <Badge key={role.id} variant="secondary">
                {role.name}
              </Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
