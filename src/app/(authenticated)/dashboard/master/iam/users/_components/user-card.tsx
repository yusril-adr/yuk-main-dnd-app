"use client";

import { useCallback, useState } from "react";
import { HandCoins, EllipsisVertical, Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { Else, If, Then } from "react-if";

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
import { ItemGroup } from "@/app/_components/ui/item";
import UserStatItem from "@/app/(authenticated)/dashboard/master/iam/users/_components/user-stat-item";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { useLocale } from "@/app/_hooks/use-locale";
import { useT } from "@/app/_hooks/use-t";
import { localeToBcp47 } from "@/libs/i18n/locales";
import { getInitials, makeDefaultAvatarUrl } from "@/utils/user-helper";
import { MASTER_USERS_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/users/_messages";

import type { TUserCardProps } from "@/app/(authenticated)/dashboard/master/iam/users/_types/user-card-props";

export default function UserCard({ user, onDelete }: TUserCardProps) {
  const { t } = useT(MASTER_USERS_MESSAGES);
  const { locale } = useLocale();
  const numberLocale = localeToBcp47(locale);
  const canUpdateUsers = user.action_list.is_can_update;
  const canDeleteUsers = user.action_list.is_can_delete;
  const canViewPoints = user.action_list.is_can_view_balances;
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const onDeleteConfirm = useCallback(() => {
    if (confirmDeleteId && onDelete) {
      onDelete(confirmDeleteId);
    }
    setConfirmDeleteId(null);
  }, [confirmDeleteId, onDelete, setConfirmDeleteId]);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarImage
                  src={
                    user?.avatar_url ?? makeDefaultAvatarUrl(user?.display_name)
                  }
                  alt={user.display_name}
                />
                <AvatarFallback>
                  {getInitials(user.display_name)}
                </AvatarFallback>
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
                  <If condition={user.username}>
                    <Then>
                      <span>@{user.username}</span>
                    </Then>

                    <Else>
                      <span>{t("card.usernameUnset")}</span>
                    </Else>
                  </If>
                </CardDescription>
              </div>
            </div>

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
                    {t("card.view")}
                  </DropdownMenuItem>
                  {canViewPoints && (
                    <DropdownMenuItem
                      render={
                        <Link
                          href={`/dashboard/master/iam/users/${user.id}/balances`}
                        />
                      }
                    >
                      <HandCoins />
                      {t("card.balances")}
                    </DropdownMenuItem>
                  )}
                  {canUpdateUsers && (
                    <DropdownMenuItem
                      render={
                        <Link
                          href={`/dashboard/master/iam/users/${user.id}/edit`}
                        />
                      }
                    >
                      <Pencil />
                      {t("card.edit")}
                    </DropdownMenuItem>
                  )}
                  {canDeleteUsers && onDelete && (
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setConfirmDeleteId(user.id)}
                    >
                      <Trash />
                      {t("card.delete")}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <ItemGroup className="mt-3 grid grid-cols-3 gap-2">
            <UserStatItem
              label={t("card.playerExp")}
              value={(user.player_exp ?? 0).toLocaleString(numberLocale)}
            />
            <UserStatItem
              label={t("card.dmExp")}
              value={(user.dm_exp ?? 0).toLocaleString(numberLocale)}
            />
            <UserStatItem
              label={t("card.gold")}
              value={(user.points ?? 0).toLocaleString(numberLocale)}
            />
          </ItemGroup>
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

      <AlertDialog
        open={confirmDeleteId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmDeleteId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("dialogs.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("dialogs.deleteDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("dialogs.cancel")}</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={onDeleteConfirm}>
              {t("dialogs.deleteConfirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
