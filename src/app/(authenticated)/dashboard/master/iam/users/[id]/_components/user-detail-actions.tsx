import Link from "next/link";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { If, Then } from "react-if";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

import type { TUserDetailActionsProps } from "@/app/(authenticated)/dashboard/master/iam/users/[id]/_types/user-detail-actions-props";

export default function UserDetailActions({
  userId,
  canEdit,
  canDelete,
  onDeleteClick,
}: TUserDetailActionsProps) {
  const editHref = `/dashboard/master/iam/users/${userId}/edit`;

  return (
    <div className="ms-auto">
      {/* sm and up: full buttons */}
      <div className="hidden gap-2 sm:flex">
        <If condition={canEdit}>
          <Then>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href={editHref} />}
            >
              <Pencil /> Edit
            </Button>
          </Then>
        </If>
        <If condition={canDelete}>
          <Then>
            <Button variant="destructive" onClick={onDeleteClick}>
              <Trash /> Delete
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
              <Button size="icon-sm" variant="ghost" aria-label="User actions">
                <EllipsisVertical />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <If condition={canEdit}>
                <Then>
                  <DropdownMenuItem render={<Link href={editHref} />}>
                    <Pencil />
                    Edit
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
                    Delete
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
