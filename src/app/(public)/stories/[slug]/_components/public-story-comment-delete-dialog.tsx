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

import type { TPublicStoryCommentDeleteDialogProps } from "@/app/(public)/stories/[slug]/_types/public-story-detail-components-props";

export default function PublicStoryCommentDeleteDialog({
  open,
  onOpenChange,
  isPending,
  onConfirm,
}: TPublicStoryCommentDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this comment?</AlertDialogTitle>
          <AlertDialogDescription>
            The comment will be removed from the story for everyone. This cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:grid sm:grid-cols-2">
          <AlertDialogCancel>Keep it</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={onConfirm}
          >
            Delete comment
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
