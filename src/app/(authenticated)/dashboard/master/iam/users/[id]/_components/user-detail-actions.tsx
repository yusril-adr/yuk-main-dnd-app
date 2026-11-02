"use client";

import Link from "next/link";
import { HandCoins, EllipsisVertical, Pencil, Trash } from "lucide-react";
import { If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useT } from "@/app/_hooks/use-t";

import type { TUserDetailActionsProps } from "@/app/(authenticated)/dashboard/master/iam/users/[id]/_types/user-detail-actions-props";
import { MASTER_USERS_DETAIL_MESSAGES } from "@/app/(authenticated)/dashboard/master/iam/users/[id]/_messages";

export default function UserDetailActions({
  userId,
  canViewBalances,
  canEdit,
  canDelete,
  onDeleteClick,
}: TUserDetailActionsProps) {
  const { t } = useT(MASTER_USERS_DETAIL_MESSAGES);
  const editHref = `/dashboard/master/iam/users/${userId}/edit`;
  const balancesHref = `/dashboard/master/iam/users/${userId}/balances`;

  return (
    <div className="ms-auto">
      {/* sm and up: full buttons */}
      <div className="hidden gap-2 sm:flex">
        <If condition={canViewBalances}>
          <Then>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href={balancesHref} />}
            >
              <HandCoins /> {t("actions.balances")}
            </Button>
          </Then>
        </If>
        <If condition={canEdit}>
          <Then>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href={editHref} />}
            >
              <Pencil /> {t("actions.edit")}
            </Button>
          </Then>
        </If>
        <If condition={canDelete}>
          <Then>
            <Button variant="destructive" onClick={onDeleteClick}>
              <Trash /> {t("actions.delete")}
            </Button>
          </Then>
        </If>
      </div>

      {/* Below sm: the buttons do not fit next to the title, so collapse them
          into a ghost ellipsis menu like story detail. */}
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                size="icon-sm"
                variant="ghost"
                aria-label={t("actions.menuLabel")}
              >
                <EllipsisVertical />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <If condition={canViewBalances}>
                <Then>
                  <DropdownMenuItem render={<Link href={balancesHref} />}>
                    <HandCoins />
                    {t("actions.balances")}
                  </DropdownMenuItem>
                </Then>
              </If>
              <If condition={canEdit}>
                <Then>
                  <DropdownMenuItem render={<Link href={editHref} />}>
                    <Pencil />
                    {t("actions.edit")}
                  </DropdownMenuItem>
                </Then>
              </If>
              <If condition={canDelete}>
                <Then>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={onDeleteClick}
                  >
                    <Trash />
                    {t("actions.delete")}
                  </DropdownMenuItem>
                </Then>
              </If>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
