"use client";

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
import { useT } from "@/app/_hooks/use-t";

import { STORY_DETAIL_MESSAGES } from "@/app/(public)/stories/[slug]/_messages";
import type { TPublicStoryCommentDeleteDialogProps } from "@/app/(public)/stories/[slug]/_types/public-story-comment-delete-dialog-props";

export default function PublicStoryCommentDeleteDialog({
  open,
  onOpenChange,
  isPending,
  onConfirm,
  noun = "comment",
}: TPublicStoryCommentDeleteDialogProps) {
  const { t } = useT(STORY_DETAIL_MESSAGES);
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("comments.deleteTitle", { noun })}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("comments.deleteDescription", { noun })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:grid sm:grid-cols-2">
          <AlertDialogCancel>{t("comments.keepIt")}</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={onConfirm}
          >
            {t("comments.deleteAction", { noun })}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
